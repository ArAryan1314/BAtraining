import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout role="TRAINER">{children}</WorkspaceLayout>;
}
