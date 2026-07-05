/* ============================================================
   Maestria — Catalogue de biais cognitifs + journal personnel.
   Différent des modèles mentaux (des outils pour PENSER) : ici,
   des pièges à repérer quand on se prend soi-même en flagrant délit.
   ============================================================ */

const COGNITIVE_BIASES = [
  { id:'anchoring', icon:'⚓', name:'Biais d\'ancrage',
    description:`La première information reçue sert de référence (« ancre ») pour tous les jugements suivants, même si elle est arbitraire ou non pertinente.`,
    howToSpot:`Demande-toi : « Est-ce que je juge ce chiffre ou cette idée sur sa valeur réelle, ou par rapport au premier nombre que j'ai vu ? »`,
    example:`Un vêtement affiché « 200 € barré, 90 € » te semble être une bonne affaire — même si sa vraie valeur est 60 €. Le « 200 € » a ancré ton jugement.` },

  { id:'loss_aversion', icon:'📉', name:'Aversion à la perte',
    description:`Perdre 100 € fait psychologiquement plus mal que gagner 100 € ne fait plaisir (environ deux fois plus, selon Kahneman et Tversky). Ça pousse à des décisions irrationnelles pour éviter une perte plutôt qu'à rechercher un gain équivalent.`,
    howToSpot:`Demande-toi si tu refuses un changement surtout par peur de perdre ce que tu as, plus que par un vrai calcul de ce que tu gagnerais.`,
    example:`Garder une action en perte « pour ne pas matérialiser la perte », alors que le bon calcul serait de vendre et réinvestir ailleurs si les perspectives sont meilleures.` },

  { id:'availability', icon:'💭', name:'Biais de disponibilité',
    description:`On surestime la probabilité d'un événement s'il vient facilement à l'esprit (récent, marquant, médiatisé), plutôt que sur sa fréquence réelle.`,
    howToSpot:`Si ton estimation d'un risque vient d'un exemple frappant plutôt que de statistiques, méfie-toi.`,
    example:`Après un crash d'avion médiatisé, on surestime le risque de l'avion (statistiquement bien plus sûr que la voiture) parce que l'image est plus disponible en mémoire.` },

  { id:'halo_effect', icon:'😇', name:'Effet de halo',
    description:`Une impression positive (ou négative) sur UN trait déteint sur le jugement de TOUS les autres traits d'une personne ou d'une chose.`,
    howToSpot:`Si tu juges la compétence de quelqu'un sur sa seule apparence, sa voix, ou un seul succès passé, tu es probablement sous l'effet de halo.`,
    example:`Un candidat charismatique en entretien est perçu comme « sûrement compétent techniquement » — alors que rien ne le prouve, c'est juste le charisme qui déteint.` },

  { id:'survivorship', icon:'✈️', name:'Biais du survivant',
    description:`On tire des conclusions en n'observant que les « survivants » (ceux qui ont réussi), en oubliant tous ceux qui ont échoué et ont disparu des statistiques.`,
    howToSpot:`Demande-toi : « Est-ce que je regarde seulement les succès, ou aussi tous ceux qui ont tenté et échoué — et qui sont invisibles ? »`,
    example:`Pendant la Seconde Guerre mondiale, on voulait blinder les avions là où les avions REVENUS étaient touchés — alors qu'il fallait blinder là où les avions ABATTUS (invisibles dans les stats) l'étaient.` },

  { id:'overconfidence', icon:'🎯', name:'Excès de confiance',
    description:`On surestime systématiquement la précision de ses propres jugements et prédictions. C'est exactement ce que l'écran Calibration de cette app mesure chez toi.`,
    howToSpot:`Va voir ton écran Calibration : si tu es souvent « surconfiant » sur tes exercices, ce biais est actif chez toi en ce moment précis.`,
    example:`Environ 90 % des conducteurs se pensent meilleurs que la moyenne — statistiquement impossible.` },

  { id:'hindsight', icon:'🔮', name:'Biais rétrospectif',
    description:`Une fois qu'un événement s'est produit, on a l'impression qu'il était « prévisible depuis le début » — alors qu'on ne l'avait pas vraiment vu venir avant.`,
    howToSpot:`Si tu te dis « je le savais » après coup, demande-toi honnêtement si tu l'avais vraiment dit AVANT, ou si c'est une reconstruction.`,
    example:`Après une crise financière, « tout le monde savait que ça allait arriver » — alors que très peu de gens l'avaient réellement prédit à l'avance.` },

  { id:'sunk_cost', icon:'🕳️', name:'Coûts irrécupérables',
    description:`Continuer un projet ou une relation à cause de ce qu'on y a déjà investi (temps, argent, énergie), plutôt que sur la base de ce qu'il reste vraiment à gagner à l'avenir.`,
    howToSpot:`Demande-toi : « Si je commençais aujourd'hui, avec zéro investi jusqu'ici, referais-je ce choix ? »`,
    example:`Finir un film ennuyeux « parce qu'on l'a déjà commencé » — le temps déjà passé ne reviendra pas, qu'on continue ou pas.` },

  { id:'negativity', icon:'⚫', name:'Biais de négativité',
    description:`Les informations négatives ont un poids psychologique plus fort que les informations positives équivalentes ; on retient souvent mieux une critique que dix compliments.`,
    howToSpot:`Repère si un seul commentaire négatif efface mentalement plusieurs retours positifs reçus la même journée.`,
    example:`Recevoir 9 retours positifs et 1 négatif sur un travail, et ne penser qu'au négatif toute la soirée.` },

  { id:'dunning_kruger', icon:'📈', name:'Effet Dunning-Kruger',
    description:`Les débutants dans un domaine surestiment souvent leur compétence (ils ne savent pas encore ce qu'ils ne savent pas) ; les vrais experts, à l'inverse, sous-estiment parfois la leur.`,
    howToSpot:`Si tu te sens « déjà bon » très vite dans un nouveau domaine, c'est peut-être le signal que tu ne vois pas encore l'étendue de ce qu'il te reste à apprendre.`,
    example:`Après 2 leçons de guitare, on se sent « presque prêt » pour un concert ; après 10 ans, on est bien plus humble sur ses limites.` },
];

window.MAESTRIA_BIASES = { COGNITIVE_BIASES };
