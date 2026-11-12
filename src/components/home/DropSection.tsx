import { Figure } from "@/components/editorial/Figure";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { signatureProduct } from "@/data/products";
import { getDictionary } from "@/i18n";

export function DropSection() {
  const t = getDictionary().home.drop;
  const [, broderie, , , , etiquette] = signatureProduct.images;

  return (
    <section aria-labelledby="drop-title" className="bg-paper py-24 lg:py-40">
      <div className="container-fadiye">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              id="drop-title"
              eyebrow={t.eyebrow}
              title={
                <>
                  Collection 01
                  <span className="mt-2 block text-[0.55em] italic text-stone">— Automne / Hiver</span>
                </>
              }
            />
          </Reveal>
          <Reveal className="flex flex-col justify-end lg:col-span-5 lg:col-start-8" delay={120}>
            <p className="prose-fadiye max-w-md text-[1rem]">{t.intro}</p>
            <TextLink href="/collection" className="mt-10">
              Voir la collection
            </TextLink>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <Figure
              src={etiquette.src}
              alt={etiquette.alt}
              background={etiquette.background}
              sizes="(min-width: 1520px) 960px, (min-width: 1024px) 64vw, 100vw"
              index="01"
              caption="Étiquette intérieure tissée — calligraphie et lys araignée"
            />
          </Reveal>
          <Reveal className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:col-start-10 lg:mt-24 lg:block" delay={150}>
            <Figure
              src={broderie.src}
              alt={broderie.alt}
              background={broderie.background}
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
              index="02"
              caption="Broderie calligraphique rouge"
            />
            <div className="lg:mt-12">
              <h3 className="display text-[1.75rem] leading-[1.1]">{t.labelTitle}</h3>
              <p className="prose-fadiye mt-4">{t.labelText}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
