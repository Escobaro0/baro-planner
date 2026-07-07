const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-baro-secret, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const ROW_ID = "baran";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const J = (o: unknown, status = 200) =>
    new Response(typeof o === "string" ? o : JSON.stringify(o),
      { status, headers: { ...cors, "Content-Type": "application/json" } });
  try {
    const SECRET = Deno.env.get("BARO_SECRET");
    const given = req.headers.get("x-baro-secret") || new URL(req.url).searchParams.get("secret");
    if (!SECRET || given !== SECRET) return J("unauthorized", 401);

    const base = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!base || !key) return J({ error: "env missing", hasUrl: !!base, hasKey: !!key }, 500);
    const h = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

    if (req.method === "GET") {
      const r = await fetch(`${base}/rest/v1/baro_state?id=eq.${ROW_ID}&select=data`, { headers: h });
      if (!r.ok) return J({ error: "db get " + r.status, detail: await r.text() }, 500);
      const rows = await r.json();
      return J(rows[0]?.data ?? {});
    }
    if (req.method === "POST") {
      const body = await req.json();
      const r = await fetch(`${base}/rest/v1/baro_state`, {
        method: "POST",
        headers: { ...h, Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ id: ROW_ID, data: body, updated_at: new Date().toISOString() }),
      });
      if (!r.ok) return J({ error: "db post " + r.status, detail: await r.text() }, 500);
      return J({ ok: true });
    }
    return J("method not allowed", 405);
  } catch (e) {
    return J({ error: String((e as Error)?.message ?? e) }, 500);
  }
});
