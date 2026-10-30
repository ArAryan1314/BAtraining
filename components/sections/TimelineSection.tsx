import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function TimelineSection({ items, title, description }: { items: { id: string; title: string; description: string; meta?: string; completed?: boolean; href?: string }[]; title?: string; description?: string }) {
  return (
    <section className="container py-16">
      {(title || description) && (
        <div className="max-w-2xl mb-10">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className="relative space-y-6 before:absolute before:left-[15px] before:top-4 before:h-[calc(100%-32px)] before:w-px before:bg-line">
        {items.map(item => {
          const rowContent = (
            <div className="relative flex gap-4 hover:opacity-80 transition-opacity">
              <div className={"z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-4 ring-surface-muted " + (item.completed ? "bg-success text-white" : "bg-white border border-primary-200 text-primary-600")}>
                {item.completed ? <CheckCircle2 size={16} /> : <span className="h-2 w-2 rounded-full bg-primary-500" />}
              </div>
              <div className="pt-0.5">
                <div className="font-semibold">{item.title}</div>
                <p className="mt-1 text-sm leading-6 text-ink-500">{item.description}</p>
                {item.meta && <div className="mt-2 text-xs font-semibold text-ink-500">{item.meta}</div>}
              </div>
            </div>
          );

          if (item.href) {
            return <Link key={item.id} href={item.href} className="block">{rowContent}</Link>;
          }
          return <div key={item.id}>{rowContent}</div>;
        })}
      </div>
    </section>
  );
}
