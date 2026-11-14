import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";
import { CertificateVerification } from "@/components/common/CertificateVerification";
import { verifyCertificate } from "@/services/certificates";

export const metadata: Metadata = { title: "Verify a certificate", ...privateMetadata };

export default async function CertificateVerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CertificateVerification certificate={await verifyCertificate(code)} />;
}
