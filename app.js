// ═══════════════════════════════════════════
// KI-MODELLE (zentral – hier einmal ändern)
// ═══════════════════════════════════════════
const CHAT_MODEL    = 'claude-haiku-4-5';   // schneller Alltags-Chat
const ADVISOR_MODEL = 'claude-sonnet-4-6';  // Reviews, Phasen-Check, Empfehlungen

// ═══════════════════════════════════════════
// DATA: SCHEDULES
// ═══════════════════════════════════════════
const schedules = {
  baustelle:{
    fri:[
      {time:"05:00",title:"Aufstehen",desc:"Wasser trinken",cat:"morning"},
      {time:"05:10",title:"Frühstück 🥚",desc:"Eier + Tortilla + Avocado. MyFitnessPal eintragen.",cat:"meal",tag:"health"},
      {time:"05:50",title:"Abfahrt 🏗️",desc:"Wasserflasche + Ausrüstung gecheckt?",cat:"work",tag:"must"},
      {time:"12:00",title:"Feierabend ✅",desc:"Freitag kurzer Tag!",cat:"work"},
      {time:"13:00",title:"Zu Hause – Mittagessen",desc:"Hähnchen + Reis/Bulgur. Snack: Nüsse + Banane.",cat:"meal",tag:"health"},
      {time:"14:00",title:"TRAINING 💪",desc:"Bester Trainingstag! 5-Dips-Power-Plan ~60 Min.",cat:"sport",tag:"training"},
      {time:"15:15",title:"Post-Workout 🥚",desc:"3–4 Eier oder Shake sofort!",cat:"meal",tag:"health"},
      {time:"16:00",title:"Führerschein-App 🚗",desc:"15–20 Min. Du bist bei 46%!",cat:"habit",tag:"habit"},
      {time:"18:30",title:"Abendessen",desc:"Griechischer Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"22:00",title:"Handy weg 🌙",desc:"",cat:"sleep"},
      {time:"22:30",title:"Schlafen 😴",desc:"Schlaf = Muskeln wachsen",cat:"sleep"},
    ],
    default:[
      {time:"05:00",title:"Aufstehen",desc:"Wasser trinken",cat:"morning"},
      {time:"05:10",title:"Frühstück 🥚",desc:"Eier + Tortilla + Avocado. Eintragen.",cat:"meal",tag:"health"},
      {time:"05:50",title:"Abfahrt 🏗️",desc:"Wasserflasche! Heute 4 L Wasser.",cat:"work",tag:"must"},
      {time:"17:00",title:"Feierabend",desc:"Heimweg",cat:"work"},
      {time:"18:00",title:"EXTRA SHAKE 🥤",desc:"Pflicht! Haferflocken + Erdnussbutter + Milch + Banane.",cat:"meal",tag:"health"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"19:00",title:"Führerschein-App 🚗",desc:"15 Min. Jeden Tag.",cat:"habit",tag:"habit"},
      {time:"19:20",title:"Spaziergang 20 Min",desc:"Aktive Erholung. Kein Training heute.",cat:"sport"},
      {time:"22:00",title:"Handy weg 🌙",desc:"Morgen 05:00 Uhr",cat:"sleep",tag:"must"},
      {time:"22:30",title:"Schlafen 😴",desc:"",cat:"sleep"},
    ]
  },
  lehrbauhof:{default:[
    {time:"05:00",title:"Aufstehen",desc:"",cat:"morning"},
    {time:"05:10",title:"Frühstück 🥚",desc:"Eier + Tortilla. Eintragen.",cat:"meal",tag:"health"},
    {time:"05:50",title:"Abfahrt 🔧",desc:"Mo–Do 07–15 / Fr 07–13",cat:"work",tag:"must"},
    {time:"15:00",title:"Feierabend",desc:"16:00 zuhause",cat:"work"},
    {time:"16:00",title:"Mittagessen + Shake",desc:"Hähnchen + Reis. Extra-Shake empfohlen.",cat:"meal",tag:"health"},
    {time:"16:30",title:"TRAINING 💪",desc:"Mo/Mi/Fr: Plan. Di/Do: Spaziergang.",cat:"sport",tag:"training"},
    {time:"17:30",title:"Post-Workout 🥚",desc:"3–4 Eier sofort.",cat:"meal",tag:"health"},
    {time:"18:30",title:"Abendessen",desc:"Joghurt + Snack. Eintragen.",cat:"meal",tag:"health"},
    {time:"19:00",title:"Führerschein-App 🚗",desc:"15 Min.",cat:"habit",tag:"habit"},
    {time:"22:00",title:"Handy weg 🌙",desc:"Morgen 05:00 Uhr",cat:"sleep",tag:"must"},
    {time:"22:30",title:"Schlafen 😴",desc:"",cat:"sleep"},
  ]},
  schule:{
    mo:[
      {time:"08:00",title:"Aufstehen",desc:"",cat:"morning"},
      {time:"08:15",title:"Frühstück 🥚",desc:"Eier + Tortilla + Avocado. Eintragen.",cat:"meal",tag:"health"},
      {time:"08:35",title:"Führerschein-App 🚗",desc:"15 Min morgens!",cat:"habit",tag:"habit"},
      {time:"09:15",title:"Abfahrt Schule",desc:"SCL D/Kom 09:50",cat:"work",tag:"must"},
      {time:"15:00",title:"Schule Ende",desc:"GES BTG",cat:"work"},
      {time:"16:00",title:"Mittagessen",desc:"Hähnchen + Reis/Bulgur",cat:"meal",tag:"health"},
      {time:"16:30",title:"TRAINING 💪",desc:"5-Dips-Power-Plan ~55 Min.",cat:"sport",tag:"training"},
      {time:"17:30",title:"Post-Workout 🥚",desc:"3–4 Eier direkt.",cat:"meal",tag:"health"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"22:30",title:"Schlafen 🌙",desc:"Morgen Di: 08:00",cat:"sleep"},
    ],
    di:[
      {time:"06:00",title:"Aufstehen",desc:"",cat:"morning"},
      {time:"06:15",title:"Frühstück 🥚",desc:"Eier + Tortilla. Eintragen.",cat:"meal",tag:"health"},
      {time:"06:45",title:"Abfahrt",desc:"BÖN WiSo 08:00",cat:"work",tag:"must"},
      {time:"15:00",title:"Schule Ende",desc:"SCL BTG",cat:"work"},
      {time:"16:00",title:"Mittagessen",desc:"Hähnchen + Reis.",cat:"meal",tag:"health"},
      {time:"16:30",title:"Schulstoff 20 Min",desc:"Di = kein Training, Erholung.",cat:"learn"},
      {time:"17:00",title:"Führerschein-App 🚗",desc:"15 Min",cat:"habit",tag:"habit"},
      {time:"17:30",title:"Spaziergang 30 Min",desc:"Aktive Erholung",cat:"sport"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Snack. Eintragen.",cat:"meal",tag:"health"},
      {time:"22:30",title:"Schlafen 🌙",desc:"Morgen Mi: 08:00",cat:"sleep"},
    ],
    mi:[
      {time:"06:00",title:"Aufstehen",desc:"",cat:"morning"},
      {time:"06:15",title:"Frühstück 🥚",desc:"Eier + Tortilla. Eintragen.",cat:"meal",tag:"health"},
      {time:"06:45",title:"Abfahrt",desc:"SCL D/Kom 08:00",cat:"work",tag:"must"},
      {time:"13:20",title:"Schule Ende ✅",desc:"Früher Feierabend!",cat:"work"},
      {time:"14:30",title:"Mittagessen",desc:"Großes Essen: Hähnchen + Reis + Gemüse",cat:"meal",tag:"health"},
      {time:"15:00",title:"TRAINING 💪",desc:"Bester Schultag zum Trainieren!",cat:"sport",tag:"training"},
      {time:"16:15",title:"Post-Workout 🥚",desc:"3–4 Eier oder Shake sofort.",cat:"meal",tag:"health"},
      {time:"16:30",title:"Führerschein-App 🚗",desc:"20 Min",cat:"habit",tag:"habit"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"22:30",title:"Schlafen 🌙",desc:"Morgen Do: 08:00",cat:"sleep"},
    ],
    do:[
      {time:"06:00",title:"Aufstehen",desc:"",cat:"morning"},
      {time:"06:15",title:"Frühstück 🥚",desc:"Eier + Tortilla. Eintragen.",cat:"meal",tag:"health"},
      {time:"06:45",title:"Abfahrt",desc:"POT E1 08:00",cat:"work",tag:"must"},
      {time:"15:00",title:"Schule Ende",desc:"OTG BTG",cat:"work"},
      {time:"16:00",title:"Mittagessen",desc:"Hähnchen + Bulgur/Kartoffeln.",cat:"meal",tag:"health"},
      {time:"16:30",title:"Schulstoff",desc:"Do = Wiederholen für Fr.",cat:"learn"},
      {time:"17:00",title:"Führerschein-App 🚗",desc:"15 Min",cat:"habit",tag:"habit"},
      {time:"17:30",title:"Spaziergang 30 Min",desc:"Aktive Erholung",cat:"sport"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Snack. Eintragen.",cat:"meal",tag:"health"},
      {time:"22:30",title:"Schlafen 🌙",desc:"Morgen Fr: 09:50",cat:"sleep"},
    ],
    fr:[
      {time:"08:00",title:"Aufstehen",desc:"Wochenende naht!",cat:"morning"},
      {time:"08:15",title:"Frühstück 🥚",desc:"Eier + Tortilla. Eintragen.",cat:"meal",tag:"health"},
      {time:"08:35",title:"Führerschein-App 🚗",desc:"15 Min morgens",cat:"habit",tag:"habit"},
      {time:"09:15",title:"Abfahrt",desc:"HAU M1 09:50",cat:"work",tag:"must"},
      {time:"15:00",title:"Schule Ende",desc:"BÖN WiSo + SCL BTG",cat:"work"},
      {time:"16:00",title:"Mittagessen",desc:"Hähnchen + Reis",cat:"meal",tag:"health"},
      {time:"16:30",title:"TRAINING 💪",desc:"Dritter Trainingstag! Alles geben.",cat:"sport",tag:"training"},
      {time:"17:45",title:"Post-Workout 🥚",desc:"3–4 Eier sofort.",cat:"meal",tag:"health"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"19:00",title:"Freizeit 🎉",desc:"Alles durchgezogen!",cat:"free"},
      {time:"23:00",title:"Schlafen",desc:"",cat:"sleep"},
    ],
  },
  // ─── WOCHENENDE (gilt für alle Modi) ───
  weekend:{
    sa:[
      {time:"08:00",title:"Aufstehen 😴",desc:"Ausschlafen – du hast es dir verdient",cat:"morning"},
      {time:"08:30",title:"Frühstück 🥚",desc:"Großes Frühstück – Eier + Tortilla + Avocado. Eintragen.",cat:"meal",tag:"health"},
      {time:"09:30",title:"Führerschein-App 🚗",desc:"Samstag = extra Zeit. 20–30 Min Theorie!",cat:"habit",tag:"habit"},
      {time:"10:30",title:"TRAINING 💪",desc:"Samstag ist Trainingstag. 5-Dips-Power-Plan – volle Energie!",cat:"sport",tag:"training"},
      {time:"12:00",title:"Post-Workout 🥚",desc:"3–4 Eier oder Shake sofort nach Training.",cat:"meal",tag:"health"},
      {time:"13:00",title:"Mittagessen",desc:"Hähnchen + Reis/Bulgur – großes Mittagessen",cat:"meal",tag:"health"},
      {time:"14:00",title:"Freizeit 🎉",desc:"Freunde, Ausgehen, Entspannen – du hast keine Verpflichtungen",cat:"free"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"23:00",title:"Schlafen",desc:"Morgen Review-Tag",cat:"sleep"},
    ],
    so:[
      {time:"09:00",title:"Aufstehen",desc:"Ruhiger Sonntagsmorgen",cat:"morning"},
      {time:"09:30",title:"Frühstück 🥚",desc:"Ausgiebiges Frühstück – kein Stress heute",cat:"meal",tag:"health"},
      {time:"10:30",title:"Spaziergang / Bewegung",desc:"30–45 Min frische Luft. Aktive Erholung vor der neuen Woche.",cat:"sport"},
      {time:"11:30",title:"Führerschein-App 🚗",desc:"15–20 Min Theorie",cat:"habit",tag:"habit"},
      {time:"13:00",title:"Mittagessen",desc:"Hähnchen + Reis – Meal Prep für die Woche?",cat:"meal",tag:"health"},
      {time:"15:00",title:"Woche vorbereiten 📋",desc:"Was kommt nächste Woche? Plan kurz checken.",cat:"learn"},
      {time:"17:00",title:"Wochen-Review mit Coach 🗓️",desc:"Im KI-Tab auf Wochen-Review tippen – Woche analysieren.",cat:"habit",tag:"habit"},
      {time:"18:30",title:"Abendessen",desc:"Joghurt + Obst. Eintragen.",cat:"meal",tag:"health"},
      {time:"20:00",title:"Freizeit",desc:"Entspannen vor der neuen Woche",cat:"free"},
      {time:"22:30",title:"Schlafen 🌙",desc:"Morgen neue Woche – früh schlafen!",cat:"sleep"},
    ]
  }
};
// kcal-Banner: EINE Wahrheit – Ziel kommt aus Phase (PHASE_CONFIG) + Modus, nicht hart codiert
function getKcalInfo(){
  const goal = getKcalGoal();
  const cfg = PHASE_CONFIG[currentPhase] || PHASE_CONFIG.masse;
  const cls = mode==='weekend' ? 'schule' : mode;
  let sub;
  if(currentPhase==='cut') sub = 'Defizit halten · Protein hoch';
  else if(currentPhase==='maintain') sub = 'Halten – nicht überziehen';
  else sub = mode==='baustelle' ? '+Extra-Shake Pflicht!' : mode==='lehrbauhof' ? 'Shake empfohlen' : mode==='weekend' ? 'Wochenende – flexibel' : 'Normaler Tag';
  return { num: goal.toLocaleString('de-DE'), label: 'kcal Ziel heute · ' + cfg.label, sub, cls };
}

// ═══════════════════════════════════════════
// DATA: MEALS
// ═══════════════════════════════════════════
const MEALS = [
  // Frühstück
  {id:'bulkFruehstueck',emoji:'🍳',name:'Bulk-Frühstück (4 Eier + 2 Toast m. Butter/Honig + O-Saft)',kcal:800,protein:30,cat:'fruehstueck'},
  {id:'toastButterHonig',emoji:'🍞',name:'Toast + Butter + Honig (1 Scheibe)',kcal:160,protein:3,cat:'fruehstueck'},
  {id:'osaft',emoji:'🍊',name:'O-Saft (1 Glas)',kcal:110,protein:1,cat:'fruehstueck'},
  {id:'ei3',emoji:'🥚',name:'3 Eier (gebraten)',kcal:210,protein:19,cat:'fruehstueck'},
  {id:'ei4',emoji:'🥚',name:'4 Eier (gekocht)',kcal:280,protein:25,cat:'fruehstueck'},
  {id:'tortilla',emoji:'🫓',name:'Protein Tortilla (1 St.)',kcal:150,protein:12,cat:'fruehstueck'},
  {id:'mozz',emoji:'🧀',name:'Light Mozzarella (100g)',kcal:180,protein:20,cat:'fruehstueck'},
  {id:'avocado',emoji:'🥑',name:'Avocado (½)',kcal:120,protein:2,cat:'fruehstueck'},
  {id:'tomaten',emoji:'🍅',name:'Tomaten + Gurke',kcal:35,protein:2,cat:'fruehstueck'},
  // Mittag
  {id:'tavukSis',emoji:'🍗',name:'Tavuk Şiş Meal Prep (250g Schenkel + 120g Reis + Öl)',kcal:1050,protein:50,cat:'mittag'},
  {id:'olivenoel',emoji:'🫒',name:'Olivenöl (1 EL)',kcal:90,protein:0,cat:'mittag'},
  {id:'haehnchen',emoji:'🍗',name:'Hähnchenbrust (200g)',kcal:220,protein:46,cat:'mittag'},
  {id:'rind',emoji:'🥩',name:'Rindfleisch (200g)',kcal:300,protein:44,cat:'mittag'},
  {id:'fisch',emoji:'🐟',name:'Fisch (200g)',kcal:200,protein:42,cat:'mittag'},
  {id:'reis',emoji:'🍚',name:'Reis gekocht (200g)',kcal:260,protein:5,cat:'mittag'},
  {id:'makarna',emoji:'🍝',name:'Makarna (200g gek.)',kcal:280,protein:10,cat:'mittag'},
  {id:'bulgur',emoji:'🌾',name:'Bulgur (200g gek.)',kcal:220,protein:8,cat:'mittag'},
  {id:'kartoffeln',emoji:'🥔',name:'Kartoffeln (300g)',kcal:240,protein:6,cat:'mittag'},
  // Snacks
  {id:'bulkSnack',emoji:'🫙',name:'Bulk-Snack (250g Joghurt 10% + Honig + Walnüsse)',kcal:500,protein:18,cat:'snack'},
  {id:'datteln',emoji:'🌴',name:'Datteln (3 St.)',kcal:150,protein:1,cat:'snack'},
  {id:'honig',emoji:'🍯',name:'Honig (1 EL)',kcal:65,protein:0,cat:'snack'},
  {id:'ceviz',emoji:'🌰',name:'Ceviz / Walnüsse (30g)',kcal:200,protein:5,cat:'snack'},
  {id:'elma',emoji:'🍎',name:'Elma / Apfel',kcal:80,protein:0,cat:'snack'},
  {id:'muz',emoji:'🍌',name:'Muz / Banane',kcal:100,protein:1,cat:'snack'},
  {id:'joghurt',emoji:'🫙',name:'Griech. Joghurt (200g)',kcal:130,protein:20,cat:'snack'},
  {id:'erdnuss',emoji:'🥜',name:'Erdnussbutter (30g)',kcal:180,protein:7,cat:'snack'},
  // Abend
  {id:'kiymaliMakarna',emoji:'🍝',name:'Kıymalı Makarna (200g Hack 20% + 125g Makarna + Käse)',kcal:950,protein:45,cat:'abend'},
  {id:'joghurt2',emoji:'🫙',name:'Griech. Joghurt (300g)',kcal:195,protein:30,cat:'abend'},
  {id:'obst_mix',emoji:'🍓',name:'Obst Mix (150g)',kcal:90,protein:1,cat:'abend'},
  {id:'gemuese',emoji:'🥗',name:'Gemüse Salat',kcal:60,protein:3,cat:'abend'},
  // Shakes
  {id:'bulkShake',emoji:'🥤',name:'Bulk-Shake nach Training (Hafer + Erdnussmus + 400ml Milch + Banane)',kcal:1050,protein:55,cat:'shake'},
  {id:'vollmilch',emoji:'🥛',name:'Vollmilch 3,5% (300ml)',kcal:190,protein:10,cat:'shake'},
  {id:'masseShake',emoji:'🥤',name:'Masse-Shake (Hafer+EB+Milch+Banane)',kcal:700,protein:25,cat:'shake'},
  {id:'proteinShake',emoji:'🥛',name:'Protein Shake (300ml Milch)',kcal:250,protein:30,cat:'shake'},
  {id:'haferflocken',emoji:'🌾',name:'Haferflocken (80g)',kcal:300,protein:10,cat:'shake'},
];

// ═══════════════════════════════════════════
// AUTO DAY + WEEK DETECTION
// Grundplan 2026 im Code, alles Weitere per Tap in der App
// (Override in localStorage) – die App läuft damit unbegrenzt weiter.
// ═══════════════════════════════════════════
const DEFAULT_KW_SCHEDULE_2026 = {
  20:'schule', 21:'schule', 22:'lehrbauhof', 23:'baustelle',
  24:'lehrbauhof', 25:'schule', 26:'schule', 27:'schule',
  28:'baustelle', 29:'lehrbauhof', 30:'lehrbauhof', 31:'lehrbauhof',
  32:'lehrbauhof', 33:'baustelle', 34:'baustelle', 35:'baustelle',
  36:'baustelle', 37:'baustelle', 38:'baustelle', 39:'baustelle',
};

let kwOverrides = {}; // { 'YYYY-WW': 'schule'|'lehrbauhof'|'baustelle' }
function loadKwOverrides(){ try{ const d=localStorage.getItem('baran_kw_overrides'); if(d) kwOverrides=JSON.parse(d); }catch(e){} }
function saveKwOverrides(){ try{ localStorage.setItem('baran_kw_overrides', JSON.stringify(kwOverrides)); }catch(e){} }

function getISOWeek(date){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
// ISO-Jahr (kann am Jahreswechsel vom Kalenderjahr abweichen)
function isoYearOf(date){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  return d.getUTCFullYear();
}
function kwKeyOf(date){ return isoYearOf(date) + '-' + String(getISOWeek(date)).padStart(2,'0'); }
function mondayOfWeek(date){ const d=new Date(date); const wd=(d.getDay()+6)%7; d.setDate(d.getDate()-wd); d.setHours(0,0,0,0); return d; }

// Effektiver Wochenmodus: Override > Grundplan 2026 > null (unbekannt)
function getKwMode(date){
  const key = kwKeyOf(date);
  if(kwOverrides[key]) return kwOverrides[key];
  if(isoYearOf(date) === 2026 && DEFAULT_KW_SCHEDULE_2026[getISOWeek(date)]) return DEFAULT_KW_SCHEDULE_2026[getISOWeek(date)];
  return null;
}

function detectTodayMode(){
  const now = new Date();
  const jsDay = now.getDay(); // 0=So,1=Mo,...,6=Sa
  const dayNames = ['so','mo','di','mi','do','fr','sa'];
  const todayName = dayNames[jsDay];

  // Wochenende → weekend mode mit Sa/So Plan
  if(jsDay === 0 || jsDay === 6){
    return { mode: 'weekend', day: todayName };
  }

  const weekMode = getKwMode(now) || 'schule';
  return { mode: weekMode, day: todayName };
}

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
loadKwOverrides(); // vor detectTodayMode – Overrides bestimmen den Wochenmodus mit
const autoDetected = detectTodayMode();
let mode = autoDetected.mode;
let day  = autoDetected.day;

// Nutrition state
let quickLogDone = new Set(); // indices of done blocks today
let lastTab = 'plan'; // zuletzt geöffneter Tab – wird gemerkt
let todayLog = [];     // [{id,name,kcal,protein,emoji}]
let waterL = 0;
let activeCat = 'all';

// Feedback state – Habits sind editierbar (localStorage), Defaults nur Startwert
const DEFAULT_HABITS = [
  {id:'training',name:'Training',desc:'Hast du heute trainiert?'},
  {id:'fuehrerschein',name:'Führerschein-App',desc:'15 Min Theorie gemacht?',mandatory:true},
  {id:'essen',name:'Ernährung',desc:'Kalorienplan eingehalten?',mandatory:true},
  {id:'wasser',name:'Wasser',desc:'3–4 L getrunken?',mandatory:true},
  {id:'schlaf',name:'Schlaf',desc:'Gestern pünktlich schlafen gegangen?',mandatory:true},
  {id:'schule',name:'Schule/Arbeit',desc:'Konzentriert und pünktlich?'},
];
let HABITS = JSON.parse(JSON.stringify(DEFAULT_HABITS));
function loadHabits(){ try{ const d=localStorage.getItem('baran_habits'); if(d){ const p=JSON.parse(d); if(Array.isArray(p)&&p.length) HABITS=p; } }catch(e){} }
function saveHabits(){ try{ localStorage.setItem('baran_habits', JSON.stringify(HABITS)); }catch(e){} }
let habitStatus = {};
let autoHabits = {};    // habits aktuell von Auto-Sync gesteuert
let manualHabits = {};  // habits die Baran manuell angefasst hat → Auto-Sync lässt sie in Ruhe

// Setzt ein Habit automatisch auf 'done' wenn die zugrundeliegende Sache erreicht ist
// (kcal-Ziel, Wasser-Ziel, Training erledigt, Plan-Block abgehakt …)
function setHabitAuto(id, achieved){
  if(!HABITS.some(h=>h.id===id)) return;  // Habit wurde gelöscht → Auto-Sync läuft ins Leere
  if(manualHabits[id]) return;            // Baran hat selbst entschieden → nicht überschreiben
  if(achieved){
    if(habitStatus[id] !== 'done'){ habitStatus[id] = 'done'; if(navigator.vibrate) navigator.vibrate(20); }
    autoHabits[id] = true;
  } else if(autoHabits[id]){
    habitStatus[id] = null;               // Bedingung weggefallen & war auto-gesetzt → zurücknehmen
    delete autoHabits[id];
  } else { return; }
  try{ saveStorage(); }catch(e){}
  try{ updateTodayScore(); }catch(e){}
}

const weekHistory = [
  {day:'Mo',score:null},{day:'Di',score:null},{day:'Mi',score:null},
  {day:'Do',score:null},{day:'Fr',score:null},{day:'Sa',score:null},{day:'So',score:null}
];

// weekHistory echt speichern (pro ISO-Woche) – ersetzt die alten Demo-Scores
function loadWeekHistory(){
  try{
    const raw = JSON.parse(localStorage.getItem('baran_week_history')||'null');
    if(raw && raw.week === getWeekKey(0) && Array.isArray(raw.days)){
      weekHistory.forEach((d,i)=>{ if(raw.days[i]) d.score = raw.days[i].score; });
    } else { weekHistory.forEach(d=>d.score=null); }   // neue Woche → leer starten
  }catch(e){}
}
function saveWeekHistory(){
  try{ localStorage.setItem('baran_week_history', JSON.stringify({week:getWeekKey(0), days:weekHistory.map(d=>({day:d.day,score:d.score}))})); }catch(e){}
}
// Schreibt den heutigen Score automatisch fort → "der Tag speichert sich selbst"
function updateTodayScore(){
  const score = calcScore();
  const dName = ['So','Mo','Di','Mi','Do','Fr','Sa'][new Date().getDay()];
  const entry = weekHistory.find(d=>d.day===dName);
  if(entry){ entry.score = score; saveWeekHistory(); }
}

// ═══════════════════════════════════════════
// LOAD / SAVE (localStorage – persists across sessions)
// ═══════════════════════════════════════════
function loadStorage(){
  try{
    const today = new Date().toDateString();
    const raw = localStorage.getItem('baran_v2');
    const s = raw ? JSON.parse(raw) : {};
    // Nur laden wenn Daten von HEUTE sind → neuer Tag startet frisch (auto-detect)
    if(s.date === today){
      if(s.todayLog) todayLog = s.todayLog;
      if(s.waterL !== undefined) waterL = s.waterL;
      if(s.habitStatus) habitStatus = s.habitStatus;
      if(s.autoHabits) autoHabits = s.autoHabits;
      if(s.manualHabits) manualHabits = s.manualHabits;
      // manuelle Modus-/Tag-Wahl von heute beibehalten (überschreibt Auto-Detect)
      if(s.mode) mode = s.mode;
      if(s.day) day = s.day;
      if(s.lastTab) lastTab = s.lastTab;
    }
    // Ältere Tage ins Tagesbuch speichern falls noch nicht da
    if(s.date && s.date !== today && s.todayLog && s.todayLog.length > 0){
      saveDayToHistory(s.date, s);
    }
  }catch(e){}
}
function saveStorage(){
  try{
    const today = new Date().toDateString();
    localStorage.setItem('baran_v2', JSON.stringify({
      date: today,
      todayLog, waterL, habitStatus, autoHabits, manualHabits,
      mode, day, lastTab
    }));
  }catch(e){}
}


// ═══════════════════════════════════════════
// TAGESBUCH – jeder Tag wird gespeichert
// ═══════════════════════════════════════════
function saveDayToHistory(dateStr, data){
  try{
    const history = JSON.parse(localStorage.getItem('baran_day_history') || '{}');
    if(!history[dateStr]){
      // Habit-Score aus dem gespeicherten Status nachrechnen (gleiche Formel wie calcScore)
      const hs = data.habitStatus || {};
      const scored = HABITS.map(h=>hs[h.id]).filter(v=>v!==null&&v!==undefined);
      const dayScore = scored.length===0 ? null : Math.round(scored.reduce((s,v)=>s+(v==='done'?100:v==='partial'?50:0),0)/HABITS.length);
      history[dateStr] = {
        date: dateStr,
        todayLog: data.todayLog || [],
        waterL: data.waterL || 0,
        habitStatus: data.habitStatus || {},
        score: dayScore,
        kcalTotal: (data.todayLog || []).reduce((s,l)=>s+(l.kcal||0),0),
        proteinTotal: (data.todayLog || []).reduce((s,l)=>s+(l.protein||0),0),
      };
      // Nur letzte 60 Tage behalten
      const keys = Object.keys(history).sort();
      if(keys.length > 60) delete history[keys[0]];
      localStorage.setItem('baran_day_history', JSON.stringify(history));
    }
  }catch(e){}
}

function getDayHistory(){
  try{
    return JSON.parse(localStorage.getItem('baran_day_history') || '{}');
  }catch(e){ return {}; }
}

// ═══════════════════════════════════════════
// SHEETS statt confirm()/prompt() – native Dialoge sind in
// iOS-Standalone-PWAs unzuverlässig und brechen den Stil.
// ═══════════════════════════════════════════
let confirmResolve = null;
function askConfirm(message, okLabel){
  return new Promise(resolve => {
    confirmResolve = resolve;
    document.getElementById('confirmSheetMsg').textContent = message;
    document.getElementById('confirmSheetOk').textContent = okLabel || 'Ja';
    document.getElementById('confirmSheet').classList.add('open');
  });
}
function resolveConfirm(val){
  document.getElementById('confirmSheet').classList.remove('open');
  if(confirmResolve){ confirmResolve(val); confirmResolve = null; }
}

let numberResolve = null;
function askNumber(title, current, unit){
  return new Promise(resolve => {
    numberResolve = resolve;
    document.getElementById('numberSheetTitle').textContent = title;
    document.getElementById('numberSheetUnit').textContent = unit || '';
    const inp = document.getElementById('numberSheetInput');
    inp.value = current;
    document.getElementById('numberSheet').classList.add('open');
    setTimeout(()=>{ inp.focus(); inp.select(); }, 150);
  });
}
function resolveNumber(ok){
  const v = ok ? parseFloat(document.getElementById('numberSheetInput').value) : NaN;
  document.getElementById('numberSheet').classList.remove('open');
  if(numberResolve){ numberResolve(isNaN(v) ? null : v); numberResolve = null; }
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
function showPage(id,el){
  try{
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(t=>t.classList.remove('active'));
    const pageEl = document.getElementById('page-'+id);
    if(!pageEl){ console.error('Page not found: '+id); return; }
    pageEl.classList.add('active');
    el.classList.add('active');
    lastTab = id; try{ saveStorage(); }catch(e){}
    if(id!=='ai') chatSourceTab = id;   // Quelle für den Chat-Kontext merken
    if(id==='plan'){ renderPlan(); renderWeeks(); }
    if(id==='nutrition'){ try{ updateNutritionNote(); applyPhaseUI(); renderMealGrid(); renderLog(); }catch(e){console.error('nutrition:',e);} }
    if(id==='training'){ renderExercises(); }
    if(id==='goals'){ try{ renderStats(); renderGoals(); renderHolidays(); checkUpcomingHoliday(); renderNotifSettings(); }catch(e){console.error('goals:',e);} }
    if(id==='ai'){ try{ chatContext = contextFromTab(chatSourceTab); renderChatContextChip(); renderQuickPrompts(); renderChatHistory(); checkApiKeyBanner(); renderMemoryStatus(); }catch(e){console.error('ai:',e);} }
  }catch(e){ console.error('showPage error:',e); }
}

// ═══════════════════════════════════════════
// PLAN
// ═══════════════════════════════════════════
function setMode(m){
  mode=m;
  // Tag an den Modus anpassen – nicht jeder Modus kennt jeden Tag
  const jsDay=['so','mo','di','mi','do','fr','sa'][new Date().getDay()];
  if(m==='schule' && (day==='sa'||day==='so')) day = (jsDay==='sa'||jsDay==='so') ? 'mo' : jsDay;
  if(m==='baustelle') day = (day==='fr') ? 'fr' : 'mo';
  if(m==='lehrbauhof') day = 'mo';
  if(m==='weekend' && day!=='sa' && day!=='so') day = (jsDay==='sa'||jsDay==='so') ? jsDay : 'sa';
  applyModeUI();
  renderPlan(); updateNutritionNote(); saveStorage();
}
function setDay(d){
  day=d;
  applyModeUI();
  renderPlan(); saveStorage();
}
function getSchedule(){
  // Weekend
  if(mode==='weekend' || day==='sa' || day==='so'){
    return schedules.weekend[day] || schedules.weekend.sa;
  }
  if(mode==='baustelle') return day==='fr'?schedules.baustelle.fri:schedules.baustelle.default;
  if(mode==='lehrbauhof') return schedules.lehrbauhof.default;
  return schedules.schule[day]||schedules.schule.di;
}
function tagLabel(t){ return t==='must'?'Pflicht':t==='habit'?'Daily Habit':t==='training'?'Training':'Gesundheit'; }

// ═══════════════════════════════════════════
// NUTRITION
// ═══════════════════════════════════════════
function updateNutritionNote(){
  const el=document.getElementById('nutritionModeNote');
  if(!el) return;
  const goal=getKcalGoal().toLocaleString('de-DE');
  const cfg=PHASE_CONFIG[currentPhase]||PHASE_CONFIG.masse;
  const modeTxt = mode==='baustelle'?'Heute Baustelle':mode==='lehrbauhof'?'Heute Lehrbauhof':mode==='weekend'?'Wochenende':'Heute Schultag';
  let extra;
  if(currentPhase==='cut') extra='Defizit halten, Protein hoch.';
  else if(currentPhase==='maintain') extra='Sauber halten, nicht überziehen.';
  else extra = mode==='baustelle'?'<strong>Extra-Shake Pflicht.</strong>':mode==='lehrbauhof'?'Shake empfohlen.':mode==='weekend'?'Entspannen und gut essen.':'Normal essen.';
  el.innerHTML=`<strong>${modeTxt} · ${cfg.label}:</strong> Ziel ${goal} kcal. ${extra}`;
}

function filterCat(cat,el){
  activeCat=cat;
  document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  renderMealGrid();
}

// Eigene Favoriten-Kacheln (aus dem Log gespeichert, Kategorie „Eigene")
let customMeals = [];
function loadCustomMeals(){ try{ const d=localStorage.getItem('baran_custom_meals'); if(d) customMeals=JSON.parse(d); }catch(e){} }
function saveCustomMeals(){ try{ localStorage.setItem('baran_custom_meals', JSON.stringify(customMeals)); }catch(e){} }

function allMeals(){ return MEALS.concat(customMeals); }

function renderMealGrid(){
  const grid=document.getElementById('mealGrid');
  const filtered=activeCat==='all'?allMeals():allMeals().filter(m=>m.cat===activeCat);
  if(activeCat==='eigene' && filtered.length===0){
    grid.innerHTML='<div class="log-empty" style="grid-column:1/-1;">Noch keine eigenen Kacheln. Trag unten eine eigene Mahlzeit ein und tippe im Log auf ☆.</div>';
    return;
  }
  grid.innerHTML=filtered.map(m=>{
    // Tap = Portion HINZUFÜGEN (nicht togglen) – zweite Portion Reis ist in der Massephase Alltag
    const count=todayLog.filter(l=>l.mealId===m.id||l.id===m.id).length;
    const isCustom=String(m.id).startsWith('cm_');
    return `<div class="meal-tile${count?' checked':''}" onclick="addMealById('${m.id}')">
      <div class="meal-tile-check">${count?(count>1?'×'+count:'✓'):'+'}</div>
      ${isCustom?`<div class="meal-tile-del" onclick="event.stopPropagation();deleteCustomMeal('${m.id}')" title="Kachel entfernen">✕</div>`:''}
      <div class="meal-tile-name">${m.name}</div>
      <div class="meal-tile-kcal">${m.kcal} kcal</div>
      <div class="meal-tile-macro">${m.protein} g Protein</div>
    </div>`;
  }).join('');
}

function addMealById(id){
  const meal=allMeals().find(m=>m.id===id);
  if(!meal) return;
  todayLog.push({id:meal.id+'_'+Date.now(),mealId:meal.id,name:meal.name,kcal:meal.kcal,protein:meal.protein,emoji:meal.emoji});
  renderMealGrid(); renderLog(); updateRing(); saveStorage();
  if(navigator.vibrate) navigator.vibrate(15);
}

function saveAsFavorite(logId){
  const l=todayLog.find(x=>x.id===logId);
  if(!l || customMeals.some(c=>c.name===l.name)) return;
  customMeals.push({id:'cm_'+Date.now(),emoji:l.emoji||'🍽️',name:l.name,kcal:l.kcal,protein:l.protein||0,cat:'eigene'});
  saveCustomMeals(); renderMealGrid(); renderLog();
  if(navigator.vibrate) navigator.vibrate(15);
}

async function deleteCustomMeal(id){
  if(!await askConfirm('Eigene Kachel entfernen?','Entfernen')) return;
  customMeals=customMeals.filter(c=>c.id!==id);
  saveCustomMeals(); renderMealGrid();
}

function addWater(l){ waterL=Math.min(waterL+l,10); updateRing(); saveStorage(); }
async function resetWater(){
  if(waterL>0 && !await askConfirm(`Wasser (${waterL.toLocaleString('de-DE')} L) auf 0 zurücksetzen?`, 'Zurücksetzen')) return;
  waterL=0; updateRing(); saveStorage();
}

function addCustom(){
  const name=document.getElementById('customName').value.trim();
  const kcal=parseInt(document.getElementById('customKcal').value)||0;
  const protein=parseInt(document.getElementById('customProtein').value)||0;
  if(!name||!kcal) return;
  todayLog.push({id:'custom_'+Date.now(),name,kcal,protein,emoji:'🍽️'});
  document.getElementById('customName').value='';
  document.getElementById('customKcal').value='';
  document.getElementById('customProtein').value='';
  renderLog(); updateRing(); saveStorage();
}

function removeLog(id){
  todayLog=todayLog.filter(l=>l.id!==id);
  renderMealGrid(); renderLog(); updateRing(); saveStorage();
}

function renderLog(){
  const el=document.getElementById('logSection');
  if(todayLog.length===0){
    el.innerHTML='<div class="log-empty">Kein Eintrag heute. Trag deine erste Mahlzeit ein.</div>';
    return;
  }
  el.innerHTML=todayLog.map(l=>{
    // Eigene Einträge lassen sich als Favoriten-Kachel merken (☆)
    const isCustom=String(l.id).startsWith('custom_');
    const isFav=customMeals.some(c=>c.name===l.name);
    const favBtn=isCustom&&!isFav?`<span class="log-fav" onclick="saveAsFavorite('${l.id}')" title="Als Kachel speichern">☆</span>`:'';
    return `
    <div class="log-item">
      <div class="log-item-left">
        <span class="log-item-dot"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg></span>
        <span class="log-item-name">${l.name}</span>
      </div>
      <div class="log-item-right">
        <span class="log-item-kcal">${l.kcal} kcal</span>
        ${favBtn}
        <span class="log-remove" onclick="removeLog('${l.id}')">✕</span>
      </div>
    </div>`;
  }).join('');
}

function updateRing(){
  const totalKcal=todayLog.reduce((s,l)=>s+l.kcal,0);
  const totalProtein=todayLog.reduce((s,l)=>s+(l.protein||0),0);
  const goal=getKcalGoal();
  const wGoal=getWaterGoal();
  const pct=Math.min(totalKcal/goal,1);

  // Status color — funktional: behind / mid / on track
  let statusColor;
  if(pct<0.5) statusColor='var(--over)';
  else if(pct<0.85) statusColor='var(--caution)';
  else statusColor='var(--ok)';

  // Heute-Datum (Mi 17.06)
  const dEl=document.getElementById('todayDate');
  if(dEl) dEl.textContent=new Date().toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'}).replace('.,',' ·');

  // Kalorien-Readout
  document.getElementById('ringKcal').textContent=totalKcal.toLocaleString('de-DE');
  document.getElementById('goalKcal').textContent=goal.toLocaleString('de-DE');
  const sk=document.getElementById('statKcal');
  sk.textContent=Math.round(pct*100)+'%';
  sk.style.color=statusColor;
  const bk=document.getElementById('barKcal');
  bk.style.width=(pct*100)+'%';
  bk.style.background=statusColor;

  // Protein – Ziel hängt an der Phase (Masse 170 / Maintain 150 / Cut 180)
  const pGoal=getProteinGoal();
  const pPct=Math.min(totalProtein/pGoal,1);
  document.getElementById('statProtein').textContent=`${totalProtein} g / ${pGoal} g`;
  document.getElementById('barProtein').style.width=(pPct*100)+'%';

  // Wasser
  const wPct=Math.min(waterL/wGoal,1);
  const wFmt=waterL.toLocaleString('de-DE',{maximumFractionDigits:2});
  document.getElementById('statWater').textContent=`${wFmt} / ${wGoal.toLocaleString('de-DE')} L`;
  document.getElementById('barWater').style.width=(wPct*100)+'%';

  // Habit-Auto-Sync: Ernährung (kcal-Ziel erreicht) + Wasser (Tagesziel erreicht)
  try{ setHabitAuto('essen', totalKcal >= goal); setHabitAuto('wasser', waterL >= wGoal); }catch(e){}
}

async function resetDay(){
  if(!await askConfirm('Heutigen Tag zurücksetzen? Alle Mahlzeiten und Wasser werden gelöscht.', 'Zurücksetzen')) return;
  todayLog=[]; waterL=0; renderMealGrid(); renderLog(); updateRing(); saveStorage();
}

// ═══════════════════════════════════════════
// WEEKS
// ═══════════════════════════════════════════
// Rollierende Wochenliste: letzte Woche + 9 kommende, generiert aus Grundplan + Overrides.
// Tap auf eine Woche zykelt den Typ (Schule → Lehrbauhof → Baustelle) und speichert ihn –
// so pflegt Baran neue Wochen selbst, ohne dass jemand den Code anfassen muss.
const KW_MODE_META = {
  schule:     { label:'Berufsschule', color:'var(--schule)' },
  lehrbauhof: { label:'Lehrbauhof',   color:'var(--lehrbauhof)' },
  baustelle:  { label:'Baustelle',    color:'var(--baustelle)' },
};

function cycleKw(key, cur){
  const order = ['schule','lehrbauhof','baustelle'];
  kwOverrides[key] = order[(order.indexOf(cur)+1) % order.length] || 'schule';
  saveKwOverrides();
  renderWeeks();
}

function renderWeeks(){
  const nowKey = kwKeyOf(new Date());
  const start = mondayOfWeek(new Date());
  start.setDate(start.getDate() - 7); // eine Woche zurückblicken
  const fmt = d => d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'});
  let weekHTML = '';
  for(let i=0; i<10; i++){
    const mon = new Date(start); mon.setDate(start.getDate() + i*7);
    const fri = new Date(mon);   fri.setDate(mon.getDate() + 4);
    const key = kwKeyOf(mon);
    const m = getKwMode(mon);
    const meta = m ? KW_MODE_META[m] : null;
    const isNow = key === nowKey;
    weekHTML += `
    <div class="week-item" onclick="cycleKw('${key}','${m||''}')" title="Tippen: Wochentyp ändern" style="cursor:pointer;${isNow?`border-color:${meta?meta.color:'var(--rule-strong)'};background:var(--surface2);`:''}">
      <div class="week-dot" style="background:${meta?meta.color:'var(--rule-strong)'}"></div>
      <div class="week-kw">KW ${getISOWeek(mon)}</div>
      <div class="week-dates">${fmt(mon)}–${fmt(fri)}</div>
      <div class="week-type" style="color:${meta?meta.color:'var(--muted)'}">${meta?meta.label:'– tippen zum Setzen'}</div>
      ${isNow?'<span class="badge-now">JETZT</span>':''}
    </div>`;
  }
  ['planWeekGrid','statsWeekGrid'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.innerHTML = weekHTML;
  });
}

// 5-Tage-Kampfplan (Phase 1) – Mo / Di / Mi / Fr / Sa
const TRAINING_DAYS = [
  {key:'mo', day:'Montag',    split:'Push + Explosivität',       focus:'Brust · Schultern · Trizeps'},
  {key:'di', day:'Dienstag',  split:'Skill + Kondition',         focus:'Technik · Gas Tank'},
  {key:'mi', day:'Mittwoch',  split:'Beine + Core + Hüft-Power', focus:'Beine · Hüfte · Rumpf-Rotation'},
  {key:'fr', day:'Freitag',   split:'Pull + Explosivität',       focus:'Rücken · Bizeps · H. Schulter'},
  {key:'sa', day:'Samstag',   split:'Skill + Kondition (lang)',  focus:'Technik · langer Atem'},
];
const DEFAULT_EXERCISES = [
  // Montag · Push + Explosivität
  {id:'mo1', day:'mo', name:'Explosive Push-ups (Hände heben ab)', detail:'EXPLOSIV · POWER', sets:5, reps:'5'},
  {id:'mo2', day:'mo', name:'Dips (Barren)',                        detail:'Brust',            sets:4, reps:'6-8'},
  {id:'mo3', day:'mo', name:'Liegestütze (erhöht)',                 detail:'Brust',            sets:3, reps:'8-12'},
  {id:'mo4', day:'mo', name:'Pike Push-ups',                        detail:'Schultern',        sets:3, reps:'10-12'},
  {id:'mo5', day:'mo', name:'KH-Seitheben',                         detail:'Schultern',        sets:4, reps:'12-15'},
  {id:'mo6', day:'mo', name:'Diamant Push-ups',                     detail:'Trizeps',          sets:3, reps:'10-12'},
  // Dienstag · Skill + Kondition
  {id:'di1', day:'di', name:'Seilspringen / Imaginär',              detail:'Warm-up',          sets:3, reps:'2 Min'},
  {id:'di2', day:'di', name:'Schattenboxen (1-kg-KH, locker)',      detail:'Skill',            sets:5, reps:'2-3 Min'},
  {id:'di3', day:'di', name:'HIIT: Burpees / Sprawls / Climbers',   detail:'Kondition',        sets:1, reps:'5-8 Min'},
  {id:'di4', day:'di', name:'Nacken-Brücke (sanft, Band)',           detail:'Nacken',           sets:3, reps:'12'},
  // Mittwoch · Beine + Core + Hüft-Power
  {id:'mi1', day:'mi', name:'Sprung-Kniebeugen (Jump Squats)',       detail:'EXPLOSIV · POWER', sets:5, reps:'5'},
  {id:'mi2', day:'mi', name:'Sprawls (Wrestler-Drop)',               detail:'EXPLOSIV',         sets:4, reps:'8'},
  {id:'mi3', day:'mi', name:'Bulgarian Split Squats',                detail:'Beine',            sets:4, reps:'10/Bein'},
  {id:'mi4', day:'mi', name:'KH-Rum. Kreuzheben',                   detail:'Beine',            sets:4, reps:'8-12'},
  {id:'mi5', day:'mi', name:'Standing Band-Rotations',              detail:'Core-Rotation',    sets:3, reps:'15/Seite'},
  {id:'mi6', day:'mi', name:'Russian Twists',                       detail:'Core-Rotation',    sets:3, reps:'20'},
  {id:'mi7', day:'mi', name:'Häng. Knieheben',                      detail:'Bauch',            sets:4, reps:'12-15'},
  {id:'mi8', day:'mi', name:'Hollow Body Hold',                     detail:'Bauch',            sets:3, reps:'30 Sek'},
  {id:'mi9', day:'mi', name:'Ab Wheel Rollouts',                    detail:'Bauch',            sets:3, reps:'8-12'},
  // Freitag · Pull + Explosivität
  {id:'fr1', day:'fr', name:'Explosive Klimmzüge (schnell hoch)',   detail:'EXPLOSIV · POWER', sets:4, reps:'3'},
  {id:'fr2', day:'fr', name:'Klimmzüge',                            detail:'Rücken',           sets:4, reps:'6-8'},
  {id:'fr3', day:'fr', name:'Inverted Rows',                        detail:'Rücken',           sets:3, reps:'12'},
  {id:'fr4', day:'fr', name:'Hammer Curls',                         detail:'Bizeps',           sets:3, reps:'10-12'},
  {id:'fr5', day:'fr', name:'Face Pulls (Band)',                    detail:'H.Schulter',       sets:3, reps:'15'},
  {id:'fr6', day:'fr', name:'Dead Hang (Griffausdauer)',            detail:'Griff',            sets:3, reps:'max'},
  // Samstag · Skill + Kondition (lang)
  {id:'sa1', day:'sa', name:'Seilspringen / Beinarbeit',            detail:'Warm-up',          sets:3, reps:'3 Min'},
  {id:'sa2', day:'sa', name:'Schattenboxen – Kombi-Drills',         detail:'Skill',            sets:6, reps:'3 Min'},
  {id:'sa3', day:'sa', name:'Steady Cardio (zügig gehen/laufen)',   detail:'Kondition',        sets:1, reps:'20-30 Min'},
  {id:'sa4', day:'sa', name:'Hüft- & Schulter-Mobility',           detail:'Mobility',         sets:1, reps:'10 Min'},
];

let exercises = JSON.parse(JSON.stringify(DEFAULT_EXERCISES)); // deep copy


// ═══════════════════════════════════════════
// TRAINING EDITOR
// ═══════════════════════════════════════════
let editMode = false;
let editingId = null;
let modalSets = 3;

// ── load/save exercises from localStorage (persists across sessions)
function loadExercises(){
  try{
    const ver = localStorage.getItem('baran_exercises_v');
    const saved = localStorage.getItem('baran_exercises');
    if(saved && ver === '3'){
      exercises = JSON.parse(saved);
    } else {
      // Migration: Kampfplan Phase 1 (5-Tage-Split)
      exercises = JSON.parse(JSON.stringify(DEFAULT_EXERCISES));
      localStorage.setItem('baran_exercises', JSON.stringify(exercises));
      localStorage.setItem('baran_exercises_v', '3');
    }
  }catch(e){}
}
function saveExercises(){
  try{ localStorage.setItem('baran_exercises', JSON.stringify(exercises)); }catch(e){}
}

function toggleEditMode(){
  editMode = !editMode;
  const btn = document.getElementById('editToggleBtn');
  btn.textContent = editMode ? 'Fertig' : 'Bearbeiten';
  btn.style.background = editMode ? 'var(--surface2)' : 'none';
  btn.style.borderColor = editMode ? 'var(--accent)' : 'var(--rule)';
  btn.style.color = editMode ? 'var(--accent)' : 'var(--muted)';
  document.getElementById('addExercisePanel').style.display = editMode ? 'block' : 'none';
  renderExercises();
}

// renderExercises() defined below with full logging support

function moveEx(id, dir){
  const i = exercises.findIndex(e=>e.id===id);
  const j = i + dir;
  if(j<0||j>=exercises.length) return;
  [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
  saveExercises(); renderExercises();
}

function openEditModal(id){
  if(!editMode) return;
  editingId = id;
  const ex = exercises.find(e=>e.id===id);
  if(!ex) return;
  modalSets = ex.sets;
  document.getElementById('modalName').value = ex.name;
  document.getElementById('modalDetail').value = ex.detail;
  document.getElementById('modalSetsDisplay').textContent = modalSets;
  document.getElementById('modalReps').value = ex.reps;
  document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal(){
  document.getElementById('editModal').style.display = 'none';
  editingId = null;
}

function adjustSets(delta){
  modalSets = Math.max(1, Math.min(10, modalSets + delta));
  document.getElementById('modalSetsDisplay').textContent = modalSets;
}

function saveEditModal(){
  if(!editingId) return;
  const ex = exercises.find(e=>e.id===editingId);
  if(!ex) return;
  ex.name   = document.getElementById('modalName').value.trim() || ex.name;
  ex.detail = document.getElementById('modalDetail').value.trim();
  ex.sets   = modalSets;
  ex.reps   = document.getElementById('modalReps').value.trim() || ex.reps;
  saveExercises(); renderExercises(); closeEditModal();
}

async function deleteExercise(){
  if(!editingId) return;
  if(!await askConfirm('Übung löschen?', 'Löschen')) return;
  exercises = exercises.filter(e=>e.id!==editingId);
  saveExercises(); renderExercises(); closeEditModal();
}

function showAddExercise(){
  document.getElementById('addExBtn').style.display = 'none';
  document.getElementById('addExForm').style.display = 'block';
  document.getElementById('newExName').focus();
}
function hideAddExercise(){
  document.getElementById('addExBtn').style.display = 'block';
  document.getElementById('addExForm').style.display = 'none';
  document.getElementById('newExName').value='';
  document.getElementById('newExDetail').value='';
  document.getElementById('newExSets').value=3;
  document.getElementById('newExReps').value='';
}

function addExercise(){
  const name = document.getElementById('newExName').value.trim();
  if(!name){ document.getElementById('newExName').style.borderColor='var(--red)'; return; }
  const newEx = {
    id: 'ex_'+Date.now(),
    name,
    detail: document.getElementById('newExDetail').value.trim() || '',
    sets:   parseInt(document.getElementById('newExSets').value)||3,
    reps:   document.getElementById('newExReps').value.trim() || '10',
  };
  exercises.push(newEx);
  saveExercises(); renderExercises(); hideAddExercise();
}

async function resetTraining(){
  if(!await askConfirm('Trainingsplan auf den Standard zurücksetzen? Eigene Übungen gehen verloren.', 'Zurücksetzen')) return;
  exercises = JSON.parse(JSON.stringify(DEFAULT_EXERCISES));
  saveExercises(); renderExercises();
}

// close modal on backdrop click
document.getElementById('editModal').addEventListener('click', function(e){
  if(e.target===this) closeEditModal();
});
document.getElementById('confirmSheet').addEventListener('click', function(e){
  if(e.target===this) resolveConfirm(false);
});
document.getElementById('numberSheet').addEventListener('click', function(e){
  if(e.target===this) resolveNumber(false);
});

// ═══════════════════════════════════════════
// LIVE PLAN EDITOR + CLOCK
// ═══════════════════════════════════════════

// Custom overrides: {modeKey: [{time,title,desc,cat,tag}]}
// modeKey = 'baustelle_default' | 'baustelle_fri' | 'lehrbauhof_default' | 'schule_mo' etc.
let planOverrides = {};
let planEditModeActive = false;
let editingBlockIdx = null;  // index in current schedule array
let addingAfterIdx = null;

function getPlanKey(){
  if(mode==='baustelle') return day==='fr' ? 'baustelle_fri' : 'baustelle_default';
  if(mode==='lehrbauhof') return 'lehrbauhof_default';
  return `schule_${day}`;
}

function getActivePlan(){
  const key = getPlanKey();
  // deep clone default, then apply overrides
  if(planOverrides[key]) return JSON.parse(JSON.stringify(planOverrides[key]));
  return JSON.parse(JSON.stringify(getSchedule()));
}

function savePlanOverride(plan){
  planOverrides[getPlanKey()] = plan;
  try{ localStorage.setItem('baran_plan_overrides', JSON.stringify(planOverrides)); }catch(e){}
}

function loadPlanOverrides(){
  try{
    const d = localStorage.getItem('baran_plan_overrides');
    if(d) planOverrides = JSON.parse(d);
  }catch(e){}
}

async function resetPlanDay(){
  if(!await askConfirm('Tagesplan auf den Standard zurücksetzen?', 'Zurücksetzen')) return;
  delete planOverrides[getPlanKey()];
  try{ localStorage.setItem('baran_plan_overrides', JSON.stringify(planOverrides)); }catch(e){}
  renderPlan();
}


// ── Toggle edit mode ──
function togglePlanEdit(){
  planEditModeActive = !planEditModeActive;
  const btn = document.getElementById('planEditBtn');
  const tl  = document.getElementById('timeline');
  if(planEditModeActive){
    btn.textContent = '✓ Fertig';
    btn.classList.add('active-edit');
    tl.classList.add('plan-edit-mode');
  } else {
    btn.textContent = 'Bearbeiten';
    btn.classList.remove('active-edit');
    tl.classList.remove('plan-edit-mode');
  }
}


// ── Render plan with live-time awareness ──
function renderPlan(){
  // Always refresh clock display first
  updateClock();

  const plan = getActivePlan();
  const now  = new Date();
  const nowMins = now.getHours()*60 + now.getMinutes();

  function timeMins(t){ const [h,m]=t.split(':').map(Number); return h*60+m; }

  // Find current + next block
  let currentIdx = -1;
  for(let i=0;i<plan.length;i++){
    const start = timeMins(plan[i].time);
    const end   = i<plan.length-1 ? timeMins(plan[i+1].time) : start+90;
    if(nowMins>=start && nowMins<end){ currentIdx=i; break; }
  }
  const nextIdx = currentIdx>=0 && currentIdx<plan.length-1 ? currentIdx+1 : -1;

  // Update clock bar
  const clockNext = document.getElementById('clockNext');
  const clockCountdown = document.getElementById('clockCountdown');
  if(nextIdx>=0){
    clockNext.textContent = plan[nextIdx].title;
    const nextMins = timeMins(plan[nextIdx].time);
    const diff = nextMins - nowMins;
    const h = Math.floor(diff/60), m = diff%60;
    clockCountdown.textContent = diff>60 ? `in ${h}h ${m}min` : `in ${diff} Min`;
  } else {
    clockNext.textContent = currentIdx>=0 ? 'Letzter Block' : '–';
    clockCountdown.textContent = '';
  }

  const tl = document.getElementById('timeline');
  const wasEdit = tl.classList.contains('plan-edit-mode');

  tl.innerHTML = plan.map((item, i) => {
    const isPast    = timeMins(item.time) < nowMins && i !== currentIdx;
    const isNow     = i === currentIdx;
    const isDone    = quickLogDone.has(blockKey(item));
    let classes = `block-content cat-${item.cat}${isNow?' is-now':''}${isPast&&!isDone?' is-past':''}${isDone?' is-done':''}`;
    return `
    <div class="time-block" style="animation-delay:${i*0.03}s" data-idx="${i}">
      <div class="time-label">${item.time}</div>
      <div class="${classes}" onclick="onBlockClick(${i})" oncontextmenu="event.preventDefault();toggleQuickLog(${i})">
        <button class="block-edit-btn" onclick="event.stopPropagation();openBlockEdit(${i})" aria-label="Block bearbeiten"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
        <div class="block-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
        ${isNow && !isDone ? '<div class="now-pill"><span class="now-dot"></span>JETZT</div>' : ''}
        <div class="block-title">${item.title}</div>
        ${item.desc ? `<div class="block-desc">${item.desc}</div>` : ''}
        ${item.tag  ? `<span class="block-tag tag-${item.tag}">${tagLabel(item.tag)}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  if(wasEdit) tl.classList.add('plan-edit-mode');

  // Scroll to current block
  if(currentIdx>=0 && !planEditModeActive){
    setTimeout(()=>{
      const el = tl.querySelector(`[data-idx="${currentIdx}"]`);
      if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
    }, 400);
  }

  // Tagesreadout: Datum + Fortschritt
  const pdEl = document.getElementById('planDate');
  if(pdEl) pdEl.textContent = now.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'}).replace('.,',' ·').replace(/\.$/,'');
  const doneCount = plan.filter(it=>quickLogDone.has(blockKey(it))).length;
  const total = plan.length;
  const dn = document.getElementById('planDoneNum'); if(dn) dn.textContent = doneCount;
  const tn = document.getElementById('planTotalNum'); if(tn) tn.textContent = total;
  const pb = document.getElementById('planProgressBar'); if(pb) pb.style.width = (total ? Math.round(doneCount/total*100) : 0) + '%';

  // kcal banner
  const info = getKcalInfo();
  document.getElementById('kcalBanner').innerHTML = `
    <div class="kcal-banner ${info.cls}">
      <div><div class="kcal-num">${info.num}</div><div class="kcal-label">${info.label}</div></div>
      <div class="kcal-right">${info.sub}</div>
    </div>`;

  // Undo-Banner nach Coach-Planänderung (verfällt nach 12 h)
  const ub = document.getElementById('planUndoBanner');
  if(ub){
    let undoHtml = '';
    try{
      const u = JSON.parse(localStorage.getItem('baran_plan_undo')||'null');
      if(u && u.key===getPlanKey() && (Date.now()-u.ts) < 12*60*60*1000){
        undoHtml = `<div style="display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--rule);border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:13px;color:var(--muted);">
          <span style="flex:1;">Coach hat den Plan geändert.</span>
          <button onclick="undoAIPlan()" style="background:none;border:1px solid var(--rule-strong);border-radius:8px;padding:7px 12px;font-size:13px;color:var(--ink);cursor:pointer;font-family:'IBM Plex Sans',sans-serif;">Rückgängig</button>
          <span onclick="dismissPlanUndo()" style="cursor:pointer;padding:0 4px;color:var(--muted);">✕</span>
        </div>`;
      }
    }catch(e){}
    ub.innerHTML = undoHtml;
  }

  renderExamCountdown();
}

// Countdown zur nächsten Prüfung im Tagesreadout (ab 180 Tage vorher)
function renderExamCountdown(){
  const el = document.getElementById('examCountdown');
  if(el === null || typeof EVENTS === 'undefined') return;
  const today = new Date(); today.setHours(0,0,0,0);
  const next = EVENTS
    .filter(e => e.type === 'exam')
    .map(e => ({ ...e, d: new Date(e.date) }))
    .filter(e => e.d >= today)
    .sort((a,b) => a.d - b.d)[0];
  if(!next){ el.style.display='none'; return; }
  const days = Math.ceil((next.d - today)/(1000*60*60*24));
  if(days > 180){ el.style.display='none'; return; }
  el.style.display = 'block';
  el.innerHTML = `
    <div class="rsec-head" style="margin-bottom:0;">
      <span class="rsec-label" style="color:var(--accent);">${next.name}</span>
      <span class="mono rsec-val"><span style="color:var(--ink);font-size:16px;">${days}</span> Tage · ${next.d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</span>
    </div>`;
}

function onBlockClick(idx){
  if(planEditModeActive) openBlockEdit(idx);
  else toggleQuickLog(idx);
}

// ── Block edit modal ──
function openBlockEdit(idx){
  editingBlockIdx = idx;
  addingAfterIdx = null;
  const plan = getActivePlan();
  const item = plan[idx];
  document.getElementById('blockModalTitle').textContent = 'Block bearbeiten';
  document.getElementById('bm-time').value  = item.time;
  document.getElementById('bm-title').value = item.title;
  document.getElementById('bm-desc').value  = item.desc||'';
  document.getElementById('bm-cat').value   = item.cat||'free';
  document.getElementById('bmDelBtn').style.display = plan.length>1 ? 'block':'none';
  document.getElementById('blockModal').classList.add('open');
}

function openAddBlock(afterIdx){
  editingBlockIdx = null;
  addingAfterIdx = afterIdx;
  const plan = getActivePlan();
  // suggest time midway between this and next
  const cur = plan[afterIdx];
  const next = plan[afterIdx+1];
  let suggestedTime = cur.time;
  if(next){
    const [ch,cm] = cur.time.split(':').map(Number);
    const [nh,nm] = next.time.split(':').map(Number);
    const mid = Math.round((ch*60+cm + nh*60+nm)/2);
    suggestedTime = `${String(Math.floor(mid/60)).padStart(2,'0')}:${String(mid%60).padStart(2,'0')}`;
  }
  document.getElementById('blockModalTitle').textContent = 'Neuer Block';
  document.getElementById('bm-time').value  = suggestedTime;
  document.getElementById('bm-title').value = '';
  document.getElementById('bm-desc').value  = '';
  document.getElementById('bm-cat').value   = 'free';
  document.getElementById('bmDelBtn').style.display = 'none';
  document.getElementById('blockModal').classList.add('open');
}

function addBlockBelow(){
  if(editingBlockIdx===null) return;
  const idx = editingBlockIdx;
  closeBlockModal();
  openAddBlock(idx);
}

function closeBlockModal(){
  document.getElementById('blockModal').classList.remove('open');
  editingBlockIdx = null;
  addingAfterIdx = null;
}

function saveBlockEdit(){
  const plan = getActivePlan();
  const item = {
    time:  document.getElementById('bm-time').value  || '00:00',
    title: document.getElementById('bm-title').value.trim() || 'Block',
    desc:  document.getElementById('bm-desc').value.trim(),
    cat:   document.getElementById('bm-cat').value,
    tag:   null,
  };

  if(addingAfterIdx!==null){
    plan.splice(addingAfterIdx+1, 0, item);
  } else if(editingBlockIdx!==null){
    plan[editingBlockIdx] = {...plan[editingBlockIdx], ...item};
  }

  // Re-sort by time
  plan.sort((a,b)=>{
    const [ah,am]=a.time.split(':').map(Number);
    const [bh,bm]=b.time.split(':').map(Number);
    return (ah*60+am)-(bh*60+bm);
  });

  savePlanOverride(plan);
  closeBlockModal();
  renderPlan();
}

async function deleteBlock(){
  if(editingBlockIdx===null) return;
  if(!await askConfirm('Block löschen?', 'Löschen')) return;
  const plan = getActivePlan();
  plan.splice(editingBlockIdx,1);
  savePlanOverride(plan);
  closeBlockModal();
  renderPlan();
}

// close modal on overlay click
document.getElementById('blockModal').addEventListener('click', function(e){
  if(e.target===this) closeBlockModal();
});

// ── Live Clock ──
function updateClock(){
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const el = document.getElementById('clockTime');
  if(el) el.innerHTML = `${h}:${m}<span style="font-size:16px;opacity:0.5;margin-left:2px;">:${s}</span>`;
}

function startClock(){
  updateClock();
  setInterval(updateClock, 1000);   // every second – smooth live clock
  setInterval(renderPlan, 60000);   // re-render plan every minute
}

// ═══════════════════════════════════════════
// USER PROFILE SYSTEM
// ═══════════════════════════════════════════

// Baran's profile – pre-filled, no onboarding needed for him
const BARAN_PROFILE = {
  name: 'Baran',
  age: 21,
  city: 'Berlin',
  job: 'Rohrleitungsbauer-Azubi (Ausbildung)',
  jobDetails: 'Wechselt zwischen Baustelle (05:00–17:00/Fr 12:00), Lehrbauhof (05:00–15:00) und Berufsschule. Stundenplan variiert täglich.',
  goal: 'Massephase – saubere Masse aufbauen ohne Fett',
  kcalGoal: { baustelle: 4200, lehrbauhof: 3900, schule: 3400 },
  proteinGoal: 170,
  waterGoal: { baustelle: 4, lehrbauhof: 4, schule: 3.5 },
  training: 'Boxen/Kickboxen Phase 1 (5 Tage): Mo=Push+Explosiv, Di=Skill+Kondition(Schattenboxen/HIIT), Mi=Beine+Core+Hüft-Power, Fr=Pull+Explosiv, Sa=Skill+Kondition(lang). Kombi: Jab-Jab-Cross-Low Kick. Orthodox.',
  trainingDays: 'Boxen/Kickboxen Phase 1: 5 Tage – Mo/Di/Mi/Fr/Sa. Ruhetage: Do (aktive Erholung/Spaziergang) + So (komplett). Zuhause, kein Gym.',
  sleep: '22:30–05:00 (Baustelle/Lehrbauhof) | 22:30–06:00 oder 08:00 (Schule je nach Tag)',
  fuehrerschein: '46% Theorie – täglich 15 Min Pflicht',
  kulturell: 'Türkische Wurzeln, 14 Jahre in der Türkei gelebt, multilingual (Deutsch/Türkisch), plant Umzug nach Barcelona mit ~26–27 Jahren',
  langzielziele: 'Barcelona-Café/Späti eröffnen, Startkapital 30.000–80.000€, Führerschein bald fertig',
  persoenlichkeit: 'Macht langfristige Pläne aber auch spontan. Mag ruhige Zeit mit engen Freunden. Kann Dinge anfangen aber Durchziehen ist die Herausforderung.',
  extras: 'Lernt als nächstes Spanisch. Interessiert an Trading (CFD/Forex Demo) + ETF Langzeit-Sparen via Trade Republic. Halal-konform beim Sparen (Gold über Juwelier).',
  kiName: 'Coach',
  onboardingDone: true
};

let userProfile = {};

function loadProfile(){
  try{
    const saved = localStorage.getItem('baran_profile');
    if(saved){
      userProfile = JSON.parse(saved);
    } else {
      // First time – use Baran's pre-filled profile
      userProfile = {...BARAN_PROFILE};
      localStorage.setItem('baran_profile', JSON.stringify(userProfile));
    }
  }catch(e){
    userProfile = {...BARAN_PROFILE};
  }
}

function saveProfile(){
  try{ localStorage.setItem('baran_profile', JSON.stringify(userProfile)); }catch(e){}
}

// Learn something new about the user from conversation
function learnFromConversation(userText, aiText){
  // Passive learning – look for signals in conversation
  const text = userText.toLowerCase();

  // Weight mentions → direkt ins Gewichts-Log (Plausibilitäts-Check in logWeight)
  const weightMatch = userText.match(/(\d{2,3}(?:[.,]\d{1,2})?)\s*(kg|kilo)/i);
  if(weightMatch){
    const kg = parseFloat(weightMatch[1].replace(',','.'));
    if(logWeight(kg)){ try{ renderWeight(); }catch(e){} }
  }

  // Mood/energy signals
  if(text.includes('müde') || text.includes('kaputt') || text.includes('erschöpft')){
    userProfile.lastMoodSignal = 'tired';
    userProfile.lastMoodDate = new Date().toDateString();
    saveProfile();
  }

  // Expliziter Merk-Befehl → dauerhafter Fakt (nie vergessen)
  const merk = userText.match(/(?:merk(?:e)?\s*dir|vergiss\s*nicht|wichtig)\s*:?\s*(.+)/i);
  if(merk && merk[1] && merk[1].trim().length > 2){
    addFact(merk[1].trim());
  }

  // Add to memory snippets (rollierend, max 200)
  if(!userProfile.memories) userProfile.memories = [];
  const important = text.length > 20 && (
    text.includes('ich ') || text.includes('mein ') || text.includes('heute ') ||
    text.includes('immer ') || text.includes('nie ') || text.includes('mag ')
  );
  if(important){
    userProfile.memories.unshift({ text: userText, date: new Date().toDateString() });
    userProfile.memories = userProfile.memories.slice(0, 200);
    saveProfile();
  }
}

// Dauerhaften Fakt speichern (dedupe, bounded) – immer im Coach-Kontext
function addFact(fact){
  fact = String(fact).trim();
  if(!fact) return;
  if(!userProfile.facts) userProfile.facts = [];
  const exists = userProfile.facts.some(f => f.toLowerCase() === fact.toLowerCase());
  if(!exists){
    userProfile.facts.push(fact);
    userProfile.facts = userProfile.facts.slice(-100);   // letzte 100 behalten
    saveProfile();
  }
}

// Vom Coach gesendete dauerhafte Fakten (MEMORY_UPDATE) übernehmen
function applyAIMemoryUpdate(arr){
  (arr || []).forEach(f => { if(f && typeof f === 'string') addFact(f); });
  try{ renderMemoryStatus(); }catch(e){}
}

// ═══════════════════════════════════════════
// OBSIDIAN-BRÜCKE (manueller Export/Import – iOS-tauglich)
// ═══════════════════════════════════════════
// Voller, verlustfreier Snapshot aller App-Daten (für Cloud-Sync + Obsidian-Backup).
// Secrets (API-Key, Sync-Secret/-URL) werden NIE mitgenommen.
function buildStateBundle(){
  const dh = (typeof getDayHistory==='function') ? getDayHistory() : {};
  // Roh-Keys 1:1 mitnehmen, damit Cross-Device-Restore nichts verliert.
  const extraKeys = ['baran_v2','baran_exercises','baran_exercises_v','baran_phase',
    'baran_plan_overrides','baran_quicklog','baran_notif_times','baran_training_log',
    'baran_training_done','baran_goals','baran_goals_v','baran_week_history',
    'baran_day_history','baran_last_review','baran_weight_log','baran_kw_overrides',
    'baran_habits','baran_custom_meals'];
  const extra = {};
  extraKeys.forEach(k => { try{ const v = localStorage.getItem(k); if(v!=null) extra[k]=v; }catch(e){} });
  return {
    v:2, exported: new Date().toISOString(),
    profile: userProfile,
    dayHistory: dh,
    trainingLog: (typeof trainingLog!=='undefined')?trainingLog:{},
    trainingDone: (typeof trainingDone!=='undefined')?trainingDone:{},
    weekHistory: (typeof weekHistory!=='undefined')?weekHistory:[],
    goals: (typeof goals!=='undefined')?goals:[],
    chatTail: (typeof chatHistory!=='undefined'?chatHistory:[]).slice(-40),
    extra
  };
}

function buildVaultBackup(){
  const now = new Date();
  const dh = (typeof getDayHistory==='function') ? getDayHistory() : {};
  const facts = userProfile.facts || [];
  const dayKeys = Object.keys(dh).sort().slice(-14);
  const L = [];
  L.push(`# Coach-Brain — Baran's Planner`, '');
  L.push(`> Export aus der Planner-PWA · Stand: ${now.toLocaleString('de-DE')}`);
  L.push(`> In der App unter „Gedächtnis & Obsidian" → „Laden" wieder importierbar (JSON-Block unten = verlustfrei).`, '');
  L.push(`## Profil`);
  L.push(`- Name: ${userProfile.name||'–'}, ${userProfile.age||'–'} Jahre, ${userProfile.city||'–'}`);
  L.push(`- Ziel: ${userProfile.goal||'–'}`);
  L.push(`- Training: ${userProfile.training||'–'} (${userProfile.trainingDays||'–'})`, '');
  L.push(`## Dauerhafte Fakten (${facts.length})`);
  facts.forEach(f => L.push(`- ${f}`));
  if(!facts.length) L.push('- (noch keine)');
  L.push('', `## Ziele`);
  (goals||[]).forEach(g => L.push(`- ${g.title}: ${g.current}/${g.target} ${g.unit}`));
  L.push('', `## Letzte Tage`);
  dayKeys.forEach(k => { const d=dh[k]||{}; L.push(`- ${k}: Score ${d.score==null?'–':d.score+'%'} · ${d.kcalTotal||0} kcal · ${d.proteinTotal||0}g Protein`); });
  if(userProfile.vaultKnowledge){ L.push('', `## Geladenes Vault-Wissen (Auszug)`, userProfile.vaultKnowledge.slice(0,600)); }
  const payload = buildStateBundle();
  L.push('', `## Daten (nicht löschen – für Re-Import)`, '```json', JSON.stringify(payload), '```');
  return L.join('\n');
}

async function exportToObsidian(){
  const md = buildVaultBackup();
  const fname = 'coach-brain.md';
  // Desktop: direkt in Datei schreiben
  try{
    if(window.showSaveFilePicker){
      const handle = await window.showSaveFilePicker({ suggestedName:fname, types:[{description:'Markdown', accept:{'text/markdown':['.md']}}] });
      const w = await handle.createWritable(); await w.write(md); await w.close();
      userProfile.lastBackup = new Date().toISOString(); saveProfile(); renderMemoryStatus();
      setMemNote('✅ Backup gespeichert.'); return;
    }
  }catch(e){ if(e && e.name==='AbortError') return; }
  // iOS / Mobile: Web Share mit Datei
  try{
    const file = new File([md], fname, {type:'text/markdown'});
    if(navigator.canShare && navigator.canShare({files:[file]})){
      await navigator.share({ files:[file], title:'Coach-Brain Backup' });
      userProfile.lastBackup = new Date().toISOString(); saveProfile(); renderMemoryStatus();
      setMemNote('✅ Geteilt – in den osiris-Vault sichern.'); return;
    }
  }catch(e){ if(e && e.name==='AbortError') return; }
  // Fallback: Download
  try{
    const blob = new Blob([md],{type:'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=fname; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 2000);
    userProfile.lastBackup = new Date().toISOString(); saveProfile(); renderMemoryStatus();
    setMemNote('✅ Backup heruntergeladen.');
  }catch(e){ setMemNote('⚠️ Export auf diesem Gerät nicht möglich.'); }
}

function importFromObsidian(input){
  const file = input.files && input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(){
    const content = String(reader.result||'');
    const m = content.match(/```json\s*([\s\S]*?)```/);
    if(m){
      try{ restoreFromBackup(JSON.parse(m[1].trim())); setMemNote('✅ Backup geladen & wiederhergestellt.'); }
      catch(e){ setMemNote('⚠️ JSON im Backup defekt – nicht geladen.'); }
    } else {
      userProfile.vaultKnowledge = content.slice(0, 20000);
      saveProfile();
      setMemNote('✅ Vault-Notiz geladen – der Coach kennt sie jetzt.');
    }
    renderMemoryStatus();
    input.value = '';
  };
  reader.readAsText(file);
}

function restoreFromBackup(data){
  if(!data || typeof data!=='object') return;
  if(data.profile && typeof data.profile==='object'){ userProfile = {...userProfile, ...data.profile}; saveProfile(); }
  if(data.dayHistory && typeof data.dayHistory==='object'){ try{ localStorage.setItem('baran_day_history', JSON.stringify(data.dayHistory)); }catch(e){} }
  if(data.trainingLog && typeof trainingLog!=='undefined'){ trainingLog = data.trainingLog; saveTrainingLog(); }
  if(data.trainingDone && typeof trainingDone!=='undefined'){ trainingDone = data.trainingDone; saveTrainingDone(); }
  if(Array.isArray(data.weekHistory)){ data.weekHistory.forEach((d,i)=>{ if(weekHistory[i] && d) weekHistory[i].score = d.score; }); saveWeekHistory(); }
  if(Array.isArray(data.goals)){ goals = data.goals; saveGoals(); }
  // v2: rohe Zusatz-Keys 1:1 zurückschreiben + In-Memory neu laden (Cross-Device verlustfrei)
  if(data.extra && typeof data.extra==='object'){
    const skip={baran_api_key:1,baran_sync_url:1,baran_sync_secret:1,baran_last_mutation:1,baran_cloud_backup:1};
    Object.keys(data.extra).forEach(k=>{ if(skip[k]) return; try{ localStorage.setItem(k, data.extra[k]); }catch(e){} });
    try{
      if(typeof loadStorage==='function') loadStorage();
      if(typeof loadExercises==='function') loadExercises();
      if(typeof loadPhase==='function') loadPhase();
      if(typeof loadPlanOverrides==='function') loadPlanOverrides();
      if(typeof loadTrainingLog==='function') loadTrainingLog();
      if(typeof loadTrainingDone==='function') loadTrainingDone();
      if(typeof loadGoals==='function') loadGoals();
      if(typeof loadNotifTimes==='function') loadNotifTimes();
      if(typeof loadQuickLog==='function') loadQuickLog();
      if(typeof loadWeekHistory==='function') loadWeekHistory();
      if(typeof loadWeightLog==='function') loadWeightLog();
      if(typeof loadKwOverrides==='function') loadKwOverrides();
      if(typeof loadHabits==='function') loadHabits();
      if(typeof loadCustomMeals==='function') loadCustomMeals();
    }catch(e){}
  }
  try{
    renderExercises(); renderGoals(); updateRing();
    if(typeof renderPlan==='function') renderPlan();
    if(typeof renderWeeks==='function') renderWeeks();
    if(typeof renderWeight==='function') renderWeight();
    if(typeof updateTodayScore==='function') updateTodayScore();
    if(typeof renderMemoryStatus==='function') renderMemoryStatus();
  }catch(e){}
}

function setMemNote(msg){
  const el = document.getElementById('memNote');
  if(el){ el.textContent = msg; setTimeout(()=>{ if(el.textContent===msg) el.textContent=''; }, 5000); }
}
function renderMemoryStatus(){
  const el = document.getElementById('memStatus');
  if(!el) return;
  const f = (userProfile.facts||[]).length;
  const m = (userProfile.memories||[]).length;
  const vk = userProfile.vaultKnowledge ? 'ja' : 'nein';
  const lb = userProfile.lastBackup ? new Date(userProfile.lastBackup).toLocaleDateString('de-DE') : '–';
  el.innerHTML = `Fakten: <strong>${f}</strong> · Erinnerungen: <strong>${m}</strong> · Vault-Wissen: <strong>${vk}</strong> · Letztes Backup: <strong>${lb}</strong>`;
}

// ═══════════════════════════════════════════
// AI CHAT + PLAN UPDATER
// ═══════════════════════════════════════════
let chatHistory = [];

// ── TAB-KONTEXT: der Chat ist ein eigener Tab. „Tab-aware" läuft über den
//    zuletzt offenen Inhalts-Tab. chatContext steuert Modell-Routing,
//    Befehls-Schutz und die kontextuellen Quick-Prompts. ──
let chatSourceTab = 'plan';    // zuletzt offener Inhalts-Tab (nicht 'ai')
let chatContext   = 'general'; // 'training' | 'plan' | 'check' | 'general'
function contextFromTab(t){
  if(t==='training') return 'training';
  if(t==='plan')     return 'plan';
  return 'general';            // nutrition/goals → voll holistisch
}
// Modell-Wahl: Sonnet für analytische Reviews (Check), sonst schnelles Haiku.
function modelForContext(ctx){ return ctx === 'check' ? ADVISOR_MODEL : CHAT_MODEL; }

// Kontextuelle Quick-Prompts: [Label, Prompt-Text]
const QUICK_PROMPTS = {
  training: [['Letzten Satz loggen','Trag meinen letzten Satz ins Training ein'],
             ['Alternative Übung','Schlag mir eine alternative Übung vor'],
             ['Technik-Tipp','Worauf soll ich bei der Technik achten?']],
  plan:     [['Kein Training','Training fällt heute aus'],
             ['Später heim','Ich komme später heim'],
             ['Was jetzt?','Was soll ich jetzt machen?']],
  check:    [['Wochen-Review','Starte mein Wochen-Review'],
             ['Gewichtstrend','Analysiere meinen Gewichtstrend'],
             ['Tagesfeedback','Gib mir ein ehrliches Tagesfeedback']],
  general:  [['Kein Training','Training fällt heute aus'],
             ['Was jetzt?','Was soll ich jetzt machen?'],
             ['Mein Fortschritt','Wie läuft meine Phase 1?'],
             ['Schlechter Tag','Heute war ein schlechter Tag']],
};
const CONTEXT_CHIPS = [['training','Training'],['plan','Plan'],['check','Check'],['general','Allgemein']];

function renderQuickPrompts(){
  const box = document.getElementById('quickPrompts');
  if(!box) return;
  box.innerHTML = '';
  (QUICK_PROMPTS[chatContext] || QUICK_PROMPTS.general).forEach(([label, prompt]) => {
    const b = document.createElement('button');
    b.className = 'qp-btn';
    b.textContent = label;
    b.addEventListener('click', () => useQuick(prompt));
    box.appendChild(b);
  });
}
function renderChatContextChip(){
  const box = document.getElementById('chatContextChip');
  if(!box) return;
  box.innerHTML = '';
  CONTEXT_CHIPS.forEach(([ctx, label]) => {
    const b = document.createElement('button');
    b.className = 'ctx-chip' + (ctx === chatContext ? ' active' : '');
    b.textContent = label;
    b.addEventListener('click', () => setChatContext(ctx));
    box.appendChild(b);
  });
}
// Chip-Tap: nur Kontext wechseln + UI neu zeichnen, kein API-Call.
function setChatContext(ctx){ chatContext = ctx; renderChatContextChip(); renderQuickPrompts(); }

// Wie viele Nachrichten max. an die API gehen (Sliding Window).
// Klein halten → spart Tokens/Kosten/Latenz, vermeidet Context-Limit.
// Wichtige Fakten bleiben über MEMORY_UPDATE dauerhaft im System-Prompt erhalten.
const MAX_API_MESSAGES = 12;
// Wie viele Nachrichten lokal/in der Anzeige behalten werden (Scrollback).
const MAX_STORED_MESSAGES = 30;

// Liefert das zu sendende Nachrichten-Fenster: nur die letzten MAX_API_MESSAGES,
// und so zugeschnitten, dass es mit einer User-Nachricht beginnt
// (Anthropic verlangt: erste Nachricht = user). Optional eine Zusatz-User-Nachricht anhängen.
function buildApiMessages(extraUserMsg){
  let win = chatHistory.slice(-MAX_API_MESSAGES);
  while(win.length && win[0].role !== 'user') win.shift(); // führende Assistant-Msgs droppen
  // Aufeinanderfolgende gleiche Rollen mergen – entstehen z.B. durch Coach-Pushes
  // ohne User-Turn (Training-Abhaken); die API verlangt strikte Alternierung.
  const msgs = [];
  win.forEach(m => {
    if(msgs.length && msgs[msgs.length-1].role === m.role){
      msgs[msgs.length-1].content += '\n\n' + m.content;
    } else {
      msgs.push({role: m.role, content: m.content});
    }
  });
  if(extraUserMsg){
    // Zwei aufeinanderfolgende user-Nachrichten vermeiden (Anthropic: Rollen müssen
    // alternieren) → wenn das Fenster bereits mit user endet, zusammenführen.
    if(msgs.length && msgs[msgs.length-1].role === 'user'){
      msgs[msgs.length-1] = {role:'user', content: msgs[msgs.length-1].content + '\n\n' + extraUserMsg};
    } else {
      msgs.push({role:'user', content: extraUserMsg});
    }
  }
  return msgs;
}

function loadChatHistory(){
  try{
    const d = localStorage.getItem('baran_chat');
    if(d){ chatHistory = JSON.parse(d); }
  }catch(e){}
}
function saveChatHistory(){
  // In-Memory ebenfalls begrenzen, damit das Array in langen Sessions nicht unbegrenzt wächst.
  if(chatHistory.length > MAX_STORED_MESSAGES) chatHistory = chatHistory.slice(-MAX_STORED_MESSAGES);
  try{ localStorage.setItem('baran_chat', JSON.stringify(chatHistory)); }catch(e){}
}

function useQuick(text){
  document.getElementById('aiInput').value = text;
  sendToAI();
}

function clearChat(){
  chatHistory = [];
  localStorage.removeItem('baran_chat');
  document.getElementById('aiMessages').innerHTML = '';
}

function appendMsg(role, html){
  const el = document.createElement('div');
  el.className = role === 'user' ? 'msg-user' : 'msg-ai';
  el.innerHTML = html;
  const box = document.getElementById('aiMessages');
  if(box){ box.appendChild(el); el.scrollIntoView({behavior:'smooth', block:'end'}); }
}

function renderChatHistory(){
  const box = document.getElementById('aiMessages');
  if(!box) return;
  box.innerHTML = '';

  // If no history → show welcome message
  if(chatHistory.length === 0){
    const name = userProfile.name || 'du';
    const kiName = userProfile.kiName || 'Coach';
    const now = new Date();
    const h = now.getHours();
    const greeting = h < 12 ? 'Guten Morgen' : h < 18 ? 'Hey' : 'Guten Abend';
    appendMsg('assistant', formatAIMessage(`${greeting} ${name}! 👋 Ich bin dein ${kiName}. Was ist heute los – soll ich deinen Plan anpassen, hast du eine Frage, oder willst du einfach kurz updaten wie es läuft?`));
    return;
  }

  chatHistory.forEach(m => {
    const el = document.createElement('div');
    el.className = m.role === 'user' ? 'msg-user' : 'msg-ai';
    el.innerHTML = m.role === 'assistant' ? formatAIMessage(m.content) : m.content;
    box.appendChild(el);
  });
}

function formatAIMessage(text){
  const kiName = userProfile.kiName || 'Coach';
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  return `<div class="msg-label">${kiName}</div>${html}`;
}

// ═══════════════════════════════════════════
// SYSTEM-PROMPT in zwei Blöcken:
// Der statische Block (Profil, Regeln, Fakten – ändert sich selten) wird per
// cache_control gecacht → Folgenachrichten innerhalb von 5 Min zahlen den
// fetten Prompt nicht jedes Mal voll. Dynamik (Uhrzeit, Tageswerte, Plan,
// Memories, Tab-Kontext) kommt als zweiter, ungecachter Block dahinter.
// ═══════════════════════════════════════════
function buildSystemStatic(){
  const facts = (userProfile.facts || []).map(f => `• ${f}`).join('\n');
  const vaultKnowledge = (userProfile.vaultKnowledge || '').slice(0, 4000);

  return `Du bist ${userProfile.kiName || 'Coach'}, der persönliche KI-Assistent von ${userProfile.name || 'dem Nutzer'} in seiner Life-Management-App.

NUTZERPROFIL:
- Name: ${userProfile.name || '–'}, ${userProfile.age || '–'} Jahre, ${userProfile.city || '–'}
- Job: ${userProfile.job || '–'} ${userProfile.jobDetails ? '– '+userProfile.jobDetails : ''}
- Ziel: ${userProfile.goal || '–'}
- Training: ${userProfile.training || '–'}
- Trainingstage: ${userProfile.trainingDays || '–'}
- Schlaf: ${userProfile.sleep || '–'}
- Führerschein: ${userProfile.fuehrerschein || '–'}
- Kulturelles: ${userProfile.kulturell || '–'}
- Langzeitziele: ${userProfile.langzielziele || '–'}
- Persönlichkeit: ${userProfile.persoenlichkeit || '–'}
- Extras: ${userProfile.extras || '–'}

DEINE ROLLE:
- Du bist kein Roboter – du bist ein loyaler, intelligenter Freund der auch Coach ist
- Antworte auf Deutsch, kurz und direkt (2–4 Sätze)
- TRAINING: Nutze den Block "TRAINING DIESE WOCHE". Ist heute Trainingstag und NOCH OFFEN → bei Gelegenheit kurz, locker dran erinnern. Ist es ERLEDIGT → anerkennen und NICHT nochmal nachfragen ob er trainiert hat. An Ruhetagen nicht zum Training pushen.
- PFLICHT: Wenn der Nutzer sagt Training fällt aus / er kommt später / er ist müde / er macht was anderes heute → schick IMMER PLAN_UPDATE mit dem angepassten Plan
- PLAN_UPDATE am Ende: PLAN_UPDATE: [{"time":"HH:MM","title":"...","desc":"...","cat":"morning|meal|work|sport|habit|learn|free|sleep"}]
- Immer den KOMPLETTEN Tagesplan als Array – nicht nur die geänderten Blöcke
- WICHTIG: Wenn der Nutzer erwähnt was er gegessen hat oder essen will, trag es DIREKT ein mit MEAL_UPDATE am Ende
- MEAL_UPDATE Format: [{"name":"Mahlzeit Name","kcal":Zahl,"protein":Zahl,"emoji":"🍽️"}]
- Beispiel: Nutzer sagt "hab 3 Eier gegessen" → MEAL_UPDATE: [{"name":"3 Eier","kcal":210,"protein":19,"emoji":"🥚"}]
- Schätze Kalorien/Protein wenn nicht bekannt – lieber schätzen als nicht eintragen
- WICHTIG: Wenn der Nutzer erwähnt dass er trainiert hat oder Übungen gemacht hat, logge es mit TRAINING_UPDATE
- TRAINING_UPDATE Format: {"exerciseName":"Klimmzüge","reps":10,"sets":3,"weight":0,"note":"Via Coach"}
- Beispiel: "hab 10 Klimmzüge gemacht" → TRAINING_UPDATE: {"exerciseName":"Klimmzüge","reps":10,"sets":4,"weight":0}
- WICHTIG: Wenn der Nutzer Fortschritt bei einem Ziel meldet, update es mit GOAL_UPDATE
- GOAL_UPDATE Format: [{"title":"Zielname","current":neuerWert}]
- Beispiel: "Führerschein jetzt bei 55%" → GOAL_UPDATE: [{"title":"Führerschein","current":55}]
- GEWICHT: Nennt der Nutzer sein Körpergewicht, wird es automatisch geloggt – nutze den 7-Tage-Trend aus HEUTE für deine Einschätzung
- Wenn nach Training/Ernährung gefragt: gib konkrete, an den Nutzer angepasste Empfehlungen
- Bei Ernährungsfragen: berücksichtige aktuellen Kalorienstand des Tages
- Wenn Nutzer müde/gestresst wirkt: empathisch reagieren, Plan reduzieren statt pushen
- Merke dir wichtige Infos die der Nutzer preisgibt (passives Lernen)
- GEDÄCHTNIS: Wenn der Nutzer etwas Dauerhaftes über sich preisgibt (Vorlieben, Abneigungen, feste Gewohnheiten, wichtige Personen, Entscheidungen, Werte) → speichere es dauerhaft mit MEMORY_UPDATE am Ende. Nur wirklich Bleibendes, keine Tages-Kleinigkeiten.
- MEMORY_UPDATE Format: MEMORY_UPDATE: ["kurzer Fakt 1","kurzer Fakt 2"]
- Beispiel: "ich hasse Brokkoli und stehe immer 5 Uhr auf" → MEMORY_UPDATE: ["Hasst Brokkoli","Steht werktags um 5 Uhr auf"]

${facts ? `FAKTEN (dauerhaft – nie vergessen, immer berücksichtigen):\n${facts}\n` : ''}
${vaultKnowledge ? `WISSEN AUS OBSIDIAN (von Baran bereitgestellt):\n${vaultKnowledge}` : ''}`;
}

function buildSystemDynamic(){
  const currentPlan = getActivePlan();
  const now = new Date();
  const dayNames = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
  const todayName = dayNames[now.getDay()];
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const modeLabel = mode === 'baustelle' ? 'Baustelle' : mode === 'lehrbauhof' ? 'Lehrbauhof' : mode === 'weekend' ? 'Wochenende' : 'Berufsschule';
  const planText = currentPlan.map(b => `${b.time} – ${b.title}${b.desc ? ': '+b.desc : ''}`).join('\n');
  const memories = (userProfile.memories || []).slice(0, 25).map(m => `• ${m.date}: "${m.text}"`).join('\n');
  const kcalGoal = getKcalGoal();

  // Nutrition today
  const todayKcal = todayLog.reduce((s,l)=>s+l.kcal,0);
  const todayProtein = todayLog.reduce((s,l)=>s+(l.protein||0),0);

  // Gewicht + Trend
  const wLast = weightLog.length ? weightLog[weightLog.length-1] : null;
  const wCur = weightAvg(7,0), wPrev = weightAvg(7,7);
  const weightLine = wLast
    ? `- Gewicht: ${wLast.kg} kg (${wLast.date})${(wCur!==null&&wPrev!==null)?` | 7-Tage-Trend: ${(wCur-wPrev)>=0?'+':''}${(wCur-wPrev).toFixed(1)} kg vs. Vorwoche`:''}`
    : '- Gewicht: noch kein Eintrag';

  // Letzte 7 Tage aus dem Tagesbuch – der Coach soll die Woche kennen, nicht raten
  const dh = getDayHistory();
  const last7 = Object.values(dh)
    .map(d => ({...d, t: new Date(d.date).getTime()}))
    .filter(d => !isNaN(d.t))
    .sort((a,b) => a.t-b.t).slice(-7)
    .map(d => `- ${new Date(d.date).toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'})}: Score ${d.score==null?'–':d.score+'%'} · ${d.kcalTotal||0} kcal · ${d.proteinTotal||0}g Protein`)
    .join('\n');

  // Goals context
  const goalsText = goals.map(g => {
    const pct = Math.round((g.current/g.target)*100);
    return `${g.title}: ${g.current}/${g.target} ${g.unit} (${pct}%)`;
  }).join(' | ');

  // Trainings-Status diese Woche (aus trainingDone)
  const wkT = getWeekKey(0);
  const todaySplitKey = getTodaySplitKey();
  const trainingWeekLine = TRAINING_DAYS.map(d => `${d.day} (${d.split}): ${isDayDone(d.key,wkT)?'✓ erledigt':'offen'}`).join(' | ');
  const trainingTodayLine = todaySplitKey
    ? `Heute ist Trainingstag (${TRAINING_DAYS.find(d=>d.key===todaySplitKey).split}) – Status: ${isDayDone(todaySplitKey,wkT)?'ERLEDIGT ✓':'NOCH OFFEN'}`
    : 'Heute ist kein geplanter Trainingstag (Ruhetag).';

  // Tab-Kontext: lenkt sanft, welcher Update-Befehl gerade primär passt.
  const tabKontextMap = {
    training: 'Training. Nutze primär TRAINING_UPDATE. KEIN PLAN_UPDATE.',
    plan:     'Plan/Tagesablauf. Nutze primär PLAN_UPDATE für Tagesplan-Änderungen.',
    check:    'Check/Reflexion. Reflektiere und analysiere; nur GOAL_UPDATE / MEMORY_UPDATE bei Bedarf, kein PLAN_UPDATE.',
    general:  'Allgemein. Alle Befehle nach Bedarf.'
  };

  return `HEUTE:
- ${todayName}, ${timeStr} Uhr, Wochenmodus: ${modeLabel}
- Kalorien heute: ${todayKcal} / ${kcalGoal} kcal | Protein: ${todayProtein}g / ${getProteinGoal()}g
- Wasser: ${waterL.toFixed(1)}L
${weightLine}

LETZTE TAGE (Tagesbuch):
${last7 || '- noch keine gespeicherten Tage'}

TRAINING DIESE WOCHE:
- ${trainingTodayLine}
- ${trainingWeekLine}

HEUTIGER PLAN:
${planText}

${goalsText ? `ZIELE:\n${goalsText}\n` : ''}
${memories ? `GESPRÄCHS-GEDÄCHTNIS (letzte Themen):\n${memories}\n` : ''}
AKTUELLER TAB-KONTEXT: ${tabKontextMap[chatContext] || tabKontextMap.general}`;
}

function buildSystemBlocks(){
  return [
    { type:'text', text: buildSystemStatic(), cache_control:{ type:'ephemeral' } },
    { type:'text', text: buildSystemDynamic() }
  ];
}

// ═══════════════════════════════════════════
// ROBUSTE EXTRAKTION VON COACH-DIREKTIVEN
// Tolerant gegenüber ```json-Fences, Smart-Quotes, Trailing-Commas,
// Zero-Width-Zeichen und verschachtelten Objekten/Arrays.
// ═══════════════════════════════════════════
function extractAIDirective(rawText, trigger){
  if(!rawText) return null;
  // Letztes Vorkommen nehmen: falls der Trigger im Fließtext erwähnt UND als
  // echtes Directive ausgegeben wird, ist die echte Direktive i.d.R. die letzte.
  const tIdx = rawText.lastIndexOf(trigger);
  if(tIdx === -1) return null;

  // Ab dem Trigger vorwärts bis zur ersten Klammer scannen.
  let i = tIdx + trigger.length;
  const gapStart = i;
  while(i < rawText.length && rawText[i] !== '[' && rawText[i] !== '{') i++;
  if(i >= rawText.length) return null;

  // Die "Brücke" zwischen Trigger und Klammer darf NUR aus Doppelpunkt,
  // Whitespace, Backticks und optionalem "json" (Markdown-Fence) bestehen.
  // Sonst ist es nur eine Erwähnung im Fließtext → kein Directive.
  if(!/^[\s:`]*(?:json)?[\s:`]*$/i.test(rawText.slice(gapStart, i))) return null;

  const open  = rawText[i];
  const close = open === '[' ? ']' : '}';

  // Klammer-Tiefe zählen, dabei Strings + Escapes respektieren
  // → findet die WIRKLICH passende schließende Klammer (auch bei Verschachtelung
  //   oder Klammern innerhalb von String-Werten).
  let depth = 0, inStr = false, esc = false, end = -1;
  for(let j = i; j < rawText.length; j++){
    const ch = rawText[j];
    if(esc){ esc = false; continue; }
    if(ch === '\\'){ esc = true; continue; }
    if(ch === '"'){ inStr = !inStr; continue; }
    if(inStr) continue;
    if(ch === open) depth++;
    else if(ch === close){ depth--; if(depth === 0){ end = j; break; } }
  }
  if(end === -1) return null; // unbalanciert → sicher abbrechen

  let jsonStr = rawText.slice(i, end + 1)
    .replace(/[“”]/g, '"')             // kluge doppelte Anfuehrungszeichen -> "
    .replace(/[‘’]/g, "'")             // kluge einfache Anfuehrungszeichen -> '
    .replace(/,\s*([\]}])/g, '$1')               // Trailing-Commas vor ] oder }
    .replace(/[​‌‍﻿]/g, ''); // Zero-Width / BOM entfernen

  // Span auch ein evtl. führendes **bold** mitnehmen, damit es sauber rausfliegt
  let start = tIdx;
  if(rawText.slice(Math.max(0, tIdx - 2), tIdx) === '**') start = tIdx - 2;

  try{
    return { data: JSON.parse(jsonStr), start, end: end + 1 };
  }catch(e){
    console.warn('extractAIDirective: Parsen fehlgeschlagen für ' + trigger, e);
    return null;
  }
}

// Entfernt die erkannten Direktiv-Spans aus dem Anzeigetext und räumt
// verwaiste Markdown-Fences / Leerzeilen auf.
function stripDirectives(text, spans){
  spans.slice().sort((a,b)=>b[0]-a[0]).forEach(([s,e])=>{ text = text.slice(0,s) + text.slice(e); });
  return text
    .replace(/```[a-zA-Z]*\s*```/g, '') // leere Code-Blöcke
    .replace(/```[a-zA-Z]*\n?/g, '')    // verwaiste öffnende Fence
    .replace(/```/g, '')                // verwaiste schließende Fence
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ═══════════════════════════════════════════
// API-TRANSPORT
// Direkt zu Anthropic ODER über den Supabase-Chat-Proxy (dann bleibt der
// API-Key serverseitig; localStorage 'baran_chat_proxy_url', Auth über
// dasselbe Secret wie der Sync).
// ═══════════════════════════════════════════
function chatProxyUrl(){ try{ return (localStorage.getItem('baran_chat_proxy_url')||'').trim(); }catch(e){ return ''; } }
function apiEndpoint(){ return chatProxyUrl() || 'https://api.anthropic.com/v1/messages'; }
function apiHeaders(){
  const h = { 'Content-Type':'application/json' };
  if(chatProxyUrl()){
    let s=''; try{ s=(localStorage.getItem('baran_sync_secret')||'').trim(); }catch(e){}
    h['X-Baro-Secret'] = s;
  } else {
    h['anthropic-version'] = '2023-06-01';
    h['anthropic-dangerous-direct-browser-access'] = 'true';
    h['x-api-key'] = window.ANTHROPIC_KEY || '';
  }
  return h;
}

// Direktiven-Trigger: ab hier wird der Stream in der Anzeige abgeschnitten,
// damit kein rohes JSON aufblitzt (nach Stream-Ende wie gehabt geparst).
const DIRECTIVE_TRIGGERS = ['PLAN_UPDATE','MEAL_UPDATE','TRAINING_UPDATE','GOAL_UPDATE','MEMORY_UPDATE'];
function visibleStreamText(t){
  let cut = t.length;
  for(const tr of DIRECTIVE_TRIGGERS){
    const i = t.indexOf(tr);
    if(i >= 0 && i < cut) cut = i;
  }
  return t.slice(0, cut);
}

// Streamt eine Anthropic-Antwort (SSE) und ruft onDelta mit dem bisherigen Gesamttext auf.
async function streamAnthropicMessage(body, onDelta){
  const res = await fetch(apiEndpoint(), {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ ...body, stream: true })
  });
  if(!res.ok){
    let msg = 'HTTP ' + res.status;
    try{ const j = await res.json(); msg = (j.error && j.error.message) || msg; }catch(e){}
    throw new Error(msg);
  }
  if(!res.body || !res.body.getReader){
    // Kein Streaming verfügbar → komplette Antwort lesen
    const j = await res.json();
    return (j.content && j.content[0] && j.content[0].text) || '';
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '', full = '';
  while(true){
    const { done, value } = await reader.read();
    if(done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for(const line of lines){
      if(!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if(!data) continue;
      let ev = null;
      try{ ev = JSON.parse(data); }catch(e){ continue; }
      if(ev.type === 'content_block_delta' && ev.delta && ev.delta.text){
        full += ev.delta.text;
        if(onDelta) onDelta(full);
      } else if(ev.type === 'error'){
        throw new Error((ev.error && ev.error.message) || 'Stream-Fehler');
      }
    }
  }
  return full;
}

async function sendToAI(){
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if(!text) return;
  input.value = '';

  appendMsg('user', text);

  chatHistory.push({role:'user', content: text});
  document.getElementById('aiLoading').style.display = 'block';

  // Live-Bubble während des Streamings – Direktiven-JSON bleibt ausgeblendet
  let streamEl = null;
  const onDelta = (full) => {
    const vis = visibleStreamText(full);
    if(!vis.trim()) return;
    if(!streamEl){
      document.getElementById('aiLoading').style.display = 'none';
      streamEl = document.createElement('div');
      streamEl.className = 'msg-ai';
      const box = document.getElementById('aiMessages');
      if(box) box.appendChild(streamEl);
    }
    streamEl.innerHTML = formatAIMessage(vis);
    streamEl.scrollIntoView({behavior:'auto', block:'end'});
  };

  try {
    const rawText = await streamAnthropicMessage({
      model: modelForContext(chatContext),   // Check → Sonnet (analytisch), sonst Haiku (schnell)
      max_tokens: 1200,
      system: buildSystemBlocks(),
      messages: buildApiMessages()
    }, onDelta) || 'Fehler – keine Antwort erhalten.';

    // ── Coach-Direktiven robust extrahieren (tolerant ggü. ```json-Fences etc.) ──
    const planRes  = extractAIDirective(rawText, 'PLAN_UPDATE');
    const mealRes  = extractAIDirective(rawText, 'MEAL_UPDATE');
    const trainRes = extractAIDirective(rawText, 'TRAINING_UPDATE');
    const goalRes  = extractAIDirective(rawText, 'GOAL_UPDATE');
    const memRes   = extractAIDirective(rawText, 'MEMORY_UPDATE');

    const planUpdate     = Array.isArray(planRes?.data) ? planRes.data : null;
    const mealUpdate     = Array.isArray(mealRes?.data) ? mealRes.data : null;
    const trainingUpdate = (trainRes && trainRes.data && typeof trainRes.data === 'object' && !Array.isArray(trainRes.data)) ? trainRes.data : null;
    const goalUpdate     = Array.isArray(goalRes?.data) ? goalRes.data : null;
    const memoryUpdate   = Array.isArray(memRes?.data) ? memRes.data : null;

    // Erkannte Direktiven aus dem Anzeigetext entfernen (Spans inkl. ```json-Fences)
    const _spans = [];
    [planRes, mealRes, trainRes, goalRes, memRes].forEach(r => { if(r) _spans.push([r.start, r.end]); });
    let displayText = stripDirectives(rawText, _spans);

    chatHistory.push({role:'assistant', content: rawText});
    saveChatHistory();

    // Passive learning
    learnFromConversation(text, rawText);

    document.getElementById('aiLoading').style.display = 'none';

    // Auto-apply plan update — harter Schutz: PLAN_UPDATE überschreibt den ganzen
    // Tagesplan, daher nur im Plan- oder Allgemein-Kontext zulassen.
    const planAllowed = chatContext === 'plan' || chatContext === 'general';
    if(planUpdate && planUpdate.length > 0 && planAllowed){
      applyAIPlanUpdate(planUpdate, false);
      displayText += '\n\n✅ **Plan aktualisiert.** (Rückgängig: im Plan-Tab)';
    } else if(planUpdate && planUpdate.length > 0){
      console.warn('PLAN_UPDATE im Kontext "' + chatContext + '" verworfen (nur plan/general erlaubt).');
    }

    // Auto-log meals
    if(mealUpdate && mealUpdate.length > 0){
      applyAIMealUpdate(mealUpdate);
      const names = mealUpdate.map(m=>m.name).join(', ');
      const totalKcal = mealUpdate.reduce((s,m)=>s+(m.kcal||0),0);
      displayText += `\n\n🥗 **Eingetragen:** ${names} (~${totalKcal} kcal)`;
    }

    // Auto-log training
    if(trainingUpdate){
      applyAITrainingUpdate(trainingUpdate);
      displayText += `\n\n💪 **Training geloggt:** ${trainingUpdate.exerciseName}`;
    }

    // Auto-update goals
    if(goalUpdate && goalUpdate.length > 0){
      applyAIGoalUpdate(goalUpdate);
      displayText += `\n\n🎯 **Ziel aktualisiert.**`;
    }

    // Auto-save durable memory facts
    if(memoryUpdate && memoryUpdate.length > 0){
      applyAIMemoryUpdate(memoryUpdate);
      displayText += `\n\n🧠 **Gemerkt.**`;
    }

    if(streamEl){
      streamEl.innerHTML = formatAIMessage(displayText);
      streamEl.scrollIntoView({behavior:'smooth', block:'end'});
    } else {
      appendMsg('assistant', formatAIMessage(displayText));
    }

  } catch(err) {
    document.getElementById('aiLoading').style.display = 'none';
    const msg = (err && err.message && err.message !== 'Failed to fetch')
      ? 'API Fehler: ' + err.message
      : 'Verbindungsfehler. Internetverbindung prüfen und nochmal versuchen.';
    if(streamEl) streamEl.innerHTML = formatAIMessage(msg);
    else appendMsg('assistant', formatAIMessage(msg));
  }
}


function applyAITrainingUpdate(update){
  // update: {exerciseId, exerciseName, sets:[{reps,weight}], note}
  const weekKey = getWeekKey(0);
  if(!trainingLog[weekKey]) trainingLog[weekKey] = {};
  
  // Find exercise by name if no ID
  let exId = update.exerciseId;
  if(!exId){
    const found = exercises.find(e => e.name.toLowerCase().includes((update.exerciseName||'').toLowerCase()));
    exId = found ? found.id : 'ai_ex_' + Date.now();
  }
  
  trainingLog[weekKey][exId] = {
    sets: update.sets || [{reps: update.reps || 10, weight: update.weight || 0}],
    note: update.note || 'Via KI eingetragen',
    date: new Date().toLocaleDateString('de-DE')
  };
  saveTrainingLog();
  // Coach-eingetragene Übung zählt auch als Trainingstag erledigt
  const exForDay = exercises.find(e=>e.id===exId);
  if(exForDay && TRAINING_DAYS.some(d=>d.key===exForDay.day)) setDayDone(exForDay.day,'auto');
  renderExercises();
}

// Coach schreibt EINEN kurzen Motivations-Satz in den Chat, wenn Baran Training manuell abhakt.
// Ohne API-Key passiert nichts (Status ist trotzdem gesetzt).
async function notifyCoachTrainingDone(dayKey){
  if(!window.ANTHROPIC_KEY && !chatProxyUrl()) return;
  const day = TRAINING_DAYS.find(d=>d.key===dayKey);
  const split = day ? day.split : dayKey;
  const wk = getWeekKey(0);
  const doneCount = TRAINING_DAYS.filter(d=>isDayDone(d.key,wk)).length;
  const sysNote = `[System-Hinweis, keine Nutzernachricht: Baran hat sein Training „${split}" gerade als ERLEDIGT markiert. Diese Woche ${doneCount}/${TRAINING_DAYS.length} Trainingstage geschafft. Reagiere mit EINEM kurzen, motivierenden Satz auf Deutsch. Keine Rückfrage. KEIN PLAN_UPDATE / MEAL_UPDATE / TRAINING_UPDATE / GOAL_UPDATE.]`;
  try{
    const res = await fetch(apiEndpoint(), {
      method:'POST',
      headers: apiHeaders(),
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: 200,
        system: buildSystemBlocks(),
        messages: buildApiMessages(sysNote)
      })
    });
    const data = await res.json();
    const reply = (data && data.content && data.content[0] && data.content[0].text || '').trim();
    if(reply){
      chatHistory.push({role:'assistant', content: reply});
      saveChatHistory();
      appendMsg('assistant', formatAIMessage(reply));
    }
  }catch(e){ /* still – Abhaken funktioniert auch ohne Coach-Reaktion */ }
}

function applyAIGoalUpdate(updates){
  // updates: [{title or id, current}]
  updates.forEach(u => {
    const goal = goals.find(g => 
      g.id === u.id || 
      g.title.toLowerCase().includes((u.title||'').toLowerCase())
    );
    if(goal && u.current !== undefined){
      goal.current = u.current;
    }
  });
  saveGoals();
  renderGoals();
}

function applyAIMealUpdate(meals){
  meals.forEach(m => {
    // Don't add duplicates
    const exists = todayLog.find(l => l.name === m.name);
    if(!exists){
      todayLog.push({
        id: 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2,5),
        name: m.name,
        kcal: m.kcal || 0,
        protein: m.protein || 0,
        emoji: m.emoji || '🍽️'
      });
    }
  });
  saveStorage();
  renderLog();
  updateRing();
  renderMealGrid();
}

function applyAIPlanUpdate(newPlan, switchTab=true){
  // Undo-Snapshot: PLAN_UPDATE überschreibt den ganzen Tag – vorherigen Stand einmal sichern
  try{
    localStorage.setItem('baran_plan_undo', JSON.stringify({
      key: getPlanKey(),
      prev: planOverrides[getPlanKey()] || null,
      ts: Date.now()
    }));
  }catch(e){}
  newPlan.sort((a,b) => {
    const [ah,am] = a.time.split(':').map(Number);
    const [bh,bm] = b.time.split(':').map(Number);
    return (ah*60+am)-(bh*60+bm);
  });
  savePlanOverride(newPlan);
  renderPlan(); // always re-render in background
  if(switchTab){
    const planBtn = document.querySelector('[data-page="plan"]');
    showPage('plan', planBtn);
  }
}

function undoAIPlan(){
  try{
    const u = JSON.parse(localStorage.getItem('baran_plan_undo')||'null');
    if(!u) return;
    if(u.prev) planOverrides[u.key] = u.prev; else delete planOverrides[u.key];
    localStorage.setItem('baran_plan_overrides', JSON.stringify(planOverrides));
    localStorage.removeItem('baran_plan_undo');
    renderPlan();
  }catch(e){}
}
function dismissPlanUndo(){
  try{ localStorage.removeItem('baran_plan_undo'); }catch(e){}
  renderPlan();
}

// ═══════════════════════════════════════════
// NUTRITION PHASE SYSTEM
// ═══════════════════════════════════════════
const PHASE_CONFIG = {
  masse:    { label:'Massephase', kcalMult:1.0, proteinG:170, color:'var(--green)',   kcalBase:{baustelle:4200,lehrbauhof:3900,schule:3400} },
  maintain: { label:'Maintain',   kcalMult:0.85,proteinG:150, color:'var(--schule)',  kcalBase:{baustelle:3600,lehrbauhof:3400,schule:3000} },
  cut:      { label:'Cut',        kcalMult:0.75,proteinG:180, color:'var(--red)',     kcalBase:{baustelle:3200,lehrbauhof:2900,schule:2600} },
};

let currentPhase = 'masse';
let pendingPhase = null;

function loadPhase(){
  try{ const p = localStorage.getItem('baran_phase'); if(p) currentPhase = p; }catch(e){}
}
function savePhase(){ try{ localStorage.setItem('baran_phase', currentPhase); }catch(e){} }

function getKcalGoal(){
  const m = (mode==='weekend') ? 'schule' : mode;
  return PHASE_CONFIG[currentPhase]?.kcalBase[m] || 3400;
}
function getWaterGoal(){ return (mode==='baustelle'||mode==='lehrbauhof') ? 4 : 3.5; }
function getProteinGoal(){ return (PHASE_CONFIG[currentPhase]||PHASE_CONFIG.masse).proteinG || 170; }

// ═══════════════════════════════════════════
// GEWICHTS-TRACKING (Kernmetrik der Phase)
// ═══════════════════════════════════════════
let weightLog = []; // [{date:'YYYY-MM-DD', kg}] – ein Eintrag pro Tag, chronologisch

function loadWeightLog(){ try{ const d=localStorage.getItem('baran_weight_log'); if(d) weightLog=JSON.parse(d); }catch(e){} }
function saveWeightLog(){ try{ localStorage.setItem('baran_weight_log', JSON.stringify(weightLog)); }catch(e){} }

function dateKeyOffset(offset){
  const d=new Date(); d.setDate(d.getDate()-offset);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

function logWeight(kg){
  kg = Math.round(kg*10)/10;
  if(!kg || kg<40 || kg>250) return false;   // Tippfehler-Schutz
  const key = dateKeyOffset(0);
  const existing = weightLog.find(w=>w.date===key);
  if(existing) existing.kg = kg; else weightLog.push({date:key, kg});
  weightLog.sort((a,b)=>a.date<b.date?-1:1);
  if(weightLog.length>365) weightLog = weightLog.slice(-365);
  saveWeightLog();
  userProfile.currentWeight = kg; saveProfile();
  // Gewichts-Ziel automatisch mitführen (kein doppeltes Pflegen)
  try{
    const g = goals.find(x=>/gewicht/i.test(x.title));
    if(g){ g.current = kg; saveGoals(); renderGoals(); }
  }catch(e){}
  return true;
}

// Durchschnitt über `days` Tage, `offset` Tage zurückversetzt (0 = bis heute)
function weightAvg(days, offset){
  offset = offset||0;
  const from = dateKeyOffset(offset+days-1), to = dateKeyOffset(offset);
  const vals = weightLog.filter(w=>w.date>=from && w.date<=to).map(w=>w.kg);
  if(!vals.length) return null;
  return vals.reduce((s,v)=>s+v,0)/vals.length;
}

function submitWeight(){
  const inp = document.getElementById('weightInput');
  const kg = parseFloat(String(inp.value).replace(',','.'));
  if(!logWeight(kg)){ inp.style.borderColor='var(--over)'; return; }
  inp.value=''; inp.style.borderColor='var(--border)';
  renderWeight();
  if(navigator.vibrate) navigator.vibrate(20);
}

function renderWeight(){
  const nowEl = document.getElementById('weightNow');
  if(!nowEl) return;
  const last = weightLog.length ? weightLog[weightLog.length-1] : null;
  const lastKg = last ? last.kg : (userProfile.currentWeight || null);
  nowEl.textContent = lastKg ? lastKg.toLocaleString('de-DE',{minimumFractionDigits:1,maximumFractionDigits:1}) : '–';

  const phaseLbl = document.getElementById('weightPhaseLabel');
  if(phaseLbl) phaseLbl.textContent = (PHASE_CONFIG[currentPhase]||PHASE_CONFIG.masse).label;

  const t = document.getElementById('weightTrend');
  const cur = weightAvg(7,0), prev = weightAvg(7,7);
  if(t){
    if(cur!==null && prev!==null){
      const d = cur-prev;
      // Massephase: rauf = gut · Cut: runter = gut
      const goodUp = currentPhase!=='cut';
      const col = d===0 ? 'var(--muted)' : (d>0)===goodUp ? 'var(--ok)' : 'var(--over)';
      t.innerHTML = `7-Tage-Schnitt: <span class="mono" style="color:var(--ink)">${cur.toFixed(1)} kg</span> · vs. Vorwoche: <span class="mono" style="color:${col}">${d>0?'+':''}${d.toFixed(1)} kg</span>`;
    } else if(cur!==null){
      t.innerHTML = `7-Tage-Schnitt: <span class="mono" style="color:var(--ink)">${cur.toFixed(1)} kg</span> · noch keine Vorwoche zum Vergleich`;
    } else {
      t.textContent = 'Trag dein Gewicht ein – am besten morgens nach dem Aufstehen.';
    }
  }

  // Sparkline über die letzten 30 Einträge
  const svg = document.getElementById('weightSpark');
  if(svg){
    const pts = weightLog.slice(-30);
    if(pts.length>=2){
      const min = Math.min(...pts.map(p=>p.kg)), max = Math.max(...pts.map(p=>p.kg));
      const pad = (max-min)<1 ? 0.5 : (max-min)*0.15;
      const lo = min-pad, hi = max+pad;
      const W=300, H=60;
      const xy = pts.map((p,i)=>[i/(pts.length-1)*(W-8)+4, H-4-((p.kg-lo)/(hi-lo))*(H-8)]);
      const path = xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
      const lastPt = xy[xy.length-1];
      svg.innerHTML = `<path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><circle cx="${lastPt[0]}" cy="${lastPt[1]}" r="3" fill="var(--accent)"/>`;
      svg.style.display = 'block';
    } else {
      svg.style.display = 'none';
    }
  }
}

function applyPhaseUI(){
  document.querySelectorAll('.phase-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.phase === currentPhase);
  });
  const cfg = PHASE_CONFIG[currentPhase];
  const lbl = document.getElementById('nutritionPhaseLabel');
  if(lbl) lbl.textContent = cfg.label + ' Tracker';
  updateNutritionNote();
  updateRing();
}

async function requestPhaseChange(newPhase, el){
  if(newPhase === currentPhase) return;
  pendingPhase = newPhase;
  const cfg = PHASE_CONFIG[newPhase];
  const curCfg = PHASE_CONFIG[currentPhase];

  document.getElementById('phaseModalText').innerHTML =
    `Du willst von <strong style="color:${curCfg.color}">${curCfg.label}</strong> zu <strong style="color:${cfg.color}">${cfg.label}</strong> wechseln.<br><br>Ich frage kurz die KI ob das sinnvoll ist...`;
  document.getElementById('phaseModal').style.display = 'flex';
  document.getElementById('aiPhaseLoading').style.display = 'block';
  document.getElementById('aiPhaseResponse').style.display = 'none';

  try {
    const res = await fetch(apiEndpoint(), {
      method:'POST',
      headers: apiHeaders(),
      body: JSON.stringify({
        model:ADVISOR_MODEL,
        max_tokens:200,
        messages:[{ role:'user', content:
          `Nutzerprofil: ${userProfile.name}, ${userProfile.age} Jahre, ${userProfile.goal}, Training: ${userProfile.training}.
Aktuell: ${curCfg.label}. Möchte wechseln zu: ${cfg.label}.
Gib eine kurze ehrliche Einschätzung (2-3 Sätze) ob dieser Wechsel jetzt sinnvoll ist. Frage auch kurz nach dem Grund. Deutsch, direkt.` }]
      })
    });
    const data = await res.json();
    const txt = data.content?.[0]?.text || '';
    document.getElementById('aiPhaseLoading').style.display = 'none';
    document.getElementById('aiPhaseResponse').style.display = 'block';
    document.getElementById('aiPhaseResponse').innerHTML = txt.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  } catch(e) {
    document.getElementById('aiPhaseLoading').style.display = 'none';
    document.getElementById('aiPhaseResponse').style.display = 'block';
    document.getElementById('aiPhaseResponse').textContent = 'KI nicht erreichbar – du kannst trotzdem wechseln.';
  }
}

function confirmPhaseChange(){
  if(!pendingPhase) return;
  currentPhase = pendingPhase;
  pendingPhase = null;
  savePhase();
  document.getElementById('phaseModal').style.display = 'none';
  applyPhaseUI();
  generateMealSuggestion();
}

function cancelPhaseChange(){
  pendingPhase = null;
  document.getElementById('phaseModal').style.display = 'none';
}

async function generateMealSuggestion(){
  const cfg = PHASE_CONFIG[currentPhase];
  const memories = (userProfile.memories||[]).slice(0,5).map(m=>m.text).join(', ');
  try {
    const res = await fetch(apiEndpoint(), {
      method:'POST', headers: apiHeaders(),
      body: JSON.stringify({
        model:ADVISOR_MODEL, max_tokens:200,
        messages:[{ role:'user', content:
          `Erstelle 2-3 konkrete Mahlzeiten-Empfehlungen für ${userProfile.name} (${cfg.label}, Ziel: ${cfg.kcalBase.schule} kcal, ${cfg.proteinG}g Protein).
Bekannte Vorlieben: Türkische Küche, isst gerne Hähnchen/Reis/Eier/Joghurt/Avocado.
Gesprächsnotizen: ${memories || 'keine'}.
Kurz und konkret. Deutsch.` }]
      })
    });
    const data = await res.json();
    const txt = data.content?.[0]?.text || '';
    document.getElementById('mealSuggestionText').innerHTML = txt.replace(/\n/g,'<br>');
    document.getElementById('mealSuggestionBanner').style.display = 'block';
  } catch(e){}
}

// ═══════════════════════════════════════════
// TRAINING LOGGER
// ═══════════════════════════════════════════
// trainingLog: { 'YYYY-WW': { exerciseId: [{sets:[{reps,weight}], note, date}] } }
let trainingLog = {};
let logWeek = 'current'; // 'current' | 'last'
let expandedExId = null; // Accordion: welche Übungskarte ist aufgeklappt

// Einheiten-Modi pro Übung (ex.unit, Default 'kg'). b = zweites Feld, bStep = ±-Schrittweite.
const EX_UNITS = {
  kg:  { label:'Wdh × kg',  a:'Wdh', b:'kg',  aStep:1, bStep:2.5 },
  sek: { label:'Wdh × Sek', a:'Wdh', b:'Sek', aStep:1, bStep:5 },
  min: { label:'Wdh × Min', a:'Wdh', b:'Min', aStep:1, bStep:1 },
  zeit:{ label:'Nur Zeit',  a:null,  b:'Sek', aStep:0, bStep:15 },
};
function exUnit(ex){ return EX_UNITS[ex.unit] ? ex.unit : 'kg'; }

function getWeekKey(offset=0){
  const d = new Date();
  d.setDate(d.getDate() - offset*7);
  return `${d.getFullYear()}-W${String(getISOWeek(d)).padStart(2,'0')}`;
}

function loadTrainingLog(){
  try{ const d=localStorage.getItem('baran_training_log'); if(d) trainingLog=JSON.parse(d); }catch(e){}
}
function saveTrainingLog(){
  try{ localStorage.setItem('baran_training_log', JSON.stringify(trainingLog)); }catch(e){}
}

// ── Training-Tag erledigt (pro ISO-Woche, pro Split-Tag mo/di/mi/fr/sa) ──
// trainingDone: { 'YYYY-WW': { mo:{done,ts,source}, di:{...}, mi:{...}, fr:{...}, sa:{...} } }
let trainingDone = {};
function loadTrainingDone(){ try{ const d=localStorage.getItem('baran_training_done'); if(d) trainingDone=JSON.parse(d); }catch(e){} }
function saveTrainingDone(){ try{ localStorage.setItem('baran_training_done', JSON.stringify(trainingDone)); }catch(e){} }

// JS getDay(): 1=Mo,2=Di,3=Mi,5=Fr,6=Sa → Split-Key, sonst null (Ruhetag: Do+So)
function getTodaySplitKey(){ return ({1:'mo',2:'di',3:'mi',5:'fr',6:'sa'})[new Date().getDay()] || null; }

function isDayDone(dayKey, wk){ wk=wk||getWeekKey(0); return !!(trainingDone[wk] && trainingDone[wk][dayKey] && trainingDone[wk][dayKey].done); }

// Markiert einen Split-Tag dieser Woche als erledigt. Gibt true zurück, wenn neu gesetzt.
function setDayDone(dayKey, source){
  if(!dayKey) return false;
  const wk = getWeekKey(0);
  if(!trainingDone[wk]) trainingDone[wk] = {};
  if(trainingDone[wk][dayKey] && trainingDone[wk][dayKey].done){ syncTrainingHabit(); return false; }
  trainingDone[wk][dayKey] = { done:true, ts:Date.now(), source: source||'manual' };
  saveTrainingDone();
  syncTrainingHabit();
  return true;
}

// Koppelt das "Training"-Habit an den Erledigt-Status (heutiger Split, sonst egal welcher Tag heute erledigt wurde)
function syncTrainingHabit(){
  const wk = getWeekKey(0);
  const today = getTodaySplitKey();
  // an Trainingstagen: Habit = ob heutiger Split erledigt. An Ruhetagen: nicht automatisch abhaken.
  if(today) setHabitAuto('training', isDayDone(today, wk));
}

function setLogWeek(w, el){
  logWeek = w;
  document.querySelectorAll('.week-log-btn').forEach(b=>{
    const isActive = b.dataset.week === w;
    b.style.background = isActive ? 'var(--surface2)' : 'none';
    b.style.borderColor = isActive ? 'var(--rule-strong)' : 'var(--rule)';
    b.style.color = isActive ? 'var(--ink)' : 'var(--muted)';
  });
  renderExercises();
}

function getExerciseLogForWeek(exId, weekOffset=0){
  const key = getWeekKey(weekOffset);
  return trainingLog[key]?.[exId] || null;
}

function renderExercises(){
  const list = document.getElementById('exerciseList');
  if(!list) return;
  const weekOffset = logWeek === 'last' ? 1 : 0;
  const weekLabel = logWeek === 'last' ? 'Letzte Woche' : 'Diese Woche';

  const card = (ex) => {
    const i = exercises.indexOf(ex);
    const logEntry = getExerciseLogForWeek(ex.id, weekOffset);
    const lastWeekEntry = getExerciseLogForWeek(ex.id, 1);
    const logSummary = exSummary(ex, weekOffset);
    let progressBadge = '';
    if(logEntry && weekOffset===0 && lastWeekEntry){
      const totalReps = logEntry.sets.reduce((s,set)=>s+Number(set.reps||0),0);
      const lastReps = lastWeekEntry.sets.reduce((s,set)=>s+Number(set.reps||0),0);
      if(totalReps > lastReps) progressBadge = '<span class="log-badge pr-badge">+PR</span>';
      else if(totalReps >= lastReps) progressBadge = '<span class="log-badge">&#x2713;</span>';
    }
    const isOpen = !editMode && expandedExId === ex.id;
    return `
    <div class="training-card${isOpen?' expanded':''}" data-exid="${ex.id}" style="${editMode?'border-color:var(--rule-strong);':''}">
      <div class="tc-head" onclick="${editMode?`openEditModal('${ex.id}')`:`toggleExercise('${ex.id}')`}">
      ${editMode ? `<div style="display:flex;flex-direction:column;gap:4px;margin-right:4px;">
        <button onclick="event.stopPropagation();moveEx('${ex.id}',-1)" style="background:var(--surface2);border:1px solid var(--rule);border-radius:6px;width:26px;height:26px;color:var(--muted);cursor:pointer;font-size:13px;line-height:1;" ${i===0?'disabled':''}>&#x2191;</button>
        <button onclick="event.stopPropagation();moveEx('${ex.id}',1)" style="background:var(--surface2);border:1px solid var(--rule);border-radius:6px;width:26px;height:26px;color:var(--muted);cursor:pointer;font-size:13px;line-height:1;" ${i===exercises.length-1?'disabled':''}>&#x2193;</button>
      </div>` : ''}
      <div class="training-muscle" data-day="${ex.day||''}">${ex.detail}</div>
      <div class="training-info">
        <div class="training-name">${ex.name}${progressBadge}</div>
        <div class="training-log-line" style="font-size:13px;margin-top:3px;color:${logSummary?'var(--ok)':'var(--muted)'};">${logSummary ? `&#x2713; ${weekLabel}: ${logSummary}` : `${weekLabel}: noch nicht geloggt`}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <div class="training-sets">${ex.sets} <span class="training-reps-inline">× ${ex.reps}</span></div>
        ${!editMode ? `<span class="tc-chevron"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>` : `<div style="font-size:15px;color:var(--ink-muted);">&#x203A;</div>`}
      </div>
      </div>
      ${isOpen ? buildExpand(ex) : ''}
    </div>`;
  };

  const DAYS = (typeof TRAINING_DAYS!=='undefined') ? TRAINING_DAYS : [];
  let html = '';
  DAYS.forEach(d => {
    const dayEx = exercises.filter(e => e.day === d.key);
    if(!dayEx.length) return;
    const dayDone = isDayDone(d.key);
    const isToday = getTodaySplitKey() === d.key;
    const doneBtn = `<button onclick="toggleDayDone('${d.key}')" title="Training für diesen Tag als erledigt markieren" style="border-radius:999px;padding:6px 12px;font-family:'IBM Plex Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0;${dayDone?'background:var(--ok);border:1px solid var(--ok);color:var(--bg);':'background:var(--surface2);border:1px solid var(--rule-strong);color:var(--muted);'}">${dayDone?'✓ Erledigt':'○ Erledigt'}</button>`;
    html += `<div class="training-day-header"><div class="tdh-left"><span class="tdh-day" data-day="${d.key}">${d.day}${isToday?' <span style="font-size:10px;color:var(--accent);font-weight:700;letter-spacing:0.06em;">HEUTE</span>':''}</span><span class="tdh-split">${d.split}</span></div><div style="display:flex;align-items:center;gap:10px;">${doneBtn}</div></div>`;
    html += dayEx.map(card).join('');
  });
  const others = exercises.filter(e => !DAYS.some(d => d.key === e.day));
  if(others.length){
    html += `<div class="training-day-header"><div class="tdh-left"><span class="tdh-day">Weitere Übungen</span></div></div>`;
    html += others.map(card).join('');
  }
  list.innerHTML = html;
  list.querySelectorAll('.set-row').forEach(attachSwipe);

  // Show progression hint if this week has data
  showProgressionHint();
}

async function showProgressionHint(){
  const thisWeek = getWeekKey(0);
  const lastWeek = getWeekKey(1);
  const thisData = trainingLog[thisWeek];
  const lastData = trainingLog[lastWeek];
  const hint = document.getElementById('progressionHint');
  if(!hint) return;

  if(!lastData){ hint.style.display='none'; return; }

  // Build comparison
  const lines = exercises.map(ex => {
    const cur = thisData?.[ex.id];
    const prev = lastData?.[ex.id];
    if(!prev) return null;
    const prevReps = prev.sets.reduce((s,set)=>s+Number(set.reps||0),0);
    const curReps = cur ? cur.sets.reduce((s,set)=>s+Number(set.reps||0),0) : null;
    if(curReps===null) return `${ex.name}: Ziel ${prevReps+1}+ Wdh (letzte Woche: ${prevReps})`;
    const diff = curReps - prevReps;
    return `${ex.name}: ${curReps} Wdh ${diff>0?'<span style="color:var(--green)">+'+diff+'</span>':diff<0?'<span style="color:var(--red)">'+diff+'</span>':'= gleich'} (letzte: ${prevReps})`;
  }).filter(Boolean);

  if(lines.length === 0){ hint.style.display='none'; return; }
  hint.style.display = 'block';
  document.getElementById('progressionHintText').innerHTML = lines.join('<br>');
}

// ═══════════════════════════════════════════
// INLINE-LOGGER: Accordion statt Modal.
// Speichert live bei jeder Eingabe – kein "Speichern"-Button nötig.
// ═══════════════════════════════════════════
function toggleExercise(exId){
  if(editMode) return;
  expandedExId = (expandedExId === exId) ? null : exId;
  renderExercises();
}

function setExUnit(exId, unit){
  const ex = exercises.find(e=>e.id===exId);
  if(!ex || !EX_UNITS[unit]) return;
  ex.unit = unit;
  saveExercises();
  renderExercises();
}

// Eine Satz-Zeile: [Nr] [− Wdh +] × [− kg/Sek/Min +] [✓]  (+ Delete hinter Swipe)
function buildSetRow(ex, idx, val, ghost){
  const u = EX_UNITS[exUnit(ex)];
  const hasA = !!u.a;
  const vA = val && Number(val.reps) > 0 ? val.reps : '';
  const vB = val && Number(val.weight) > 0 ? val.weight : '';
  const gA = ghost && Number(ghost.reps) > 0 ? ghost.reps : '';
  const gB = ghost && Number(ghost.weight) > 0 ? ghost.weight : '';
  const logged = hasA ? vA !== '' : vB !== '';
  const stepper = (field, step, value, ghostVal, unitLbl) => `
    <div class="set-stepper">
      <button class="step-btn" onclick="stepSet(this,-${step},'${ex.id}')" aria-label="${unitLbl} verringern">−</button>
      <div class="set-field">
        <input class="set-input" type="number" inputmode="decimal" min="0" data-field="${field}"
          value="${value}" placeholder="${ghostVal !== '' ? ghostVal : '0'}" oninput="saveInline('${ex.id}')">
        <span class="set-unit">${unitLbl}</span>
      </div>
      <button class="step-btn" onclick="stepSet(this,${step},'${ex.id}')" aria-label="${unitLbl} erhöhen">+</button>
    </div>`;
  return `
  <div class="set-row${logged ? ' logged' : ''}">
    <button class="set-del" onclick="deleteSetRow(this,'${ex.id}')" aria-label="Satz löschen"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
    <div class="set-row-inner">
      <span class="set-num mono">${idx + 1}</span>
      ${hasA ? stepper('reps', u.aStep, vA, gA, u.a) : ''}
      ${hasA ? '<span class="set-x">×</span>' : ''}
      ${stepper('weight', u.bStep, vB, gB, u.b)}
      <button class="set-check" onclick="adoptSet(this,'${ex.id}')" aria-label="Satz übernehmen"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></button>
    </div>
  </div>`;
}

// Aufgeklappter Karten-Teil: Einheiten-Switcher + Satz-Zeilen + Fußzeile
function buildExpand(ex){
  const weekOffset = logWeek === 'last' ? 1 : 0;
  const logEntry = getExerciseLogForWeek(ex.id, weekOffset);
  const lastEntry = getExerciseLogForWeek(ex.id, 1);
  const unit = exUnit(ex);
  const count = logEntry ? logEntry.sets.length : (lastEntry ? lastEntry.sets.length : ex.sets);
  let rows = '';
  for(let i = 0; i < count; i++){
    rows += buildSetRow(ex, i, logEntry ? logEntry.sets[i] : null,
      weekOffset === 0 && lastEntry ? lastEntry.sets[i] : null);
  }
  const seg = Object.keys(EX_UNITS).map(k =>
    `<button class="${k === unit ? 'active' : ''}" onclick="setExUnit('${ex.id}','${k}')">${EX_UNITS[k].label}</button>`).join('');
  const hint = (weekOffset === 0 && lastEntry)
    ? `<div class="ex-ghost-hint">Grau = letzte Woche · ✓ übernimmt den Wert direkt</div>` : '';
  const note = (logEntry && logEntry.note) ? logEntry.note.replace(/"/g, '&quot;') : '';
  return `
  <div class="ex-expand" onclick="event.stopPropagation()">
    <div class="unit-seg">${seg}</div>
    ${hint}
    <div class="set-rows" id="rows-${ex.id}">${rows}</div>
    <div class="ex-expand-foot">
      <button class="add-set-btn" onclick="addInlineSet('${ex.id}')">+ Satz</button>
      <input class="ex-note-input" id="note-${ex.id}" placeholder="Notiz…" value="${note}" oninput="saveInline('${ex.id}')">
    </div>
  </div>`;
}

function rowValues(row){
  const a = row.querySelector('input[data-field="reps"]');
  const b = row.querySelector('input[data-field="weight"]');
  return { reps: a ? (parseFloat(a.value) || 0) : 0, weight: b ? (parseFloat(b.value) || 0) : 0 };
}

// Live-Save: liest alle Zeilen der Übung und schreibt sie ins Log. Kein Re-Render → Fokus bleibt.
function saveInline(exId){
  const wrap = document.getElementById('rows-' + exId);
  if(!wrap) return;
  const ex = exercises.find(e => e.id === exId);
  if(!ex) return;
  const hasA = !!EX_UNITS[exUnit(ex)].a;
  const sets = Array.from(wrap.querySelectorAll('.set-row')).map(rowValues)
    .filter(s => hasA ? s.reps > 0 : s.weight > 0);
  const weekKey = logWeek === 'last' ? getWeekKey(1) : getWeekKey(0);
  if(sets.length === 0){
    if(trainingLog[weekKey]) delete trainingLog[weekKey][exId];
  } else {
    if(!trainingLog[weekKey]) trainingLog[weekKey] = {};
    const noteEl = document.getElementById('note-' + exId);
    trainingLog[weekKey][exId] = { sets, note: noteEl ? noteEl.value : '', date: new Date().toLocaleDateString('de-DE') };
    if(logWeek !== 'last' && typeof TRAINING_DAYS !== 'undefined' && TRAINING_DAYS.some(d => d.key === ex.day)) setDayDone(ex.day, 'auto');
  }
  saveTrainingLog();
  wrap.querySelectorAll('.set-row').forEach(r => {
    const v = rowValues(r);
    r.classList.toggle('logged', hasA ? v.reps > 0 : v.weight > 0);
  });
  updateCardSummary(exId);
}

// ± Buttons: leerer Input startet beim Ghost-Wert (letzte Woche), sonst bei 0
function stepSet(btn, delta, exId){
  const inp = btn.parentElement.querySelector('.set-input');
  let v = parseFloat(inp.value);
  if(isNaN(v)) v = parseFloat(inp.placeholder) || 0;
  v = Math.max(0, Math.round((v + delta) * 10) / 10);
  inp.value = v;
  saveInline(exId);
}

// Grünes Häkchen: übernimmt Ghost-Werte ohne Tastatur
function adoptSet(btn, exId){
  const row = btn.closest('.set-row');
  row.querySelectorAll('.set-input').forEach(inp => {
    if(!inp.value && parseFloat(inp.placeholder) > 0) inp.value = inp.placeholder;
  });
  saveInline(exId);
  btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
  if(navigator.vibrate) navigator.vibrate(15);
}

function addInlineSet(exId){
  const ex = exercises.find(e => e.id === exId);
  const wrap = document.getElementById('rows-' + exId);
  if(!ex || !wrap) return;
  const idx = wrap.children.length;
  const lastEntry = getExerciseLogForWeek(exId, 1);
  const ghost = (logWeek !== 'last' && lastEntry) ? lastEntry.sets[idx] : null;
  wrap.insertAdjacentHTML('beforeend', buildSetRow(ex, idx, null, ghost || null));
  attachSwipe(wrap.lastElementChild);
}

function deleteSetRow(btn, exId){
  const row = btn.closest('.set-row');
  const wrap = row.parentElement;
  row.remove();
  Array.from(wrap.children).forEach((r, i) => {
    const num = r.querySelector('.set-num');
    if(num) num.textContent = i + 1;
  });
  saveInline(exId);
}

// Swipe-to-Delete: Zeile nach links ziehen legt den Lösch-Button frei
function attachSwipe(row){
  const inner = row.querySelector('.set-row-inner');
  if(!inner) return;
  let x0 = null, dx = 0, open = false;
  row.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive:true});
  row.addEventListener('touchmove', e => {
    if(x0 === null) return;
    dx = Math.max(-72, Math.min(0, e.touches[0].clientX - x0 + (open ? -58 : 0)));
    inner.style.transform = 'translateX(' + dx + 'px)';
  }, {passive:true});
  row.addEventListener('touchend', () => {
    open = dx < -40;
    inner.style.transform = open ? 'translateX(-58px)' : '';
    row.classList.toggle('swiped', open);
    x0 = null; dx = 0;
  });
}

// Karten-Statuszeile live nachziehen (ohne Re-Render, Fokus bleibt im Input)
function updateCardSummary(exId){
  const ex = exercises.find(e => e.id === exId);
  const el = document.querySelector('.training-card[data-exid="' + exId + '"] .training-log-line');
  if(!ex || !el) return;
  const weekOffset = logWeek === 'last' ? 1 : 0;
  const weekLabel = logWeek === 'last' ? 'Letzte Woche' : 'Diese Woche';
  const s = exSummary(ex, weekOffset);
  if(s){ el.innerHTML = '&#x2713; ' + weekLabel + ': ' + s; el.style.color = 'var(--ok)'; }
  else { el.textContent = weekLabel + ': noch nicht geloggt'; el.style.color = 'var(--muted)'; }
}

// Einheiten-bewusste Zusammenfassung ("3 Sätze · 24 Wdh · 70kg" / "4 Sätze · 180 Sek")
function exSummary(ex, weekOffset){
  const logEntry = getExerciseLogForWeek(ex.id, weekOffset);
  if(!logEntry || !logEntry.sets.length) return '';
  const u = EX_UNITS[exUnit(ex)];
  const n = logEntry.sets.length;
  const satz = n === 1 ? '1 Satz' : n + ' Sätze';
  const totalReps = logEntry.sets.reduce((s, set) => s + Number(set.reps || 0), 0);
  const maxB = Math.max(...logEntry.sets.map(s => Number(s.weight || 0)));
  if(!u.a) return satz + ' · ' + logEntry.sets.reduce((s, set) => s + Number(set.weight || 0), 0) + ' ' + u.b;
  return satz + ' · ' + totalReps + ' Wdh' + (maxB > 0 ? ' · ' + maxB + u.b.toLowerCase() : '');
}

// Tag-Button im Training-Tab: ein-/austoggeln. Manuelles Abhaken triggert eine Coach-Reaktion.
function toggleDayDone(dayKey){
  const wk = getWeekKey(0);
  if(isDayDone(dayKey)){
    if(trainingDone[wk]) delete trainingDone[wk][dayKey];
    saveTrainingDone();
    syncTrainingHabit();
    renderExercises();
    return;
  }
  setDayDone(dayKey,'manual');
  renderExercises();
  notifyCoachTrainingDone(dayKey);
}

document.getElementById('phaseModal').addEventListener('click', function(e){ if(e.target===this) cancelPhaseChange(); });


// ═══════════════════════════════════════════
// HABIT-SCORE (läuft automatisch über setHabitAuto – der Check-Tab ist Geschichte)
// ═══════════════════════════════════════════
function calcScore(){
  const vals=HABITS.map(h=>habitStatus[h.id]);
  const scored=vals.filter(v=>v!==null&&v!==undefined);
  if(scored.length===0) return null;
  const pts=scored.reduce((s,v)=>s+(v==='done'?100:v==='partial'?50:0),0);
  return Math.round(pts/HABITS.length);
}

// ═══════════════════════════════════════════
// WEEKLY REVIEW (Sonntags-Ritual)
// ═══════════════════════════════════════════
async function startWeeklyReview(){
  // Switch to AI tab
  const aiBtn = document.querySelector('[data-page="ai"]');
  showPage('ai', aiBtn);

  const weekKey = getWeekKey(0);
  const lastWeekKey = getWeekKey(1);
  const thisWeekLog = trainingLog[weekKey] || {};
  const lastWeekLog = trainingLog[lastWeekKey] || {};

  // Build week summary
  const trainingSummary = exercises.map(ex => {
    const cur = thisWeekLog[ex.id];
    const prev = lastWeekLog[ex.id];
    if(!cur && !prev) return null;
    const curReps = cur ? cur.sets.reduce((s,x)=>s+x.reps,0) : 0;
    const prevReps = prev ? prev.sets.reduce((s,x)=>s+x.reps,0) : 0;
    return `${ex.name}: ${curReps} Wdh diese Woche${prevReps>0?' (letzte: '+prevReps+')':''}`;
  }).filter(Boolean).join('\n');

  // Habit scores this week
  const weekScore = weekHistory.map(d=>`${d.day}: ${d.score!==null?d.score+'%':'kein Eintrag'}`).join(', ');

  appendMsg('assistant', formatAIMessage('🗓️ **Wöchentlicher Review startet!**\n\nIch schaue mir deine Woche an und wir gehen das zusammen durch. Einen Moment...'));
  document.getElementById('aiLoading').style.display = 'block';

  try {
    const res = await fetch(apiEndpoint(), {
      method:'POST', headers: apiHeaders(),
      body: JSON.stringify({
        model:ADVISOR_MODEL, max_tokens:600,
        system: buildSystemBlocks(),
        messages: buildApiMessages(
          `Starte den wöchentlichen Review. Hier sind meine Daten:

TRAINING DIESE WOCHE:
${trainingSummary || 'Keine Trainingsdaten eingetragen'}

HABIT-SCORES:
${weekScore}

Führe mich durch den Review. Fang mit dem Bereich an wo ich mich am meisten verbessert habe. Dann was nicht so gut lief. Stelle dann eine konkrete Frage für den nächsten Bereich. Geh Schritt für Schritt vor – nicht alles auf einmal.`)
      })
    });
    const data = await res.json();
    document.getElementById('aiLoading').style.display = 'none';
    const txt = data.content?.[0]?.text || '';
    chatHistory.push({role:'user', content:'[Wöchentlicher Review gestartet]'});
    chatHistory.push({role:'assistant', content: txt});
    saveChatHistory();
    appendMsg('assistant', formatAIMessage(txt));
  } catch(e) {
    document.getElementById('aiLoading').style.display = 'none';
    appendMsg('assistant', formatAIMessage('Verbindungsfehler beim Review. Nochmal versuchen.'));
  }
}

// ═══════════════════════════════════════════
// PHASE 3A: GOAL TRACKER
// ═══════════════════════════════════════════
const GOAL_COLORS = { health:'var(--over)', money:'var(--ok)', skill:'var(--info)', life:'var(--accent)' };

let goals = [];
let newGoalCat = 'health';

// Pre-filled goals for Baran
const BARAN_DEFAULT_GOALS = [
  { id:'g1', cat:'skill',   title:'Führerschein Theorie',      current:46,   target:100,   unit:'%',   deadline:'2026-07-01' },
  { id:'g2', cat:'money',   title:'Barcelona Startkapital',    current:0,    target:30000, unit:'€',   deadline:'2030-01-01' },
  { id:'g3', cat:'health',  title:'Körpergewicht Massephase',  current:88.4, target:95,    unit:'kg',  deadline:'2026-12-31' },
  // Training goals
  { id:'g4', cat:'skill',   title:'Klimmzüge (Ziel-Wdh)',      current:8,    target:15,    unit:'Wdh', deadline:'2026-12-31' },
  { id:'g5', cat:'skill',   title:'Dips (Ziel-Wdh)',           current:6,    target:15,    unit:'Wdh', deadline:'2026-12-31' },
  { id:'g6', cat:'skill',   title:'Bulgarian Split Squats',    current:12,   target:20,    unit:'Wdh', deadline:'2026-12-31' },
  { id:'g7', cat:'health',  title:'Protein Tagesziel',         current:0,    target:170,   unit:'g',   deadline:null },
];

function loadGoals(){
  try{
    const d = localStorage.getItem('baran_goals');
    const v = localStorage.getItem('baran_goals_v');
    if(d && v === '2') {
      goals = JSON.parse(d);
    } else {
      // v2: includes training goals – reset to new defaults
      goals = JSON.parse(JSON.stringify(BARAN_DEFAULT_GOALS));
      saveGoals();
      localStorage.setItem('baran_goals_v','2');
    }
  }catch(e){ goals = JSON.parse(JSON.stringify(BARAN_DEFAULT_GOALS)); }
}
function saveGoals(){ try{ localStorage.setItem('baran_goals', JSON.stringify(goals)); }catch(e){} }

function renderGoals(){
  const el = document.getElementById('goalsList');
  if(!el) return;
  if(goals.length === 0){
    el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);font-size:12px;">Noch keine Ziele. Tippe unten auf + um anzufangen.</div>';
    return;
  }
  el.innerHTML = goals.map((g,i) => {
    const pct = Math.min(Math.round((g.current/g.target)*100), 100);
    const color = GOAL_COLORS[g.cat] || 'var(--accent)';
    const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline)-new Date())/(1000*60*60*24)) : null;
    const deadlineStr = daysLeft !== null ? (daysLeft > 0 ? `Noch ${daysLeft} Tage` : 'Abgelaufen') : '';
    return `
    <div class="goal-card stagger-in" data-cat="${g.cat}" id="gc-${g.id}" style="animation-delay:${i*0.05}s">
      <div class="goal-top">
        <div style="flex:1;">
          <div class="goal-title-row"><span class="goal-dot"></span><span class="goal-name">${g.title}</span></div>
          <div class="goal-deadline">${deadlineStr}</div>
        </div>
        <div class="goal-pct">${pct}%</div>
      </div>
      <div class="goal-progress-bar"><div class="goal-progress-fill" style="width:${pct}%;background:${color};"></div></div>
      <div class="goal-values"><span style="color:var(--ink);">${g.current} ${g.unit}</span><span>Ziel: ${g.target} ${g.unit}</span></div>
      <div class="goal-actions">
        <button class="goal-update-btn" onclick="updateGoalValue('${g.id}')">Aktualisieren</button>
        <button class="goal-del-btn" onclick="showDeleteConfirm('${g.id}')" aria-label="Ziel löschen"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>
      <div id="del-confirm-${g.id}" style="display:none;margin-top:10px;background:var(--surface2);border:1px solid var(--rule);border-radius:8px;padding:10px;">
        <div style="font-size:13px;color:var(--muted);margin-bottom:8px;">Ziel wirklich löschen?</div>
        <div style="display:flex;gap:6px;">
          <button onclick="deleteGoal('${g.id}')" style="flex:1;background:none;border:1px solid var(--over);border-radius:8px;padding:9px;font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:500;color:var(--over);cursor:pointer;">Ja, löschen</button>
          <button onclick="hideDeleteConfirm('${g.id}')" style="flex:1;background:var(--surface2);border:1px solid var(--rule);border-radius:8px;padding:9px;font-size:13px;color:var(--muted);cursor:pointer;">Abbrechen</button>
        </div>
      </div>
    </div>`;
  }).join('');
}


async function updateGoalValue(id){
  const g = goals.find(x=>x.id===id);
  if(!g) return;
  const n = await askNumber(g.title, g.current, g.unit);
  if(n === null) return;
  g.current = n;
  saveGoals(); renderGoals();
}
function showDeleteConfirm(id){
  document.querySelectorAll('[id^="del-confirm-"]').forEach(el => el.style.display='none');
  const el = document.getElementById('del-confirm-'+id);
  if(el) el.style.display = 'block';
}
function hideDeleteConfirm(id){
  const el = document.getElementById('del-confirm-'+id);
  if(el) el.style.display = 'none';
}

function openAddGoal(){
  newGoalCat = 'health';
  document.getElementById('goalTitle').value = '';
  document.getElementById('goalCurrent').value = '';
  document.getElementById('goalTarget').value = '';
  document.getElementById('goalUnit').value = '';
  document.getElementById('goalDeadline').value = '';
  document.getElementById('addGoalModal').style.display = 'flex';
}
function closeAddGoal(){ document.getElementById('addGoalModal').style.display = 'none'; }

function selectGoalCat(cat, el){
  newGoalCat = cat;
  document.querySelectorAll('.goal-cat-btn').forEach(b => {
    b.style.borderColor = b.dataset.cat === cat ? 'var(--accent)' : 'var(--border)';
    b.style.background = 'var(--surface2)';
  });
}

function saveGoal(){
  const title = document.getElementById('goalTitle').value.trim();
  if(!title) return;
  const g = {
    id: 'g_'+Date.now(),
    cat: newGoalCat,
    title,
    current: parseFloat(document.getElementById('goalCurrent').value)||0,
    target:  parseFloat(document.getElementById('goalTarget').value)||100,
    unit:    document.getElementById('goalUnit').value.trim() || '',
    deadline: document.getElementById('goalDeadline').value || null,
  };
  goals.push(g);
  saveGoals(); closeAddGoal(); renderGoals();
}


function deleteGoal(id){
  goals = goals.filter(g=>g.id!==id);
  saveGoals(); renderGoals();
}

document.getElementById('addGoalModal').addEventListener('click', function(e){ if(e.target===this) closeAddGoal(); });

// ═══════════════════════════════════════════
// PHASE 3B: CALENDAR AWARENESS (Termine, Prüfungen, Feiertage)
// ═══════════════════════════════════════════
const EVENTS = [
  // Prüfungen & wichtige Termine
  { date:'2026-09-15', name:'Zwischenprüfung Rohrleitungsbau', type:'exam', note:'IHK-Zwischenprüfung – Lernblöcke einplanen!' },
  // Feiertage 2026 (Berlin)
  { date:'2026-01-01', name:'Neujahr', type:'de' },
  { date:'2026-04-03', name:'Karfreitag', type:'de' },
  { date:'2026-04-06', name:'Ostermontag', type:'de' },
  { date:'2026-05-01', name:'Tag der Arbeit', type:'de' },
  { date:'2026-05-14', name:'Christi Himmelfahrt', type:'de' },
  { date:'2026-05-25', name:'Pfingstmontag', type:'de' },
  { date:'2026-10-03', name:'Tag der Deutschen Einheit', type:'de' },
  { date:'2026-12-25', name:'1. Weihnachtstag', type:'de' },
  { date:'2026-12-26', name:'2. Weihnachtstag', type:'de' },
  // Feiertage 2027 (Berlin)
  { date:'2027-01-01', name:'Neujahr', type:'de' },
  { date:'2027-03-08', name:'Frauentag (Berlin)', type:'de' },
  { date:'2027-03-26', name:'Karfreitag', type:'de' },
  { date:'2027-03-29', name:'Ostermontag', type:'de' },
  { date:'2027-05-01', name:'Tag der Arbeit', type:'de' },
  { date:'2027-05-06', name:'Christi Himmelfahrt', type:'de' },
  { date:'2027-05-17', name:'Pfingstmontag', type:'de' },
  { date:'2027-10-03', name:'Tag der Deutschen Einheit', type:'de' },
  { date:'2027-12-25', name:'1. Weihnachtstag', type:'de' },
  { date:'2027-12-26', name:'2. Weihnachtstag', type:'de' },
  // Turkish / cultural
  { date:'2026-03-20', name:'Nawruz (Frühlingsfest)', type:'tr' },
  { date:'2026-04-23', name:'Nationales Kinderfest (TR)', type:'tr' },
  { date:'2026-08-30', name:'Tag des Sieges (TR)', type:'tr' },
  { date:'2026-10-29', name:'Tag der Republik (TR)', type:'tr' },
  { date:'2027-04-23', name:'Nationales Kinderfest (TR)', type:'tr' },
  { date:'2027-08-30', name:'Tag des Sieges (TR)', type:'tr' },
  { date:'2027-10-29', name:'Tag der Republik (TR)', type:'tr' },
  // Ramadan (Mondkalender – ungefähre Termine)
  { date:'2026-02-17', name:'Ramadan Beginn 2026', type:'tr', note:'Fastenmonat beginnt' },
  { date:'2026-03-19', name:'Eid al-Fitr (Zuckerfest)', type:'tr' },
  { date:'2026-05-27', name:'Eid al-Adha (Opferfest)', type:'tr' },
  { date:'2027-02-08', name:'Ramadan Beginn 2027', type:'tr', note:'ungefähr – Mondkalender' },
  { date:'2027-03-09', name:'Eid al-Fitr (Zuckerfest)', type:'tr', note:'ungefähr' },
  { date:'2027-05-16', name:'Eid al-Adha (Opferfest)', type:'tr', note:'ungefähr' },
];

function renderHolidays(){
  const el = document.getElementById('holidayList');
  if(!el) return;
  const today = new Date();
  const upcoming = EVENTS
    .map(h => ({ ...h, dateObj: new Date(h.date) }))
    .filter(h => h.dateObj >= today)
    .sort((a,b) => a.dateObj - b.dateObj)
    .slice(0, 8);

  el.innerHTML = upcoming.map(h => {
    const daysLeft = Math.ceil((h.dateObj - today)/(1000*60*60*24));
    const flag = h.type === 'tr' ? '🇹🇷' : h.type === 'exam' ? '🎓' : '🇩🇪';
    return `<div class="holiday-item"${h.type==='exam'?' style="border-color:var(--accent);"':''}>
      <div class="holiday-date">${h.dateObj.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</div>
      <div><div class="holiday-name">${flag} ${h.name}${h.note?'<br><span style="font-size:10px;color:var(--muted);">'+h.note+'</span>':''}</div><div class="holiday-days">in ${daysLeft} Tag${daysLeft!==1?'en':''}</div></div>
    </div>`;
  }).join('');
}

function checkUpcomingHoliday(){
  const today = new Date();
  // Prüfungen 14 Tage vorher ankündigen, Feiertage 3 Tage vorher
  const soon = EVENTS
    .map(h => ({ ...h, d: new Date(h.date) }))
    .filter(h => {
      const days = (h.d - today)/(1000*60*60*24);
      return days >= 0 && days <= (h.type==='exam' ? 14 : 3);
    })
    .sort((a,b) => a.d - b.d)[0];
  if(!soon) return;
  const daysLeft = Math.ceil((soon.d-today)/(1000*60*60*24));
  const banner = document.getElementById('calendarBanner');
  const txt = document.getElementById('calendarBannerText');
  if(banner && txt){
    txt.textContent = `${soon.name} ist in ${daysLeft} Tag${daysLeft!==1?'en':''} (${soon.d.toLocaleDateString('de-DE')}). ${soon.note||'Denk daran dein Training und Essen anzupassen.'}`;
    banner.style.display = 'block';
  }
}

// ═══════════════════════════════════════════
// PHASE 3C: PUSH NOTIFICATIONS
// ═══════════════════════════════════════════
let notifPermission = 'default';

async function requestNotifications(){
  if(!('Notification' in window)){
    document.getElementById('notifBanner').style.display = 'none';
    return;
  }
  const perm = await Notification.requestPermission();
  notifPermission = perm;
  if(perm === 'granted'){
    // Banner sofort ausblenden
    document.getElementById('notifBanner').style.display = 'none';
    try{ localStorage.setItem('baran_notif_granted','1'); }catch(e){}
    scheduleNotifications();
    showNotif('Coach', `Hey ${userProfile.name||''}! Ich bin jetzt aktiv. Ich melde mich wenn du gebraucht wirst. 💪`);
  } else if(perm === 'denied'){
    document.getElementById('notifBanner').style.display = 'none';
  }
}

function updateNotifUI(){
  // Only hide banner if already granted
  const banner = document.getElementById('notifBanner');
  if(!banner) return;
  if(notifPermission === 'granted' || notifPermission === 'denied'){
    banner.style.display = 'none';
  }
}

function showNotif(title, body){
  if(notifPermission !== 'granted') return;
  try{ new Notification(title, { body, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAgMTgwIj4KICA8cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgcng9IjM2IiBmaWxsPSIjMGEwYTBmIi8+CiAgPHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHJ4PSIzNiIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC4xNSIvPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJnIiBjeD0iNTAlIiBjeT0iMzAlIiByPSI3MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZkMTY2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBhMGEwZiIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHRleHQgeD0iOTAiIHk9IjEyNSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwOCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI2ZmZDE2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QjwvdGV4dD4KPC9zdmc+' }); }catch(e){}
}

// ── Notification times (user-editable, saved to localStorage) ──
const DEFAULT_NOTIF_TIMES = {
  morgen:   { h:7,  m:0,  label:'Morgen-Check', enabled:true },
  mittag:   { h:13, m:0,  label:'Mittag-Check',  enabled:true },
  abend:    { h:19, m:0,  label:'Abend-Check',   enabled:true },
  essen:    { h:18, m:30, label:'Essen-Reminder', enabled:true },
  schlaf:   { h:22, m:0,  label:'Schlaf-Reminder',enabled:true },
  review:   { h:19, m:0,  label:'Sonntags-Review',enabled:true },
};
let notifTimes = {};

function loadNotifTimes(){
  try{
    const d = localStorage.getItem('baran_notif_times');
    notifTimes = d ? JSON.parse(d) : JSON.parse(JSON.stringify(DEFAULT_NOTIF_TIMES));
  }catch(e){ notifTimes = JSON.parse(JSON.stringify(DEFAULT_NOTIF_TIMES)); }
}
function saveNotifTimes(){ try{ localStorage.setItem('baran_notif_times', JSON.stringify(notifTimes)); }catch(e){} }

// Render editable notification times in goals page
function renderNotifSettings(){
  const container = document.getElementById('notifSettingsContainer');
  if(!container) return;
  if(notifPermission !== 'granted'){ container.style.display='none'; return; }
  container.style.display = 'block';
  container.innerHTML = `
    <div class="section-title" style="margin-top:0;">// Benachrichtigungs-Zeiten</div>
    ${Object.entries(notifTimes).map(([key, t]) => `
      <div style="display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-bottom:6px;">
        <div style="flex:1;font-size:12px;color:var(--text);">${t.label}</div>
        <input type="time" value="${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}"
          onchange="updateNotifTime('${key}',this.value)"
          style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:5px 8px;color:var(--accent);font-family:'Bricolage Grotesque',sans-serif;font-size:12px;font-weight:700;outline:none;width:80px;">
        <label style="display:flex;align-items:center;gap:5px;cursor:pointer;">
          <input type="checkbox" ${t.enabled?'checked':''} onchange="toggleNotifTime('${key}',this.checked)"
            style="width:15px;height:15px;cursor:pointer;accent-color:var(--green);">
          <span style="font-size:10px;color:var(--muted);">An</span>
        </label>
      </div>`).join('')}
  `;
}

function updateNotifTime(key, val){
  const [h,m] = val.split(':').map(Number);
  if(!notifTimes[key]) return;
  notifTimes[key].h = h;
  notifTimes[key].m = m;
  saveNotifTimes();
}
function toggleNotifTime(key, enabled){
  if(!notifTimes[key]) return;
  notifTimes[key].enabled = enabled;
  saveNotifTimes();
}

function scheduleNotifications(){
  loadNotifTimes();

  setInterval(()=>{
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const isSunday = now.getDay() === 0;
    const name = userProfile.name || '';

    // ── 3x tägliche Check-ins ──
    // Morgen-Check
    const mo = notifTimes.morgen;
    if(mo?.enabled && h===mo.h && m===mo.m){
      const todayKcal = todayLog.reduce((s,l)=>s+l.kcal,0);
      const msgs = [
        `Guten Morgen ${name}! Wie fühlst du dich heute? Denk an dein Frühstück 🥚`,
        `Morgen ${name}! Hast du gut geschlafen? Führerschein-App nicht vergessen heute.`,
        `Hey ${name}, neuer Tag – neuer Start. Was steht heute an?`,
      ];
      showNotif('Coach – Morgen ☀️', msgs[now.getDate()%msgs.length]);
    }

    // Mittag-Check
    const mi = notifTimes.mittag;
    if(mi?.enabled && h===mi.h && m===mi.m){
      const todayKcal = todayLog.reduce((s,l)=>s+l.kcal,0);
      const goal = getKcalGoal();
      if(todayKcal < goal * 0.3){
        // Hat wenig gegessen – nachfragen
        showNotif('Coach – Mittag 🕐', `${name}, hast du schon gefrühstückt? Ich sehe noch kaum Kalorien für heute.`);
      } else {
        showNotif('Coach – Mittag 🕐', `Halbzeit ${name}! Wie läuft der Tag so? Alles im Plan?`);
      }
    }

    // Abend-Check – KI fragt direkt (kein manueller Habit-Tracker mehr)
    const ab = notifTimes.abend;
    if(ab?.enabled && h===ab.h && m===ab.m && !isSunday){
      showNotif('Coach – Abend 🌆', `Hey ${name}, wie war der Tag? Kurz im KI-Tab updaten was du heute geschafft hast.`);
    }

    // Essen-Reminder – nur wenn zu wenig eingetragen
    const es = notifTimes.essen;
    if(es?.enabled && h===es.h && m===es.m){
      const kcalToday = todayLog.reduce((s,l)=>s+l.kcal,0);
      const goal = getKcalGoal();
      if(kcalToday < goal * 0.5){
        showNotif('Ernährung ⚠️', `${name}, du hast heute erst ${kcalToday} kcal eingetragen – Ziel: ${goal} kcal. Nicht vergessen!`);
      }
      // Wenn nichts eingetragen
      if(kcalToday === 0){
        showNotif('Hast du heute schon gegessen? 🥗', `Essen-Tab ist noch leer. Kurz eintragen was du heute gegessen hast.`);
      }
    }

    // Schlaf-Reminder
    const sl = notifTimes.schlaf;
    if(sl?.enabled && h===sl.h && m===sl.m && (mode==='baustelle'||mode==='lehrbauhof')){
      showNotif('Schlafenszeit 🌙', `${name}, morgen früh aufstehen. Handy weglegen und schlafen – Schlaf = Muskeln.`);
    }

    // Freitag Abend – Wochenend-Check
    const isFriday = now.getDay() === 5;
    if(isFriday && h===18 && m===0){
      showNotif('Coach – Wochenende', `Hey ${name}! Was steht dieses Wochenende an? Training geplant? Kurz im KI-Tab Bescheid geben.`);
    }

    // Sonntag Abend – neue Woche vorbereiten
    if(isSunday && h===20 && m===0){
      showNotif('Neue Woche', `${name}, morgen geht es wieder los. Schau kurz in den Plan fuer morgen.`);
    }

    // Sonntags-Review
    const rv = notifTimes.review;
    if(rv?.enabled && isSunday && h===rv.h && m===rv.m){
      showNotif('Wochen-Review 🗓️', `Hey ${name}! Zeit für den Wochen-Review. Öffne die App – wir gehen die Woche zusammen durch.`);
    }

  }, 60000);
}

function checkNotifPermission(){
  if(!('Notification' in window)) return;
  notifPermission = Notification.permission;
  updateNotifUI();
  if(notifPermission === 'granted'){
    loadNotifTimes();
    scheduleNotifications();
  }
}

// ═══════════════════════════════════════════
// API KEY MANAGEMENT
// ═══════════════════════════════════════════
function loadApiKey(){
  try{
    const k = localStorage.getItem('baran_api_key');
    if(k){ window.ANTHROPIC_KEY = k; }
  }catch(e){}
}

function saveApiKey(){
  const input = document.getElementById('apiKeyInput');
  const key = input?.value?.trim();
  if(!key || !key.startsWith('sk-ant-')){
    if(input) input.style.borderColor = 'var(--red)';
    return;
  }
  window.ANTHROPIC_KEY = key;
  try{ localStorage.setItem('baran_api_key', key); }catch(e){}
  // Hide banner
  document.getElementById('apiKeyBanner').style.display = 'none';
  // Welcome message
  appendMsg('assistant', formatAIMessage('API Key gespeichert! Ich bin jetzt bereit. Was ist heute los?'));
}

function checkApiKeyBanner(){
  const key = localStorage.getItem('baran_api_key') || window.ANTHROPIC_KEY || chatProxyUrl();
  const banner = document.getElementById('apiKeyBanner');
  if(banner) banner.style.display = key ? 'none' : 'flex';
}

// ═══════════════════════════════════════════
// FEATURE 1: QUICK-LOG (Plan-Tab)
// ═══════════════════════════════════════════

// Stabiler Block-Schlüssel: übersteht Einfügen/Löschen/Umsortieren von Blöcken
// (Index-basierte Häkchen verrutschen, sobald der Coach den Plan umbaut).
function blockKey(item){ return item.time + '|' + item.title; }

function loadQuickLog(){
  try{
    const today = new Date().toDateString();
    const d = localStorage.getItem('baran_quicklog');
    if(d){
      const parsed = JSON.parse(d);
      // nur String-Keys laden – alte Index-Einträge (Zahlen) verfallen einmalig
      if(parsed.date === today) quickLogDone = new Set((parsed.done||[]).filter(x=>typeof x==='string'));
      else quickLogDone = new Set(); // new day
    }
  }catch(e){ quickLogDone = new Set(); }
}
function saveQuickLog(){
  try{
    localStorage.setItem('baran_quicklog', JSON.stringify({
      date: new Date().toDateString(),
      done: [...quickLogDone]
    }));
  }catch(e){}
}

function toggleQuickLog(idx){
  if(planEditModeActive) return;
  // getActivePlan (inkl. Overrides!) – getSchedule würde bei angepasstem Plan den falschen Block treffen
  const item = getActivePlan()[idx];
  if(!item) return;
  const k = blockKey(item);
  if(quickLogDone.has(k)) quickLogDone.delete(k);
  else quickLogDone.add(k);
  saveQuickLog();
  renderPlan();
  // Habit-Auto-Sync: Plan-Block "Führerschein-App" abgehakt → Führerschein-Habit erledigt
  try{
    if(/führerschein/i.test(item.title)) setHabitAuto('fuehrerschein', quickLogDone.has(k));
  }catch(e){}
  // Haptic feedback on mobile
  if(navigator.vibrate) navigator.vibrate(30);
}

// ═══════════════════════════════════════════
// FEATURE 2: STATISTICS PAGE
// ═══════════════════════════════════════════
let statsAnimated = false;
function animateCount(el, to, opts){
  if(!el) return;
  opts = opts || {};
  const dec = opts.dec||0, suffix = opts.suffix||'';
  const fmt = v => (opts.thousand ? Math.round(v).toLocaleString('de-DE') : v.toFixed(dec).replace('.',',')) + suffix;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(opts.instant || reduce || !to){ el.textContent = fmt(to); return; }
  const dur=650, start=performance.now();
  function step(t){ const p=Math.min((t-start)/dur,1); const e=1-Math.pow(1-p,3); el.textContent=fmt(to*e); if(p<1) requestAnimationFrame(step); else el.textContent=fmt(to); }
  requestAnimationFrame(step);
}
function renderStats(){ try {
  renderWeight();

  // Training this week – echte Trainingstage, nicht Anzahl gelogter Übungen
  const weekKey = getWeekKey(0);
  const daysDone = TRAINING_DAYS.filter(d=>isDayDone(d.key, weekKey)).length;
  const stn = document.getElementById('stat-training-num');
  if(stn) stn.textContent = `${daysDone}/${TRAINING_DAYS.length}`;

  // Kcal today
  const todayKcal = todayLog.reduce((s,l)=>s+l.kcal,0);
  animateCount(document.getElementById('stat-kcal-num'), todayKcal||0, {thousand:true, instant:statsAnimated});

  // Habits done today
  const doneHabits = Object.values(habitStatus).filter(v=>v==='done').length;
  document.getElementById('stat-habits-num').textContent = `${doneHabits}/${HABITS.length}`;

  // Water bar
  const wGoal = getWaterGoal();
  const wPct = Math.min(waterL/wGoal, 1);
  document.getElementById('waterStatBar').style.transform = 'scaleX(' + wPct + ')';
  animateCount(document.getElementById('waterStatVal'), waterL, {dec:1, suffix:'L', instant:statsAnimated});
  document.getElementById('waterStatGoal').textContent = `von ${wGoal}L Ziel`;
  const wgr = document.getElementById('waterStatGoalRight'); if(wgr) wgr.textContent = wGoal+'L';

  // Training progression
  const tlEl = document.getElementById('statsTrainingList');
  const thisW = trainingLog[getWeekKey(0)] || {};
  const lastW = trainingLog[getWeekKey(1)] || {};
  const rows = exercises.slice(0,5).map(ex=>{
    const cur = thisW[ex.id];
    const prev = lastW[ex.id];
    const curReps = cur ? cur.sets.reduce((s,x)=>s+x.reps,0) : null;
    const prevReps = prev ? prev.sets.reduce((s,x)=>s+x.reps,0) : null;
    const diff = (curReps!==null && prevReps!==null) ? curReps-prevReps : null;
    const diffStr = diff===null ? '' : diff>0 ? `<span style="color:var(--ok)">+${diff}</span>` : diff<0 ? `<span style="color:var(--over)">${diff}</span>` : `<span style="color:var(--muted)">±0</span>`;
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 14px;background:var(--surface);border:1px solid var(--rule);border-radius:8px;margin-bottom:6px;font-size:14px;">
      <span style="color:var(--ink);font-weight:500;">${ex.name}</span>
      <span class="mono" style="color:var(--muted);font-size:13px;">${curReps!==null?curReps+' Wdh':'–'} &nbsp;${diffStr}</span>
    </div>`;
  }).join('');
  tlEl.innerHTML = rows || '<div style="font-size:14px;color:var(--muted);padding:10px;">Noch keine Trainingsdaten diese Woche.</div>';

  statsAnimated = true;
  } catch(e){ console.error('renderStats error:', e); }
}

// ═══════════════════════════════════════════
// FEATURE 3: WATER REMINDERS EVERY 2H
// ═══════════════════════════════════════════
function scheduleWaterReminders(){
  if(notifPermission !== 'granted') return;
  // Check every minute
  setInterval(()=>{
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const name = userProfile.name || '';
    // Only between 07:00 and 22:00
    if(h < 7 || h >= 22) return;
    // Every 2 hours on the hour
    if(m !== 0) return;
    if(h % 2 !== 1) return; // 07,09,11,13,15,17,19,21
    const wGoal = getWaterGoal();
    const expected = ((h-7)/2+1) * (wGoal/8); // expected by this time
    if(waterL < expected * 0.8){
      showNotif(`Wasser trinken 💧`, `${name}, du hast erst ${waterL.toFixed(1)}L – Ziel bis jetzt: ~${expected.toFixed(1)}L. Glas trinken!`);
    }
  }, 60000);
}

// ═══════════════════════════════════════════
// FEATURE 4: SERVICE WORKER (Offline)
// ═══════════════════════════════════════════
function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return;
  // Echte sw.js statt Blob-URL – Blob-Registrierungen überleben Neustarts nicht zuverlässig.
  navigator.serviceWorker.register('./sw.js').then(()=>{
    console.log('SW registered – App ist offline verfügbar');
  }).catch(()=>{});
}

// ═══════════════════════════════════════════
// INSTALL BANNER
// ═══════════════════════════════════════════
function dismissInstall(){
  document.getElementById('installBanner').classList.remove('show');
  try{ localStorage.setItem('baran_install_dismissed','1'); }catch(e){}
}
function checkInstallBanner(){
  const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone=window.navigator.standalone===true;
  const dismissed=(()=>{ try{return localStorage.getItem('baran_install_dismissed');}catch(e){return null;} })();
  if(isIOS&&!isStandalone&&!dismissed) document.getElementById('installBanner').classList.add('show');
}

// ═══════════════════════════════════════════
// CLOUD SYNC — App ↔ Supabase ↔ Obsidian-Coach (Einbahn zum Coach)
// Ein einziges JSON-Dokument, Last-Write-Wins per mutatedAt-Zeitstempel.
// ═══════════════════════════════════════════
const SYNC = { enabled:false, applyingRemote:false, dirty:false, pushTimer:null, lastSync:0 };

function syncUrl(){ try{ return (localStorage.getItem('baran_sync_url')||'').trim(); }catch(e){ return ''; } }
function syncSecret(){ try{ return (localStorage.getItem('baran_sync_secret')||'').trim(); }catch(e){ return ''; } }
function syncConfigured(){ return !!(syncUrl() && syncSecret()); }

// Wird vom localStorage.setItem-Hook bei JEDER Datenänderung gerufen.
function markMutation(key){
  if(key==='baran_api_key'||key==='baran_sync_url'||key==='baran_sync_secret'||
     key==='baran_last_mutation'||key==='baran_cloud_backup'||
     key==='baran_anon_key'||key==='baran_device_id') return;
  try{ localStorage.setItem('baran_last_mutation', String(Date.now())); }catch(e){}
  if(SYNC.applyingRemote || !SYNC.enabled) return;
  scheduleCloudPush();
}

function localMutationTs(){ return Number(localStorage.getItem('baran_last_mutation'))||0; }

function scheduleCloudPush(){
  if(!syncConfigured()) return;
  SYNC.dirty = true;
  clearTimeout(SYNC.pushTimer);
  SYNC.pushTimer = setTimeout(pushCloud, 4000);
}

async function pushCloud(){
  if(!syncConfigured() || !SYNC.dirty) return;
  const mutatedAt = localMutationTs()||Date.now();
  const body = JSON.stringify({ data: buildStateBundle(), mutatedAt });
  try{
    const r = await fetch(syncUrl(), {
      method:'POST', keepalive:true,
      headers:{'Content-Type':'application/json','X-Baro-Secret':syncSecret()},
      body
    });
    if(r.ok){ SYNC.dirty=false; SYNC.lastSync=Date.now(); renderSyncStatus('✅ gesynct '+new Date().toLocaleTimeString('de-DE')); ringDoorbell(mutatedAt); }
    else { renderSyncStatus('⚠️ Senden fehlgeschlagen ('+r.status+')'); }
  }catch(e){ renderSyncStatus('⚠️ offline – Senden wird nachgeholt'); /* dirty bleibt */ }
}

async function pullCloud(){
  if(!syncConfigured()) return;
  try{
    const r = await fetch(syncUrl(), { headers:{'X-Baro-Secret':syncSecret()} });
    if(!r.ok){ renderSyncStatus('⚠️ Holen fehlgeschlagen ('+r.status+')'); return; }
    const j = await r.json();
    if(!j || !j.data){ SYNC.dirty=true; if(SYNC.enabled) pushCloud(); return; } // noch kein Cloud-Stand
    const cloudMut = Number(j.mutatedAt)|| (j.updated_at?Date.parse(j.updated_at):0) || 0;
    const localMut = localMutationTs();
    if(cloudMut > localMut){
      try{ localStorage.setItem('baran_cloud_backup', JSON.stringify(buildStateBundle())); }catch(e){}
      SYNC.applyingRemote = true;
      try{ restoreFromBackup(j.data); }finally{ SYNC.applyingRemote = false; }
      try{ localStorage.setItem('baran_last_mutation', String(cloudMut)); }catch(e){}
      SYNC.lastSync = Date.now();
      renderSyncStatus('⬇️ aktualisiert '+new Date().toLocaleTimeString('de-DE'));
    } else if(localMut > cloudMut){
      SYNC.dirty=true; if(SYNC.enabled) pushCloud();
    } else {
      renderSyncStatus('✅ aktuell');
    }
  }catch(e){ renderSyncStatus('⚠️ offline'); }
}

function installStorageHook(){
  if(window.__baroHooked) return; window.__baroHooked = true;
  const _set = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(k,v){ _set(k,v); try{ markMutation(k); }catch(e){} };
}

function renderSyncStatus(msg){
  const el = document.getElementById('syncStatus');
  if(!el) return;
  if(msg !== undefined) SYNC.lastMsg = msg;
  const base = SYNC.lastMsg || (syncConfigured() ? 'eingerichtet' : 'nicht eingerichtet');
  const live = (typeof RT !== 'undefined' && RT.state === 'SUBSCRIBED') ? ' · 🟢 live' : '';
  el.textContent = base + live;
}
function renderSyncInputs(){
  const u = document.getElementById('syncUrlInput');
  const s = document.getElementById('syncSecretInput');
  if(u) u.value = syncUrl();
  if(s) s.value = syncSecret();
  const ak = document.getElementById('syncAnonKeyInput');
  if(ak){ try{ ak.value = localStorage.getItem('baran_anon_key')||''; }catch(e){} }
  const p = document.getElementById('chatProxyInput');
  if(p) p.value = chatProxyUrl();
  const v = document.getElementById('vapidKeyInput');
  if(v){ try{ v.value = localStorage.getItem('baran_vapid_pub')||''; }catch(e){} }
}

// ── Chat-Proxy + Web-Push Setup ──
function saveProxyConfig(){
  try{
    const p = document.getElementById('chatProxyInput');
    if(p) localStorage.setItem('baran_chat_proxy_url', (p.value||'').trim());
    const v = document.getElementById('vapidKeyInput');
    if(v) localStorage.setItem('baran_vapid_pub', (v.value||'').trim());
  }catch(e){}
  checkApiKeyBanner();
  setMemNote('✅ Gespeichert.');
}

function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g,'+').replace(/_/g,'/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}

// Web-Push aktivieren: SW-Subscription erzeugen und an die baro-push-Function melden.
// Voraussetzung: Sync (URL+Secret) eingerichtet, VAPID-Key eingetragen, iOS: App installiert.
async function enablePush(){
  try{
    if(!('serviceWorker' in navigator) || !('PushManager' in window)){
      setMemNote('⚠️ Push wird auf diesem Gerät/Browser nicht unterstützt.'); return;
    }
    if(!syncConfigured()){ setMemNote('⚠️ Erst Auto-Sync (URL + Secret) einrichten.'); return; }
    const vEl = document.getElementById('vapidKeyInput');
    const vapid = ((vEl && vEl.value) || localStorage.getItem('baran_vapid_pub') || '').trim();
    if(!vapid){ setMemNote('⚠️ Erst VAPID Public Key eintragen (siehe SUPABASE-SETUP.md).'); return; }
    try{ localStorage.setItem('baran_vapid_pub', vapid); }catch(e){}

    const perm = await Notification.requestPermission();
    if(perm !== 'granted'){ setMemNote('⚠️ Benachrichtigungen wurden nicht erlaubt.'); return; }

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapid)
    });

    const pushUrl = syncUrl().replace(/baro-sync\/?$/, 'baro-push');
    const r = await fetch(pushUrl, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'X-Baro-Secret': syncSecret() },
      body: JSON.stringify({ subscription: sub })
    });
    if(r.ok) setMemNote('✅ Push aktiv – der Coach kann sich jetzt auch bei geschlossener App melden.');
    else setMemNote('⚠️ Push-Registrierung fehlgeschlagen ('+r.status+') – baro-push deployed?');
  }catch(e){
    setMemNote('⚠️ Push-Setup fehlgeschlagen: '+(e && e.message || e));
  }
}
function saveSyncConfig(){
  const u = document.getElementById('syncUrlInput');
  const s = document.getElementById('syncSecretInput');
  const ak = document.getElementById('syncAnonKeyInput');
  try{ if(u) localStorage.setItem('baran_sync_url',(u.value||'').trim()); }catch(e){}
  try{ if(s) localStorage.setItem('baran_sync_secret',(s.value||'').trim()); }catch(e){}
  try{ if(ak) localStorage.setItem('baran_anon_key',(ak.value||'').trim()); }catch(e){}
  if(syncConfigured()){
    SYNC.enabled = true;
    renderSyncStatus('synchronisiere…');
    pullCloud().finally(()=>{ SYNC.dirty=true; pushCloud(); });
  } else {
    renderSyncStatus('unvollständig – URL + Secret nötig');
  }
  initRealtime(); // Anon-Key neu/geändert/geleert → Live-Sync entsprechend an/aus
}
function forcePush(){ SYNC.dirty = true; pushCloud(); }

