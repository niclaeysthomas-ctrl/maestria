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
      city:{ buildings:{} }, courseProgress:{ lessons:{} },
      earTraining:{ attempts:{} }, improJournal:[], notes:[], calendar:{ events:[] },
      exercises:{ stats:{}, dailyLog:[] }, calibration:{ attempts:[] }, mentalModels:{ journal:[] },
      biasJournal:[], victories:[], essays:[], steelmans:[],
      speaking:{ log:[] }, applications:[], interviewLog:[], debateJournal:[],
      fallacyJournal:[], predictions:[] };
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
      if (!s.courseProgress) s.courseProgress = { lessons:{} };
      if (!s.courseProgress.lessons) s.courseProgress.lessons = {};
      if (!s.earTraining) s.earTraining = { attempts:{} };
      if (!s.earTraining.attempts) s.earTraining.attempts = {};
      if (!s.improJournal) s.improJournal = [];
      if (!s.notes) s.notes = [];
      if (!s.calendar) s.calendar = { events:[] };
      if (!s.calendar.events) s.calendar.events = [];
      if (!s.exercises) s.exercises = { stats:{}, dailyLog:[] };
      if (!s.exercises.stats) s.exercises.stats = {};
      if (!s.exercises.dailyLog) s.exercises.dailyLog = [];
      if (!s.calibration) s.calibration = { attempts:[] };
      if (!s.calibration.attempts) s.calibration.attempts = [];
      if (!s.mentalModels) s.mentalModels = { journal:[] };
      if (!s.mentalModels.journal) s.mentalModels.journal = [];
      if (!s.biasJournal) s.biasJournal = [];
      if (!s.victories) s.victories = [];
      if (!s.essays) s.essays = [];
      if (!s.steelmans) s.steelmans = [];
      if (!s.speaking) s.speaking = { log:[] };
      if (!s.speaking.log) s.speaking.log = [];
      if (!s.applications) s.applications = [];
      if (!s.interviewLog) s.interviewLog = [];
      if (!s.debateJournal) s.debateJournal = [];
      if (!s.fallacyJournal) s.fallacyJournal = [];
      if (!s.predictions) s.predictions = [];
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

  /* ---------- Bilan hebdo : activité + corrélation humeur×activité ---------- */
  const MOOD_SCORE = { '😄':5, '🔥':5, '🙂':4, '😐':3, '😕':2, '😤':2, '😞':1, '😴':2 };
  function activityReport(daysBack, offsetDays) {
    daysBack = daysBack || 7; offsetDays = offsetDays || 0;
    const end = Dates.addDays(Dates.today(), -offsetDays);
    const start = Dates.addDays(end, -(daysBack - 1));
    const logs = (state.log || []).filter((l) => l.date >= start && l.date <= end);
    const diaryEntries = (state.diary || []).filter((d) => d.date >= start && d.date <= end);
    const xpByDiscipline = {};
    logs.forEach((l) => { xpByDiscipline[l.disciplineId] = (xpByDiscipline[l.disciplineId] || 0) + (l.xp || 0); });
    const activeDays = new Set(logs.map((l) => l.date));
    const topDiscipline = Object.keys(xpByDiscipline).sort((a, b) => xpByDiscipline[b] - xpByDiscipline[a])[0] || null;
    const moodByDay = {};
    diaryEntries.forEach((d) => { if (d.mood && MOOD_SCORE[d.mood]) moodByDay[d.date] = MOOD_SCORE[d.mood]; });
    const activeMoods = [], inactiveMoods = [];
    Object.keys(moodByDay).forEach((date) => { (activeDays.has(date) ? activeMoods : inactiveMoods).push(moodByDay[date]); });
    const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
    return {
      start, end, daysBack,
      activeDaysCount: activeDays.size,
      totalXp: logs.reduce((a, l) => a + (l.xp || 0), 0),
      xpByDiscipline, topDiscipline,
      avgMoodActive: avg(activeMoods), avgMoodInactive: avg(inactiveMoods),
      moodSampleActive: activeMoods.length, moodSampleInactive: inactiveMoods.length,
    };
  }

  /* Coach v2 : tient compte des quêtes du jour ET de la phase de dureté (progressive). */
  /* Coach socratique : un jour sur deux (déterministe par date), une question réflexive
     remplace l'affirmation — pour faire réfléchir plutôt que juste dicter. */
  function coachMessage() {
    const phase = hardnessPhase();          // 'doux' (rodage <14j) | 'dur'
    const dp = dailyProgress();             // { doneCount, total }
    const streak = H.currentStreak();
    const activeToday = H.activeDates().has(Dates.today());
    const name = (state.settings.name || 'toi').split(' ')[0];
    const socratic = Number(Dates.today().replace(/-/g, '')) % 2 === 0;
    const pick = (tone, statement, question) => ({ tone, text: socratic ? question : statement, socratic });

    if (phase === 'doux') {
      if (dp.doneCount === dp.total)
        return pick('ok',
          `${dp.total}/${dp.total} quêtes, et on est encore en rodage. C'est exactement comme ça qu'une habitude s'installe, ${name}.`,
          `${dp.total}/${dp.total} quêtes faites, ${name}. Qu'est-ce qui a rendu cette journée plus facile que les autres ?`);
      if (!activeToday)
        return pick('feu',
          `Phase de rodage, ${name} : zéro pression, juste de la régularité. Coche une seule quête maintenant — la plus facile.`,
          `Rien coché aujourd'hui, ${name}. Quelle est la quête la plus facile que tu pourrais faire là, maintenant, en 2 minutes ?`);
      return pick('pousse',
        `${dp.doneCount}/${dp.total} quêtes aujourd'hui. En rodage on vise la constance avant l'exploit. Encore une.`,
        `${dp.doneCount}/${dp.total} quêtes. Qu'est-ce qui t'empêche de faire la suivante tout de suite ?`);
    }

    // Phase exigeante (≥ 14 jours)
    if (streak >= 14)
      return pick('feu',
        `${streak} jours d'affilée, ${name}. Tu deviens quelqu'un d'autre. Ne casse pas ça aujourd'hui.`,
        `${streak} jours d'affilée. Qu'est-ce que ça te coûterait vraiment de t'arrêter aujourd'hui — et qu'est-ce que ça dirait de toi si tu le faisais ?`);
    if (!activeToday && streak === 0)
      return pick('dur',
        `Zéro aujourd'hui, zéro hier. L'app ne s'entraîne pas à ta place. Une quête, maintenant.`,
        `Zéro depuis 2 jours. Qu'est-ce qui a changé depuis ta dernière bonne série ?`);
    if (!activeToday)
      return pick('dur',
        `Streak de ${streak} en jeu. Tu vas vraiment tout lâcher pour rien ? Coche quelque chose.`,
        `Streak de ${streak} en jeu. Si tu le casses aujourd'hui, sera-ce à cause d'un vrai empêchement, ou d'un simple relâchement ?`);
    if (dp.doneCount < dp.total)
      return pick('pousse',
        `${dp.doneCount}/${dp.total} quêtes. Correct, pas suffisant. Finis ta journée.`,
        `${dp.doneCount}/${dp.total} quêtes. Qu'est-ce qui te retient de finir maintenant plutôt que plus tard ?`);
    return pick('ok',
      `${dp.doneCount}/${dp.total} quêtes tenues. Tu fais le travail. On monte la barre.`,
      `${dp.doneCount}/${dp.total} quêtes tenues. Si tu devais monter d'un cran demain, sur quoi porterait-il ?`);
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

  /* ---------- Cours (leçons validées) ---------- */
  function lessonDone(lessonId) { return !!(state.courseProgress && state.courseProgress.lessons[lessonId]); }
  function markLessonDone(lessonId) {
    if (!state.courseProgress) state.courseProgress = { lessons:{} };
    if (state.courseProgress.lessons[lessonId]) return false;
    state.courseProgress.lessons[lessonId] = true;
    save();
    return true;
  }

  /* ---------- Oreille musicale (ear training) ---------- */
  function earStats(key) { return (state.earTraining && state.earTraining.attempts[key]) || { correct:0, total:0 }; }
  function recordEarAttempt(key, correct) {
    if (!state.earTraining) state.earTraining = { attempts:{} };
    if (!state.earTraining.attempts[key]) state.earTraining.attempts[key] = { correct:0, total:0 };
    const st = state.earTraining.attempts[key];
    st.total++; if (correct) st.correct++;
    save();
  }

  /* ---------- Impro Coach (journal d'impro) ---------- */
  function addImproEntry(scaleId, style, note) {
    state.improJournal = state.improJournal || [];
    state.improJournal.push({ date: Dates.today(), scaleId, style, note });
    save();
  }

  /* ---------- Notes (cahier au fil de la journée, plusieurs entrées/jour) ---------- */
  function notesForDate(date) { return (state.notes || []).filter((n) => n.date === date).sort((a, b) => a.time.localeCompare(b.time)); }
  function notesDays() { const set = new Set((state.notes || []).map((n) => n.date)); return [...set].sort().reverse(); }
  function addNote(text) {
    state.notes = state.notes || [];
    const today = Dates.today();
    const firstToday = !state.notes.some((n) => n.date === today);
    const time = new Date().toTimeString().slice(0, 5);
    const note = { id: 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), date: today, time, text };
    state.notes.push(note);
    let xp = 0, mutRes = { leveledUp: false, newLevel: null };
    if (firstToday) { xp = Math.round(3 * H.streakMultiplier()); mutRes = addXp('lettres', xp, 'notes'); } // save inclus
    else save();
    return { note, xp, leveledUp: mutRes.leveledUp, newLevel: mutRes.newLevel };
  }
  function removeNote(id) { state.notes = (state.notes || []).filter((n) => n.id !== id); save(); }

  /* ---------- Calendrier (événements perso, toute l'année) ---------- */
  function eventsForDate(date) { return ((state.calendar && state.calendar.events) || []).filter((e) => e.date === date); }
  function eventsInRange(fromDate, toDateIncl) {
    return ((state.calendar && state.calendar.events) || []).filter((e) => e.date >= fromDate && e.date <= toDateIncl).sort((a, b) => a.date.localeCompare(b.date));
  }
  function addCalendarEvent(date, title, note, category) {
    state.calendar = state.calendar || { events:[] };
    state.calendar.events.push({ id:'cal_'+Date.now()+'_'+Math.random().toString(36).slice(2,6), date, title, note:note||'', category:category||'perso' });
    save();
  }
  function removeCalendarEvent(id) { state.calendar.events = (state.calendar.events || []).filter((e) => e.id !== id); save(); }
  function exportCalendarICS() {
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = (() => { const d = new Date(); return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`; })();
    const events = (state.calendar && state.calendar.events) || [];
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Maestria//Calendrier//FR', 'CALSCALE:GREGORIAN'];
    events.forEach((e) => {
      const ymd = e.date.replace(/-/g, '');
      lines.push('BEGIN:VEVENT', `UID:maestria-cal-${e.id}@local`, `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${ymd}`, `SUMMARY:${e.title.replace(/\n/g, ' ')}`);
      if (e.note) lines.push(`DESCRIPTION:${e.note.replace(/\n/g, '\\n')}`);
      lines.push('BEGIN:VALARM', 'TRIGGER:PT0S', 'ACTION:DISPLAY', 'DESCRIPTION:Rappel Maestria', 'END:VALARM', 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  /* ---------- Exercices (réflexes & intuition — notés en 4 paliers de qualité) ---------- */
  function exerciseStats(id) { return (state.exercises && state.exercises.stats[id]) || { count:0, sumQuality:0 }; }
  function exerciseDoneToday(disciplineId) {
    const t = Dates.today();
    return ((state.exercises && state.exercises.dailyLog) || []).find((l) => l.date === t && l.disciplineId === disciplineId);
  }
  function recordExerciseAttempt(exerciseId, disciplineId, quality, isDaily) {
    if (!state.exercises) state.exercises = { stats:{}, dailyLog:[] };
    if (!state.exercises.stats[exerciseId]) state.exercises.stats[exerciseId] = { count:0, sumQuality:0 };
    const st = state.exercises.stats[exerciseId];
    st.count++; st.sumQuality += quality;
    if (isDaily) state.exercises.dailyLog.push({ date: Dates.today(), disciplineId, exerciseId, quality });
    save();
  }

  /* ---------- Calibration (confiance déclarée vs justesse réelle) ---------- */
  function recordCalibration(exerciseId, disciplineId, confidence, correctness) {
    state.calibration = state.calibration || { attempts:[] };
    state.calibration.attempts.push({ date: Dates.today(), exerciseId, disciplineId, confidence, correctness });
    save();
  }
  function calibrationStats() {
    const attempts = (state.calibration && state.calibration.attempts) || [];
    if (!attempts.length) return null;
    const buckets = [25, 50, 75, 100].map((b) => {
      const inBucket = attempts.filter((a) => a.confidence === b);
      const avgCorrectness = inBucket.length ? inBucket.reduce((s, a) => s + a.correctness, 0) / inBucket.length : null;
      return { confidence: b, count: inBucket.length, avgCorrectness };
    });
    const avgGap = attempts.reduce((s, a) => s + (a.confidence / 100 - a.correctness), 0) / attempts.length;
    const overCount = attempts.filter((a) => (a.confidence / 100 - a.correctness) > 0.2).length;
    const underCount = attempts.filter((a) => (a.correctness - a.confidence / 100) > 0.2).length;
    const wellCount = attempts.length - overCount - underCount;
    return { total: attempts.length, buckets, avgGap, overCount, underCount, wellCount, recent: attempts.slice(-10).reverse() };
  }

  /* ---------- Modèles mentaux (bibliothèque + journal d'application) ---------- */
  function mentalModelDone(modelId) { return ((state.mentalModels && state.mentalModels.journal) || []).some((e) => e.modelId === modelId); }
  function addMentalModelEntry(modelId, text) {
    state.mentalModels = state.mentalModels || { journal:[] };
    state.mentalModels.journal.push({ date: Dates.today(), modelId, text });
    const xp = Math.round(6 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'mentalmodel') }; // save inclus
  }

  /* ---------- Biais cognitifs (journal « pris en flagrant délit ») ---------- */
  function biasEntriesFor(biasId) { return (state.biasJournal || []).filter((e) => e.biasId === biasId).slice().reverse(); }
  function biasJournalAll() { return (state.biasJournal || []).slice().reverse(); }
  function addBiasEntry(biasId, situation) {
    state.biasJournal = state.biasJournal || [];
    state.biasJournal.push({ date: Dates.today(), biasId, situation });
    const xp = Math.round(6 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'bias') }; // save inclus
  }

  /* ---------- Journal de victoires (antidote à la dévalorisation du positif) ---------- */
  function victoriesAll() { return (state.victories || []).slice().reverse(); }
  function victoryOfToday() {
    const list = state.victories || [];
    if (!list.length) return null;
    const dayIdx = Number(Dates.today().replace(/-/g, ''));
    return list[dayIdx % list.length];
  }
  function addVictory(text) {
    state.victories = state.victories || [];
    state.victories.push({ date: Dates.today(), text });
    const xp = Math.round(6 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'victory') }; // save inclus
  }

  /* ---------- Atelier de pensée : essai hebdomadaire + steel-man ---------- */
  function essayWeekKey(dateKey) {
    const d = new Date(dateKey + 'T00:00:00');
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  }
  function essayDoneThisWeek() {
    const wk = essayWeekKey(Dates.today());
    return (state.essays || []).find((e) => e.weekKey === wk);
  }
  function addEssay(promptId, text) {
    state.essays = state.essays || [];
    const wk = essayWeekKey(Dates.today());
    state.essays.push({ weekKey: wk, promptId, text, date: Dates.today() });
    const xp = Math.round(15 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'essay') }; // save inclus
  }
  function essaysAll() { return (state.essays || []).slice().reverse(); }

  function addSteelman(opinion, counterArgument) {
    state.steelmans = state.steelmans || [];
    state.steelmans.push({ date: Dates.today(), opinionDate: opinion.date, readingId: opinion.readingId,
      opinionTitle: opinion.title, opinionTheme: opinion.theme, opinionText: opinion.text, counterArgument });
    const xp = Math.round(8 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'steelman') }; // save inclus
  }
  function steelmansAll() { return (state.steelmans || []).slice().reverse(); }
  function steelmansFor(opinionDate, readingId) { return (state.steelmans || []).filter((s) => s.opinionDate === opinionDate && s.readingId === readingId); }

  /* ---------- Prise de parole (l'audio n'est jamais persisté, seule l'auto-évaluation l'est) ---------- */
  function addSpeakingEntry(topic, rating) {
    state.speaking = state.speaking || { log:[] };
    state.speaking.log.push({ date: Dates.today(), topic, rating });
    const xp = Math.round(6 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'speaking') }; // save inclus
  }
  function speakingLogAll() { return ((state.speaking && state.speaking.log) || []).slice().reverse(); }

  /* ---------- Cockpit stage : pipeline de candidatures ---------- */
  function applicationsAll() { return (state.applications || []).slice().reverse(); }
  function addApplication(company, status) {
    state.applications = state.applications || [];
    state.applications.push({ id:'app_'+Date.now()+'_'+Math.random().toString(36).slice(2,6), company, status: status || 'contacter', date: Dates.today() });
    save();
  }
  function updateApplicationStatus(id, status) {
    const a = (state.applications || []).find((x) => x.id === id);
    if (a) { a.status = status; save(); }
  }
  function removeApplication(id) { state.applications = (state.applications || []).filter((a) => a.id !== id); save(); }

  /* ---------- Simulateur d'entretien (noté comme les Exercices, sélection pondérée réutilisée) ---------- */
  function recordInterviewAttempt(questionId, category, quality) {
    state.interviewLog = state.interviewLog || [];
    state.interviewLog.push({ date: Dates.today(), questionId, category, quality });
    save();
  }
  function interviewLogAll() { return (state.interviewLog || []).slice().reverse(); }
  function interviewStatsFor(questionId) {
    const entries = (state.interviewLog || []).filter((l) => l.questionId === questionId);
    return { count: entries.length, sumQuality: entries.reduce((a, l) => a + l.quality, 0) };
  }

  /* ---------- Grands Débats (dossiers à deux voix + journal de synthèse) ---------- */
  function debateDone(debateId) { return ((state.debateJournal || [])).some((e) => e.debateId === debateId); }
  function debateEntriesFor(debateId) { return (state.debateJournal || []).filter((e) => e.debateId === debateId).slice().reverse(); }
  function addDebateEntry(debateId, reasoning) {
    state.debateJournal = state.debateJournal || [];
    state.debateJournal.push({ date: Dates.today(), debateId, reasoning });
    const xp = Math.round(8 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'debate') }; // save inclus
  }

  /* ---------- Sophismes en action (reconnaissance, pas de gating) ---------- */
  function fallacyDone(fallacyId) { return ((state.fallacyJournal || [])).some((e) => e.fallacyId === fallacyId); }
  function fallacyEntriesFor(fallacyId) { return (state.fallacyJournal || []).filter((e) => e.fallacyId === fallacyId).slice().reverse(); }
  function addFallacyEntry(fallacyId, example) {
    state.fallacyJournal = state.fallacyJournal || [];
    state.fallacyJournal.push({ date: Dates.today(), fallacyId, example });
    const xp = Math.round(6 * H.streakMultiplier());
    return { xp, ...addXp('lettres', xp, 'fallacy') }; // save inclus
  }

  /* ---------- Journal de prédictions (calibration appliquée à la vraie vie) ---------- */
  function predictionsAll() { return (state.predictions || []).slice().reverse(); }
  function addPrediction(event, confidence) {
    state.predictions = state.predictions || [];
    state.predictions.push({ id:'pred_'+Date.now()+'_'+Math.random().toString(36).slice(2,6), date: Dates.today(), event, confidence, resolved:false, outcome:null, resolvedDate:null });
    save();
  }
  function resolvePrediction(id, outcome) {
    const p = (state.predictions || []).find((x) => x.id === id);
    if (p) { p.resolved = true; p.outcome = outcome; p.resolvedDate = Dates.today(); save(); }
  }
  function removePrediction(id) { state.predictions = (state.predictions || []).filter((p) => p.id !== id); save(); }
  const PREDICTION_OUTCOME_SCORE = { oui:1, non:0, partiel:0.5 };
  function predictionStats() {
    const resolved = (state.predictions || []).filter((p) => p.resolved && p.outcome);
    if (!resolved.length) return null;
    const buckets = [25, 50, 75, 100].map((b) => {
      const inBucket = resolved.filter((p) => p.confidence === b);
      const avg = inBucket.length ? inBucket.reduce((s, p) => s + PREDICTION_OUTCOME_SCORE[p.outcome], 0) / inBucket.length : null;
      return { confidence: b, count: inBucket.length, avgCorrectness: avg };
    });
    return { total: resolved.length, buckets, pending: (state.predictions || []).filter((p) => !p.resolved).length };
  }

  window.Store = {
    get state() { return state; },
    Dates, H,
    xpForLevel, levelFromXp, levelProgress,
    adaptiveTarget, coachMessage, xpEarnedToday, activityReport,
    daysSinceStart, hardnessPhase, habitDone, setHabit, dailyProgress,
    questProgress, toggleQuestStep,
    addSession, addXp, setCefr, addGoal, toggleGoal, removeGoal,
    refreshBadges, save, reset,
    City, lessonDone, markLessonDone,
    earStats, recordEarAttempt, addImproEntry,
    notesForDate, notesDays, addNote, removeNote,
    eventsForDate, eventsInRange, addCalendarEvent, removeCalendarEvent, exportCalendarICS,
    exerciseStats, exerciseDoneToday, recordExerciseAttempt,
    recordCalibration, calibrationStats,
    mentalModelDone, addMentalModelEntry,
    biasEntriesFor, biasJournalAll, addBiasEntry,
    victoriesAll, victoryOfToday, addVictory,
    essayWeekKey, essayDoneThisWeek, addEssay, essaysAll,
    addSteelman, steelmansAll, steelmansFor,
    addSpeakingEntry, speakingLogAll,
    applicationsAll, addApplication, updateApplicationStatus, removeApplication,
    recordInterviewAttempt, interviewLogAll, interviewStatsFor,
    debateDone, debateEntriesFor, addDebateEntry,
    fallacyDone, fallacyEntriesFor, addFallacyEntry,
    predictionsAll, addPrediction, resolvePrediction, removePrediction, predictionStats,
    exportJSON, importJSON,
    /* Profils */
    getProfiles, createProfile, deleteProfile, switchProfile,
    hasProfile, activeProfile,
    get activeProfileId() { return activeProfileId; },
  };
})();
