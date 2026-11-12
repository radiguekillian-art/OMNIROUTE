import Image from "next/image";

import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { signatureProduct, type Product } from "@/data/products";
import { cn } from "@/lib/format";

import { ProductCard } from "./ProductCard";

const noteSpan: Record<number, string> = { 1: "sm:col-span-1 lg:col-span-2", 2: "sm:col-span-2 lg:col-span-1" };

/**
 * Grille produits. Tant que le catalogue compte moins de trois pièces,
 * une note éditoriale (photographie réelle, aucun faux produit) complète
 * la ligne ; elle disparaît d'elle-même quand la collection s'étoffe.
 */
export function ProductGrid({ items, emptyMessage }: { items: Product[]; emptyMessage?: string }) {
  if (items.length === 0) {
    return <p className="prose-fadiye py-24 text-center">{emptyMessage ?? "Aucune pièce dans cette sélection pour le moment."}</p>;
  }

  const etiquette = signatureProduct.images[5];

  return (
    <ul className="grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      {items.map((product, index) =>
        index < 3 ? (
          // Première ligne : animation CSS immédiate (pas d'attente du JavaScript → LCP rapide).
          <li key={product.slug} className="animate-rise" style={{ animationDelay: `${index * 100}ms` }}>
            <ProductCard product={product} priority />
          </li>
        ) : (
          <Reveal as="li" key={product.slug} delay={(index % 3) * 100}>
            <ProductCard product={product} />
          </Reveal>
        ),
      )}

      {items.length < 3 ? (
        <Reveal as="li" delay={150} className={cn("hidden sm:block", noteSpan[items.length])}>
          <div className="flex h-full flex-col justify-between gap-10 bg-ink p-8 text-white lg:p-12">
            <div>
              <p className="eyebrow text-silver">Collection 01 — Automne / Hiver</p>
              <p className="display mt-6 max-w-md text-[clamp(1.25rem,1.8vw,1.75rem)] leading-[1.15]">
                Une première pièce, et tous les codes de la maison.
              </p>
            </div>
            <div className="overflow-hidden" style={{ backgroundColor: etiquette.background }}>
              <Image src={etiquette.src} alt={etiquette.alt} sizes="(min-width: 1024px) 56vw, 47vw" className="h-auto w-full" />
            </div>
            <TextLink href="/la-maison" className="text-white hover:text-carmine">
              La Maison
            </TextLink>
          </div>
        </Reveal>
      ) : null}
    </ul>
  );
}
