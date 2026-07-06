/* ============================================================
   Maestria — Configuration des domaines et disciplines
   Ajouter une discipline = ajouter un objet ici.
   ============================================================ */

const DOMAINS = {
  corps:   { id: 'corps',   name: 'Corps',   icon: '🥊', color: '#ef4444' },
  art:     { id: 'art',     name: 'Art',     icon: '🎸', color: '#f59e0b' },
  esprit:  { id: 'esprit',  name: 'Esprit',  icon: '🧠', color: '#6366f1' },
  langues: { id: 'langues', name: 'Langues', icon: '🗣️', color: '#10b981' },
  pro:     { id: 'pro',     name: 'Métier',  icon: '💼', color: '#0ea5e9' },
};

const DISCIPLINES = {
  guitare: {
    id: 'guitare', name: 'Guitare', domain: 'art', icon: '🎸', type: 'practice',
    skills: ['Gammes', 'Accords', 'Rythmique', 'Théorie', 'Impro', 'Répertoire'],
    metrics: [{ id: 'bpm', name: 'BPM max', unit: 'bpm', higherBetter: true }],
    features: { metronome: true },
    suggestions: [
      { title: 'Pentatonique – position 1',   desc: 'Montée/descente × 4, métronome 80 → 120 BPM. Ne passe pas au suivant tant que c\'est pas propre.', skills: ['Gammes'],           durationMin: 15 },
      { title: 'Transition 4 accords',         desc: 'Am → F → C → G en boucle. Fluidité d\'abord, tempo ensuite.', skills: ['Accords'],           durationMin: 10 },
      { title: 'Rythmique croches',            desc: 'Gratter en croches régulières sur un accord, puis syncopé. Garde les épaules basses.', skills: ['Rythmique'],         durationMin: 10 },
      { title: 'Impro libre sur backing track',desc: '20 min sur un backing track blues/rock. Pas de pression, juste jouer et écouter.', skills: ['Impro'],            durationMin: 20 },
      { title: 'Morceau du répertoire',        desc: 'Joue ton morceau du début à la fin sans t\'arrêter, puis isole les passages difficiles.', skills: ['Répertoire'],       durationMin: 20 },
    ],
  },
  piano: {
    id: 'piano', name: 'Piano', domain: 'art', icon: '🎹', type: 'practice',
    skills: ['Gammes', 'Accords', 'Voicings', 'Main gauche', 'Improvisation', 'Répertoire'],
    metrics: [],
    features: {},
    suggestions: [
      { title: 'Gamme majeure, 2 mains',        desc: 'Monte/descends la gamme de Do sur 2 octaves, mains ensemble. Doigté propre avant vitesse.', skills: ['Gammes'],        durationMin: 15 },
      { title: 'Enchaînement d\'accords',        desc: 'Cmaj7 → Am7 → Dm7 → G7 en boucle, main gauche. Fluidité d\'abord, tempo ensuite.', skills: ['Accords'],       durationMin: 10 },
      { title: 'Voicings main gauche',           desc: 'Joue un enchaînement ii-V-I dans 3 tonalités avec des shell voicings (3e+7e).', skills: ['Voicings'],       durationMin: 15 },
      { title: 'Impro libre sur backing track',  desc: '20 min sur un backing track blues/jazz. Pas de pression, juste jouer et écouter.', skills: ['Improvisation'], durationMin: 20 },
      { title: 'Morceau du répertoire',          desc: 'Joue ton morceau du début à la fin sans t\'arrêter, puis isole les passages difficiles.', skills: ['Répertoire'],    durationMin: 20 },
    ],
  },
  echecs: {
    id: 'echecs', name: 'Échecs', domain: 'esprit', icon: '♟️', type: 'practice',
    skills: ['Ouvertures', 'Tactique', 'Finales', 'Milieu de jeu', 'Analyse'],
    metrics: [{ id: 'elo', name: 'Elo', unit: '', higherBetter: true }],
    features: {},
    suggestions: [
      { title: 'Puzzles tactiques × 15',  desc: '15 puzzles sur Lichess (mode Tactique). 2 min max par puzzle — si tu bloques, passe.', skills: ['Tactique'],      durationMin: 20 },
      { title: 'Partie analysée',          desc: 'Joue une partie longue + analyse Stockfish. Trouve tes 3 erreurs et comprends pourquoi.', skills: ['Analyse'],       durationMin: 45 },
      { title: 'Révision d\'ouverture',    desc: 'Révise 5 coups de ton ouverture principale + les réponses adverses les plus courantes.', skills: ['Ouvertures'],    durationMin: 15 },
      { title: 'Finale Roi + Tour',        desc: 'Entraîne la finale R+T vs R jusqu\'au mat en < 15 coups. Répète jusqu\'à automatisme.', skills: ['Finales'],       durationMin: 20 },
      { title: 'Blitz × 5',               desc: '5 parties blitz (3+2). Après chaque défaite : identifie le moment où tu as perdu le contrôle.', skills: ['Milieu de jeu'], durationMin: 30 },
    ],
  },
  boxe: {
    id: 'boxe', name: 'Boxe', domain: 'corps', icon: '🥊', type: 'practice',
    skills: ['Jab / Direct', 'Jeu de jambes', 'Défense', 'Combinaisons', 'Cardio'],
    metrics: [
      { id: 'poids', name: 'Poids', unit: 'kg', higherBetter: false },
      { id: 'rounds', name: 'Rounds', unit: '', higherBetter: true },
    ],
    features: {},
    suggestions: [
      { title: 'Shadow boxing – technique', desc: '3 rounds × 3 min. Focus : placement des pieds et garde haute. Pas de vitesse, que de la forme.', skills: ['Jeu de jambes', 'Défense'],   durationMin: 15 },
      { title: 'Combos de base × 20',      desc: '1-2 · 1-2-3 · 1-2-3-2 · Chaque combinaison 20 fois, lent puis plein gaz.', skills: ['Jab / Direct', 'Combinaisons'], durationMin: 20 },
      { title: 'Cardio – rounds enchaînés',desc: '5 rounds × 3 min · 1 min récup. Intensité max. Si tu peux parler, c\'est pas assez fort.', skills: ['Cardio'],                        durationMin: 35 },
      { title: 'Défense pure',             desc: '10 min : escamots, parades, esquives. Aucune frappe. Juste encaisser et éviter.', skills: ['Défense'],                        durationMin: 10 },
      { title: 'Corde à sauter',           desc: '10 min de corde : 1 min classique, 1 min double saut, alterner. Coordination + cardio.', skills: ['Cardio', 'Jeu de jambes'],   durationMin: 10 },
    ],
  },
  maths: {
    id: 'maths', name: 'Mathématiques', domain: 'esprit', icon: '➗', type: 'knowledge',
    skills: ['Algèbre', 'Analyse', 'Probabilités', 'Géométrie', 'Logique'],
    metrics: [],
    features: { journal: true, srs: true },
    suggestions: [
      { title: 'Problème ouvert',      desc: '30 min sur un problème difficile. Pas de solution avant d\'avoir vraiment essayé — c\'est là que tu progresses.', skills: ['Logique'],        durationMin: 30 },
      { title: 'Révision de cours',    desc: 'Lis un chapitre, ferme le bouquin, récite de mémoire. Si tu bloques, c\'est que tu n\'avais pas compris.', skills: ['Analyse'],       durationMin: 45 },
      { title: 'Série d\'exercices',   desc: '10 exercices du même type sans regarder le cours. Automatisation > compréhension passive.', skills: ['Algèbre'],       durationMin: 30 },
      { title: 'Méthode Feynman',      desc: 'Prends un concept dur. Explique-le à voix haute comme si tu l\'enseignais à quelqu\'un. Là où tu bloques = là où tu n\'as pas compris.', skills: ['Logique'],        durationMin: 20 },
    ],
  },
  science: {
    id: 'science', name: 'Science', domain: 'esprit', icon: '🔬', type: 'knowledge',
    skills: ['Physique', 'Biologie', 'Chimie', 'Astronomie', 'Général'],
    metrics: [],
    features: { journal: true, srs: true },
    suggestions: [
      { title: 'Lecture d\'article',   desc: 'Un article (Quanta, Pour la Science, Nature). Note les 3 idées clés de tête après lecture.', skills: ['Général'],     durationMin: 25 },
      { title: 'Podcast scientifique', desc: '30 min d\'écoute active. Résume à voix haute juste après — si tu ne peux pas, réécoute.', skills: ['Général'],     durationMin: 30 },
      { title: 'Concept Feynman',      desc: 'Un concept que tu "comprends" mais ne pourrais pas expliquer. Explique-le à voix haute. Sois brutal avec toi-même.', skills: ['Physique'],    durationMin: 20 },
      { title: 'Expérience mentale',   desc: 'Choisis une expérience de pensée célèbre (Schrödinger, Maxwell, Newton) et retrace le raisonnement.', skills: ['Physique', 'Général'], durationMin: 20 },
    ],
  },
  arabe: {
    id: 'arabe', name: 'Arabe', domain: 'langues', icon: '🇲🇦', type: 'language',
    skills: ['Oral', 'Écrit', 'Compréhension orale', 'Lecture', 'Grammaire'],
    metrics: [{ id: 'vocab', name: 'Vocabulaire', unit: 'mots', higherBetter: true }],
    features: { cefr: true, journal: true, srs: true, decks: true },
    suggestions: [
      { title: 'Vocabulaire actif × 20', desc: '20 nouveaux mots. Pour chacun : une phrase d\'exemple en contexte réel. Pas juste la traduction.', skills: ['Écrit'],                          durationMin: 20 },
      { title: 'Écoute native',          desc: '20 min de podcast ou vidéo en arabe. Note ce que tu comprends. Repasse les passages obscurs.', skills: ['Compréhension orale'],           durationMin: 20 },
      { title: 'Production écrite',      desc: 'Écris 5 phrases libres sur ta journée en arabe. Pas de trad mot à mot — pense en arabe.', skills: ['Écrit', 'Grammaire'],             durationMin: 15 },
      { title: 'Lecture à voix haute',   desc: 'Lis un texte arabe à voix haute, lentement. Focus sur les sons que tu écrases habituellement.', skills: ['Lecture', 'Oral'],              durationMin: 15 },
    ],
  },
  espagnol: {
    id: 'espagnol', name: 'Espagnol', domain: 'langues', icon: '🇪🇸', type: 'language',
    skills: ['Oral', 'Écrit', 'Compréhension orale', 'Lecture', 'Grammaire'],
    metrics: [{ id: 'vocab', name: 'Vocabulaire', unit: 'mots', higherBetter: true }],
    features: { cefr: true, journal: true, srs: true, decks: true },
    suggestions: [
      { title: 'Vocabulaire actif × 20', desc: '20 nouveaux mots. Phrase d\'exemple pour chacun. Si t\'as déjà un niveau, vise le registre soutenu.', skills: ['Écrit'],                          durationMin: 20 },
      { title: 'Écoute native',          desc: '20 min de podcast ou vidéo en espagnol (pas de sous-titres). Note 5 expressions que tu n\'aurais pas utilisées.', skills: ['Compréhension orale'],           durationMin: 20 },
      { title: 'Shadowing',              desc: '15 min : répète après un locuteur natif phrase par phrase. Copie l\'accent, le rythme, la musique.', skills: ['Oral'],                          durationMin: 15 },
      { title: 'Conversation seul',      desc: 'Parle de ta journée à voix haute en espagnol pendant 10 min. Blocages = mots à apprendre.', skills: ['Oral', 'Grammaire'],             durationMin: 10 },
    ],
  },
  economie: {
    id: 'economie', name: 'Éco / Finance', domain: 'pro', icon: '💹', type: 'knowledge',
    skills: ['Comptabilité', 'Finance d\'entreprise', 'Finance de marché', 'Microéco', 'Macroéco'],
    metrics: [],
    features: { journal: true, srs: true, decks: true },
    suggestions: [
      { title: 'Réexpliquer 1 notion',   desc: 'Prends une carte finance révisée et explique-la à voix haute comme à un recruteur. Si tu bloques, tu ne la maîtrises pas.', skills: ['Finance d\'entreprise'], durationMin: 15 },
      { title: 'Lecture d\'un rapport',  desc: 'Ouvre le rapport annuel d\'une boîte cotée. Repère EBITDA, dette nette, FCF. Note ce que tu ne comprends pas → nouvelles cartes.', skills: ['Comptabilité'],     durationMin: 30 },
      { title: 'Actu marché',            desc: '15 min de presse éco (Les Échos, FT). Résume une info et son impact marché en 3 phrases.', skills: ['Finance de marché', 'Macroéco'], durationMin: 15 },
      { title: 'Cas pratique',           desc: 'Refais un mini-cas : calcule un BFR, une VAN ou un WACC sur des chiffres réels. La compta s\'apprend en faisant.', skills: ['Finance d\'entreprise'],  durationMin: 25 },
    ],
  },
  lettres: {
    id: 'lettres', name: 'Lettres & Idées', domain: 'esprit', icon: '📖', type: 'knowledge',
    skills: ['Compréhension', 'Analyse critique', 'Culture générale', 'Argumentation'],
    metrics: [],
    features: { reading: true },
    suggestions: [
      { title: 'Lecture du jour',        desc: 'Lis le texte du jour, réponds aux questions, écris ta position en 3 lignes. La culture se construit un texte à la fois.', skills: ['Compréhension'],     durationMin: 15 },
      { title: 'Reformuler une idée',    desc: 'Prends une idée lue cette semaine et réexplique-la à voix haute, sans jargon, comme à un ami. Si tu n\'y arrives pas, tu ne l\'as pas comprise.', skills: ['Argumentation'], durationMin: 10 },
      { title: 'Position contraire',     desc: 'Reprends ta dernière opinion écrite et défends la thèse INVERSE pendant 5 min. C\'est comme ça qu\'on muscle un avis solide.', skills: ['Analyse critique'], durationMin: 10 },
    ],
  },
};

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const SRS_INTERVALS = [1, 3, 7, 16, 35, 90, 180];

