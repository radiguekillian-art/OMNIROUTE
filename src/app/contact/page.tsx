import type { Metadata } from "next";

import { PageHeader } from "@/components/editorial/PageHeader";
import { Figure } from "@/components/editorial/Figure";
import { siteConfig } from "@/config/site";
import { signatureProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter la maison FADIYE.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const bouton = signatureProduct.images[2];
  const configured = Boolean(email || instagram);

  return (
    <>
      <PageHeader eyebrow="Contact" title="Nous écrire" intro="Une question sur une pièce, une taille ou une commande ? Écrivez à la maison." />

      <div className="container-fadiye grid gap-16 border-t border-line pb-24 pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-40 lg:pt-20">
        <div className="lg:col-span-5">
          {configured ? (
            <dl className="divide-y divide-line border-y border-line">
              {email ? (
                <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="eyebrow text-stone">E-mail</dt>
                  <dd>
                    <a href={`mailto:${email}`} className="display link-underline break-all text-3xl hover:text-carmine">
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {instagram ? (
                <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="eyebrow text-stone">Instagram</dt>
                  <dd>
                    <a href={instagram} target="_blank" rel="noreferrer" className="display link-underline text-3xl hover:text-carmine">
                      Suivre la maison<span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="border-l border-carmine pl-4 text-[0.9375rem] leading-relaxed text-stone">
              Les coordonnées de la maison seront communiquées prochainement.
            </p>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Figure
            src={bouton.src}
            alt={bouton.alt}
            background={bouton.background}
            sizes="(min-width: 1024px) 40vw, 100vw"
            caption="Le bouton signature"
          />
        </div>
      </div>
    </>
  );
}
