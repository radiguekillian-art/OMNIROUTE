import { NextResponse, type NextRequest } from "next/server";

import { commerce } from "@/config/commerce";
import { siteConfig } from "@/config/site";
import { getProduct, isPurchasable } from "@/data/products";
import { createCheckoutSession, isPaymentConfigured, type CheckoutLine } from "@/lib/payments";

/**
 * Création d'une session de paiement.
 * - Les prix sont TOUJOURS relus depuis le catalogue serveur (jamais ceux du client).
 * - Sans prestataire configuré : 503, aucun paiement simulé.
 */
export async function POST(request: NextRequest) {
  if (!isPaymentConfigured()) {
    return NextResponse.json(
      { code: "payment_not_configured", message: "Le paiement en ligne n'est pas encore activé." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const items = (body as { items?: unknown })?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return NextResponse.json({ message: "Panier invalide." }, { status: 400 });
  }

  const lines: CheckoutLine[] = [];
  for (const item of items) {
    const { slug, size, quantity } = (item ?? {}) as { slug?: unknown; size?: unknown; quantity?: unknown };
    if (typeof slug !== "string" || typeof size !== "string" || typeof quantity !== "number") {
      return NextResponse.json({ message: "Panier invalide." }, { status: 400 });
    }
    const product = getProduct(slug);
    if (!product || !isPurchasable(product, size) || product.price === null) {
      return NextResponse.json(
        { code: "not_purchasable", message: "Une pièce de votre panier n'est pas disponible à la vente." },
        { status: 409 },
      );
    }
    const qty = Math.floor(quantity);
    if (qty < 1 || qty > commerce.maxQuantityPerLine) {
      return NextResponse.json({ message: "Quantité invalide." }, { status: 400 });
    }
    lines.push({
      name: product.name,
      description: `Taille ${size}`,
      unitAmount: product.price,
      quantity: qty,
      imageUrl: siteConfig.url.startsWith("https://") ? `${siteConfig.url}${product.images[0].src.src}` : null,
      metadata: { slug: product.slug, size },
    });
  }

  const origin = request.nextUrl.origin;
  try {
    const session = await createCheckoutSession({
      lines,
      currency: commerce.currency,
      successUrl: `${origin}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/panier`,
      allowedCountries: commerce.shipping.allowedCountries,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json({ message: "Le paiement n'a pas pu être initialisé. Veuillez réessayer." }, { status: 502 });
  }
}
