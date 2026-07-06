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

      /* ---------------- MODULE 3 — LEGATO & TECHNIQUE ---------------- */
      {
        id: 'm3', icon: '🌊', title: 'Legato & technique',
        goal: `Des notes liées, fluides — sans l'attaque sèche du médiator sur chaque note.`,
        lessons: [
          {
            id: 'm3l1', title: 'Hammer‑on & pull‑off',
            goal: `Lier 2 notes sans repincer la corde.`,
            theory: `Le hammer-on : tu frappes une case avec un doigt SANS repincer la corde — le son vient de l'impact du doigt, pas du médiator. Le pull-off : l'inverse, tu retires un doigt en tirant légèrement la corde vers le bas pour la faire sonner. Ensemble, ils créent le son « lié », caractéristique du legato.`,
            diagram: null,
            tab: `A|--5h7p5--5h7p5--|`,
            tabLabel: `🎸 Hammer-on (h) / Pull-off (p)`,
            bpm: { start: 60, goal: 110 },
            success: `Joue ce motif en boucle, propre à 90 BPM : le hammer et le pull-off doivent sonner AUSSI fort que les notes piquées.`,
            cards: [
              { front:`Hammer-on`, back:`Frapper une case sans repincer — le son vient de l'impact du doigt` },
              { front:`Pull-off`, back:`Retirer un doigt en tirant légèrement la corde vers le bas` },
              { front:`Notation tab : « h » et « p »`, back:`h = hammer-on, p = pull-off, entre 2 chiffres` },
            ],
            pitfall: `Le hammer-on/pull-off sonne plus faible que les notes piquées — insiste sur la force du doigt, pas juste le mouvement.`,
          },
          {
            id: 'm3l2', title: 'Pick‑hammer‑hammer (3 notes/corde)',
            goal: `Économiser des coups de médiator sur les patterns 3 notes par corde.`,
            theory: `Reprends la forme « 3 notes par corde » de la gamme majeure (module 1). Combine-la avec le legato : joue la 1ère note au médiator, puis hammer vers la 2e, hammer vers la 3e — un seul coup de médiator pour 3 notes. C'est l'un des moyens les plus efficaces d'augmenter ta vitesse sans fatiguer la main droite.`,
            diagram: null,
            tab: `E|--3h5h7--------------------|`,
            tabLabel: `🎸 Pick‑hammer‑hammer`,
            bpm: { start: 60, goal: 120 },
            success: `Joue chaque corde du système 3‑notes‑par‑corde avec un seul coup de médiator (pick‑hammer‑hammer), montée complète.`,
            cards: [
              { front:`Le pattern pick‑hammer‑hammer économise combien de coups de médiator par corde ?`, back:`2 sur 3 — un seul picking, 2 hammer-ons` },
            ],
            pitfall: `Vouloir tout jouer vite trop tôt : ce pattern doit d'abord sonner ÉGAL en volume (piqué = hammer) avant de chercher la vitesse.`,
          },
          {
            id: 'm3l3', title: 'L\'exercice araignée (spider)',
            goal: `Muscler l'indépendance des 4 doigts, hors contexte de gamme précise.`,
            theory: `L'exercice « araignée » : 1 doigt par case, sur 4 cases consécutives, en changeant de corde. C'est l'exercice d'échauffement n°1 de la plupart des guitaristes, tous styles confondus — il ne sert pas à jouer une gamme précise, juste à muscler chaque doigt indépendamment.`,
            diagram: null,
            tab: `E|--1--2--3--4--|\nB|--1--2--3--4--|\nG|--1--2--3--4--|\nD|--1--2--3--4--|\nA|--1--2--3--4--|\nE|--1--2--3--4--|`,
            tabLabel: `🎸 Exercice araignée`,
            bpm: { start: 60, goal: 140 },
            success: `Joue l'araignée sur les 6 cordes sans lever les doigts inutilement — doigts 1‑2‑3‑4 chacun sur sa case.`,
            cards: [
              { front:`À quoi sert l'exercice araignée ?`, back:`Muscler l'indépendance des 4 doigts, hors contexte de gamme précise` },
            ],
            pitfall: `Lever tous les doigts entre chaque note. Garde les doigts déjà posés en place, lève seulement celui qui doit bouger.`,
          },
        ],
        fiche: {
          title: 'Legato & technique — l\'essentiel',
          intro: `Des notes liées, fluides — la base du son « legato ».`,
          sections: [
            { h:`Hammer-on / pull-off`, body:`Hammer-on : frapper sans repincer. Pull-off : retirer en tirant légèrement la corde.` },
            { h:`Pick-hammer-hammer`, body:`Sur 3 notes/corde : 1 coup de médiator + 2 hammer-ons = vitesse sans fatigue.` },
            { h:`L'araignée`, body:`1 doigt par case sur 4 cases, en changeant de corde. L'échauffement de référence.` },
          ],
          diagram: null,
        },
      },

      /* ---------------- MODULE 4 — LES MODES ---------------- */
      {
        id: 'm4', icon: '🎨', title: 'Les modes',
        goal: `Les mêmes 7 notes, 7 couleurs différentes selon la tonique.`,
        lessons: [
          {
            id: 'm4l1', title: 'Le principe des modes',
            goal: `Comprendre que les modes sont la même gamme, tonique différente.`,
            theory: `Un mode, ce sont les mêmes 7 notes qu'une gamme majeure, mais avec une tonique différente — exactement le principe déjà vu avec la relative pentatonique (module 2), appliqué à toute la gamme. Classe les 7 modes du plus « brillant » au plus « sombre » : Lydien (#4, le plus brillant) > Ionien (majeur, référence) > Mixolydien (♭7) > Dorien (♭3 ♭7) > Éolien (♭3 ♭6 ♭7, le mineur naturel) > Phrygien (♭2 ♭3 ♭6 ♭7) > Locrien (♭2 ♭5, le plus sombre). Chaque mode se joue avec les positions de gamme majeure déjà connues — seule la résolution change.`,
            diagram: null, tab: null, bpm: null,
            success: `Récite l'échelle de brillance des 7 modes, du plus brillant au plus sombre, avec leur altération caractéristique.`,
            cards: [
              { front:`Lydien (altération caractéristique)`, back:`#4 — le mode le plus brillant` },
              { front:`Mixolydien`, back:`♭7 — la gamme de l'accord de dominante` },
              { front:`Dorien`, back:`♭3 ♭7, mais 6te MAJEURE — plus « jazzy » que le mineur naturel` },
              { front:`Locrien`, back:`♭2 ♭5 — le mode le plus instable/sombre` },
            ],
            pitfall: `Croire qu'il faut apprendre 7 nouvelles formes de manche. Ce sont les MÊMES notes que la majeure — seule la tonique change.`,
          },
          {
            id: 'm4l2', title: 'Dorien & Mixolydien (les 2 utilitaires)',
            goal: `Les 2 modes les plus employés en rock, funk et jazz.`,
            theory: `Dorien = gamme mineure avec une 6te MAJEURE (au lieu de mineure) — ça lui donne une couleur « jazzy », moins triste que le mineur naturel. Immensément utilisé en jazz, funk et rock. Mixolydien = gamme majeure avec une 7e MINEURE — la gamme de l'accord de dominante (7), le son du blues‑rock et du funk. Les deux sont directement utiles sur tes backing tracks.`,
            diagram: { fromFret: 5, toFret: 10, dots: [
              { s:5, f:5, root:true }, { s:5, f:7 }, { s:5, f:8, label:'♭3' },
              { s:4, f:5 }, { s:4, f:7 }, { s:4, f:9, label:'6' }, { s:4, f:10, label:'♭7' },
            ] },
            tab: null, bpm: null,
            success: `Joue cette portion de Ré dorien en insistant sur la 6te (Si, corde de ré case 9) — LA note qui distingue le dorien du mineur naturel.`,
            cards: [
              { front:`Ce qui distingue Dorien du mineur naturel`, back:`La 6te est MAJEURE (pas mineure) — ça adoucit la couleur triste` },
              { front:`Mixolydien = majeur avec quelle altération ?`, back:`La 7e devient mineure (♭7)` },
            ],
            pitfall: `Jouer du dorien « par défaut » partout en mineur — il ne convient que si le contexte appelle vraiment cette couleur.`,
          },
          {
            id: 'm4l3', title: 'Phrygien, Lydien & Locrien',
            goal: `Les couleurs plus rares, à reconnaître par contexte.`,
            theory: `Phrygien = mineur avec une 2nde MINEURE (♭2) — un son « espagnol/oriental », très utilisé en metal et flamenco. Lydien = majeur avec une 4te AUGMENTÉE (#4) — un son « flottant », rêveur, courant en fusion et musiques de film. Locrien = le mode le plus instable (♭2 ET ♭5) — sa quinte diminuée l'empêche vraiment de « se poser » ; il sert surtout de passage (le ii d'un ii‑V‑I mineur, cf. m7♭5 déjà vu).`,
            diagram: null, tab: null, bpm: null,
            success: `Associe chaque mode à son contexte : quel mode pour un son « espagnol » ? Un son « flottant » ? Le plus instable ?`,
            cards: [
              { front:`Phrygien (altération + contexte)`, back:`♭2 — son espagnol/oriental (flamenco, metal)` },
              { front:`Lydien (altération + contexte)`, back:`#4 — son flottant/rêveur (fusion, musique de film)` },
              { front:`Locrien`, back:`Le plus instable (♭2 ET ♭5) — sert surtout de passage, jamais de résolution` },
            ],
            pitfall: `Vouloir absolument « placer » du Locrien dans une impro — c'est le mode le moins utilisé en solo, surtout utile en analyse.`,
          },
        ],
        fiche: {
          title: 'Les modes — l\'essentiel',
          intro: `Les mêmes 7 notes, 7 couleurs différentes.`,
          sections: [
            { h:`Le principe`, body:`Mêmes notes que la majeure, tonique différente. Échelle de brillance : Lydien > Ionien > Mixolydien > Dorien > Éolien > Phrygien > Locrien.` },
            { h:`Dorien & Mixolydien`, body:`Les 2 modes utilitaires. Dorien = mineur + 6te majeure. Mixolydien = majeur + ♭7.` },
            { h:`Phrygien, Lydien, Locrien`, body:`Phrygien (♭2, espagnol) · Lydien (#4, flottant) · Locrien (♭2 ♭5, instable, passage seulement).` },
          ],
          diagram: { fromFret: 5, toFret: 10, dots: [
            { s:5, f:5, root:true }, { s:5, f:7 }, { s:5, f:8, label:'♭3' },
            { s:4, f:5 }, { s:4, f:7 }, { s:4, f:9, label:'6' }, { s:4, f:10, label:'♭7' },
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

      /* ---------------- MODULE 8 — COMPING ---------------- */
      {
        id: 'm8', icon: '🥁', title: 'Comping',
        goal: `Accompagner avec des accords rythmés — l'art de l'espace et du groove.`,
        lessons: [
          {
            id: 'm8l1', title: 'Le rôle du comping',
            goal: `Comprendre ce qui distingue le comping jazz d'un gratté pop régulier.`,
            theory: `« Comping » (de l'anglais accompanying) = accompagner un soliste ou une mélodie avec des accords rythmés, plutôt que jouer la mélodie toi-même. Contrairement à un gratté pop régulier, le comping jazz est SYNCOPÉ et laisse de l'espace : anticiper légèrement le temps, jouer court (staccato), et surtout ne pas remplir tous les temps — le silence fait partie du groove.`,
            diagram: null, tab: null, bpm: null,
            success: `Joue 4 mesures en comping sur un Cmaj7 (voicing du module 6), en variant le placement rythmique — pas toujours sur le temps 1.`,
            cards: [
              { front:`Comping =`, back:`Accompagner avec des accords rythmés, syncopés, avec de l'espace` },
              { front:`Différence avec un gratté pop régulier`, back:`Le comping jazz évite de remplir tous les temps, joue court, anticipe légèrement` },
            ],
            pitfall: `Jouer le voicing sur CHAQUE temps sans variation — ça sonne mécanique. Varie le rythme, laisse des trous.`,
          },
          {
            id: 'm8l2', title: 'Comping sur un ii‑V‑I',
            goal: `Enchaîner Dm7 → G7 → Cmaj7 avec un mouvement de main minimal.`,
            theory: `Enchaîne les voicings shell déjà appris sur un ii‑V‑I en Do : Dm7 (le ii) → G7 (le V) → Cmaj7 (le I, module 6). Voici G7 en shell voicing. Pour Dm7, reprends le même principe : fondamentale Ré, 7e mineure Do, 3ce mineure Fa. Le secret : entre 2 accords, les notes communes restent, seules 1‑2 notes bougent d'un ton ou demi-ton — c'est le « voice leading », ce qui rend un enchaînement fluide à l'oreille ET facile à jouer.`,
            diagram: { fromFret: 0, toFret: 3, dots: [ { s:6, f:3, root:true, label:'R' }, { s:4, f:3, label:'♭7' }, { s:2, f:0, label:'3' } ] },
            tab: `E|--3--| (Sol, fondamentale)\nD|--3--| (Fa, 7e mineure)\nB|--0--| (Si, 3ce, à vide)`,
            tabLabel: `🎸 G7 (shell voicing)`,
            bpm: null,
            success: `Enchaîne Dm7 → G7 → Cmaj7 en gardant le mouvement de main le plus court possible entre chaque accord.`,
            cards: [
              { front:`ii‑V‑I en Do majeur = quels accords ?`, back:`Dm7 — G7 — Cmaj7` },
              { front:`Voice leading`, back:`Les notes communes entre 2 accords restent ; seules 1‑2 bougent d'un ton/demi‑ton` },
            ],
            pitfall: `Repartir de zéro (la main qui saute) à chaque accord — cherche toujours le chemin le plus court entre 2 voicings.`,
          },
        ],
        fiche: {
          title: 'Comping — l\'essentiel',
          intro: `Accompagner avec des accords rythmés : l'art de l'espace et du groove.`,
          sections: [
            { h:`Le rôle du comping`, body:`Accords rythmés, syncopés, avec de l'espace — pas un gratté régulier qui remplit tous les temps.` },
            { h:`Le ii‑V‑I`, body:`Dm7 → G7 → Cmaj7 en Do majeur, avec les shells voicings déjà appris.` },
            { h:`Voice leading`, body:`Les notes communes restent ; seules 1‑2 bougent. Cherche toujours le chemin le plus court.` },
          ],
          diagram: { fromFret: 0, toFret: 3, dots: [ { s:6, f:3, root:true, label:'R' }, { s:4, f:3, label:'♭7' }, { s:2, f:0, label:'3' } ] },
        },
      },

      /* ---------------- MODULE 9 — IMPRO SUR STANDARDS ---------------- */
      {
        id: 'm9', icon: '🏆', title: 'Impro sur standards',
        goal: `Le sommet du Grimoire : combiner gammes, harmonie et phrasé sur une vraie grille.`,
        lessons: [
          {
            id: 'm9l1', title: 'Une gamme, plusieurs accords',
            goal: `Comprendre le raccourci diatonique sur un ii‑V‑I.`,
            theory: `Sur un ii‑V‑I, pas besoin de changer de gamme à chaque accord : Dm7, G7 et Cmaj7 partagent exactement les mêmes 7 notes (celles de Do majeur). Improviser sur un ii‑V‑I revient souvent à improviser sur UNE seule gamme, en ciblant les notes de l'accord du moment sur les temps forts. Un raccourci énorme : pas besoin de 3 gammes différentes, juste une bonne oreille pour le phrasé.`,
            diagram: null, tab: null, bpm: null,
            success: `Sur un backing track ii‑V‑I en Do, improvise en Do majeur uniquement, en ciblant la fondamentale de l'accord du moment sur le 1er temps de chaque mesure.`,
            cards: [
              { front:`Sur un ii‑V‑I diatonique, combien de gammes différentes faut-il réellement ?`, back:`Souvent une seule (celle de la tonalité) — cibler les degrés de l'accord suffit à sonner juste` },
            ],
            pitfall: `Changer de gamme à CHAQUE accord par réflexe — commence par la vue d'ensemble (1 gamme), affine ensuite seulement.`,
          },
          {
            id: 'm9l2', title: 'Le blues jazz — l\'application concrète',
            goal: `Combiner tout ce que tu as appris sur une grille de 12 mesures.`,
            theory: `Le blues jazz (12 mesures, grille I7‑IV7‑I7‑V7‑IV7‑I7 simplifiée) est le terrain d'entraînement classique pour combiner TOUT ce que tu as appris : la penta/blues (module 2) pour l'attaque directe, le mixolydien (module 4) sur chaque accord de dominante pour plus de couleur jazz, et le phrasé de l'Impro Coach. Commence simple, puis ajoute une seule note « en plus » par chorus pour enrichir progressivement.`,
            diagram: null, tab: null, bpm: null,
            success: `Improvise 2 chorus de blues (24 mesures) sur un backing track : le 1er en pentatonique/blues pur, le 2e en ajoutant au moins une note de couleur (6te, 9e) empruntée à la gamme majeure.`,
            cards: [
              { front:`Grille blues jazz simplifiée (12 mesures)`, back:`I7 — IV7 — I7 — V7 — IV7 — I7` },
              { front:`Stratégie de progression en impro`, back:`Commence pentatonique/blues, ajoute UNE note de couleur par chorus — pas tout d'un coup` },
            ],
            pitfall: `Vouloir « tout caser » (modes, extensions, arpèges) dès le 1er chorus. La maîtrise vient de l'ajout progressif, pas de la démonstration immédiate.`,
          },
        ],
        fiche: {
          title: 'Impro sur standards — l\'essentiel',
          intro: `Le sommet du Grimoire : gammes, harmonie et phrasé réunis sur une vraie grille.`,
          sections: [
            { h:`Une gamme, plusieurs accords`, body:`Sur un ii‑V‑I diatonique, une seule gamme suffit souvent — cible les degrés de l'accord du moment.` },
            { h:`Le blues jazz`, body:`Grille I7‑IV7‑I7‑V7‑IV7‑I7. Combine penta/blues + mixolydien + phrasé.` },
            { h:`Stratégie`, body:`Commence simple, ajoute une seule note de couleur par chorus — jamais tout d'un coup.` },
          ],
          diagram: null,
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

      /* ---------------- MODULE 2 — PENTATONIQUE & BLUES AU PIANO ---------------- */
      {
        id: 'pi_m2', icon: '🎶', title: 'Pentatonique & blues au piano',
        goal: `La gamme à 5 notes qui tombe naturellement sous les 5 doigts.`,
        lessons: [
          {
            id: 'pi_m2l1', title: 'La pentatonique mineure (Do)',
            goal: `Jouer la pentatonique mineure de Do avec un doigté naturel, sans passage de pouce.`,
            theory: `La pentatonique mineure ne garde que 5 notes de la gamme mineure : fondamentale, tierce mineure, quarte, quinte, septième mineure (1 ♭3 4 5 ♭7). En Do : Do‑Mib‑Fa‑Sol‑Sib. Particularité propre au piano : comme il n'y a exactement que 5 notes, elles tombent une par une sous tes 5 doigts (1‑2‑3‑4‑5) sur une octave — aucun passage de pouce nécessaire, contrairement à la gamme majeure à 7 notes.`,
            diagram: { type:'keyboard', dots: [
              { note:0, root:true, label:'1' }, { note:3, label:'2' }, { note:5, label:'3' }, { note:7, label:'4' }, { note:10, label:'5' },
            ] },
            tab: null, bpm: { start: 60, goal: 110 },
            success: `Joue Do‑Mib‑Fa‑Sol‑Sib montée puis descente, doigté 1‑2‑3‑4‑5, sans aucun passage de pouce, à 90 BPM sans faute.`,
            cards: [
              { front:`Formule de la pentatonique mineure`, back:`1 ♭3 4 5 ♭7 (5 notes)` },
              { front:`Do pentatonique mineure = quelles notes ?`, back:`Do Mib Fa Sol Sib` },
              { front:`Pourquoi elle ne demande aucun passage de pouce ?`, back:`5 notes exactement = 5 doigts, une correspondance parfaite` },
            ],
            pitfall: `Vouloir appliquer le doigté de la gamme majeure (avec passage de pouce) par réflexe : la pentatonique n'en a pas besoin.`,
          },
          {
            id: 'pi_m2l2', title: 'La pentatonique majeure & la relative',
            goal: `Reconnaître que les mêmes touches, recentrées sur une autre tonique, changent totalement de couleur.`,
            theory: `Mêmes touches exactement, mais recentre ton oreille sur Mib au lieu de Do : tu entends la pentatonique MAJEURE (formule 1 2 3 5 6), la relative majeure de Do mineur. En pratique : Do pentatonique mineure et Mib pentatonique majeure partagent exactement les 5 mêmes touches (Do Mib Fa Sol Sib) — seule la note qui « sonne comme la maison » change.`,
            diagram: { type:'keyboard', dots: [
              { note:0, label:'5' }, { note:3, root:true, label:'1' }, { note:5, label:'2' }, { note:7, label:'3' }, { note:10, label:'4' },
            ] },
            tab: null, bpm: null,
            success: `Joue les mêmes 5 touches en faisant résoudre la mélodie sur Mib au lieu de Do — écoute la couleur passer de mineure à majeure.`,
            cards: [
              { front:`Formule de la pentatonique majeure`, back:`1 2 3 5 6 (5 notes)` },
              { front:`Relative majeure de Do mineur`, back:`Mib majeur (+3 demi-tons)` },
              { front:`Do pentatonique mineure et Mib pentatonique majeure partagent…`, back:`exactement les mêmes touches — seule la tonique change` },
            ],
            pitfall: `Penser que la penta majeure est une position différente à apprendre : c'est exactement le même dessin de touches.`,
          },
          {
            id: 'pi_m2l3', title: 'La blue note & la gamme blues',
            goal: `Ajouter la note de tension qui donne sa couleur au blues, jouable en passage rapide.`,
            theory: `Ajoute une seule touche à la pentatonique mineure de Do — le Solb, quinte diminuée (♭5), la « blue note » — et tu obtiens la gamme blues (1 ♭3 4 ♭5 5 ♭7) : Do‑Mib‑Fa‑Solb‑Sol‑Sib. C'est une note de tension : au piano, elle se joue en passage rapide (souvent en grace note ou en glissé entre Fa et Sol) et ne se tient jamais longtemps, sous peine de sonner « fausse » plutôt que tendue.`,
            diagram: { type:'keyboard', dots: [
              { note:0, root:true, label:'1' }, { note:3, label:'2' }, { note:5, label:'3' }, { note:6, label:'♭5' }, { note:7, label:'4' }, { note:10, label:'5' },
            ] },
            tab: null, bpm: { start: 55, goal: 95 },
            success: `Joue un petit motif de 4-5 notes incluant le Solb (♭5) en résolvant vers le Sol juste — jamais tenu.`,
            cards: [
              { front:`Formule de la gamme blues`, back:`1 ♭3 4 ♭5 5 ♭7` },
              { front:`La « blue note » en Do blues =`, back:`Solb, la quinte diminuée, entre le Fa et le Sol` },
              { front:`Où résout généralement la blue note ?`, back:`Vers la quarte ou la quinte juste — jamais tenue` },
            ],
            pitfall: `Laisser sonner la blue note comme une note stable : elle doit rester une note de passage, en tension, vite résolue.`,
          },
        ],
        fiche: {
          title: 'Pentatonique & blues au piano — l\'essentiel',
          intro: `La gamme à 5 notes qui tombe naturellement sous les doigts — le point de départ de ton impro.`,
          sections: [
            { h:`Pentatonique mineure`, body:`Formule 1 ♭3 4 5 ♭7. En Do : Do Mib Fa Sol Sib. 5 notes = 5 doigts, aucun passage de pouce.` },
            { h:`Pentatonique majeure & relative`, body:`Mêmes touches que la relative mineure (Mib majeur ↔ Do mineur) — seule la tonique change.` },
            { h:`La blue note`, body:`♭5 (Solb) ajoutée à la penta mineure = gamme blues. Note de tension, en passage rapide, jamais tenue.` },
          ],
          diagram: { type:'keyboard', dots: [
            { note:0, root:true, label:'1' }, { note:3, label:'2' }, { note:5, label:'3' }, { note:7, label:'4' }, { note:10, label:'5' },
          ] },
        },
      },

      /* ---------------- MODULE 3 — LES MODES AU PIANO ---------------- */
      {
        id: 'pi_m3', icon: '🎨', title: 'Les modes au piano',
        goal: `Les mêmes touches blanches, 7 couleurs différentes selon la tonique.`,
        lessons: [
          {
            id: 'pi_m3l1', title: 'Le principe des modes au piano',
            goal: `Comprendre que les 7 touches blanches donnent 7 modes différents selon la tonique.`,
            theory: `Un mode, ce sont les mêmes 7 notes qu'une gamme majeure, mais avec une tonique différente. Au piano, ce principe est particulièrement visible : les 7 touches blanches de Do majeur donnent 7 modes différents selon la touche sur laquelle tu commences et résous — Do (Ionien, la référence), Ré (Dorien), Mi (Phrygien), Fa (Lydien), Sol (Mixolydien), La (Éolien, le mineur naturel), Si (Locrien). Aucune touche noire n'entre en jeu : seule ta tonique change.`,
            diagram: null, tab: null, bpm: null,
            success: `Récite les 7 modes dans l'ordre des touches blanches (Do→Si) avec leur nom.`,
            cards: [
              { front:`Les 7 modes de Do majeur, dans l'ordre des touches blanches`, back:`Do=Ionien, Ré=Dorien, Mi=Phrygien, Fa=Lydien, Sol=Mixolydien, La=Éolien, Si=Locrien` },
              { front:`Qu'est-ce qui change d'un mode à l'autre, au piano ?`, back:`Uniquement la touche de résolution (tonique) — aucune touche noire ajoutée ou retirée` },
            ],
            pitfall: `Chercher une nouvelle position de doigts pour chaque mode : ce sont les mêmes touches blanches, seul le point de départ/résolution change.`,
          },
          {
            id: 'pi_m3l2', title: 'Dorien & Mixolydien (les 2 utilitaires)',
            goal: `Les 2 modes les plus employés, joués sur les touches blanches.`,
            theory: `Ré Dorien = les touches blanches de Ré à Ré (Ré Mi Fa Sol La Si Do). Comparé au Ré mineur naturel (qui aurait un Sib), le Si reste NATUREL — cette 6te majeure lui donne une couleur « jazzy », moins triste. Sol Mixolydien = les touches blanches de Sol à Sol (Sol La Si Do Ré Mi Fa) — comparé au Sol majeur (qui aurait un Fa#), le Fa reste NATUREL — cette 7e mineure est la gamme de l'accord de dominante, le son du blues et du funk.`,
            diagram: { type:'keyboard', dots: [
              { note:0, label:'7' }, { note:2, root:true, label:'1' }, { note:4, label:'2' }, { note:5, label:'♭3' },
              { note:7, label:'4' }, { note:9, label:'5' }, { note:11, label:'6' }, { note:12, label:'7' },
            ] },
            tab: null, bpm: null,
            success: `Joue Ré Dorien (Ré à Ré, touches blanches) en insistant sur le Si — LA note qui le distingue du Ré mineur naturel.`,
            cards: [
              { front:`Ré Dorien = quelles touches ?`, back:`Les touches blanches de Ré à Ré (Ré Mi Fa Sol La Si Do)` },
              { front:`Ce qui distingue Ré Dorien de Ré mineur naturel`, back:`Le Si reste NATUREL (6te majeure) au lieu de Sib` },
              { front:`Sol Mixolydien = quelles touches ?`, back:`Les touches blanches de Sol à Sol (le Fa reste naturel, pas Fa#)` },
            ],
            pitfall: `Vouloir ajouter une touche noire « pour faire plus jazzy » : ces deux modes utilitaires n'en ont besoin d'aucune, tout est déjà dans les touches blanches.`,
          },
          {
            id: 'pi_m3l3', title: 'Phrygien, Lydien & Locrien',
            goal: `Les couleurs plus rares, toujours sur les touches blanches.`,
            theory: `Mi Phrygien = touches blanches de Mi à Mi — son espagnol/oriental, le Fa juste au-dessus du Mi crée ce demi-ton caractéristique dès le 2e degré. Fa Lydien = touches blanches de Fa à Fa — son flottant et rêveur, le Si juste au-dessus du Fa crée une quarte augmentée. Si Locrien = touches blanches de Si à Si, le mode le plus instable de tous (2nde ET quinte diminuées dès le départ) — sert surtout de passage, jamais de résolution stable.`,
            diagram: { type:'keyboard', dots: [
              { note:0, label:'6' }, { note:2, label:'7' }, { note:4, root:true, label:'1' }, { note:5, label:'2' },
              { note:7, label:'3' }, { note:9, label:'4' }, { note:11, label:'5' }, { note:12, label:'6' },
            ] },
            tab: null, bpm: null,
            success: `Joue les 3 modes (Mi à Mi, Fa à Fa, Si à Si) et identifie à l'oreille lequel sonne « instable » (Si Locrien).`,
            cards: [
              { front:`Mi Phrygien`, back:`Touches blanches de Mi à Mi — son espagnol/oriental` },
              { front:`Fa Lydien`, back:`Touches blanches de Fa à Fa — son flottant/rêveur` },
              { front:`Si Locrien`, back:`Le plus instable de tous les modes — sert de passage, jamais de résolution` },
            ],
            pitfall: `Vouloir résoudre une impro sur Si Locrien comme une tonique stable : ce mode ne « se pose » jamais vraiment, contrairement aux 6 autres.`,
          },
        ],
        fiche: {
          title: 'Les modes au piano — l\'essentiel',
          intro: `Les mêmes touches blanches, 7 couleurs différentes selon la tonique.`,
          sections: [
            { h:`Le principe`, body:`Les 7 touches blanches de Do majeur donnent 7 modes selon la tonique — aucune touche noire n'entre en jeu.` },
            { h:`Dorien & Mixolydien`, body:`Ré à Ré (6te majeure) et Sol à Sol (7e mineure) — les 2 modes utilitaires, tout en touches blanches.` },
            { h:`Phrygien, Lydien, Locrien`, body:`Mi à Mi (espagnol), Fa à Fa (flottant), Si à Si (le plus instable, jamais de résolution).` },
          ],
          diagram: { type:'keyboard', dots: [
            { note:0, label:'7' }, { note:2, root:true, label:'1' }, { note:4, label:'2' }, { note:5, label:'♭3' },
            { note:7, label:'4' }, { note:9, label:'5' }, { note:11, label:'6' }, { note:12, label:'7' },
          ] },
        },
      },

      /* ---------------- MODULE 4 — TRIADES ET RENVERSEMENTS ---------------- */
      {
        id: 'pi_m4', icon: '🔺', title: 'Triades et renversements',
        goal: `Le plus petit accord possible, et l'art de le réorganiser sans le changer.`,
        lessons: [
          {
            id: 'pi_m4l1', title: 'Construction des triades',
            goal: `Jouer les 4 qualités de triades ensemble, à 3 doigts.`,
            theory: `Une triade empile 3 notes par tierces à partir de la fondamentale : degrés 1, 3, 5. Quatre qualités : majeur (1 3 5), mineur (1 ♭3 5), diminué (1 ♭3 ♭5 — instable), augmenté (1 3 #5 — flottant, rare). Au piano, une triade se joue avec 3 doigts non-adjacents de la même main (souvent 1‑3‑5), toutes les notes frappées EXACTEMENT ensemble — c'est un seul son, pas trois notes successives.`,
            diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'1' }, { note:4, label:'3' }, { note:7, label:'5' } ] },
            tab: null, bpm: null,
            success: `Joue Do‑Mi‑Sol (doigts 1‑3‑5) puis Do‑Mib‑Sol (mineur) parfaitement ensemble, et écoute la différence de couleur.`,
            cards: [
              { front:`Triade majeure`, back:`1 3 5` },
              { front:`Triade mineure`, back:`1 ♭3 5` },
              { front:`Triade diminuée`, back:`1 ♭3 ♭5 (instable, tendu)` },
              { front:`Triade augmentée`, back:`1 3 #5 (flottant, rare)` },
            ],
            pitfall: `Jouer les 3 notes l'une après l'autre au lieu de vraiment ensemble : une triade se juge à l'oreille comme un seul son.`,
          },
          {
            id: 'pi_m4l2', title: 'Les renversements',
            goal: `Réorganiser les 3 mêmes notes pour enchaîner les accords sans sauter.`,
            theory: `Une triade a 3 renversements selon la note la plus grave : état fondamental (Do‑Mi‑Sol, fondamentale en bas), 1er renversement (Mi‑Sol‑Do, tierce en bas), 2e renversement (Sol‑Do‑Mi, quinte en bas). Les 3 renversements contiennent EXACTEMENT les mêmes notes — seule la plus grave change. Au piano, les renversements permettent d'enchaîner des accords avec un minimum de déplacement de main (voice leading) : un outil très concret, propre au clavier où toutes les notes sont visibles et jouables ensemble.`,
            diagram: { type:'keyboard', dots: [ { note:4, label:'3' }, { note:7, label:'5' }, { note:12, root:true, label:'1' } ] },
            tab: null, bpm: null,
            success: `Joue Do majeur dans ses 3 renversements à la suite (Do‑Mi‑Sol, Mi‑Sol‑Do, Sol‑Do‑Mi) en gardant toujours les 3 mêmes notes.`,
            cards: [
              { front:`État fondamental`, back:`La fondamentale est la note la plus grave` },
              { front:`1er renversement`, back:`La tierce est la note la plus grave` },
              { front:`2e renversement`, back:`La quinte est la note la plus grave` },
              { front:`À quoi servent les renversements au piano ?`, back:`Enchaîner des accords avec un minimum de mouvement de main (voice leading)` },
            ],
            pitfall: `Croire qu'un renversement change les notes de l'accord : ce sont toujours les 3 mêmes notes, seul l'ordre (la plus grave) change.`,
          },
        ],
        fiche: {
          title: 'Triades et renversements — l\'essentiel',
          intro: `La brique de base, et l'art de la réorganiser sans la changer.`,
          sections: [
            { h:`Construction`, body:`Empiler des tierces à partir de la fondamentale : degrés 1, 3, 5. 4 qualités : majeur, mineur, diminué, augmenté.` },
            { h:`Les renversements`, body:`Mêmes 3 notes, note la plus grave différente : fondamental (1 en bas), 1er renv. (3 en bas), 2e renv. (5 en bas).` },
            { h:`Utilité au piano`, body:`Les renversements minimisent le déplacement de main entre deux accords qui s'enchaînent (voice leading).` },
          ],
          diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'1' }, { note:4, label:'3' }, { note:7, label:'5' } ] },
        },
      },

      /* ---------------- MODULE 5 — ACCORDS DE 7e AU PIANO ---------------- */
      {
        id: 'pi_m5', icon: '7️⃣', title: 'Accords de 7e au piano',
        goal: `Empiler une 4e tierce — et profiter du fait que le piano peut tout jouer d'un coup.`,
        lessons: [
          {
            id: 'pi_m5l1', title: `D'où viennent les accords de 7e`,
            goal: `Connaître les 5 qualités de 7e et leurs formules.`,
            theory: `Empile une 4e tierce sur la triade (un degré 7) et tu obtiens un accord de 7e — 4 notes, une couleur plus riche, plus « jazz ». Cinq qualités : Maj7 (1 3 5 7 — doux, rêveur), 7 dit « de dominante » (1 3 5 ♭7 — tension qui veut résoudre), m7 (1 ♭3 5 ♭7 — mineur doux), m7♭5 (1 ♭3 ♭5 ♭7 — instable, le ii d'un ii‑V‑I mineur), dim7 (1 ♭3 ♭5 ♭♭7 — symétrique, très tendu).`,
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
            id: 'pi_m5l2', title: 'Cmaj7 en position serrée puis renversé',
            goal: `Jouer les 4 notes complètes d'un accord de 7e sous une seule main.`,
            theory: `Contrairement à la guitare, qui doit souvent sacrifier une note (la 5te) faute de doigts disponibles, le piano peut jouer les 4 notes complètes d'un accord de 7e sous une seule main. En position serrée, Cmaj7 s'empile Do‑Mi‑Sol‑Si (1‑3‑5‑7). En pratique jazz, on préfère souvent un renversement qui place la 7e ou la 3ce en haut (plus proche d'une éventuelle mélodie) plutôt que la fondamentale.`,
            diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'1' }, { note:4, label:'3' }, { note:7, label:'5' }, { note:11, label:'7' } ] },
            tab: null, bpm: null,
            success: `Joue Cmaj7 en position serrée (Do Mi Sol Si), puis en 1er renversement (Mi Sol Si Do).`,
            cards: [
              { front:`Cmaj7 en position serrée`, back:`Do Mi Sol Si (1‑3‑5‑7 empilés)` },
              { front:`Différence piano/guitare pour les accords de 7e`, back:`Le piano joue les 4 notes complètes sous une main ; la guitare doit souvent en sacrifier une` },
            ],
            pitfall: `Toujours jouer l'accord en position serrée fondamentale : varier les renversements évite un son plat et répétitif.`,
          },
        ],
        fiche: {
          title: 'Accords de 7e au piano — l\'essentiel',
          intro: `La couleur qui ouvre la porte du jazz — et un avantage propre au clavier.`,
          sections: [
            { h:`D'où ils viennent`, body:`On empile une 4e tierce (degré 7) sur la triade. 5 qualités : Maj7, 7 dominante, m7, m7♭5, dim7.` },
            { h:`Avantage piano`, body:`Les 4 notes complètes tiennent sous une seule main — pas besoin de sacrifier une note comme à la guitare.` },
            { h:`Renversements`, body:`Cmaj7 se joue en position serrée ou renversé (7e ou 3ce en haut) pour varier le son.` },
          ],
          diagram: { type:'keyboard', dots: [ { note:0, root:true, label:'1' }, { note:4, label:'3' }, { note:7, label:'5' }, { note:11, label:'7' } ] },
        },
      },

      /* ---------------- MODULE 6 — EXTENSIONS ET VOICINGS JAZZ ---------------- */
      {
        id: 'pi_m6', icon: '✨', title: 'Extensions et voicings jazz',
        goal: `9e, 11e, 13e — et le voicing « rootless » de la main gauche jazz.`,
        lessons: [
          {
            id: 'pi_m6l1', title: 'Le principe des extensions',
            goal: `Comprendre que 9e, 11e, 13e sont les degrés 2, 4, 6 déplacés une octave plus haut.`,
            theory: `Continue à empiler des tierces au-delà de la 7e et tu obtiens les extensions : la 9e (le degré 2, une octave plus haut), la 11e (le degré 4), la 13e (le degré 6). Elles ajoutent de la couleur sans changer la fonction de base de l'accord (un Cmaj9 reste fondamentalement un Cmaj7). En pratique, on choisit rarement toutes les extensions à la fois — une ou deux suffisent à enrichir la couleur sans surcharger.`,
            diagram: null, tab: null, bpm: null,
            success: `Explique pourquoi Cmaj9 « est toujours » un Cmaj7 avec une couleur en plus, pas un accord totalement différent.`,
            cards: [
              { front:`9e =`, back:`le degré 2, joué une octave plus haut` },
              { front:`11e =`, back:`le degré 4, joué une octave plus haut` },
              { front:`13e =`, back:`le degré 6, joué une octave plus haut` },
              { front:`Les extensions changent-elles la fonction de l'accord ?`, back:`Non — elles ajoutent une couleur, la fonction de base reste` },
            ],
            pitfall: `Vouloir empiler toutes les extensions à la fois : 1-2 suffisent en pratique, sinon l'accord devient illisible à l'oreille.`,
          },
          {
            id: 'pi_m6l2', title: 'Le voicing « rootless »',
            goal: `Jouer un accord de 7e étendu sans la fondamentale, comme en groupe.`,
            theory: `En jazz piano, la main gauche joue très souvent un voicing SANS la fondamentale (« rootless ») : en groupe, la contrebasse joue déjà la fondamentale, la répéter au piano encombre le son. Voicing rootless classique pour un accord de 7e étendu : 3‑5‑7‑9 (on remplace la fondamentale par la 9e). Pour Cmaj9 sans fondamentale : Mi‑Sol‑Si‑Ré (3‑5‑7‑9).`,
            diagram: { type:'keyboard', dots: [ { note:4, root:true, label:'3' }, { note:7, label:'5' }, { note:11, label:'7' }, { note:2, label:'9' } ] },
            tab: null, bpm: null,
            success: `Joue Mi‑Sol‑Si‑Ré (sans le Do) en pensant « 3‑5‑7‑9 » plutôt que fondamentale‑3‑5‑7‑9 au complet.`,
            cards: [
              { front:`Pourquoi la main gauche jazz évite souvent la fondamentale ?`, back:`La basse la joue déjà en groupe ; la répéter encombre le son` },
              { front:`Voicing rootless classique (7e étendu)`, back:`3‑5‑7‑9 (la 9e remplace la fondamentale)` },
            ],
            pitfall: `Utiliser un voicing rootless en solo, sans bassiste : sans fondamentale ailleurs, l'accord perd son ancrage — reste surtout utile en groupe.`,
          },
        ],
        fiche: {
          title: 'Extensions et voicings jazz — l\'essentiel',
          intro: `9e, 11e, 13e, et l'art d'alléger la main gauche en groupe.`,
          sections: [
            { h:`Les extensions`, body:`9e = degré 2, 11e = degré 4, 13e = degré 6, chacune une octave plus haut. Ajoutent une couleur, changent pas la fonction.` },
            { h:`Le voicing rootless`, body:`3‑5‑7‑9 sans la fondamentale — la basse s'en charge en groupe, la répéter au piano encombre le son.` },
          ],
          diagram: { type:'keyboard', dots: [ { note:4, root:true, label:'3' }, { note:7, label:'5' }, { note:11, label:'7' }, { note:2, label:'9' } ] },
        },
      },

      /* ---------------- MODULE 7 — LA MAIN GAUCHE ---------------- */
      {
        id: 'pi_m7', icon: '🤚', title: 'La main gauche',
        goal: `Occuper la main gauche seule, puis superposer les deux mains.`,
        lessons: [
          {
            id: 'pi_m7l1', title: 'L\'alternance basse-accord (stride simplifié)',
            goal: `Donner un son « accompagné » complet avec la seule main gauche.`,
            theory: `Le style le plus simple pour occuper la main gauche seule : alterner une note grave isolée (souvent la fondamentale, sur les temps 1 et 3) avec l'accord complet en position plus haute (sur les temps 2 et 4). C'est une version simplifiée du « stride », popularisé par le early jazz piano — elle donne tout de suite un son accompagné complet, et libère la main droite pour la mélodie ou l'improvisation.`,
            tabLabel: `🎹 Pattern main gauche`, tab: `Temps :   1            2              3            4\nMain G :  Do (grave)   [Do-Mi-Sol]    Sol (grave)  [Do-Mi-Sol]`,
            bpm: { start: 60, goal: 100 },
            success: `Joue ce pattern main gauche seule sur Do majeur, en boucle, sans accélérer ni ralentir.`,
            cards: [
              { front:`Le style « stride » simplifié alterne quoi ?`, back:`Une note grave isolée (temps 1, 3) et l'accord complet (temps 2, 4)` },
              { front:`Pourquoi ce style libère la main droite ?`, back:`La main gauche seule donne déjà basse + harmonie ; la main droite se consacre à la mélodie/impro` },
            ],
            pitfall: `Jouer la basse et l'accord au même volume que la main droite : la main gauche doit rester un fond stable, pas rivaliser avec la mélodie.`,
          },
          {
            id: 'pi_m7l2', title: 'Superposer les deux mains',
            goal: `Ajouter une mélodie simple à la main droite sur le pattern déjà automatisé.`,
            theory: `Une fois le pattern main gauche automatisé (jouable sans y penser), superpose une mélodie simple à la main droite (par exemple la gamme de Do). Le vrai défi technique propre au piano, par rapport à un instrument à une seule ligne mélodique : chaque main doit devenir indépendante de l'autre. Commence très lentement, quitte à jouer la main gauche seule dix fois avant d'ajouter la main droite.`,
            tab: null, bpm: null,
            success: `Joue le pattern main gauche + une mélodie simple main droite (Do‑Ré‑Mi‑Fa‑Sol) simultanément, lentement, sans que les deux mains se désynchronisent.`,
            cards: [
              { front:`Le vrai défi technique propre au piano`, back:`L'indépendance des deux mains` },
              { front:`Méthode pour y arriver`, back:`Automatiser une main seule d'abord, avant de superposer l'autre` },
            ],
            pitfall: `Vouloir jouer les deux mains ensemble dès le début, à tempo normal : automatise CHAQUE main séparément d'abord.`,
          },
        ],
        fiche: {
          title: 'La main gauche — l\'essentiel',
          intro: `Occuper la main gauche seule d'abord, superposer ensuite.`,
          sections: [
            { h:`Le stride simplifié`, body:`Alterner note grave (temps 1,3) et accord complet (temps 2,4) — un son accompagné complet à une seule main.` },
            { h:`L'indépendance des mains`, body:`Le vrai défi du piano. Automatise chaque main séparément avant de les superposer.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 8 — IMPROVISATION AU PIANO ---------------- */
      {
        id: 'pi_m8', icon: '🏆', title: 'Improvisation au piano',
        goal: `Une main tient, l'autre improvise — la synthèse de tout le cours.`,
        lessons: [
          {
            id: 'pi_m8l1', title: 'Une main comp, l\'autre improvise',
            goal: `Improviser à la main droite sur un accord tenu à la main gauche.`,
            theory: `Reprends le principe déjà vu en main gauche (module 7) : pendant que la main gauche tient un accord ou un pattern basse‑accord stable, la main droite improvise avec les outils déjà appris — la pentatonique/blues (module 2) ou le mode qui correspond à l'accord (module 3). Par exemple sur un Do majeur tenu à la main gauche, improvise à la main droite avec la pentatonique majeure de Do ou le mode Ionien.`,
            diagram: null, tab: null, bpm: null,
            success: `Sur un Do majeur tenu à la main gauche (accord ou stride simplifié), improvise 30 secondes à la main droite avec la pentatonique majeure de Do.`,
            cards: [
              { front:`Que fait la main gauche pendant l'improvisation ?`, back:`Elle tient l'accord ou le pattern stable (comping)` },
              { front:`Quels outils utiliser à la main droite pour improviser ?`, back:`La pentatonique/blues (module 2) ou le mode correspondant à l'accord (module 3)` },
            ],
            pitfall: `Vouloir improviser des deux mains en même temps dès le début : stabilise d'abord la main gauche, elle doit devenir presque automatique avant d'improviser dessus.`,
          },
          {
            id: 'pi_m8l2', title: 'Le blues piano — application concrète',
            goal: `Combiner main gauche stable et gamme blues main droite sur une grille complète.`,
            theory: `Le blues piano classique combine tout ce qui précède : main gauche en pattern basse‑accord (le stride simplifié du module 7) sur la grille de blues (I‑IV‑V), main droite en gamme blues (module 2) avec la blue note en passage. Simplification qui marche très bien en débutant/intermédiaire : garder la MÊME gamme blues à la main droite tout du long, même quand l'accord change à la main gauche (I puis IV puis V) — contrairement à la guitare, où l'on module parfois la gamme par accord.`,
            diagram: null, tab: null, bpm: null,
            success: `Joue 12 mesures de blues en Do (grille I‑IV‑V simplifiée) à la main gauche, en improvisant avec la gamme blues de Do à la main droite tout du long.`,
            cards: [
              { front:`Grille de blues simplifiée`, back:`I‑IV‑V (Do‑Fa‑Sol en Do)` },
              { front:`Quelle gamme main droite sur toute la grille ?`, back:`La même gamme blues du ton principal, du début à la fin` },
            ],
            pitfall: `Vouloir changer de gamme à chaque accord comme à la guitare : au piano débutant/intermédiaire, garder la même gamme blues du ton principal sur toute la grille fonctionne déjà très bien.`,
          },
        ],
        fiche: {
          title: 'Improvisation au piano — l\'essentiel',
          intro: `La synthèse de tout le cours : une main tient, l'autre improvise.`,
          sections: [
            { h:`Le principe`, body:`Main gauche stable (accord ou stride) + main droite qui improvise avec pentatonique/blues ou le mode adapté.` },
            { h:`Le blues piano`, body:`Grille I‑IV‑V à la main gauche, même gamme blues à la main droite du début à la fin.` },
          ], diagram: null,
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

  /* ================= BOXE — Le Codex du Ring ================= */
  boxe: {
    id: 'boxe', disciplineId: 'boxe',
    title: 'Le Codex du Ring',
    subtitle: `Des coups isolés à la stratégie de combat`,
    modules: [

      /* ---------------- MODULE 0 — FONDAMENTAUX TECHNIQUES ---------------- */
      {
        id: 'bx_m0', icon: '🧭', title: 'Fondamentaux techniques',
        goal: `Consolider la garde, le jab et le direct avant d'aller plus loin.`,
        lessons: [
          {
            id: 'bx_m0l1', title: 'La garde et le jab (1)',
            goal: `Tenir une garde solide et lancer un jab qui ne t'expose pas.`,
            theory: `La garde de base (droitier, orthodoxe) : pied gauche devant, pied droit derrière, pieds à largeur d'épaules, genoux légèrement fléchis, menton rentré derrière l'épaule avant, mains hautes près du visage, coudes serrés près des côtes. Le jab (coup n°1) est un direct du bras avant : il part et revient sur la trajectoire la plus courte, le poing tourne légèrement à l'impact (paume vers le bas). C'est le coup le plus utilisé en boxe — il mesure la distance et prépare les combinaisons.`,
            tabLabel: `🥊 Notation`, tab: `1 = jab (bras avant)`, bpm: null,
            success: `Filme-toi de profil : à l'impact du jab, ton menton reste rentré et ta main arrière reste collée à la joue, jamais basse.`,
            cards: [
              { front:`Garde orthodoxe (droitier) : quel pied devant ?`, back:`Le pied gauche` },
              { front:`Le jab, c'est le coup n°`, back:`1 — bras avant` },
              { front:`Rôle principal du jab`, back:`Mesurer la distance et préparer les combinaisons` },
            ],
            pitfall: `Laisser tomber la main arrière en jabbant : c'est LA faute qui expose au direct ou au crochet adverse pendant que ton bras est tendu.`,
          },
          {
            id: 'bx_m0l2', title: 'Le direct (2) et la rotation de hanche',
            goal: `Comprendre d'où vient réellement la puissance du direct.`,
            theory: `Le direct (coup n°2, bras arrière) tire sa puissance de la rotation du bassin et du pivot du pied arrière, pas du bras seul. Chaîne cinétique : le talon arrière se lève et pivote → la hanche tourne → l'épaule suit → le bras se tend en dernier. Un direct « du bras seul » est faible et déséquilibre celui qui le lance.`,
            tabLabel: `🥊 Notation`, tab: `2 = direct (bras arrière)`, bpm: null,
            success: `Lance 10 directs au ralenti en vérifiant que le talon arrière se lève et pivote AVANT que le poing ne parte.`,
            cards: [
              { front:`D'où vient la puissance du direct ?`, back:`De la rotation hanche + pivot du pied arrière, pas du bras seul` },
              { front:`Ordre de la chaîne cinétique du direct`, back:`Pied → hanche → épaule → bras` },
            ],
            pitfall: `Pivoter le pied APRÈS avoir frappé plutôt qu'avant : la puissance part alors du bras seul et le coup perd sa force.`,
          },
        ],
        fiche: {
          title: `Fondamentaux techniques — l'essentiel`,
          intro: `La garde, le jab et le direct : la base sur laquelle tout le reste se construit.`,
          sections: [
            { h:`La garde`, body:`Pied avant opposé à la main forte, genoux fléchis, menton rentré, mains hautes, coudes serrés.` },
            { h:`Le jab (1)`, body:`Coup du bras avant, mesure la distance, revient immédiatement — la garde arrière ne bouge jamais.` },
            { h:`Le direct (2)`, body:`Puissance = pivot du pied arrière → hanche → épaule → bras, dans cet ordre.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 1 — CROCHETS ET UPPERCUTS ---------------- */
      {
        id: 'bx_m1', icon: '🌀', title: 'Crochets et uppercuts',
        goal: `Ajouter les coups courbes à ton arsenal.`,
        lessons: [
          {
            id: 'bx_m1l1', title: 'Le crochet (3/4)',
            goal: `Placer un crochet qui garde sa puissance sans s'ouvrir en ligne droite.`,
            theory: `Le crochet est un coup courbe, coude plié à environ 90°, qui arrive sur le côté plutôt que de face. Sa puissance vient de la rotation du corps (hanche + épaule + pivot du pied), pas du bras qui « tire » un arc de cercle. Le crochet au corps vise les côtes, le crochet à la tête vise la mâchoire ou la tempe.`,
            tabLabel: `🥊 Notation`, tab: `3 = crochet avant   4 = crochet arrière`, bpm: null,
            success: `Vérifie que ton coude reste à environ 90° tout au long du mouvement — s'il s'ouvre en ligne droite, ce n'est plus un crochet mais un direct déguisé.`,
            cards: [
              { front:`Angle du coude sur un crochet`, back:`Environ 90°, maintenu tout au long du mouvement` },
              { front:`D'où vient la puissance du crochet ?`, back:`Rotation du corps (hanche + épaule + pivot du pied), pas le bras seul` },
            ],
            pitfall: `« Tirer » le crochet en grand arc de cercle avec le bras : perte de puissance et garde ouverte plus longtemps que nécessaire.`,
          },
          {
            id: 'bx_m1l2', title: `L'uppercut (5/6)`,
            goal: `Comprendre la trajectoire et la distance d'utilisation de l'uppercut.`,
            theory: `L'uppercut part du bas vers le haut : les jambes se fléchissent légèrement pour « charger », puis leur extension combinée à la rotation de hanche pousse le poing vers le haut, paume vers soi à l'impact. Il est surtout efficace à courte distance, pour percer une garde haute ou toucher le corps.`,
            tabLabel: `🥊 Notation`, tab: `5 = uppercut avant   6 = uppercut arrière`, bpm: null,
            success: `Garde les jambes immobiles sur quelques répétitions : la puissance doit chuter nettement, preuve que le mouvement vient normalement des jambes.`,
            cards: [
              { front:`Trajectoire de l'uppercut`, back:`Du bas vers le haut, chargé par la flexion puis l'extension des jambes` },
              { front:`À quelle distance l'uppercut est-il le plus efficace ?`, back:`Courte distance (percer une garde haute, toucher le corps)` },
            ],
            pitfall: `Lancer l'uppercut de trop loin : sans la distance courte, le coup perd son angle et devient facilement lisible et évitable.`,
          },
        ],
        fiche: {
          title: `Crochets et uppercuts — l'essentiel`,
          intro: `Les coups courbes qui complètent le jab et le direct.`,
          sections: [
            { h:`Le crochet (3/4)`, body:`Coude à 90°, puissance venue de la rotation du corps, jamais d'un bras qui tire un arc.` },
            { h:`L'uppercut (5/6)`, body:`Trajectoire bas→haut, chargée par les jambes ; efficace surtout à courte distance.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 2 — COMBINAISONS INTERMÉDIAIRES ---------------- */
      {
        id: 'bx_m2', icon: '🔗', title: 'Combinaisons intermédiaires',
        goal: `Enchaîner les coups avec fluidité, sans temps mort.`,
        lessons: [
          {
            id: 'bx_m2l1', title: '1-2-3 et 1-1-2',
            goal: `Enchaîner deux combinaisons classiques sans laisser tomber la garde.`,
            theory: `Une combinaison enchaîne des coups dans un ordre qui exploite les ouvertures créées par le coup précédent. 1-2-3 (jab-direct-crochet) : le jab et le direct poussent l'adversaire à se couvrir la tête, le crochet arrive alors sur le côté, souvent moins gardé. 1-1-2 (jab-jab-direct) : le double jab casse le rythme attendu — l'adversaire anticipe souvent une combinaison après un seul jab.`,
            tabLabel: `🥊 Combos`, tab: `1 - 2 - 3\n1 - 1 - 2`, bpm: {start:60, goal:100},
            success: `Enchaîne 1-2-3 au métronome, 20 répétitions, sans jamais laisser retomber la garde entre les coups.`,
            cards: [
              { front:`Pourquoi le crochet touche souvent dans 1-2-3 ?`, back:`Le jab et le direct forcent la garde à se couvrir la tête, ouvrant le côté` },
              { front:`Pourquoi 1-1-2 surprend l'adversaire ?`, back:`Le double jab casse le rythme attendu d'une combinaison classique` },
            ],
            pitfall: `Marquer une pause entre chaque coup de la combinaison : les coups doivent s'enchaîner fluides, sans temps mort qui laisse le temps de réagir.`,
          },
          {
            id: 'bx_m2l2', title: 'Le retour en garde (1-2-3-2)',
            goal: `Ajouter un 2e coup arrière en fin de combo, et retourner en garde instantanément.`,
            theory: `Ajouter un direct en fin de combo (1-2-3-2) revient sur la ligne de l'adversaire juste après le crochet latéral — souvent la contre-attaque la plus payante, car l'adversaire, focalisé sur le crochet qui vient de partir, ne s'attend pas à un direct immédiat. Le retour en garde après le dernier coup est aussi important que la combo elle-même : c'est le moment où tu es le plus vulnérable.`,
            tabLabel: `🥊 Combo`, tab: `1 - 2 - 3 - 2`, bpm: {start:60, goal:110},
            success: `Après le dernier coup de la combo, chronomètre-toi : ta garde doit être remontée en moins d'une seconde.`,
            cards: [
              { front:`Pourquoi ajouter un 2e direct en fin de combo ?`, back:`L'adversaire, focalisé sur le crochet qui vient de partir, ne l'anticipe pas` },
              { front:`Le moment le plus vulnérable d'une combo`, back:`Juste après le dernier coup, avant le retour en garde` },
            ],
            pitfall: `Considérer la combo « terminée » après le dernier coup : le retour en garde EST une partie de la combo, pas un à-côté.`,
          },
        ],
        fiche: {
          title: `Combinaisons intermédiaires — l'essentiel`,
          intro: `Enchaîner sans temps mort, et toujours revenir en garde.`,
          sections: [
            { h:`1-2-3 / 1-1-2`, body:`Le jab/direct ouvrent la garde pour le crochet ; le double jab casse le rythme attendu.` },
            { h:`1-2-3-2`, body:`Revenir sur la ligne juste après le crochet surprend souvent le plus.` },
            { h:`Le retour en garde`, body:`Fait partie intégrante de la combo — pas un à-côté après le dernier coup.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 3 — DÉFENSE ACTIVE ET CONTRE-ATTAQUE ---------------- */
      {
        id: 'bx_m3', icon: '🛡️', title: 'Défense active et contre-attaque',
        goal: `Passer d'une défense passive à une défense qui prépare la riposte.`,
        lessons: [
          {
            id: 'bx_m3l1', title: 'Esquive et riposte immédiate (slip)',
            goal: `Esquiver latéralement sans reculer, et contre-attaquer dans le même mouvement.`,
            theory: `L'esquive latérale (slip) déplace légèrement la tête sur le côté pour laisser passer un direct adverse, sans reculer — ce qui te sortirait de portée pour contre-attaquer. Intérêt majeur : une fois le coup adverse esquivé, tu es souvent déjà en position idéale pour placer un crochet ou un direct immédiat, car l'adversaire est en léger déséquilibre après son propre coup manqué.`,
            tab: null, bpm: null,
            success: `Esquive latéralement de quelques centimètres seulement (jab imaginé ou lancé par un partenaire), puis place immédiatement un crochet — en un seul mouvement fluide, pas 2 temps séparés.`,
            cards: [
              { front:`Différence entre esquiver et reculer`, back:`Esquiver garde la distance de contre-attaque ; reculer te sort de portée` },
              { front:`Pourquoi contre-attaquer juste après une esquive est efficace ?`, back:`L'adversaire est en léger déséquilibre après son propre coup manqué` },
            ],
            pitfall: `Esquiver en reculant plutôt qu'en bougeant la tête sur le côté : tu perds la distance de contre-attaque et dois retraverser l'espace pour répondre.`,
          },
          {
            id: 'bx_m3l2', title: 'Le blocage et le contre au corps',
            goal: `Savoir quand bloquer plutôt qu'esquiver, et exploiter l'ouverture qui suit.`,
            theory: `Bloquer avec les avant-bras/coudes (garde haute serrée) coûte moins d'énergie que d'esquiver systématiquement, mais absorbe l'impact plutôt que de l'éviter. Un bon défenseur alterne : bloque les coups francs et directs, esquive plutôt les crochets (plus difficiles à bloquer proprement sans se faire tourner la garde). Après un blocage réussi au corps, l'adversaire est souvent penché en avant — une ouverture pour un uppercut.`,
            tab: null, bpm: null,
            success: `Sur une série de coups imaginée, distingue à voix haute lesquels tu bloquerais et lesquels tu esquiverais, en justifiant chaque choix.`,
            cards: [
              { front:`Quand bloquer plutôt qu'esquiver ?`, back:`Sur les coups francs/directs — les crochets se bloquent mal sans tourner la garde` },
              { front:`Ouverture typique après un blocage au corps`, back:`L'adversaire penché en avant → uppercut` },
            ],
            pitfall: `Bloquer systématiquement tous les coups : l'accumulation d'impacts, même bloqués, fatigue les bras et use la résistance sur la durée d'un combat.`,
          },
        ],
        fiche: {
          title: `Défense active et contre-attaque — l'essentiel`,
          intro: `Défendre pour préparer la riposte, pas juste pour subir moins.`,
          sections: [
            { h:`Le slip`, body:`Esquive latérale sans reculer → position idéale pour contre-attaquer immédiatement.` },
            { h:`Bloquer vs esquiver`, body:`Bloque les coups francs, esquive plutôt les crochets.` },
            { h:`Après un blocage au corps`, body:`L'adversaire penché en avant ouvre la voie à un uppercut.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 4 — FEINTES ET DÉPLACEMENTS AVANCÉS ---------------- */
      {
        id: 'bx_m4', icon: '🌊', title: 'Feintes et déplacements avancés',
        goal: `Tromper l'adversaire par le mouvement avant même de frapper.`,
        lessons: [
          {
            id: 'bx_m4l1', title: 'La feinte de jab',
            goal: `Créer une ouverture en amorçant un coup sans l'envoyer.`,
            theory: `Une feinte amorce le début d'un mouvement de coup (léger mouvement d'épaule ou de bras) sans l'envoyer, dans le seul but de faire réagir l'adversaire — il lève sa garde, recule, ou se fige — ce qui crée une ouverture pour le vrai coup qui suit. La feinte de jab est la plus simple : un léger à-coup de l'épaule avant suffit à faire flancher un adversaire qui anticipe.`,
            tabLabel: `🥊 Combo`, tab: `feinte(1) - 3`, bpm: null,
            success: `Fais 10 feintes de jab suivies d'un vrai crochet, en variant le délai entre la feinte et le vrai coup pour ne pas devenir prévisible.`,
            cards: [
              { front:`Qu'est-ce qu'une feinte ?`, back:`Amorcer un mouvement de coup sans l'envoyer, pour faire réagir l'adversaire` },
              { front:`Pourquoi une feinte doit rester imprévisible ?`, back:`Sinon l'adversaire apprend le pattern et arrête d'y réagir` },
            ],
            pitfall: `Feinter toujours de la même façon avec le même délai : l'adversaire apprend le pattern et la feinte perd toute son utilité.`,
          },
          {
            id: 'bx_m4l2', title: 'Le pas chassé et la sortie en angle',
            goal: `Se déplacer sans croiser les jambes, et sortir hors de la ligne de contre-attaque.`,
            theory: `Le pas chassé (traîner légèrement le pied arrière vers l'avant sans jamais croiser les jambes) permet d'avancer ou de reculer sans perdre l'équilibre ni exposer une jambe croisée, vulnérable à un déséquilibre. Sortir « en angle » après une combo — se déplacer légèrement sur le côté plutôt que tout droit en arrière — évite de rester sur la ligne directe de contre-attaque de l'adversaire.`,
            tab: null, bpm: null,
            success: `Enchaîne une combo puis sors immédiatement en angle (pas tout droit en arrière) : vérifie que tu n'es plus aligné avec l'adversaire imaginaire après ta sortie.`,
            cards: [
              { front:`Pourquoi ne jamais croiser les jambes en se déplaçant ?`, back:`Ça fait perdre l'équilibre et expose à un déséquilibre immédiat` },
              { front:`Pourquoi sortir en angle plutôt qu'en ligne droite ?`, back:`Rester sur la ligne directe laisse l'adversaire poursuivre et contre-attaquer facilement` },
            ],
            pitfall: `Reculer tout droit après une combo : tu restes exactement sur la ligne où l'adversaire peut te poursuivre et contre-attaquer directement.`,
          },
        ],
        fiche: {
          title: `Feintes et déplacements avancés — l'essentiel`,
          intro: `Tromper par le mouvement, se déplacer sans jamais s'exposer.`,
          sections: [
            { h:`La feinte`, body:`Amorcer sans envoyer, pour créer une réaction et une ouverture. Doit rester imprévisible.` },
            { h:`Le pas chassé`, body:`Jamais croiser les jambes en se déplaçant.` },
            { h:`Sortir en angle`, body:`Après une combo, se déplacer sur le côté plutôt que reculer tout droit.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 5 — COMBINAISONS AVANCÉES ---------------- */
      {
        id: 'bx_m5', icon: '⚡', title: 'Combinaisons avancées',
        goal: `Ajouter changement de niveau et rupture de rythme à tes combos.`,
        lessons: [
          {
            id: 'bx_m5l1', title: 'Changement de niveau (tête/corps)',
            goal: `Alterner les cibles dans une combo à 5 coups sans casser l'équilibre.`,
            theory: `Une combinaison avancée alterne les cibles (tête/corps) pour empêcher l'adversaire de « regarder » une seule zone à protéger. Exemple : 1 (tête) - 2 (tête) - 3 au corps (changement de niveau, jambes fléchies) - 2 (tête, jambes qui se redressent) - 3 (tête). Le changement de niveau doit venir des jambes, pas juste du buste qui se penche — se pencher seul casse l'équilibre et expose à un uppercut.`,
            tabLabel: `🥊 Combo avancée`, tab: `1 - 2 - 3(corps) - 2 - 3`, bpm: {start:50, goal:90},
            success: `Filme-toi de profil sur cette combo : tes genoux doivent visiblement fléchir sur le coup au corps, pas seulement ton buste qui se penche.`,
            cards: [
              { front:`Pourquoi alterner tête et corps dans une combo ?`, back:`Empêche l'adversaire de protéger une seule zone` },
              { front:`Comment changer de niveau correctement ?`, back:`Avec les jambes (flexion), pas en penchant le buste` },
            ],
            pitfall: `Se pencher en avant depuis la taille pour « descendre » au corps : ça casse l'équilibre et expose le menton à un uppercut pendant que tu es penché.`,
          },
          {
            id: 'bx_m5l2', title: 'Rupture de rythme',
            goal: `Casser le tempo attendu d'une combo pour tromper le timing adverse.`,
            theory: `Varier le rythme d'une combo (pause délibérée puis accélération soudaine) déstabilise plus qu'une combo toujours au même tempo, car l'adversaire calibre sa défense sur un tempo attendu. Exemple : 1... (pause volontaire d'une fraction de seconde) ...2-3-2 (enchaînement soudain et rapide). Cette rupture est une forme de feinte « temporelle » plutôt que de mouvement.`,
            tabLabel: `🥊 Combo à rythme brisé`, tab: `1 [pause] 2-3-2 (rapide)`, bpm: null,
            success: `Fais ressentir clairement la rupture de rythme à un partenaire (ou filme-toi) : la pause doit être ostensible, pas juste « un peu plus lente ».`,
            cards: [
              { front:`Qu'est-ce qu'une feinte temporelle ?`, back:`Une rupture de rythme délibérée (pause puis accélération) plutôt qu'un mouvement` },
              { front:`Pourquoi une combo à tempo constant est plus facile à lire ?`, back:`L'adversaire calibre sa défense sur le tempo qu'il perçoit` },
            ],
            pitfall: `Garder un tempo presque constant en pensant « varier le rythme » : la rupture doit être nette pour tromper le timing adverse, pas subtile.`,
          },
        ],
        fiche: {
          title: `Combinaisons avancées — l'essentiel`,
          intro: `Changement de niveau et rupture de rythme : deux façons de rendre une combo illisible.`,
          sections: [
            { h:`Changement de niveau`, body:`Alterner tête/corps, en fléchissant les jambes — jamais en penchant le buste.` },
            { h:`Rupture de rythme`, body:`Pause nette puis accélération soudaine, pour casser le tempo attendu.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 6 — STRATÉGIE ET LECTURE DE L'ADVERSAIRE ---------------- */
      {
        id: 'bx_m6', icon: '🧠', title: `Stratégie et lecture de l'adversaire`,
        goal: `Combattre avec la tête, pas seulement les poings.`,
        lessons: [
          {
            id: 'bx_m6l1', title: 'Gestion de la distance (les 3 zones)',
            goal: `Identifier les 3 zones de combat et choisir celle qui t'avantage.`,
            theory: `Trois zones de combat : distance longue (hors de portée, sûre mais improductive), distance moyenne (portée du jab/direct, la zone d'échange la plus courante), distance courte/clinch (crochets, uppercuts, corps à corps). Le contrôle du combat consiste souvent à choisir la distance qui t'avantage — grand gabarit → distance longue avec le jab ; puncheur court → chercher la distance courte — et à empêcher l'adversaire d'imposer la sienne.`,
            tab: null, bpm: null,
            success: `Identifie, pour ton propre gabarit et style, quelle distance te favoriserait le plus, et explique pourquoi en une phrase.`,
            cards: [
              { front:`Les 3 zones de distance en boxe`, back:`Longue, moyenne (jab/direct), courte/clinch (crochets, uppercuts)` },
              { front:`Comment choisir la distance qui t'avantage ?`, back:`Selon ton gabarit et ton style (allonge → longue, puncheur court → courte)` },
            ],
            pitfall: `Subir la distance imposée par l'adversaire au lieu de la disputer activement : la distance se gagne, elle ne se contemple pas.`,
          },
          {
            id: 'bx_m6l2', title: `Lire les habitudes de l'adversaire`,
            goal: `Observer avant de foncer, pour anticiper plutôt que réagir.`,
            theory: `Les premiers rounds (ou les premières minutes d'un sparring) servent aussi à observer : quelle main est dominante, quel pied bouge en premier avant une attaque, quels coups reviennent le plus souvent, comment l'adversaire réagit après avoir touché (recule-t-il ou avance-t-il). Ces informations, une fois repérées, permettent d'anticiper plutôt que de simplement réagir.`,
            tab: null, bpm: null,
            success: `Après ton prochain sparring ou exercice, note par écrit 2 habitudes précises que tu as repérées chez ton partenaire ou toi-même.`,
            cards: [
              { front:`À quoi servent les premiers rounds d'observation ?`, back:`Repérer les habitudes de l'adversaire pour anticiper au lieu de réagir` },
              { front:`Quel type d'information chercher ?`, back:`Main dominante, coups favoris, réaction après avoir touché` },
            ],
            pitfall: `Foncer dès le début sans jamais observer : tu combats « à l'aveugle » pendant tout l'échange, sans exploiter les patterns réels de l'adversaire.`,
          },
        ],
        fiche: {
          title: `Stratégie et lecture de l'adversaire — l'essentiel`,
          intro: `La boxe se gagne aussi avec les yeux et la tête, pas seulement les poings.`,
          sections: [
            { h:`Les 3 zones`, body:`Longue / moyenne (jab-direct) / courte (crochets, uppercuts, clinch). Choisis celle qui t'avantage.` },
            { h:`Observer`, body:`Repère main dominante, coups favoris, réaction après avoir touché — pour anticiper.` },
          ], diagram: null,
        },
      },

      /* ---------------- MODULE 7 — CONDITIONNEMENT SPÉCIFIQUE BOXE ---------------- */
      {
        id: 'bx_m7', icon: '🔥', title: 'Conditionnement spécifique boxe',
        goal: `Préparer physiquement pour les efforts réels d'un combat, pas un cardio générique.`,
        lessons: [
          {
            id: 'bx_m7l1', title: `Le circuit explosivité`,
            goal: `Reproduire à l'entraînement les pics d'intensité réels d'un round.`,
            theory: `Le cardio générique (course à pied) prépare mal aux efforts caractéristiques de la boxe : des pics d'intensité courts et explosifs (3-8 secondes, une combo rapide) suivis de phases de récupération active (déplacement, jeu de jambes) — pas un effort continu à intensité stable. Un circuit adapté alterne des séries courtes et intenses (shadow boxing à pleine vitesse, 10-15 s) avec de courtes récupérations actives (jeu de jambes léger, 10-15 s), répétées sur la durée d'un round complet.`,
            tab: null, bpm: null,
            success: `Chronomètre un round de 3 minutes en alternant 15 s d'intensité maximale et 15 s de récupération active : vérifie que tu tiens l'intensité maximale sur TOUTES les phases, pas seulement les premières.`,
            cards: [
              { front:`Différence entre cardio générique et cardio spécifique boxe`, back:`La boxe demande des pics explosifs courts, pas un effort continu stable` },
              { front:`Structure d'un circuit d'explosivité boxe`, back:`Alternance 10-15 s intensité maximale / 10-15 s récupération active` },
            ],
            pitfall: `S'entraîner uniquement en endurance continue (jogging) en pensant que ça suffit : ça ne prépare pas aux pics d'intensité répétés d'un vrai combat.`,
          },
          {
            id: 'bx_m7l2', title: 'La résistance mentale de fin de round',
            goal: `Maintenir la technique quand la fatigue pousse à la dégrader.`,
            theory: `Les dernières 30 secondes d'un round sont souvent celles où la garde descend le plus et où les erreurs techniques s'accumulent — la fatigue dégrade la forme avant la force. S'entraîner spécifiquement à maintenir une technique propre en fin de round (pas juste « tenir jusqu'au bout ») construit une résistance qui fait souvent la différence en compétition.`,
            tab: null, bpm: null,
            success: `Lors de ton prochain round de 3 minutes, concentre-toi spécifiquement sur le maintien de ta garde haute pendant les 30 dernières secondes — évalue honnêtement si elle était aussi haute qu'au début.`,
            cards: [
              { front:`Pourquoi les dernières secondes d'un round sont critiques ?`, back:`La fatigue y dégrade la garde et la technique en premier` },
              { front:`Que faut-il spécifiquement entraîner en fin de round ?`, back:`La forme (technique propre), pas seulement l'endurance` },
            ],
            pitfall: `Se concentrer uniquement sur « tenir » en fin de round sans surveiller sa technique : tenir avec une garde basse ne sert à rien si tu encaisses pendant que tu « tiens ».`,
          },
        ],
        fiche: {
          title: `Conditionnement spécifique boxe — l'essentiel`,
          intro: `S'entraîner comme on combat : par pics d'intensité, jusqu'à la dernière seconde du round.`,
          sections: [
            { h:`Circuit explosivité`, body:`Alterner 10-15 s d'intensité maximale et 10-15 s de récupération active, sur la durée d'un round.` },
            { h:`Fin de round`, body:`Entraîner spécifiquement le maintien de la garde et de la technique, pas juste « tenir ».` },
          ], diagram: null,
        },
      },

    ],
  },
};

window.MAESTRIA_COURSES = { COURSES };
