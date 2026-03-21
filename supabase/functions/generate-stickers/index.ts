import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const IDENTITY_MODEL = "google/gemini-2.5-pro";
const STICKER_MODEL = "google/gemini-3-pro-image-preview";
const REMOVE_BG_VERSION = "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1";

const STYLE_PROMPTS: Record<string, string> = {
  pixar:
    "Pixar / Disney feature-animation 3D render with clear Pixar styling, rounded forms, expressive eyes, polished cinematic lighting, stylized but still tightly identity-locked to the real person from the source photo",
  gta: "Rockstar Games / GTA V loading-screen illustration language, bold graphic realism, gritty sunlit contrast, angular painted shadows, assertive attitude, sharp poster composition, visible skin grain and rugged human texture",
  ghibli:
    "Studio Ghibli / Hayao Miyazaki hand-painted watercolor illustration with STRONG anime stylization: simplified soft features, large gentle eyes, delicate watercolor washes, warm earthy palette, visible brushstrokes, cel-shading outlines, dreamy storybook atmosphere — the character must look like a Ghibli film character while keeping recognizable facial structure",
  cyberpunk:
    "Cyberpunk 2077 inspired portrait art, rebellious futuristic styling, aggressive neon reflections, razor-sharp contrast, holographic details, edgy defiant attitude, unmistakably cyberpunk, NO smoke, NO fog, NO mist, NO particles obscuring the face, clean clear view of the face",
  lineart:
    "editorial fashion line-art illustration, confident ink contour variation, highly recognizable facial structure, selective color fills, clean negative space, premium magazine sketch finish",
};

const STYLE_FINISHES: Record<string, string> = {
  pixar:
    "premium Pixar-like finish with believable likeness, rounded cartoon appeal, soft dimensional hair, expressive eyes without changing face geometry, no generic doll face",
  gta:
    "hard-edged graphic shadows, satirical action-poster energy, sunbaked color contrast, slightly gritty paint texture instead of airbrushed skin",
  ghibli:
    "soft watercolor paper texture, gentle cel-shading with visible outlines, warm muted Ghibli palette, dreamy painterly softness, large simplified anime-style eyes while keeping the person's unique facial bone structure",
  cyberpunk:
    "ferocious neon mood, bolder techwear attitude, sharper silhouettes, high-contrast reflections, rebellious futuristic swagger",
  lineart:
    "economical but character-faithful contour drawing, sharp silhouette control, selective accent color, editorial elegance without losing likeness",
};

const POSE_PROMPTS: Record<string, string> = {
  Привет: "waving hello with one hand raised, friendly smile",
  Окей: "making OK hand gesture, confident expression",
  Лайк: "giving thumbs up, enthusiastic happy face",
  Любовь: "making heart shape with both hands, warm loving expression",
  Фейспалм: "face palm gesture, hand on forehead, exasperated expression",
  Работаю: "sitting at laptop typing, focused concentrated expression",
  Злюсь: "arms crossed, angry furrowed brows, steam coming from head",
  Думаю: "hand on chin in thinking pose, looking up thoughtfully",
  Успех: "holding stack of cash money, confident smirk, sunglasses",
  "Ура!": "celebrating with confetti, arms raised in joy, party hat",
  Сплю: "sleeping peacefully, eyes closed, zzz symbols floating",
  Шок: "jaw dropped, wide eyes, hands on cheeks in shock",
  Закон: "wearing a black lawyer robe, holding scales of justice, serious courtroom presence, dignified professional stance",
  Вперёд: "flexing bicep muscle, determined motivational expression",
  Пока: "waving goodbye, soft smile, one hand raised",
};


type IdentityProfile = {
  subjectSummary: string;
  faceShape: string;
  eyes: string;
  nose: string;
  mouth: string;
  jawline: string;
  skin: string;
  hair: string;
  distinguishingFeatures: string;
  wardrobe: string;
};

