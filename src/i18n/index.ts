/**
 * Architecture multilingue.
 *
 * Le site est publié en français. Pour ajouter l'anglais :
 *  1. créer `dictionaries/en.ts` en respectant le type `Dictionary` ;
 *  2. ajouter "en" à `locales` ;
 *  3. déplacer les routes sous `src/app/[locale]/` et lire la langue
 *     depuis le paramètre de route (le `proxy.ts` de Next.js peut
 *     rediriger selon `Accept-Language`) ;
 *  4. ajouter `alternates.languages` aux métadonnées et au sitemap.
 *
 * Les textes produits restent centralisés dans `src/data/` ; prévoir alors
 * un champ par langue (ex. `name: { fr, en }`).
 */
import { fr, type Dictionary } from "./dictionaries/fr";

export const locales = ["fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const dictionaries: Record<Locale, Dictionary> = { fr };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
