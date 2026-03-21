import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Motion prompts per emotion — short, clear instructions for the video model
const MOTION_PROMPTS: Record<string, string> = {
  "Привет": "The person waves hello with their right hand, smiling warmly. Natural arm movement, 2 waves back and forth.",
  "Окей": "The person makes an OK hand gesture, nodding slightly with a confident smile.",
  "Лайк": "The person raises a thumbs up enthusiastically, with a happy expression and slight head nod.",
  "Любовь": "The person forms a heart shape with both hands in front of their chest, smiling lovingly.",
  "Фейспалм": "The person slowly raises their hand to their forehead in a facepalm gesture, looking exasperated.",
  "Работаю": "The person types on a keyboard with focused expression, fingers moving naturally.",
  "Злюсь": "The person crosses their arms with an angry expression, furrowing brows and slightly shaking head.",
  "Думаю": "The person puts their hand on their chin in a thinking pose, looking upward thoughtfully.",
  "Успех": "The person holds up cash/money confidently, with a smirk and slight swagger.",
  "Ура!": "The person throws their arms up in celebration, joyful expression, as if cheering.",
  "Сплю": "The person slowly closes their eyes, tilts their head to one side, and appears to doze off peacefully.",
  "Шок": "The person's jaw drops open, eyes widen, and hands come up to their cheeks in shock.",
  "Закон": "The person in a lawyer robe gives a dignified nod, slightly tilting the scales of justice.",
  "Вперёд": "The person flexes their bicep with a determined motivational expression, pumping their fist.",
  "Пока": "The person waves goodbye gently with one hand, with a soft farewell smile.",
};

async function pollReplicatePrediction(predictionId: string, apiToken: string, maxWaitMs = 300000): Promise<any> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    const prediction = await res.json();
    
    if (prediction.status === "succeeded") return prediction;
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(`Replicate prediction ${prediction.status}: ${prediction.error || "unknown"}`);
    }
    
    // Wait 3 seconds before polling again
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error("Replicate prediction timed out");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const REPLICATE_API_TOKEN = Deno.env.get("REPLICATE_API_TOKEN");
    if (!REPLICATE_API_TOKEN) throw new Error("REPLICATE_API_TOKEN not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { imageUrl, emotion } = await req.json();

    if (!imageUrl || !emotion) {
      return new Response(JSON.stringify({ error: "Missing imageUrl or emotion" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const motionPrompt = MOTION_PROMPTS[emotion] || `The person performs a ${emotion} gesture with natural movement.`;

    console.log(`Animating sticker for emotion: ${emotion}`);

    // Use Replicate's image-to-video model (Stability AI's Stable Video Diffusion or similar)
    // We'll use minimax/video-01-live as it's good for portrait animation
    const createRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Using minimax video-01-live for high quality portrait animation
        version: "b3fd893b518666a710738c15185940144fce6987432a31768a8e0ffba7f3359b",
        input: {
          prompt: motionPrompt,
          first_frame_image: imageUrl,
          prompt_optimizer: true,
        },
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      
      // If this specific model fails, try wan-i2v as fallback
      console.log("Primary model failed, trying fallback model...");
      
      const fallbackRes = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Fallback: Wan 2.1 I2V - good image-to-video model
          version: "aa535ad6050bb18feee0e0ba99f345b0807b28baa81c95adfc4777f61f3ac41f",
          input: {
            image: imageUrl,
            prompt: motionPrompt,
            max_area: "832x1216",
            num_frames: 81,
            guidance_scale: 5,
            num_inference_steps: 30,
          },
        }),
      });

      if (!fallbackRes.ok) {
        const fallbackErr = await fallbackRes.text();
        throw new Error(`Replicate API error: ${createRes.status} ${errText} | Fallback: ${fallbackRes.status} ${fallbackErr}`);
      }

      const fallbackPrediction = await fallbackRes.json();
      const result = await pollReplicatePrediction(fallbackPrediction.id, REPLICATE_API_TOKEN);
      
      const videoUrl = typeof result.output === "string" ? result.output : result.output?.[0] || result.output?.video;
      if (!videoUrl) throw new Error("No video output from fallback model");

      // Download and upload to storage
      const storedUrl = await downloadAndStore(videoUrl, supabase);

      return new Response(JSON.stringify({ videoUrl: storedUrl, emotion }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prediction = await createRes.json();
    const result = await pollReplicatePrediction(prediction.id, REPLICATE_API_TOKEN);

    // Extract the video URL from the result
    const videoUrl = typeof result.output === "string" ? result.output : result.output?.[0] || result.output?.video;
    if (!videoUrl) throw new Error("No video output from model");

    // Download the video and upload to Supabase storage
    const storedUrl = await downloadAndStore(videoUrl, supabase);

    return new Response(JSON.stringify({ videoUrl: storedUrl, emotion }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("animate-sticker error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function downloadAndStore(videoUrl: string, supabase: any): Promise<string> {
  const videoRes = await fetch(videoUrl);
  if (!videoRes.ok) throw new Error(`Failed to download video: ${videoRes.status}`);
  
  const videoBytes = new Uint8Array(await videoRes.arrayBuffer());
  const fileName = `${crypto.randomUUID()}.mp4`;
  
  const { error: uploadError } = await supabase.storage
    .from("stickers")
    .upload(fileName, videoBytes, { contentType: "video/mp4", upsert: true });
  
  if (uploadError) throw new Error(`Upload error: ${uploadError.message}`);
  
  const { data: urlData } = supabase.storage.from("stickers").getPublicUrl(fileName);
  return urlData.publicUrl;
}
