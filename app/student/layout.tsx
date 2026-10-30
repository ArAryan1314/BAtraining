import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="STUDENT">{children}</WorkspaceLayout>;
}
