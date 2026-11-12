import { LegalPage, legalMetadata } from "@/components/editorial/LegalPage";

export const metadata = legalMetadata("confidentialite");

export default function Page() {
  return <LegalPage slug="confidentialite" />;
}
