"use client";

import type { ProductSize } from "@/data/products";
import { cn } from "@/lib/format";

type SizeSelectorProps = {
  sizes: ProductSize[];
  value: string | null;
  onChange: (size: string) => void;
  name: string;
  error?: string | null;
  errorId?: string;
};

/** Sélection de taille : boutons radio natifs (navigation au clavier par flèches). */
export function SizeSelector({ sizes, value, onChange, name, error, errorId }: SizeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Taille"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      className="grid grid-cols-4 gap-2"
    >
      {sizes.map((size) => {
        const soldOut = size.available === false;
        const checked = value === size.label;
        return (
          <label key={size.label} className={cn("relative", soldOut ? "cursor-not-allowed" : "cursor-pointer")}>
            <input
              type="radio"
              name={name}
              value={size.label}
              checked={checked}
              disabled={soldOut}
              onChange={() => onChange(size.label)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-12 items-center justify-center border text-[0.8125rem] tracking-[0.08em] transition-colors duration-300",
                "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-carmine",
                checked ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink",
                soldOut && "border-line bg-transparent text-silver line-through hover:border-line",
                error && !checked && "border-carmine/50",
              )}
            >
              {size.label}
              {soldOut ? <span className="sr-only"> — épuisée</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