function initCloudSync(){
  installStorageHook();
  renderSyncInputs();
  renderSyncStatus();
  if(syncConfigured()){
    pullCloud().finally(()=>{ SYNC.enabled = true; if(SYNC.dirty) pushCloud(); });
  } else {
    SYNC.enabled = true; // ohne Konfig läuft die App normal lokal weiter
  }
  initRealtime();
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){ if(SYNC.dirty) pushCloud(); }      // App in den Hintergrund → letzten Stand sichern
    else {
      pullCloud();                                           // App nach vorne → Stand vom anderen Gerät holen
      // iOS killt Websockets im Hintergrund → Kanal bei Bedarf neu aufbauen
      if(realtimeConfigured() && (!RT.channel || RT.channel.state !== 'joined')) initRealtime();
    }
  });
  window.addEventListener('online', ()=>{ if(SYNC.dirty) pushCloud(); });
}

// ═══════════════════════════════════════════
// REALTIME DOORBELL — Supabase Broadcast als "Klingel".
// Datenpfad bleibt die Edge Function (Secret serverseitig); der Broadcast
// trägt NIE Nutzdaten, nur {mutatedAt, device}. Empfänger validiert per
// pullCloud gegen den echten Cloud-Stand (Last-Write-Wins wie gehabt).
// ═══════════════════════════════════════════
const RT = { client:null, channel:null, state:'off', loading:null, lastPull:0, keyUsed:'' };

