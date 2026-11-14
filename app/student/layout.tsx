import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export const metadata: Metadata = privateMetadata;

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="STUDENT">{children}</WorkspaceLayout>;
}
