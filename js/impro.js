/* ============================================================
   Maestria — Impro Coach : conseils pratiques d'improvisation,
   débloqués au fil des gammes apprises dans les cours (js/courses.js).
   Ajouter une fiche = ajouter un objet dans IMPRO_TIPS. Rien d'autre.
   ============================================================ */

const IMPRO_TIPS = [
  {
    id: 'pmin', icon: '🎸', title: 'Impro — Pentatonique mineure',
    scaleRef: 'm2l1',
    when: `Sur un accord ou une progression mineure — ton choix par défaut.`,
    tips: [
      `Reste d'abord sur 3‑4 notes, répète-les avec des rythmes différents avant de vouloir « tout jouer ».`,
      `Utilise les silences : une phrase qui respire vaut mieux qu'un déluge de notes.`,
      `Termine tes phrases sur la fondamentale ou la quinte pour que ça sonne « résolu ».`,
    ],
    suggestedStyles: ['Blues lent (La mineur)', 'Rock/Groove (Mi mineur)'],
  },
  {
    id: 'pmaj', icon: '🎸', title: 'Impro — Pentatonique majeure',
    scaleRef: 'm2l2',
    when: `Sur un accord ou une progression majeure, pour une couleur plus « positive ».`,
    tips: [
      `Le 2e degré (la 2nde) est ta meilleure note de couleur « country/pop » — utilise-la en passage.`,
      `Essaie de résoudre tes phrases sur la tierce plutôt que la fondamentale, pour varier.`,
      `Alterne penta mineure et majeure sur le MÊME accord pour entendre 2 couleurs différentes.`,
    ],
    suggestedStyles: ['Pop/Country (Do majeur)', 'Funk léger (Sol majeur)'],
  },
  {
    id: 'blues', icon: '🎸', title: 'Impro — Blues',
    scaleRef: 'm2l3',
    when: `Sur une grille de blues (12 mesures) ou tout backing track blues/rock.`,
    tips: [
      `La blue note (♭5) se joue vite, en passage ou en léger bend — jamais tenue.`,
      `Le « call and response » : joue une phrase courte (l'appel), laisse un silence, réponds avec une variation.`,
      `Varie la dynamique : commence doux, monte en intensité vers la fin du chorus.`,
    ],
    suggestedStyles: ['Blues 12 mesures (Mi)', 'Slow blues (La)'],
  },
  {
    id: 'majscale', icon: '🎸', title: 'Impro — Gamme majeure',
    scaleRef: 'm1l1',
    when: `Pour un phrasé plus mélodique, sur une progression diatonique simple.`,
    tips: [
      `Cible les notes de l'accord (1, 3, 5) sur les temps forts ; les autres notes servent de passage.`,
      `7 notes = 7 couleurs : tiens chaque degré sur l'accord I pour entendre sa tension propre.`,
      `Une gamme n'est pas une suite à monter/descendre : pense-la comme un vocabulaire, pas une échelle.`,
    ],
    suggestedStyles: ['Ballade pop (Do majeur)', 'Backing track diatonique simple'],
  },
];

window.MAESTRIA_IMPRO = { IMPRO_TIPS };
