import { CertificateVerification } from "@/components/common/CertificateVerification";
import { verifyCertificate } from "@/services/certificates";

export default async function CertificateVerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CertificateVerification certificate={await verifyCertificate(code)} />;
}
