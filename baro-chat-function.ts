// baro-chat — Anthropic-Proxy für den BaroPlanner-Coach.
// Der API-Key bleibt serverseitig (Function-Secret ANTHROPIC_API_KEY),
// im Client liegt nur noch das Baro-Secret. Streaming (SSE) wird 1:1
// durchgereicht, normale JSON-Antworten ebenso.
//
// Deploy: Supabase Dashboard → Edge Functions → "baro-chat" → diesen Code
// einfügen → "Verify JWT" AUS → Deploy. Secrets: BARO_SECRET (wie baro-sync)
// + ANTHROPIC_API_KEY (dein sk-ant-…).
//
// In der App: Coach-Tab → Gedächtnis & Obsidian → "Chat-Proxy & Push" →
// URL https://<projekt-ref>.supabase.co/functions/v1/baro-chat eintragen.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-baro-secret, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") {
    return new Response("method not allowed", { status: 405, headers: cors });
  }

  const SECRET = Deno.env.get("BARO_SECRET");
  const given = req.headers.get("x-baro-secret");
  if (!SECRET || given !== SECRET) {
    return new Response("unauthorized", { status: 401, headers: cors });
  }

  const KEY = Deno.env.get("ANTHROPIC_API_KEY");
  if (!KEY) {
    return new Response(
      JSON.stringify({ error: { message: "ANTHROPIC_API_KEY fehlt – als Function-Secret setzen" } }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": KEY,
    },
    body: await req.text(), // Request-Body 1:1 durchreichen (inkl. stream:true)
  });

  const headers = new Headers(cors);
  headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/json");
  return new Response(upstream.body, { status: upstream.status, headers });
});
