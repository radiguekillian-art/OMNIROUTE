/**
 * Catalogue FADIYE — source unique de vérité pour toutes les pages
 * (accueil, collection, nouveautés, fiche produit, panier, checkout, SEO).
 *
 * Ajouter un produit : ajouter un objet au tableau `products`, avec ses
 * images importées depuis `src/assets/images/products/<slug>/`.
 *
 * ⚠️  `price`, `status`, `sizes[].available`, `composition`, `care`
 * sont des données commerciales : laissez `null` tant qu'elles ne sont
 * pas confirmées. Le site affichera « communiqué prochainement ».
 */
import type { StaticImageData } from "next/image";

import cardiganFace from "@/assets/images/products/cardigan-fadiye/face.jpg";
import cardiganBroderie from "@/assets/images/products/cardigan-fadiye/broderie.jpg";
import cardiganBouton from "@/assets/images/products/cardigan-fadiye/bouton-signature.jpg";
import cardiganFermoirs from "@/assets/images/products/cardigan-fadiye/fermoirs.jpg";
import cardiganMaille from "@/assets/images/products/cardigan-fadiye/maille.jpg";
import cardiganEtiquette from "@/assets/images/products/cardigan-fadiye/etiquette.jpg";

import { commerce } from "@/config/commerce";

import { categories, type CategoryId } from "./categories";
import { collections, type CollectionId } from "./collections";

export type ProductImage = {
  src: StaticImageData;
  alt: string;
  /** Légende courte affichée dans la galerie. */
  caption: string;
  /** Couleur de fond du cadre, accordée au fond de la photo. */
  background: string;
};

/**
 * - available   : en vente
 * - coming-soon : présentée, vente pas encore ouverte
 * - sold-out    : épuisée
 */
export type ProductStatus = "available" | "coming-soon" | "sold-out";

export type ProductSize = {
  label: string;
  /** `true` disponible, `false` épuisée, `null` stock non renseigné. */
  available: boolean | null;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  collection: CollectionId;
  isNew: boolean;
  /** Accroche courte (cartes, partage). */
  tagline: string;
  description: string;
  features: string[];
  /** Prix TTC en centimes. `null` = non communiqué. */
  price: number | null;
  status: ProductStatus;
  sizes: ProductSize[];
  /** `false` tant que la grille de tailles n'est pas validée. */
  sizesConfirmed: boolean;
  composition: string | null;
  care: string | null;
  /** La première image est la principale, la seconde sert au survol. */
  images: ProductImage[];
  /** Spécificités détaillées sur la fiche produit ; `image` = index dans `images`. */
  details: ProductDetail[];
};

export type ProductDetail = { title: string; text: string; image: number };

const CANVAS = "#f8f8f8";

export const products: Product[] = [
  {
    slug: "cardigan-fadiye",
    name: "Cardigan FADIYE",
    category: "mailles",
    collection: "collection-01",
    isNew: true,
    tagline:
      "Une pièce noire oversize travaillée autour d'une signature calligraphique rouge, de fermoirs argentés et de boutons personnalisés.",
    description:
      "Une silhouette oversize structurée par une maille noire, une broderie calligraphique rouge et des finitions métalliques signature. Chaque détail participe à l'identité de la pièce.",
    features: [
      "Coupe oversize",
      "Maille noire",
      "Col rond côtelé",
      "Poignets et bas côtelés",
      "Broderie calligraphique rouge",
      "Deux fermoirs métalliques argentés",
      "Boutons signature argentés avec fleur en relief",
    ],
    // À CONFIGURER — prix TTC en centimes, ex. 25000 pour 250,00 €.
    price: null,
    // À CONFIGURER — passer à "available" à l'ouverture des ventes.
    status: "coming-soon",
    // À CONFIGURER — tailles proposées et stock réel.
    sizes: [
      { label: "S", available: null },
      { label: "M", available: null },
      { label: "L", available: null },
      { label: "XL", available: null },
    ],
    sizesConfirmed: false,
    composition: null,
    care: null,
    images: [
      {
        src: cardiganFace,
        alt: "Cardigan FADIYE noir vu de face : broderie calligraphique rouge, deux fermoirs argentés et boutons métalliques.",
        caption: "Vue de face",
        background: CANVAS,
      },
      {
        src: cardiganBroderie,
        alt: "Détail de la broderie calligraphique rouge FADIYE sur la maille noire.",
        caption: "Broderie calligraphique",
        background: "#0b0b0b",
      },
      {
        src: cardiganBouton,
        alt: "Bouton signature argenté orné d'un lys araignée en relief.",
        caption: "Bouton signature",
        background: "#e6e5e5",
      },
      {
        src: cardiganFermoirs,
        alt: "Détail des deux fermoirs métalliques argentés et du col rond côtelé.",
        caption: "Fermoirs argentés",
        background: "#0b0b0b",
      },
      {
        src: cardiganMaille,
        alt: "Détail de la maille noire, du bas côtelé et des boutons argentés.",
        caption: "Maille et côtes",
        background: "#0b0b0b",
      },
      {
        src: cardiganEtiquette,
        alt: "Étiquette intérieure tissée FADIYE, calligraphie et lys araignée rouges sur fond noir.",
        caption: "Étiquette intérieure",
        background: "#0a0a0a",
      },
      // Vue arrière : à ajouter dès que la photographie est disponible.
    ],
    details: [
      {
        title: "Broderie calligraphique",
        text: "La signature FADIYE, brodée en rouge le long du devant, déploie ses boucles et ses entrelacs sur la maille noire.",
        image: 1,
      },
      {
        title: "Boutons signature",
        text: "Des boutons argentés ornés d’un lys araignée en relief, le symbole discret de la maison.",
        image: 2,
      },
      {
        title: "Fermoirs argentés",
        text: "Deux fermoirs métalliques argentés ponctuent le haut de la patte de boutonnage, sous le col rond côtelé.",
        image: 3,
      },
      {
        title: "Maille et côtes",
        text: "Une maille noire, des poignets et un bas côtelés : la base sobre et structurée d’une silhouette oversize.",
        image: 4,
      },
      {
        title: "Étiquette intérieure",
        text: "Une étiquette tissée qui reprend la calligraphie et le lys rouges : la signature se lit aussi à l’intérieur.",
        image: 5,
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: string | null): Product[] {
  if (!category) return products;
  return products.filter((product) => product.category === category);
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew);
}

/** Catégories qui contiennent au moins un produit (pas de filtre vide). */
export function getActiveCategories() {
  return categories.filter((category) => products.some((product) => product.category === category.id));
}

export function getCollection(id: CollectionId) {
  return collections[id];
}

/** La pièce peut-elle être placée dans le panier ? */
export function canAddToCart(product: Product, sizeLabel?: string): boolean {
  if (product.status === "sold-out") return false;
  if (product.status === "coming-soon" && !commerce.allowCartWhileComingSoon) return false;
  if (sizeLabel) {
    const size = product.sizes.find((entry) => entry.label === sizeLabel);
    if (!size || size.available === false) return false;
  }
  return true;
}

/** La pièce peut-elle être payée ? (vente ouverte, prix confirmé, taille non épuisée) */
export function isPurchasable(product: Product, sizeLabel?: string): boolean {
  return product.status === "available" && product.price !== null && canAddToCart(product, sizeLabel);
}

export const signatureProduct = products[0];
