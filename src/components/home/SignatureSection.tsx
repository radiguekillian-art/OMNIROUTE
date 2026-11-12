import { Figure } from "@/components/editorial/Figure";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { signatureProduct } from "@/data/products";
import { getDictionary } from "@/i18n";
import { availabilityLabel } from "@/lib/availability";
import { formatPrice } from "@/lib/format";

import { PieceAnatomy } from "./PieceAnatomy";

export function SignatureSection() {
  const t = getDictionary().home.signature;
  const product = signatureProduct;
  const [face, , , fermoirs, maille] = product.images;

  return (
    <section aria-labelledby="signature-title" className="bg-white py-24 lg:py-40">
      <div className="container-fadiye grid gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <PieceAnatomy image={face} />
        </Reveal>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
          <Reveal>
            <SectionHeading id="signature-title" eyebrow={t.eyebrow} title={t.title} />
            <p className="prose-fadiye mt-8 max-w-md">{t.text}</p>
            <p className="mt-8 flex items-baseline justify-between gap-6 border-y border-line py-4 text-[0.8125rem]">
              <span className="text-stone">{availabilityLabel(product)}</span>
              <span className={product.price === null ? "text-stone" : "tabular-nums"}>{formatPrice(product.price)}</span>
            </p>
            <ButtonLink href={`/produits/${product.slug}`} className="mt-10 w-full sm:w-auto" arrow>
              {t.cta}
            </ButtonLink>
          </Reveal>

          <Reveal className="mt-16 grid grid-cols-2 gap-4 lg:mt-24" delay={150}>
            <Figure
              src={fermoirs.src}
              alt={fermoirs.alt}
              background={fermoirs.background}
              sizes="(min-width: 1024px) 16vw, 45vw"
              caption="Fermoirs argentés"
            />
            <Figure
              src={maille.src}
              alt={maille.alt}
              background={maille.background}
              sizes="(min-width: 1024px) 16vw, 45vw"
              caption="Maille et côtes"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
