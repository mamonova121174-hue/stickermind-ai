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

const STYLE_PROMPTS: Record<string, string> = {
  pixar:
    "premium feature-animation render in the spirit of Pixar, dimensional stylization with believable anatomy, expressive but identity-accurate eyes, soft cinematic lighting, rich material definition, natural skin texture preserved",
  gta: "Rockstar Games / GTA V loading-screen illustration language, bold graphic realism, gritty sunlit contrast, angular painted shadows, assertive attitude, sharp poster composition, visible skin grain and rugged human texture",
  ghibli:
    "Studio Ghibli / Hayao Miyazaki inspired hand-painted cel illustration, watercolor warmth, delicate but character-specific linework, storybook atmosphere, simplified rendering that still keeps exact facial identity",
  cyberpunk:
    "Cyberpunk 2077 inspired portrait art, rebellious futuristic styling, aggressive neon reflections, razor-sharp contrast, holographic details, rain-slick cinematic tension, edgy defiant attitude, unmistakably cyberpunk",
  lineart:
    "editorial fashion line-art illustration, confident ink contour variation, highly recognizable facial structure, selective color fills, clean negative space, premium magazine sketch finish",
};

const STYLE_FINISHES: Record<string, string> = {
  pixar:
    "clean premium surface rendering, dimensional hair forms, believable materials, subtle skin pore texture instead of plastic smoothing",
  gta:
    "hard-edged graphic shadows, satirical action-poster energy, sunbaked color contrast, slightly gritty paint texture instead of airbrushed skin",
  ghibli:
    "gentle watercolor paper grain, painterly cel shading, lyrical softness, no generic anime face replacement",
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

// Edit instructions to create a "rest" frame FROM the action-pose sticker
// These describe what to CHANGE in the existing image — the character stays the same
const ANIMATION_EDIT_INSTRUCTIONS: Record<string, string> = {
  Привет: "Lower the raised hand to the side. Keep everything else identical — same face, same style, same background, same clothing.",
  Окей: "Move the hand making the OK gesture down to the side in a relaxed position. Keep the exact same character, face, style, clothes, and background.",
  Лайк: "Lower the thumbs-up hand down to a neutral resting position. Keep the exact same character, face, style, clothes, and background.",
  Любовь: "Move both hands apart from the heart shape to a relaxed position at chest level. Keep the exact same character, face, style, clothes, and background.",
  Фейспалм: "Move the hand away from the forehead down to the side. Change expression to mildly concerned. Keep the exact same character, style, clothes, and background.",
  Работаю: "Move the hands to hover just above the keyboard instead of typing. Eyes looking up slightly. Keep the exact same character, style, laptop, clothes, and background.",
  Злюсь: "Uncross the arms to sides. Relax the brows slightly — still annoyed but not furious. Keep the exact same character, style, clothes, and background.",
  Думаю: "Move the hand from chin to a neutral position. Eyes looking forward instead of up. Keep the exact same character, style, clothes, and background.",
  Успех: "Lower the cash/money down. Neutral expression instead of smirk. Keep the exact same character, style, sunglasses, clothes, and background.",
  "Ура!": "Lower the raised arms to waist level. Still smiling but arms down. Keep the exact same character, style, confetti, clothes, and background.",
  Сплю: "Open the eyes halfway — drowsy, yawning expression. Keep the exact same character, style, clothes, and background. Remove zzz symbols.",
  Шок: "Close the mouth, lower the hands from cheeks to sides. Neutral expression. Keep the exact same character, style, clothes, and background.",
  Закон: "Lower the scales of justice to the side. Relaxed courtroom stance. Keep the exact same character, face, lawyer robe, style, and background.",
  Вперёд: "Relax the flexing arm down to the side. Keep the determined face but arm relaxed. Keep the exact same character, style, clothes, and background.",
  Пока: "Lower the waving hand to the side. Keep the soft smile. Keep the exact same character, style, clothes, and background.",
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
2. preserve real facial anatomy and natural skin texture
3. apply requested pose / attire
4. apply artistic style strongly

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
- white clean background
- one character only
- no text, no border, no extra people
- premium polished sticker presentation

NEGATIVE RULES:
- do not invent a prettier or younger face
- do not replace the subject with a generic handsome/beautiful model
- do not smooth away wrinkles or texture
- do not copy hairstyle or clothes from examples unrelated to the source photo
- do not let style override likeness`;}

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

// Edit an existing sticker image to create an animation frame
async function editStickerImage(stickerBase64: string, editInstruction: string, apiKey: string) {
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
            {
              type: "text",
              text: `CRITICAL: This is an IMAGE EDIT, not a new generation. You MUST keep the EXACT same character — same face, same art style, same proportions, same colors, same background. Only make the following small change:\n\n${editInstruction}\n\nDo NOT regenerate or reimagine the character. Do NOT change the face, hair, body shape, clothing style, or art style. The output must look like a slightly different frame of the SAME animation — identical character with a subtle pose change.`,
            },
            {
              type: "image_url",
              image_url: { url: stickerBase64 },
            },
          ],
        },
      ],
      modalities: ["image", "text"],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Edit error: ${response.status} ${errText}`);
    return undefined;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.images?.[0]?.image_url?.url as string | undefined;
}

  const data = await response.json();
  return data.choices?.[0]?.message?.images?.[0]?.image_url?.url as string | undefined;
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
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { photoBase64, style, emotions, animated: requestAnimated } = await req.json();

    if (!photoBase64 || !style || !emotions?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { label: string; url: string; animated: boolean }[] = [];
    const identity = await analyzeIdentity(photoBase64, LOVABLE_API_KEY);

    async function uploadImage(imageData: string, supabase: any): Promise<string | null> {
      const base64Content = imageData.replace(/^data:image\/\w+;base64,/, "");
      const bytes = Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0));
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

    for (const emotion of emotions) {
      try {
        const prompt = buildStickerPrompt(style, emotion, identity);
        const imageData = await generateStickerImage(photoBase64, prompt, LOVABLE_API_KEY);

        if (!imageData) {
          console.error(`No image returned for ${emotion}`);
          continue;
        }

        const url = await uploadImage(imageData, supabase);
        if (!url) continue;

        results.push({
          label: emotion,
          url,
          animated: !!requestAnimated,
        });
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