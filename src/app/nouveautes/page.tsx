import type { Metadata } from "next";

import { PageHeader } from "@/components/editorial/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getNewProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Nouveautés",
  description: "Les dernières pièces FADIYE.",
  alternates: { canonical: "/nouveautes" },
};

export default function NewArrivalsPage() {
  const items = getNewProducts();

  return (
    <>
      <PageHeader
        eyebrow="Le premier drop"
        title="Nouveautés"
        intro="Les pièces les plus récentes de la maison, à commencer par le cardigan FADIYE."
      />
      <div className="container-fadiye border-t border-line pb-24 pt-12 lg:pb-40 lg:pt-16">
        <ProductGrid items={items} emptyMessage="Aucune nouveauté pour le moment." />
      </div>
    </>
  );
}
