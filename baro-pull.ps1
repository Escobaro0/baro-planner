<#
  baro-pull.ps1 — Holt den Live-Stand der BaroPlanner-App aus Supabase
  und schreibt ihn als lesbare Markdown-Datei in den osiris-Vault.

  Einbahn: App -> Cloud -> Vault. Dieses Skript LIEST nur aus der Cloud,
  es schreibt nie zurück.

  Konfig:  baro-sync.config.json  (neben diesem Skript, NICHT im iCloud-Vault)
           { "url": "https://<projekt>.supabase.co/functions/v1/baro-sync",
             "secret": "<dein-langer-zufalls-secret>" }

  Aufruf:  powershell -ExecutionPolicy Bypass -File baro-pull.ps1
#>

$ErrorActionPreference = 'Stop'

$cfgPath = Join-Path $PSScriptRoot 'baro-sync.config.json'
$vaultFile = 'C:\Users\BRN\iCloudDrive\iCloud~md~obsidian\osiris\04 Personal Development\tools\baro-state (C).md'

if (-not (Test-Path $cfgPath)) {
  @{ url = 'https://DEIN-PROJEKT.supabase.co/functions/v1/baro-sync'; secret = 'HIER-DEIN-SECRET' } |
    ConvertTo-Json | Out-File -FilePath $cfgPath -Encoding utf8
  Write-Host "Config-Vorlage angelegt: $cfgPath  -> URL + Secret eintragen, dann erneut starten." -ForegroundColor Yellow
  exit 1
}

$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
if (-not $cfg.url -or -not $cfg.secret -or $cfg.secret -eq 'HIER-DEIN-SECRET') {
  Write-Host "Bitte url + secret in $cfgPath eintragen." -ForegroundColor Red
  exit 1
}

# GET an die Edge Function. Antwort = { data: <bundle>, mutatedAt: <num> }
$resp = Invoke-RestMethod -Uri $cfg.url -Method Get -Headers @{ 'X-Baro-Secret' = $cfg.secret }
$bundle = if ($resp.data) { $resp.data } else { $resp }   # Fallback, falls flach geliefert

if (-not $bundle -or -not $bundle.profile) {
  Write-Host "Noch kein Stand in der Cloud (App hat noch nicht gepusht)." -ForegroundColor Yellow
  exit 0
}

$p = $bundle.profile
$now = Get-Date -Format 'dd.MM.yyyy HH:mm'
$mutated = if ($resp.mutatedAt) { (Get-Date '1970-01-01').AddMilliseconds([double]$resp.mutatedAt).ToLocalTime().ToString('dd.MM.yyyy HH:mm') } else { 'unbekannt' }

$L = New-Object System.Collections.Generic.List[string]
$L.Add('---')
$L.Add('typ: coach-data')
$L.Add('quelle: BaroPlanner-PWA (Auto-Sync via Supabase)')
$L.Add("aktualisiert: $now")
$L.Add('---')
$L.Add('')
$L.Add('# BaroPlanner — Live-Stand (C)')
$L.Add('')
$L.Add("> Auto-generiert von ``baro-pull.ps1`` aus der App. **Nicht von Hand editieren** — wird beim nächsten Pull überschrieben.")
$L.Add("> Letzte Datenänderung in der App: **$mutated**")
$L.Add('')

# --- Profil ---
$L.Add('## Profil')
$L.Add("- **$($p.name)**, $($p.age) Jahre, $($p.city) — $($p.job)")
$L.Add("- Ziel: $($p.goal)")
if ($p.currentWeight) { $L.Add("- Aktuelles Gewicht: **$($p.currentWeight) kg**") }
$L.Add("- Training: $($p.training)")
if ($p.lastMoodSignal) { $L.Add("- Letztes Mood-Signal: **$($p.lastMoodSignal)** ($($p.lastMoodDate))") }
$L.Add('')

# --- Ziele ---
$L.Add('## Ziele')
if ($bundle.goals) {
  foreach ($g in $bundle.goals) {
    $pct = if ($g.target) { [math]::Round(100.0 * $g.current / $g.target) } else { 0 }
    $L.Add("- **$($g.title)**: $($g.current)/$($g.target) $($g.unit) ($pct%) — Deadline $($g.deadline)")
  }
} else { $L.Add('- (keine)') }
$L.Add('')

# --- Letzte Tage ---
$L.Add('## Letzte Tage (Score / kcal / Protein)')
if ($bundle.dayHistory) {
  $days = $bundle.dayHistory.PSObject.Properties | Sort-Object Name | Select-Object -Last 10
  foreach ($d in $days) {
    $v = $d.Value
    $L.Add("- $($d.Name): Score $($v.score)% · $($v.kcalTotal) kcal · $($v.proteinTotal)g Protein")
  }
} else { $L.Add('- (keine)') }
$L.Add('')

# --- Dauerhafte Fakten ---
$L.Add('## Dauerhafte Fakten (Coach-Gedächtnis)')
if ($p.facts) { foreach ($f in $p.facts) { $L.Add("- $f") } } else { $L.Add('- (keine)') }
$L.Add('')

# --- Erinnerungen (letzte 15) ---
$L.Add('## Erinnerungen (letzte 15)')
if ($p.memories) {
  $mem = $p.memories | Select-Object -Last 15
  foreach ($m in $mem) { $L.Add("- ($($m.date)) $($m.text)") }
} else { $L.Add('- (keine)') }
$L.Add('')

# --- Roh-JSON (verlustfrei, für Detailfragen) ---
$L.Add('## Roh-Snapshot (JSON)')
$L.Add('```json')
$L.Add(($bundle | ConvertTo-Json -Depth 12 -Compress))
$L.Add('```')

# Zielordner sicherstellen + schreiben
$dir = Split-Path $vaultFile -Parent
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$L -join "`r`n" | Out-File -FilePath $vaultFile -Encoding utf8

Write-Host "OK -> $vaultFile" -ForegroundColor Green
