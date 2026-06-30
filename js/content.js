/* ============================================================
   Maestria — Bibliothèque de contenu (decks de cartes prêtes).
   Ces cartes alimentent le SRS Leitner existant (js/srs.js).
   Ajouter un deck = ajouter un objet dans DECKS. Rien d'autre.

   Format d'une carte : { key, front, back, hint? }
     key   : identifiant STABLE (sert à éviter les doublons à l'inscription)
     front : la question (ce que tu vois)
     back  : la réponse (ce qui se révèle)
   ============================================================ */

const DECKS = {

  /* ---------------- ARABE : alphabet complet ---------------- */
  arabe_alphabet: {
    id: 'arabe_alphabet', disciplineId: 'arabe', icon: '🔤',
    name: 'Alphabet arabe', desc: 'Les 28 lettres : nom + son. La base absolue.',
    lang: 'ar',  // audio disponible
    cards: [
      { key:'ar_01', front:'ا', back:'alif — son [a / â] long' },
      { key:'ar_02', front:'ب', back:'bā’ — [b]' },
      { key:'ar_03', front:'ت', back:'tā’ — [t]' },
      { key:'ar_04', front:'ث', back:'thā’ — [θ] (th doux, « think »)' },
      { key:'ar_05', front:'ج', back:'jīm — [dʒ] (dj)' },
      { key:'ar_06', front:'ح', back:'ḥā’ — [ħ] (h très soufflé, gorge)' },
      { key:'ar_07', front:'خ', back:'khā’ — [x] (kh, jota espagnole)' },
      { key:'ar_08', front:'د', back:'dāl — [d]' },
      { key:'ar_09', front:'ذ', back:'dhāl — [ð] (th sonore, « this »)' },
      { key:'ar_10', front:'ر', back:'rā’ — [r] roulé' },
      { key:'ar_11', front:'ز', back:'zāy — [z]' },
      { key:'ar_12', front:'س', back:'sīn — [s]' },
      { key:'ar_13', front:'ش', back:'shīn — [ʃ] (ch)' },
      { key:'ar_14', front:'ص', back:'ṣād — [s] emphatique (lourd)' },
      { key:'ar_15', front:'ض', back:'ḍād — [d] emphatique (lourd)' },
      { key:'ar_16', front:'ط', back:'ṭā’ — [t] emphatique (lourd)' },
      { key:'ar_17', front:'ظ', back:'ẓā’ — [ð] emphatique (lourd)' },
      { key:'ar_18', front:'ع', back:'‘ayn — [ʕ] son guttural (serrement de gorge)' },
      { key:'ar_19', front:'غ', back:'ghayn — [ɣ] (r grasseyé / gh)' },
      { key:'ar_20', front:'ف', back:'fā’ — [f]' },
      { key:'ar_21', front:'ق', back:'qāf — [q] (k profond, dans la gorge)' },
      { key:'ar_22', front:'ك', back:'kāf — [k]' },
      { key:'ar_23', front:'ل', back:'lām — [l]' },
      { key:'ar_24', front:'م', back:'mīm — [m]' },
      { key:'ar_25', front:'ن', back:'nūn — [n]' },
      { key:'ar_26', front:'ه', back:'hā’ — [h] (h soufflé léger)' },
      { key:'ar_27', front:'و', back:'wāw — [w] / [ou] long' },
      { key:'ar_28', front:'ي', back:'yā’ — [y] / [î] long' },
    ],
  },

  arabe_alphabet_reverse: {
    id: 'arabe_alphabet_reverse', disciplineId: 'arabe', icon: '🔤',
    name: 'Alphabet arabe — inversé', desc: 'Nom/description → trouver la lettre. L’inverse pour vraiment ancrer.',
    lang: 'ar',
    cards: [
      { key:'arr_01', front:'alif — son [a / â] long', back:'ا' },
      { key:'arr_02', front:'bā’ — [b]', back:'ب' },
      { key:'arr_03', front:'tā’ — [t]', back:'ت' },
      { key:'arr_04', front:'thā’ — [θ] (th doux, « think »)', back:'ث' },
      { key:'arr_05', front:'jīm — [dʒ] (dj)', back:'ج' },
      { key:'arr_06', front:'ḥā’ — [ħ] (h très soufflé, gorge)', back:'ح' },
      { key:'arr_07', front:'khā’ — [x] (kh, jota espagnole)', back:'خ' },
      { key:'arr_08', front:'dāl — [d]', back:'د' },
      { key:'arr_09', front:'dhāl — [ð] (th sonore, « this »)', back:'ذ' },
      { key:'arr_10', front:'rā’ — [r] roulé', back:'ر' },
      { key:'arr_11', front:'zāy — [z]', back:'ز' },
      { key:'arr_12', front:'sīn — [s]', back:'س' },
      { key:'arr_13', front:'shīn — [ʃ] (ch)', back:'ش' },
      { key:'arr_14', front:'ṣād — [s] emphatique (lourd)', back:'ص' },
      { key:'arr_15', front:'ḍād — [d] emphatique (lourd)', back:'ض' },
      { key:'arr_16', front:'ṭā’ — [t] emphatique (lourd)', back:'ط' },
      { key:'arr_17', front:'ẓā’ — [ð] emphatique (lourd)', back:'ظ' },
      { key:'arr_18', front:'‘ayn — [ʕ] son guttural (serrement de gorge)', back:'ع' },
      { key:'arr_19', front:'ghayn — [ɣ] (r grasseyé / gh)', back:'غ' },
      { key:'arr_20', front:'fā’ — [f]', back:'ف' },
      { key:'arr_21', front:'qāf — [q] (k profond, dans la gorge)', back:'ق' },
      { key:'arr_22', front:'kāf — [k]', back:'ك' },
      { key:'arr_23', front:'lām — [l]', back:'ل' },
      { key:'arr_24', front:'mīm — [m]', back:'م' },
      { key:'arr_25', front:'nūn — [n]', back:'ن' },
      { key:'arr_26', front:'hā’ — [h] (h soufflé léger)', back:'ه' },
      { key:'arr_27', front:'wāw — [w] / [ou] long', back:'و' },
      { key:'arr_28', front:'yā’ — [y] / [î] long', back:'ي' },
    ],
  },

  /* ---------------- ESPAGNOL : connecteurs & verbes utiles ---------------- */
  espagnol_base: {
    id: 'espagnol_base', disciplineId: 'espagnol', icon: '🇪🇸',
    name: 'Espagnol — fluidité', desc: 'Connecteurs et verbes qui font passer du scolaire au fluide.',
    cards: [
      { key:'es_01', front:'sin embargo', back:'cependant / néanmoins' },
      { key:'es_02', front:'por lo tanto', back:'par conséquent / donc' },
      { key:'es_03', front:'a pesar de', back:'malgré' },
      { key:'es_04', front:'aunque', back:'bien que / même si' },
      { key:'es_05', front:'de hecho', back:'en fait / de fait' },
      { key:'es_06', front:'en cuanto a', back:'quant à / en ce qui concerne' },
      { key:'es_07', front:'lograr (+ inf.)', back:'réussir à / parvenir à' },
      { key:'es_08', front:'soler (+ inf.)', back:'avoir l\'habitude de' },
      { key:'es_09', front:'echar de menos', back:'manquer (à qqn) — « extrañar »' },
      { key:'es_10', front:'darse cuenta de', back:'se rendre compte de' },
      { key:'es_11', front:'acabar de (+ inf.)', back:'venir de (faire qch)' },
      { key:'es_12', front:'ponerse a (+ inf.)', back:'se mettre à' },
      { key:'es_13', front:'a lo mejor', back:'peut-être (+ indicatif)' },
      { key:'es_14', front:'menos mal', back:'heureusement / encore heureux' },
      { key:'es_15', front:'tener ganas de', back:'avoir envie de' },
      { key:'es_16', front:'hacer falta', back:'être nécessaire / falloir' },
      { key:'es_17', front:'por cierto', back:'au fait / à propos' },
      { key:'es_18', front:'a medida que', back:'à mesure que' },
      { key:'es_19', front:'valer la pena', back:'valoir la peine' },
      { key:'es_20', front:'dar igual', back:'être égal / peu importe' },
    ],
  },

  espagnol_reverse: {
    id: 'espagnol_reverse', disciplineId: 'espagnol', icon: '🇪🇸',
    name: 'Espagnol — dans les deux sens', desc: 'Les mêmes connecteurs, inversés : français → espagnol.',
    cards: [
      { key:'esr_01', front:'cependant / néanmoins', back:'sin embargo' },
      { key:'esr_02', front:'par conséquent / donc', back:'por lo tanto' },
      { key:'esr_03', front:'malgré', back:'a pesar de' },
      { key:'esr_04', front:'bien que / même si', back:'aunque' },
      { key:'esr_05', front:'en fait / de fait', back:'de hecho' },
      { key:'esr_06', front:'quant à / en ce qui concerne', back:'en cuanto a' },
      { key:'esr_07', front:'réussir à / parvenir à', back:'lograr (+ inf.)' },
      { key:'esr_08', front:'avoir l\'habitude de', back:'soler (+ inf.)' },
      { key:'esr_09', front:'manquer (à qqn)', back:'echar de menos' },
      { key:'esr_10', front:'se rendre compte de', back:'darse cuenta de' },
      { key:'esr_11', front:'venir de (faire qch)', back:'acabar de (+ inf.)' },
      { key:'esr_12', front:'se mettre à', back:'ponerse a (+ inf.)' },
      { key:'esr_13', front:'peut-être', back:'a lo mejor' },
      { key:'esr_14', front:'heureusement / encore heureux', back:'menos mal' },
      { key:'esr_15', front:'avoir envie de', back:'tener ganas de' },
      { key:'esr_16', front:'être nécessaire / falloir', back:'hacer falta' },
      { key:'esr_17', front:'au fait / à propos', back:'por cierto' },
      { key:'esr_18', front:'à mesure que', back:'a medida que' },
      { key:'esr_19', front:'valoir la peine', back:'valer la pena' },
      { key:'esr_20', front:'être égal / peu importe', back:'dar igual' },
    ],
  },

  /* ---------------- FINANCE / COMPTA : notions pour le stage ---------------- */
  finance_base: {
    id: 'finance_base', disciplineId: 'economie', icon: '💹',
    name: 'Finance & compta — l\'essentiel', desc: 'Les notions qu\'un stagiaire doit savoir réexpliquer. Ta légitimité se gagne ici.',
    cards: [
      { key:'fi_01', front:'EBITDA', back:'Résultat avant intérêts, impôts, amortissements et provisions. Proxy de la rentabilité opérationnelle / génération de cash.' },
      { key:'fi_02', front:'BFR (Besoin en Fonds de Roulement)', back:'Stocks + créances clients − dettes fournisseurs. L\'argent immobilisé par le cycle d\'exploitation.' },
      { key:'fi_03', front:'Bilan : actif vs passif', back:'Actif = ce que l\'entreprise possède (emplois). Passif = comment c\'est financé (ressources : capitaux propres + dettes).' },
      { key:'fi_04', front:'Compte de résultat', back:'Flux sur une période : produits − charges = résultat net. Mesure la performance, pas le patrimoine.' },
      { key:'fi_05', front:'Amortissement', back:'Étalement comptable du coût d\'un actif sur sa durée d\'usage. Charge non décaissée.' },
      { key:'fi_06', front:'Free Cash Flow (FCF)', back:'Cash généré après investissements : Flux d\'exploitation − CAPEX. Ce qui revient réellement aux apporteurs de capitaux.' },
      { key:'fi_07', front:'WACC (CMPC)', back:'Coût Moyen Pondéré du Capital : coût des fonds propres et de la dette, pondéré. Taux d\'actualisation de référence.' },
      { key:'fi_08', front:'VAN (Valeur Actuelle Nette)', back:'Somme des flux futurs actualisés − investissement initial. VAN > 0 → projet créateur de valeur.' },
      { key:'fi_09', front:'TRI (Taux de Rentabilité Interne)', back:'Taux d\'actualisation qui annule la VAN. On le compare au coût du capital.' },
      { key:'fi_10', front:'Fonds de roulement (FR)', back:'Capitaux permanents − actif immobilisé. Marge de sécurité finançant le cycle d\'exploitation.' },
      { key:'fi_11', front:'Marge brute', back:'Chiffre d\'affaires − coût des biens vendus. Rentabilité avant charges de structure.' },
      { key:'fi_12', front:'Goodwill (écart d\'acquisition)', back:'Surprix payé lors d\'un rachat au-delà de l\'actif net réévalué. Inscrit à l\'actif, testé pour dépréciation.' },
      { key:'fi_13', front:'Gearing (levier financier)', back:'Dette nette / capitaux propres. Mesure la dépendance à l\'endettement.' },
      { key:'fi_14', front:'Provision', back:'Charge probable mais incertaine en montant/échéance (litige, risque). Principe de prudence.' },
      { key:'fi_15', front:'Capex vs Opex', back:'Capex = dépenses d\'investissement (immobilisées). Opex = dépenses d\'exploitation (charges de l\'exercice).' },
      { key:'fi_16', front:'ROE / ROCE', back:'ROE = résultat net / capitaux propres (vue actionnaire). ROCE = résultat opérationnel / capitaux employés (vue opérationnelle).' },
    ],
  },

};

