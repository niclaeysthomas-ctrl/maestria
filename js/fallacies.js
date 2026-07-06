/* ============================================================
   Maestria — Sophismes en action : la logique des erreurs de
   raisonnement, appliquée à de VRAIS types d'arguments politiques.
   Équilibre volontaire : les exemples ne ciblent jamais un seul
   bord — la leçon porte sur la structure logique, pas sur qui a
   raison. Distinct des biais cognitifs (biases.js — pièges
   perceptifs) : ici, des failles dans la STRUCTURE de l'argument.
   ============================================================ */

const LOGICAL_FALLACIES = [
  { id:'strawman', icon:'🎭', name:'Homme de paille',
    argument:`« Ceux qui proposent de mieux réguler la finance veulent en réalité abolir le marché libre et instaurer une économie totalement dirigée par l'État. »`,
    explanation:`On déforme une position modérée (réguler certains excès) en une position extrême que personne n'a défendue (abolir le marché libre). Il est facile de réfuter la caricature — mais la réfuter ne réfute en rien la vraie proposition, plus nuancée.` },

  { id:'slippery_slope', icon:'🛷', name:'Pente glissante',
    argument:`« Si on autorise la publicité pour les jeux d'argent en ligne, bientôt on autorisera la publicité pour n'importe quel produit dangereux, sans aucune limite. »`,
    explanation:`On affirme qu'une étape mènera inévitablement à un enchaînement extrême, sans démontrer le mécanisme qui relierait réellement les deux. Chaque étape suivante nécessite sa propre justification — l'enchaînement automatique n'est jamais garanti.` },

  { id:'ad_hominem', icon:'🎯', name:'Ad hominem',
    argument:`« Il ne faut pas écouter les arguments de cet économiste sur la dette publique : il a été condamné pour fraude fiscale il y a 10 ans. »`,
    explanation:`On attaque la personne (son passé, sa moralité) plutôt que d'examiner la validité de son raisonnement. Même une personne peu recommandable peut avoir un argument juste — la validité d'un argument ne dépend pas de qui le prononce.` },

  { id:'false_dilemma', icon:'⚔️', name:'Faux dilemme',
    argument:`« Soit on supprime toute réglementation environnementale pour libérer la croissance, soit on interdit purement et simplement toute industrie polluante. »`,
    explanation:`On ne présente que deux options extrêmes alors qu'il existe tout un spectre de politiques intermédiaires. Réduire un débat à deux pôles empêche d'examiner les positions nuancées qui se trouvent entre les deux.` },

  { id:'appeal_popularity', icon:'📊', name:'Appel à la popularité',
    argument:`« 70 % des sondés sont d'accord avec cette mesure, donc c'est la bonne politique à mener. »`,
    explanation:`La popularité d'une opinion ne prouve pas sa justesse. L'histoire regorge de mesures largement populaires en leur temps, reconnues bien plus tard comme des erreurs. Un argument se juge sur ses mérites, pas sur un sondage.` },

  { id:'appeal_authority', icon:'🎓', name:'Appel à l\'autorité (mal utilisé)',
    argument:`« Ce prix Nobel d'économie soutient cette réforme fiscale, donc elle est forcément la bonne décision. »`,
    explanation:`L'autorité d'un expert dans son domaine ne garantit pas qu'il ait raison sur CE point précis, surtout s'il est débattu entre spécialistes — ni que son avis technique suffise à trancher un choix qui engage aussi des valeurs, pas seulement de l'expertise.` },

  { id:'genetic', icon:'🧬', name:'Sophisme génétique',
    argument:`« Cette étude vient d'une organisation qui défend ouvertement une position sur ce sujet, donc ses conclusions sont forcément biaisées et fausses. »`,
    explanation:`L'origine d'une idée peut légitimement inviter à la vigilance, mais elle ne détermine pas à elle seule sa validité logique. Rejeter une conclusion uniquement à cause de sa source, sans examiner les données et le raisonnement, ne réfute rien.` },

  { id:'correlation', icon:'📈', name:'Corrélation n\'est pas causation',
    argument:`« Les pays qui dépensent le plus en éducation ont les meilleurs résultats économiques, donc dépenser plus en éducation garantit la croissance. »`,
    explanation:`Une corrélation entre deux variables ne prouve pas qu'une cause l'autre directement. Un troisième facteur (un pays déjà riche peut se permettre de dépenser plus ET avoir une croissance forte pour d'autres raisons) peut expliquer les deux à la fois.` },

  { id:'begging_question', icon:'🔄', name:'Pétition de principe',
    argument:`« Ce discours doit être censuré car il s'agit de propos dangereux qui, par définition, doivent être censurés. »`,
    explanation:`La conclusion (« doit être censuré ») est déjà contenue dans la prémisse (« propos dangereux qui doivent être censurés »). L'argument tourne en rond : il affirme sa conclusion au lieu de la démontrer par des raisons indépendantes.` },

  { id:'no_true_scotsman', icon:'🏴', name:'Le sophisme du « vrai » partisan',
    argument:`« Aucun vrai patriote ne critiquerait les choix de son pays à l'étranger — ceux qui le font ne sont pas de vrais patriotes. »`,
    explanation:`On redéfinit la catégorie après coup pour exclure les contre-exemples gênants. L'affirmation devient ainsi irréfutable par construction, plutôt que démontrée par une vraie preuve — un piège classique pour ne jamais avoir tort.` },
];

window.MAESTRIA_FALLACIES = { LOGICAL_FALLACIES };
