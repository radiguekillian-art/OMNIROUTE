"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";

import { commerce } from "@/config/commerce";
import { canAddToCart, getProduct, isPurchasable, type Product } from "@/data/products";

/**
 * Seules les références (produit, taille, quantité) sont stockées dans le
 * navigateur. Prix, noms et disponibilités sont toujours relus depuis le
 * catalogue : une modification de prix s'applique immédiatement au panier.
 */
export type CartItem = { slug: string; size: string; quantity: number };

export type CartLine = CartItem & {
  key: string;
  product: Product;
  /** Total de la ligne en centimes, `null` si le prix n'est pas communiqué. */
  total: number | null;
  purchasable: boolean;
};

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "setQuantity"; slug: string; size: string; quantity: number }
  | { type: "remove"; slug: string; size: string }
  | { type: "clear" };

const MAX = commerce.maxQuantityPerLine;
const clamp = (value: number) => Math.max(1, Math.min(MAX, Math.floor(value)));

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const items: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { slug, size, quantity } = entry as Record<string, unknown>;
    if (typeof slug !== "string" || typeof size !== "string" || typeof quantity !== "number") continue;
    const product = getProduct(slug);
    if (!product || !product.sizes.some((s) => s.label === size)) continue;
    if (items.some((item) => item.slug === slug && item.size === size)) continue;
    items.push({ slug, size, quantity: clamp(quantity) });
  }
  return items;
}

type State = { items: CartItem[]; hydrated: boolean };

function reducer(state: State, action: Action): State {
  if (action.type === "hydrate") return { items: action.items, hydrated: true };
  return { ...state, items: itemsReducer(state.items, action) };
}

function itemsReducer(items: CartItem[], action: Exclude<Action, { type: "hydrate" }>): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = items.find((item) => item.slug === action.item.slug && item.size === action.item.size);
      if (existing) {
        return items.map((item) =>
          item === existing ? { ...item, quantity: clamp(item.quantity + action.item.quantity) } : item,
        );
      }
      return [...items, { ...action.item, quantity: clamp(action.item.quantity) }];
    }
    case "setQuantity":
      return items.map((item) =>
        item.slug === action.slug && item.size === action.size ? { ...item, quantity: clamp(action.quantity) } : item,
      );
    case "remove":
      return items.filter((item) => !(item.slug === action.slug && item.size === action.size));
    case "clear":
      return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** Sous-total en centimes, `null` si au moins un prix n'est pas communiqué. */
  subtotal: number | null;
  hydrated: boolean;
  /** Vrai si toutes les lignes peuvent être payées. */
  allPurchasable: boolean;
  /** Vrai si un prestataire de paiement est configuré côté serveur. */
  paymentsEnabled: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, size: string, quantity?: number) => boolean;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
  announcement: string;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(commerce.cartStorageKey);
    return raw ? sanitize(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children, paymentsEnabled }: { children: ReactNode; paymentsEnabled: boolean }) {
  const [{ items, hydrated }, dispatch] = useReducer(reducer, { items: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Restauration du panier après actualisation + synchronisation entre onglets.
  useEffect(() => {
    dispatch({ type: "hydrate", items: readStorage() });
    const onStorage = (event: StorageEvent) => {
      if (event.key === commerce.cartStorageKey) dispatch({ type: "hydrate", items: readStorage() });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(commerce.cartStorageKey, JSON.stringify(items));
    } catch {
      // Stockage indisponible (navigation privée stricte) : le panier reste en mémoire.
    }
  }, [items, hydrated]);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((item) => {
        const product = getProduct(item.slug);
        if (!product) return [];
        return [
          {
            ...item,
            key: `${item.slug}__${item.size}`,
            product,
            total: product.price === null ? null : product.price * item.quantity,
            purchasable: isPurchasable(product, item.size),
          },
        ];
      }),
    [items],
  );

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.some((line) => line.total === null)
    ? null
    : lines.reduce((sum, line) => sum + (line.total ?? 0), 0);
  const allPurchasable = lines.length > 0 && lines.every((line) => line.purchasable);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((slug: string, size: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product || !canAddToCart(product, size)) return false;
    dispatch({ type: "add", item: { slug, size, quantity } });
    setAnnouncement(`${product.name}, taille ${size}, ajouté au panier.`);
    setIsOpen(true);
    return true;
  }, []);

  const setQuantity = useCallback((slug: string, size: string, quantity: number) => {
    dispatch({ type: "setQuantity", slug, size, quantity });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    const product = getProduct(slug);
    dispatch({ type: "remove", slug, size });
    if (product) setAnnouncement(`${product.name}, taille ${size}, retiré du panier.`);
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      hydrated,
      allPurchasable,
      paymentsEnabled,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clear,
      announcement,
    }),
    [lines, count, subtotal, hydrated, allPurchasable, paymentsEnabled, isOpen, openCart, closeCart, addItem, setQuantity, removeItem, clear, announcement],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans <CartProvider>.");
  return context;
}
