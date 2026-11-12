"use client";

import { ButtonLink, TextLink } from "@/components/ui/Button";

import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";
import { CartSummary } from "./CartSummary";
import { CheckoutButton } from "./CheckoutButton";

export function CartPageContent() {
  const { lines, count, hydrated } = useCart();

  return (
    <div className="container-fadiye pb-24 pt-14 lg:pb-40 lg:pt-24">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-8">
        <h1 className="display text-[clamp(3.25rem,8vw,7rem)]">Panier</h1>
        {hydrated && count > 0 ? (
          <p className="eyebrow pb-3 text-stone">
            {count} article{count > 1 ? "s" : ""}
          </p>
        ) : null}
      </div>

      {!hydrated ? (
        <div className="h-64" aria-busy="true" />
      ) : lines.length === 0 ? (
        <div className="flex flex-col items-start gap-8 py-20">
          <p className="display text-4xl">Votre panier est vide.</p>
          <ButtonLink href="/collection" arrow>
            Découvrir la collection
          </ButtonLink>
        </div>
      ) : (
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <ul className="lg:col-span-7">
            {lines.map((line) => (
              <CartLineItem key={line.key} line={line} variant="page" />
            ))}
          </ul>
          <aside aria-label="Récapitulatif" className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <div className="space-y-8 bg-white p-6 lg:sticky lg:top-[108px] lg:p-10">
              <h2 className="eyebrow">Récapitulatif</h2>
              <CartSummary />
              <CheckoutButton />
            </div>
            <TextLink href="/collection" className="mt-10">
              Continuer la visite
            </TextLink>
          </aside>
        </div>
      )}
    </div>
  );
}
