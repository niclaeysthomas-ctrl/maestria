/* ============================================================
   Maestria — Journal de connaissances + révisions espacées (Leitner)
   + export .ics pour déposer les rappels dans n'importe quel agenda.
   ============================================================ */
(function () {
  const { SRS_INTERVALS } = window.MAESTRIA_CONFIG;
  const { Dates, H } = window.Store;
  const S = window.Store;

  function addEntry(disciplineId, title, note) {
    const e = {
      id: 'k_' + Date.now(),
      disciplineId, title: title.trim(), note: (note || '').trim(),
      box: 0,
      createdAt: Dates.today(),
      nextReview: Dates.addDays(Dates.today(), SRS_INTERVALS[0]),
      history: [],
    };
    S.state.journal.unshift(e);
    S.addXp(disciplineId, 15, 'knowledge'); // addXp save déjà
    return e;
  }

  function removeEntry(id) {
    S.state.journal = S.state.journal.filter((e) => e.id !== id);
    S.save();
  }

  function dueEntries() {
    const today = Dates.today();
    return S.state.journal
      .filter((e) => e.nextReview <= today)
      .sort((a, b) => a.nextReview.localeCompare(b.nextReview));
  }
  function dueCount() { return dueEntries().length; }

  /* Révision : success=true -> on monte d'une boîte ; sinon retour boîte 0. */
  function review(id, success) {
    const e = S.state.journal.find((x) => x.id === id);
    if (!e) return;
    if (success) e.box = Math.min(SRS_INTERVALS.length - 1, e.box + 1);
    else e.box = 0;
    e.nextReview = Dates.addDays(Dates.today(), SRS_INTERVALS[e.box]);
    e.history.push({ date: Dates.today(), success });
    S.state.stats.reviewsDone = (S.state.stats.reviewsDone || 0) + 1;
    if (success) S.addXp(e.disciplineId, 6, 'review'); // save inclus
    else S.save();
  }

  /* ---------- Contenu : inscription de cartes prêtes dans le SRS ---------- */
  function isEnrolled(srcKey) { return S.state.journal.some((e) => e.srcKey === srcKey); }

  function enrollCard(disciplineId, card, deckId) {
    if (isEnrolled(card.key)) return null;
    const e = {
      id: 'k_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      disciplineId, title: card.front, note: card.back,
      deckId, srcKey: card.key, sourceType: 'content',
      box: 0, createdAt: Dates.today(),
      nextReview: Dates.today(),  // disponible immédiatement
      history: [],
    };
    S.state.journal.unshift(e);
    return e;
  }

  /* Inscrit les n prochaines cartes non encore inscrites d'un deck (la « leçon du jour »). */
  function enrollNext(deckId, n) {
    const deck = window.MAESTRIA_CONTENT.DECKS[deckId];
    if (!deck) return 0;
    let added = 0;
    for (const card of deck.cards) {
      if (added >= n) break;
      if (!isEnrolled(card.key)) { enrollCard(deck.disciplineId, card, deckId); added++; }
    }
    if (added) S.save();
    return added;
  }

  function deckProgress(deckId) {
    const deck = window.MAESTRIA_CONTENT.DECKS[deckId];
    if (!deck) return { total: 0, enrolled: 0, mastered: 0 };
    const keys = new Set(deck.cards.map((c) => c.key));
    const mine = S.state.journal.filter((e) => keys.has(e.srcKey));
    return { total: deck.cards.length, enrolled: mine.length, mastered: mine.filter((e) => e.box >= 3).length };
  }

  /* Import CSV/TSV : « recto,verso » par ligne → cartes dans une discipline. */
  function importCSV(disciplineId, text, deckId) {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    let added = 0;
    lines.forEach((line, i) => {
      const sep = line.includes('\t') ? '\t' : (line.includes(';') ? ';' : ',');
      const parts = line.split(sep);
      const front = (parts[0] || '').trim();
      const back = (parts.slice(1).join(sep) || '').trim();
      if (!front) return;
      const key = (deckId || 'import') + '_' + Date.now() + '_' + i;
      if (enrollCard(disciplineId, { key, front, back }, deckId || 'import')) added++;
    });
    if (added) S.save();
    return added;
  }

  /* Export .ics : un événement de rappel par révision à venir (30 prochains jours). */
  function exportICS() {
    const { DISCIPLINES } = window.MAESTRIA_CONFIG;
    const horizon = Dates.addDays(Dates.today(), 45);
    const upcoming = S.state.journal.filter((e) => e.nextReview <= horizon);
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = (() => {
      const d = new Date();
      return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    })();

    // Regroupe par jour de révision -> 1 event récap par jour
    const byDay = {};
    upcoming.forEach((e) => { (byDay[e.nextReview] = byDay[e.nextReview] || []).push(e); });

    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Maestria//Revisions//FR', 'CALSCALE:GREGORIAN'];
    Object.entries(byDay).forEach(([day, entries], i) => {
      const ymd = day.replace(/-/g, '');
      const titles = entries.map((e) => `• ${e.title} (${DISCIPLINES[e.disciplineId].name})`).join('\\n');
      lines.push(
        'BEGIN:VEVENT',
        `UID:maestria-${day}-${i}@local`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${ymd}`,
        `DTEND;VALUE=DATE:${ymd}`,
        `SUMMARY:🧠 Révisions Maestria (${entries.length})`,
        `DESCRIPTION:${titles}`,
        'BEGIN:VALARM', 'TRIGGER:PT0S', 'ACTION:DISPLAY', 'DESCRIPTION:Révisions du jour', 'END:VALARM',
        'END:VEVENT',
      );
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  window.SRS = { addEntry, removeEntry, dueEntries, dueCount, review, exportICS,
    enrollCard, enrollNext, deckProgress, importCSV, isEnrolled };
})();
