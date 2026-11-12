import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/editorial/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getActiveCategories, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Collection",
  description: "La collection FADIYE : Collection 01 — Automne / Hiver. Mailles, broderies calligraphiques et finitions argentées.",
  alternates: { canonical: "/collection" },
};

type CollectionPageProps = { searchParams: Promise<{ categorie?: string | string[] }> };

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const { categorie } = await searchParams;
  const activeCategories = getActiveCategories();
  const requested = typeof categorie === "string" ? categorie : null;
  const current = activeCategories.some((category) => category.id === requested) ? requested : null;
  const items = getProductsByCategory(current);

  const filters = [{ id: null, label: "Tout" }, ...activeCategories];

  return (
    <>
      <PageHeader
        eyebrow="Collection 01 — Automne / Hiver"
        title="Collection"
        aside={
          <p className="eyebrow text-stone">
            {items.length} pièce{items.length > 1 ? "s" : ""}
          </p>
        }
      />

      <div className="container-fadiye pb-24 lg:pb-40">
        <nav aria-label="Filtrer par catégorie" className="mb-12 border-y border-line lg:mb-16">
          <ul className="no-scrollbar -mx-1 flex gap-8 overflow-x-auto px-1 py-4">
            {filters.map((filter) => {
              const active = filter.id === current;
              return (
                <li key={filter.label} className="shrink-0">
                  <Link
                    href={filter.id ? `/collection?categorie=${filter.id}` : "/collection"}
                    aria-current={active ? "page" : undefined}
                    scroll={false}
                    className={cn("eyebrow link-underline py-1 transition-colors", active ? "text-ink" : "text-stone hover:text-ink")}
                  >
                    {filter.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ProductGrid items={items} />
      </div>
    </>
  );
}
