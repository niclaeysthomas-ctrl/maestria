/* ============================================================
   Maestria — Oreille musicale (reconnaissance d'intervalles & d'accords).
   Sons synthétisés dans le navigateur (Web Audio API, zéro dépendance).
   La sélection des exercices est pondérée : les types les moins réussis
   reviennent plus souvent (même logique que le SRS des cartes).
   ============================================================ */
(function () {
  const S = window.Store;

  const INTERVALS = [
    { semitones: 1,  name: '2nde mineure' },
    { semitones: 2,  name: '2nde majeure' },
    { semitones: 3,  name: '3ce mineure' },
    { semitones: 4,  name: '3ce majeure' },
    { semitones: 5,  name: '4te juste' },
    { semitones: 6,  name: 'Triton' },
    { semitones: 7,  name: '5te juste' },
    { semitones: 8,  name: '6te mineure' },
    { semitones: 9,  name: '6te majeure' },
    { semitones: 10, name: '7e mineure' },
    { semitones: 11, name: '7e majeure' },
    { semitones: 12, name: 'Octave' },
  ];

  const CHORD_QUALITIES = [
    { intervals: [0, 4, 7],     name: 'Majeur' },
    { intervals: [0, 3, 7],     name: 'Mineur' },
    { intervals: [0, 3, 6],     name: 'Diminué' },
    { intervals: [0, 4, 8],     name: 'Augmenté' },
    { intervals: [0, 4, 7, 10], name: '7e de dominante' },
    { intervals: [0, 3, 7, 10], name: 'Mineur 7e' },
    { intervals: [0, 4, 7, 11], name: 'Majeur 7e' },
  ];

  /* ---------- Logique pure (testable sans audio) ---------- */
  function freq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* Poids de sélection : un type jamais vu a une priorité modérée ; un type raté souvent est favorisé ;
     un type maîtrisé garde un plancher pour ne jamais disparaître totalement (renforcement à long terme). */
  function weightFor(stats) {
    if (!stats || stats.total === 0) return 3;
    const acc = stats.correct / stats.total;
    return 0.5 + (1 - acc) * 4.5; // 100% de réussite → 0.5 (plancher) … 0% → 5 (priorité max)
  }

  function pickWeighted(items, statsGetter) {
    const weights = items.map((it) => weightFor(statsGetter(it)));
    const total = weights.reduce((a, w) => a + w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) { r -= weights[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  }

  /* Construit une liste de choix QCM : la bonne réponse + (n-1) distracteurs, mélangés. */
  function buildChoices(list, correct, n, keyFn) {
    const others = shuffle(list.filter((x) => keyFn(x) !== keyFn(correct))).slice(0, n - 1);
    return shuffle([correct, ...others]);
  }

  const ROOT_MIN = 60, ROOT_MAX = 69; // Do4 à La4 : tessiture confortable pour les racines

  function generateIntervalExercise() {
    const item = pickWeighted(INTERVALS, (it) => S.earStats('interval_' + it.semitones));
    const rootMidi = ROOT_MIN + Math.floor(Math.random() * (ROOT_MAX - ROOT_MIN + 1));
    const choices = buildChoices(INTERVALS, item, 4, (it) => it.semitones);
    return { kind: 'interval', key: 'interval_' + item.semitones, rootMidi, noteMidi: rootMidi + item.semitones, correct: item, choices };
  }

  function generateChordExercise() {
    const item = pickWeighted(CHORD_QUALITIES, (it) => S.earStats('chord_' + it.name));
    const rootMidi = ROOT_MIN + Math.floor(Math.random() * (ROOT_MAX - ROOT_MIN + 1));
    const choices = buildChoices(CHORD_QUALITIES, item, 4, (it) => it.name);
    return { kind: 'chord', key: 'chord_' + item.name, rootMidi, midis: item.intervals.map((i) => rootMidi + i), correct: item, choices };
  }

  function checkAnswer(exercise, chosen) {
    const key = exercise.kind === 'interval' ? 'semitones' : 'name';
    return chosen[key] === exercise.correct[key];
  }

  /* ---------- Audio (Web Audio API — silencieux/no-op si indisponible, ex. tests headless) ---------- */
  let audioCtx = null;
  function getCtx() {
    if (audioCtx) return audioCtx;
    const AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    audioCtx = new AC();
    return audioCtx;
  }
  function playTone(ctx, f, startAt, dur) {
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.28, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(startAt); osc.stop(startAt + dur + 0.05);
  }
  function playSequence(midis, gapSec) {
    const ctx = getCtx(); if (!ctx) return false;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    midis.forEach((m, i) => playTone(ctx, freq(m), now + i * gapSec, gapSec * 0.9));
    return true;
  }
  function playTogether(midis, dur) {
    const ctx = getCtx(); if (!ctx) return false;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    midis.forEach((m) => playTone(ctx, freq(m), now, dur));
    return true;
  }
  function playExercise(exercise) {
    if (exercise.kind === 'interval') return playSequence([exercise.rootMidi, exercise.noteMidi], 0.9);
    return playTogether(exercise.midis, 1.6);
  }

  window.EarTraining = {
    INTERVALS, CHORD_QUALITIES,
    freq, weightFor, pickWeighted, buildChoices,
    generateIntervalExercise, generateChordExercise, checkAnswer,
    playExercise, playSequence, playTogether,
  };
})();
