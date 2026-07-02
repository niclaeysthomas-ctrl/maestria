/* ============================================================
   Maestria — Rendu, routage et interactions.
   ============================================================ */
(function () {
  const { DOMAINS, DISCIPLINES, CEFR_LEVELS, DAILY_HABITS, NEW_CARDS_PER_DAY } = window.MAESTRIA_CONFIG;
  const { DECKS, READINGS } = window.MAESTRIA_CONTENT;
  const { COURSES } = window.MAESTRIA_COURSES;
  const S = window.Store;
  const { Dates, H } = S;

  const app = document.getElementById('app');
  const nav = document.getElementById('nav');

  /* État de session (révision une-carte-à-la-fois & mode découverte) */
  let reviewQueue = null, reviewIdx = 0, reviewRevealed = false, reviewMode = 'due';  // 'due' ou 'free'
  let reviewXpEarned = 0;  // XP réellement gagnée pendant la session de dues en cours
  let lastRenderDay = '';  // jour (YYYY-MM-DD) du dernier rendu — pour détecter le passage à un nouveau jour
  let studyDeckId = null, studyIdx = 0, studyFlip = false;

  /* Mélange un tableau (copie, Fisher-Yates) — pour l'entraînement libre. */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* Audio : prononciation via Web Speech API */
  function playAudio(text, lang = 'ar') {
    if (!('speechSynthesis' in window)) { toast('Audio non supporté sur ce navigateur'); return; }
    window.speechSynthesis.cancel();  // arrête l'audio précédent
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;  // un peu plus lent pour la clarté
    window.speechSynthesis.speak(utterance);
  }

  /* ---------- Utils ---------- */
  const esc = (s) => String(s==null?'':s).replace(/[&<>"']/g, (c) =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function download(filename, text, mime='text/plain') {
    const blob = new Blob([text],{type:mime}), url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function toast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
    t.textContent=msg; t.classList.add('show');
    clearTimeout(t._h); t._h=setTimeout(() => t.classList.remove('show'), 2800);
  }
  function xpBar(xp, color) {
    const p = S.levelProgress(xp);
    return `<div class="xpbar"><div class="xpbar-fill" style="width:${p.pct}%;background:${color}"></div>
      <span class="xpbar-label">Nv ${p.level} · ${p.into}/${p.span} XP</span></div>`;
  }
  function lineChart(data, color, higherBetter=true) {
    if (!data||data.length<2) return `<p class="muted small">Pas encore assez de points pour tracer une courbe.</p>`;
    const W=320,Hh=110,pad=22;
    const vals=data.map((d)=>d.value), min=Math.min(...vals), max=Math.max(...vals), span=(max-min)||1;
    const x=(i)=>pad+(i/(data.length-1))*(W-pad*2);
    const y=(v)=>Hh-pad-((v-min)/span)*(Hh-pad*2);
    const pts=data.map((d,i)=>`${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
    const area=`${pad},${Hh-pad} ${pts} ${W-pad},${Hh-pad}`;
    const delta=data[data.length-1].value-data[0].value;
    const good=higherBetter?delta>=0:delta<=0;
    return `<svg viewBox="0 0 ${W} ${Hh}" class="chart" preserveAspectRatio="xMidYMid meet">
      <polygon points="${area}" fill="${color}" opacity="0.12"></polygon>
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
      ${data.map((d,i)=>`<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="2.5" fill="${color}"/>`).join('')}
      <text x="${pad}" y="14" class="chart-min">${data[0].value}</text>
      <text x="${W-pad}" y="14" text-anchor="end" class="chart-max" fill="${good?'#10b981':'#ef4444'}">${data[data.length-1].value} (${delta>=0?'+':''}${Math.round(delta*10)/10})</text>
    </svg>`;
  }
  function streakStrip() {
    const days=H.activeDates();
    let cells='';
    for (let i=27;i>=0;i--) { const key=Dates.addDays(Dates.today(),-i); cells+=`<span class="hcell ${days.has(key)?'on':''}" title="${key}"></span>`; }
    return `<div class="heat">${cells}</div>`;
  }

  /* ======================================================
     SÉLECTION DE PROFIL
     ====================================================== */
  function viewProfilePicker() {
    nav.hidden = true;
    const profiles = S.getProfiles();
    if (profiles.length === 0) {
      app.innerHTML = `
        <div class="profile-screen">
          <div class="profile-hero">
            <div class="profile-logo">⚔️</div>
            <h1>Maestria</h1>
            <p class="muted">Tracker de maîtrise gamifié</p>
          </div>
          <div class="card">
            <h3>Crée ton profil</h3>
            <form id="create-profile-form" class="stack">
              <input name="name" placeholder="Ton prénom" required autofocus>
              <button class="btn primary" type="submit">Entrer dans l'arène →</button>
            </form>
          </div>
        </div>`;
    } else {
      const cards = profiles.map((p) => {
        const gl = (() => { try { const raw=localStorage.getItem(`maestria_state_v1_${p.id}`);
          if(!raw) return 1; const s=JSON.parse(raw); const xp=Object.values(s.disciplines||{}).reduce((a,d)=>a+d.xp,0); return S.levelFromXp(xp); } catch{return 1;} })();
        return `<button class="profile-card" data-pick-profile="${p.id}">
          <span class="profile-avatar">${esc(p.name[0]).toUpperCase()}</span>
          <div class="profile-card-info"><b>${esc(p.name)}</b><span class="muted small">Niveau ${gl}</span></div>
          <span class="profile-arrow">→</span>
        </button>`;
      }).join('');
      app.innerHTML = `
        <div class="profile-screen">
          <div class="profile-hero">
            <div class="profile-logo">⚔️</div>
            <h1>Qui entre dans l'arène ?</h1>
          </div>
          <div class="profiles-list">${cards}</div>
          <div class="card">
            <h3>Nouveau profil</h3>
            <form id="create-profile-form" class="row">
              <input name="name" placeholder="Prénom" required>
              <button class="btn" type="submit">+</button>
            </form>
          </div>
          <button class="btn block" id="manage-profiles-btn">Gérer les profils</button>
        </div>`;
    }
  }

  /* ======================================================
     AUJOURD'HUI (accueil)
     ====================================================== */
  function viewToday() {
    nav.hidden = false;
    const gl = S.levelProgress(H.globalXp());
    const streak = H.currentStreak();
    const coach = S.coachMessage();
    const phase = S.hardnessPhase();
    const dp = S.dailyProgress();
    const due = window.SRS.dueCount();
    const xpToday = S.xpEarnedToday();
    const reading = readingOfToday();
    const readDone = reading && (S.state.readingLog || []).some((x) => x.date === Dates.today() && x.readingId === reading.id);
    const profile = S.activeProfile();
    const name = profile ? profile.name.split(' ')[0] : '';

    const habitsHTML = dp.items.map(({ habit, done }) => `
      <button class="quest ${done ? 'done' : ''} ${habit.auto ? 'auto' : ''}" ${habit.auto ? 'disabled' : `data-habit="${habit.id}"`}>
        <span class="quest-check">${done ? '✓' : ''}</span>
        <span class="quest-ic">${habit.icon}</span>
        <span class="quest-name">${esc(habit.name)}</span>
        ${habit.auto ? `<span class="quest-auto">auto</span>` : ''}
      </button>`).join('');

    const lessonDecks = Object.values(DECKS)
      .map((deck) => ({ deck, p: window.SRS.deckProgress(deck.id) }))
      .filter(({ p }) => p.enrolled < p.total);
    const lessonsHTML = lessonDecks.length ? lessonDecks.map(({ deck, p }) => {
      const remaining = p.total - p.enrolled;
      const n = Math.min(NEW_CARDS_PER_DAY, remaining);
      const disc = DISCIPLINES[deck.disciplineId];
      return `<div class="lesson">
        <div class="lesson-info"><b>${deck.icon} ${esc(deck.name)}</b>
          <span class="muted small">${p.enrolled}/${p.total} cartes · ${disc ? esc(disc.name) : ''}</span></div>
        <div class="deck-qty">
          <button class="btn small" data-go="#/study/${deck.id}">Voir</button>
          <button class="btn small primary" data-lesson="${deck.id}:${Math.min(8,remaining)}">+${Math.min(8,remaining)}</button>
          ${remaining > 8 ? `<button class="btn small" data-lesson="${deck.id}:${Math.min(15,remaining)}">+15</button>` : ''}
          ${remaining > 15 ? `<button class="btn small" data-lesson="${deck.id}:${Math.min(20,remaining)}">+20</button>` : ''}
        </div>
      </div>`;
    }).join('') : `<p class="muted small">Tous les decks de base sont lancés. Va dans <b>Apprendre</b> pour importer les tiens.</p>`;

    const questsHTML = S.state.quests.map((q) => {
      const qp = S.questProgress(q);
      const steps = q.steps.map((s) => `<li class="qstep ${s.done ? 'done' : ''}">
        <button class="check" data-qstep="${q.id}:${s.id}">${s.done ? '✓' : ''}</button>
        <span>${esc(s.text)}</span></li>`).join('');
      return `<div class="card quest-card ${q.completed ? 'won' : ''}">
        <div class="quest-head"><span class="dicon">${q.icon}</span>
          <div><h3>${esc(q.title)}</h3>
            <span class="muted small">${qp.done}/${qp.total} étapes · +${q.xp} XP au boss</span></div></div>
        <div class="xpbar slim"><div class="xpbar-fill" style="width:${qp.pct}%;background:#0ea5e9"></div></div>
        <ul class="qsteps">${steps}</ul></div>`;
    }).join('');

    const allDiscs = Object.keys(DISCIPLINES);
    const dayIdx = Number(Dates.today().replace(/-/g, ''));
    const picks = [...new Set([0, 1, 2].map((k) => allDiscs[(dayIdx + k) % allDiscs.length]))];
    const sugHTML = picks.map((did) => {
      const c = DISCIPLINES[did];
      if (!c || !c.suggestions || !c.suggestions.length) return '';
      const sg = c.suggestions[dayIdx % c.suggestions.length];
      return `<button class="card sug" data-go="#/d/${did}">
        <span class="sug-ic">${c.icon}</span>
        <div class="sug-main"><b>${esc(sg.title)}</b><span class="muted small">${esc(c.name)} · ${sg.durationMin} min</span></div>
        <span class="sug-arrow">→</span></button>`;
    }).join('');

    app.innerHTML = `
      <header class="hero">
        <div class="hero-top">
          <div>
            <span class="muted small">${esc(Dates.label(Dates.today()))} · Niveau ${gl.level} · +${xpToday} XP aujourd'hui</span>
            <h1>Salut ${esc(name)}</h1>
          </div>
          <div class="streak-badge ${streak > 0 ? 'live' : ''}">🔥 ${streak}<span>jours</span></div>
        </div>
        <div class="pv">
          <div class="pv-top"><span>Quêtes du jour</span><b>${dp.doneCount}/${dp.total}</b></div>
          <div class="xpbar"><div class="xpbar-fill" style="width:${dp.pct}%;background:${dp.pct >= 100 ? '#10b981' : '#a78bfa'}"></div></div>
        </div>
      </header>

      <div class="card coach coach-${coach.tone}">
        <div class="coach-head">⚔️ Le Coach <span class="phase-tag">${phase === 'doux' ? 'rodage' : 'exigeant'}</span></div>
        <p>${esc(coach.text)}</p>
      </div>

      <h2 class="section">Quêtes non négociables</h2>
      <div class="quests">${habitsHTML}</div>

      ${due > 0 ? `<button class="card cta" data-go="#/review">🧠 ${due} révision${due > 1 ? 's' : ''} t'attendent →</button>`
                : `<div class="card empty small">✅ Révisions du jour faites.</div>`}

      ${reading ? `<button class="card cta" data-go="#/read">${reading.icon} Lecture du jour · <span class="muted small">${esc(reading.theme)}</span><br>${esc(reading.title)} ${readDone ? '<span class="badge">✓ lu</span>' : '→'}</button>` : ''}

      <button class="card cta" data-go="#/city">🏰 Ta Cité ${S.City.pierresAvailable() > 0 ? `· <span class="badge">${S.City.pierresAvailable()} 🪨 à dépenser</span>` : `<span class="muted small">· monte de niveau pour bâtir</span>`} →</button>

      <h2 class="section">📖 Leçon du jour</h2>
      <div class="card lessons">${lessonsHTML}</div>

      <h2 class="section">🎯 Tes boss</h2>
      ${questsHTML}

      <h2 class="section">💡 Séances suggérées</h2>
      ${sugHTML}
    `;
  }

  /* ======================================================
     APPRENDRE (decks de cartes)
     ====================================================== */
  function viewLearn() {
    nav.hidden = false;
    const decksByDisc = {};
    Object.values(DECKS).forEach((d) => { (decksByDisc[d.disciplineId] = decksByDisc[d.disciplineId] || []).push(d); });

    const blocks = Object.keys(decksByDisc).map((did) => {
      const c = DISCIPLINES[did], dom = DOMAINS[c.domain];
      const cards = decksByDisc[did].map((deck) => {
        const p = window.SRS.deckProgress(deck.id);
        const remaining = p.total - p.enrolled, n = Math.min(NEW_CARDS_PER_DAY, remaining);
        const pct = p.total ? Math.round(p.enrolled / p.total * 100) : 0;
        return `<div class="card deck" style="--c:${dom.color}">
          <div class="deck-head"><b>${deck.icon} ${esc(deck.name)}</b>
            <span class="muted small">${esc(deck.desc)}</span></div>
          <div class="xpbar slim"><div class="xpbar-fill" style="width:${pct}%;background:${dom.color}"></div></div>
          <div class="deck-foot">
            <span class="muted small">${p.enrolled}/${p.total} lancées · ${p.mastered} maîtrisées</span>
            ${remaining > 0 ? `<div class="deck-qty">
              <button class="btn small" data-go="#/study/${deck.id}">Découvrir</button>
              <button class="btn small primary" data-lesson="${deck.id}:${Math.min(8,remaining)}">+${Math.min(8,remaining)}</button>
              ${remaining > 8 ? `<button class="btn small" data-lesson="${deck.id}:${Math.min(15,remaining)}">+15</button>` : ''}
              ${remaining > 15 ? `<button class="btn small" data-lesson="${deck.id}:${Math.min(20,remaining)}">+20</button>` : ''}
            </div>` : `<span class="badge">✓ complet</span>`}
          </div></div>`;
      }).join('');
      return `<h2 class="section">${c.icon} ${esc(c.name)}</h2>${cards}`;
    }).join('');

    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">📖</span>
        <div><h1>Apprendre</h1><span class="muted small">Decks de cartes · façon Anki</span></div></div></header>
      ${S.state.journal.length > 0 ? `<button class="card cta" data-go="#/review/free">🎯 Entraînement libre — réviser sans pression, quand je veux</button>` : ''}
      ${blocks}
      <h2 class="section">➕ Importer mes cartes</h2>
      <div class="card">
        <p class="muted small">Une carte par ligne : <code>recto, verso</code> (virgule, point-virgule ou tabulation). Depuis Anki : « Exporter → Notes au format texte ».</p>
        <form id="import-cards-form" class="stack">
          <select name="discipline">${Object.values(DISCIPLINES).map((d) => `<option value="${d.id}">${d.icon} ${esc(d.name)}</option>`).join('')}</select>
          <textarea name="csv" rows="5" placeholder="casa, maison&#10;perro, chien"></textarea>
          <button class="btn primary" type="submit">Importer dans le SRS</button>
        </form>
      </div>`;
  }

  /* ======================================================
     DASHBOARD
     ====================================================== */
  function viewDashboard() {
    nav.hidden = false;
    const gl=S.levelProgress(H.globalXp()), streak=H.currentStreak(), coach=S.coachMessage(), tgt=S.adaptiveTarget();
    const due=window.SRS.dueCount(), earnedBadges=S.state.badges;
    const profile=S.activeProfile();

    const domainsHTML = Object.values(DOMAINS).map((dom) => {
      const lvl=H.domainLevel(dom.id), xp=H.domainXp(dom.id);
      const discs=Object.values(DISCIPLINES).filter((d)=>d.domain===dom.id);
      const sub=discs.map((d)=>`<button class="chip" data-go="#/d/${d.id}" style="--c:${dom.color}">
        ${d.icon} ${esc(d.name)} <b>Nv ${H.disciplineLevel(d.id)}</b></button>`).join('');
      return `<div class="card domain" style="--c:${dom.color}">
        <div class="domain-head"><span class="dicon">${dom.icon}</span>
          <div><h3>${esc(dom.name)}</h3><span class="muted small">Niveau ${lvl} · ${xp} XP</span></div></div>
        ${xpBar(xp,dom.color)}<div class="chips">${sub}</div></div>`;
    }).join('');

    const badgesHTML = earnedBadges.length
      ? earnedBadges.map((id)=>{ const b=window.MAESTRIA_CONFIG.BADGES.find((x)=>x.id===id);
          return `<span class="badge" title="${esc(b.desc)}">${b.icon} ${esc(b.name)}</span>`; }).join('')
      : `<span class="muted small">Aucun badge encore. La première activité en débloque un.</span>`;

    app.innerHTML = `
      <header class="hero">
        <div class="hero-top">
          <div>
            ${profile ? `<span class="muted small">${esc(profile.name)} —</span>` : ''}
            <h1>Niveau global ${gl.level}</h1>
          </div>
          <div class="streak-badge ${streak>0?'live':''}">🔥 ${streak}<span>jours</span></div>
        </div>
        ${xpBar(H.globalXp(),'#a78bfa')}
        ${streakStrip()}
      </header>

      <div class="card coach coach-${coach.tone}">
        <div class="coach-head">⚔️ Le Coach</div>
        <p>${esc(coach.text)}</p>
        <div class="target">
          <span>Objectif semaine : ${tgt.done}/${tgt.target} jours actifs</span>
          <div class="xpbar slim"><div class="xpbar-fill" style="width:${Math.min(100,(tgt.done/tgt.target)*100)}%;background:#a78bfa"></div></div>
        </div>
      </div>

      ${due>0?`<button class="card cta" data-go="#/review">🧠 ${due} révision${due>1?'s':''} à faire aujourd'hui →</button>`:''}

      <h2 class="section">Domaines</h2>
      <div class="grid">${domainsHTML}</div>

      <h2 class="section">Trophées</h2>
      <div class="card badges">${badgesHTML}</div>
    `;
  }

  /* ======================================================
     DISCIPLINE
     ====================================================== */
  function viewDiscipline(id) {
    nav.hidden = false;
    const cfg=DISCIPLINES[id]; if (!cfg) { location.hash='#/'; return; }
    const d=S.state.disciplines[id], dom=DOMAINS[cfg.domain];

    /* Suggestions */
    const suggestHTML = cfg.suggestions && cfg.suggestions.length ? `
      <div class="card suggest-card">
        <details>
          <summary><h3>💡 Suggestions d'entraînement</h3></summary>
          <div class="suggest-list">
            ${cfg.suggestions.map((sg,i)=>`
              <button class="suggest-item" data-suggest="${id}:${i}">
                <div class="suggest-main">
                  <b>${esc(sg.title)}</b>
                  <span class="muted small">${esc(sg.desc)}</span>
                </div>
                <span class="suggest-meta">${sg.durationMin} min</span>
              </button>`).join('')}
          </div>
        </details>
      </div>` : '';

    const skillChecks = cfg.skills.map((sk)=>`<label class="skbox"><input type="checkbox" name="sk" value="${esc(sk)}"> ${esc(sk)}</label>`).join('');
    const metricInputs = cfg.metrics.map((m)=>`<label class="field"><span>${esc(m.name)} ${m.unit?`(${m.unit})`:''}</span>
      <input type="number" step="any" name="m_${m.id}" placeholder="valeur"></label>`).join('');

    const skillsHTML = cfg.skills.map((sk)=>{
      const xp=H.skillXp(id,sk), p=S.levelProgress(xp);
      return `<div class="skill"><div class="skill-top"><span>${esc(sk)}</span><b>Nv ${p.level}</b></div>
        <div class="xpbar slim"><div class="xpbar-fill" style="width:${p.pct}%;background:${dom.color}"></div></div></div>`;
    }).join('');

    const metricsHTML = cfg.metrics.map((m)=>{
      const series=d.metrics[m.id]||[], lastVal=series.length?series[series.length-1].value:'—';
      return `<div class="card"><div class="metric-head"><h3>${esc(m.name)}</h3>
        <span class="metric-val">${lastVal}${m.unit?' '+m.unit:''}</span></div>
        ${lineChart(series,dom.color,m.higherBetter)}</div>`;
    }).join('');

    let cefrHTML='';
    if (cfg.features&&cfg.features.cefr) {
      cefrHTML=`<div class="card"><h3>Niveau CECRL</h3><div class="cefr">`+
        ['Oral','Écrit','Compréhension orale'].map((cmp)=>{
          const cur=d.cefr[cmp]||'—';
          const opts=['—',...CEFR_LEVELS].map((l)=>`<option ${l===cur?'selected':''}>${l}</option>`).join('');
          return `<label class="field"><span>${esc(cmp)}</span><select data-cefr="${esc(cmp)}">${opts}</select></label>`;
        }).join('')+'</div></div>';
    }

    let journalHTML='';
    if (cfg.features&&cfg.features.journal) {
      const entries=S.state.journal.filter((e)=>e.disciplineId===id).slice(0,8);
      const list=entries.length?entries.map((e)=>`<li>
        <div><b>${esc(e.title)}</b> <span class="muted small">· boîte ${e.box} · revoir le ${Dates.label(e.nextReview)}</span>
        ${e.note?`<div class="muted small">${esc(e.note)}</div>`:''}</div>
        <button class="icon-btn" data-del-knol="${e.id}">✕</button></li>`).join('')
        :`<li class="muted small">Ajoute ta première connaissance ci-dessus.</li>`;
      journalHTML=`<div class="card"><h3>📚 Journal de connaissances</h3>
        <form id="knol-form" class="stack">
          <input name="title" placeholder="Une chose apprise (ex. « Théorème de Thalès »)" required>
          <input name="note" placeholder="Détail / définition (optionnel)">
          <button class="btn primary" type="submit">Ajouter (+ révisions auto)</button>
        </form>
        <ul class="knol-list">${list}</ul></div>`;
    }

    const goals=d.goals.map((g)=>`<li class="goal ${g.done?'done':''}">
      <button class="check" data-goal="${g.id}">${g.done?'✓':''}</button>
      <span>${esc(g.text)}</span>
      <button class="icon-btn" data-del-goal="${g.id}">✕</button></li>`).join('')||
      `<li class="muted small">Aucun objectif. Fixe-t'en un, ça vaut 40 XP une fois atteint.</li>`;

    const sessions=d.sessions.slice(0,6).map((se)=>`<li>
      <span class="muted small">${Dates.label(se.date)}</span>
      <b>${se.durationMin} min</b> · intensité ${se.intensity}/5
      ${se.skills.length?`· ${se.skills.map(esc).join(', ')}`:''} ${se.note?`<div class="muted small">${esc(se.note)}</div>`:''}</li>`).join('')||
      `<li class="muted small">Aucune séance loggée.</li>`;

    app.innerHTML = `
      <header class="dhead" style="--c:${dom.color}">
        <button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">${cfg.icon}</span>
          <div><h1>${esc(cfg.name)}</h1>
          <span class="muted small">${dom.icon} ${esc(dom.name)} · ${d.sessions.length} séance(s)</span></div></div>
      </header>
      ${xpBar(d.xp,dom.color)}

      ${COURSES[id]?`<button class="card cta" data-go="#/course/${id}">🎸 ${esc(COURSES[id].title)} — le cours →</button>`:''}
      ${cfg.features&&cfg.features.metronome?`<button class="card cta" data-go="#/tools">🎼 Ouvrir le métronome →</button>`:''}
      ${cfg.features&&cfg.features.decks?`<button class="card cta" data-go="#/learn">📖 Decks de cartes (façon Anki) →</button>`:''}

      ${suggestHTML}

      <div class="card">
        <h3>＋ Logger une séance</h3>
        <form id="session-form" class="stack">
          <div class="row">
            <label class="field"><span>Durée (min)</span><input type="number" name="durationMin" value="30" min="1"></label>
            <label class="field"><span>Intensité</span>
              <select name="intensity"><option value="1">1 · light</option><option value="2">2</option>
              <option value="3" selected>3 · normal</option><option value="4">4</option><option value="5">5 · max</option></select></label>
          </div>
          ${metricInputs?`<div class="row">${metricInputs}</div>`:''}
          <span class="muted small">Compétences travaillées</span>
          <div class="skgrid">${skillChecks}</div>
          <input name="note" placeholder="Note (optionnel)" id="session-note">
          <button class="btn primary" type="submit">Enregistrer la séance</button>
        </form>
      </div>

      ${journalHTML}
      ${cefrHTML}
      <div class="card"><h3>Compétences</h3>${skillsHTML}</div>
      ${metricsHTML}
      <div class="card"><h3>🎯 Objectifs</h3>
        <form id="goal-form" class="row"><input name="text" placeholder="Nouvel objectif" required>
          <button class="btn" type="submit">+</button></form>
        <ul class="goals">${goals}</ul></div>
      <div class="card"><h3>Séances récentes</h3><ul class="sessions">${sessions}</ul></div>
    `;
  }

  /* ======================================================
     LECTURE DU JOUR (corpus de textes + compréhension)
     ====================================================== */
  function readingOfToday() {
    if (!READINGS || !READINGS.length) return null;
    const dayIdx = Number(Dates.today().replace(/-/g, ''));
    return READINGS[dayIdx % READINGS.length];
  }

  function viewReading() {
    nav.hidden = false;
    const r = readingOfToday();
    if (!r) { app.innerHTML = `<div class="card empty">Aucun texte disponible.</div>`; return; }
    const done = (S.state.readingLog || []).find((x) => x.date === Dates.today() && x.readingId === r.id);

    const head = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">${r.icon}</span>
          <div><h1>Lecture du jour</h1><span class="muted small">${esc(r.theme)} · ${esc(r.source)}</span></div></div></header>
      <article class="card reading">
        <h2 class="read-title">${esc(r.title)}</h2>
        ${r.body.map((p) => `<p class="read-p">${esc(p)}</p>`).join('')}
      </article>`;

    if (done) {
      const qHTML = r.questions.map((q, i) => {
        const chosen = done.answers[i], ok = chosen === q.answer;
        const opts = q.choices.map((c, j) =>
          `<li class="${j === q.answer ? 'good' : (j === chosen ? 'bad' : '')}">${j === q.answer ? '✓' : (j === chosen ? '✗' : '·')} ${esc(c)}</li>`).join('');
        return `<div class="read-q ${ok ? 'ok' : 'ko'}"><p><b>${esc(q.q)}</b></p><ul class="read-opts">${opts}</ul></div>`;
      }).join('');
      app.innerHTML = `${head}
        <div class="card empty small">✅ Lu aujourd'hui · <b>${done.correct}/${done.total}</b> bonnes réponses${done.xp ? ` · +${done.xp} XP` : ''}</div>
        ${qHTML}
        ${done.opinion ? `<h2 class="section">📝 Ta position</h2><div class="card"><p>${esc(done.opinion)}</p></div>` : ''}
        <button class="btn block" data-go="#/read/opinions">📚 Mon journal d'opinions →</button>
        <button class="card cta" data-go="#/">‹ Retour à Aujourd'hui</button>`;
      return;
    }

    const qFormHTML = r.questions.map((q, i) => `
      <div class="read-q">
        <p><b>${i + 1}. ${esc(q.q)}</b></p>
        <div class="read-choices">
          ${q.choices.map((c, j) => `<label class="read-choice"><input type="radio" name="q${i}" value="${j}"> <span>${esc(c)}</span></label>`).join('')}
        </div>
      </div>`).join('');
    app.innerHTML = `${head}
      <form id="reading-form">
        <h2 class="section">🧐 As-tu bien lu ?</h2>
        ${qFormHTML}
        <h2 class="section">📝 Ta position</h2>
        <div class="card">
          <p class="muted small">${esc(r.reflection)}</p>
          <textarea name="opinion" rows="4" placeholder="Écris ta position en quelques lignes…"></textarea>
        </div>
        <button class="btn primary block" type="submit">Valider ma lecture</button>
      </form>`;
  }

  function viewOpinions() {
    nav.hidden = false;
    const ops = (S.state.opinions || []).slice().reverse();
    const list = ops.length ? ops.map((o) => `
      <div class="card">
        <div class="muted small">${esc(Dates.label(o.date))} · ${esc(o.theme)}</div>
        <b>${esc(o.title)}</b><p>${esc(o.text)}</p>
      </div>`).join('') : `<div class="card empty">Pas encore d'opinion écrite. Lis le texte du jour et prends position.</div>`;
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/read">‹</button>
        <div class="dhead-main"><span class="dicon big">📚</span>
          <div><h1>Journal d'opinions</h1><span class="muted small">Tes positions, une lecture à la fois</span></div></div></header>
      ${list}`;
  }

  /* ======================================================
     LA CITÉ (village gamifié — scène SVG)
     ====================================================== */
  const BUILDING_NAMES = { corps:'Le Dojo', art:'La Scène', esprit:'La Grande Bibliothèque', langues:'La Tour des Langues' };
  const BUILDING_EMBLEM = { corps:'🥊', art:'🎶', esprit:'📚', langues:'🗣️', pro:'🏛️' };
  const CITY_COLORS = {
    corps:   { lit:'#e2483f', shadow:'#9e2c2c', roof:'#6f2030', roof2:'#7d2636' },
    art:     { lit:'#f0a020', shadow:'#b9760d', roof:'#7a4a12' },
    pro:     { lit:'#1fa8e0', shadow:'#1379a8', roof:'#145a78' },
    esprit:  { lit:'#6d6ef0', shadow:'#4446b8', roof:'#2f2f7a' },
    langues: { lit:'#1fc08a', shadow:'#0f8f64', roof:'#0c6a55' },
  };

  /* Palier 0 : chantier (fondation + échafaudage + plan en pointillés). */
  function cityScaffold(cx, gy, lit) {
    return `<ellipse cx="${cx}" cy="${gy+2}" rx="32" ry="5" fill="#14231a" opacity="0.5"/>`
      + `<rect x="${cx-24}" y="${gy-6}" width="48" height="6" fill="#3a3320"/>`
      + `<g stroke="#6b5b3a" stroke-width="2" fill="none"><path d="M${cx-18} ${gy} L${cx-12} ${gy-26} L${cx+12} ${gy-26} L${cx+18} ${gy}"/><line x1="${cx-15}" y1="${gy-13}" x2="${cx+15}" y2="${gy-13}"/></g>`
      + `<rect x="${cx-26}" y="${gy-30}" width="52" height="30" fill="none" stroke="${lit}" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.55"/>`;
  }

  /* Bâtiment paramétrique : chantier au palier 0, puis grandit (étages + détails) avec le palier. */
  function drawBuilding(type, cx, gy, tier) {
    const col = CITY_COLORS[type];
    if (tier <= 0) return cityScaffold(cx, gy, col.lit);
    const SPEC = { corps:{w:64,cap:3,fh:20}, art:{w:68,cap:2,fh:24}, pro:{w:68,cap:4,fh:22}, esprit:{w:66,cap:2,fh:26}, langues:{w:34,cap:3,fh:24} };
    const sp = SPEC[type], w = sp.w, x = cx - w/2;
    const floors = Math.max(1, Math.min(tier, sp.cap));
    const h = 10 + floors*sp.fh, top = gy - h, dpx = 9, dpy = 6;
    const win = (on) => on ? '#ffd66b' : '#2b2c46';
    let s = `<ellipse cx="${cx}" cy="${gy+2}" rx="${w/2+8}" ry="6" fill="#14231a" opacity="0.5"/>`;
    s += `<polygon points="${x+w},${top} ${x+w+dpx},${top-dpy} ${x+w+dpx},${gy-dpy} ${x+w},${gy}" fill="${col.shadow}"/>`;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col.lit}"/>`;

    if (type === 'esprit') {
      for (let i = 0; i < 4; i++) { const cxx = x + 8 + i*((w-16)/3) - 3; s += `<rect x="${cxx}" y="${top+8}" width="6" height="${h-8}" fill="#d8d8f5"/>`; }
      s += `<rect x="${cx-7}" y="${gy-20}" width="14" height="20" fill="#241726"/>`;
    } else if (type === 'langues') {
      for (let f = 0; f < floors; f++) { const wy = gy-(f+1)*sp.fh+6; s += `<rect x="${cx-4}" y="${wy}" width="9" height="13" rx="1" fill="${win(true)}"/>`; }
      s += `<rect x="${cx-7}" y="${gy-18}" width="14" height="18" fill="#241726"/>`;
    } else {
      for (let f = 0; f < floors; f++) {
        const wy = gy-(f+1)*sp.fh+6;
        s += `<rect x="${x+8}" y="${wy}" width="13" height="15" rx="1" fill="${win(f!==1)}"/>`;
        s += `<rect x="${x+w-21}" y="${wy}" width="13" height="15" rx="1" fill="${win(true)}"/>`;
      }
      s += `<rect x="${cx-9}" y="${gy-24}" width="18" height="24" fill="#241726"/>`;
    }

    if (type === 'corps') {
      s += `<polygon points="${x-9},${top} ${x+w+9},${top} ${x+w-7},${top-15} ${x+7},${top-15}" fill="${col.roof}"/>`;
      s += `<polygon points="${x+3},${top-15} ${x+w-3},${top-15} ${x+w-13},${top-28} ${x+13},${top-28}" fill="${col.roof2}"/>`;
      s += `<rect x="${cx-3}" y="${top-34}" width="6" height="8" fill="${col.roof}"/>`;
    } else if (type === 'art') {
      s += `<path d="M${x},${top} A${w/2},30 0 0 1 ${x+w},${top} Z" fill="${col.roof}"/>`;
      s += `<rect x="${x+6}" y="${top+4}" width="${w-12}" height="11" rx="2" fill="#2a1c30"/>`;
      s += `<circle cx="${x+w*0.3}" cy="${top+9}" r="2" fill="#ffd66b"/><circle cx="${cx}" cy="${top+9}" r="2" fill="#ffd66b"/><circle cx="${x+w*0.7}" cy="${top+9}" r="2" fill="#ffd66b"/>`;
    } else if (type === 'esprit') {
      s += `<rect x="${x-4}" y="${top-4}" width="${w+8}" height="6" fill="${col.roof}"/>`;
      s += `<polygon points="${x-4},${top-4} ${x+w+4},${top-4} ${cx},${top-26}" fill="${col.roof}"/>`;
    } else if (type === 'langues') {
      s += `<polygon points="${x-4},${top} ${x+w+4},${top} ${cx},${top-24}" fill="${col.roof}"/>`;
      s += `<line x1="${cx}" y1="${top-24}" x2="${cx}" y2="${top-38}" stroke="#cdd6ff" stroke-width="1.5"/>`;
      s += `<polygon points="${cx},${top-38} ${cx+16},${top-34} ${cx},${top-30}" fill="${col.lit}"/>`;
    } else {
      for (let i = 0; i < 4; i++) s += `<rect x="${x + i*(w/4)+2}" y="${top-8}" width="8" height="8" fill="${col.roof}"/>`;
      const tw = 32, tx = cx-tw/2, tTop = top-46;
      s += `<polygon points="${tx+tw},${tTop} ${tx+tw+7},${tTop-5} ${tx+tw+7},${top-5} ${tx+tw},${top}" fill="${col.shadow}"/>`;
      s += `<rect x="${tx}" y="${tTop}" width="${tw}" height="${top-tTop}" fill="${col.lit}"/>`;
      s += `<polygon points="${tx-4},${tTop} ${tx+tw+4},${tTop} ${cx},${tTop-16}" fill="${col.roof}"/>`;
      s += `<circle cx="${cx}" cy="${tTop+18}" r="8" fill="#0d2030"/><circle cx="${cx}" cy="${tTop+18}" r="8" fill="none" stroke="#ffd66b" stroke-width="1.5"/>`;
      s += `<line x1="${cx}" y1="${tTop+18}" x2="${cx}" y2="${tTop+12}" stroke="#ffd66b" stroke-width="1.5"/><line x1="${cx}" y1="${tTop+18}" x2="${cx+4}" y2="${tTop+20}" stroke="#ffd66b" stroke-width="1.5"/>`;
      s += `<line x1="${cx}" y1="${tTop-16}" x2="${cx}" y2="${tTop-30}" stroke="#cdd6ff" stroke-width="2"/>`;
      s += `<polygon points="${cx},${tTop-30} ${cx+22},${tTop-24} ${cx},${tTop-18}" fill="${col.lit}"/>`;
    }

    if (tier >= 3 && (type === 'corps' || type === 'esprit')) {
      s += `<line x1="${x+w-6}" y1="${top-2}" x2="${x+w-6}" y2="${top-16}" stroke="#cdd6ff" stroke-width="1.5"/><polygon points="${x+w-6},${top-16} ${x+w+8},${top-12} ${x+w-6},${top-8}" fill="${col.lit}"/>`;
    }
    return s;
  }

  function citySceneSVG() {
    const T = (d) => S.City.buildingTier(d), th = S.City.townHallTier(), gy = 350;
    let stars = '';
    for (let i = 0; i < 30; i++) { const sx = (i*89 % 660) + 10, sy = ((i*53) % 150) + 16, r = (i % 4 === 0 ? 1.5 : 1); stars += `<circle cx="${sx}" cy="${sy}" r="${r}" fill="#dfe6ff" opacity="${0.35 + (i % 4)*0.15}"/>`; }
    return `<svg viewBox="0 0 680 440" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ta Cité">
      <rect x="0" y="0" width="680" height="440" fill="#0f1133"/>
      <rect x="0" y="150" width="680" height="200" fill="#1a1846"/>
      <rect x="0" y="250" width="680" height="120" fill="#271f54"/>
      <rect x="0" y="300" width="680" height="70" fill="#4a2f5e"/>
      <rect x="0" y="332" width="680" height="40" fill="#7a4659"/>
      ${stars}
      <circle cx="566" cy="84" r="66" fill="#f3efce" opacity="0.06"/>
      <circle cx="566" cy="84" r="48" fill="#f3efce" opacity="0.09"/>
      <circle cx="566" cy="84" r="33" fill="#f5f0cf"/>
      <circle cx="556" cy="76" r="6" fill="#e4ddb5"/><circle cx="576" cy="92" r="8" fill="#e4ddb5"/><circle cx="560" cy="98" r="4" fill="#e4ddb5"/>
      <path d="M0,302 Q170,256 340,296 T680,288 L680,440 L0,440 Z" fill="#241c4c"/>
      <path d="M0,332 Q200,300 400,326 T680,322 L680,440 L0,440 Z" fill="#191338"/>
      <path d="M30,380 Q40,348 112,346 L566,346 Q642,349 650,382 L650,440 L30,440 Z" fill="#274332"/>
      <path d="M30,380 Q40,348 112,346 L566,346 Q642,349 650,382" fill="none" stroke="#3a6048" stroke-width="2"/>
      <path d="M30,394 L650,394 L650,440 L30,440 Z" fill="#1b2e22"/>
      <polygon points="318,440 382,440 360,352 344,352" fill="#b99a62"/>
      <line x1="350" y1="440" x2="352" y2="354" stroke="#9c7d49" stroke-width="2" stroke-dasharray="6 8"/>
      <rect x="76" y="330" width="6" height="22" fill="#2a1c12"/><circle cx="79" cy="320" r="16" fill="#1c3a28"/><circle cx="68" cy="328" r="10" fill="#1c3a28"/><circle cx="90" cy="327" r="10" fill="#1c3a28"/><circle cx="74" cy="315" r="5" fill="#27503a"/>
      <rect x="652" y="338" width="5" height="16" fill="#2a1c12"/><circle cx="654" cy="330" r="12" fill="#1c3a28"/><circle cx="646" cy="335" r="8" fill="#1c3a28"/>
      ${drawBuilding('corps', 128, gy, T('corps'))}
      ${drawBuilding('art', 250, gy, T('art'))}
      ${drawBuilding('pro', 400, gy, th)}
      ${drawBuilding('esprit', 519, gy, T('esprit'))}
      ${drawBuilding('langues', 613, gy, T('langues'))}
      <rect x="320" y="412" width="3" height="16" fill="#2a2a40"/><circle cx="321" cy="410" r="9" fill="#ffd66b" opacity="0.18"/><circle cx="321" cy="410" r="4" fill="#ffd982"/>
      <rect x="376" y="412" width="3" height="16" fill="#2a2a40"/><circle cx="377" cy="410" r="9" fill="#ffd66b" opacity="0.18"/><circle cx="377" cy="410" r="4" fill="#ffd982"/>
      <rect x="338" y="380" width="2" height="12" fill="#2a2a40"/><circle cx="339" cy="378" r="7" fill="#ffd66b" opacity="0.16"/><circle cx="339" cy="378" r="3" fill="#ffd982"/>
      <rect x="360" y="380" width="2" height="12" fill="#2a2a40"/><circle cx="361" cy="378" r="7" fill="#ffd66b" opacity="0.16"/><circle cx="361" cy="378" r="3" fill="#ffd982"/>
    </svg>`;
  }

  function viewCity() {
    nav.hidden = false;
    const avail = S.City.pierresAvailable(), th = S.City.townHallTier(), max = S.City.stepsMax;
    const rows = S.City.domains.map((d) => {
      const c = DOMAINS[d], tier = S.City.buildingTier(d), can = S.City.canUpgrade(d);
      let action;
      if (can.ok) action = `<button class="btn small primary" data-build="${d}">Améliorer · ${can.cost} 🪨</button>`;
      else if (can.reason === 'pierres') action = `<span class="muted small">Manque ${can.cost - avail} 🪨</span>`;
      else if (can.reason === 'stage') action = `<span class="muted small">🔒 Avance le stage</span>`;
      else action = `<span class="muted small">🔒 Pratique ${esc(c.name)}</span>`;
      return `<div class="city-row" style="--c:${c.color}">
        <span class="city-ic">${BUILDING_EMBLEM[d]}</span>
        <div class="city-info"><b>${BUILDING_NAMES[d]}</b><span class="muted small">${esc(c.name)} · niveau ${tier}</span></div>
        ${action}</div>`;
    }).join('');
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">🏰</span>
          <div><h1>Ta Cité</h1><span class="muted small">${avail} 🪨 à dépenser · Hôtel de ville ${th}/${max}</span></div></div></header>
      <div class="card city-scene">${citySceneSVG()}</div>
      <div class="card cityhall-note">🏛️ <b>Hôtel de ville niveau ${th}</b> — il plafonne toute la Cité et ne monte qu'avec <b>les étapes de ton stage</b> (${th}/${max}). ${th < max ? `<button class="linklike" data-go="#/">Avance le boss →</button>` : 'Niveau max. Respect.'}</div>
      <h2 class="section">🏗️ Bâtiments</h2>
      ${rows}
      <p class="muted small">Tu gagnes des 🪨 en montant de niveau global. Un bâtiment monte si tu as les Pierres, que le domaine est assez haut, et que l'Hôtel de ville (ton stage) le permet.</p>`;
  }

  /* ======================================================
     JOURNAL (entrées quotidiennes + bilan)
     ====================================================== */
  const MOODS = ['😄', '🙂', '😐', '😕', '😞', '🔥', '😤', '😴'];

  function viewDiary() {
    nav.hidden = false;
    const today = Dates.today();
    const diary = S.state.diary || [];
    const todayEntry = diary.find((d) => d.date === today);
    const past = diary.filter((d) => d.date !== today).slice().sort((a, b) => b.date.localeCompare(a.date));
    const written = diary.length;

    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">📔</span>
          <div><h1>Journal</h1><span class="muted small">${written} entrée${written > 1 ? 's' : ''} · une par jour</span></div></div></header>
      <button class="btn block" data-go="#/diary/bilan">📅 Bilan des 14 derniers jours →</button>
      <form id="diary-form" class="stack">
        <h2 class="section">${todayEntry ? 'Modifier' : 'Aujourd\'hui'} · ${esc(Dates.label(today))}</h2>
        <div class="mood-row">
          ${MOODS.map((m) => `<label class="mood"><input type="radio" name="mood" value="${m}" ${todayEntry && todayEntry.mood === m ? 'checked' : ''}><span>${m}</span></label>`).join('')}
        </div>
        <textarea name="text" rows="6" placeholder="Comment s'est passée ta journée ? Une victoire, une idée pour plus tard, un truc à retenir…">${todayEntry ? esc(todayEntry.text) : ''}</textarea>
        <button class="btn primary block" type="submit">${todayEntry ? 'Mettre à jour' : 'Enregistrer ma journée'}</button>
      </form>
      <h2 class="section">Entrées précédentes</h2>
      ${past.length ? past.map((d) => `<div class="card diary-entry"><div class="muted small">${esc(Dates.label(d.date))} ${d.mood || ''}</div><p>${esc(d.text)}</p></div>`).join('') : `<div class="card empty">Rien encore. Commence par aujourd'hui.</div>`}`;
  }

  function viewBilan() {
    nav.hidden = false;
    const since = Dates.addDays(Dates.today(), -13);
    const entries = (S.state.diary || []).filter((d) => d.date >= since).sort((a, b) => a.date.localeCompare(b.date));
    const block = entries.length
      ? entries.map((d) => `<div class="card diary-entry"><div class="muted small">${esc(Dates.label(d.date))} ${d.mood || ''}</div><p>${esc(d.text)}</p></div>`).join('')
      : `<div class="card empty">Aucune entrée sur les 14 derniers jours.</div>`;
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/diary">‹</button>
        <div class="dhead-main"><span class="dicon big">📅</span>
          <div><h1>Bilan · 14 jours</h1><span class="muted small">${entries.length}/14 jours écrits</span></div></div></header>
      <div class="card">Relis d'un bloc, repère les motifs et les idées récurrentes.${entries.length ? ` Pour une <b>vraie synthèse</b>, copie-colle-moi ce bilan en conversation — je n'ai pas accès à tes données locales.` : ''}</div>
      ${block}`;
  }

  /* ======================================================
     RÉVISIONS
     ====================================================== */
  function viewReview(mode) {
    nav.hidden = false;

    /* (Re)démarre une session si besoin. mode 'free' = entraînement libre sur tout le journal.
       startFree force la bascule en libre même si une file 'due' (souvent vide) traîne. */
    const startFree = mode === 'free' && reviewMode !== 'free';
    if (reviewQueue === null || startFree) {
      if (mode === 'free') {
        reviewMode = 'free';
        reviewQueue = shuffle(S.state.journal.map((e) => e.id));
      } else {
        reviewMode = 'due';
        reviewQueue = window.SRS.dueEntries().map((e) => e.id);
        reviewXpEarned = 0;
      }
      reviewIdx = 0; reviewRevealed = false;
    }
    const total = reviewQueue.length;

    /* Rien à réviser */
    if (total === 0) {
      const upcoming = S.state.journal.length;
      app.innerHTML = `
        <header class="dhead"><button class="back" data-go="#/">‹</button>
          <div class="dhead-main"><span class="dicon big">🧠</span><div><h1>Révisions</h1></div></div></header>
        <div class="card empty">✅ Rien à réviser pour l'instant.<br>
          <span class="muted small">${upcoming} carte(s) au total, programmées plus tard.</span></div>
        ${upcoming > 0 ? `<button class="card cta" data-go="#/review/free">🎯 Entraînement libre (réviser sans pression) →</button>` : ''}
        <button class="card cta" data-go="#/learn">📖 Démarrer une nouvelle leçon →</button>
        <button class="btn block" id="ics-btn">📅 Exporter les rappels (.ics) vers mon agenda</button>`;
      return;
    }

    /* Session terminée (dues) */
    if (reviewIdx >= total && reviewMode === 'due') {
      const nonDue = S.state.journal.filter((e) => !e.nextReview || e.nextReview > Dates.today());
      if (nonDue.length > 0) {
        app.innerHTML = `
          <header class="dhead"><button class="back" data-go="#/">‹</button>
            <div class="dhead-main"><span class="dicon big">🎉</span><div><h1>Dues terminées</h1></div></div></header>
          <div class="card empty">Bravo. <b>${total} carte${total>1?'s':''}</b> révisée${total>1?'s':''}.<br>
            <span class="muted small">+${reviewXpEarned} XP gagnés${H.currentStreak()>1?` · streak ×${H.streakMultiplier().toFixed(2)}`:''} · ${nonDue.length} autres cartes en entraînement libre.</span></div>
          <button class="card cta" id="continue-free">🎯 Continuer en entraînement libre →</button>
          <button class="card cta" data-go="#/">‹ Retour à Aujourd'hui</button>`;
        return;
      }
      reviewQueue = null;
      app.innerHTML = `
        <header class="dhead"><button class="back" data-go="#/">‹</button>
          <div class="dhead-main"><span class="dicon big">🎉</span><div><h1>Session terminée</h1></div></div></header>
        <div class="card empty">Perfection. Zéro carte à réviser.<br>
          <span class="muted small">Reviens demain ou ajoute plus de leçons.</span></div>
        <button class="card cta" data-go="#/">‹ Retour à Aujourd'hui</button>`;
      return;
    }

    /* Session libre (après les dues) */
    if (reviewIdx >= total && reviewMode === 'free') {
      reviewQueue = null; reviewMode = 'due';
      app.innerHTML = `
        <header class="dhead"><button class="back" data-go="#/">‹</button>
          <div class="dhead-main"><span class="dicon big">💪</span><div><h1>Entraînement libre terminé</h1></div></div></header>
        <div class="card empty">Bien joué. Tu as révisé en mode libre.<br>
          <span class="muted small">Le SRS ne s'est pas mis à jour, c'était juste pour t'entraîner.</span></div>
        <button class="card cta" data-go="#/">‹ Retour à Aujourd'hui</button>`;
      return;
    }

    /* Carte courante */
    const e = S.state.journal.find((x) => x.id === reviewQueue[reviewIdx]);
    if (!e) { reviewIdx++; render(); return; }
    const cfg = DISCIPLINES[e.disciplineId];
    const deck = DECKS[e.deckId];
    const hasAudio = deck && deck.lang;
    const progress = Math.round((reviewIdx / total) * 100);

    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">🧠</span>
          <div><h1>Révisions</h1><span class="muted small">Carte ${reviewIdx+1} / ${total}</span></div></div>
      </header>
      <div class="xpbar slim"><div class="xpbar-fill" style="width:${progress}%;background:#a78bfa"></div></div>

      <div class="card flashcard">
        <span class="muted small">${cfg.icon} ${esc(cfg.name)} · boîte ${e.box}</span>
        <div class="flash-front">${esc(e.title)}${hasAudio ? `<button class="btn audio-btn" data-audio="${esc(e.title)}">🔊</button>` : ''}</div>
        ${reviewRevealed
          ? `<div class="flash-back">${esc(e.note) || '<i>(pas de détail noté)</i>'}</div>`
          : `<button class="btn primary block" data-reveal>Afficher la réponse</button>`}
      </div>

      ${reviewRevealed ? `
        <div class="row rate">
          <button class="btn bad block" data-rate="0">Pas su ✗</button>
          <button class="btn good block" data-rate="1">Su ✓</button>
        </div>
        <p class="muted small center">${reviewMode === 'free' ? '🎯 Entraînement libre — SRS ne change pas' : `« Su » espace la carte · « Pas su » la fait revenir vite.${H.currentStreak()>1?` · 🔥 streak ×${H.streakMultiplier().toFixed(2)}`:''}`}</p>` : ''}
    `;
  }

  /* ======================================================
     DÉCOUVRIR (mode apprentissage avant le test)
     ====================================================== */
  function viewStudy(deckId) {
    nav.hidden = false;
    const deck = DECKS[deckId];
    if (!deck) { location.hash = '#/learn'; return; }
    if (studyDeckId !== deckId) { studyDeckId = deckId; studyIdx = 0; studyFlip = false; }
    const cards = deck.cards, total = cards.length;
    const disc = DISCIPLINES[deck.disciplineId], dom = DOMAINS[disc.domain];

    if (studyIdx >= total) {
      const dp = window.SRS.deckProgress(deckId);
      const n = Math.min(NEW_CARDS_PER_DAY, dp.total - dp.enrolled);
      app.innerHTML = `
        <header class="dhead"><button class="back" data-go="#/learn">‹</button>
          <div class="dhead-main"><span class="dicon big">${deck.icon}</span><div><h1>${esc(deck.name)}</h1>
          <span class="muted small">Découverte terminée</span></div></div></header>
        <div class="card empty">Tu as parcouru les ${total} cartes. 👏<br>
          <span class="muted small">Maintenant, ancre-les en révision espacée.</span></div>
        ${n > 0 ? `<button class="card cta" data-lesson="${deckId}:${n}" data-then="#/review">🧠 Lancer +${n} cartes en révision →</button>`
                : `<button class="card cta" data-go="#/review">🧠 Aller réviser →</button>`}
        <button class="btn block" data-study-restart="${deckId}">↻ Revoir depuis le début</button>`;
      return;
    }

    const c = cards[studyIdx];
    const progress = Math.round((studyIdx / total) * 100);
    app.innerHTML = `
      <header class="dhead" style="--c:${dom.color}"><button class="back" data-go="#/learn">‹</button>
        <div class="dhead-main"><span class="dicon big">${deck.icon}</span>
          <div><h1>Découvrir</h1><span class="muted small">${esc(deck.name)} · ${studyIdx+1}/${total}</span></div></div>
      </header>
      <div class="xpbar slim"><div class="xpbar-fill" style="width:${progress}%;background:${dom.color}"></div></div>

      <button class="card flashcard study" data-study-flip>
        <div class="flash-front">${esc(c.front)}${deck.lang ? `<button class="btn audio-btn" data-audio="${esc(c.front)}">🔊</button>` : ''}</div>
        <div class="flash-back ${studyFlip ? '' : 'dim'}">${studyFlip ? esc(c.back) : 'Touche pour retourner'}</div>
      </button>

      <div class="row rate">
        <button class="btn block" data-study-prev ${studyIdx === 0 ? 'disabled' : ''}>‹ Précédent</button>
        <button class="btn primary block" data-study-next>${studyIdx === total - 1 ? 'Terminer' : 'Suivant ›'}</button>
      </div>
      <p class="muted small center">Mode apprentissage : pas de note, juste découvrir. Le test viendra après.</p>
    `;
  }

  /* ======================================================
     OUTILS / MÉTRONOME
     ====================================================== */
  function viewTools() {
    nav.hidden = false;
    const m=window.Metronome;
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">🎼</span><div><h1>Métronome</h1>
        <span class="muted small">Bosse, puis logge le BPM atteint</span></div></div></header>
      <div class="card metro">
        <div class="metro-bpm"><span id="bpm-val">${m.getBpm()}</span><small>BPM</small></div>
        <div class="beats" id="beats">${[0,1,2,3].map((i)=>`<span class="beat" data-b="${i}"></span>`).join('')}</div>
        <input type="range" id="bpm-range" min="40" max="240" value="${m.getBpm()}">
        <div class="row metro-btns">
          <button class="btn" id="bpm-minus">−</button>
          <button class="btn primary big" id="metro-toggle">${m.isRunning()?'⏸ Stop':'▶ Start'}</button>
          <button class="btn" id="bpm-plus">＋</button>
        </div>
        <button class="btn block" id="log-bpm">📌 Logger ${m.getBpm()} BPM sur la Guitare</button>
      </div>`;
    m.setOnTick((b) => { document.querySelectorAll('.beat').forEach((el,i)=>el.classList.toggle('hit',i===b)); });
  }

  /* ======================================================
     RÉGLAGES
     ====================================================== */
  function viewSettings() {
    nav.hidden = false;
    const profile=S.activeProfile();
    const profiles=S.getProfiles();
    const profilesList=profiles.map((p)=>`<div class="profile-mgmt-row">
      <span>${esc(p.name)}${p.id===S.activeProfileId?' <b>(actif)</b>':''}</span>
      ${profiles.length>1&&p.id!==S.activeProfileId?`<button class="btn small" data-pick-profile="${p.id}">Passer</button>`:''}
      ${profiles.length>1?`<button class="btn small danger" data-del-profile="${p.id}">Suppr.</button>`:''}
    </div>`).join('');

    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/">‹</button>
        <div class="dhead-main"><span class="dicon big">⚙️</span><div><h1>Réglages</h1></div></div></header>

      <div class="card">
        <h3>Profils</h3>
        ${profilesList}
        <form id="create-profile-form" class="row" style="margin-top:10px">
          <input name="name" placeholder="Nouveau profil (prénom)" required>
          <button class="btn" type="submit">+</button>
        </form>
        <button class="btn block" id="switch-profile-btn" style="margin-top:8px">Changer de profil →</button>
      </div>

      <div class="card">
        <label class="field"><span>Ton prénom (affiché dans le Coach)</span>
          <input id="name-input" value="${esc(profile?profile.name:'')}"></label>
      </div>

      <div class="card">
        <h3>Sauvegarde</h3>
        <p class="muted small">Tes données vivent sur cet appareil. Exporte régulièrement.</p>
        <button class="btn block" id="export-btn">⬇️ Exporter ma sauvegarde (.json)</button>
        <label class="btn block file">⬆️ Importer une sauvegarde<input type="file" id="import-file" accept=".json" hidden></label>
        <button class="btn block" id="ics-btn2">📅 Exporter les rappels de révision (.ics)</button>
      </div>

      <div class="card">
        <h3>À propos</h3>
        <p class="muted small">Maestria — tracker gamifié multi-disciplines, 100% local et gratuit.
        Conçu comme brique de ton projet Life-RPG.</p>
        <button class="btn block danger" id="reset-btn">🗑️ Réinitialiser ce profil</button>
      </div>`;
  }

  /* ======================================================
     ROUTER
     ====================================================== */
  /* ======================================================
     COURS — Le Grimoire des Gammes (leçons + fiches)
     ====================================================== */
  function findLesson(lessonId) {
    for (const cid in COURSES) for (const m of COURSES[cid].modules) {
      const l = m.lessons.find((x) => x.id === lessonId);
      if (l) return { course: COURSES[cid], module: m, lesson: l };
    }
    return null;
  }
  function moduleComplete(m) { return m.lessons.every((l) => S.lessonDone(l.id)); }
  function moduleUnlocked(course, idx) { return idx === 0 || moduleComplete(course.modules[idx - 1]); }
  function findModule(moduleId) {
    for (const cid in COURSES) { const m = COURSES[cid].modules.find((x) => x.id === moduleId); if (m) return { course: COURSES[cid], module: m }; }
    return null;
  }

  /* Diagramme de manche en SVG (6 cordes, fenêtre de cases, points de gamme). */
  function fretboardSVG(d) {
    if (!d) return '';
    const cols = d.toFret - d.fromFret + 1, cw = 30, ch = 17, mL = 20, mT = 12;
    const W = mL + cols * cw + 8, H = mT + 6 * ch + 18;
    const labels = ['e', 'B', 'G', 'D', 'A', 'E'];
    let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${Math.round(W*1.25)}px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme de manche"><rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#141636"/>`;
    for (let i = 0; i < 6; i++) { const y = mT + i * ch + ch/2; s += `<line x1="${mL}" y1="${y}" x2="${mL+cols*cw}" y2="${y}" stroke="#5a5f88" stroke-width="1"/><text x="${mL-11}" y="${y+3}" fill="#8a8fb5" font-size="10" text-anchor="middle">${labels[i]}</text>`; }
    for (let j = 0; j <= cols; j++) { const x = mL + j*cw, nut = (d.fromFret === 1 && j === 0); s += `<line x1="${x}" y1="${mT+ch/2}" x2="${x}" y2="${mT+6*ch-ch/2}" stroke="${nut?'#cdd6ff':'#3a3f6e'}" stroke-width="${nut?3:1}"/>`; }
    for (let j = 0; j < cols; j++) { const x = mL + j*cw + cw/2; s += `<text x="${x}" y="${H-4}" fill="#6b7099" font-size="9" text-anchor="middle">${d.fromFret+j}</text>`; }
    d.dots.forEach((dot) => { const y = mT + (dot.s-1)*ch + ch/2, x = mL + (dot.f - d.fromFret)*cw + cw/2, c = dot.root ? '#f59e0b' : '#a78bfa';
      s += `<circle cx="${x}" cy="${y}" r="7" fill="${c}"/>`;
      if (dot.label) s += `<text x="${x}" y="${y+3}" fill="#141636" font-size="8" text-anchor="middle" font-weight="700">${esc(dot.label)}</text>`; });
    return s + `</svg>`;
  }

  function viewCourse(courseId) {
    nav.hidden = false;
    const c = COURSES[courseId];
    if (!c) { app.innerHTML = `<div class="card empty">Cours introuvable.</div>`; return; }
    const mods = c.modules.map((m, idx) => {
      const unlocked = moduleUnlocked(c, idx), done = m.lessons.filter((l) => S.lessonDone(l.id)).length, total = m.lessons.length, complete = done === total;
      const rows = m.lessons.map((l) => {
        const ok = S.lessonDone(l.id);
        return `<button class="lesson-row ${ok?'done':''}" ${unlocked?`data-go="#/lesson/${l.id}"`:'disabled'}>
          <span class="lr-check">${ok?'✓':(unlocked?'○':'🔒')}</span><span class="lr-title">${esc(l.title)}</span></button>`;
      }).join('');
      return `<div class="card course-mod">
        <div class="cm-head"><span class="cm-ic">${m.icon||'📘'}</span>
          <div class="cm-main"><b>${esc(m.title)}</b><span class="muted small">${esc(m.goal)}</span></div>
          <span class="badge">${done}/${total}</span></div>
        ${unlocked ? rows : `<div class="muted small locked-note">🔒 Termine le module précédent pour débloquer.</div>`}
        ${m.fiche ? `<button class="btn small block ${complete?'primary':''}" ${complete?`data-go="#/fiche/${m.id}"`:'disabled'}>${complete?'📄 Consulter la fiche':'📄 Fiche — à débloquer'}</button>` : ''}
      </div>`;
    }).join('');
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/d/${courseId}">‹</button>
        <div class="dhead-main"><span class="dicon big">🎸</span>
          <div><h1>${esc(c.title)}</h1><span class="muted small">${esc(c.subtitle)}</span></div></div></header>
      <button class="btn block" data-go="#/fiches">📚 Bibliothèque de fiches →</button>
      ${mods}`;
  }

  function viewLesson(lessonId) {
    nav.hidden = false;
    const f = findLesson(lessonId);
    if (!f) { app.innerHTML = `<div class="card empty">Leçon introuvable.</div>`; return; }
    const { course, module, lesson } = f, ok = S.lessonDone(lessonId);
    const cards = (lesson.cards||[]).map((c) => `<div class="mini-card"><b>${esc(c.front)}</b><span>${esc(c.back)}</span></div>`).join('');
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/course/${course.id}">‹</button>
        <div class="dhead-main"><span class="dicon big">${module.icon||'📘'}</span>
          <div><h1>${esc(lesson.title)}</h1><span class="muted small">${esc(module.title)}</span></div></div></header>
      <div class="card lesson-goal">🎯 ${esc(lesson.goal)}</div>
      <div class="card"><h3 class="lb">📖 Théorie</h3><p class="lesson-theory">${esc(lesson.theory)}</p>
        ${lesson.diagram?`<div class="fretboard">${fretboardSVG(lesson.diagram)}</div>`:''}</div>
      ${lesson.tab?`<div class="card"><h3 class="lb">${esc(lesson.tabLabel||'🎸 Exercice')}</h3><pre class="tab">${esc(lesson.tab)}</pre></div>`:''}
      ${lesson.bpm?`<div class="card"><h3 class="lb">⏱️ Cible métronome</h3><p>Départ <b>${lesson.bpm.start} BPM</b> → objectif <b>${lesson.bpm.goal} BPM</b>. Propreté avant vitesse.</p>
        <button class="btn block primary" data-metro="${lesson.bpm.start}">⏱️ Régler le métronome à ${lesson.bpm.start} BPM →</button></div>`:''}
      <div class="card"><h3 class="lb">✅ Réussite</h3><p>${esc(lesson.success)}</p></div>
      ${cards?`<div class="card"><h3 class="lb">🧠 À mémoriser</h3>${cards}
        <button class="btn small block" data-enroll="${lesson.id}">Envoyer ces cartes en révision →</button></div>`:''}
      <div class="card lesson-pitfall">⚠️ <b>Piège :</b> ${esc(lesson.pitfall)}</div>
      <button class="card cta ${ok?'':'primary'}" data-lesson-done="${lesson.id}">${ok?'✓ Validée — refaire la leçon':'Marquer comme réussie ✓'}</button>`;
  }

  function viewFiches() {
    nav.hidden = false;
    let rows = '';
    for (const cid in COURSES) COURSES[cid].modules.forEach((m) => {
      if (!m.fiche) return;
      const complete = moduleComplete(m);
      rows += `<button class="fiche-row" ${complete?`data-go="#/fiche/${m.id}"`:'disabled'}>
        <span class="fr-ic">${complete?'📄':'🔒'}</span>
        <div class="cm-main"><b>${esc(m.fiche.title)}</b><span class="muted small">${complete?esc(COURSES[cid].title):'Termine le module « '+esc(m.title)+' »'}</span></div></button>`;
    });
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/course/guitare">‹</button>
        <div class="dhead-main"><span class="dicon big">📚</span>
          <div><h1>Bibliothèque de fiches</h1><span class="muted small">Ta théorie, débloquée à vie</span></div></div></header>
      ${rows || `<div class="card empty">Aucune fiche pour l'instant. Termine un module.</div>`}`;
  }

  function viewFiche(moduleId) {
    nav.hidden = false;
    const fm = findModule(moduleId);
    if (!fm || !fm.module.fiche) { app.innerHTML = `<div class="card empty">Fiche introuvable.</div>`; return; }
    if (!moduleComplete(fm.module)) { app.innerHTML = `<div class="card empty">🔒 Termine le module pour débloquer cette fiche.</div><button class="card cta" data-go="#/course/${fm.course.id}">‹ Retour au cours</button>`; return; }
    const f = fm.module.fiche;
    const secs = f.sections.map((sec) => `<div class="fiche-sec"><h3>${esc(sec.h)}</h3><p>${esc(sec.body)}</p></div>`).join('');
    app.innerHTML = `
      <header class="dhead"><button class="back" data-go="#/fiches">‹</button>
        <div class="dhead-main"><span class="dicon big">📄</span>
          <div><h1>${esc(f.title)}</h1><span class="muted small">${esc(fm.course.title)} · ${esc(fm.module.title)}</span></div></div></header>
      <div class="card fiche">
        ${f.intro?`<p class="fiche-intro">${esc(f.intro)}</p>`:''}
        ${secs}
        ${f.diagram?`<div class="fretboard">${fretboardSVG(f.diagram)}</div>`:''}
      </div>
      <button class="btn block" data-print>🖨️ Imprimer / enregistrer en PDF</button>`;
  }

  function render() {
    lastRenderDay = Dates.today();
    if (!S.hasProfile()) { viewProfilePicker(); return; }
    const hash=location.hash||'#/', parts=hash.replace('#/','').split('/');
    const root=parts[0]||'';
    /* Quitter une session réinitialise son état */
    if (root!=='review') reviewQueue = null;
    if (root!=='study')  studyDeckId = null;

    if (root==='')          viewToday();
    else if (root==='map')  viewDashboard();
    else if (root==='learn') viewLearn();
    else if (root==='read')  { if (parts[1]==='opinions') viewOpinions(); else viewReading(); }
    else if (root==='diary') { if (parts[1]==='bilan') viewBilan(); else viewDiary(); }
    else if (root==='city')  viewCity();
    else if (root==='course') viewCourse(parts[1]);
    else if (root==='lesson') viewLesson(parts[1]);
    else if (root==='fiches') viewFiches();
    else if (root==='fiche')  viewFiche(parts[1]);
    else if (root==='study') viewStudy(parts[1]);
    else if (root==='d')    viewDiscipline(parts[1]);
    else if (root==='review') viewReview(parts[1]);
    else if (root==='tools')  viewTools();
    else if (root==='settings') viewSettings();
    else viewToday();
    document.querySelectorAll('#nav button').forEach((b)=>b.classList.toggle('active',b.dataset.root===root));
    window.scrollTo(0,0);
  }

  function afterMutation(result) {
    const earned=S.refreshBadges();
    if (result&&result.leveledUp) toast(`⬆️ Niveau global ${result.newLevel} !`);
    earned.forEach((b)=>toast(`${b.icon} Badge débloqué : ${b.name}`));
  }

  /* ======================================================
     SUGGESTIONS : pré-rempli le formulaire de séance
     ====================================================== */
  function applySuggestion(disciplineId, idx) {
    const cfg=DISCIPLINES[disciplineId];
    if (!cfg||!cfg.suggestions) return;
    const sg=cfg.suggestions[idx];
    if (!sg) return;
    const form=document.getElementById('session-form');
    if (!form) return;
    form.durationMin.value=sg.durationMin;
    form.querySelectorAll('input[name="sk"]').forEach((cb)=>{ cb.checked=sg.skills.includes(cb.value); });
    const noteField=document.getElementById('session-note');
    if (noteField) noteField.value=sg.title;
    form.scrollIntoView({behavior:'smooth',block:'start'});
    toast(`"${sg.title}" pré-rempli — ajuste et enregistre.`);
  }

  /* ======================================================
     ÉVÉNEMENTS (délégation)
     ====================================================== */
  document.addEventListener('click', (e) => {
    /* Navigation */
    const go=e.target.closest('[data-go]');
    if (go) { location.hash=go.dataset.go; return; }

    /* Habitude du jour (cocher / décocher) */
    const habitBtn=e.target.closest('[data-habit]');
    if (habitBtn) { const id=habitBtn.dataset.habit; S.setHabit(Dates.today(), id, !S.habitDone(id)); afterMutation(); render(); return; }

    /* Étape d'un boss / quête de vie */
    const qstep=e.target.closest('[data-qstep]');
    if (qstep) { const [qid,sid]=qstep.dataset.qstep.split(':'); const res=S.toggleQuestStep(qid,sid); afterMutation(res); render(); return; }

    /* Cité : améliorer un bâtiment (dépenser des Pierres) */
    const build=e.target.closest('[data-build]');
    if (build) { const r=S.City.upgradeBuilding(build.dataset.build);
      if (r.ok) { afterMutation(); toast(`🏗️ ${BUILDING_NAMES[build.dataset.build]} niveau ${r.tier} !`); }
      render(); return; }

    /* Cours : régler le métronome à la cible d'une leçon */
    const metro=e.target.closest('[data-metro]');
    if (metro) { if (window.Metronome) window.Metronome.setBpm(Number(metro.dataset.metro)); location.hash='#/tools'; return; }

    /* Cours : valider une leçon */
    const ldone=e.target.closest('[data-lesson-done]');
    if (ldone) { const id=ldone.dataset.lessonDone;
      if (S.markLessonDone(id)) { const r=S.addXp('guitare', 20, 'course'); afterMutation(r);
        const f=findLesson(id);
        toast(f && moduleComplete(f.module) && f.module.fiche ? `📄 Fiche débloquée : ${f.module.fiche.title} !` : 'Leçon validée · +20 XP');
      }
      render(); return; }

    /* Cours : envoyer les cartes d'une leçon dans le SRS */
    const enroll=e.target.closest('[data-enroll]');
    if (enroll) { const f=findLesson(enroll.dataset.enroll);
      if (f) { let n=0; (f.lesson.cards||[]).forEach((c,i)=>{ if(window.SRS.enrollCard('guitare',{key:`course_${f.lesson.id}_${i}`,front:c.front,back:c.back},'course_guitare')) n++; }); S.save();
        toast(n?`${n} carte${n>1?'s':''} — file dans Réviser 🧠`:'Ces cartes sont déjà en révision.'); }
      return; }

    /* Fiche : imprimer / PDF */
    if (e.target.closest('[data-print]')) { window.print(); return; }

    /* Démarrer une leçon : inscrire des cartes dans le SRS */
    const lesson=e.target.closest('[data-lesson]');
    if (lesson) { const [deckId,n]=lesson.dataset.lesson.split(':'); const added=window.SRS.enrollNext(deckId,Number(n));
      toast(added?`+${added} carte${added>1?'s':''} — file dans Réviser 🧠`:'Rien de plus à ajouter.');
      if (lesson.dataset.then) { reviewQueue=null; location.hash=lesson.dataset.then; } else render(); return; }

    /* Profil : choisir */
    const pickProfile=e.target.closest('[data-pick-profile]');
    if (pickProfile) { S.switchProfile(pickProfile.dataset.pickProfile); S.refreshBadges(); location.hash='#/'; render(); return; }

    /* Profil : supprimer */
    const delProfile=e.target.closest('[data-del-profile]');
    if (delProfile) {
      if (!confirm('Supprimer ce profil et toutes ses données ?')) return;
      S.deleteProfile(delProfile.dataset.delProfile); render(); return;
    }

    /* Profil : changer depuis réglages */
    if (e.target.closest('#switch-profile-btn')) { viewProfilePicker(); return; }

    /* Suggestions */
    const sg=e.target.closest('[data-suggest]');
    if (sg) { const [discId,idx]=sg.dataset.suggest.split(':'); applySuggestion(discId,Number(idx)); return; }

    /* Audio : prononcer la carte */
    const audioBtn=e.target.closest('[data-audio]');
    if (audioBtn) { playAudio(audioBtn.dataset.audio); e.stopPropagation(); return; }

    /* Révision : révéler la réponse */
    if (e.target.closest('[data-reveal]')) { reviewRevealed = true; render(); return; }
    /* Continuer en entraînement libre */
    if (e.target.closest('#continue-free')) {
      reviewQueue = S.state.journal.filter((e) => !e.nextReview || e.nextReview > Dates.today()).map((e) => e.id);
      reviewMode = 'free'; reviewIdx = 0; reviewRevealed = false; render(); return;
    }

    /* Révision : noter la carte (0 = pas su, 1 = su) puis carte suivante */
    const rate=e.target.closest('[data-rate]');
    if (rate) {
      const id=reviewQueue[reviewIdx];
      if (reviewMode === 'due') {
        const r = window.SRS.review(id, rate.dataset.rate==='1');
        reviewXpEarned += r.xp;
        if (r.mastered) toast(`🏆 Carte maîtrisée ! +${r.xp} XP`);
        afterMutation();
      }
      // En mode free, on ne met pas à jour le SRS
      reviewIdx++; reviewRevealed=false; render(); return;
    }

    /* Mode Découvrir : retourner / naviguer */
    if (e.target.closest('[data-study-flip]')) { studyFlip=!studyFlip; render(); return; }
    if (e.target.closest('[data-study-next]')) { studyFlip=false; studyIdx++; render(); return; }
    if (e.target.closest('[data-study-prev]')) { studyFlip=false; if(studyIdx>0) studyIdx--; render(); return; }
    const sRestart=e.target.closest('[data-study-restart]');
    if (sRestart) { studyIdx=0; studyFlip=false; render(); return; }

    const ics=e.target.closest('#ics-btn,#ics-btn2');
    if (ics) { if (!S.state.journal.length) { toast('Ajoute d\'abord des connaissances.'); return; }
      download('maestria-revisions.ics',window.SRS.exportICS(),'text/calendar'); toast('Fichier .ics exporté.'); return; }

    /* Goals */
    const goalChk=e.target.closest('[data-goal]');
    if (goalChk) { const id=location.hash.split('/')[2]; S.toggleGoal(id,goalChk.dataset.goal); afterMutation(); render(); return; }
    const goalDel=e.target.closest('[data-del-goal]');
    if (goalDel) { const id=location.hash.split('/')[2]; S.removeGoal(id,goalDel.dataset.delGoal); render(); return; }

    /* Journal delete */
    const knolDel=e.target.closest('[data-del-knol]');
    if (knolDel) { window.SRS.removeEntry(knolDel.dataset.delKnol); render(); return; }

    /* Métronome */
    if (e.target.closest('#metro-toggle')) { const r=window.Metronome.toggle();
      e.target.closest('#metro-toggle').textContent=r?'⏸ Stop':'▶ Start'; return; }
    if (e.target.closest('#bpm-plus')) { adjustBpm(+1); return; }
    if (e.target.closest('#bpm-minus')) { adjustBpm(-1); return; }
    if (e.target.closest('#log-bpm')) { logBpm(); return; }

    /* Réglages */
    if (e.target.closest('#export-btn')) { download('maestria-sauvegarde.json',S.exportJSON(),'application/json'); toast('Sauvegarde exportée.'); return; }
    if (e.target.closest('#reset-btn')) { if (confirm('Réinitialiser ce profil ? Action irréversible.')) { S.reset(); location.hash='#/'; render(); } return; }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const id=location.hash.split('/')[2];

    /* Création de profil (depuis picker OU réglages) */
    if (e.target.id==='create-profile-form') {
      const name=new FormData(e.target).get('name').trim();
      if (!name) return;
      const profileId=S.createProfile(name);
      S.switchProfile(profileId);
      location.hash='#/';
      render();
      return;
    }

    if (e.target.id==='import-cards-form') {
      const fd=new FormData(e.target);
      const disc=fd.get('discipline'), csv=fd.get('csv')||'';
      const added=window.SRS.importCSV(disc, csv, 'import');
      toast(added?`${added} carte${added>1?'s':''} importée${added>1?'s':''}.`:'Aucune carte détectée.');
      afterMutation(); e.target.reset(); render(); return;
    }

    if (e.target.id==='session-form') {
      const f=e.target, fd=new FormData(f);
      const skills=[...f.querySelectorAll('input[name="sk"]:checked')].map((x)=>x.value);
      const cfg=DISCIPLINES[id]; const metrics={};
      cfg.metrics.forEach((m)=>{ const v=fd.get('m_'+m.id); if(v) metrics[m.id]=v; });
      const res=S.addSession(id,{durationMin:fd.get('durationMin'),intensity:fd.get('intensity'),skills,note:fd.get('note'),metrics});
      afterMutation(res); toast(`Séance enregistrée · +${res.xp} XP`); render(); return;
    }
    if (e.target.id==='goal-form') {
      const t=new FormData(e.target).get('text').trim(); if(t) S.addGoal(id,t); render(); return;
    }
    if (e.target.id==='knol-form') {
      const fd=new FormData(e.target);
      window.SRS.addEntry(id,fd.get('title'),fd.get('note')); afterMutation(); toast('Connaissance ajoutée. Révisions programmées.'); render(); return;
    }
    if (e.target.id==='reading-form') {
      const r=readingOfToday(); if(!r) return;
      const fd=new FormData(e.target);
      const answers=r.questions.map((q,i)=>{ const v=fd.get('q'+i); return v==null?-1:Number(v); });
      const correct=answers.reduce((a,ans,i)=>a+(ans===r.questions[i].answer?1:0),0);
      const total=r.questions.length;
      const opinion=(fd.get('opinion')||'').trim();
      const xp=Math.round((8 + correct*4 + (opinion.length>=30?6:0)) * H.streakMultiplier());
      S.state.readingLog=S.state.readingLog||[]; S.state.opinions=S.state.opinions||[];
      S.state.readingLog.push({ date:Dates.today(), readingId:r.id, answers, correct, total, opinion, xp });
      if (opinion) S.state.opinions.push({ date:Dates.today(), readingId:r.id, theme:r.theme, title:r.title, text:opinion });
      S.addXp(r.disciplineId||'lettres', xp, 'reading'); // save inclus
      afterMutation(); toast(`Lecture validée · ${correct}/${total} · +${xp} XP`); render(); return;
    }
    if (e.target.id==='diary-form') {
      const fd=new FormData(e.target);
      const text=(fd.get('text')||'').trim(), mood=fd.get('mood')||'';
      if (!text && !mood) { render(); return; }
      const today=Dates.today();
      S.state.diary=S.state.diary||[];
      const existing=S.state.diary.find((d)=>d.date===today), firstToday=!existing;
      if (existing) { existing.text=text; existing.mood=mood; }
      else S.state.diary.push({ date:today, mood, text });
      if (firstToday && text.length>=20) { S.addXp('lettres', Math.round(10*H.streakMultiplier()), 'diary'); } // save inclus
      else S.save();
      afterMutation(); toast(firstToday?'Journée enregistrée.':'Journal mis à jour.'); render(); return;
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.dataset&&e.target.dataset.cefr) {
      const id=location.hash.split('/')[2];
      S.setCefr(id,e.target.dataset.cefr,e.target.value==='—'?'':e.target.value); toast('Niveau mis à jour.'); return;
    }
    if (e.target.id==='bpm-range') { window.Metronome.setBpm(Number(e.target.value)); syncBpm(); return; }
    if (e.target.id==='name-input') {
      const profile=S.activeProfile();
      if (profile) {
        const profiles=S.getProfiles();
        const p=profiles.find((x)=>x.id===S.activeProfileId);
        if (p) { p.name=e.target.value.trim()||p.name; localStorage.setItem('maestria_profiles',JSON.stringify(profiles)); }
      }
      return;
    }
    if (e.target.id==='import-file'&&e.target.files[0]) {
      const reader=new FileReader();
      reader.onload=()=>{ try { S.importJSON(reader.result); toast('Importé.'); location.hash='#/'; render(); }
        catch(err) { toast('Import impossible : '+err.message); } };
      reader.readAsText(e.target.files[0]); return;
    }
  });

  function adjustBpm(delta) { window.Metronome.setBpm(window.Metronome.getBpm()+delta); syncBpm(); }
  function syncBpm() {
    const v=window.Metronome.getBpm();
    const val=document.getElementById('bpm-val'); if(val) val.textContent=v;
    const range=document.getElementById('bpm-range'); if(range) range.value=v;
    const log=document.getElementById('log-bpm'); if(log) log.textContent=`📌 Logger ${v} BPM sur la Guitare`;
  }
  function logBpm() {
    const v=window.Metronome.getBpm();
    S.addSession('guitare',{durationMin:15,intensity:3,skills:[],note:`Métronome ${v} BPM`,metrics:{bpm:v}});
    afterMutation(); toast(`${v} BPM loggé sur la Guitare.`);
  }

  window.addEventListener('hashchange', render);

  /* Passage à un nouveau jour : quand l'app revient au premier plan et que la date a changé,
     on réinitialise la session de révision figée d'hier et on re-rend (les cartes dues du jour apparaissent). */
  function refreshIfNewDay() {
    if (Dates.today() !== lastRenderDay) { reviewQueue = null; reviewMode = 'due'; render(); }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refreshIfNewDay(); });
  window.addEventListener('focus', refreshIfNewDay);

  nav.innerHTML=`
    <button data-go="#/" data-root=""><span>🗓️</span>Aujourd'hui</button>
    <button data-go="#/learn" data-root="learn"><span>📖</span>Apprendre</button>
    <button data-go="#/review" data-root="review"><span>🧠</span>Réviser</button>
    <button data-go="#/map" data-root="map"><span>📊</span>Progrès</button>
    <button data-go="#/diary" data-root="diary"><span>📔</span>Journal</button>
    <button data-go="#/settings" data-root="settings"><span>⚙️</span>Réglages</button>`;

  S.refreshBadges();
  render();
})();
