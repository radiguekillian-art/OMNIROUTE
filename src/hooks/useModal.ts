"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lockCount = 0;

/**
 * Comportement commun des panneaux modaux (menu, recherche, panier, guide,
 * visionneuse) : focus piégé, fermeture avec Échap, défilement bloqué et
 * retour du focus à l'élément d'origine.
 */
export function useModal(open: boolean, onClose: () => void, containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    lockCount += 1;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusFirst = () => {
      const target =
        container?.querySelector<HTMLElement>("[data-autofocus]") ?? container?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus({ preventScroll: true });
    };
    const raf = requestAnimationFrame(focusFirst);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !container) return;
      const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, containerRef]);
}
