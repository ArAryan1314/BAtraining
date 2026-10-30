import { StatCard } from "@/components/dashboard/StatCard";

export function MetricSection({ metrics, title, description }: { metrics: { id?: string; label: string; value: string | number; trend?: string; hint?: string; icon?: React.ComponentType<{ size?: number; className?: string }> }[]; title?: string; description?: string }) {
  return (
    <section className="container py-16">
      {(title || description) && (
        <div className="max-w-2xl mb-8">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, i) => <StatCard key={metric.id || i} label={metric.label} value={metric.value} trend={metric.trend} hint={metric.hint} icon={metric.icon}/>)}
      </div>
    </section>
  );
}
