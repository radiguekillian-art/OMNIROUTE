"use client";

import Image from "next/image";
import Link from "next/link";

import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { availabilityLabel } from "@/lib/availability";
import { cn, formatPrice } from "@/lib/format";

import { useCart, type CartLine } from "./CartProvider";

type CartLineItemProps = { line: CartLine; variant?: "drawer" | "page"; onNavigate?: () => void };

export function CartLineItem({ line, variant = "drawer", onNavigate }: CartLineItemProps) {
  const { setQuantity, removeItem } = useCart();
  const image = line.product.images[0];
  const href = `/produits/${line.product.slug}`;
  const isPage = variant === "page";

  return (
    <li className={cn("flex gap-5 border-b border-line py-6", isPage && "sm:gap-8 sm:py-8")}>
      <Link
        href={href}
        onClick={onNavigate}
        className={cn("relative shrink-0 overflow-hidden", isPage ? "w-24 sm:w-36" : "w-24")}
        style={{ backgroundColor: image.background }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image src={image.src} alt="" sizes={isPage ? "144px" : "96px"} className="aspect-[4/5] h-auto w-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={href} onClick={onNavigate} className="eyebrow link-underline text-ink">
              {line.product.name}
            </Link>
            <p className="mt-2 text-[0.625rem] text-stone">Taille {line.size}</p>
            {line.product.status !== "available" ? (
              <p className="mt-1 text-[0.625rem] text-stone">{availabilityLabel(line.product)}</p>
            ) : null}
          </div>
          <p className={cn("shrink-0 text-right text-[0.625rem] tabular-nums", line.total === null && "text-stone")}>
            {line.total === null ? "Prix à venir" : formatPrice(line.total)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            onChange={(quantity) => setQuantity(line.slug, line.size, quantity)}
            label={`Quantité — ${line.product.name}, taille ${line.size}`}
          />
          <button
            type="button"
            onClick={() => removeItem(line.slug, line.size)}
            className="text-[0.5625rem] uppercase tracking-[0.18em] text-stone underline-offset-4 transition-colors hover:text-carmine hover:underline"
          >
            Retirer<span className="sr-only"> {line.product.name}, taille {line.size}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
