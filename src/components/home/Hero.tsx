import Image from "next/image";
import type { CSSProperties } from "react";

import { ButtonLink, TextLink } from "@/components/ui/Button";
import { signatureProduct } from "@/data/products";
import { getDictionary } from "@/i18n";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const t = getDictionary().home.hero;
  const image = signatureProduct.images[0];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-canvas">
      <div className="container-fadiye grid lg:min-h-[calc(100svh-76px)] lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 order-2 flex flex-col justify-center pb-16 pt-6 lg:order-1 lg:col-span-5 lg:py-20">
          <p className="eyebrow animate-rise flex items-center gap-4 text-stone" style={delay(100)}>
            <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
            {t.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="display animate-rise mt-7 text-[clamp(3.4rem,7.4vw,8rem)] lg:-mr-24"
            style={delay(200)}
          >
            L’élégance
            <br />
            dans le <em className="font-light italic">détail.</em>
          </h1>
          <p
            className="animate-rise mt-8 max-w-[23rem] text-[0.9375rem] leading-[1.75] text-stone"
            style={delay(350)}
          >
            {t.subtitle}
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-10 gap-y-6" style={delay(450)}>
            <ButtonLink href="/collection" arrow>
              {t.cta}
            </ButtonLink>
            <TextLink href={`/produits/${signatureProduct.slug}`}>La pièce signature</TextLink>
          </div>
        </div>

        <div className="relative order-1 -mx-5 h-[min(54svh,560px)] sm:-mx-8 sm:h-[70svh] lg:order-2 lg:col-span-7 lg:mx-0 lg:h-auto">
          <Image
            src={image.src}
            alt={image.alt}
            priority
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="animate-fade object-cover object-[50%_38%]"
            style={delay(0)}
          />
          <p className="eyebrow absolute right-5 top-6 text-stone sm:right-8 lg:right-0 lg:top-10">N° 01</p>
          <p className="absolute bottom-5 left-5 hidden text-[0.75rem] tracking-[0.04em] text-stone sm:left-8 sm:block lg:bottom-10 lg:left-8">
            <span className="eyebrow mr-3 text-ink">{signatureProduct.name}</span>
            Maille noire, broderie calligraphique rouge
          </p>
        </div>
      </div>
    </section>
  );
}
