# BaroPlanner Cloud-Sync — Supabase Setup (einmalig, ~15 Min)

Ziel: iPhone und iPad syncen automatisch, und der Coach liest denselben Stand im Vault.
Dein DB-Admin-Key bleibt **serverseitig** in der Edge Function — im Handy steckt nur ein
selbst gewähltes Secret.

---

## 1. Projekt anlegen
1. Auf https://supabase.com mit GitHub/E-Mail einloggen → **New Project** (Free Tier).
2. Region: EU (z.B. Frankfurt). Projektname egal. Passwort merken.

## 2. Tabelle anlegen
Im Dashboard → **SQL Editor** → einfügen → **Run**:

```sql
create table if not exists public.baro_state (
  id text primary key,
  data jsonb,
  updated_at timestamptz default now()
);
-- RLS an, KEINE Policies: nur die Edge Function (Service Role) kommt an die Daten.
alter table public.baro_state enable row level security;
```

## 3. Secret setzen
Dashboard → **Project Settings → Edge Functions → Secrets** (oder Functions → Secrets) →
neues Secret:

- Name: `BARO_SECRET`
- Value: ein **langer Zufalls-String** (z.B. aus einem Passwort-Generator, 30+ Zeichen).
  Den brauchst du gleich auch in der App und im Pull-Skript.

> `SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY` sind in Edge Functions automatisch da —
> nichts weiter setzen.

## 4. Edge Function `baro-sync` anlegen
Dashboard → **Edge Functions → Create a new function** → Name: `baro-sync` →
Code-Editor leeren und das hier einfügen:

```ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SECRET = Deno.env.get("BARO_SECRET")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
const ROW_ID = "baran";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-baro-secret, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const given = req.headers.get("x-baro-secret") ||
    new URL(req.url).searchParams.get("secret");
  if (given !== SECRET) {
    return new Response("unauthorized", { status: 401, headers: cors });
  }
  const J = (o: unknown, status = 200) =>
    new Response(JSON.stringify(o), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("baro_state").select("data").eq("id", ROW_ID).maybeSingle();
    if (error) return J({ error: error.message }, 500);
    return J(data?.data ?? {});          // -> { data: <bundle>, mutatedAt: <num> }
  }

  if (req.method === "POST") {
    const body = await req.json();        // { data: <bundle>, mutatedAt: <num> }
    const { error } = await supabase.from("baro_state").upsert({
      id: ROW_ID, data: body, updated_at: new Date().toISOString(),
    });
    if (error) return J({ error: error.message }, 500);
    return J({ ok: true });
  }
  return new Response("method not allowed", { status: 405, headers: cors });
});
```

**Wichtig — JWT-Prüfung aus:** Diese Function authentifiziert über das eigene Secret,
nicht über Supabase-Login. Beim Deploy „**Verify JWT**" deaktivieren:
- Dashboard-Editor: im Function-Settings-Toggle „Verify JWT" **aus**.
- Oder CLI: `supabase functions deploy baro-sync --no-verify-jwt`

Deploy klicken. Die Function-URL sieht so aus:
`https://<projekt-ref>.supabase.co/functions/v1/baro-sync`

## 5. Test (am PC)
```bash
# Sollte 401 geben (falsches Secret):
curl -i https://<projekt-ref>.supabase.co/functions/v1/baro-sync

# Sollte {} oder Daten geben (richtiges Secret):
curl -s -H "X-Baro-Secret: DEIN-SECRET" https://<projekt-ref>.supabase.co/functions/v1/baro-sync
```

## 6. App verbinden (iPhone + iPad)
In der BaroPlanner-App → Coach-Tab → **🧠 Gedächtnis & Obsidian** aufklappen →
Bereich **☁️ Auto-Sync**:
- **URL**: die Function-URL aus Schritt 4
- **Secret**: dein `BARO_SECRET`
- **💾 Speichern** → sollte „✅ gesynct …" zeigen.

Auf dem **zweiten** Gerät dieselbe URL + dasselbe Secret eintragen. Fertig — beide syncen
automatisch (beim Öffnen ziehen, bei Änderung/Hintergrund senden).

## 7. Coach verbinden (PC)
Datei `baro-sync.config.json` neben `baro-pull.ps1` (wird beim ersten Lauf als Vorlage
erzeugt) mit URL + Secret füllen. Dann:
```
powershell -ExecutionPolicy Bypass -File "C:\Users\BRN\Desktop\BaranApp\baro-pull.ps1"
```
schreibt `osiris\04 Personal Development\tools\baro-state (C).md`. Der Coach liest das
bei Session-Start.

---

## 7b. Live-Sync (Realtime-Klingel, optional — iPhone ↔ iPad in Echtzeit)

Ohne das hier syncen die Geräte beim Öffnen/App-Wechsel. Mit Live-Sync sieht das iPhone
einen iPad-Haken in ~2 Sekunden, solange beide Apps offen sind.

1. Dashboard → **Project Settings → API** → **anon / public** Key kopieren.
2. In der App (auf **beiden** Geräten): Coach-Tab → Gedächtnis & Obsidian → Auto-Sync →
   Feld **„Anon Key"** einfügen → **Speichern**. Status zeigt dann „… · 🟢 live".

