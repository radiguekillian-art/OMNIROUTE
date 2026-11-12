import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { legalNav, mainNav, siteConfig } from "@/config/site";

export function Footer() {
  const { email } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-fadiye grid gap-14 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="FADIYE — accueil" className="inline-block">
            <Logo className="w-[180px] lg:w-[220px]" sizes="220px" />
          </Link>
          <p className="prose-fadiye mt-8 max-w-xs">L&apos;élégance dans le détail.</p>
        </div>

        <nav aria-label="Navigation du pied de page" className="lg:col-span-2 lg:col-start-6">
          <h2 className="eyebrow text-stone">Maison</h2>
          <ul className="mt-6 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-[0.875rem] hover:text-carmine">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-stone">Contact</h2>
          <ul className="mt-6 space-y-3 text-[0.875rem]">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="link-underline break-all hover:text-carmine">
                  {email}
                </a>
              </li>
            ) : (
              <li>
                <Link href="/contact" className="link-underline hover:text-carmine">
                  Nous contacter
                </Link>
              </li>
            )}
            {instagram ? (
              <li>
                <a href={instagram} target="_blank" rel="noreferrer" className="link-underline hover:text-carmine">
                  Instagram
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <nav aria-label="Informations légales" className="lg:col-span-3">
          <h2 className="eyebrow text-stone">Informations</h2>
          <ul className="mt-6 space-y-3">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-[0.875rem] hover:text-carmine">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-fadiye flex flex-col gap-3 border-t border-line py-6 text-[0.75rem] text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} FADIYE. Tous droits réservés.</p>
        <p className="eyebrow text-[0.625rem]">Collection 01 — Automne / Hiver</p>
      </div>
    </footer>
  );
}
