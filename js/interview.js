/* ============================================================
   Maestria — Simulateur d'entretien (stage finance).
   Pas de "solution" unique pour les questions comportementales :
   un "tip" de structure, pas une réponse à réciter.
   ============================================================ */

const INTERVIEW_QUESTIONS = {
  technique: [
    { id:'iq1', q:`Explique-moi la différence entre EBITDA et résultat net.`,
      tip:`EBITDA = performance opérationnelle pure (avant amortissements, intérêts, impôts). Résultat net = après TOUT, y compris la dette et la fiscalité. Deux entreprises au même EBITDA peuvent avoir des résultats nets très différents selon leur endettement.` },
    { id:'iq2', q:`Comment calculerais-tu la valeur d'une entreprise avec un DCF ? Explique les grandes étapes.`,
      tip:`1) Projette les flux de trésorerie futurs (5-10 ans). 2) Calcule une valeur terminale au-delà. 3) Actualise le tout au coût du capital (WACC) pour ramener à une valeur aujourd'hui. Insiste sur le fait que le résultat est très sensible aux hypothèses de croissance et de taux.` },
    { id:'iq3', q:`Qu'est-ce que le BFR et pourquoi une entreprise en forte croissance peut-elle manquer de cash malgré de bons résultats ?`,
      tip:`BFR = Stocks + Créances clients − Dettes fournisseurs. En forte croissance, stocks et créances gonflent plus vite que les dettes fournisseurs → le BFR augmente → il « mange » du cash même si le résultat est bon.` },
    { id:'iq4', q:`Pitch-moi une action que tu suivrais, en 2 minutes.`,
      tip:`Structure : (1) l'entreprise et son modèle en 1 phrase, (2) la thèse d'investissement (pourquoi elle va créer de la valeur), (3) le principal risque. Reste concret et chiffré si possible.` },
    { id:'iq5', q:`Quelle est la différence entre financement par dette et par capital (equity) ? Quel est l'arbitrage principal ?`,
      tip:`Dette : pas de dilution, mais remboursement obligatoire + intérêts + risque financier accru. Equity : dilue les actionnaires existants, mais pas d'obligation de remboursement fixe. L'arbitrage central : risque vs dilution.` },
    { id:'iq6', q:`Comment expliquerais-tu un ratio dette nette/EBITDA élevé à un client inquiet ?`,
      tip:`Contextualise : le seuil de vigilance classique est ~3-4×. Au-delà, regarde la capacité de génération de cash et l'échéancier de la dette, pas juste le ratio brut — un ratio élevé n'est pas automatiquement dangereux si les flux sont stables et prévisibles.` },
    { id:'iq7b', q:`Quelle est la différence entre un multiple EV/EBITDA et un P/E (price-to-earnings) ?`,
      tip:`EV/EBITDA rapporte la valeur d'entreprise (dette incluse) à la performance opérationnelle — indépendant de la structure de capital. Le P/E rapporte le cours de bourse au bénéfice net PAR ACTION — donc sensible à l'endettement et à la fiscalité. EV/EBITDA permet de comparer des entreprises à endettement différent, le P/E non.` },
  ],
  comportement: [
    { id:'iq7', q:`Parle-moi de toi.`,
      tip:`Structure en 3 parties : parcours (bref), compétences clés liées au poste, motivation pour CE stage précis. 90 secondes maximum — ne raconte pas toute ta vie.` },
    { id:'iq8', q:`Pourquoi ce stage, pourquoi cette entreprise ?`,
      tip:`Montre que tu as fait tes recherches sur l'entreprise précisément (pas un discours générique copiable pour n'importe quelle boîte). Relie un vrai élément de leur activité à ta motivation.` },
    { id:'iq9', q:`Raconte-moi un échec et ce que tu en as tiré.`,
      tip:`Choisis un VRAI échec (pas un faux échec déguisé en qualité). Structure : le contexte, ce qui a mal tourné, ce que tu as appris et changé concrètement depuis.` },
    { id:'iq10', q:`Où te vois-tu dans 5 ans ?`,
      tip:`Reste crédible et cohérent avec le poste — ni trop vague ("je ne sais pas"), ni trop précis et déconnecté (un poste que ce stage ne prépare pas du tout).` },
    { id:'iq11', q:`Décris une situation où tu as dû convaincre quelqu'un.`,
      tip:`Structure STAR : Situation, Tâche, Action (ce que TOI as fait précisément), Résultat (concret, si possible chiffré).` },
    { id:'iq12', q:`As-tu des questions pour nous ?`,
      tip:`Ne dis jamais « non ». Prépare 2-3 questions précises et non-génériques (sur l'équipe, un projet récent, ce qui fait réussir quelqu'un dans ce poste) — ça montre un vrai intérêt, pas une question de forme.` },
  ],
};

window.MAESTRIA_INTERVIEW = { INTERVIEW_QUESTIONS };
