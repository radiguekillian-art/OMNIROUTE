import type { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/brand/Logo";
import { Figure } from "@/components/editorial/Figure";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { signatureProduct } from "@/data/products";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "La Maison",
  description:
    "FADIYE : une recherche d’équilibre entre caractère, élégance et singularité. Direction artistique, identité visuelle et approche du vêtement.",
  alternates: { canonical: "/la-maison" },
};

const palette = [
  { name: "Noir profond", hex: "#090909", note: "La base de chaque pièce." },
  { name: "Rouge carmin", hex: "#C81025", note: "La signature, posée avec mesure." },
  { name: "Argent", hex: "#B8B8B8", note: "Le métal des fermoirs et des boutons." },
  { name: "Blanc cassé", hex: "#F7F5F2", note: "L’espace qui laisse respirer le détail." },
];

function Chapter({ number, title }: { number: string; title: string }) {
  return (
    <p className="eyebrow flex items-center gap-4 text-stone">
      <span className="text-carmine">{number}</span>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-line" />
      {title}
    </p>
  );
}

export default function MaisonPage() {
  const t = getDictionary().maison;
  const [face, broderie, bouton, fermoirs, maille, etiquette] = signatureProduct.images;

  return (
    <>
      {/* Ouverture */}
      <section className="container-fadiye pb-20 pt-14 lg:pb-32 lg:pt-24">
        <p className="eyebrow animate-rise flex items-center gap-4 text-stone">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
          La Maison
        </p>
        <h1 className="sr-only">La Maison FADIYE</h1>
        <blockquote
          className="animate-rise mt-10 max-w-5xl font-serif text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[1.15] tracking-normal"
          style={{ animationDelay: "120ms" }}
        >
          <p>
            <span className="text-carmine">FADIYE</span> {t.introLead}
          </p>
          <p className="mt-6 text-stone">{t.introRest}</p>
        </blockquote>
      </section>

      {/* I — La signature */}
      <section aria-labelledby="chapitre-signature" className="bg-ink py-24 text-white lg:py-36">
        <div className="container-fadiye grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Logo className="w-full max-w-[640px]" sizes="(min-width: 1024px) 46vw, 90vw" />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-8" delay={120}>
            <p className="eyebrow flex items-center gap-4 text-silver">
              <span className="text-carmine">I</span>
              <span aria-hidden="true" className="inline-block h-px w-8 bg-line-dark" />
              La signature
            </p>
            <h2 id="chapitre-signature" className="display mt-6 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.1]">
              Un nom devenu motif.
            </h2>
            <p className="prose-fadiye mt-8 text-silver">
              La calligraphie FADIYE, ses boucles et ses entrelacs, est le premier code de la maison. Elle n’est pas
              un simple logo : brodée en rouge sur la maille, tissée sur l’étiquette, elle devient un motif à part
              entière.
            </p>
          </Reveal>
        </div>
        <div className="container-fadiye mt-20 grid gap-8 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:col-start-2">
            <Figure
              src={broderie.src}
              alt={broderie.alt}
              background={broderie.background}
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
              caption="La calligraphie brodée"
              tone="light"
            />
          </Reveal>
          <Reveal className="sm:mt-24 lg:col-span-6 lg:col-start-7" delay={120}>
            <Figure
              src={etiquette.src}
              alt={etiquette.alt}
              background={etiquette.background}
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 45vw, 100vw"
              caption="La calligraphie tissée"
              tone="light"
            />
          </Reveal>
        </div>
      </section>

      {/* II — Le détail */}
      <section aria-labelledby="chapitre-detail" className="py-24 lg:py-36">
        <div className="container-fadiye grid gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Chapter number="II" title="Le détail" />
            <h2 id="chapitre-detail" className="display mt-6 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.1]">
              Le métal comme une parure.
            </h2>
            <p className="prose-fadiye mt-8 max-w-sm">
              Fermoirs et boutons argentés ponctuent la pièce comme des bijoux. Sur chaque bouton, le lys araignée
              apparaît en relief : un symbole discret, réservé à ceux qui regardent de près.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
            <Figure
              src={bouton.src}
              alt={bouton.alt}
              background={bouton.background}
              sizes="(min-width: 1520px) 820px, (min-width: 1024px) 56vw, 100vw"
              index="01"
              caption="Bouton signature — lys araignée en relief"
            />
            <div className="mt-8 grid grid-cols-2 gap-8">
              <Figure
                src={fermoirs.src}
                alt={fermoirs.alt}
                background={fermoirs.background}
                sizes="(min-width: 1024px) 27vw, 45vw"
                index="02"
                caption="Fermoirs argentés"
              />
              <div className="flex items-end">
                <p className="font-serif text-[clamp(1.6rem,2.4vw,2.4rem)] font-normal leading-[1.2] tracking-normal text-stone">
                  Le rouge pour la signature, l’argent pour la structure.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* III — La silhouette */}
      <section aria-labelledby="chapitre-silhouette" className="bg-canvas py-24 lg:py-36">
        <div className="container-fadiye grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <div style={{ backgroundColor: face.background }}>
              <Image src={face.src} alt={face.alt} placeholder="blur" sizes="(min-width: 1024px) 46vw, 100vw" className="h-auto w-full" />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-4 lg:col-start-8" delay={120}>
            <Chapter number="III" title="La silhouette" />
            <h2 id="chapitre-silhouette" className="display mt-6 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.1]">
              Une maille noire, une coupe ample.
            </h2>
            <p className="prose-fadiye mt-8 max-w-sm">
              Une silhouette oversize, un col rond et des finitions côtelées : une base sobre et structurée, pensée
              pour laisser toute la place à la signature.
            </p>
            <div className="mt-10 w-1/2">
              <Figure
                src={maille.src}
                alt={maille.alt}
                background={maille.background}
                sizes="(min-width: 1024px) 14vw, 45vw"
                caption="Maille et côtes"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* IV — Les codes */}
      <section aria-labelledby="chapitre-codes" className="py-24 lg:py-36">
        <div className="container-fadiye">
          <Reveal className="max-w-2xl">
            <Chapter number="IV" title="Les codes" />
            <h2 id="chapitre-codes" className="display mt-6 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.1]">
              Quatre couleurs, une identité.
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8">
            {palette.map((color, index) => (
              <Reveal as="li" key={color.hex} delay={index * 100}>
                <div className="aspect-[4/5] border border-line" style={{ backgroundColor: color.hex }} />
                <p className="eyebrow mt-5">{color.name}</p>
                <p className="mt-1 font-sans text-[0.5625rem] uppercase tabular-nums tracking-[0.12em] text-stone">{color.hex}</p>
                <p className="mt-3 max-w-[16rem] copy text-stone">{color.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Clôture */}
      <section className="border-t border-line py-24 lg:py-32">
        <Reveal className="container-fadiye flex flex-col items-center text-center">
          <p className="display max-w-3xl text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.15]">
            Des pièces pensées pour <em>laisser une empreinte.</em>
          </p>
          <ButtonLink href="/collection" className="mt-12" arrow>
            Découvrir la collection
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
