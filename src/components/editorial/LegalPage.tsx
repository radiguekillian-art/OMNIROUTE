import type { Metadata } from "next";
import Link from "next/link";

import { legalNav } from "@/config/site";
import { legalDocuments, type LegalDocument } from "@/content/legal";
import { cn } from "@/lib/format";

export function legalMetadata(slug: LegalDocument["slug"]): Metadata {
  const doc = legalDocuments[slug];
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${slug}` },
    // Un brouillon n'a pas vocation à être indexé.
    robots: doc.draft ? { index: false, follow: true } : undefined,
  };
}

export function LegalPage({ slug }: { slug: LegalDocument["slug"] }) {
  const doc = legalDocuments[slug];

  return (
    <div className="container-fadiye grid gap-12 pb-24 pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-40 lg:pt-24">
      <aside className="lg:col-span-3">
        <nav aria-label="Informations légales" className="lg:sticky lg:top-[108px]">
          <p className="eyebrow text-stone">Informations</p>
          <ul className="mt-6 space-y-3">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === `/${slug}` ? "page" : undefined}
                  className={cn(
                    "link-underline text-[0.6875rem] transition-colors",
                    item.href === `/${slug}` ? "text-ink" : "text-stone hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="lg:col-span-7 lg:col-start-5">
        <h1 className="display text-[clamp(1.375rem,3vw,2.5rem)] leading-[1.1]">{doc.title}</h1>
        {doc.updatedAt ? <p className="mt-6 text-[0.625rem] text-stone">Mise à jour : {doc.updatedAt}</p> : null}

        {doc.draft ? (
          <p role="note" className="mt-10 border-l border-carmine bg-white px-5 py-4 copy text-stone">
            Document en cours de rédaction. Les sections marquées « À compléter » seront publiées après validation.
          </p>
        ) : null}

        <div className="mt-14 space-y-12">
          {doc.sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`section-${index}`}>
              <h2 id={`section-${index}`} className="eyebrow flex gap-4">
                <span className="text-carmine">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="prose-fadiye mt-4 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className={paragraph.startsWith("[À compléter]") ? "text-silver" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
