/* ============================================================
   Maestria — Grands Débats : dossiers à deux voix sur de vraies
   controverses. Pour CHAQUE sujet, le meilleur argumentaire POUR
   et le meilleur argumentaire CONTRE, appuyés sur de vrais courants
   de recherche/débats académiques. Aucun parti pris : à toi de juger.
   ============================================================ */

const DEBATES = [
  { id:'d1', icon:'🎓', theme:'Société',
    topic:`La discrimination positive dans l'enseignement supérieur`,
    question:`Faut-il des critères de discrimination positive pour l'accès aux grandes écoles et universités ?`,
    forCase: [
      `Les inégalités d'accès à l'enseignement supérieur ne partent pas de zéro : le capital culturel et les réseaux hérités du milieu d'origine (cf. les travaux de Pierre Bourdieu sur la reproduction sociale) favorisent mécaniquement certains candidats avant même le concours. Sans correction, le « mérite » mesuré au concours reflète autant l'origine sociale que le talent.`,
      `Des travaux sur la diversité dans les groupes de décision (notamment ceux du chercheur Scott Page) montrent que des collectifs diversifiés résolvent souvent mieux des problèmes complexes que des groupes homogènes, même très qualifiés individuellement — un argument économique, pas seulement moral.`,
      `Sans intervention active, les positions dominantes ont tendance à se reproduire à l'identique génération après génération : la discrimination positive vise à casser ce cercle plutôt qu'à attendre qu'il se corrige de lui-même.`,
    ],
    againstCase: [
      `La « théorie du mismatch » défendue par le chercheur Richard Sander (à partir d'études sur les facultés de droit américaines) avance que placer un étudiant dans un établissement où il est statistiquement en difficulté par rapport à ses pairs peut lui nuire — désorientation, échec, perte de confiance — plutôt que l'aider.`,
      `Juger un individu selon une catégorie de groupe plutôt que sa situation personnelle réelle peut être moins juste et moins précis qu'un critère strictement socio-économique (bourse, zone géographique, revenu familial), qui viserait le désavantage réel sans présumer de l'appartenance à un groupe.`,
      `Le dispositif peut stigmatiser ses propres bénéficiaires : le doute sur la légitimité de leur réussite (« l'a-t-il eu au mérite ou au quota ? ») peut peser sur eux, y compris dans leur propre regard sur eux-mêmes.`,
    ] },

  { id:'d2', icon:'💰', theme:'Économie',
    topic:`Le salaire minimum`,
    question:`Faut-il augmenter fortement le salaire minimum ?`,
    forCase: [
      `L'étude désormais classique de David Card et Alan Krueger (1994), comparant les restaurants rapides du New Jersey et de Pennsylvanie après une hausse du salaire minimum, n'a trouvé aucune baisse de l'emploi — remettant en question le modèle manuel selon lequel un salaire minimum plus haut détruit mécaniquement des emplois.`,
      `Une hausse du salaire minimum réduit directement la pauvreté au travail et profite à des ménages qui consomment une part plus grande de chaque euro supplémentaire — ce qui peut soutenir l'activité économique locale.`,
      `Des salaires plus élevés peuvent aussi réduire le turnover et les coûts de recrutement pour les entreprises, un effet rarement compté dans les modèles simples.`,
    ],
    againstCase: [
      `Le modèle économique classique reste solide dans bien des contextes : un prix plancher fixé au-dessus du prix d'équilibre du marché du travail réduit la quantité de travail demandée — moins d'embauches, plus d'automatisation, surtout pour les postes les moins qualifiés.`,
      `Des études plus récentes, notamment sur la hausse du salaire minimum à Seattle, ont trouvé des effets négatifs sur le nombre d'heures travaillées pour les emplois peu qualifiés, nuançant fortement la conclusion de Card et Krueger.`,
      `Une hausse trop rapide peut accélérer l'automatisation de postes standardisés (caisses, restauration rapide), au détriment justement des travailleurs qu'elle visait à protéger.`,
    ] },

  { id:'d3', icon:'☢️', theme:'Énergie',
    topic:`Le nucléaire dans la transition énergétique`,
    question:`Le nucléaire est-il une solution à privilégier pour la transition énergétique ?`,
    forCase: [
      `Le nucléaire émet très peu de CO₂ par kWh produit, à un niveau comparable à l'éolien selon les analyses du GIEC — loin devant les énergies fossiles.`,
      `Sa densité énergétique est incomparable : une centrale produit énormément d'électricité sur une emprise au sol minime, contrairement aux fermes solaires ou éoliennes qui nécessitent de très grandes surfaces pour une puissance équivalente.`,
      `Contrairement au solaire et à l'éolien, le nucléaire est pilotable : il produit en continu, indépendamment de la météo, ce qui simplifie l'équilibrage du réseau électrique.`,
    ],
    againstCase: [
      `Les grands projets nucléaires récents (l'EPR de Flamanville en est l'exemple le plus cité) ont connu des dépassements de coûts et de délais considérables, questionnant la viabilité économique de nouveaux projets face à des renouvelables de plus en plus compétitifs.`,
      `La question des déchets à très longue durée de vie n'est toujours pas résolue de façon définitive et consensuelle à l'échelle des siècles concernés.`,
      `Le risque d'accident, bien que statistiquement rare, a des conséquences potentiellement catastrophiques et durables, comme l'ont montré Tchernobyl et Fukushima — un risque de nature différente de celui des autres sources d'énergie.`,
    ] },

  { id:'d4', icon:'📊', theme:'Économie',
    topic:`Taxer davantage les très hauts revenus et patrimoines`,
    question:`Faut-il augmenter significativement la taxation des très hauts revenus et patrimoines ?`,
    forCase: [
      `Les travaux de l'économiste Thomas Piketty associent les niveaux d'inégalités très élevés à une moindre mobilité sociale et une cohésion sociale plus fragile sur le temps long.`,
      `Un euro supplémentaire a un impact marginal sur la consommation d'un très haut patrimoine bien plus faible que le même euro redistribué à des ménages modestes qui le dépensent presque intégralement — un argument d'efficacité économique globale, pas seulement de justice.`,
      `Une fiscalité plus progressive peut financer des biens publics (éducation, santé, infrastructures) qui bénéficient à l'ensemble de la société, y compris à long terme aux plus favorisés eux-mêmes.`,
    ],
    againstCase: [
      `Les capitaux et les contribuables les plus mobiles peuvent se déplacer vers des juridictions fiscales plus clémentes — un cas souvent cité en France est le débat autour de la suppression de l'ISF, entre départs constatés et effets controversés sur l'investissement.`,
      `Une taxation trop forte au sommet peut réduire l'incitation à investir, entreprendre ou prendre des risques, avec un effet potentiellement négatif sur la croissance et donc, indirectement, sur l'emploi.`,
      `Le rendement réel de ces taxes est parfois inférieur aux attentes une fois pris en compte les mécanismes d'optimisation et d'évitement fiscal, ce qui questionne l'efficacité pratique de la mesure.`,
    ] },

  { id:'d5', icon:'🌿', theme:'Santé publique',
    topic:`La légalisation du cannabis`,
    question:`Faut-il légaliser et réguler le cannabis ?`,
    forCase: [
      `Légaliser retire le marché des mains des réseaux criminels et permet de le réguler : contrôle de la qualité, taxation, encadrement de l'accès — plutôt que de laisser un marché entièrement non régulé prospérer.`,
      `Le Portugal, qui a dépénalisé l'usage de toutes les drogues en 2001 (une politique différente mais liée), a constaté une réduction des overdoses et des infections liées à l'usage de drogues par rapport à la période précédente.`,
      `Les ressources policières et judiciaires consacrées à la répression de l'usage simple pourraient être réorientées vers la prévention, le soin, ou la lutte contre les trafics les plus graves.`,
    ],
    againstCase: [
      `Un accès plus simple et une image plus banalisée du produit peuvent augmenter la consommation globale, en particulier chez les plus jeunes, dont le cerveau est encore en développement.`,
      `Des travaux en santé mentale ont établi un lien statistique entre usage précoce et régulier de cannabis fort et un risque accru de troubles psychotiques chez certains profils vulnérables — un risque encore incomplètement quantifié.`,
      `La légalisation ne garantit pas la disparition du marché noir si la fiscalité ou la réglementation légale restent trop contraignantes par rapport à une offre illégale moins chère, comme l'illustrent certains retours d'expérience nord-américains.`,
    ] },

  { id:'d6', icon:'🗓️', theme:'Travail',
    topic:`La semaine de 4 jours`,
    question:`La semaine de travail de 4 jours est-elle une bonne idée à généraliser ?`,
    forCase: [
      `Plusieurs expérimentations à grande échelle (notamment au Royaume-Uni et en Islande) ont rapporté un maintien, voire une hausse, de la productivité mesurée malgré la réduction du temps de travail, ainsi qu'une amélioration nette du bien-être rapporté par les salariés.`,
      `Moins de jours travaillés peut réduire l'épuisement professionnel et l'absentéisme, avec des effets positifs indirects sur la qualité du travail fourni les jours travaillés.`,
      `Une meilleure répartition entre vie professionnelle et vie personnelle peut aussi favoriser une répartition plus équilibrée des tâches domestiques et familiales.`,
    ],
    againstCase: [
      `Le modèle ne se généralise pas aussi facilement aux métiers à forte composante physique ou de présence continue (santé, industrie, commerce, services d'urgence), où la charge de travail ne se compresse pas aussi aisément.`,
      `Sans réduction réelle de la charge de travail totale, le risque est de concentrer la même quantité de travail sur 4 jours plus intenses, sans gain net de bien-être — juste un déplacement du problème.`,
      `Les expérimentations existantes concernent souvent des entreprises volontaires et déjà bien organisées, ce qui limite la capacité à généraliser leurs résultats à l'ensemble du tissu économique.`,
    ] },
];

window.MAESTRIA_DEBATES = { DEBATES };
