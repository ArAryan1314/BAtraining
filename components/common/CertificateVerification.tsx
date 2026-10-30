import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { CertificateStatus } from "@/types/certificate";
import { StatusScreen } from "./StatusScreen";

export function CertificateVerification({ certificate }: { certificate: { title: string; status: CertificateStatus } | null }) {
  const home = <ButtonLink href="/" variant="outline">Back to home</ButtonLink>;

  if (certificate?.status === "ISSUED") {
    return <StatusScreen eyebrow="Verified" title={certificate.title} description={`This certificate is valid and was issued by ${siteConfig.name}.`}>{home}</StatusScreen>;
  }
  if (certificate?.status === "REVOKED") {
    return <StatusScreen eyebrow="Revoked" title={certificate.title} description="This certificate has been revoked and is no longer valid.">{home}</StatusScreen>;
  }
  return <StatusScreen eyebrow="Not found" title="Certificate not found" description="Check the verification code and try again.">{home}</StatusScreen>;
}
