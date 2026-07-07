# Baran Daily — Design-Konzept ("Logbuch")

Quelle der Wahrheit für das Redesign. In Impeccable als `DESIGN.md` ablegen, in Emil/Taste als Kontext mitgeben.

## 1. Produkt-Kontext (das "Warum")

- **Was:** Persönliches Life-/Fitness-OS. Tabs: Planung, Ernährung, Training, Ziele, Stats, AI-Coach.
- **Für wen:** Eine Person (du). Kein Team, keine Kunden, kein Marketing.
- **Job:** Schnell aufmachen, Tageslage checken/eintragen, wieder zu. Mehrmals am Tag.
- **Gefühl:** Wie ein gut gemachtes Trainingstagebuch — präzise wie ein Instrument, warm genug zum täglich-drin-leben.

Konsequenz fürs Design: Geschwindigkeit > Effekte. Daten sind der Held. Fast keine Animation, weil bei einem Tool das man 10x am Tag öffnet jede Animation langsam wirkt.

## 2. Design-Richtung

Konzept-Name: **Logbuch.** Signature-Element: Das **Tagesreadout** — jeder Tab öffnet oben mit einer präzisen Instrument-Zusammenfassung in tabellarischen Mono-Ziffern, mit einem einzigen Saffran-Marker für "heute". Das ganze App fühlt sich an wie das Umblättern in einem präzisen Logbuch.

Bewusst vermieden (die 3 typischen AI-Looks):

- Kein Cream-Hintergrund mit Serifen-Display + Terracotta (Editorial-Default).
- Kein Pechschwarz mit einem grellen Acid-Akzent (Dev-Tool-Default).
- Keine Haarlinien-Zeitungsspalten mit 0 Radius (Broadsheet-Default).

Stattdessen: warmes Graphit ("Tinte") als Default-Theme, echtes funktionales Mehrfarbsystem (weil ein Tracker echte Zustände hat: on-track / Achtung / drüber), Grotesk + Mono statt Serife, moderater Radius.

## 3. Farben (Tokens)

Default-Theme ist dunkel ("Tinte") — du nutzt es meist abends. Hell ("Papier") als Tag-Alternative. Marken-Akzent ist Saffran-Gold, sparsam (nur "heute" / Primär-Aktion). Bewusst nicht Terracotta — Gold knüpft an Wärme + deinen osmanisch/esoterischen Faden an.

### Dunkel — "Tinte" (Default)

```css
--bg:           #17150F;  /* warmes Graphit, kein kaltes Slate */
--surface:      #201D15;
--surface-2:    #2A2619;
--rule:         #2F2B1C;
--rule-strong:  #38331F;
--ink:          #EFE9DB;  /* warmes Off-White, nie reines Weiß */
--ink-muted:    #9A8F7B;

--accent:       #E0A93B;  /* Saffran-Gold — Marke / "heute" / Primär */
--ok:           #7BAE70;  /* Salbei — on track, erledigt */
--caution:      #E8B452;  /* Amber — nur in Daten/Gauges */
--over:         #D26A4E;  /* Lehm-Rot — drüber, verpasst, Gefahr */
--info:         #6E92B8;  /* Schiefer-Blau — neutrale Info */
```

### Hell — "Papier" (Tag-Alternative)

```css
--bg:           #F6F1E7;  /* warmes Arbeitspapier, kein Editorial-Cream */
--surface:      #FCF8F0;  /* leicht erhabene Fläche */
--surface-2:    #F1EADC;  /* tiefere Fläche / Felder */
--rule:         #E2D8C5;  /* warme Trennlinie */
--rule-strong:  #D4C7AE;
--ink:          #232019;  /* warmes Fast-Schwarz, nie #000 */
--ink-muted:    #6F665A;

--accent:       #C98A1E;  /* Saffran-Gold (etwas tiefer für Hell) */
--ok:           #5C8A52;
--caution:      #E0A53D;
--over:         #B5482F;
--info:         #4A6B8A;
```

Regeln: Akzent ist teuer — maximal 1 Saffran-Element pro Screen. Status-Farben nur funktional, nie dekorativ. Kein grauer Text auf farbigen Flächen (Lesbarkeit prüfen).

## 4. Typografie

Drei Rollen, eine Familie als Klammer (Plex bindet Body + Mono zusammen), Bricolage gibt Charakter. Kein Inter.

```
Display / Headlines / große Readout-Zahlen:  Bricolage Grotesque   (700/600, enges Tracking)
Body / UI:                                   IBM Plex Sans         (400/500/600)
Daten / Ziffern / Tabellen:                  IBM Plex Mono         (tabular-nums, 500)
```

Warum: Plex ist eine Engineering-Familie (passt zum Instrument-Gefühl) und nicht Inter. Mono mit `font-variant-numeric: tabular-nums` ist Pflicht damit Zahlen in Tabellen/Stats sauber untereinander stehen.

