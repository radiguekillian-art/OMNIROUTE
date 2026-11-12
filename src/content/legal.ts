/**
 * Pages légales. Les textes sont des STRUCTURES À COMPLÉTER : aucun
 * engagement, délai, tarif ou mention légale n'a été inventé.
 * Remplacez chaque `body` par le texte validé, puis passez `draft` à false.
 */
export type LegalSection = { title: string; body: string[] };

export type LegalDocument = {
  slug: "cgv" | "confidentialite" | "livraison-retours" | "mentions-legales";
  title: string;
  description: string;
  draft: boolean;
  /** Date de mise à jour (AAAA-MM-JJ), à renseigner à la publication. */
  updatedAt: string | null;
  sections: LegalSection[];
};

const todo = (what: string) => [`[À compléter] ${what}`];

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
  cgv: {
    slug: "cgv",
    title: "Conditions générales de vente",
    description: "Conditions générales de vente de la boutique en ligne FADIYE.",
    draft: true,
    updatedAt: null,
    sections: [
      { title: "Objet et champ d’application", body: todo("Identification du vendeur et champ d’application des conditions.") },
      { title: "Produits", body: todo("Description des produits et disponibilité.") },
      { title: "Prix", body: todo("Devise, taxes applicables et modalités d’affichage des prix.") },
      { title: "Commande", body: todo("Étapes de la commande et confirmation.") },
      { title: "Paiement", body: todo("Prestataire et moyens de paiement acceptés.") },
      { title: "Livraison", body: todo("Zones, délais et frais de livraison.") },
      { title: "Droit de rétractation", body: todo("Conditions et modalités d’exercice du droit de rétractation.") },
      { title: "Garanties légales", body: todo("Garantie légale de conformité et garantie des vices cachés.") },
      { title: "Service client et litiges", body: todo("Coordonnées du service client, médiation et droit applicable.") },
    ],
  },
  confidentialite: {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    description: "Politique de confidentialité et traitement des données personnelles du site FADIYE.",
    draft: true,
    updatedAt: null,
    sections: [
      { title: "Responsable du traitement", body: todo("Identité et coordonnées du responsable du traitement.") },
      { title: "Données collectées", body: todo("Catégories de données collectées et finalités.") },
      {
        title: "Stockage local du navigateur",
        body: [
          "Le contenu de votre panier (référence, taille et quantité des pièces) est enregistré dans le stockage local de votre navigateur afin d’être conservé après actualisation. Ces informations ne sont pas transmises tant que vous ne lancez pas un paiement.",
        ],
      },
      { title: "Destinataires et sous-traitants", body: todo("Hébergeur, prestataire de paiement et autres destinataires.") },
      { title: "Durée de conservation", body: todo("Durées de conservation par catégorie de données.") },
      { title: "Vos droits", body: todo("Modalités d’exercice des droits d’accès, de rectification, d’effacement, etc.") },
    ],
  },
  "livraison-retours": {
    slug: "livraison-retours",
    title: "Livraison et retours",
    description: "Conditions de livraison et de retour des pièces FADIYE.",
    draft: true,
    updatedAt: null,
    sections: [
      { title: "Zones de livraison", body: todo("Pays et zones desservis.") },
      { title: "Délais et frais", body: todo("Délais de préparation, d’expédition et frais de livraison.") },
      { title: "Suivi de commande", body: todo("Modalités de suivi des colis.") },
      { title: "Retours", body: todo("Délai, conditions et procédure de retour.") },
      { title: "Remboursements", body: todo("Délai et mode de remboursement.") },
    ],
  },
  "mentions-legales": {
    slug: "mentions-legales",
    title: "Mentions légales",
    description: "Mentions légales du site FADIYE.",
    draft: true,
    updatedAt: null,
    sections: [
      { title: "Éditeur du site", body: todo("Dénomination, forme juridique, siège social, immatriculation, contact.") },
      { title: "Directeur de la publication", body: todo("Nom du directeur de la publication.") },
      {
        title: "Hébergement",
        body: todo("Hébergeur du site (ex. Vercel Inc.) et ses coordonnées complètes."),
      },
      {
        title: "Propriété intellectuelle",
        body: [
          "La marque FADIYE, son logo calligraphique, ses visuels et l’ensemble des contenus de ce site sont protégés. Toute reproduction sans autorisation préalable est interdite.",
        ],
      },
    ],
  },
};
