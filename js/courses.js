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