function parseJsonBlock(raw: string): IdentityProfile {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/^```/i, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned) as IdentityProfile;
}

async function analyzeIdentity(photoBase64: string, apiKey: string): Promise<IdentityProfile> {
  const response = await fetch(AI_GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: IDENTITY_MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `Analyze the person in this photo for a high-fidelity identity-preserving image transformation. Return ONLY minified JSON with these exact keys: subjectSummary, faceShape, eyes, nose, mouth, jawline, skin, hair, distinguishingFeatures, wardrobe.\n\nRules:\n- Describe the real person exactly as visible, without beautifying or flattering.\n- Focus on stable identity cues: eye spacing, eyelid folds, eye wrinkles, brow shape, nose bridge/tip/nostrils, mouth width, lip shape, jawline, chin, cheek volume, age cues, facial asymmetry, under-eye texture, beard/stubble if present, freckles/moles/lines, hairline, natural hair color, and visible clothing colors.\n- Skin must mention texture qualities like pores, wrinkles, under-eye lines, beard shadow, freckles, or natural facial contrast when visible.\n- DistinguishingFeatures must capture the traits a friend would use to recognize the same person instantly.\n- wardrobe must describe only the source outfit, not invented styling.`,
            },
            {
              type: "image_url",
              image_url: { url: photoBase64 },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Identity analysis failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("Identity analysis returned empty content");
  }

  return parseJsonBlock(content);
}

function buildStickerPrompt(style: string, emotion: string, identity: IdentityProfile) {
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.pixar;
  const styleFinish = STYLE_FINISHES[style] || STYLE_FINISHES.pixar;
  const posePrompt = POSE_PROMPTS[emotion] || emotion;

  return `This is an IDENTITY-LOCKED IMAGE EDIT of the uploaded person, not a fresh character generation.

SOURCE IDENTITY DOSSIER:
- subject: ${identity.subjectSummary}
- face shape: ${identity.faceShape}
- eyes: ${identity.eyes}
- nose: ${identity.nose}
- mouth: ${identity.mouth}
- jawline: ${identity.jawline}
- skin: ${identity.skin}
- hair: ${identity.hair}
- distinguishing features: ${identity.distinguishingFeatures}
- original outfit: ${identity.wardrobe}

TASK:
Transform THIS EXACT SAME PERSON from the source photo into a single premium sticker.
Style direction: ${stylePrompt}.
Style finish: ${styleFinish}.
Pose/action: ${posePrompt}.

ABSOLUTE PRIORITY ORDER:
1. recognizably the same person as the uploaded photo
2. apply artistic style STRONGLY — the result must clearly look stylized, not like a photo
3. apply requested pose / attire
4. preserve real facial structure (bone structure, proportions) even under heavy stylization

FACE IDENTITY RULES:
- Preserve the exact nose shape, bridge, nostrils, and tip from the source photo
- Preserve the exact eye shape, spacing, eyelid folds, under-eye lines/wrinkles, and brow structure
- Preserve the exact jawline, chin shape, cheek volume, mouth width, lip shape, and smile-line anatomy
- Preserve visible age cues, facial asymmetry, beard shadow or soft facial texture, freckles, moles, and any other identifying details
- Preserve the exact hairline, natural hair color, parting, density, and silhouette unless the source image clearly shows otherwise
- Preserve the same gender presentation, ethnicity, and age impression from the source image
- Friends of the person should recognize the face immediately at first glance

TEXTURE RULES:
- Keep realistic skin grain and natural facial texture even inside the stylized render
- Keep pores, subtle wrinkles, under-eye texture, natural contrast, and real-life facial detail when visible in the source
- NO waxy skin
- NO plastic skin
- NO porcelain doll face
- NO beauty-filter smoothing
- NO generic game/anime/model makeover

CLOTHING RULES:
- Keep outfit colors close to the source photo unless the pose explicitly requires a costume
- If the pose requires costume or props, only change clothing/props while keeping the same head, face, hair, and neck identity
- For the lawyer pose, add a black lawyer robe and scales of justice while keeping the same face fully recognizable

COMPOSITION RULES:
- face must stay large and readable
- prefer bust or waist-up composition
- TRANSPARENT background (no white, no color, no gradient — fully transparent PNG)
- one character only
- no text, no border, no extra people
- premium polished sticker presentation, figure cutout on transparent background

NEGATIVE RULES:
- do not invent a prettier or younger face
- do not replace the subject with a generic handsome/beautiful model
- do not smooth away wrinkles or texture
- do not copy hairstyle or clothes from examples unrelated to the source photo
- do not let style override likeness`;
}

async function generateStickerImage(photoBase64: string, prompt: string, apiKey: string) {
  const response = await fetch(AI_GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: STICKER_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: photoBase64 } },
            { type: "image_url", image_url: { url: photoBase64 } },
          ],
        },
      ],
      modalities: ["image", "text"],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    const error = new Error(`AI error: ${response.status} ${errText}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.images?.[0]?.image_url?.url as string | undefined;
}

