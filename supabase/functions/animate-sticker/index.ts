import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const MOTION_PROMPTS: Record<string, string> = {
  "Привет": "The person waves hello with their right hand, smiling warmly. Natural arm movement, 2 waves.",
  "Окей": "The person makes an OK hand gesture, nodding slightly with a confident smile.",
  "Лайк": "The person raises a thumbs up enthusiastically, with a happy expression and slight head nod.",
  "Любовь": "The person forms a heart shape with both hands in front of their chest, smiling lovingly.",
  "Фейспалм": "The person slowly raises their hand to their forehead in a facepalm gesture, looking exasperated.",
  "Работаю": "The person types on a keyboard with focused expression, fingers moving naturally.",
  "Злюсь": "The person crosses their arms with an angry expression, furrowing brows and slightly shaking head.",
  "Думаю": "The person puts their hand on their chin in a thinking pose, looking upward thoughtfully.",
  "Успех": "The person holds up cash confidently, with a smirk and slight swagger.",
  "Ура!": "The person throws their arms up in celebration, joyful expression, as if cheering.",
  "Сплю": "The person slowly closes their eyes, tilts their head to one side, and appears to doze off.",
  "Шок": "The person's jaw drops open, eyes widen, and hands come up to their cheeks in shock.",
  "Закон": "The person in a lawyer robe gives a dignified nod, slightly tilting the scales of justice.",
  "Вперёд": "The person flexes their bicep with a determined motivational expression, pumping their fist.",
  "Пока": "The person waves goodbye gently with one hand, with a soft farewell smile.",
};

const REMOVE_BG_VERSION = "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1";
const VIDEO_MODEL_VERSION = "b3fd893b518666a710738c15185940144fce6987432a31768a8e0ffba7f3359b";

async function replicatePredict(
  token: string,
  version: string,
  input: Record<string, unknown>,
): Promise<any> {
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version, input }),
  });

  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Replicate ${res.status}: ${text}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  return res.json();
}

async function pollPrediction(id: string, token: string, maxMs = 300000): Promise<any> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const p = await res.json();
    if (p.status === "succeeded") return p;
    if (p.status === "failed" || p.status === "canceled") {
      throw new Error(`Prediction ${p.status}: ${p.error || "unknown"}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error("Prediction timed out after 5 minutes");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const TOKEN = Deno.env.get("REPLICATE_API_TOKEN");
    if (!TOKEN) throw new Error("REPLICATE_API_TOKEN not set");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { imageUrl, emotion, skipRemoveBg } = await req.json();
    if (!imageUrl || !emotion) return json({ error: "Missing imageUrl or emotion" }, 400);

    const motionPrompt = MOTION_PROMPTS[emotion] || `The person performs a ${emotion} gesture naturally.`;

    // ── Step 1: Remove background ──
    let cleanImageUrl = imageUrl;
    if (!skipRemoveBg) {
      console.log("Step 1: Removing background...");
      const bgPred = await replicatePredict(TOKEN, REMOVE_BG_VERSION, { image: imageUrl });
      const bgResult = await pollPrediction(bgPred.id, TOKEN, 120000);
      cleanImageUrl = typeof bgResult.output === "string" ? bgResult.output : imageUrl;
      console.log("Background removed:", cleanImageUrl);
    }

    // ── Step 2: Animate with minimax/video-01-live ──
    console.log("Step 2: Animating with minimax/video-01-live...");
    const videoPred = await replicatePredict(TOKEN, VIDEO_MODEL_VERSION, {
      prompt: motionPrompt,
      first_frame_image: cleanImageUrl,
      prompt_optimizer: true,
    });
    const videoResult = await pollPrediction(videoPred.id, TOKEN, 300000);

    const videoUrl = typeof videoResult.output === "string"
      ? videoResult.output
      : videoResult.output?.[0] || videoResult.output?.video;

    if (!videoUrl) throw new Error("No video output from model");

    // ── Step 3: Download & store in Supabase ──
    console.log("Step 3: Storing video...");
    const videoRes = await fetch(videoUrl);
    if (!videoRes.ok) throw new Error(`Download failed: ${videoRes.status}`);

    const videoBytes = new Uint8Array(await videoRes.arrayBuffer());
    const fileName = `${crypto.randomUUID()}.mp4`;

    const { error: uploadError } = await supabase.storage
      .from("stickers")
      .upload(fileName, videoBytes, { contentType: "video/mp4", upsert: true });
    if (uploadError) throw new Error(`Upload: ${uploadError.message}`);

    const { data: urlData } = supabase.storage.from("stickers").getPublicUrl(fileName);

    // Also store the transparent PNG
    let transparentPngUrl: string | undefined;
    if (cleanImageUrl !== imageUrl) {
      const pngRes = await fetch(cleanImageUrl);
      if (pngRes.ok) {
        const pngBytes = new Uint8Array(await pngRes.arrayBuffer());
        const pngName = `${crypto.randomUUID()}.png`;
        const { error: pngUploadErr } = await supabase.storage
          .from("stickers")
          .upload(pngName, pngBytes, { contentType: "image/png", upsert: true });
        if (!pngUploadErr) {
          const { data: pngUrlData } = supabase.storage.from("stickers").getPublicUrl(pngName);
          transparentPngUrl = pngUrlData.publicUrl;
        }
      }
    }

    return json({
      videoUrl: urlData.publicUrl,
      transparentImageUrl: transparentPngUrl,
      emotion,
    });
  } catch (e: unknown) {
    console.error("animate-sticker error:", e);
    const err = e as Error & { status?: number };
    const status = err.status === 402 || err.status === 429 ? err.status : 500;
    return json({ error: err.message || "Unknown error" }, status);
  }
});
