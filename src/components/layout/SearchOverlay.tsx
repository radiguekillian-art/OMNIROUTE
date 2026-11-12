"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";

import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { getCategoryLabel } from "@/data/categories";
import { products } from "@/data/products";
import { useModal } from "@/hooks/useModal";
import { availabilityLabel } from "@/lib/availability";
import { cn, formatPrice } from "@/lib/format";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const index = products.map((product) => ({
  product,
  haystack: normalize(
    [product.name, product.tagline, product.description, getCategoryLabel(product.category), ...product.features].join(" "),
  ),
}));

const suggestions = ["Cardigan", "Maille", "Broderie", "Boutons"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const inputId = useId();
  useModal(open, onClose, ref);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index.filter(({ haystack }) => terms.every((term) => haystack.includes(term))).map(({ product }) => product);
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="overlay fixed inset-0 z-50" data-open={open} inert={!open}>
      <div
        className={cn("absolute inset-0 bg-ink/30 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
        className={cn(
          "absolute inset-x-0 top-0 max-h-[100svh] overflow-y-auto bg-paper transition-transform duration-700 ease-[var(--ease-couture)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container-fadiye py-6 lg:py-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-stone">Recherche</p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-3 grid h-11 w-11 place-items-center hover:text-carmine"
              aria-label="Fermer la recherche"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-6 lg:mt-10">
            <label htmlFor={inputId} className="sr-only">
              Rechercher une pièce
            </label>
            <div className="flex items-center gap-4 border-b border-ink pb-3">
              <SearchIcon size={24} className="shrink-0" />
              <input
                id={inputId}
                data-autofocus
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une pièce"
                autoComplete="off"
                enterKeyHint="search"
                className="display w-full bg-transparent text-xl outline-none placeholder:text-silver lg:text-3xl"
              />
            </div>
          </form>

          <div className="mt-8 min-h-24 pb-4" aria-live="polite">
            {!hasQuery ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow mr-2 text-stone">Suggestions</span>
                {suggestions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="border border-line px-4 py-2 text-[1.0625rem] transition-colors hover:border-ink"
                  >
                    {term}
                  </button>
                ))}
              </div>
            ) : results.length === 0 ? (
              <p className="prose-fadiye">Aucune pièce ne correspond à « {query.trim()} ».</p>
            ) : (
              <>
                <p className="eyebrow mb-6 text-stone">
                  {results.length} résultat{results.length > 1 ? "s" : ""}
                </p>
                <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                  {results.map((product) => (
                    <li key={product.slug}>
                      <Link href={`/produits/${product.slug}`} onClick={onClose} className="group block">
                        <div className="overflow-hidden" style={{ backgroundColor: product.images[0].background }}>
                          <Image
                            src={product.images[0].src}
                            alt=""
                            sizes="(min-width: 1024px) 18vw, 45vw"
                            className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <p className="eyebrow mt-4">{product.name}</p>
                        <p className="mt-1 text-[1.0625rem] text-stone">
                          {product.price === null ? availabilityLabel(product) : formatPrice(product.price)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
