/* ============================================================
   Maestria — État, persistance et logique de jeu.
   Supporte plusieurs profils (chacun isolé dans localStorage).
   ============================================================ */
(function () {
  const { DISCIPLINES, BADGES, DAILY_HABITS, HARDNESS_RAMP_DAYS } = window.MAESTRIA_CONFIG;
  const PROFILES_KEY = 'maestria_profiles';
  const ACTIVE_KEY   = 'maestria_active_profile';

  /* ---------- Utilitaires de date ---------- */
  const Dates = {
    today() { return Dates.toKey(new Date()); },
    toKey(d) {
      const x = new Date(d);
      return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;
    },
    addDays(key, n) {
      const d = new Date(key + 'T00:00:00'); d.setDate(d.getDate() + n); return Dates.toKey(d);
    },
    diffDays(a, b) { return Math.round((new Date(b+'T00:00:00') - new Date(a+'T00:00:00')) / 86400000); },
    label(key) { return new Date(key+'T00:00:00').toLocaleDateString('fr-FR',{day:'2-digit',month:'short'}); },
  };

  /* ---------- Profils ---------- */
  let activeProfileId = localStorage.getItem(ACTIVE_KEY) || null;

  function getProfiles() {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]'); } catch { return []; }
  }
  function saveProfiles(profiles) { localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles)); }
  function dataKey(profileId) { return `maestria_state_v1_${profileId}`; }

  function createProfile(name) {
    const id = 'p_' + Date.now();
    const profiles = getProfiles();
    profiles.push({ id, name: name.trim(), createdAt: new Date().toISOString() });
    saveProfiles(profiles);
    return id;
  }
  function deleteProfile(id) {
    const profiles = getProfiles().filter((p) => p.id !== id);
    saveProfiles(profiles);
    localStorage.removeItem(dataKey(id));
    if (activeProfileId === id) {
      activeProfileId = profiles.length ? profiles[0].id : null;
      if (activeProfileId) localStorage.setItem(ACTIVE_KEY, activeProfileId);
      else localStorage.removeItem(ACTIVE_KEY);
      state = activeProfileId ? load() : freshState();
    }
  }
  function switchProfile(id) {
    activeProfileId = id;
    localStorage.setItem(ACTIVE_KEY, id);
    state = load();
  }
  function hasProfile() { return !!activeProfileId && getProfiles().some((p) => p.id === activeProfileId); }
  function activeProfile() { return getProfiles().find((p) => p.id === activeProfileId) || null; }

  /* ---------- Création d'un état vierge ---------- */
  function emptyDiscipline() { return { xp:0, skills:{}, metrics:{}, sessions:[], goals:[], cefr:{} }; }

  /* Quêtes de vie par défaut : le premier « boss » = décrocher un stage. */
  function defaultQuests() {
    return [{
      id: 'q_stage', title: 'Boss : décrocher un stage en finance', icon: '💼', domain: 'pro',
      xp: 200, createdAt: new Date().toISOString(),
      steps: [
        { id:'s1', text:'Lister 10 boîtes / cabinets qui m\'intéressent', done:false },
        { id:'s2', text:'Mettre à jour mon CV (1 version « finance »)', done:false },
        { id:'s3', text:'Écrire 1 message à un alumni de l\'ESCP', done:false },
        { id:'s4', text:'Envoyer mes 3 premières candidatures', done:false },
        { id:'s5', text:'Préparer 5 réponses d\'entretien (dont « parlez-moi de vous »)', done:false },
      ],
    }];
  }

  function freshState() {
    const disciplines = {};
    Object.keys(DISCIPLINES).forEach((id) => { disciplines[id] = emptyDiscipline(); });
    return { version:2, createdAt:new Date().toISOString(),
      settings:{ name:'', coach:'adaptatif', startDate:Dates.today() },
      disciplines, journal:[], badges:[], log:[], stats:{ reviewsDone:0 },
      daily:{}, quests:defaultQuests(), readingLog:[], opinions:[], diary:[],
      city:{ buildings:{} } };
  }

  /* ---------- Persistance ---------- */
  function load() {
    if (!activeProfileId) return freshState();
    try {
      const raw = localStorage.getItem(dataKey(activeProfileId));
      if (!raw) return freshState();
      const s = JSON.parse(raw);
      Object.keys(DISCIPLINES).forEach((id) => { if (!s.disciplines[id]) s.disciplines[id] = emptyDiscipline(); });
      if (!s.stats) s.stats = { reviewsDone:0 };
      /* Migration v1 → v2 : quotidien, quêtes, date de départ */
      if (!s.daily) s.daily = {};
      if (!s.quests) s.quests = defaultQuests();
      if (!s.settings) s.settings = { name:'', coach:'adaptatif' };
      if (!s.settings.startDate) s.settings.startDate = s.createdAt ? Dates.toKey(s.createdAt) : Dates.today();
      if (!s.readingLog) s.readingLog = [];
      if (!s.opinions) s.opinions = [];
      if (!s.diary) s.diary = [];
      if (!s.city) s.city = { buildings:{} };
      if (!s.city.buildings) s.city.buildings = {};
      return s;
    } catch { return freshState(); }
  }

  /* Auto-migration : si l'ancienne clé `maestria_state_v1` existe et qu'il n'y a aucun profil,
     on crée un profil "Thomas" et on migre les données. */
  (function migrate() {
    const old = localStorage.getItem('maestria_state_v1');
    if (old && getProfiles().length === 0) {
      try {
        const parsed = JSON.parse(old);
        const name = (parsed.settings && parsed.settings.name) || 'Thomas';
        const id = createProfile(name);
        localStorage.setItem(dataKey(id), old);
        localStorage.removeItem('maestria_state_v1');
        if (!activeProfileId) { activeProfileId = id; localStorage.setItem(ACTIVE_KEY, id); }
      } catch { /* migration optionnelle */ }
    }
  })();

  let state = load();

  function save() { if (activeProfileId) localStorage.setItem(dataKey(activeProfileId), JSON.stringify(state)); }

  /* ---------- XP / niveaux ---------- */
  function xpForLevel(L) { return Math.floor(80 * Math.pow(L - 1, 1.55)); }
  function levelFromXp(xp) { let L=1; while (xpForLevel(L+1) <= xp) L++; return L; }
  function levelProgress(xp) {
    const L = levelFromXp(xp), cur = xpForLevel(L), next = xpForLevel(L+1);
    return { level:L, into:xp-cur, span:next-cur, pct:Math.min(100, Math.round(((xp-cur)/(next-cur))*100)) };
  }

  /* ---------- Helpers ---------- */
  const H = {
    disc: (id) => state.disciplines[id],
    disciplineXp: (id) => state.disciplines[id].xp,
    disciplineLevel: (id) => levelFromXp(state.disciplines[id].xp),
    globalXp: (s=state) => Object.values(s.disciplines).reduce((a,d) => a+d.xp, 0),
    globalLevel: (s=state) => levelFromXp(H.globalXp(s)),
    domainXp(domainId, s=state) {
      return Object.keys(DISCIPLINES).filter((id) => DISCIPLINES[id].domain === domainId)
        .reduce((a,id) => a+s.disciplines[id].xp, 0);
    },
    domainLevel(domainId) { return levelFromXp(H.domainXp(domainId)); },
    skillXp: (id, skill) => (state.disciplines[id].skills[skill] || 0),
    skillLevel: (id, skill) => levelFromXp(state.disciplines[id].skills[skill] || 0),
    activeDates(s=state) { return new Set(s.log.map((l) => l.date)); },
    currentStreak(s=state) {
      const days = H.activeDates(s);
      if (days.size === 0) return 0;
      let streak=0, cursor=Dates.today();
      if (!days.has(cursor)) cursor = Dates.addDays(cursor, -1);
      while (days.has(cursor)) { streak++; cursor = Dates.addDays(cursor, -1); }
      return streak;
    },
    /* La régularité est le levier principal : +3 %/jour d'affilée, plafonné à ×1.9 (30 j). */
    streakMultiplier(s=state) { return 1 + Math.min(H.currentStreak(s), 30) * 0.03; },
    longestStreak(s=state) {
      const days = [...H.activeDates(s)].sort();
      let best=0, run=0, prev=null;
      days.forEach((d) => { run = (prev && Dates.diffDays(prev,d)===1) ? run+1 : 1; best=Math.max(best,run); prev=d; });
      return best;
    },
    totalSessions: (s=state) => Object.values(s.disciplines).reduce((a,d) => a+d.sessions.length, 0),
    totalActivities: (s=state) => s.log.length,
    activeDomains(s=state) {
      const set=new Set();
      Object.keys(DISCIPLINES).forEach((id) => { if (s.disciplines[id].xp>0) set.add(DISCIPLINES[id].domain); });
      return set.size;
    },
    activeDaysLastDays(n, s=state) {
      const since = Dates.addDays(Dates.today(), -n+1);
      return new Set(s.log.filter((l) => l.date>=since).map((l) => l.date)).size;
    },
  };

  /* ---------- Coach adaptatif ---------- */
  function adaptiveTarget() {
    const last28 = H.activeDaysLastDays(28);
    const avgWeek = last28/4;
    const target = Math.min(7, Math.max(3, Math.ceil(avgWeek)+1));
    const done = H.activeDaysLastDays(7);
    return { target, done, avgWeek: Math.round(avgWeek*10)/10 };
  }
  function xpEarnedToday() {
    const t = Dates.today();
    return state.log.filter((l) => l.date === t).reduce((a, l) => a + (l.xp || 0), 0);
  }

  /* Coach v2 : tient compte des quêtes du jour ET de la phase de dureté (progressive). */
  function coachMessage() {
    const phase = hardnessPhase();          // 'doux' (rodage <14j) | 'dur'
    const dp = dailyProgress();             // { doneCount, total }
    const streak = H.currentStreak();
    const activeToday = H.activeDates().has(Dates.today());
    const name = (state.settings.name || 'toi').split(' ')[0];

    if (phase === 'doux') {
      if (dp.doneCount === dp.total)
        return { tone:'ok',     text:`${dp.total}/${dp.total} quêtes, et on est encore en rodage. C'est exactement comme ça qu'une habitude s'installe, ${name}.` };
      if (!activeToday)
        return { tone:'feu',    text:`Phase de rodage, ${name} : zéro pression, juste de la régularité. Coche une seule quête maintenant — la plus facile.` };
      return   { tone:'pousse', text:`${dp.doneCount}/${dp.total} quêtes aujourd'hui. En rodage on vise la constance avant l'exploit. Encore une.` };
    }

    // Phase exigeante (≥ 14 jours)
    if (streak >= 14)                 return { tone:'feu',  text:`${streak} jours d'affilée, ${name}. Tu deviens quelqu'un d'autre. Ne casse pas ça aujourd'hui.` };
    if (!activeToday && streak === 0) return { tone:'dur',  text:`Zéro aujourd'hui, zéro hier. L'app ne s'entraîne pas à ta place. Une quête, maintenant.` };
    if (!activeToday)                 return { tone:'dur',  text:`Streak de ${streak} en jeu. Tu vas vraiment tout lâcher pour rien ? Coche quelque chose.` };
    if (dp.doneCount < dp.total)      return { tone:'pousse',text:`${dp.doneCount}/${dp.total} quêtes. Correct, pas suffisant. Finis ta journée.` };
    return { tone:'ok', text:`${dp.doneCount}/${dp.total} quêtes tenues. Tu fais le travail. On monte la barre.` };
  }

  /* ---------- Quotidien : habitudes & dureté progressive ---------- */
  function daysSinceStart() {
    const start = (state.settings && state.settings.startDate) || Dates.today();
    return Math.max(0, Dates.diffDays(start, Dates.today()));
  }
  function hardnessPhase() { return daysSinceStart() < HARDNESS_RAMP_DAYS ? 'doux' : 'dur'; }

  function reviewsDoneOn(date) { return state.log.some((l) => l.date===date && l.type==='review'); }
  function deepSessionOn(date) {
    return Object.values(state.disciplines).some((d) =>
      d.sessions.some((se) => se.date===date && (se.durationMin||0) >= 20));
  }
  function autoHabitDone(habitId, date) {
    if (habitId === 'review') return reviewsDoneOn(date);
    if (habitId === 'deep')   return deepSessionOn(date);
    return false;
  }
  function habitDone(habitId, date=Dates.today()) {
    const h = DAILY_HABITS.find((x)=>x.id===habitId);
    if (h && h.auto) return autoHabitDone(habitId, date);
    return !!(state.daily[date] && state.daily[date].habits && state.daily[date].habits[habitId]);
  }
  function setHabit(date, habitId, on) {
    if (!state.daily[date]) state.daily[date] = { habits:{} };
    if (!state.daily[date].habits) state.daily[date].habits = {};
    state.daily[date].habits[habitId] = !!on;
    /* Cocher une habitude rend la journée "active" (compte pour le streak). */
    if (on && !state.log.some((l) => l.date===date && l.type==='habit')) {
      state.log.push({ date, disciplineId:'__habit__', xp:0, type:'habit' });
    }
    save();
  }
  function dailyProgress(date=Dates.today()) {
    const items = DAILY_HABITS.map((h)=>({ habit:h, done:habitDone(h.id,date) }));
    const doneCount = items.filter((i)=>i.done).length;
    return { items, doneCount, total:items.length, pct:Math.round((doneCount/items.length)*100) };
  }

  /* ---------- Quêtes de vie (boss) ---------- */
  function questProgress(q) {
    const done = q.steps.filter((s)=>s.done).length;
    return { done, total:q.steps.length, pct:Math.round((done/q.steps.length)*100) };
  }
  function toggleQuestStep(questId, stepId) {
    const q = state.quests.find((x)=>x.id===questId); if(!q) return null;
    const st = q.steps.find((s)=>s.id===stepId); if(!st) return null;
    st.done = !st.done;
    const disc = q.disciplineId || 'economie';
    let res = st.done ? addXp(disc, 15, 'quest') : null;
    const prog = questProgress(q);
    if (prog.done===prog.total && !q.completed) { q.completed=true; res = addXp(disc, q.xp||0, 'boss'); }
    if (prog.done<prog.total && q.completed)   { q.completed=false; }
    save();
    return res;
  }

  /* ---------- Mutations ---------- */
  function logActivity(disciplineId, xp, type) {
    state.log.push({ date:Dates.today(), disciplineId, xp, type });
  }
  function addXp(disciplineId, amount, type) {
    const before = H.globalLevel();
    state.disciplines[disciplineId].xp += amount;
    logActivity(disciplineId, amount, type);
    const after = H.globalLevel();
    save();
    return { leveledUp: after>before, newLevel: after };
  }
  function addSession(disciplineId, { durationMin, intensity, skills, note, metrics }) {
    const d = state.disciplines[disciplineId];
    const session = { id:'se_'+Date.now(), date:Dates.today(), durationMin:Number(durationMin)||0,
      intensity:Number(intensity)||3, skills:skills||[], note:note||'', metrics:metrics||{} };
    d.sessions.unshift(session);
    Object.entries(session.metrics).forEach(([mid, val]) => {
      if (val===''||val==null) return;
      if (!d.metrics[mid]) d.metrics[mid]=[];
      d.metrics[mid].push({ date:session.date, value:Number(val) });
    });
    const xp = Math.round((session.durationMin||10)*(session.intensity/3)+(session.skills.length*8));
    session.skills.forEach((sk) => { d.skills[sk]=(d.skills[sk]||0)+Math.round(xp/Math.max(1,session.skills.length)); });
    return { session, xp, ...addXp(disciplineId, xp, 'session') };
  }
  function setCefr(disciplineId, skill, level) { state.disciplines[disciplineId].cefr[skill]=level; save(); }
  function addGoal(disciplineId, text) {
    state.disciplines[disciplineId].goals.unshift({ id:'g_'+Date.now(), text, done:false, createdAt:Dates.today() }); save();
  }
  function toggleGoal(disciplineId, goalId) {
    const g = state.disciplines[disciplineId].goals.find((x) => x.id===goalId);
    if (g) { g.done=!g.done; if (g.done) addXp(disciplineId,40,'goal'); else save(); }
  }
  function removeGoal(disciplineId, goalId) {
    const d = state.disciplines[disciplineId]; d.goals=d.goals.filter((x) => x.id!==goalId); save();
  }

  /* ---------- Badges ---------- */
  function refreshBadges() {
    const earned=[];
    BADGES.forEach((b) => { if (!state.badges.includes(b.id) && b.cond(state,H)) { state.badges.push(b.id); earned.push(b); } });
    if (earned.length) save();
    return earned;
  }

  /* ---------- Import / export ---------- */
  function exportJSON() { return JSON.stringify(state, null, 2); }
  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (!parsed.disciplines) throw new Error('Fichier invalide.');
    state = parsed;
    Object.keys(DISCIPLINES).forEach((id) => { if (!state.disciplines[id]) state.disciplines[id]=emptyDiscipline(); });
    if (!state.stats) state.stats={reviewsDone:0};
    save();
  }
  function reset() { state=freshState(); save(); }

  /* ---------- Cité (village gamifié) ----------
     Pierres = monnaie DÉRIVÉE du niveau global (pas d'événement à rater).
     Un bâtiment de domaine monte si : assez de Pierres + domaine assez haut + Hôtel de ville (stage) assez haut.
     L'Hôtel de ville (Métier) = nb d'étapes du boss stage franchies → il plafonne toute la Cité. */
  const CITY_DOMAINS = ['corps', 'art', 'esprit', 'langues'];
  const STAGE_STEPS_MAX = 5;
  function cityState() { if (!state.city) state.city = { buildings:{} }; if (!state.city.buildings) state.city.buildings = {}; return state.city; }
  function buildingTier(domainId) { return cityState().buildings[domainId] || 0; }
  function townHallTier() {
    const q = (state.quests || []).find((x) => x.id === 'q_stage') || (state.quests || [])[0];
    return q ? Math.min(STAGE_STEPS_MAX, q.steps.filter((s) => s.done).length) : 0;
  }
  function tierCost(t) { return 3 * t; }                       // coût pour atteindre le palier t
  function cumCost(t) { let c = 0; for (let k = 1; k <= t; k++) c += tierCost(k); return c; }
  function pierresEarned() { const L = H.globalLevel(); return L > 1 ? (L * (L + 1) / 2 - 1) : 0; }
  function pierresSpent() { return CITY_DOMAINS.reduce((a, d) => a + cumCost(buildingTier(d)), 0); }
  function pierresAvailable() { return pierresEarned() - pierresSpent(); }
  function buildingMaxTier(domainId) { return Math.min(H.domainLevel(domainId), townHallTier() + 1); }
  function canUpgrade(domainId) {
    const next = buildingTier(domainId) + 1, cost = tierCost(next);
    if (next > townHallTier() + 1) return { ok:false, reason:'stage', cost };
    if (next > H.domainLevel(domainId)) return { ok:false, reason:'domaine', cost };
    if (pierresAvailable() < cost) return { ok:false, reason:'pierres', cost };
    return { ok:true, cost };
  }
  function upgradeBuilding(domainId) {
    const c = canUpgrade(domainId);
    if (!c.ok) return c;
    cityState().buildings[domainId] = buildingTier(domainId) + 1;
    save();
    return { ok:true, tier: buildingTier(domainId), cost: c.cost };
  }
  const City = { domains:CITY_DOMAINS, stepsMax:STAGE_STEPS_MAX, buildingTier, townHallTier,
    buildingMaxTier, tierCost, pierresEarned, pierresSpent, pierresAvailable, canUpgrade, upgradeBuilding };

  window.Store = {
    get state() { return state; },
    Dates, H,
    xpForLevel, levelFromXp, levelProgress,
    adaptiveTarget, coachMessage, xpEarnedToday,
    daysSinceStart, hardnessPhase, habitDone, setHabit, dailyProgress,
    questProgress, toggleQuestStep,
    addSession, addXp, setCefr, addGoal, toggleGoal, removeGoal,
    refreshBadges, save, reset,
    City,
    exportJSON, importJSON,
    /* Profils */
    getProfiles, createProfile, deleteProfile, switchProfile,
    hasProfile, activeProfile,
    get activeProfileId() { return activeProfileId; },
  };
})();
