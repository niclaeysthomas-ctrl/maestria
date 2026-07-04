/* ============================================================
   Maestria — Cours structurés (« Le Grimoire des Gammes »).
   Un cours = discipline + modules + leçons. Chaque module se clôt
   par une FICHE théorique, débloquée à vie une fois le module terminé.
   Ajouter une leçon = ajouter un objet. Rien d'autre à toucher.

   Diagramme de manche : { fromFret, toFret, dots:[{s,f,root?,label?}] }
     s : 1 = mi aigu (haut) … 6 = mi grave (bas)   f : n° de case absolu
   ============================================================ */

const COURSES = {
  guitare: {
    id: 'guitare', disciplineId: 'guitare',
    title: 'Le Grimoire des Gammes',
    subtitle: 'De la gamme majeure au jazz, pas à pas',
    modules: [

      /* ---------------- MODULE 0 — FONDATIONS ---------------- */
      {
        id: 'm0', icon: '🧭', title: 'Fondations',
        goal: `Les repères pour lire le manche et comprendre d'où viennent les gammes.`,
        lessons: [
          {
            id: 'm0l1', title: 'Repères & octaves',
            goal: `Retrouver n'importe quelle note sur le manche sans réfléchir.`,
            theory: `Les 6 cordes à vide, de la plus grave à la plus aiguë : mi–la–ré–sol–si–mi (E A D G B E). Les points de repère sont aux cases 3, 5, 7, 9, et doublés à la 12 (l'octave du manche à vide). Astuce clé : les formes d'octave. Une note et son octave gardent toujours le même écart de doigts — apprends ces deux formes et tu situes n'importe quelle note à partir des cordes graves.`,
            diagram: { fromFret: 1, toFret: 4, dots: [
              { s:6, f:1, root:true, label:'R' }, { s:4, f:3, label:'8' },
              { s:5, f:1, root:true, label:'R' }, { s:3, f:3, label:'8' },
            ] },
            tab: null, bpm: null,
            success: `Tu nommes 5 notes au hasard sur les cordes de mi grave et de la, en moins de 3 s chacune.`,
            cards: [
              { front:`Cordes à vide (grave → aigu)`, back:`Mi La Ré Sol Si Mi — E A D G B E` },
              { front:`Cases avec un repère (point)`, back:`3, 5, 7, 9 — et double au 12 (octave)` },
              { front:`Forme d'octave la plus courante`, back:`Corde grave → 2 cordes plus aigu, +2 cases` },
            ],
            pitfall: `Mémoriser note par note. Sers-toi des octaves et des repères : c'est dix fois plus rapide.`,
          },
          {
            id: 'm0l2', title: 'Ton, demi-ton & degrés',
            goal: `Comprendre qu'une gamme n'est qu'une formule d'intervalles.`,
            theory: `Sur le manche, une case = un demi-ton (½), deux cases = un ton (T). Une gamme, ce ne sont pas des notes fixes : c'est une suite d'écarts. On numérote ses notes en degrés (1 à 7). La même formule, partie de n'importe quelle note, redonne la même couleur — c'est ce qui rend tout transposable, et c'est toute la logique du reste du cours.`,
            diagram: null, tab: null, bpm: null,
            success: `Tu expliques à voix haute la différence ton / demi-ton et ce qu'est un degré.`,
            cards: [
              { front:`1 case sur le manche =`, back:`un demi-ton (½)` },
              { front:`2 cases =`, back:`un ton (T)` },
              { front:`Une gamme, c'est…`, back:`une formule d'intervalles (pas des notes fixes) → transposable` },
            ],
            pitfall: `Penser en noms de notes plutôt qu'en degrés : tu resteras prisonnier d'une seule tonalité.`,
          },
        ],
        fiche: {
          title: 'Fondations — l\'essentiel',
          intro: `Les repères de base sur lesquels tout le reste s'appuie.`,
          sections: [
            { h:`Le manche`, body:`Cordes à vide : Mi La Ré Sol Si Mi (E A D G B E). Repères aux cases 3-5-7-9, double au 12.` },
            { h:`Les octaves`, body:`Retrouve une note via sa forme d'octave (corde grave → 2 cordes plus aigu, +2 cases) plutôt que par cœur.` },
            { h:`Ton / demi-ton`, body:`1 case = ½ ton, 2 cases = 1 ton. Une gamme = une formule d'intervalles, transposable partout.` },
            { h:`Les degrés`, body:`On numérote les notes 1→7. On décrit toutes les gammes par rapport à la majeure (ex. ♭3 = mineur).` },
          ],
          diagram: { fromFret: 1, toFret: 4, dots: [
            { s:6, f:1, root:true, label:'R' }, { s:4, f:3, label:'8' },
            { s:5, f:1, root:true, label:'R' }, { s:3, f:3, label:'8' },
          ] },
        },
      },

      /* ---------------- MODULE 1 — LA GAMME MAJEURE ---------------- */
      {
        id: 'm1', icon: '🌞', title: 'La gamme majeure',
        goal: `Maîtriser la gamme mère : sa formule, sa forme sur le manche, et la jouer proprement.`,
        lessons: [
          {
            id: 'm1l1', title: 'La formule majeure',
            goal: `Construire n'importe quelle gamme majeure de tête.`,
            theory: `La gamme majeure suit toujours la formule T‑T‑½‑T‑T‑T‑½, soit sept degrés (1 2 3 4 5 6 7) avant de retrouver l'octave. En do : do‑ré‑mi‑fa‑sol‑la‑si‑do, sans aucune altération — c'est la règle de référence. Toutes les autres gammes se décrivent par rapport à elle (une tierce bémolisée, ♭3, donne une couleur mineure, etc.).`,
            diagram: null, tab: null, bpm: null,
            success: `Tu récites la formule et tu construis la gamme de Sol majeur (Sol La Si Do Ré Mi Fa#) sans hésiter.`,
            cards: [
              { front:`Formule de la gamme majeure`, back:`T‑T‑½‑T‑T‑T‑½` },
              { front:`Gamme de Do majeur`, back:`Do Ré Mi Fa Sol La Si (aucune altération)` },
              { front:`Gamme de Sol majeur`, back:`Sol La Si Do Ré Mi Fa# (un dièse)` },
              { front:`Les demi-tons de la gamme majeure tombent entre…`, back:`les degrés 3‑4 et 7‑8` },
            ],
            pitfall: `Oublier le ½ ton entre 3‑4 et 7‑8 : c'est précisément là que se joue la couleur « majeure ».`,
          },
          {
            id: 'm1l2', title: 'La forme sur le manche (3 notes/corde)',
            goal: `Poser la gamme majeure sur tout le manche avec une forme mobile.`,
            theory: `Voici la forme majeure à 3 notes par corde, ici en Sol (fondamentale sur la corde de mi grave, case 3). C'est une forme mobile : décale-la et tu changes de tonalité (case 5 = La majeur…). Repère bien les fondamentales, elles t'ancrent : mi grave case 3, corde de ré case 5, corde de si case 8.`,
            diagram: { fromFret: 3, toFret: 8, dots: [
              { s:6, f:3, root:true }, { s:6, f:5 }, { s:6, f:7 },
              { s:5, f:3 }, { s:5, f:5 }, { s:5, f:7 },
              { s:4, f:4 }, { s:4, f:5, root:true }, { s:4, f:7 },
              { s:3, f:4 }, { s:3, f:5 }, { s:3, f:7 },
              { s:2, f:5 }, { s:2, f:7 }, { s:2, f:8, root:true },
              { s:1, f:5 }, { s:1, f:7 }, { s:1, f:8 },
            ] },
            tab: null, bpm: null,
            success: `Tu joues la forme montée + descente, lentement, sans fausse note, en nommant les fondamentales au passage.`,
            cards: [
              { front:`Combien de notes par corde dans cette forme ?`, back:`3 — idéal pour le legato et l'alternate picking à venir` },
              { front:`Fondamentale de la forme (corde grave)`, back:`Corde de mi grave, à la case de la tonique (Sol = case 3)` },
            ],
            pitfall: `Vouloir aller vite : la forme s'apprend d'abord lente et propre — une note, un son clair.`,
          },
          {
            id: 'm1l3', title: 'Alternate picking sur la gamme',
            goal: `Jouer la gamme proprement en aller‑retour strict, au métronome.`,
            theory: `Aller‑retour strict du médiator (bas‑haut‑bas‑haut) sur chaque note, sans exception, même en changeant de corde. C'est la base de la vélocité et d'un son régulier. Règle d'or : la propreté avant la vitesse — la vitesse n'est qu'un effet secondaire de la précision.`,
            diagram: { fromFret: 3, toFret: 8, dots: [
              { s:6, f:3, root:true }, { s:6, f:5 }, { s:6, f:7 },
              { s:5, f:3 }, { s:5, f:5 }, { s:5, f:7 },
              { s:4, f:4 }, { s:4, f:5, root:true }, { s:4, f:7 },
            ] },
            tab: `E|--3--5--7-----------------|\nA|-----------3--5--7--------|\nD|--------------------4--5--7|`,
            bpm: { start: 60, goal: 110 },
            success: `Montée + descente complète, aller‑retour strict, propre à 100 BPM, trois fois de suite sans faute.`,
            cards: [
              { front:`Alternate picking =`, back:`aller‑retour strict du médiator (bas‑haut), même en changeant de corde` },
              { front:`Règle d'or de la vitesse`, back:`La propreté d'abord ; la vitesse vient toute seule ensuite` },
            ],
            pitfall: `Enchaîner deux coups vers le bas en changeant de corde : ça casse la régularité. Garde l'alternance coûte que coûte.`,
          },
        ],
        fiche: {
          title: 'La gamme majeure — l\'essentiel',
          intro: `La gamme mère : tout le reste du Grimoire s'y réfère.`,
          sections: [
            { h:`Formule`, body:`T‑T‑½‑T‑T‑T‑½. Demi-tons entre les degrés 3‑4 et 7‑8. Degrés : 1 2 3 4 5 6 7.` },
            { h:`Exemples`, body:`Do majeur : Do Ré Mi Fa Sol La Si. Sol majeur : Sol La Si Do Ré Mi Fa#.` },
            { h:`La forme (3 notes/corde)`, body:`Forme mobile, fondamentale sur la corde de mi grave. Décale-la pour transposer.` },
            { h:`Technique`, body:`Alternate picking strict (bas‑haut), même au changement de corde. Propreté > vitesse.` },
            { h:`Le pont vers la suite`, body:`La pentatonique = cette gamme allégée de 2 notes. C'est le prochain module.` },
          ],
          diagram: { fromFret: 3, toFret: 8, dots: [
            { s:6, f:3, root:true }, { s:6, f:5 }, { s:6, f:7 },
            { s:5, f:3 }, { s:5, f:5 }, { s:5, f:7 },
            { s:4, f:4 }, { s:4, f:5, root:true }, { s:4, f:7 },
            { s:3, f:4 }, { s:3, f:5 }, { s:3, f:7 },
            { s:2, f:5 }, { s:2, f:7 }, { s:2, f:8, root:true },
            { s:1, f:5 }, { s:1, f:7 }, { s:1, f:8 },
          ] },
        },
      },

      /* ---------------- MODULE 2 — PENTATONIQUE & BLUES ---------------- */
      {
        id: 'm2', icon: '🎶', title: 'Pentatonique & blues',
        goal: `L'outil du soliste : la gamme qui sonne juste presque partout.`,
        lessons: [
          {
            id: 'm2l1', title: 'La pentatonique mineure (Box 1)',
            goal: `Poser la Box 1 — la position la plus utilisée de tout le manche.`,
            theory: `La pentatonique mineure ne garde que 5 notes de la gamme mineure : fondamentale, tierce mineure, quarte, quinte, septième mineure (1 ♭3 4 5 ♭7). Elle retire les 2 notes qui créent le plus de tension avec un accord mineur — résultat, une gamme qui « sonne juste » presque n'importe où. C'est l'outil n°1 du soliste débutant. Il existe 5 positions (« boxes ») qui couvrent tout le manche ; voici la Box 1, la plus jouée, ici en La mineur.`,
            diagram: { fromFret: 5, toFret: 8, dots: [
              { s:6, f:5, root:true }, { s:6, f:8 },
              { s:5, f:5 }, { s:5, f:7 },
              { s:4, f:5 }, { s:4, f:7 },
              { s:3, f:5 }, { s:3, f:7 },
              { s:2, f:5 }, { s:2, f:8 },
              { s:1, f:5, root:true }, { s:1, f:8 },
            ] },
            tab: `E|--5--8-------------------------|\nA|-----------5--7-----------------|\nD|--------------------5--7--------|`,
            tabLabel: `🎸 Exercice`,
            bpm: { start: 70, goal: 120 },
            success: `Joue la Box 1 en La mineur, montée puis descente, sans fausse note, en insistant sur la fondamentale (corde de mi grave, case 5).`,
            cards: [
              { front:`Formule de la pentatonique mineure`, back:`1 ♭3 4 5 ♭7 (5 notes)` },
              { front:`Pourquoi elle « sonne juste » presque partout ?`, back:`Elle retire les 2 notes (2nde, 6te) qui créent le plus de tension` },
              { front:`La mineur pentatonique = quelles notes ?`, back:`La Do Ré Mi Sol (A C D E G)` },
            ],
            pitfall: `Vouloir apprendre les 5 boxes tout de suite. Maîtrise la Box 1 à fond d'abord — elle sert 80 % du temps.`,
          },
          {
            id: 'm2l2', title: 'La pentatonique majeure & la relative',
            goal: `Comprendre que la même forme peut sonner « joyeuse » ou « mineure » selon la tonique.`,
            theory: `Reprends exactement le même dessin de frettes : les notes sont identiques, mais si tu recentres ton oreille sur Do au lieu de La, tu entends une couleur totalement différente — la pentatonique MAJEURE (formule 1 2 3 5 6). Elle partage exactement les mêmes notes que sa relative mineure (la relative mineure d'une gamme majeure = son 6e degré). En pratique : La mineur pentatonique = Do majeur pentatonique, même forme, tonique différente.`,
            diagram: { fromFret: 5, toFret: 8, dots: [
              { s:6, f:5 }, { s:6, f:8, root:true },
              { s:5, f:5 }, { s:5, f:7 },
              { s:4, f:5 }, { s:4, f:7 },
              { s:3, f:5, root:true }, { s:3, f:7 },
              { s:2, f:5 }, { s:2, f:8 },
              { s:1, f:5 }, { s:1, f:8, root:true },
            ] },
            tab: null, bpm: null,
            success: `Joue la même Box en la faisant résoudre sur Do (corde de sol, case 5) au lieu de La — écoute la couleur changer.`,
            cards: [
              { front:`Formule de la pentatonique majeure`, back:`1 2 3 5 6 (5 notes)` },
              { front:`Relative mineure d'une gamme majeure =`, back:`son 6e degré` },
              { front:`La mineur pentatonique et Do majeur pentatonique partagent…`, back:`exactement les mêmes notes — seule la tonique change` },
            ],
            pitfall: `Penser que la penta majeure est une forme à apprendre en plus. C'est la MÊME forme : seule ta résolution change.`,
          },
          {
            id: 'm2l3', title: 'La blue note & la gamme blues',
            goal: `Ajouter la note qui donne toute sa couleur au blues et au rock.`,
            theory: `Ajoute une seule note à la pentatonique mineure — la quinte diminuée (♭5), surnommée la « blue note » — et tu obtiens la gamme blues (1 ♭3 4 ♭5 5 ♭7). C'est LA note qui donne cette couleur tendue, typique du blues et du rock. Elle se joue en passage rapide ou en bend, jamais tenue longtemps : c'est une note de tension qui doit résoudre vers la quarte ou la quinte juste.`,
            diagram: { fromFret: 5, toFret: 8, dots: [
              { s:6, f:5, root:true }, { s:6, f:8 },
              { s:5, f:5 }, { s:5, f:6, label:'♭5' }, { s:5, f:7 },
              { s:4, f:5 }, { s:4, f:7 },
              { s:3, f:5 }, { s:3, f:7 }, { s:3, f:8, label:'♭5' },
              { s:2, f:5 }, { s:2, f:8 },
              { s:1, f:5, root:true }, { s:1, f:8 },
            ] },
            tab: `A|--5--6--7------------------|\nD|-----------5--7--6b7--5----|`,
            tabLabel: `🎸 Lick avec la blue note`,
            bpm: { start: 60, goal: 100 },
            success: `Joue un lick de 4‑5 notes dans la Box 1 qui inclut la blue note (corde de la, case 6) en résolvant vers la quinte.`,
            cards: [
              { front:`Formule de la gamme blues`, back:`1 ♭3 4 ♭5 5 ♭7` },
              { front:`La « blue note » = quel degré ?`, back:`La quinte diminuée (♭5), entre la quarte et la quinte` },
              { front:`Où résout généralement la blue note ?`, back:`Vers la quarte ou la quinte juste — jamais tenue` },
            ],
            pitfall: `Laisser sonner la blue note comme une note normale. Elle doit rester une note de passage, en tension.`,
          },
        ],
        fiche: {
          title: 'Pentatonique & blues — l\'essentiel',
          intro: `L'outil de base de tout soliste — et le point de départ de ton impro sur backing tracks.`,
          sections: [
            { h:`Pentatonique mineure`, body:`Formule 1 ♭3 4 5 ♭7. Box 1 = la position la plus utilisée de tout le manche.` },
            { h:`Pentatonique majeure & relative`, body:`Mêmes notes que la relative mineure (son 6e degré) — même forme, tonique différente.` },
            { h:`La blue note`, body:`♭5 ajoutée à la penta mineure = gamme blues. Note de tension, à faire résoudre, jamais tenue.` },
          ],
          diagram: { fromFret: 5, toFret: 8, dots: [
            { s:6, f:5, root:true }, { s:6, f:8 },
            { s:5, f:5 }, { s:5, f:7 },
            { s:4, f:5 }, { s:4, f:7 },
            { s:3, f:5 }, { s:3, f:7 },
            { s:2, f:5 }, { s:2, f:8 },
            { s:1, f:5, root:true }, { s:1, f:8 },
          ] },
        },
      },

      /* ---------------- MODULE 5 — TRIADES ---------------- */
      {
        id: 'm5', icon: '🔺', title: 'Triades',
        goal: `Le plus petit accord possible — la brique de base de toute l'harmonie.`,
        lessons: [
          {
            id: 'm5l1', title: 'Construction des triades',
            goal: `Comprendre les 4 qualités de triades et leurs formules.`,
            theory: `Une triade est le plus petit accord possible : 3 notes empilées par tierces à partir de la fondamentale — degrés 1, 3, 5. Change la 3ce et la 5te et tu changes la couleur : majeur (1 3 5), mineur (1 ♭3 5), diminué (1 ♭3 ♭5 — instable, tendu), augmenté (1 3 #5 — flottant, rare). Tout accord plus complexe (7e, 9e…) part d'une de ces 4 triades de base.`,
            diagram: null, tab: null, bpm: null,
            success: `Récite les 4 formules de tête et donne un exemple de chaque en partant de Do (Do Mi Sol, Do Mib Sol, Do Mib Solb, Do Mi Sol#).`,
            cards: [
              { front:`Triade majeure`, back:`1 3 5` },
              { front:`Triade mineure`, back:`1 ♭3 5` },
              { front:`Triade diminuée`, back:`1 ♭3 ♭5 (instable, tendu)` },
              { front:`Triade augmentée`, back:`1 3 #5 (flottant, rare)` },
            ],
            pitfall: `Retenir les triades comme des « formes de main » sans les degrés : tu bloques dès qu'il faut sortir de la position apprise par cœur.`,
          },
          {
            id: 'm5l2', title: 'Une position mobile',
            goal: `Jouer une triade sur 3 cordes et la transposer.`,
            theory: `Sur 3 cordes adjacentes, une triade se joue avec 3 doigts — utile pour un rythmique clair (funk, pop) ou pour bien entendre l'accord isolé du reste. Voici la triade de Do majeur sur les 3 cordes aiguës. Comme toute forme sur le manche, elle est mobile : décale-la et tu changes de tonalité.`,
            diagram: { fromFret: 3, toFret: 5, dots: [ { s:3, f:5, root:true }, { s:2, f:5 }, { s:1, f:3 } ] },
            tab: `e|--3--|\nB|--5--|\nG|--5--|`,
            tabLabel: `🎸 Triade de Do majeur (jouée ensemble)`,
            bpm: null,
            success: `Joue cette triade de Do proprement (3 notes ensemble, son clair), puis décale-la de 2 cases pour obtenir Ré majeur.`,
            cards: [
              { front:`Cette forme de triade est-elle mobile ?`, back:`Oui — décale-la sur le manche pour changer de tonalité, sans rien changer aux doigts` },
            ],
            pitfall: `Étouffer une des 3 cordes par erreur — vérifie que les 3 notes sonnent clairement, isolées puis ensemble.`,
          },
        ],
        fiche: {
          title: 'Triades — l\'essentiel',
          intro: `La brique de base : tout accord plus riche en dérive.`,
          sections: [
            { h:`Construction`, body:`Empiler des tierces à partir de la fondamentale : degrés 1, 3, 5.` },
            { h:`Les 4 qualités`, body:`Majeur (1 3 5) · mineur (1 ♭3 5) · diminué (1 ♭3 ♭5) · augmenté (1 3 #5).` },
            { h:`Position mobile`, body:`Une forme sur 3 cordes adjacentes se décale sur le manche pour changer de tonalité.` },
          ],
          diagram: { fromFret: 3, toFret: 5, dots: [ { s:3, f:5, root:true }, { s:2, f:5 }, { s:1, f:3 } ] },
        },
      },

      /* ---------------- MODULE 6 — ACCORDS DE 7e ---------------- */
      {
        id: 'm6', icon: '7️⃣', title: 'Accords de 7e',
        goal: `Empiler une 4e tierce : la couleur qui ouvre la porte du jazz.`,
        lessons: [
          {
            id: 'm6l1', title: 'D\'où viennent les accords de 7e',
            goal: `Connaître les 5 qualités de 7e et leurs formules.`,
            theory: `Empile une 4e tierce sur la triade (un degré 7) et tu obtiens un accord de 7e — 4 notes, une couleur plus riche, plus « jazz ». Cinq qualités à connaître : Maj7 (1 3 5 7 — doux, rêveur), 7 dit « de dominante » (1 3 5 ♭7 — tension qui veut résoudre), m7 (1 ♭3 5 ♭7 — mineur doux), m7♭5 (1 ♭3 ♭5 ♭7 — instable, le ii d'un ii‑V‑I mineur), dim7 (1 ♭3 ♭5 ♭♭7 — symétrique, très tendu).`,
            diagram: null, tab: null, bpm: null,
            success: `Explique à voix haute la différence entre Maj7 et 7 (dominante) — c'est LA confusion n°1 à éviter.`,
            cards: [
              { front:`Maj7 (formule)`, back:`1 3 5 7 — doux, rêveur` },
              { front:`7 « de dominante » (formule)`, back:`1 3 5 ♭7 — tension qui veut résoudre` },
              { front:`m7 (formule)`, back:`1 ♭3 5 ♭7` },
              { front:`m7♭5 (« demi-diminué »)`, back:`1 ♭3 ♭5 ♭7 — le ii d'un ii‑V‑I mineur` },
              { front:`dim7`, back:`1 ♭3 ♭5 ♭♭7 — accord symétrique, très tendu` },
            ],
            pitfall: `Confondre « 7 » (dominante, 7e MINEURE) et « maj7 » (7e MAJEURE) — ça change complètement le son de l'accord.`,
          },
          {
            id: 'm6l2', title: 'Un voicing pratique : Cmaj7',
            goal: `Jouer un voicing compact de Cmaj7 sans la 5te.`,
            theory: `En jazz, on ne joue presque jamais les 4 notes complètes sur 6 cordes : on choisit un « shell voicing » — fondamentale, 7e, 3ce — en sautant une corde (souvent la 5te, la moins essentielle à la couleur, est sacrifiée). Voici Cmaj7 : fondamentale sur la corde de la, 7e majeure 1 corde plus haut en sautant la corde de ré, 3ce sur la corde de si.`,
            diagram: { fromFret: 3, toFret: 5, dots: [ { s:5, f:3, root:true }, { s:3, f:4, label:'7' }, { s:2, f:5, label:'3' } ] },
            tab: `A|--3--| (Do, fondamentale)\nG|--4--| (Si, 7e majeure)\nB|--5--| (Mi, 3ce)`,
            tabLabel: `🎸 Cmaj7 (corde de ré non jouée)`,
            bpm: null,
            success: `Joue ce Cmaj7 proprement (corde de ré muette), puis explique quelle note tu changerais pour obtenir C7 (dominante).`,
            cards: [
              { front:`Pour transformer ce Cmaj7 en C7 (dominante), quelle note bouge ?`, back:`La 7e (corde de sol) descend d'une case : 7e majeure → 7e mineure` },
            ],
            pitfall: `Laisser sonner la corde de ré (non voulue dans ce voicing) : mute-la avec le doigt qui frette la corde de la.`,
          },
        ],
        fiche: {
          title: 'Accords de 7e — l\'essentiel',
          intro: `La couleur qui ouvre la porte du jazz.`,
          sections: [
            { h:`D'où ils viennent`, body:`On empile une 4e tierce (degré 7) sur la triade.` },
            { h:`Les 5 qualités`, body:`Maj7 (1 3 5 7) · 7 dominante (1 3 5 ♭7) · m7 (1 ♭3 5 ♭7) · m7♭5 (1 ♭3 ♭5 ♭7) · dim7 (1 ♭3 ♭5 ♭♭7).` },
            { h:`Voicing pratique`, body:`Shell voicing : fondamentale-7e-3ce sur 3 cordes non-adjacentes, 5te sacrifiée.` },
          ],
          diagram: { fromFret: 3, toFret: 5, dots: [ { s:5, f:3, root:true }, { s:3, f:4, label:'7' }, { s:2, f:5, label:'3' } ] },
        },
      },

      /* ---------------- MODULE 7 — EXTENSIONS : 9e, 11e, 13e ---------------- */
      {
        id: 'm7', icon: '✨', title: 'Extensions : 9e, 11e, 13e',
        goal: `Ajouter de la couleur sans changer la fonction de l'accord.`,
        lessons: [
          {
            id: 'm7l1', title: 'Le principe des extensions',
            goal: `Comprendre d'où viennent les extensions et ce qu'on sacrifie pour les jouer.`,
            theory: `Continue d'empiler des tierces au-delà de la 7e et tu obtiens les extensions : la 9e (= la 2e, une octave plus haut), la 11e (= la 4e + octave), la 13e (= la 6e + octave). Elles ajoutent de la couleur sans changer la fonction fondamentale de l'accord — un Cmaj9 reste un accord de Do, juste plus riche. Sur une guitare à 6 cordes, on ne joue jamais les 7 notes empilées : on choisit 4‑5 notes qui capturent la couleur, et la 5te est souvent la première sacrifiée.`,
            diagram: null, tab: null, bpm: null,
            success: `Réponds sans hésiter : la 9e correspond à quel degré ? Et la 13e ?`,
            cards: [
              { front:`La 9e = quel degré ?`, back:`La 2e, jouée une octave plus haut` },
              { front:`La 11e = quel degré ?`, back:`La 4e, jouée une octave plus haut` },
              { front:`La 13e = quel degré ?`, back:`La 6e, jouée une octave plus haut` },
              { front:`Sur un accord étendu, quelle note sacrifie-t-on en premier ?`, back:`La 5te — souvent la moins essentielle à la couleur` },
            ],
            pitfall: `Vouloir jouer les 7 notes empilées d'un coup : impossible et inutile sur 6 cordes. 4‑5 notes bien choisies suffisent.`,
          },
          {
            id: 'm7l2', title: 'Un accord 9 usuel : Cmaj9',
            goal: `Enchaîner depuis le Cmaj7 déjà appris, en ajoutant une seule note.`,
            theory: `Voici un voicing courant de Cmaj9 sans la 5te (fondamentale, 9e, 7e majeure, 3ce) : il s'enchaîne directement depuis le shell voicing de Cmaj7 vu au module précédent — tu ajoutes juste la corde de ré à vide, qui est exactement la 9e (Ré).`,
            diagram: { fromFret: 0, toFret: 5, dots: [ { s:5, f:3, root:true, label:'R' }, { s:4, f:0, label:'9' }, { s:3, f:4, label:'7' }, { s:2, f:5, label:'3' } ] },
            tab: `A|--3--| (Do, fondamentale)\nD|--0--| (Ré, 9e, à vide)\nG|--4--| (Si, 7e majeure)\nB|--5--| (Mi, 3ce)`,
            tabLabel: `🎸 Cmaj9 (sans 5te)`,
            bpm: null,
            success: `Enchaîne Cmaj7 → Cmaj9 en ajoutant juste la corde de ré à vide, sans bouger le reste de la main.`,
            cards: [
              { front:`Formule de maj9 (sans 5te)`, back:`1 3 7 9` },
              { front:`Formule du « 9 » de dominante`, back:`1 3 5 ♭7 9` },
            ],
            pitfall: `Négliger la clarté de la corde à vide (ré) — vérifie qu'elle sonne net, pas étouffée par un doigt voisin.`,
          },
        ],
        fiche: {
          title: 'Extensions : 9e, 11e, 13e — l\'essentiel',
          intro: `Ajouter de la couleur, sans jamais changer la fonction de l'accord.`,
          sections: [
            { h:`Le principe`, body:`9e = 2e+8ve, 11e = 4e+8ve, 13e = 6e+8ve. La couleur s'enrichit, la fonction reste la même.` },
            { h:`Ce qu'on sacrifie`, body:`La 5te en premier — sur 6 cordes, 4‑5 notes bien choisies suffisent à capturer la couleur.` },
            { h:`Voicing pratique`, body:`Cmaj9 sans 5te : construit depuis le shell Cmaj7 en ajoutant juste la 9e.` },
          ],
          diagram: { fromFret: 0, toFret: 5, dots: [ { s:5, f:3, root:true, label:'R' }, { s:4, f:0, label:'9' }, { s:3, f:4, label:'7' }, { s:2, f:5, label:'3' } ] },
        },
      },

    ],
  },

  /* ================= PIANO — miroir du Grimoire, au clavier ================= */
  piano: {
    id: 'piano', disciplineId: 'piano',
    title: 'Le Clavier des Gammes',
    subtitle: `De la gamme majeure aux voicings jazz`,
    modules: [

      /* ---------------- MODULE 0 — REPÈRES CLAVIER & DOIGTÉ ---------------- */
      {
        id: 'pi_m0', icon: '🧭', title: 'Repères clavier & doigté',
        goal: `Se repérer sur le clavier et poser une bonne base de doigté.`,
        lessons: [
          {
            id: 'pi_m0l1', title: 'La géométrie du clavier',
            goal: `Retrouver un Do n'importe où sur le clavier, sans compter les touches.`,
            theory: `Les touches noires se regroupent par 2, puis par 3, en boucle. Le Do est toujours la touche blanche juste à gauche du groupe de 2 noires (le Fa est juste à gauche du groupe de 3 — ne les confonds pas). Une fois ce repère acquis, tu situes n'importe quelle note en comptant depuis le Do le plus proche, plutôt qu'en partant du bord du clavier.`,
            diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'do' }, { note:12, root:true, label:'do' } ] },
            tab: null, bpm: null,
            success: `Sur un clavier réel, pointe 5 « Do » différents en moins de 3 s chacun, en te fiant au groupe de 2 touches noires.`,
            cards: [
              { front:`Le Do se trouve où ?`, back:`Juste à gauche du groupe de 2 touches noires` },
              { front:`Le Fa se trouve où ?`, back:`Juste à gauche du groupe de 3 touches noires` },
              { front:`Piège Do / Fa`, back:`Les deux sont « juste avant un groupe de noires » — c'est 2 vs 3 noires qui les distingue` },
            ],
            pitfall: `Compter les touches une par une depuis le bord du clavier : trop lent, et tu perds le fil sur un grand clavier.`,
          },
          {
            id: 'pi_m0l2', title: 'Doigtés & passage du pouce',
            goal: `Comprendre la numérotation des doigts et le geste qui permet de jouer une gamme entière.`,
            theory: `Les doigts se numérotent 1 (pouce) à 5 (auriculaire), pour chaque main. Une main ne couvre que 5 notes d'un coup — pour enchaîner une gamme de 7-8 notes, on utilise le passage du pouce : après le 3e doigt, le pouce se glisse sous la main pour continuer sans s'arrêter. C'est LE geste technique fondamental du piano.`,
            diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'1' }, { note:2, label:'2' }, { note:4, label:'3' }, { note:5, label:'1' } ] },
            tab: null, bpm: null,
            success: `Joue Do‑Ré‑Mi‑Fa (doigts 1‑2‑3‑1) en boucle, lentement, sans à-coup au moment où le pouce passe.`,
            cards: [
              { front:`Numérotation des doigts`, back:`1 = pouce … 5 = auriculaire (chaque main)` },
              { front:`Le passage du pouce sert à…`, back:`enchaîner plus de notes qu'une main n'en couvre, sans s'arrêter` },
              { front:`Le pouce passe généralement après quel doigt ?`, back:`Le 3e doigt (majeur), en montant` },
            ],
            pitfall: `Lever la main pour « replacer » le pouce : le geste doit être fluide, sous la paume, sans à-coup visible.`,
          },
        ],
        fiche: {
          title: 'Repères clavier & doigté — l\'essentiel',
          intro: `La géométrie du clavier et le geste qui débloque toutes les gammes.`,
          sections: [
            { h:`Le clavier`, body:`Touches noires groupées par 2 puis 3. Do = juste avant le groupe de 2 ; Fa = juste avant le groupe de 3.` },
            { h:`Les doigts`, body:`Numérotés 1 (pouce) à 5 (auriculaire), pour chaque main.` },
            { h:`Le passage du pouce`, body:`Après le 3e doigt, le pouce se glisse sous la main pour continuer la gamme sans s'arrêter.` },
          ],
          diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'do' }, { note:12, root:true, label:'do' } ] },
        },
      },

      /* ---------------- MODULE 1 — LA GAMME MAJEURE AU PIANO ---------------- */
      {
        id: 'pi_m1', icon: '🌞', title: 'La gamme majeure au piano',
        goal: `Jouer la gamme majeure avec un doigté propre, et la transposer.`,
        lessons: [
          {
            id: 'pi_m1l1', title: 'Do majeur : les touches blanches',
            goal: `Jouer la gamme de Do majeur sur une octave, main droite.`,
            theory: `Do majeur suit la même formule que sur n'importe quel instrument (T‑T‑½‑T‑T‑T‑½) — et sur un clavier, ça tombe parfaitement sur les 8 touches blanches consécutives, sans aucune touche noire. C'est pour ça que Do majeur est toujours la première gamme qu'on apprend au piano : la théorie et les touches s'alignent parfaitement.`,
            diagram: { type:'keyboard', dots: [
              { note:0, root:true, label:'do' }, { note:2, label:'ré' }, { note:4, label:'mi' }, { note:5, label:'fa' },
              { note:7, label:'sol' }, { note:9, label:'la' }, { note:11, label:'si' }, { note:12, root:true, label:'do' },
            ] },
            tab: null, bpm: null,
            success: `Joue Do majeur montée + descente, main droite, en nommant chaque note à voix haute.`,
            cards: [
              { front:`Do majeur au piano =`, back:`les 8 touches blanches consécutives, aucune touche noire` },
              { front:`Pourquoi Do majeur est la 1ʳᵉ gamme apprise au piano ?`, back:`Parce que la formule majeure tombe exactement sur les touches blanches` },
            ],
            pitfall: `Se relâcher sur le poignet en fin de montée : garde une main souple et détendue du début à la fin.`,
          },
          {
            id: 'pi_m1l2', title: 'Le doigté standard & transposer',
            goal: `Mémoriser le doigté 1‑2‑3‑1‑2‑3‑4‑5 et l'appliquer à une autre tonalité.`,
            theory: `Le doigté standard main droite pour une gamme majeure sur une octave : 1‑2‑3‑1‑2‑3‑4‑5 (le pouce passe après le 3e doigt, sur la 4e note). Ce même doigté fonctionne pour Sol majeur — il suffit d'ajouter un Fa# (la touche noire juste après le Fa). La forme est identique ; seule une note bouge.`,
            diagram: { type:'keyboard', dots: [
              { note:0, root:true, label:'1' }, { note:2, label:'2' }, { note:4, label:'3' }, { note:5, label:'1' },
              { note:7, label:'2' }, { note:9, label:'3' }, { note:11, label:'4' }, { note:12, root:true, label:'5' },
            ] },
            tab: null, bpm: null,
            success: `Joue Do majeur puis Sol majeur (avec Fa#) avec exactement le même doigté 1‑2‑3‑1‑2‑3‑4‑5.`,
            cards: [
              { front:`Doigté standard gamme majeure (main droite)`, back:`1‑2‑3‑1‑2‑3‑4‑5` },
              { front:`Sol majeur = Do majeur + quelle altération ?`, back:`Fa devient Fa# (une seule touche noire)` },
            ],
            pitfall: `Oublier le Fa# en jouant Sol majeur : tu retombes sur la formule de Fa majeur sans t'en rendre compte.`,
          },
        ],
        fiche: {
          title: 'La gamme majeure au piano — l\'essentiel',
          intro: `Do majeur, le doigté qui sert de base à toutes les autres tonalités.`,
          sections: [
            { h:`Do majeur`, body:`Les 8 touches blanches consécutives. La formule majeure tombe exactement dessus.` },
            { h:`Doigté standard`, body:`Main droite : 1‑2‑3‑1‑2‑3‑4‑5. Le pouce passe après le 3e doigt.` },
            { h:`Transposer`, body:`Le même doigté sert pour Sol majeur (+Fa#) — seule la note change, pas la forme.` },
            { h:`Le pont vers la suite`, body:`La pentatonique et les accords de la main gauche viennent ensuite, sur cette même base.` },
          ],
          diagram: { type:'keyboard', dots: [
            { note:0, root:true, label:'1' }, { note:2, label:'2' }, { note:4, label:'3' }, { note:5, label:'1' },
            { note:7, label:'2' }, { note:9, label:'3' }, { note:11, label:'4' }, { note:12, root:true, label:'5' },
          ] },
        },
      },

    ],
  },

  /* ================= ESPAGNOL — La Senda del Español ================= */
  espagnol: {
    id: 'espagnol', disciplineId: 'espagnol',
    title: 'La Senda del Español',
    subtitle: `Grammaire : du scolaire au fluide`,
    modules: [
      {
        id: 'es_m0', icon: '🌱', title: 'Fondations',
        goal: `Remettre à plat le présent, le genre et l'accord.`,
        lessons: [
          {
            id: 'es_m0l1', title: 'Le présent des 3 groupes',
            goal: `Conjuguer sans hésiter au présent (-ar, -er, -ir).`,
            theory: `Trois familles de verbes selon la terminaison : -AR (hablar), -ER (comer), -IR (vivir). Au présent, on retire la terminaison et on ajoute les marques de personne. Les trois patrons se ressemblent — l'enjeu est de ne plus les confondre.`,
            tabLabel: `📋 Conjugaison — présent`,
            tab: `           -AR       -ER      -IR\nyo         hablo     como     vivo\ntú         hablas    comes    vives\nél/ella    habla     come     vive\nnosotros   hablamos  comemos  vivimos\nvosotros   habláis   coméis   vivís\nellos      hablan    comen    viven`,
            bpm: null,
            success: `Conjugue oralement « trabajar », « aprender » et « escribir » aux 6 personnes, sans regarder.`,
            cards: [
              { front: `Terminaisons -AR au présent`, back: `-o -as -a -amos -áis -an` },
              { front: `Terminaisons -ER au présent`, back: `-o -es -e -emos -éis -en` },
              { front: `Terminaisons -IR au présent`, back: `-o -es -e -imos -ís -en` },
            ],
            pitfall: `-ER et -IR ne diffèrent qu'à nosotros/vosotros (comemos/coméis vs vivimos/vivís).`,
          },
          {
            id: 'es_m0l2', title: 'Genre, articles & accord',
            goal: `Ne plus te tromper sur el/la et l'accord des adjectifs.`,
            theory: `Tout nom a un genre. Règle de base : -o → masculin (el libro), -a → féminin (la mesa), avec des exceptions à connaître. L'adjectif s'accorde en genre ET en nombre : el coche rojo, las casas rojas.`,
            tab: null, bpm: null,
            success: `Mets au pluriel et accorde : « la ciudad bonita », « el problema difícil », « la mano fría ».`,
            cards: [
              { front: `Règle générale du genre`, back: `-o → masculin, -a → féminin (gare aux exceptions)` },
              { front: `Exceptions fréquentes`, back: `el día, el problema, el mapa (masc.) ; la mano, la foto (fém.)` },
              { front: `L'adjectif s'accorde en…`, back: `genre ET nombre (casa roja → casas rojas)` },
            ],
            pitfall: `Calquer le genre du français : « la leche » (le lait), « el color » (la couleur) diffèrent souvent.`,
          },
        ],
        fiche: {
          title: `Fondations — l'essentiel`, intro: `La base du présent et de l'accord.`,
          sections: [
            { h: `Les 3 groupes`, body: `-AR / -ER / -IR. Présent : -o, -as/-es, -a/-e, -amos/-emos/-imos, -áis/-éis/-ís, -an/-en.` },
            { h: `Le genre`, body: `-o masc., -a fém. Exceptions : el día, el problema, la mano. L'article suit le genre.` },
            { h: `L'accord`, body: `L'adjectif s'accorde en genre et en nombre avec le nom.` },
          ], diagram: null,
        },
      },
      {
        id: 'es_m1', icon: '⚖️', title: 'Ser vs Estar',
        goal: `Choisir le bon « être » — la difficulté n°1 du francophone.`,
        lessons: [
          {
            id: 'es_m1l1', title: 'Ser ou Estar : la logique',
            goal: `Savoir instantanément lequel des deux « être » utiliser.`,
            theory: `Deux verbes pour « être ». SER = l'essence, ce qui définit : identité, origine, profession, heure, caractère durable (soy francés, es médico, son las tres). ESTAR = l'état, la situation, le lieu : humeur, position, état passager (estoy cansado, está en casa). Astuce : SER = ce que tu ES ; ESTAR = comment/où tu es, là, maintenant.`,
            tabLabel: `📋 Repère — SER vs ESTAR`,
            tab: `SER (essence)            ESTAR (état / lieu)\nidentité, origine        lieu (¿dónde?)\nprofession               humeur, santé\nheure, date              état passager\ncaractère durable        résultat d'une action`,
            bpm: null,
            success: `Complète : « Madrid ___ en España », « Hoy ___ cansado », « Ella ___ profesora », « ___ las dos ».`,
            cards: [
              { front: `SER exprime…`, back: `l'essence : identité, origine, profession, heure, caractère durable` },
              { front: `ESTAR exprime…`, back: `l'état/le lieu : position, humeur, santé, situation passagère` },
              { front: `« Madrid est en Espagne »`, back: `Madrid está en España (lieu → estar)` },
            ],
            pitfall: `Le lieu se dit avec ESTAR (está en casa), SAUF un événement : « la fiesta es en mi casa ».`,
          },
          {
            id: 'es_m1l2', title: 'Les adjectifs qui changent de sens',
            goal: `Maîtriser les adjectifs dont le sens bascule selon ser/estar.`,
            theory: `Certains adjectifs changent de sens selon le verbe — c'est ce qui révèle un bon niveau. Ser listo = être malin ; estar listo = être prêt. Ser aburrido = être ennuyeux ; estar aburrido = s'ennuyer. Ser rico = être riche ; estar rico = être délicieux.`,
            tabLabel: `📋 Sens selon ser / estar`,
            tab: `adjectif    SER (essence)     ESTAR (état)\nlisto       malin             prêt\naburrido    ennuyeux          qui s'ennuie\nrico        riche             délicieux\nverde       de couleur verte  pas mûr\nmalo        mauvais/méchant   malade`,
            bpm: null,
            success: `Traduis : « la soupe est délicieuse », « il est prêt », « ce livre est ennuyeux », « la banane n'est pas mûre ».`,
            cards: [
              { front: `ser listo / estar listo`, back: `malin / prêt` },
              { front: `ser rico / estar rico`, back: `riche / délicieux` },
              { front: `ser aburrido / estar aburrido`, back: `ennuyeux / s'ennuyer` },
            ],
            pitfall: `Dire « soy aburrido » pour « je m'ennuie » → ça veut dire « je suis quelqu'un d'ennuyeux » ! Utilise estar.`,
          },
        ],
        fiche: {
          title: `Ser vs Estar — l'essentiel`, intro: `Le bon « être », et les pièges de sens.`,
          sections: [
            { h: `SER = essence`, body: `Identité, origine, profession, heure, caractéristique durable.` },
            { h: `ESTAR = état/lieu`, body: `Position, humeur, santé, situation passagère, résultat d'une action.` },
            { h: `Adjectifs à double sens`, body: `listo (malin/prêt), rico (riche/délicieux), aburrido (ennuyeux/s'ennuie), verde, malo.` },
            { h: `Piège lieu`, body: `Lieu = estar (está en casa), sauf un événement : « la fiesta es aquí ».` },
          ], diagram: null,
        },
      },
    ],
  },

  /* ================= FINANCE — Le Grand Livre ================= */
  economie: {
    id: 'economie', disciplineId: 'economie',
    title: 'Le Grand Livre',
    subtitle: `Finance : jusqu'à prêt pour l'entretien`,
    modules: [
      {
        id: 'fi_m0', icon: '📊', title: 'Les 3 états financiers',
        goal: `Le langage de base : bilan, compte de résultat, flux de trésorerie.`,
        lessons: [
          {
            id: 'fi_m0l1', title: 'Le bilan',
            goal: `Lire un bilan et comprendre l'équation fondamentale.`,
            theory: `Le bilan est une photo, à un instant T, de ce que l'entreprise possède et doit. Équation fondamentale : Actif = Passif + Capitaux propres. À gauche l'ACTIF (ce qu'on possède : trésorerie, stocks, machines…) ; à droite comment c'est financé : les DETTES et les CAPITAUX PROPRES (l'argent des actionnaires). Les deux côtés s'équilibrent toujours.`,
            tabLabel: `📋 Structure du bilan`,
            tab: `BILAN (photo à l'instant T)\n──────────────────┬──────────────────\nACTIF             │ PASSIF + CAPITAUX\n──────────────────┼──────────────────\nImmobilisations   │ Capitaux propres\nStocks            │ Dettes long terme\nCréances clients  │ Dettes court terme\nTrésorerie        │ Fournisseurs\n──────────────────┴──────────────────\n Actif  =  Passif  +  Capitaux propres`,
            bpm: null,
            success: `Explique à voix haute, comme à un recruteur, pourquoi un bilan est toujours équilibré.`,
            cards: [
              { front: `Équation fondamentale du bilan`, back: `Actif = Passif (dettes) + Capitaux propres` },
              { front: `L'actif, c'est…`, back: `ce que l'entreprise possède : trésorerie, stocks, immobilisations, créances` },
              { front: `Les capitaux propres, c'est…`, back: `l'argent des actionnaires : capital + réserves + résultat` },
            ],
            pitfall: `Confondre bénéfice et trésorerie : une entreprise peut être bénéficiaire et manquer de cash.`,
          },
          {
            id: 'fi_m0l2', title: 'Résultat & flux de trésorerie',
            goal: `Distinguer le résultat (performance) du cash (liquidité).`,
            theory: `Le COMPTE DE RÉSULTAT mesure la performance sur une période : Produits − Charges = Résultat (CA, EBITDA, résultat net). Le TABLEAU DE FLUX DE TRÉSORERIE suit le cash réel qui entre et sort (exploitation, investissement, financement). Clé : le résultat n'est pas le cash — à cause des amortissements et des décalages clients/fournisseurs.`,
            tabLabel: `📋 Cascade du résultat`,
            tab: `  Chiffre d'affaires\n− Charges d'exploitation\n= EBITDA\n− Amortissements\n= Résultat d'exploitation (EBIT)\n− Intérêts − Impôts\n= RÉSULTAT NET`,
            bpm: null,
            success: `Cite les 3 grandes sections du tableau de flux et donne un exemple pour chacune.`,
            cards: [
              { front: `Compte de résultat : formule`, back: `Produits − Charges = Résultat (sur une période)` },
              { front: `EBITDA =`, back: `résultat avant intérêts, impôts et amortissements — proxy de la performance opérationnelle` },
              { front: `3 sections du tableau de flux`, back: `exploitation, investissement, financement` },
            ],
            pitfall: `Prendre l'EBITDA pour du cash : il ignore les investissements (capex) et la variation du BFR.`,
          },
        ],
        fiche: {
          title: `Les 3 états financiers — l'essentiel`, intro: `Le trépied que tout entretien attend.`,
          sections: [
            { h: `Bilan`, body: `Photo à T. Actif = Passif + Capitaux propres.` },
            { h: `Compte de résultat`, body: `Performance sur une période : CA → EBITDA → EBIT → Résultat net.` },
            { h: `Flux de trésorerie`, body: `Le cash réel. 3 sections : exploitation, investissement, financement.` },
            { h: `Piège classique`, body: `Résultat ≠ trésorerie. Bénéfice ne veut pas dire cash disponible.` },
          ], diagram: null,
        },
      },
      {
        id: 'fi_m1', icon: '🔍', title: 'Analyse par les ratios',
        goal: `Juger la santé d'une entreprise avec quelques ratios clés.`,
        lessons: [
          {
            id: 'fi_m1l1', title: 'Rentabilité & marges',
            goal: `Mesurer si l'entreprise gagne bien de l'argent.`,
            theory: `Les marges disent quelle part du chiffre d'affaires reste en profit. Marge d'EBITDA = EBITDA / CA ; marge nette = Résultat net / CA. Rentabilité des capitaux : ROE = Résultat net / Capitaux propres (pour l'actionnaire) ; ROCE = EBIT / capitaux employés (efficacité opérationnelle).`,
            tabLabel: `📋 Ratios de rentabilité`,
            tab: `Marge d'EBITDA = EBITDA / CA\nMarge nette    = Résultat net / CA\nROE            = Résultat net / Capitaux propres\nROCE           = EBIT / Capitaux employés`,
            bpm: null,
            success: `CA 100, EBITDA 20, résultat net 8, capitaux propres 40 → calcule marge d'EBITDA, marge nette et ROE.`,
            cards: [
              { front: `Marge d'EBITDA =`, back: `EBITDA / Chiffre d'affaires` },
              { front: `ROE =`, back: `Résultat net / Capitaux propres (rentabilité pour l'actionnaire)` },
              { front: `ROCE mesure…`, back: `l'efficacité opérationnelle : EBIT / capitaux employés` },
            ],
            pitfall: `Comparer des marges de secteurs différents : un supermarché (~2 %) et un éditeur de logiciels (~30 %) n'ont rien à voir.`,
          },
          {
            id: 'fi_m1l2', title: 'Liquidité, solvabilité & BFR',
            goal: `Vérifier qu'une entreprise peut payer ses dettes sans manquer de cash.`,
            theory: `LIQUIDITÉ : peut-on payer à court terme ? Ratio courant = Actif courant / Passif courant (> 1 = confortable). SOLVABILITÉ : la dette est-elle soutenable ? Dette nette / EBITDA (souvent < 3-4×). Le BFR = Stocks + Créances clients − Dettes fournisseurs : le cash « piégé » dans le cycle d'exploitation. Un BFR qui gonfle assèche la trésorerie.`,
            tabLabel: `📋 Liquidité & structure`,
            tab: `Ratio courant      = Actif courant / Passif courant  (>1)\nDette nette/EBITDA = endettement            (souvent <3-4×)\nBFR = Stocks + Créances clients − Dettes fournisseurs`,
            bpm: null,
            success: `Explique pourquoi une entreprise en forte croissance peut manquer de cash à cause de son BFR.`,
            cards: [
              { front: `Ratio courant =`, back: `Actif courant / Passif courant (>1 = paie son court terme)` },
              { front: `BFR =`, back: `Stocks + Créances clients − Dettes fournisseurs (cash piégé dans le cycle)` },
              { front: `Dette nette / EBITDA : seuil de vigilance`, back: `au-delà de ~3-4×, l'endettement inquiète` },
            ],
            pitfall: `Oublier que la croissance coûte du cash : plus de ventes → plus de stocks et de créances → BFR qui grimpe.`,
          },
        ],
        fiche: {
          title: `Analyse par les ratios — l'essentiel`, intro: `Juger une entreprise en quelques chiffres.`,
          sections: [
            { h: `Rentabilité`, body: `Marge d'EBITDA, marge nette. ROE (actionnaire), ROCE (opérationnel).` },
            { h: `Liquidité`, body: `Ratio courant = Actif courant / Passif courant (>1).` },
            { h: `Solvabilité`, body: `Dette nette / EBITDA (< 3-4×) ; gearing = dette / capitaux propres.` },
            { h: `BFR`, body: `Stocks + créances − fournisseurs. La croissance gonfle le BFR et peut assécher le cash.` },
          ], diagram: null,
        },
      },
    ],
  },
};

window.MAESTRIA_COURSES = { COURSES };
