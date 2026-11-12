import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/products";
import { availabilityLabel } from "@/lib/availability";
import { cn, formatPrice } from "@/lib/format";

type ProductCardProps = { product: Product; priority?: boolean; sizes?: string };

/**
 * Carte produit : au survol (ordinateur), la seconde photographie
 * remplace la première en fondu.
 */
export function ProductCard({ product, priority, sizes = "(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw" }: ProductCardProps) {
  const [primary, secondary] = product.images;
  const status = availabilityLabel(product);

  return (
    <article className="group relative">
      <Link href={`/produits/${product.slug}`} className="block">
        <div className="relative overflow-hidden" style={{ backgroundColor: primary.background }}>
          <Image
            src={primary.src}
            alt={primary.alt}
            priority={priority}
            placeholder="blur"
            sizes={sizes}
            className={cn(
              "aspect-[4/5] h-auto w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-couture)] group-hover:scale-[1.02]",
              secondary && "group-hover:opacity-0",
            )}
          />
          {secondary ? (
            <Image
              src={secondary.src}
              alt=""
              aria-hidden="true"
              sizes={sizes}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-couture)] group-hover:opacity-100"
              style={{ backgroundColor: secondary.background }}
            />
          ) : null}
          {product.isNew ? (
            <span className="eyebrow absolute left-4 top-4 text-[0.625rem] text-ink transition-colors group-hover:text-white">
              Nouveauté
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="eyebrow">
              <span className="link-underline group-hover:bg-[length:100%_1px]">{product.name}</span>
            </h3>
            <p className="mt-2 text-[0.8125rem] text-stone">{status}</p>
          </div>
          <p className={cn("shrink-0 text-right text-[0.8125rem]", product.price === null ? "max-w-32 text-stone" : "tabular-nums")}>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