/* Habitudes non négociables du quotidien (écran « Aujourd'hui »).
   auto: true  → cochée automatiquement quand la condition est remplie (ex. révisions faites). */
const DAILY_HABITS = [
  { id: 'wake',   name: 'Réveil avant 8h',          icon: '⏰', xp: 20 },
  { id: 'sport',  name: 'Bouger (boxe / cardio)',    icon: '🥊', xp: 25 },
  { id: 'review', name: 'Faire ses révisions du jour', icon: '🧠', xp: 15, auto: true },
  { id: 'deep',   name: '1 vraie session (≥ 20 min)', icon: '🎯', xp: 20, auto: true },
];

/* Combien de nouvelles cartes injectées par jour quand tu démarres une leçon. */
const NEW_CARDS_PER_DAY = 8;

/* Dureté progressive : nombre de jours « doux » avant que le système ne durcisse. */
const HARDNESS_RAMP_DAYS = 14;

const BADGES = [
  { id: 'first_step',   name: 'Premier pas',        icon: '🌱', desc: 'Première activité loggée.',
    cond: (s, h) => h.totalActivities(s) >= 1 },
  { id: 'streak_3',     name: 'Trois jours',        icon: '🔥', desc: '3 jours d\'affilée.',
    cond: (s, h) => h.currentStreak(s) >= 3 },
  { id: 'streak_7',     name: 'Une semaine',        icon: '🔥', desc: '7 jours d\'affilée.',
    cond: (s, h) => h.currentStreak(s) >= 7 },
  { id: 'streak_30',    name: 'Un mois de feu',     icon: '🌋', desc: '30 jours d\'affilée.',
    cond: (s, h) => h.currentStreak(s) >= 30 },
  { id: 'level_5',      name: 'Niveau 5',           icon: '⭐', desc: 'Niveau global 5.',
    cond: (s, h) => h.globalLevel(s) >= 5 },
  { id: 'level_10',     name: 'Niveau 10',          icon: '🌟', desc: 'Niveau global 10.',
    cond: (s, h) => h.globalLevel(s) >= 10 },
  { id: 'polymath',     name: 'Touche-à-tout',      icon: '🧩', desc: 'Actif dans les 4 domaines.',
    cond: (s, h) => h.activeDomains(s) >= 4 },
  { id: 'scholar',      name: 'Érudit',             icon: '📚', desc: '50 connaissances apprises.',
    cond: (s) => s.journal.length >= 50 },
  { id: 'reviewer',     name: 'Mémoire d\'acier',   icon: '🧠', desc: '100 révisions réussies.',
    cond: (s) => (s.stats.reviewsDone || 0) >= 100 },
  { id: 'centurion',    name: 'Centurion',          icon: '🏛️', desc: '100 séances loggées.',
    cond: (s, h) => h.totalSessions(s) >= 100 },
  { id: 'fallacy_master', name: 'Repéreur de sophismes', icon: '🧩', desc: 'Les 10 sophismes explorés.',
    cond: (s) => new Set((s.fallacyJournal || []).map((e) => e.fallacyId)).size >= 10 },
  { id: 'debate_master',  name: 'Grand débatteur',       icon: '⚖️', desc: 'Les 10 débats et duels synthétisés.',
    cond: (s) => new Set((s.debateJournal || []).map((e) => e.debateId)).size >= 10 },
  { id: 'models_master',  name: 'Philosophe en herbe',   icon: '🧰', desc: 'Les 10 modèles mentaux appliqués.',
    cond: (s) => new Set(((s.mentalModels && s.mentalModels.journal) || []).map((e) => e.modelId)).size >= 10 },
  { id: 'bias_master',    name: 'Traqueur de biais',     icon: '🎭', desc: 'Les 10 biais cognitifs repérés.',
    cond: (s) => new Set((s.biasJournal || []).map((e) => e.biasId)).size >= 10 },
  { id: 'well_calibrated', name: 'Bien calibré',         icon: '📡', desc: '10 prédictions réelles résolues.',
    cond: (s) => (s.predictions || []).filter((p) => p.resolved).length >= 10 },
];

const CAL_CATEGORIES = [
  { id: 'perso',    label: 'Perso',            color: '#a78bfa', icon: '✨' },
  { id: 'stage',    label: 'Stage / Travail',  color: '#0ea5e9', icon: '💼' },
  { id: 'anniv',    label: 'Anniversaire',     color: '#f59e0b', icon: '🎂' },
  { id: 'echeance', label: 'Échéance',         color: '#ef4444', icon: '⏰' },
  { id: 'sante',    label: 'Santé',            color: '#10b981', icon: '💊' },
];

window.MAESTRIA_CONFIG = { DOMAINS, DISCIPLINES, CEFR_LEVELS, SRS_INTERVALS, BADGES, CAL_CATEGORIES,
  DAILY_HABITS, NEW_CARDS_PER_DAY, HARDNESS_RAMP_DAYS };
