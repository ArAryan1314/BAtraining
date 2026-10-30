import { LayoutDashboard } from "lucide-react";
import { EmptyState } from "@/components/ui";

export function EmptyDashboard({ action }: { action?: React.ReactNode }) { return <EmptyState icon={LayoutDashboard} title="Your workspace is ready" description="Connect a course, cohort or learner dataset to populate this dashboard." action={action} />; }
