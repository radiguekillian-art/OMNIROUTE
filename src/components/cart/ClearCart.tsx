"use client";

import { useEffect } from "react";

import { useCart } from "./CartProvider";

/** Vide le panier une fois le paiement confirmé par le serveur. */
export function ClearCart() {
  const { clear, hydrated } = useCart();
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);
  return null;
}
