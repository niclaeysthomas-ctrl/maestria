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

window.MAESTRIA_CONTENT = { DECKS };
