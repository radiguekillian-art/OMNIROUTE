import type { Metadata } from "next";

import { ClearCart } from "@/components/cart/ClearCart";
import { ButtonLink } from "@/components/ui/Button";
import { getCheckoutSessionStatus, isPaymentConfigured } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Confirmation de commande",
  robots: { index: false, follow: false },
};

type ConfirmationProps = { searchParams: Promise<{ session_id?: string | string[] }> };

/**
 * N'affiche une confirmation QUE si le prestataire confirme le paiement
 * côté serveur. Aucune confirmation n'est simulée.
 */
export default async function ConfirmationPage({ searchParams }: ConfirmationProps) {
  const { session_id: raw } = await searchParams;
  const sessionId = typeof raw === "string" && /^cs_[A-Za-z0-9_]+$/.test(raw) ? raw : null;

  let state: "not-configured" | "invalid" | "paid" | "unpaid" = "invalid";
  let email: string | null = null;

  if (!isPaymentConfigured()) {
    state = "not-configured";
  } else if (sessionId) {
    try {
      const status = await getCheckoutSessionStatus(sessionId);
      state = status.paid ? "paid" : "unpaid";
      email = status.email;
    } catch {
      state = "invalid";
    }
  }

  const content = {
    "not-configured": {
      title: "Paiement non activé.",
      text: "Le paiement en ligne n’est pas encore activé sur ce site : aucune commande n’a été passée.",
    },
    invalid: {
      title: "Commande introuvable.",
      text: "Nous ne trouvons pas de paiement correspondant à cette page.",
    },
    unpaid: {
      title: "Paiement non finalisé.",
      text: "Le paiement n’a pas été confirmé. Votre panier a été conservé : vous pouvez réessayer.",
    },
    paid: {
      title: "Merci pour votre commande.",
      text: email
        ? `Votre paiement est confirmé. Un récapitulatif a été envoyé à ${email}.`
        : "Votre paiement est confirmé.",
    },
  }[state];

  return (
    <section className="container-fadiye flex min-h-[60svh] flex-col items-start justify-center gap-8 py-24">
      {state === "paid" ? <ClearCart /> : null}
      <p className="eyebrow flex items-center gap-4 text-stone">
        <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
        Commande
      </p>
      <h1 className="display text-[clamp(3rem,7vw,6rem)]">{content.title}</h1>
      <p className="prose-fadiye max-w-lg text-[1rem]">{content.text}</p>
      <ButtonLink href={state === "unpaid" ? "/panier" : "/collection"} arrow>
        {state === "unpaid" ? "Retour au panier" : "Retour à la collection"}
      </ButtonLink>
    </section>
  );
}
