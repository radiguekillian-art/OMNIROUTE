import { LegalPage, legalMetadata } from "@/components/editorial/LegalPage";

export const metadata = legalMetadata("mentions-legales");

export default function Page() {
  return <LegalPage slug="mentions-legales" />;
}