Technik: Supabase Realtime **Broadcast** als reine „Klingel" — Gerät A pusht seinen Stand
wie bisher über `baro-sync` und funkt danach nur `{mutatedAt, device}`. Gerät B hört das
und zieht den Stand über die gesicherte Function. Kein Tabellen-/Replication-Setup nötig.

Sicherheit: Der Anon-Key ist bei Supabase public by design. `baro_state` hat RLS **ohne**
Policies — der Anon-Key kommt an keine Daten. Im Broadcast stecken nie Nutzdaten, nur
Zeitstempel + zufällige Geräte-ID. Der Datenpfad bleibt komplett hinter deinem Secret.

## 8. Chat-Proxy `baro-chat` (optional, empfohlen)

Damit läuft der Coach über deine Supabase-Function statt direkt vom Handy zu Anthropic —
**der API-Key verlässt nie mehr den Server** und kann aus der App gelöscht werden.

1. Edge Functions → **Create function** → Name `baro-chat` → Code aus
   `Desktop\BaranApp\baro-chat-function.ts` einfügen → **Verify JWT AUS** → Deploy.
2. Neues Function-Secret: `ANTHROPIC_API_KEY` = dein `sk-ant-…`
   (`BARO_SECRET` existiert schon aus Schritt 3).
3. In der App: Coach-Tab → „Gedächtnis & Obsidian" → **Chat-Proxy & Push** →
   URL `https://<projekt-ref>.supabase.co/functions/v1/baro-chat` eintragen → Speichern.
4. Test: Chat-Nachricht schicken. Läuft sie, kannst du den API-Key im Handy löschen
   (Safari-Website-Daten der App oder einfach drin lassen — er wird nicht mehr benutzt).

## 9. Web-Push `baro-push` (echte Erinnerungen, iOS 16.4+)

Push funktioniert auf dem iPhone **nur** wenn die App über „Zum Home-Bildschirm"
installiert ist. Dann kann sich der Coach auch bei geschlossener App melden.

1. VAPID-Schlüsselpaar erzeugen (am PC):
   ```
   npx web-push generate-vapid-keys
   ```
2. SQL Editor → Tabelle anlegen:
   ```sql
   create table if not exists public.baro_push (
     endpoint text primary key,
     subscription jsonb,
     created_at timestamptz default now()
   );
   alter table public.baro_push enable row level security;
   ```
3. Edge Functions → **Create function** → Name `baro-push` → Code aus
   `Desktop\BaranApp\baro-push-function.ts` → **Verify JWT AUS** → Deploy.
   Function-Secrets: `VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` (aus Schritt 1).
4. Cron einrichten (alle 15 Min prüft der Server, ob eine Erinnerung fällig ist) —
   SQL Editor:
   ```sql
   create extension if not exists pg_cron;
   create extension if not exists pg_net;
   select cron.schedule(
     'baro-push-send', '*/15 * * * *',
     $$ select net.http_post(
          url := 'https://<projekt-ref>.supabase.co/functions/v1/baro-push',
          headers := '{"Content-Type":"application/json","X-Baro-Secret":"DEIN-SECRET"}'::jsonb,
          body := '{"action":"send"}'::jsonb
        ); $$
   );
   ```
   (`<projekt-ref>` + `DEIN-SECRET` ersetzen.) 
5. Auf dem iPhone (installierte App): Coach-Tab → **Chat-Proxy & Push** →
   VAPID **Public** Key eintragen → Speichern → **Push aktivieren** → erlauben.

Erinnerungszeiten (Berlin-Zeit, in `baro-push-function.ts` anpassbar):
07:00 Morgen · 13:00 Mittag (kennt deinen kcal-Stand) · 18:30 Essen-Warnung nur wenn
< 1.700 kcal eingetragen · 22:00 Schlafen · So 19:00 Wochen-Review.

---

## ✅ Scharfschalten — Checkliste (Stand: noch NICHT eingerichtet)

`baro-state (C).md` sagt „aktualisiert: noch nie" — d.h. die Kette lebt noch nicht.
Reihenfolge:

1. [x] Schritt 1–5 oben: Projekt, Tabelle, Secret, `baro-sync` deployen, curl-Test
2. [x] Schritt 6: URL + Secret in der App auf iPhone (und iPad) eintragen
3. [x] Schritt 7: `baro-sync.config.json` am PC füllen, `baro-pull.ps1` laufen lassen
       → `osiris\…\baro-state (C).md` füllt sich, der Coach kennt deinen Live-Stand
4. [x] Schritt 8: `baro-chat` (API-Key raus aus dem Handy)
5. [x] Schritt 9: `baro-push` (echte Erinnerungen)

## Sicherheit / Notizen
- Service-Role-Key verlässt nie den Server. Im Client liegt nur das Secret (wie ein API-Key).
- Der Anthropic-API-Key und die Sync-Zugangsdaten werden **nie** in die Cloud gesynct.
- Konflikt-Modell: Last-Write-Wins auf einem Dokument. Vor jedem Überschreiben sichert die App
  lokal `baran_cloud_backup`. Für Einzelnutzer (selten 2 Geräte gleichzeitig) robust.
  