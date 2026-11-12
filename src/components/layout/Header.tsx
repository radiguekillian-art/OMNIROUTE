"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/format";

import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#contenu"
        className="eyebrow fixed left-4 top-3 z-[60] -translate-y-20 bg-ink px-4 py-3 text-white transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b bg-paper/92 backdrop-blur-md transition-colors duration-500",
          scrolled ? "border-line" : "border-transparent",
        )}
      >
        <div className="container-fadiye relative flex h-16 items-center justify-between gap-6 lg:h-[76px]">
          <Link href="/" aria-label="FADIYE — accueil" className="relative -ml-1 block shrink-0 py-2">
            <Logo className="w-[118px] lg:w-[150px]" priority sizes="(min-width: 1024px) 150px, 118px" />
          </Link>

          <nav aria-label="Navigation principale" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-12">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="eyebrow link-underline py-1 transition-colors hover:text-carmine"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="-mr-3 flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid h-11 w-11 place-items-center transition-colors hover:text-carmine"
              aria-label="Rechercher"
              aria-haspopup="dialog"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center transition-colors hover:text-carmine"
              aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
              aria-haspopup="dialog"
            >
              <BagIcon size={22} />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-1/2 top-[25px] -translate-x-1/2 text-[0.5625rem] font-semibold tabular-nums transition-opacity",
                  hydrated && count > 0 ? "opacity-100" : "opacity-0",
                )}
              >
                {count}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center transition-colors hover:text-carmine lg:hidden"
              aria-label="Ouvrir le menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-16 lg:h-[76px]" />

      <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
