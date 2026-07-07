// baro-push — Web-Push für den BaroPlanner-Coach (iOS 16.4+ PWA).
//
// Zwei Jobs in einer Function:
//   1. POST { subscription } (von der App, mit X-Baro-Secret)  → Subscription speichern
//   2. POST { action:"send" } (vom pg_cron, alle 15 Min)       → fällige Erinnerung pushen
//
// Die Send-Logik nutzt den letzten App-Stand aus baro_state (kcal heute usw.),
// damit die Erinnerungen nicht dumm sind, sondern den echten Stand kennen.
//
// Secrets: BARO_SECRET, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY
// (VAPID-Keys erzeugen: `npx web-push generate-vapid-keys`)
// Tabelle: siehe SUPABASE-SETUP.md Abschnitt 9.
// Deploy mit "Verify JWT" AUS.

import webpush from "npm:web-push@3.6.7";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-baro-secret, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const J = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });

function berlinNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("method not allowed", { status: 405, headers: cors });

  const SECRET = Deno.env.get("BARO_SECRET");
  const given = req.headers.get("x-baro-secret") || new URL(req.url).searchParams.get("secret");
  if (!SECRET || given !== SECRET) return new Response("unauthorized", { status: 401, headers: cors });

  const base = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const dbHeaders = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  const body = await req.json().catch(() => ({}));

  // ── 1. Subscription registrieren ──
  if (body.subscription && body.subscription.endpoint) {
    const r = await fetch(`${base}/rest/v1/baro_push`, {
      method: "POST",
      headers: { ...dbHeaders, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ endpoint: body.subscription.endpoint, subscription: body.subscription }),
    });
    if (!r.ok) return J({ error: "db " + r.status, detail: await r.text() }, 500);
    return J({ ok: true });
  }

  // ── 2. Cron-Send ──
  if (body.action === "send") {
    const pub = Deno.env.get("VAPID_PUBLIC_KEY");
    const priv = Deno.env.get("VAPID_PRIVATE_KEY");
    if (!pub || !priv) return J({ error: "VAPID-Keys fehlen" }, 500);
    webpush.setVapidDetails("mailto:baro@ayazsin.dev", pub, priv);

    const now = berlinNow();
    const slot = now.getHours() * 60 + now.getMinutes();
    const isSunday = now.getDay() === 0;
    // Cron läuft alle 15 Min → ±8-Minuten-Fenster um die Zielzeit
    const inWindow = (hh: number, mm: number) => Math.abs(slot - (hh * 60 + mm)) < 8;

    // Letzten App-Stand lesen (kcal heute), damit Reminder den echten Stand kennen
    let kcalToday = 0, kcalKnown = false;
    try {
      const r = await fetch(`${base}/rest/v1/baro_state?id=eq.baran&select=data`, { headers: dbHeaders });
      const rows = await r.json();
      const bundle = rows[0]?.data?.data;
      const v2raw = bundle?.extra?.baran_v2;
      if (v2raw) {
        const v2 = JSON.parse(v2raw);
        const todayStr = now.toDateString();
        if (v2.date === todayStr && Array.isArray(v2.todayLog)) {
          kcalToday = v2.todayLog.reduce((s: number, l: { kcal?: number }) => s + (l.kcal || 0), 0);
          kcalKnown = true;
        }
      }
    } catch (_e) { /* ohne Stand → generische Texte */ }

    let msg: { title: string; body: string; tag: string } | null = null;
    if (inWindow(7, 0)) {
      msg = { title: "Coach – Morgen ☀️", body: "Neuer Tag. Frühstück + Wasser, dann läuft der Rest.", tag: "morgen" };
    } else if (inWindow(13, 0)) {
      msg = kcalKnown && kcalToday < 800
        ? { title: "Coach – Mittag", body: `Erst ${kcalToday} kcal eingetragen – iss was Ordentliches und trag es ein.`, tag: "mittag" }
        : { title: "Coach – Mittag", body: "Halbzeit. Alles im Plan?", tag: "mittag" };
    } else if (inWindow(18, 30)) {
      if (kcalKnown && kcalToday < 1700) {
        msg = { title: "Ernährung ⚠️", body: `Stand: ${kcalToday} kcal. Abendessen + Shake nicht vergessen.`, tag: "essen" };
      }
    } else if (inWindow(22, 0)) {
      msg = { title: "Schlafenszeit 🌙", body: "Handy weg. Schlaf = Muskeln.", tag: "schlaf" };
    } else if (isSunday && inWindow(19, 0)) {
      msg = { title: "Wochen-Review 🗓️", body: "Zeit für den Wochen-Review – App öffnen, Ziele-Tab.", tag: "review" };
    }
    if (!msg) return J({ ok: true, sent: 0 });

    const subsRes = await fetch(`${base}/rest/v1/baro_push?select=endpoint,subscription`, { headers: dbHeaders });
    const subs = await subsRes.json();
    let sent = 0;
    for (const row of subs) {
      try {
        await webpush.sendNotification(row.subscription, JSON.stringify(msg));
        sent++;
      } catch (e) {
        // 404/410 = Subscription tot → aufräumen
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) {
          await fetch(`${base}/rest/v1/baro_push?endpoint=eq.${encodeURIComponent(row.endpoint)}`, {
            method: "DELETE", headers: dbHeaders,
          }).catch(() => {});
        }
      }
    }
    return J({ ok: true, sent, msg: msg.tag });
  }

  return J({ error: "unbekannte Aktion" }, 400);
});
