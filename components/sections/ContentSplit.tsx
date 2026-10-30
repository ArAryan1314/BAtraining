export function ContentSplit({ eyebrow, title, description, visual, imageSrc, imageAlt, reverse = false, reversed = false }: { eyebrow?: string; title: string; description: string; visual?: React.ReactNode; imageSrc?: string; imageAlt?: string; reverse?: boolean; reversed?: boolean }) {
  const isReversed = reverse || reversed;
  return (
    <section className="container py-16">
      <div className={"grid gap-8 lg:grid-cols-2 lg:items-center " + (isReversed ? "lg:[&>*:first-child]:order-2" : "")}>
        <div>
          {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">{eyebrow}</div>}
          <h2 className="mt-2">{title}</h2>
          <p className="mt-4">{description}</p>
        </div>
        <div>
          {visual ? visual : imageSrc ? <img src={imageSrc} alt={imageAlt || ""} className="rounded-xl shadow-xl w-full object-cover" /> : null}
        </div>
      </div>
    </section>
  );
}
