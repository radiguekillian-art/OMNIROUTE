"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/format";

/**
 * Barre d'achat mobile : visible tant que le bloc d'achat (#achat) est hors
 * de l'écran, elle y ramène en un geste. Masquée sur ordinateur, où le bloc
 * d'achat reste collé à l'écran.
 */
export function StickyBuyBar({ name, priceLabel }: { name: string; priceLabel: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("achat");
    const footer = document.querySelector("footer");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const seen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => seen.set(entry.target, entry.isIntersecting));
      setVisible(!seen.get(target) && !(footer && seen.get(footer)));
    });
    observer.observe(target);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  function goToPurchase() {
    const target = document.getElementById("achat");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.querySelector<HTMLInputElement>('input[type="radio"]:not(:disabled)')?.focus({ preventScroll: true });
  }

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-couture)] lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="container-fadiye flex items-center justify-between gap-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0">
          <p className="eyebrow truncate">{name}</p>
          <p className="truncate text-[1rem] text-stone">{priceLabel}</p>
        </div>
        <button
          type="button"
          onClick={goToPurchase}
          className="eyebrow min-h-11 shrink-0 bg-ink px-5 text-white transition-colors hover:bg-carmine"
        >
          Choisir ma taille
        </button>
      </div>
    </div>
  );
}
