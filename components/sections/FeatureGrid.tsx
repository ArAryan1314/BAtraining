import { Card } from "@/components/ui/Card";
import Link from "next/link";

export function FeatureGrid({ items, columns = 3, title, description }: { items: { id: string; title: string; description: string; icon?: React.ReactNode; href?: string }[]; columns?: 2 | 3 | 4; title?: string; description?: string }) {
  return (
    <section className="container py-16">
      {(title || description) && (
        <div className="max-w-2xl mb-8">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className={"grid gap-4 " + (columns === 2 ? "lg:grid-cols-2" : columns === 4 ? "lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3")}>
        {items.map(item => {
          const cardContent = (
            <Card variant={item.href ? "interactive" : "default"} className="p-5 h-full">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600">{item.icon}</div>
              <h3 className="mt-5 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{item.description}</p>
            </Card>
          );

          if (item.href) {
            return <Link key={item.id} href={item.href} className="block">{cardContent}</Link>;
          }
          return <div key={item.id}>{cardContent}</div>;
        })}
      </div>
    </section>
  );
}
