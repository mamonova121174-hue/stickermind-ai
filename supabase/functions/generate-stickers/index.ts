import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STYLE_PROMPTS: Record<string, string> = {
  pixar:
    "3D Pixar/Disney animation style, polished animated-film character render, rounded forms, expressive eyes, clean sculpted hair shapes, soft cinematic lighting, vibrant but believable colors, premium family-film finish",
  gta: "GTA V loading screen illustration style, sharp graphic outlines, assertive cel shading, gritty sunlit contrast, urban swagger, poster-like composition, stylized realism with bold facial planes and confident attitude",
  ghibli:
    "Studio Ghibli / Hayao Miyazaki character illustration style, hand-painted anime look, soft watercolor texture, delicate linework, gentle warmth, natural facial simplicity, storybook atmosphere",
  cyberpunk:
    "Cyberpunk 2077 inspired character art, rebellious futuristic streetwear, sharp lighting, magenta and electric blue neon reflections, holographic details, rain-slick cinematic mood, edgy high-contrast attitude",
  lineart:
    "Editorial fashion line-art illustration, elegant ink contours, recognizable facial structure, selective color accents, clean negative space, premium magazine sketch quality",
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

      const prompt = `This is a STRICT IDENTITY-PRESERVATION task, not a generic character design task.

First, study the uploaded photo and internally lock these identity traits:
1. exact face shape and jawline
2. eye size, eye spacing, eyelid shape, eyebrow shape
3. exact nose bridge, width, tip shape
4. lip shape, mouth width, smile line shape
5. hairline, exact hair color, hair volume, texture, length, parting
6. skin tone and facial contrast
7. age impression, ethnicity, gender presentation
8. any unique details that make friends recognize this person instantly
9. clothing silhouette and color palette from the original photo unless a pose prop is required

Now create ONE sticker of THIS SAME PERSON in ${stylePrompt} style.
Pose: ${posePrompt}.

NON-NEGOTIABLE RULES:
- The face must remain clearly recognizable as the uploaded person at first glance
- Use the uploaded photo as the identity source of truth; style only the rendering, never the identity
- Preserve the exact craniofacial geometry from the photo: face width, jaw shape, cheek volume, eye spacing, nose proportions, lip shape
- Keep the same hair color exactly; if the photo shows natural red/auburn/copper hair, it must stay natural red/auburn/copper in every style
- Do not replace the hairstyle, bangs, part, face proportions, eye shape, or nose shape with generic style defaults
- Do not turn the person into a different model, influencer, doll, emoji, or random anime face
- Do not make the face slimmer, younger, prettier, more symmetrical, or more generic
- Keep outfit colors close to the original photo; do not invent a yellow hoodie or random clothing from examples
- Props are allowed only when required by the pose, but the person must still read as the same individual
- Style intensity must be strong, but likeness is ALWAYS higher priority than style exaggeration
- If there is any conflict between style and likeness, preserve likeness
- This must look like a stylized transformation of the uploaded person, not a newly invented character inspired by them
- Face visibility is critical: compose the sticker so the head and face are prominent and easy to recognize
- Prefer waist-up or three-quarter composition when possible so the face stays large and readable; use full body only if the pose absolutely requires it
- Keep the same expression anatomy even when changing the emotion: same eye structure, same smile line shape, same brow structure

HARD NEGATIVE INSTRUCTIONS:
- no generic beautiful-face replacement
- no random fashion model face
- no doll-like symmetry
- no face swapping to match common style stereotypes
- no changing hair to blonde, pink, black, or generic brown unless the original photo actually has that color
- no changing clothing into a random sample outfit from reference examples

STYLE TARGET:
- Make the style unmistakable and authentic to ${style}, while preserving the same identity across all styles
- The result should feel like the same woman transformed into another art direction, not five different women

OUTPUT:
- single character sticker
- white clean background
- no text, no border, no extra characters
- highly recognizable face
- face should occupy enough of the frame to be recognizable in small gallery cards
- premium polished render suitable for a professional sticker pack showcase`;

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
                model: "google/gemini-3-pro-image-preview",
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