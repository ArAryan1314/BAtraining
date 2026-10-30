import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="ADMIN">{children}</WorkspaceLayout>;
}
