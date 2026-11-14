import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export const metadata: Metadata = privateMetadata;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="ADMIN">{children}</WorkspaceLayout>;
}
