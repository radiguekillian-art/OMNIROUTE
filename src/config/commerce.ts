/**
 * Paramètres commerciaux centralisés.
 *
 * ⚠️  Les valeurs `null` sont des informations NON CONFIRMÉES.
 * Le site les affiche comme « communiquées prochainement » au lieu
 * d'inventer un délai, un tarif ou une condition. Remplacez-les ici
 * dès qu'elles sont validées : toutes les pages se mettent à jour.
 */
export const commerce = {
  currency: "EUR",
  /** Locale de formatage des prix. */
  priceLocale: "fr-FR",
  /** Quantité maximale par ligne de panier. */
  maxQuantityPerLine: 5,
  /** Clé du panier dans le stockage local du navigateur. */
  cartStorageKey: "fadiye.cart.v1",
  /**
   * Pré-lancement : autorise l'ajout au panier des pièces « bientôt
   * disponibles » pour parcourir le panier. Le paiement reste bloqué tant
   * que la pièce n'est pas « available », sans prix, ou sans prestataire
   * de paiement configuré. Passer à `false` si vous préférez désactiver
   * le bouton avant l'ouverture des ventes.
   */
  allowCartWhileComingSoon: true,

  shipping: {
    /** Ex. « Livraison offerte en France métropolitaine. » — à confirmer. */
    summary: null as string | null,
    /** Paragraphes détaillés (zones, délais, transporteurs) — à confirmer. */
    details: [] as string[],
    /** Pays autorisés au paiement (codes ISO), utilisés par le checkout Stripe. */
    allowedCountries: ["FR"] as string[],
  },

  returns: {
    /** Ex. « Retours acceptés sous 14 jours. » — à confirmer. */
    summary: null as string | null,
    details: [] as string[],
  },
} as const;

export const pendingCopy = {
  price: "Prix communiqué prochainement",
  shipping: "Les conditions de livraison seront communiquées prochainement.",
  returns: "Les conditions de retour seront communiquées prochainement.",
  composition: "Composition communiquée prochainement.",
  care: "Conseils d'entretien communiqués prochainement.",
} as const;
