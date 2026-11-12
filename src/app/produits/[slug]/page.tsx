import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecifics } from "@/components/product/ProductSpecifics";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { LockIcon, ReturnIcon, TruckIcon } from "@/components/ui/icons";
import { commerce, pendingCopy } from "@/config/commerce";
import { siteConfig } from "@/config/site";
import { getCategoryLabel } from "@/data/categories";
import { getCollection, getProduct, products } from "@/data/products";
import { sizeGuides } from "@/data/size-guide";
import { availabilityLabel } from "@/lib/availability";
import { cn, formatPrice } from "@/lib/format";
import { isPaymentConfigured } from "@/lib/payments";

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
  const paymentsEnabled = isPaymentConfigured();
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
          <ol className="flex flex-wrap items-baseline gap-2 text-[1.0625rem] text-stone">
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
            <li aria-current="page" className="eyebrow text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[100px]">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="eyebrow flex items-center gap-4 text-stone">
                  <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
                  {collection.title} — {collection.season}
                </p>
                <p className="eyebrow text-stone">N° {collection.number}</p>
              </div>
              <h1 className="display mt-5 text-[clamp(1.875rem,2.8vw,2.625rem)] leading-[1.05]">{product.name}</h1>
              <p className="mt-4 text-[1.375rem] leading-snug text-stone">{product.tagline}</p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-line py-5">
                <p className={cn(product.price === null ? "text-[1.25rem] text-stone" : "text-[1.75rem] tabular-nums")}>
                  {formatPrice(product.price)}
                </p>
                <p className="eyebrow flex items-center gap-2 text-stone">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-1.5 w-1.5 rounded-full",
                      product.status === "available" ? "bg-[#2f7d4f]" : product.status === "sold-out" ? "bg-silver" : "bg-carmine",
                    )}
                  />
                  {availabilityLabel(product)}
                </p>
              </div>

              {product.colors.length > 0 ? (
                <div className="mt-6 flex items-center gap-4">
                  <p className="eyebrow">Coloris</p>
                  <ul className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <li key={color.name} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="inline-block h-5 w-5 rounded-full border border-line ring-1 ring-ink ring-offset-2 ring-offset-paper"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[1.125rem]">{color.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div id="achat" className="mt-8 scroll-mt-24">
                <PurchasePanel slug={product.slug} sizeGuide={sizeGuides[product.slug]} />
              </div>

              <ul className="mt-8 grid grid-cols-3 border-y border-line text-center">
                {[
                  { icon: <TruckIcon />, label: "Livraison", value: commerce.shipping.summary ?? "Bientôt communiquée" },
                  { icon: <ReturnIcon />, label: "Retours", value: commerce.returns.summary ?? "Bientôt communiqués" },
                  {
                    icon: <LockIcon />,
                    label: "Paiement",
                    value: paymentsEnabled ? "Sécurisé par Stripe" : "Bientôt activé",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex flex-col items-center gap-2 border-line px-2 py-5 [&+&]:border-l">
                    <span className="text-ink">{item.icon}</span>
                    <span className="eyebrow">{item.label}</span>
                    <span className="text-[0.9375rem] leading-tight text-stone">{item.value}</span>
                  </li>
                ))}
              </ul>

              <TextLink href="#specificites" className="mt-8">
                Voir les spécificités
              </TextLink>

              <div className="mt-8 border-t border-line">
                <Accordion title="Caractéristiques">
                  <ul className="space-y-1">
                    {product.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Composition et entretien">
                  <p>{product.composition ?? pendingCopy.composition}</p>
                  <p className="mt-2">{product.care ?? pendingCopy.care}</p>
                </Accordion>
                <Accordion title="Livraison et retours">
                  <p>{commerce.shipping.summary ?? pendingCopy.shipping}</p>
                  {commerce.shipping.details.map((line) => (
                    <p key={line} className="mt-2">
                      {line}
                    </p>
                  ))}
                  <p className="mt-2">{commerce.returns.summary ?? pendingCopy.returns}</p>
                  {commerce.returns.details.map((line) => (
                    <p key={line} className="mt-2">
                      {line}
                    </p>
                  ))}
                  <Link href="/livraison-retours" className="mt-3 inline-block text-ink underline underline-offset-4">
                    Livraison et retours
                  </Link>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductSpecifics product={product} />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-fadiye flex flex-col items-center text-center">
          <p className="max-w-3xl text-[clamp(1.875rem,3.4vw,3.25rem)] leading-tight">
            Une signature qui ne ressemble à aucune autre.
          </p>
          <ButtonLink href="#achat" className="mt-14" arrow>
            Choisir ma taille
          </ButtonLink>
        </div>
      </section>

      <StickyBuyBar
        name={product.name}
        priceLabel={product.price === null ? availabilityLabel(product) : formatPrice(product.price)}
      />
    </>
  );
}
