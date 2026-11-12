import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n";

export function IdentitySection() {
  const t = getDictionary().home.identity;

  return (
    <section aria-labelledby="identity-title" className="bg-ink py-24 text-white lg:py-40">
      <div className="container-fadiye">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Logo variant="red" className="w-[min(520px,78vw)]" sizes="(min-width: 768px) 520px, 78vw" />
          <h2 id="identity-title" className="display mt-14 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.04]">
            Une identité. Une signature.
            <br className="hidden sm:block" /> <em className="italic">Une vision.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[0.9375rem] leading-[1.8] text-silver">{t.text}</p>
        </Reveal>

        <ol className="mt-20 grid gap-px border-y border-line-dark sm:grid-cols-3 lg:mt-28">
          {t.codes.map((code, index) => (
            <Reveal as="li" key={code.title} delay={index * 120} className="py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <p className="eyebrow text-carmine">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="display mt-5 text-[1.875rem]">{code.title}</h3>
              <p className="mt-4 max-w-xs text-[0.875rem] leading-[1.75] text-silver">{code.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <Link
            href="/la-maison"
            className="group/text eyebrow inline-flex items-center gap-4 text-white transition-colors hover:text-carmine"
          >
            <span>Découvrir {t.cta}</span>
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 bg-current transition-[width] duration-500 ease-[var(--ease-couture)] group-hover/text:w-14"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
