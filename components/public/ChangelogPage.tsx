import { Rss } from "lucide-react";
import { TopicArt } from "@/components/illustrations";
import { Badge } from "@/components/ui";
import { DarkBackdrop, Eyebrow } from "@/components/ui/marketing-primitives";
import { changelog, type ChangeType } from "@/content/changelog";
import { formatDate } from "@/lib/format";

const typeLabel: Record<ChangeType, { label: string; tone: "primary" | "success" | "warning" | "danger" }> = {
  added: { label: "New", tone: "primary" },
  improved: { label: "Improved", tone: "success" },
  fixed: { label: "Fixed", tone: "warning" },
  security: { label: "Security", tone: "danger" },
};

/** Release history as a dated timeline: one column of releases, with the version and date pinned beside each. */
export function ChangelogPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <DarkBackdrop />
        <div className="container relative grid max-w-5xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
          <Eyebrow tone="dark">Changelog</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">What&apos;s new on the platform</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-300">Every release, newest first: what we added, what we improved, and what we fixed.</p>
          <a href="/changelog/feed.xml" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 ui-link-inverse">
            <Rss size={15} /> Subscribe via RSS
          </a>
          </div>
          <TopicArt scene="dashboard" seed="changelog" tone="dark" className="hidden md:block" />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <ol className="container max-w-4xl space-y-14">
          {changelog.map((release) => (
            <li key={release.version} className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-10">
              <div className="md:sticky md:top-28 md:self-start">
                <p className="font-mono text-sm font-semibold text-primary-600">v{release.version}</p>
                <time dateTime={release.date} className="mt-1 block text-sm text-ink-500">{formatDate(new Date(release.date))}</time>
              </div>
              <article id={`v${release.version}`} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{release.title}</h2>
                <p className="mt-2 leading-7 text-ink-500">{release.summary}</p>
                <ul className="mt-6 divide-y divide-line rounded-md border border-line bg-white">
                  {release.changes.map((change) => (
                    <li key={change.text} className="flex items-start gap-3 p-4 text-[15px] leading-6 text-ink-700">
                      <span className="mt-0.5 w-20 shrink-0"><Badge tone={typeLabel[change.type].tone}>{typeLabel[change.type].label}</Badge></span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
