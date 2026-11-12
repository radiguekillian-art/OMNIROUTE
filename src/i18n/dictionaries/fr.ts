/** Textes éditoriaux de la maison (français). */
export const fr = {
  home: {
    hero: {
      title: "L’élégance dans le détail.",
      cta: "Découvrir le cardigan",
    },
  },
  maison: {
    introLead: "est une recherche d’équilibre entre caractère, élégance et singularité.",
    introRest:
      "Une attention particulière portée aux détails donne naissance à des pièces pensées pour laisser une empreinte.",
  },
} as const;

export type Dictionary = typeof fr;
