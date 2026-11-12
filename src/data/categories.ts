/**
 * Catégories de la boutique. Seules celles qui contiennent au moins un
 * produit apparaissent dans les filtres : on peut donc les préparer à l'avance.
 */
export const categories = [
  { id: "mailles", label: "Mailles" },
  { id: "vestes", label: "Vestes" },
  { id: "hauts", label: "Hauts" },
  { id: "pantalons", label: "Pantalons" },
  { id: "accessoires", label: "Accessoires" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export function getCategoryLabel(id: string): string | undefined {
  return categories.find((category) => category.id === id)?.label;
}