### Skala (mobile-first)

```
Hero-Zahl (Readout):  44px  Bricolage 700   tracking -0.02em
Tab-Titel:            28px  Bricolage 700
Sektion (h2):         20px  Plex Sans 600
Body:                 16px  Plex Sans 400   line-height 1.5
Label / Eyebrow:      13px  Plex Sans 600   uppercase, tracking 0.06em, --ink-muted
Daten inline:         16px  Plex Mono 500   tabular-nums
Daten groß:           32px  Plex Mono 500   tabular-nums
```

## 5. Layout & Geometrie

- 8px-Grid (4px für Feinabstände). Abstände: 4 / 8 / 12 / 16 / 24 / 32 / 48.
- Radius: 10px Karten, 8px Controls, 999px nur für Toggles/Pills.
- Border: 1px `--rule`.
- Mobile-first, PWA. Navigation als Bottom-Tab-Bar (Daumenreichweite), nicht oben.
- Keine verschachtelten Karten. Struktur über Abstand + Trennlinien + sparsame Erhebung (`--surface` → `--surface-2`), nicht Karte-in-Karte.
- Jeder Tab = ein fokussierter View. Oben das Tagesreadout, darunter die Liste/Eingabe.

### Wireframe (Beispiel Tab "Ernährung")

```
┌─────────────────────────────┐
│ ERNÄHRUNG            [heute] │  ← Eyebrow + Saffran-Marker
│                             │
│  1.840 / 2.300 kcal         │  ← Hero-Readout, Mono tabular
│  ▓▓▓▓▓▓▓▓▓▓▓░░░  80%        │  ← Gauge (ok→caution→over)
│  P 142  ·  K 180  ·  F 61   │  ← Makros, Mono
│ ─────────────────────────── │  ← rule
│  ○  Frühstück        540    │  ← Checklist-Zeile
│  ●  Mittag           720    │
│  ○  Snack             —     │
│           [ + Mahlzeit ]    │  ← Primär = Saffran
└─────────────────────────────┘
```

## 6. Motion (Emil-Prinzipien)

Tool das oft auf geht → Animation ist Standard AUS bei Hochfrequenz-Aktionen.

```css
--ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
--t-instant:  0ms;     /* Tab-Wechsel, Navigation */
--t-quick:    150ms;   /* Toggle, Häkchen, Hover */
--t-enter:    200ms;   /* Sheets / Modals rein */
--t-fill:     400ms;   /* Fortschrittsbalken füllt — nur einmal */
```

- Tab-Wechsel instant, kein Slide.
- Nur Feedback animieren: Mahlzeit/Satz abhaken → kurzer Scale (0.95→1) + Farbwechsel in 150ms.
- Readout-Zahl darf beim ersten Laden eines Stats-Views hochzählen — nicht bei jedem Tab-Wechsel.
- `prefers-reduced-motion` respektieren.

## 7. Komponenten (Kern)

- **Tagesreadout:** Hero-Zahl (Mono) + Gauge + Sekundär-Werte. Das Herzstück jedes Tabs.
- **Gauge / Progressbar:** füllt ok→caution→over je nach Stand. Tabular-Ziffer daneben.
- **Checklist-Zeile:** Kreis (offen) / gefüllt (erledigt) + Label + Mono-Wert rechts.
- **Segmented Control:** für Filter im Tab. Aktiv = Saffran-Unterstrich, nicht gefüllte Box.
- **Sheet:** Eingaben von unten rein, 200ms `--ease-out`.
- **AI-Coach:** schlichte Chat-Zeilen. Deine Nachricht rechts (`--surface-2`), Coach links. Keine Bubbles mit dicken Schatten.
- **Empty State:** kein Mood-Bild — ein Satz der zur Aktion auffordert.

## 8. Sprache / Copy

- Direktes Deutsch, Trainingspartner-Ton. Kein Corporate-Füllwort.
- Sentence case, aktive Verben. Button sagt was passiert: "Mahlzeit eintragen", nicht "Absenden".
- Fehler entschuldigen sich nicht, sie sagen was zu tun ist: "Kein Eintrag heute. Trag deine erste Mahlzeit ein."
- Ein Element, ein Job.

## 9. Anti-Patterns (hartes Nein)

- ❌ Inter als Font.
- ❌ Lila/Blau-Verläufe, dunkle Glows.
- ❌ Karte-in-Karte.
- ❌ Emojis als Icons → stattdessen Phosphor oder Lucide.
- ❌ Grauer Text auf farbiger Fläche.
- ❌ Zentrierter Hero / Marketing-Layout.
- ❌ Dekorative 01/02/03-Marker ohne echte Reihenfolge.
- ❌ Animation bei Tab-Wechsel oder anderen Hochfrequenz-Aktionen.
