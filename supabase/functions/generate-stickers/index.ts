import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STYLE_PROMPTS: Record<string, string> = {
  pixar:
    "3D Pixar/Disney animation style, smooth rounded features, big expressive eyes, soft lighting, subsurface scattering on skin, vibrant saturated colors, studio-quality render",
  gta: "GTA V loading screen art style, bold black outlines, high-contrast cel-shading, saturated pop colors, exaggerated features, urban attitude, stylized realism",
  ghibli:
    "Studio Ghibli / Hayao Miyazaki anime style, soft watercolor textures, delicate linework, warm gentle lighting, expressive anime eyes, hand-painted background feel",
  cyberpunk:
    "Cyberpunk 2077 style, neon pink and cyan lighting, cybernetic implants, futuristic tech jacket, holographic UI elements, rain-slicked reflections, dark moody atmosphere",
  lineart:
    "Minimalist fashion illustration line art, elegant thin ink outlines, very subtle color wash, clean white background, editorial sketch quality",
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
  Закон: "holding scales of justice in one hand, serious professional look, suit",
  Вперёд: "flexing bicep muscle, determined motivational expression",
  Пока: "waving goodbye, soft smile, one hand raised",
};

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

    const { photoBase64, style, emotions } = await req.json();

    if (!photoBase64 || !style || !emotions?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.pixar;
    const results: { label: string; url: string; animated: boolean }[] = [];

    for (const emotion of emotions) {
      const posePrompt = POSE_PROMPTS[emotion] || emotion;

      const prompt = `You are a portrait artist who specializes in creating character stickers that perfectly capture a person's likeness.

REFERENCE PHOTO ANALYSIS — before drawing, describe to yourself:
1. Face shape (round/oval/square/heart)
2. Eye color, shape, size, spacing
3. Nose shape and size relative to face
4. Mouth/lip shape and fullness
5. Eyebrow thickness, arch, color
6. Hair: exact color (not approximate), length, texture, parting, style
7. Skin tone (exact shade)
8. Distinguishing features: freckles, moles, dimples, scars, glasses, piercings, facial hair
9. Body build

Now draw this SPECIFIC person as a sticker in ${stylePrompt} style.
Pose: ${posePrompt}.

ABSOLUTE REQUIREMENTS:
- The person in the sticker MUST be the same person from the photo — not a similar-looking person, THE SAME person
- Hair color must be EXACTLY the same (e.g., if auburn/copper, NOT blonde or brown)
- Do NOT idealize, beautify, or change any features
- Do NOT change gender presentation, age, or ethnicity
- Keep glasses if present, keep facial hair if present
- Maintain the same face proportions — if someone has a wider nose, keep it wider; if thin lips, keep thin

OUTPUT: Single character on clean white background, sticker format, no text, no borders. The person's friends and family must instantly recognize them.`;

      try {
        const aiResponse = await fetch(
          "https://ai.gateway.lovable.dev/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image",
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: prompt },
                    {
                      type: "image_url",
                      image_url: { url: photoBase64 },
                    },
                  ],
                },
              ],
              modalities: ["image", "text"],
            }),
          }
        );

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          console.error(`AI error for ${emotion}: ${aiResponse.status} ${errText}`);
          if (aiResponse.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait and try again.", results }), {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          if (aiResponse.status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds.", results }), {
              status: 402,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          continue;
        }

        const data = await aiResponse.json();
        const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (imageData) {
          const base64Content = imageData.replace(/^data:image\/\w+;base64,/, "");
          const bytes = Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0));

          const fileName = `${crypto.randomUUID()}.png`;
          const { error: uploadError } = await supabase.storage
            .from("stickers")
            .upload(fileName, bytes, { contentType: "image/png", upsert: true });

          if (uploadError) {
            console.error(`Upload error for ${emotion}:`, uploadError);
            continue;
          }

          const { data: urlData } = supabase.storage.from("stickers").getPublicUrl(fileName);

          results.push({
            label: emotion,
            url: urlData.publicUrl,
            animated: false,
          });
        }
      } catch (err) {
        console.error(`Generation error for ${emotion}:`, err);
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