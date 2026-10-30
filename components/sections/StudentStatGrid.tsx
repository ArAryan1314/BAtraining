import type { ComponentProps } from "react";
import { StatCard } from "@/components/dashboard";

type StatItem = ComponentProps<typeof StatCard>;

export function StudentStatGrid({ stats }: { stats: StatItem[] }) {
  return <section aria-label="Student metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
  </section>;
}
