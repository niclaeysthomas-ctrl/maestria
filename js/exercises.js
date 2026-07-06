/* ============================================================
   Maestria — Banque d'exercices (construire réflexes & intuition).
   Différent des cartes SRS (rappel binaire) : ici, note en 4 paliers
   de qualité (Faux/Approximatif/Bien/Parfait), avec ou sans calcul.
   Ajouter un exercice = ajouter un objet dans EXERCISES[disciplineId].
   ============================================================ */

const EXERCISES = {
  economie: [
    { id:'fi_ex1', calc:true,
      prompt:`Une entreprise a un CA de 200 000 € et des charges d'exploitation de 150 000 €. Calcule son EBITDA.`,
      solution:`EBITDA = CA − Charges d'exploitation = 200 000 − 150 000 = 50 000 €.` },
    { id:'fi_ex2', calc:true,
      prompt:`EBITDA de 50 000 €, amortissements de 8 000 €. Calcule le résultat d'exploitation (EBIT).`,
      solution:`EBIT = EBITDA − Amortissements = 50 000 − 8 000 = 42 000 €.` },
    { id:'fi_ex3', calc:true,
      prompt:`Résultat net de 24 000 €, capitaux propres de 200 000 €. Calcule le ROE.`,
      solution:`ROE = Résultat net / Capitaux propres = 24 000 / 200 000 = 12 %.` },
    { id:'fi_ex4', calc:true,
      prompt:`Actif courant de 80 000 €, passif courant de 50 000 €. Calcule le ratio courant et dis s'il est confortable.`,
      solution:`Ratio courant = 80 000 / 50 000 = 1,6. C'est confortable (>1) : l'entreprise couvre largement son passif court terme.` },
    { id:'fi_ex5', calc:true,
      prompt:`Stocks de 30 000 €, créances clients de 40 000 €, dettes fournisseurs de 35 000 €. Calcule le BFR.`,
      solution:`BFR = Stocks + Créances clients − Dettes fournisseurs = 30 000 + 40 000 − 35 000 = 35 000 €.` },
    { id:'fi_ex6', calc:false,
      prompt:`Une entreprise a un bon résultat net mais sa trésorerie s'assèche. Quelle est l'explication la plus probable ?`,
      solution:`Le résultat n'est pas le cash : probablement un BFR qui grimpe (stocks/créances qui gonflent avec la croissance) ou de forts investissements (capex), invisibles dans le résultat net mais qui pompent la trésorerie.` },
    { id:'fi_ex7', calc:true,
      prompt:`Dette nette de 400 000 €, EBITDA de 120 000 €. Calcule le ratio Dette nette/EBITDA et dis si l'endettement est sain.`,
      solution:`400 000 / 120 000 ≈ 3,33×. C'est à la limite de la zone de vigilance (le seuil inquiétant est souvent autour de 3‑4×) : à surveiller, pas encore alarmant.` },
    { id:'fi_ex8', calc:false,
      prompt:`Pourquoi ne devrait-on jamais comparer la marge nette d'un supermarché et d'un éditeur de logiciels ?`,
      solution:`Leurs structures de coûts diffèrent radicalement par secteur (gros volumes/marges fines ~2 % pour un supermarché, peu de coûts marginaux/marges élevées ~30 % pour un logiciel). On compare toujours à des pairs du même secteur, jamais entre secteurs.` },
    { id:'fi_ex9', calc:true,
      prompt:`CA de 1 200 000 €, EBITDA de 180 000 €. Calcule la marge d'EBITDA.`,
      solution:`Marge d'EBITDA = EBITDA / CA = 180 000 / 1 200 000 = 15 %.` },
    { id:'fi_ex10', calc:false,
      prompt:`Une startup hésite entre lever des fonds en dette ou en capital (equity). Quel est l'arbitrage principal ?`,
      solution:`La dette ne dilue pas les fondateurs mais doit être remboursée avec intérêts (risque financier accru). L'equity dilue le capital mais n'impose pas de remboursement fixe. L'arbitrage central est risque vs dilution.` },
    { id:'fi_ex11', calc:true,
      prompt:`Une entreprise vaut 50 M€ en valeur d'entreprise (EV) et génère un EBITDA de 10 M€. Calcule le multiple EV/EBITDA et dis si c'est cher ou bon marché pour un secteur qui se négocie habituellement à 6-8×.`,
      solution:`EV/EBITDA = 50 / 10 = 5×. C'est en dessous de la fourchette sectorielle (6-8×) : soit une bonne affaire, soit le marché anticipe une croissance ou une qualité inférieure — à creuser avant de conclure.` },
    { id:'fi_ex12', calc:false,
      prompt:`Une entreprise annonce un rachat d'actions (buyback) plutôt qu'un dividende. Quel est l'effet principal pour ses actionnaires restants ?`,
      solution:`Le rachat réduit le nombre d'actions en circulation : mécaniquement, le bénéfice par action (BPA) et la part de propriété de chaque actionnaire restant augmentent, sans distribution de cash immédiatement imposable comme un dividende.` },
  ],
  espagnol: [
    { id:'es_ex1', calc:false,
      prompt:`Conjugue « aprender » (apprendre) à la 3e personne du pluriel, au présent.`,
      solution:`Aprenden. (verbe en -ER : terminaison -en pour « ellos/ellas »)` },
    { id:'es_ex2', calc:false,
      prompt:`Complète avec le bon verbe (ser/estar) : « Mi hermano ___ médico, pero hoy ___ enfermo. »`,
      solution:`Mi hermano ES médico (profession → SER), pero hoy ESTÁ enfermo (état passager → ESTAR).` },
    { id:'es_ex3', calc:false,
      prompt:`Traduis « Le café est délicieux » en utilisant le bon verbe « être ».`,
      solution:`El café ESTÁ rico. (« rico » = délicieux dans ce sens précis, avec ESTAR — un des adjectifs à double sens vus en cours)` },
    { id:'es_ex4', calc:false,
      prompt:`Donne le bon article (el/la) pour : mano, problema, ciudad.`,
      solution:`LA mano (exception féminine malgré le -o), EL problema (exception masculine malgré le -a), LA ciudad (-dad est toujours féminin).` },
    { id:'es_ex5', calc:false,
      prompt:`Conjugue « vivir » (vivre) à la 1ère personne du singulier, puis à « nosotros », au présent.`,
      solution:`Vivo (yo) / Vivimos (nosotros).` },
    { id:'es_ex6', calc:false,
      prompt:`Traduis : « Bien qu'il pleuve peut-être demain, je sortirai. » (le fait est incertain — utilise le subjonctif)`,
      solution:`Aunque llueva mañana, saldré. — « Aunque » + subjonctif (llueva) car le fait est présenté comme incertain/hypothétique, pas encore avéré.` },
  ],
};

const QUALITY_LEVELS = [
  { v:0, label:'❌ Faux',         xp:0 },
  { v:1, label:'🤔 Approximatif', xp:2 },
  { v:2, label:'🙂 Bien',         xp:5 },
  { v:3, label:'🎯 Parfait',      xp:8 },
];

window.MAESTRIA_EXERCISES = { EXERCISES, QUALITY_LEVELS };
