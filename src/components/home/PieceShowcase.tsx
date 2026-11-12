import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getCollection, signatureProduct } from "@/data/products";
import { availabilityLabel } from "@/lib/availability";
import { formatPrice } from "@/lib/format";

/** La pièce unique de l'accueil : un clic mène à la fiche produit et à ses spécificités. */
export function PieceShowcase() {
  const product = signatureProduct;
  const collection = getCollection(product.collection);
  const [face, broderie] = product.images;
  const href = `/produits/${product.slug}`;

  return (
    <section id="la-piece" aria-labelledby="piece-title" className="scroll-mt-16 bg-canvas py-16 lg:scroll-mt-[76px] lg:py-28">
      <div className="container-fadiye grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <Link href={href} className="group relative block overflow-hidden" aria-label={`Voir ${product.name}`}>
            <Image
              src={face.src}
              alt={face.alt}
              placeholder="blur"
              sizes="(min-width: 1520px) 860px, (min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-couture)] group-hover:scale-[1.02] group-hover:opacity-0"
            />
            <Image
              src={broderie.src}
              alt=""
              aria-hidden="true"
              sizes="(min-width: 1520px) 860px, (min-width: 1024px) 56vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1200ms] ease-[var(--ease-couture)] group-hover:opacity-100"
            />
            <span className="eyebrow absolute bottom-5 left-5 bg-white px-4 py-3 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              Voir la pièce
            </span>
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
          <p className="eyebrow flex items-center gap-4 text-stone">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
            {collection.title} — {collection.season}
          </p>
          <h2 id="piece-title" className="display mt-6 text-[clamp(2rem,3.6vw,3.25rem)]">
            Cardigan <span className="text-carmine">FADIYE</span>
          </h2>
          <p className="prose-fadiye mt-6 max-w-md">{product.tagline}</p>
          <p className="mt-8 flex items-baseline justify-between gap-6 border-y border-line py-4 text-[0.625rem]">
            <span className="text-stone">{availabilityLabel(product)}</span>
            <span className={product.price === null ? "text-stone" : "tabular-nums"}>{formatPrice(product.price)}</span>
          </p>
          <ButtonLink href={href} className="mt-10 w-full sm:w-auto" arrow>
            Découvrir la pièce
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
