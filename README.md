# FADIYE — site e-commerce

Site officiel de la maison FADIYE. Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Aucune dépendance d'exécution en dehors de Next.js et React.

## Démarrer

```bash
npm install
```

```bash
npm run dev
```

Le site est alors disponible sur http://localhost:3000.

Autres commandes : `npm run build` (build de production), `npm start` (serveur de production), `npm run lint`, `npm run typecheck`, `npm run images` (régénère les visuels, Python 3 + Pillow).

## Variables d'environnement

Voir `.env.example`. Toutes sont facultatives : sans elles, le site fonctionne et affiche clairement ce qui reste à configurer.

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, Open Graph). Détectée automatiquement sur Vercel. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail de contact (footer, page Contact, menu mobile). |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Lien Instagram (masqué tant qu'il est vide). |
| `STRIPE_SECRET_KEY` | Active le paiement Stripe Checkout. Vide = paiement « non activé », aucune commande possible. |

Après modification d'une variable sur Vercel, relancer un déploiement.

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Produits : prix, statut, tailles, stock, composition, photos | `src/data/products.ts` |
| Catégories de la boutique | `src/data/categories.ts` |
| Guide des tailles (mesures) | `src/data/size-guide.ts` |
| Livraison, retours, devise, quantité max, panier avant lancement | `src/config/commerce.ts` |
| Navigation, contact, réseaux | `src/config/site.ts` |
| Textes éditoriaux (accueil, La Maison) | `src/i18n/dictionaries/fr.ts` |
| Spécificités du produit (fiche produit) | `details` dans `src/data/products.ts` |
| Pages légales | `src/content/legal.ts` |
| Couleurs, typographies | `src/app/globals.css` (`@theme`) |

Les valeurs commerciales non confirmées sont à `null` : le site affiche « communiqué prochainement » au lieu d'inventer une information.

### Ouvrir les ventes du cardigan

Dans `src/data/products.ts` :

1. `price: 25000` (prix TTC en centimes, ici 250,00 €) ;
2. `status: "available"` ;
3. ajuster `sizes` (`available: true/false` par taille) puis `sizesConfirmed: true` ;
4. renseigner `composition` et `care`.

Puis définir `STRIPE_SECRET_KEY` sur Vercel. Le checkout relit toujours prix et disponibilités côté serveur, et la page de confirmation n'affiche « Merci » qu'après vérification du paiement auprès de Stripe.

### Ajouter un produit

1. Déposer les photos dans `src/assets/images/products/<slug>/`.
2. Ajouter un objet au tableau `products` (la première image est la principale, la seconde apparaît au survol).

Pages produit, collection, nouveautés, recherche, sitemap et données structurées se mettent à jour automatiquement.

## Visuels

Les originaux fournis sont conservés dans `assets/originals/`. `scripts/prepare-images.py` en dérive les fichiers du site : ré-encodage, recadrages de détails (broderie, fermoirs, maille) depuis le packshot réel, déclinaisons noire/blanche/rouge du logo (même tracé calligraphique), icône (lys de l'étiquette) et image de partage. Next.js sert ensuite chaque image en AVIF/WebP à la bonne taille.

Le logo est utilisé dans son rouge d'origine, sans recoloration.

### Hero et pied de page

- **Hero** : l'animation d'origine (`assets/originals/hero-oeillet.gif`, l'œillet qui devient lys araignée) est affichée dans son format 16:9, sans recadrage. Chaque image du GIF (500 px de large) a été agrandie ×4 par super-résolution (réseau EDSR), puis la séquence a été encodée en vidéo MP4/WebM à sa cadence d'origine (`public/media/`, script `scripts/upscale-hero.py`). La première image sert d'affiche et de repli si les animations sont désactivées. Pour revenir à une image fixe : `heroMedia.video = null` dans `src/config/site.ts`.
- **Pied de page** : fond flouté généré depuis `assets/originals/fond-lys-rouges.webp` (`npm run images`).

⚠️ Ces deux visuels d'ambiance proviennent de tiers (filigranes visibles sur les originaux) : vérifier les droits avant un usage commercial.

## Typographies

| Rôle | Police | Fichier |
|---|---|---|
| Titres, surtitres, navigation, boutons, tailles, quantités | Akira Expanded | `src/assets/fonts/akira-expanded.woff2` |
| Tous les textes (police par défaut) : descriptions, prix, légendes, liens du pied de page, panier, pages légales | Aquiline Two | `src/assets/fonts/aquiline-two.woff2` |
| Secours (accents, €) | Archivo Expanded (Google Fonts) | chargée par `next/font` |

⚠️ **Akira Expanded est la version démo, réservée à un usage personnel** (voir `assets/originals/AkiraExpanded-LICENCE.txt`). Une licence commerciale est nécessaire avant l'ouverture des ventes. La version démo ne contient pas les lettres accentuées ni le symbole € : elles sont fournies par Archivo. Avec la version complète, remplacer simplement `akira-expanded.woff2`.

Aquiline Two (Manfred Klein, d'après Aquiline) est fournie sans fichier de licence : vérifier ses conditions d'usage commercial.

## Arborescence

```
/                         Accueil
/collection               Boutique (filtre ?categorie=)
/nouveautes               Nouveautés
/produits/[slug]          Fiche produit
/panier                   Panier
/la-maison                La Maison
/contact                  Contact
/cgv, /confidentialite, /livraison-retours, /mentions-legales
/commande/confirmation    Retour de paiement (vérifié côté serveur)
/api/checkout             Création de session de paiement
/sitemap.xml, /robots.txt, /manifest.webmanifest
```

## Version anglaise

L'architecture est prête : voir `src/i18n/index.ts` pour les étapes (dictionnaire `en`, routes sous `src/app/[locale]/`, `alternates.languages`).

## Déploiement Vercel

1. Importer le dépôt GitHub sur https://vercel.com/new (framework détecté : Next.js, aucune configuration requise).
2. Renseigner les variables d'environnement.
3. Chaque push sur la branche de production redéploie le site.
