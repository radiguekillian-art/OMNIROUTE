import type { Product } from "@/data/products";

/** Libellé de disponibilité, dérivé uniquement des données réelles du catalogue. */
export function availabilityLabel(product: Product): string {
  switch (product.status) {
    case "sold-out":
      return "Épuisé";
    case "coming-soon":
      return "Bientôt disponible";
    case "available": {
      const known = product.sizes.filter((size) => size.available !== null);
      if (known.length > 0 && known.every((size) => size.available === false)) return "Épuisé";
      return "Disponible";
    }
  }
}
