"use client";

import { commerce } from "@/config/commerce";
import { formatPrice } from "@/lib/format";

import { useCart } from "./CartProvider";

export function CartSummary() {
  const { subtotal } = useCart();

  return (
    <div className="space-y-3 text-[0.8125rem]">
      <dl className="space-y-3">
        <div className="flex items-baseline justify-between gap-6">
          <dt className="eyebrow">Sous-total</dt>
          <dd className={subtotal === null ? "text-right text-stone" : "text-right text-base tabular-nums"}>
            {subtotal === null ? "À confirmer" : formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-6 text-stone">
          <dt>Livraison</dt>
          <dd className="max-w-[60%] text-right">{commerce.shipping.summary ?? "Communiquée prochainement"}</dd>
        </div>
      </dl>
      {subtotal === null ? (
        <p className="text-stone">Le prix de certaines pièces sera communiqué prochainement.</p>
      ) : null}
    </div>
  );
}
