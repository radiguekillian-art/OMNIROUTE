import { Figure } from "@/components/editorial/Figure";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { signatureProduct } from "@/data/products";
import { getDictionary } from "@/i18n";

/** Le lys araignée, symbole secondaire, présenté à travers le bouton signature. */
export function ButtonSection() {
  const t = getDictionary().home.buttons;
  const bouton = signatureProduct.images[2];

  return (
    <section aria-labelledby="buttons-title" className="bg-paper py-24 lg:py-40">
      <div className="container-fadiye grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4 lg:col-start-2">
          <SectionHeading
            id="buttons-title"
            eyebrow={t.eyebrow}
            title={t.title}
            titleClassName="text-[clamp(2.25rem,3.8vw,3.75rem)] leading-[1.02]"
          />
          <p className="prose-fadiye mt-8 max-w-sm">{t.text}</p>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <Figure
            src={bouton.src}
            alt={bouton.alt}
            background={bouton.background}
            sizes="(min-width: 1520px) 720px, (min-width: 1024px) 48vw, 100vw"
            caption="Bouton argenté — lys araignée en relief"
          />
        </Reveal>
      </div>
    </section>
  );
}
