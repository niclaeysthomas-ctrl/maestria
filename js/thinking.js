/* ============================================================
   Maestria — Atelier de pensée : sujets d'essai hebdomadaires.
   Un sujet par semaine (rotation déterministe). Vise la construction
   de positions politiques/philosophiques cohérentes depuis ses valeurs.
   ============================================================ */

const ESSAY_PROMPTS = [
  { id:'e1', title:`Les limites du pouvoir de l'État`,
    prompt:`Quelle est, selon toi, la limite légitime du pouvoir de l'État sur la vie privée d'un individu ? Développe avec au moins un exemple concret.` },
  { id:'e2', title:`Mérite et contexte social`,
    prompt:`Le mérite individuel explique-t-il vraiment la réussite, ou est-ce surtout une question de contexte social ? Prends position et défends-la.` },
  { id:'e3', title:`Égalité des chances ou des résultats`,
    prompt:`Faut-il préférer l'égalité des chances ou l'égalité des résultats ? Peuvent-elles se rejoindre, ou s'opposent-elles nécessairement ?` },
  { id:'e4', title:`La volonté populaire a-t-elle toujours raison`,
    prompt:`Un gouvernement doit-il parfois agir contre la volonté populaire s'il estime agir dans l'intérêt général ? Où placerais-tu la limite ?` },
  { id:'e5', title:`Les limites de la liberté d'expression`,
    prompt:`La liberté d'expression a-t-elle des limites légitimes ? Lesquelles, et sur quel principe les fonder ?` },
  { id:'e6', title:`Le progrès technique est-il toujours un progrès`,
    prompt:`Le progrès technique améliore-t-il toujours la société, ou peut-il aussi la dégrader ? Illustre avec un exemple actuel.` },
  { id:'e7', title:`Famille, nation, humanité`,
    prompt:`Que doit-on prioritairement à sa famille, à sa nation, à l'humanité ? Dans cet ordre, ou un autre ? Justifie ta hiérarchie.` },
  { id:'e8', title:`Capitalisme et justice sociale`,
    prompt:`Le capitalisme est-il compatible avec une réelle justice sociale, ou les deux s'opposent-ils structurellement ? Prends position.` },
];

window.MAESTRIA_THINKING = { ESSAY_PROMPTS };
