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

  { id:'duel1', icon:'⚖️', theme:'Histoire des idées', type:'duel',
    topic:`Rawls contre Nozick : qu'est-ce qui fonde une société juste ?`,
    question:`La justice se juge-t-elle sur le résultat (la répartition) ou sur le processus (comment chacun a acquis ce qu'il a) ?`,
    forLabel:'🔵 John Rawls', againstLabel:'🟣 Robert Nozick',
    forCase: [
      `Imagine que tu ignores complètement quelle place tu occuperas dans la société — riche ou pauvre, doué ou non — un « voile d'ignorance ». Rawls avance qu'un individu rationnel, placé derrière ce voile, choisirait des règles qui protègent les plus défavorisés, car il pourrait lui-même s'y retrouver.`,
      `De ce raisonnement découle le « principe de différence » : les inégalités ne sont justes que si elles profitent aussi, in fine, aux plus défavorisés de la société — pas seulement aux mieux placés.`,
      `La justice, pour Rawls, se juge donc sur le résultat final : une répartition n'est légitime que si sa structure sert les plus vulnérables, indépendamment de comment on y est arrivé.`,
    ],
    againstCase: [
      `Nozick répond que la justice ne se juge pas sur un résultat figé, mais sur le PROCESSUS : si chaque transfert de bien s'est fait librement et légitimement (par le travail, l'échange volontaire, le don), alors le résultat est juste, quelle que soit la répartition finale.`,
      `Prendre de force à certains ce qu'ils ont légitimement acquis pour l'attribuer à d'autres, même au nom d'un « meilleur » résultat, revient à violer leur liberté et leur droit de propriété — un principe qui prime, pour lui, sur toute considération de répartition.`,
      `Nozick illustre ceci avec l'exemple d'un joueur de basket que des millions de spectateurs paient librement pour voir jouer : sa fortune qui en résulte est juste, même si elle crée une grande inégalité, car chaque transaction qui y a mené était volontaire.`,
    ] },

  { id:'duel2', icon:'🌳', theme:'Histoire des idées', type:'duel',
    topic:`Hobbes contre Rousseau : l'humain est-il naturellement dangereux ou pacifique ?`,
    question:`Que se passerait-il sans aucune autorité ni société — l'état de nature est-il une guerre de tous contre tous, ou un état plutôt paisible ?`,
    forLabel:'🔵 Thomas Hobbes', againstLabel:'🟣 Jean-Jacques Rousseau',
    forCase: [
      `Pour Hobbes, l'état de nature — sans autorité pour arbitrer les conflits — est une « guerre de tous contre tous » où la vie est, selon sa formule célèbre, « solitaire, pauvre, méchante, brutale et courte ».`,
      `Chacun, cherchant à se protéger des autres qui pourraient chercher à lui nuire en premier, est poussé à la méfiance et à la violence préventive, même sans mauvaise intention initiale — un cercle vicieux structurel, pas seulement une question de mauvais caractère individuel.`,
      `La solution, pour Hobbes, est un pouvoir fort et centralisé (le « Léviathan ») auquel chacun cède une part de sa liberté en échange de la sécurité et de la paix civile — sans ce pouvoir, le chaos reprend inévitablement le dessus.`,
    ],
    againstCase: [
      `Rousseau conteste ce portrait sombre : selon lui, l'état de nature est plutôt pacifique — l'humain y est un « bon sauvage », guidé par la pitié naturelle envers ses semblables plus que par l'agressivité.`,
      `Ce n'est pas la nature humaine qui produit la violence et l'inégalité, mais l'apparition de la propriété privée et de la vie en société, qui introduisent la comparaison, la compétition et la domination des uns sur les autres.`,
      `Sa solution n'est donc pas un pouvoir fort imposé d'en haut, mais un contrat social où le peuple reste pleinement souverain à travers la « volonté générale » — l'autorité doit émaner du collectif, non s'imposer à lui pour le contenir.`,
    ] },

  { id:'duel3', icon:'📉', theme:'Histoire des idées', type:'duel',
    topic:`Keynes contre Hayek : l'État doit-il intervenir dans l'économie ?`,
    question:`En période de crise, l'État doit-il activement intervenir dans l'économie, ou la laisser s'auto-réguler ?`,
    forLabel:'🔵 John Maynard Keynes', againstLabel:'🟣 Friedrich Hayek',
    forCase: [
      `Keynes soutient qu'en période de récession, les marchés ne s'auto-régulent pas assez vite : la demande peut rester durablement insuffisante, et le chômage s'installer, sans qu'aucun mécanisme naturel ne vienne rapidement corriger la situation.`,
      `Dans ce cas, l'État a un rôle actif à jouer : augmenter ses propres dépenses (grands travaux, investissements publics) pour soutenir directement la demande et « amorcer la pompe » de l'activité économique, quitte à emprunter temporairement pour cela.`,
      `Pour Keynes, attendre passivement que le marché « se corrige tout seul » peut coûter des années de chômage et de gâchis économique évitables par une action publique ciblée et temporaire.`,
    ],
    againstCase: [
      `Hayek objecte qu'aucune autorité centrale, aussi bien informée soit-elle, ne peut disposer de toute l'information dispersée dans l'économie (les préférences, les besoins, les opportunités de millions d'acteurs) — ce qu'il appelle le « problème de la connaissance ».`,
      `Les prix, sur un marché libre, transmettent naturellement cette information dispersée et coordonnent les décisions de chacun bien mieux qu'une planification centrale ne pourrait le faire — intervenir massivement fausse ces signaux.`,
      `Une intervention étatique répétée, même bien intentionnée, tend à s'étendre et à se maintenir au-delà de la crise initiale, créant des dépendances et des distorsions économiques qui peuvent coûter plus cher à long terme que le mal qu'elle visait à corriger.`,
    ] },

  { id:'duel4', icon:'🚫', theme:'Histoire des idées', type:'duel',
    topic:`Mill contre le paternalisme : la société peut-elle te protéger de toi-même ?`,
    question:`A-t-on le droit de restreindre la liberté d'un individu pour son propre bien, même s'il ne nuit qu'à lui-même ?`,
    forLabel:'🔵 John Stuart Mill', againstLabel:'🟣 Le paternalisme protecteur',
    forCase: [
      `Mill défend un principe simple et exigeant, le « principe de préjudice » (harm principle) : la seule raison légitime de restreindre la liberté d'un individu contre sa volonté est d'empêcher qu'il ne nuise à autrui.`,
      `Si une personne ne prend un risque que pour elle-même — même un choix que la société juge imprudent — celle-ci n'a pas à la protéger d'elle-même : c'est sa vie, et l'erreur fait partie de la liberté réelle de la vivre comme on l'entend.`,
      `Pour Mill, une société qui autorise trop largement à « protéger les gens contre eux-mêmes » ouvre la porte à un contrôle sans fin sur des choix de plus en plus personnels, au nom d'un bien-être défini par d'autres que soi.`,
    ],
    againstCase: [
      `Le camp paternaliste répond que certaines décisions individuelles ont des conséquences si graves, si difficiles à anticiper rationnellement au moment du choix, ou si addictives une fois enclenchées, que l'individu n'est plus vraiment en position de choisir « librement ».`,
      `Des produits ou comportements conçus pour exploiter des biais psychologiques bien connus (dépendances, jeux d'argent, désinformation) peuvent justifier une intervention protectrice, précisément parce que le choix apparent n'est pas aussi libre et informé qu'il en a l'air.`,
      `Une société qui laisse ses membres se faire du tort gravement, sous prétexte de respecter à la lettre leur liberté formelle, peut aussi être accusée d'abandonner une responsabilité collective réelle envers ses membres les plus vulnérables à ces pièges.`,
    ] },
];

window.MAESTRIA_DEBATES = { DEBATES };
