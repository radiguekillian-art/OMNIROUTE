import { LegalPage, legalMetadata } from "@/components/editorial/LegalPage";

export const metadata = legalMetadata("cgv");

export default function Page() {
  return <LegalPage slug="cgv" />;
}
