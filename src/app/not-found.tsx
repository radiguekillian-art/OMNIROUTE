import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-fadiye flex min-h-[64svh] flex-col items-start justify-center gap-8 py-24">
      <p className="eyebrow flex items-center gap-4 text-stone">
        <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
        Erreur 404
      </p>
      <h1 className="display text-[clamp(1.75rem,4.4vw,3.75rem)]">Page introuvable.</h1>
      <p className="prose-fadiye max-w-md">La page que vous cherchez n’existe pas ou a été déplacée.</p>
      <ButtonLink href="/" arrow>
        Retour à l’accueil
      </ButtonLink>
    </section>
  );
}
