export type CertificateStatus = "DRAFT" | "ISSUED" | "REVOKED";

export interface CertificateSummary {
  id: string;
  title: string;
  verificationCode: string;
  status: CertificateStatus;
  issuedAt: Date | null;
}
