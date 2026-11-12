import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonSection } from "@/components/home/ButtonSection";
import { DropSection } from "@/components/home/DropSection";
import { Hero } from "@/components/home/Hero";
import { IdentitySection } from "@/components/home/IdentitySection";
import { SignatureSection } from "@/components/home/SignatureSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const sameAs = siteConfig.social.instagram ? [siteConfig.social.instagram] : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "FADIYE",
          url: siteConfig.url,
          logo: `${siteConfig.url}/icon.png`,
          ...(sameAs ? { sameAs } : {}),
        }}
      />
      <Hero />
      <DropSection />
      <SignatureSection />
      <ButtonSection />
      <IdentitySection />
    </>
  );
}
