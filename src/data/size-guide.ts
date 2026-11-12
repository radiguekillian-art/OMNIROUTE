/**
 * Guide des tailles. Les mesures sont à renseigner en centimètres
 * (`null` = non communiquée). Les tailles doivent correspondre à celles
 * déclarées dans `products.ts`.
 */
export type SizeGuide = {
  sizes: string[];
  measurements: { label: string; description: string; values: (number | null)[] }[];
  note: string | null;
};

export const sizeGuides: Record<string, SizeGuide> = {
  "cardigan-fadiye": {
    sizes: ["S", "M", "L", "XL"],
    measurements: [
      { label: "Largeur poitrine", description: "Mesurée à plat, d'une emmanchure à l'autre.", values: [null, null, null, null] },
      { label: "Longueur totale", description: "Du point le plus haut de l'épaule au bas côtelé.", values: [null, null, null, null] },
      { label: "Longueur de manche", description: "De la couture d'épaule au bord du poignet.", values: [null, null, null, null] },
    ],
    // Ex. « Coupe oversize : prenez votre taille habituelle. » — à confirmer.
    note: null,
  },
};
