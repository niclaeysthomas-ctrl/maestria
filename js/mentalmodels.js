/* ============================================================
   Maestria — Bibliothèque de modèles mentaux.
   Des outils de pensée réutilisables, appliqués à ta vraie vie,
   pas juste mémorisés. Ajouter un modèle = ajouter un objet.
   ============================================================ */

const MENTAL_MODELS = [
  { id:'inversion', icon:'🔄', name:'Inversion', category:'Décision',
    description:`Au lieu de chercher directement comment réussir, demande-toi : « qu'est-ce qui garantirait l'échec ? » puis évite-le méthodiquement. Il est souvent plus facile de repérer la bêtise à ne pas faire que le génie à accomplir.`,
    example:`Charlie Munger : « Je veux juste savoir où je vais mourir, pour ne jamais y aller. » Plutôt que « comment être en bonne santé », il est parfois plus clair de lister « qu'est-ce qui me rendrait malade à coup sûr » (sédentarité, mauvais sommeil, stress chronique) et de l'éviter.`,
    prompt:`Prends une situation actuelle (ton stage, une relation, un projet). Au lieu de chercher comment réussir, liste 3 façons garanties d'échouer. Qu'est-ce que ça révèle que tu ne voyais pas en cherchant directement le succès ?` },

  { id:'opportunity_cost', icon:'⚖️', name:'Coût d\'opportunité', category:'Décision',
    description:`Chaque choix élimine toutes les autres options possibles au même moment. Le vrai coût d'une décision n'est pas seulement ce que tu dépenses : c'est la meilleure alternative à laquelle tu renonces.`,
    example:`Passer 3h à réviser une carte déjà maîtrisée a un coût caché : ces 3h auraient pu servir à un module jamais commencé, ou à une vraie candidature de stage. Le coût n'est pas dans l'action elle-même, il est dans ce qu'elle a remplacé.`,
    prompt:`Regarde ton emploi du temps de la semaine passée. Pour ton activité la plus chronophage, quelle était la meilleure alternative à laquelle tu as renoncé ? Le choix était-il le bon, avec le recul ?` },

  { id:'circle_of_competence', icon:'🎯', name:'Cercle de compétence', category:'Décision',
    description:`Connais les limites de ce que tu maîtrises réellement, et reste dedans pour les décisions importantes. Ce n'est pas la taille du cercle qui compte, c'est de connaître précisément ses bords.`,
    example:`Warren Buffett refuse d'investir dans des secteurs qu'il ne comprend pas en profondeur, même quand tout le monde s'y précipite. Il préfère un cercle petit mais connu avec précision, plutôt qu'un cercle flou et large.`,
    prompt:`Dans un domaine où tu as pris une décision récente (finance, santé, relation), étais-tu vraiment dans ton cercle de compétence, ou improvisais-tu en terrain inconnu sans le reconnaître ?` },

  { id:'confirmation_bias', icon:'🔍', name:'Biais de confirmation', category:'Pensée critique',
    description:`Ton cerveau cherche activement les informations qui confirment ce qu'il croit déjà, et minimise celles qui le contredisent. C'est automatique, invisible de l'intérieur, et ça touche tout le monde — y compris les gens intelligents, qui rationalisent souvent le mieux.`,
    example:`Tu penses qu'une action va monter : tu remarques chaque bonne nouvelle sur l'entreprise et minimises les signaux d'alerte. Le même mécanisme opère en politique, en amour, et dans tes croyances sur toi-même.`,
    prompt:`Prends une opinion que tu défends fermement. Cherche activement 2 arguments sérieux qui la contredisent (pas une version caricaturale, les meilleurs arguments adverses). Ton avis résiste-t-il ?` },

  { id:'map_territory', icon:'🗺️', name:'Carte ≠ territoire', category:'Pensée critique',
    description:`Toute théorie, modèle ou description n'est qu'une simplification de la réalité — jamais la réalité elle-même. Une carte utile omet des détails exprès ; le danger est d'oublier qu'elle en omet, et de confondre le résumé avec la chose réelle.`,
    example:`Un bilan comptable est une carte de la santé d'une entreprise, pas l'entreprise elle-même — il peut être incomplet ou ne pas capturer ce qui compte vraiment (le moral des équipes, un brevet en gestation). Confondre la carte et le territoire, c'est croire qu'un bon CV décrit vraiment quelqu'un.`,
    prompt:`Où utilises-tu une « carte » (un CV, une note, un chiffre, un résumé) en oubliant qu'elle simplifie une réalité plus riche ? Qu'est-ce qu'elle risque de te faire manquer ?` },

  { id:'occam', icon:'🪒', name:'Rasoir d\'Occam', category:'Pensée critique',
    description:`Face à plusieurs explications qui collent également bien aux faits, la plus simple (celle qui suppose le moins d'éléments) est généralement la plus probable. Ce n'est pas une preuve absolue, juste un bon point de départ avant de chercher plus compliqué.`,
    example:`Si un ami annule un rendez-vous sans donner de nouvelles, l'explication la plus simple (il a oublié, un imprévu) est plus probable qu'un complot contre toi. Le rasoir d'Occam ne dit pas que le simple est toujours vrai, juste qu'il faut l'écarter en premier.`,
    prompt:`Repense à une situation où tu as construit une explication compliquée (quelqu'un t'en veut, un plan caché). Quelle était l'explication la plus simple que tu as peut-être écartée trop vite ?` },

  { id:'incentives', icon:'🎣', name:'Incitations', category:'Systèmes',
    description:`« Montre-moi les incitations, je te montrerai le résultat » (Charlie Munger). Les gens et les systèmes suivent presque toujours ce qui est réellement récompensé, pas ce qui est officiellement souhaité.`,
    example:`Un vendeur payé à la commission sur le volume poussera des produits inadaptés — pas par malhonnêteté, mais parce que le système récompense le volume, pas la satisfaction client. Changer l'incitation change le comportement bien plus efficacement que changer les valeurs affichées.`,
    prompt:`Repère un comportement qui te semble absurde chez quelqu'un (un collègue, une administration). En regardant ce qui est VRAIMENT récompensé dans son système, est-ce que ça devient plus logique ?` },

  { id:'second_order', icon:'🌊', name:'Effets de second ordre', category:'Systèmes',
    description:`Une action a un effet immédiat visible (premier ordre), puis des conséquences qui en découlent, souvent moins visibles et parfois opposées à l'intention initiale. S'arrêter au premier ordre mène à des décisions qui se retournent contre soi.`,
    example:`Plafonner les loyers (1er ordre : logements plus abordables) peut réduire l'incitation à construire ou rénover (2e ordre : pénurie à long terme, qualité qui se dégrade). L'intention était bonne, l'effet final peut être l'inverse.`,
    prompt:`Prends une décision que tu envisages (une habitude, une règle que tu veux t'imposer). Quel est son effet de 2e ordre probable — la conséquence de la conséquence — que tu n'as peut-être pas encore anticipée ?` },

  { id:'regression_mean', icon:'📉', name:'Régression vers la moyenne', category:'Systèmes',
    description:`Après une performance exceptionnelle (très bonne ou très mauvaise), le résultat suivant tend naturellement à se rapprocher de la moyenne — pas parce que quelque chose a changé, mais parce que l'extrême contenait une part de hasard qui ne se répète pas.`,
    example:`Un élève qui réussit exceptionnellement bien un examen aura probablement un score plus proche de sa moyenne habituelle au suivant, sans que son niveau réel ait changé. Confondre ça avec un « relâchement » est une erreur classique.`,
    prompt:`Repense à une fois où tu as eu un résultat exceptionnellement bon ou mauvais. As-tu sur-interprété ce résultat comme ton nouveau niveau normal, plutôt que comme un pic statistique ?` },

  { id:'leverage', icon:'🔧', name:'Le levier', category:'Systèmes',
    description:`Dans tout système, certains points d'intervention produisent un effet minuscule pour un gros effort ; d'autres, un effet immense pour un effort minime. Trouver le petit changement à fort impact vaut mieux que de pousser fort au mauvais endroit.`,
    example:`Archimède : « Donnez-moi un point d'appui et je soulèverai le monde. » Corriger une habitude de sommeil peut améliorer ta concentration, ton humeur ET tes résultats simultanément — un vrai levier — plutôt que forcer 2h de révisions en plus chaque soir sans dormir assez.`,
    prompt:`Dans ta vie actuelle, quel serait LE petit changement (pas les 10 grands) qui aurait le plus d'effets en cascade sur le reste ? Qu'est-ce qui t'empêche de t'y attaquer en premier ?` },
];

window.MAESTRIA_MODELS = { MENTAL_MODELS };
