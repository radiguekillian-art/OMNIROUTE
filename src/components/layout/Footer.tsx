import Image from "next/image";
import Link from "next/link";

import fondLys from "@/assets/images/ambiance/fond-lys-rouges-flou.jpg";
import { Logo } from "@/components/brand/Logo";
import { legalNav, mainNav, siteConfig } from "@/config/site";

/** Pied de page sur fond flouté de lys rouges. */
export function Footer() {
  const { email } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const year = new Date().getFullYear();
  const link = "link-underline text-[1.1875rem] text-white/90 transition-colors hover:text-white";

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={fondLys}
        alt=""
        aria-hidden="true"
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 scale-110 object-cover"
      />
      {/* Assombrit le fond pour garder le logo rouge et le texte parfaitement lisibles. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/80" />

      <div className="container-fadiye grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="FADIYE — accueil" className="inline-block">
            <Logo className="w-[200px] lg:w-[260px]" sizes="260px" />
          </Link>
          <p className="mt-8 max-w-xs text-[1.5rem] leading-snug text-white/85">L’élégance dans le détail.</p>
        </div>

        <nav aria-label="Navigation du pied de page" className="lg:col-span-2 lg:col-start-6">
          <h2 className="eyebrow text-silver">Maison</h2>
          <ul className="mt-6 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-silver">Contact</h2>
          <ul className="mt-6 space-y-3">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className={`${link} break-all`}>
                  {email}
                </a>
              </li>
            ) : (
              <li>
                <Link href="/contact" className={link}>
                  Nous contacter
                </Link>
              </li>
            )}
            {instagram ? (
              <li>
                <a href={instagram} target="_blank" rel="noreferrer" className={link}>
                  Instagram
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <nav aria-label="Informations légales" className="lg:col-span-3">
          <h2 className="eyebrow text-silver">Informations</h2>
          <ul className="mt-6 space-y-3">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-fadiye flex flex-col gap-3 border-t border-white/15 py-6 text-[1rem] text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} <span className="font-sans text-[0.6875rem]">FADIYE</span>. Tous droits réservés.
        </p>
        <p className="eyebrow text-white/70">Collection 01 — Automne / Hiver</p>
      </div>
    </footer>
  );
}