async function replicatePredict(token: string, version: string, input: Record<string, unknown>) {
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version, input }),
  });

  if (!res.ok) {
    throw new Error(`Replicate remove-bg failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

async function pollPrediction(id: string, token: string, maxMs = 120000): Promise<any> {
  const start = Date.now();

  while (Date.now() - start < maxMs) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const prediction = await res.json();

    if (prediction.status === "succeeded") return prediction;
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(`Replicate remove-bg ${prediction.status}: ${prediction.error || "unknown"}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 2500));
  }

  throw new Error("Replicate remove-bg timed out");
}

async function removeBackground(imageUrl: string, token: string): Promise<string> {
  const prediction = await replicatePredict(token, REMOVE_BG_VERSION, { image: imageUrl });
  const result = await pollPrediction(prediction.id, token);
  return typeof result.output === "string" ? result.output : imageUrl;
}

async function uploadImageFromUrl(imageUrl: string, supabase: any): Promise<string | null> {
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    console.error("Download error:", imageRes.status);
    return null;
  }

  const bytes = new Uint8Array(await imageRes.arrayBuffer());
  const fileName = `${crypto.randomUUID()}.png`;
  const { error: uploadError } = await supabase.storage
    .from("stickers")
    .upload(fileName, bytes, { contentType: "image/png", upsert: true });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return null;
  }

  const { data: urlData } = supabase.storage.from("stickers").getPublicUrl(fileName);
  return urlData.publicUrl;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const REPLICATE_API_TOKEN = Deno.env.get("REPLICATE_API_TOKEN");
    if (!REPLICATE_API_TOKEN) throw new Error("REPLICATE_API_TOKEN not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { photoBase64, style, emotions } = await req.json();

    if (!photoBase64 || !style || !emotions?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { label: string; url: string }[] = [];
    const identity = await analyzeIdentity(photoBase64, LOVABLE_API_KEY);

    for (const emotion of emotions) {
      try {
        const prompt = buildStickerPrompt(style, emotion, identity);
        const imageData = await generateStickerImage(photoBase64, prompt, LOVABLE_API_KEY);

        if (!imageData) {
          console.error(`No image returned for ${emotion}`);
          continue;
        }

        const transparentImageUrl = await removeBackground(imageData, REPLICATE_API_TOKEN);
        const mainUrl = await uploadImageFromUrl(transparentImageUrl, supabase);
        if (!mainUrl) continue;

        results.push({ label: emotion, url: mainUrl });
      } catch (err) {
        const status = typeof err === "object" && err && "status" in err ? (err as { status?: number }).status : undefined;
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Generation error for ${emotion}:`, message);

        if (status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait and try again.", results }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        if (status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds.", results }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        continue;
      }
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-stickers error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
