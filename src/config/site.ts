/**
 * Configuration générale de la marque.
 * Les valeurs sensibles ou non confirmées proviennent des variables
 * d'environnement (voir `.env.example`) : rien n'est inventé ici.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "FADIYE",
  url: resolveSiteUrl(),
  description:
    "FADIYE — maison de vêtements. Des pièces pensées pour se distinguer, une signature calligraphique, des finitions métalliques et une attention portée à chaque détail.",
  /** Langue par défaut. L'architecture i18n (src/i18n) accueillera l'anglais. */
  defaultLocale: "fr" as const,
  ogImage: "/images/og/fadiye-og.jpg",
  contact: {
    /** NEXT_PUBLIC_CONTACT_EMAIL — adresse de contact publique. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  },
  social: {
    /** NEXT_PUBLIC_INSTAGRAM_URL — lien complet du compte Instagram. */
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Collection", href: "/collection" },
  { label: "Nouveautés", href: "/nouveautes" },
  { label: "La Maison", href: "/la-maison" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Conditions générales de vente", href: "/cgv" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Livraison et retours", href: "/livraison-retours" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

/**
 * Visuel du hero. Image fixe agrandie par super-résolution
 * (scripts/upscale-hero.py). Pour une version animée, convertir le GIF
 * d'origine en vidéo (MP4/WebM) dans public/media/ et renseigner `video`.
 */
export const heroMedia = {
  video: null as null | { webm: string; mp4: string },
  /** Couleur des bords de l'image : bandes latérales invisibles sur écran très large. */
  edgeColor: "#eef0f2",
};
