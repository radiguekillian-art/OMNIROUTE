"use client";

import Link from "next/link";
import { useRef } from "react";

import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { CloseIcon } from "@/components/ui/icons";
import { mainNav, siteConfig } from "@/config/site";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/format";

type MobileMenuProps = { open: boolean; onClose: () => void; isActive: (href: string) => boolean };

export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, openCart } = useCart();
  useModal(open, onClose, ref);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      data-open={open}
      className={cn("overlay fixed inset-0 z-50 flex flex-col bg-paper lg:hidden", open ? "opacity-100" : "opacity-0")}
    >
      <div className="container-fadiye flex h-16 shrink-0 items-center justify-between">
        <Link href="/" onClick={onClose} aria-label="FADIYE — accueil" className="-ml-1 py-2">
          <Logo className="w-[118px]" sizes="118px" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="-mr-3 grid h-11 w-11 place-items-center"
          aria-label="Fermer le menu"
        >
          <CloseIcon size={22} />
        </button>
      </div>

      <nav aria-label="Navigation mobile" className="container-fadiye flex flex-1 flex-col justify-center pb-10">
        <ul className="space-y-2">
          {mainNav.map((item, index) => (
            <li
              key={item.href}
              className={cn(
                "transition-[opacity,transform] duration-700 ease-[var(--ease-couture)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group flex items-baseline gap-5 py-2"
              >
                <span className="eyebrow w-6 text-stone">0{index + 1}</span>
                <span className="display text-[2.75rem] transition-colors group-hover:text-carmine group-aria-[current=page]:italic">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-fadiye flex shrink-0 flex-wrap items-center gap-x-8 gap-y-3 border-t border-line py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          className="eyebrow"
          onClick={() => {
            onClose();
            openCart();
          }}
        >
          Panier ({count})
        </button>
        {siteConfig.social.instagram ? (
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="eyebrow">
            Instagram
          </a>
        ) : null}
        {siteConfig.contact.email ? (
          <a href={`mailto:${siteConfig.contact.email}`} className="eyebrow">
            Nous écrire
          </a>
        ) : null}
      </div>
    </div>
  );
}
