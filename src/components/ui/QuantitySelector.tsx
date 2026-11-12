"use client";

import { commerce } from "@/config/commerce";
import { cn } from "@/lib/format";

import { MinusIcon, PlusIcon } from "./icons";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

export function QuantitySelector({ value, onChange, label = "Quantité", size = "md", className }: QuantitySelectorProps) {
  const max = commerce.maxQuantityPerLine;
  const box = size === "sm" ? "h-9 w-9" : "h-12 w-12";

  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center border border-line bg-white", className)}>
      <button
        type="button"
        className={cn(box, "grid place-items-center text-ink transition-colors hover:bg-paper disabled:opacity-30")}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Diminuer la quantité"
      >
        <MinusIcon size={14} />
      </button>
      <output aria-live="polite" aria-label={`${label} : ${value}`} className="min-w-8 text-center text-[0.6875rem] tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={cn(box, "grid place-items-center text-ink transition-colors hover:bg-paper disabled:opacity-30")}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