function anonKey(){ try{ return (localStorage.getItem('baran_anon_key')||'').trim(); }catch(e){ return ''; } }
function deviceId(){
  try{
    let id = localStorage.getItem('baran_device_id');
    if(!id){ id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('baran_device_id', id); }
    return id;
  }catch(e){ return 'unknown'; }
}
function supabaseProjectUrl(){
  const m = syncUrl().match(/^(https:\/\/[^\/]+\.supabase\.co)\/functions\//);
  return m ? m[1] : '';
}
function realtimeConfigured(){ return !!(syncConfigured() && anonKey() && supabaseProjectUrl()); }

// supabase-js v2 (UMD) lazy vom CDN – nur wenn Live-Sync konfiguriert ist.
function loadSupabaseJs(){
  if(window.supabase && window.supabase.createClient) return Promise.resolve();
  if(RT.loading) return RT.loading;
  RT.loading = new Promise((resolve, reject)=>{
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    const to = setTimeout(()=>{ RT.loading = null; reject(new Error('timeout')); }, 10000);
    s.onload = ()=>{ clearTimeout(to); resolve(); };
    s.onerror = ()=>{ clearTimeout(to); RT.loading = null; reject(new Error('load failed')); };
    document.head.appendChild(s);
  });
  return RT.loading;
}

async function initRealtime(){
  try{
    if(!realtimeConfigured()){ rtTeardown(); return; }
    await loadSupabaseJs();
    // Key geändert → Client neu aufbauen
    if(RT.client && RT.keyUsed !== anonKey()){ rtTeardown(); RT.client = null; }
    if(!RT.client){
      RT.client = window.supabase.createClient(supabaseProjectUrl(), anonKey(),
        { auth:{ persistSession:false, autoRefreshToken:false } });
      RT.keyUsed = anonKey();
    }
    rtSubscribe();
  }catch(e){ RT.state = 'off'; renderSyncStatus(); }
}

function rtSubscribe(){
  if(!RT.client) return;
  if(RT.channel){ try{ RT.client.removeChannel(RT.channel); }catch(e){} RT.channel = null; }
  RT.channel = RT.client.channel('baro-doorbell', { config:{ broadcast:{ self:false } } })
    .on('broadcast', { event:'mutated' }, onDoorbell)
    .subscribe(status => { RT.state = status; renderSyncStatus(); });
}

function onDoorbell(msg){
  const p = (msg && msg.payload) || {};
  if(p.device === deviceId()) return;               // eigenes Echo (doppelt gesichert)
  if(SYNC.applyingRemote) return;                    // gerade am Übernehmen
  if(Number(p.mutatedAt||0) <= localMutationTs()) return; // nichts Neues
  if(Date.now() - RT.lastPull < 1500) return;        // Pull-Sturm bremsen
  RT.lastPull = Date.now();
  pullCloud();
}

function ringDoorbell(mutatedAt){
  try{
    if(RT.channel && RT.state === 'SUBSCRIBED'){
      RT.channel.send({ type:'broadcast', event:'mutated', payload:{ mutatedAt, device: deviceId() } });
    }
  }catch(e){} // Klingel-Ausfall ist ok – das andere Gerät zieht beim nächsten Öffnen
}

function rtTeardown(){
  if(RT.client && RT.channel){ try{ RT.client.removeChannel(RT.channel); }catch(e){} }
  RT.channel = null;
  RT.state = 'off';
  renderSyncStatus();
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
loadProfile();
loadApiKey();
loadPhase();
loadWeightLog();
loadHabits();
loadCustomMeals();
loadStorage();
loadExercises();
loadTrainingLog();
loadTrainingDone();
loadPlanOverrides();
loadChatHistory();
loadGoals();
loadNotifTimes();
loadQuickLog();
loadWeekHistory();
updateTodayScore();
initCloudSync();

// Apply auto-detected mode + day to UI
function applyModeUI(){
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
  if(mode !== 'weekend'){
    const btn = document.querySelector(`[data-mode="${mode}"]`);
    if(btn) btn.classList.add('active');
  }
  // Day-Selector nur zeigen, wo Tage wirklich unterschiedliche Pläne haben.
  // Lehrbauhof hat einen Einheitsplan → gar kein Selector.
  const ds = document.getElementById('daySelector');
  const daySets = { schule:['mo','di','mi','do','fr'], baustelle:['mo','fr'], weekend:['sa','so'], lehrbauhof:[] };
  const labels = { mo:'Mo', di:'Di', mi:'Mi', do:'Do', fr:'Fr', sa:'Sa', so:'So' };
  const baustelleLabels = { mo:'Mo–Do', fr:'Fr' };
  const days = daySets[mode] || [];
  if(days.length < 2){
    ds.classList.remove('visible');
    ds.innerHTML = '';
  } else {
    ds.classList.add('visible');
    ds.innerHTML = days.map(d =>
      `<div class="day-btn${d===day?' active':''}" data-day="${d}" onclick="setDay('${d}')">${mode==='baustelle' ? baustelleLabels[d] : labels[d]}</div>`
    ).join('');
  }
  const sw = document.getElementById('sleepWarning');
  (mode==='baustelle'||mode==='lehrbauhof') ? sw.classList.add('show') : sw.classList.remove('show');
}

applyModeUI();
applyPhaseUI();
startClock();   // start clock FIRST so clockTime is set before renderPlan
renderPlan();
renderWeeks();
updateNutritionNote();
renderMealGrid();
renderLog();
updateRing();
renderExercises();
// Beim Start dort weitermachen, wo Baran zuletzt war (gleicher Tag)
(function restoreLastTab(){
  try{
    if(lastTab==='feedback' || lastTab==='stats') lastTab = 'goals'; // alte Tabs → fusionierter Tab
    if(lastTab && lastTab !== 'plan'){
      const navBtn = document.querySelector(`[data-page="${lastTab}"]`);
      if(navBtn) showPage(lastTab, navBtn);
    }
  }catch(e){}
})();
checkInstallBanner();
checkNotifPermission();
scheduleWaterReminders();
registerServiceWorker();