/* ============================================================
   READINGS — corpus « Lecture du jour ».
   Textes ORIGINAUX (synthèses en propres mots, pas de reproduction).
   Un texte par jour (sélection par index de date dans app.js).
   Format : { id, theme, icon, title, source, body[], questions[{q,choices[],answer}], reflection }
   ============================================================ */
const READINGS = [
  {
    id: 'r_entropie', theme: 'Science', icon: '🔬', disciplineId: 'lettres',
    title: `Pourquoi le temps ne revient jamais en arrière`,
    source: `Thermodynamique — synthèse`,
    body: [
      `Une tasse qui tombe se brise en mille morceaux ; jamais tu n'as vu les éclats se rassembler d'eux-mêmes et la tasse remonter, intacte, sur la table. Pourtant, les lois fondamentales de la physique ne disent nulle part dans quel sens le temps doit couler : à l'échelle des particules, un film passé à l'envers reste tout aussi valide. D'où vient alors cette direction du temps qui nous paraît si évidente ?`,
      `La réponse tient en un mot : l'entropie, une mesure du désordre. Il existe une seule façon pour la tasse d'être intacte, mais des milliards de façons pour elle d'être brisée. Le désordre est simplement beaucoup plus probable que l'ordre. Un système livré à lui-même évolue donc presque toujours vers l'état le plus probable — le plus désordonné. C'est la deuxième loi de la thermodynamique.`,
      `Ce que nous appelons « le passé », c'est la direction où l'entropie était plus faible ; « le futur », celle où elle sera plus grande. La flèche du temps n'est pas inscrite dans les lois élémentaires : elle émerge des statistiques, du fait que l'univers a commencé dans un état extraordinairement ordonné et n'a cessé, depuis, de se défaire.`,
      `La conséquence est vertigineuse : ta mémoire, ton vieillissement, le fait que tu te souviennes d'hier et non de demain — tout cela existe parce que l'univers se désordonne. Vivre dans le temps, c'est surfer sur cette pente du désordre croissant.`,
    ],
    questions: [
      { q: `D'après le texte, pourquoi le temps semble-t-il avoir une direction ?`,
        choices: [`Parce que les lois de la physique l'imposent explicitement`, `Parce que le désordre est statistiquement bien plus probable que l'ordre`, `Parce que la mémoire humaine est imparfaite`], answer: 1 },
      { q: `Que dit la « deuxième loi de la thermodynamique » ici ?`,
        choices: [`Un système isolé tend vers l'état le plus désordonné`, `L'énergie se crée à partir de rien`, `Le temps peut s'inverser à l'échelle humaine`], answer: 0 },
    ],
    reflection: `La physique dit que tout va vers le désordre. Pourtant on passe sa vie à créer de l'ordre : apprendre, ranger, construire. En 3 lignes — est-ce un combat perdu d'avance, ou justement ce qui donne du prix à l'effort ?`,
  },
  {
    id: 'r_habitus', theme: 'Sociologie', icon: '🎭', disciplineId: 'lettres',
    title: `Pourquoi tes goûts ne sont pas (tout à fait) les tiens`,
    source: `Sociologie — autour de Pierre Bourdieu`,
    body: [
      `Tu crois choisir librement ta musique, tes plats, ta façon de parler ou de t'habiller. Le sociologue Pierre Bourdieu propose une idée dérangeante : une grande partie de ces goûts t'a été déposée très tôt, par ton milieu, sans que tu t'en aperçoives. Il appelle cela l'habitus.`,
      `L'habitus, c'est l'ensemble des réflexes, des manières et des préférences qu'on absorbe en grandissant dans un certain milieu social. Ce qui te semble « naturel » ou « de bon goût » correspond souvent à ce que ton groupe d'origine valorise. Deux personnes peuvent regarder le même tableau : l'une y voit un chef-d'œuvre, l'autre une tache — et cette différence raconte surtout leurs histoires sociales respectives.`,
      `L'idée a un tranchant politique. Si les goûts et les codes sont socialement distribués, alors l'école et les concours ne mesurent pas que le « mérite » brut : ils récompensent aussi ceux qui maîtrisent déjà, par leur naissance, les bons codes. Le sentiment d'être « à sa place » — ou « illégitime » — n'est pas qu'une affaire de caractère ; il a des racines sociales.`,
      `Mais Bourdieu ne dit pas qu'on est prisonnier. Comprendre son habitus, c'est commencer à pouvoir en jouer : repérer les codes qu'on ne maîtrise pas encore, les apprendre, et cesser de confondre « je ne connais pas » avec « je ne suis pas fait pour ça ».`,
    ],
    questions: [
      { q: `Qu'est-ce que l'habitus selon le texte ?`,
        choices: [`Un trait de personnalité inné`, `L'ensemble des goûts et réflexes hérités de son milieu social`, `Une méthode pour réussir les concours`], answer: 1 },
      { q: `Quelle est la portée politique de cette idée ?`,
        choices: [`Le mérite scolaire récompense aussi la maîtrise de codes sociaux hérités`, `Les goûts sont strictement individuels`, `L'école est parfaitement neutre socialement`], answer: 0 },
    ],
    reflection: `« Je ne connais pas encore » contre « je ne suis pas fait pour ça ». En 3 lignes — repère un domaine où tu confonds peut-être les deux. Qu'est-ce qui change si ce n'est qu'un code à apprendre ?`,
  },
  {
    id: 'r_berlin', theme: 'Philosophie politique', icon: '⚖️', disciplineId: 'lettres',
    title: `Être libre : qu'on te laisse tranquille, ou qu'on te donne les moyens ?`,
    source: `Philosophie politique — autour d'Isaiah Berlin`,
    body: [
      `« Liberté » est un mot que tout le monde brandit — mais pour dire deux choses très différentes. Le philosophe Isaiah Berlin a proposé de les distinguer : la liberté négative et la liberté positive.`,
      `La liberté négative, c'est l'absence d'entrave : tu es libre dans la mesure où personne ne t'empêche d'agir. Pas de barrières, pas d'interdictions, pas de contrainte. L'État y est un gardien minimal : qu'il te fiche la paix, et tu es libre.`,
      `La liberté positive, c'est la capacité réelle d'agir : être libre, ce n'est pas seulement « avoir le droit de », c'est « avoir les moyens de ». À quoi sert le droit de voyager sans un sou, ou le droit d'étudier si personne ne t'a appris à lire ? Ici l'État peut jouer un rôle actif — éducation, santé, redistribution — pour rendre la liberté effective et pas seulement écrite.`,
      `Presque tout le débat politique moderne se loge dans cette tension. On insiste à droite sur la liberté négative (qu'on me laisse tranquille), à gauche sur la liberté positive (donnez à chacun les moyens). Mais Berlin avertissait : la liberté positive, poussée trop loin, peut servir à justifier qu'on « force les gens à être libres » selon ce qu'un pouvoir décide bon pour eux.`,
    ],
    questions: [
      { q: `Quelle est la différence entre liberté négative et positive ?`,
        choices: [`La négative est l'absence d'entrave ; la positive est la capacité réelle d'agir`, `La négative est mauvaise, la positive est bonne`, `Elles désignent la même chose`], answer: 0 },
      { q: `Quel risque Berlin voyait-il dans la liberté positive poussée à l'extrême ?`,
        choices: [`Qu'elle rende les gens trop riches`, `Qu'elle serve à « forcer les gens à être libres » selon ce qu'un pouvoir décide`, `Qu'elle supprime toute éducation`], answer: 1 },
    ],
    reflection: `Pour toi, l'État doit-il surtout te laisser tranquille (liberté négative) ou te donner des moyens réels d'agir (liberté positive) ? Prends position en 3 lignes, avec un exemple concret.`,
  },
  {
    id: 'r_akerlof', theme: 'Économie', icon: '💹', disciplineId: 'lettres',
    title: `Pourquoi un bon produit peut être chassé par un mauvais`,
    source: `Économie — autour de George Akerlof`,
    body: [
      `Imagine un marché de voitures d'occasion. Le vendeur connaît l'état réel de sa voiture ; l'acheteur, lui, ne peut pas le savoir avant d'acheter. Cette différence de savoir entre les deux parties s'appelle une asymétrie d'information — et l'économiste George Akerlof a montré qu'elle peut détruire un marché entier.`,
      `Le raisonnement est implacable. Comme l'acheteur ne distingue pas une bonne voiture d'une épave, il refuse de payer le prix d'une bonne : il propose un prix moyen, prudent. Mais à ce prix moyen, les vendeurs de bonnes voitures ne veulent plus vendre — c'est trop peu. Ils se retirent. Ne restent que les mauvaises. Le prix baisse encore, ce qui chasse les voitures honnêtes suivantes, et ainsi de suite.`,
      `C'est le paradoxe : la mauvaise qualité chasse la bonne, non parce qu'elle est meilleure, mais parce que l'information manque. Akerlof appelait ça « le marché des tacots ». Le même mécanisme menace l'assurance (les plus malades veulent le plus s'assurer), le crédit, ou même le recrutement.`,
      `La leçon est large : un marché ne fonctionne bien que si la confiance et l'information circulent. D'où l'utilité des garanties, des diplômes, des labels, des avis vérifiés, des audits — tous ces dispositifs servent à réduire l'asymétrie et à empêcher que le pire chasse le meilleur.`,
    ],
    questions: [
      { q: `Qu'est-ce qu'une asymétrie d'information ?`,
        choices: [`Quand les deux parties savent tout`, `Quand une partie en sait plus que l'autre sur le bien échangé`, `Quand le prix est trop élevé`], answer: 1 },
      { q: `Pourquoi « la mauvaise qualité chasse la bonne » sur ce marché ?`,
        choices: [`Parce que les bons produits, mal payés faute d'information, se retirent`, `Parce que les acheteurs préfèrent la mauvaise qualité`, `Parce que l'État fixe les prix`], answer: 0 },
    ],
    reflection: `Cite un dispositif de ta vie (diplôme, avis en ligne, garantie…) qui sert à réduire une asymétrie d'information. En 3 lignes — à qui profite-t-il vraiment ?`,
  },
  {
    id: 'r_sisyphe', theme: 'Philosophie', icon: '🪨', disciplineId: 'lettres',
    title: `Rouler son rocher : la révolte plutôt que le renoncement`,
    source: `Philosophie — autour d'Albert Camus`,
    body: [
      `Le mythe raconte que les dieux condamnèrent Sisyphe à pousser éternellement un rocher en haut d'une montagne, d'où il redescend aussitôt. Une peine parfaite : un effort sans fin et sans résultat. Albert Camus a fait de cette image le symbole de notre condition, et il en a tiré une conclusion inattendue.`,
      `Camus part d'un constat qu'il nomme l'absurde : nous réclamons du sens, un pourquoi, et le monde nous répond par le silence. Face à cela, deux fausses sorties : se mentir en se fabriquant des certitudes confortables, ou abandonner. Camus refuse les deux.`,
      `Sa réponse est la révolte lucide : continuer à pousser le rocher en sachant qu'il redescendra, mais sans se résigner et sans s'illusionner. Le sens ne vient pas d'une récompense au sommet ; il vient de la manière dont on assume l'effort lui-même, les yeux ouverts. Ce n'est pas le résultat qui sauve, c'est la conscience qu'on y met.`,
      `D'où sa formule, paradoxale et célèbre : il faut imaginer Sisyphe heureux. Non parce que sa tâche aurait un but caché, mais parce qu'en l'assumant pleinement, il cesse d'être une victime. Appliqué à une vie ordinaire — révisions, entraînements, journées qui se ressemblent — le message est net : la dignité n'est pas dans l'arrivée, elle est dans la façon de marcher.`,
    ],
    questions: [
      { q: `Qu'appelle-t-on « l'absurde » chez Camus ?`,
        choices: [`Le décalage entre notre besoin de sens et le silence du monde`, `Une situation comique`, `Le fait que le rocher soit lourd`], answer: 0 },
      { q: `Où se trouve le sens, selon ce texte ?`,
        choices: [`Dans la récompense au sommet`, `Dans la manière d'assumer l'effort, les yeux ouverts`, `Dans l'abandon de la tâche`], answer: 1 },
    ],
    reflection: `Pense à une tâche qui te paraît répétitive ou sans récompense immédiate (réviser, t'entraîner…). En 3 lignes — qu'est-ce qui change si la dignité est dans la façon de la faire, pas dans le résultat ?`,
  },
  {
    id: 'r_popper', theme: 'Philosophie politique', icon: '🛡️', disciplineId: 'lettres',
    title: `Une société tolérante doit-elle tolérer ses ennemis ?`,
    source: `Philosophie politique — autour de Karl Popper`,
    body: [
      `Voici une énigme qui divise encore les démocraties. Une société qui défend la tolérance doit-elle tolérer ceux qui veulent la détruire ? Le philosophe Karl Popper a nommé cela le paradoxe de la tolérance.`,
      `Son argument : si une société est tolérante sans aucune limite, y compris envers les mouvements qui veulent supprimer la tolérance elle-même, alors les intolérants finiront par l'emporter — et la tolérance disparaîtra avec eux. Une tolérance absolue se détruit donc elle-même.`,
      `Popper en tire une conclusion mesurée, souvent mal citée. Il ne dit pas qu'il faut interdire toute opinion choquante : tant qu'on peut répondre par l'argument et la raison, on doit le faire. Mais il défend le droit d'une société à se protéger des mouvements qui refusent le débat et prônent la violence pour imposer leur vue.`,
      `Le paradoxe reste brûlant, car la frontière est dangereuse à tracer : qui décide de ce qui est « intolérable » ? Trop large, la limite devient une arme contre la simple dissidence ; trop étroite, elle laisse prospérer les ennemis de la liberté. Toute démocratie vit dans cet inconfort.`,
    ],
    questions: [
      { q: `En quoi consiste le paradoxe de la tolérance ?`,
        choices: [`Une tolérance sans limite peut être détruite par les intolérants qu'elle protège`, `La tolérance est toujours mauvaise`, `Il faut tout interdire`], answer: 0 },
      { q: `Quelle est la position nuancée de Popper ?`,
        choices: [`Interdire toute opinion choquante`, `Répondre par l'argument tant que possible, mais pouvoir se protéger de ceux qui refusent le débat et prônent la violence`, `Tolérer absolument tout`], answer: 1 },
    ],
    reflection: `Où placerais-tu la limite entre une opinion qu'il faut supporter (même choquante) et un mouvement dont une démocratie a le droit de se protéger ? 3 lignes, ton critère.`,
  },
];

window.MAESTRIA_CONTENT = { DECKS, READINGS };
