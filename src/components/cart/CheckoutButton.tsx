"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import { useCart } from "./CartProvider";

/**
 * Lance le paiement. Ne simule jamais une commande : tant qu'aucun
 * prestataire n'est configuré (STRIPE_SECRET_KEY), le parcours l'indique
 * clairement et le bouton reste inactif.
 */
export function CheckoutButton({ className }: { className?: string }) {
  const { lines, paymentsEnabled, allPurchasable } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (lines.length === 0) return null;

  if (!paymentsEnabled) {
    return (
      <div className={className}>
        <Button className="w-full" disabled aria-describedby="checkout-status">
          Paiement bientôt disponible
        </Button>
        <p id="checkout-status" className="mt-4 border-l border-carmine pl-4 text-[0.8125rem] leading-relaxed text-stone">
          Le paiement en ligne n&apos;est pas encore activé. Aucune commande ne peut être passée ni débitée pour le
          moment. Votre sélection reste enregistrée dans ce navigateur.
        </p>
      </div>
    );
  }

  if (!allPurchasable) {
    return (
      <div className={className}>
        <Button className="w-full" disabled aria-describedby="checkout-status">
          Commande indisponible
        </Button>
        <p id="checkout-status" className="mt-4 border-l border-carmine pl-4 text-[0.8125rem] leading-relaxed text-stone">
          Certaines pièces de votre panier ne sont pas encore ouvertes à la vente ou n&apos;ont pas de prix confirmé.
        </p>
      </div>
    );
  }

  async function startCheckout() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines.map(({ slug, size, quantity }) => ({ slug, size, quantity })) }),
      });
      const data = (await response.json().catch(() => ({}))) as { url?: string; message?: string };
      if (!response.ok || !data.url) throw new Error(data.message ?? "Le paiement n'a pas pu être initialisé.");
      window.location.assign(data.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Le paiement n'a pas pu être initialisé.");
      setPending(false);
    }
  }

  return (
    <div className={className}>
      <Button className="w-full" onClick={startCheckout} disabled={pending} aria-busy={pending}>
        {pending ? "Redirection…" : "Procéder au paiement"}
      </Button>
      {error ? (
        <p role="alert" className="mt-4 text-[0.8125rem] text-carmine">
          {error}
        </p>
      ) : null}
    </div>
  );
}
