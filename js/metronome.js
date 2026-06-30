/* ============================================================
   Maestria — Métronome (Web Audio). Sert à bosser un exercice
   guitare à un BPM donné, puis à logger ce BPM en un clic.
   ============================================================ */
(function () {
  let ctx = null;
  let timer = null;
  let nextNoteTime = 0;
  let beat = 0;
  let bpm = 90;
  let beatsPerBar = 4;
  let running = false;
  let onTick = null; // callback(beatIndex)

  function ensureCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  }

  function click(time, accent) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1500 : 900;
    gain.gain.setValueAtTime(accent ? 0.7 : 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(time); osc.stop(time + 0.06);
  }

  function scheduler() {
    while (nextNoteTime < ctx.currentTime + 0.1) {
      const accent = beat % beatsPerBar === 0;
      click(nextNoteTime, accent);
      if (onTick) {
        const b = beat % beatsPerBar;
        setTimeout(() => onTick(b), Math.max(0, (nextNoteTime - ctx.currentTime) * 1000));
      }
      nextNoteTime += 60.0 / bpm;
      beat++;
    }
  }

  function start() {
    if (running) return;
    ensureCtx();
    running = true; beat = 0; nextNoteTime = ctx.currentTime + 0.05;
    timer = setInterval(scheduler, 25);
  }
  function stop() {
    running = false;
    clearInterval(timer); timer = null;
  }
  function toggle() { running ? stop() : start(); return running; }

  window.Metronome = {
    setBpm(v) { bpm = Math.max(30, Math.min(300, v)); },
    getBpm() { return bpm; },
    setBeats(v) { beatsPerBar = v; },
    setOnTick(cb) { onTick = cb; },
    isRunning() { return running; },
    start, stop, toggle,
  };
})();
