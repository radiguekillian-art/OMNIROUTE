"use client";

import Link from "next/link";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/format";

import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";
import { CartSummary } from "./CartSummary";
import { CheckoutButton } from "./CheckoutButton";

export function CartDrawer() {
  const { isOpen, closeCart, lines, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  useModal(isOpen, closeCart, panelRef);

  return (
    <div className="overlay fixed inset-0 z-50" data-open={isOpen} inert={!isOpen}>
      <div
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-500 ease-[var(--ease-couture)]",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={closeCart}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-[var(--ease-couture)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6 lg:h-[76px] lg:px-8">
          <h2 id="cart-drawer-title" className="eyebrow">
            Panier <span className="text-stone">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="-mr-2 grid h-11 w-11 place-items-center transition-colors hover:text-carmine"
            aria-label="Fermer le panier"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="display text-xl">Votre panier est vide.</p>
            <p className="prose-fadiye mt-4 max-w-xs">Découvrez la première collection FADIYE.</p>
            <ButtonLink href="/collection" onClick={closeCart} className="mt-10" arrow>
              Découvrir la collection
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-6 lg:px-8">
              {lines.map((line) => (
                <CartLineItem key={line.key} line={line} onNavigate={closeCart} />
              ))}
            </ul>
            <div className="space-y-6 border-t border-line px-6 py-6 lg:px-8">
              <CartSummary />
              <CheckoutButton />
              <Link
                href="/panier"
                onClick={closeCart}
                className="eyebrow link-underline mx-auto block w-fit text-stone hover:text-ink"
              >
                Voir le panier complet
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
