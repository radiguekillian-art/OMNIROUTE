import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/data/products";
import { cn } from "@/lib/format";

import { PieceAnatomy } from "./PieceAnatomy";

/** Placement en grille : image et texte alternent de côté d'un détail à l'autre. */
function imageColumns(landscape: boolean, reversed: boolean) {
  if (reversed) return landscape ? "lg:order-2 lg:col-span-7 lg:col-start-6" : "lg:order-2 lg:col-span-5 lg:col-start-7 lg:max-w-[440px]";
  return landscape ? "lg:col-span-7" : "lg:col-span-5 lg:col-start-2 lg:max-w-[440px] lg:justify-self-end";
}

function textColumns(landscape: boolean, reversed: boolean) {
  if (reversed) return landscape ? "lg:order-1 lg:col-span-4 lg:col-start-1" : "lg:order-1 lg:col-span-4 lg:col-start-2";
  return landscape ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-4 lg:col-start-8";
}

/** Section « Spécificités » de la fiche produit : anatomie annotée puis chaque détail illustré. */
export function ProductSpecifics({ product }: { product: Product }) {
  return (
    <section id="specificites" aria-labelledby="specificites-title" className="scroll-mt-16 bg-white py-20 lg:scroll-mt-[76px] lg:py-32">
      <div className="container-fadiye">
        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-4 text-stone">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
            {product.name}
          </p>
          <h2 id="specificites-title" className="display mt-6 text-[clamp(2rem,4.4vw,4rem)]">
            Les <em>spécificités</em>
          </h2>
          <p className="prose-fadiye mt-6 max-w-xl">{product.description}</p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <PieceAnatomy image={product.images[0]} />
        </Reveal>

        <ol className="mt-20 space-y-20 lg:mt-32 lg:space-y-28">
          {product.details.map((detail, index) => {
            const image = product.images[detail.image];
            const reversed = index % 2 === 1;
            const landscape = image.src.width / image.src.height > 1.15;
            return (
              <Reveal as="li" key={detail.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
                <div className={cn("w-full sm:max-lg:w-2/3", imageColumns(landscape, reversed))}>
                  <div className="overflow-hidden" style={{ backgroundColor: image.background }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      placeholder="blur"
                      sizes={landscape ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 640px) 66vw, 100vw"}
                      className={cn("h-auto w-full", !landscape && "aspect-[4/5] object-cover")}
                    />
                  </div>
                </div>
                <div className={textColumns(landscape, reversed)}>
                  <p className="eyebrow text-carmine">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-4 text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1]">{detail.title}</h3>
                  <p className="prose-fadiye mt-5 max-w-sm">{detail.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-24 border-t border-line pt-10 lg:mt-32">
          <h3 className="eyebrow">Caractéristiques</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-baseline gap-3 text-[0.625rem]">
                <span aria-hidden="true" className="inline-block h-px w-3 shrink-0 translate-y-[-0.2em] bg-carmine" />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
