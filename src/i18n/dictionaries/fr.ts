/** Textes éditoriaux de la maison (français). */
export const fr = {
  home: {
    hero: {
      eyebrow: "Collection 01 — Automne / Hiver",
      title: "L’élégance dans le détail.",
      subtitle: "Des pièces pensées pour se distinguer. Une signature qui ne ressemble à aucune autre.",
      cta: "Découvrir la collection",
    },
    drop: {
      eyebrow: "Le premier drop",
      title: "Collection 01 — Automne / Hiver",
      intro:
        "Une première collection resserrée autour d’une pièce signature. Une maille noire, un tracé calligraphique rouge, des finitions argentées : les codes de la maison posés pour la première fois.",
      labelTitle: "Signée jusque dans la doublure.",
      labelText:
        "L’étiquette tissée reprend la calligraphie FADIYE et le lys araignée rouge : la signature se lit à l’extérieur comme à l’intérieur.",
    },
    signature: {
      eyebrow: "La pièce signature",
      title: "Cardigan FADIYE",
      text: "Une pièce noire oversize travaillée autour d’une signature calligraphique rouge, de fermoirs argentés et de boutons personnalisés.",
      cta: "Découvrir la pièce",
    },
    buttons: {
      eyebrow: "Le bouton signature",
      title: "Un lys en relief, frappé dans le métal.",
      text: "Chaque bouton argenté porte le lys araignée, symbole discret de la maison. Un détail que l’on découvre de près, et qui distingue la pièce sans jamais la surcharger.",
    },
    identity: {
      title: "Une identité. Une signature. Une vision.",
      text: "FADIYE construit ses pièces autour de codes reconnaissables : une calligraphie qui devient motif, un métal argenté travaillé comme un bijou, une maille noire qui laisse toute la place au détail.",
      codes: [
        { title: "La calligraphie", text: "Le nom de la maison, mis en calligraphie, devient broderie et signature." },
        { title: "Le métal", text: "Fermoirs et boutons argentés, pensés comme les éléments d’une parure." },
        { title: "Le noir", text: "Une base sombre et profonde, sur laquelle le rouge carmin vient s’inscrire." },
      ],
      cta: "La Maison",
    },
  },
  maison: {
    introLead: "est une recherche d’équilibre entre caractère, élégance et singularité.",
    introRest:
      "Une attention particulière portée aux détails donne naissance à des pièces pensées pour laisser une empreinte.",
  },
} as const;

export type Dictionary = typeof fr;
