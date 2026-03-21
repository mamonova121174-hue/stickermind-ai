import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("REPLICATE_API_TOKEN");
    if (!token) {
      return new Response(JSON.stringify({ error: "No REPLICATE_API_TOKEN" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Test 1: Check account
    const accountRes = await fetch("https://api.replicate.com/v1/account", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const accountText = await accountRes.text();

    // Test 2: Try a very cheap prediction (remove-bg)
    const predRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
        input: {
          image: "https://replicate.delivery/pbxt/IJECOPVHvuSGMjD0gbfmKvLyFwwHdMLdGEHKYsIkKCxrBySe/beauty.jpg",
        },
      }),
    });
    const predText = await predRes.text();

    return new Response(JSON.stringify({
      accountStatus: accountRes.status,
      accountBody: accountText,
      predictionStatus: predRes.status,
      predictionBody: predText,
      tokenPrefix: token.substring(0, 8) + "...",
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
