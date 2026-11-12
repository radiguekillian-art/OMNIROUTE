"use client";

import { useId, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { canAddToCart, getProduct } from "@/data/products";
import type { SizeGuide } from "@/data/size-guide";

import { SizeGuideDialog } from "./SizeGuideDialog";
import { SizeSelector } from "./SizeSelector";

/**
 * Sélection taille + quantité + ajout au panier.
 * Reçoit le slug et relit le catalogue côté client (source unique).
 */
export function PurchasePanel({ slug, sizeGuide }: { slug: string; sizeGuide: SizeGuide | undefined }) {
  const product = getProduct(slug);
  const { addItem, paymentsEnabled } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  if (!product) return null;

  const allSoldOut = product.status === "sold-out" || product.sizes.every((entry) => entry.available === false);
  const addable = canAddToCart(product);

  function handleAdd() {
    if (!product) return;
    if (!size) {
      setError("Veuillez choisir une taille.");
      return;
    }
    if (addItem(product.slug, size, quantity)) {
      setError(null);
      setQuantity(1);
    } else {
      setError("Cette taille n'est pas disponible.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <p className="eyebrow" id={`${id}-size-label`}>
            Taille{size ? <span className="ml-2 text-stone">— {size}</span> : null}
          </p>
          <SizeGuideDialog guide={sizeGuide} productName={product.name} />
        </div>
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={(value) => {
            setSize(value);
            setError(null);
          }}
          name={`${id}-size`}
          error={error}
          errorId={`${id}-error`}
        />
        {!product.sizesConfirmed ? (
          <p className="mt-3 text-[0.5625rem] text-stone">Grille de tailles en cours de confirmation.</p>
        ) : null}
      </div>

      <div className="flex items-stretch gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button className="flex-1" onClick={handleAdd} disabled={!addable || allSoldOut}>
          {allSoldOut ? "Épuisé" : addable ? "Ajouter au panier" : "Bientôt disponible"}
        </Button>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="-mt-4 text-[0.625rem] text-carmine">
          {error}
        </p>
      ) : null}

      {product.status === "coming-soon" || !paymentsEnabled ? (
        <p className="border-l border-carmine pl-4 copy text-stone">
          {product.status === "coming-soon"
            ? "Pièce présentée avant l’ouverture des ventes. "
            : null}
          {paymentsEnabled ? null : "Le paiement en ligne n’est pas encore activé : aucune commande ne peut être passée pour le moment."}
        </p>
      ) : null}
    </div>
  );
}
