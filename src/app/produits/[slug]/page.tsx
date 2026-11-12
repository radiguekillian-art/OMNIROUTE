import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { commerce, pendingCopy } from "@/config/commerce";
import { siteConfig } from "@/config/site";
import { getCategoryLabel } from "@/data/categories";
import { getCollection, getProduct, products } from "@/data/products";
import { sizeGuides } from "@/data/size-guide";
import { availabilityLabel } from "@/lib/availability";
import { cn, formatPrice } from "@/lib/format";

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const image = product.images[0].src;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      title: `${product.name} — FADIYE`,
      description: product.tagline,
      images: [{ url: image.src, width: image.width, height: image.height, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const category = getCategoryLabel(product.category);

  const availability =
    product.status === "available"
      ? "https://schema.org/InStock"
      : product.status === "sold-out"
        ? "https://schema.org/SoldOut"
        : "https://schema.org/PreOrder";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: { "@type": "Brand", name: "FADIYE" },
          image: product.images.map((image) => `${siteConfig.url}${image.src.src}`),
          ...(product.price !== null
            ? {
                offers: {
                  "@type": "Offer",
                  price: (product.price / 100).toFixed(2),
                  priceCurrency: commerce.currency,
                  availability,
                  url: `${siteConfig.url}/produits/${product.slug}`,
                },
              }
            : {}),
        }}
      />

      <div className="container-fadiye pb-24 pt-6 lg:pb-32 lg:pt-10">
        <nav aria-label="Fil d’Ariane" className="mb-6 lg:mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-stone">
            <li>
              <Link href="/collection" className="link-underline hover:text-ink">
                Collection
              </Link>
            </li>
            {category ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/collection?categorie=${product.category}`} className="link-underline hover:text-ink">
                    {category}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[108px]">
              <p className="eyebrow flex items-center gap-4 text-stone">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
                {collection.title} — {collection.season}
              </p>
              <h1 className="display mt-5 text-[clamp(2.75rem,4.2vw,4rem)]">{product.name}</h1>

              <div className="mt-6 flex items-baseline justify-between gap-6 border-y border-line py-4">
                <p className={cn("text-[0.9375rem]", product.price === null ? "text-stone" : "tabular-nums")}>
                  {formatPrice(product.price)}
                </p>
                <p className="eyebrow text-stone">{availabilityLabel(product)}</p>
              </div>

              <p className="prose-fadiye mt-8">{product.description}</p>

              <div className="mt-10">
                <PurchasePanel slug={product.slug} sizeGuide={sizeGuides[product.slug]} />
              </div>

              <div className="mt-12 border-t border-line">
                <Accordion title="Caractéristiques" defaultOpen>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.8em] inline-block h-px w-3 shrink-0 bg-carmine" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Composition et entretien">
                  <p>{product.composition ?? pendingCopy.composition}</p>
                  <p className="mt-2">{product.care ?? pendingCopy.care}</p>
                </Accordion>
                <Accordion title="Livraison">
                  <p>{commerce.shipping.summary ?? pendingCopy.shipping}</p>
                  {commerce.shipping.details.map((line) => (
                    <p key={line} className="mt-2">
                      {line}
                    </p>
                  ))}
                  <Link href="/livraison-retours" className="mt-3 inline-block text-ink underline underline-offset-4">
                    Livraison et retours
                  </Link>
                </Accordion>
                <Accordion title="Retours">
                  <p>{commerce.returns.summary ?? pendingCopy.returns}</p>
                  {commerce.returns.details.map((line) => (
                    <p key={line} className="mt-2">
                      {line}
                    </p>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
