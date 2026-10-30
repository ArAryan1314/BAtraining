import { Card } from "@/components/ui/Card";

export function ChartCard({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <Card className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">{title}</h3>{subtitle && <p className="mt-1 text-xs text-ink-500">{subtitle}</p>}</div>{action}</div><div className="mt-6">{children}</div></Card>;
}
