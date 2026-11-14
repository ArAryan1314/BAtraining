import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TopicArt, type ArtScene } from "@/components/illustrations";
import { SectionHeader } from "@/components/ui/marketing-primitives";
import { Stagger } from "@/components/ui/motion/Motion";

const audiences: { title: string; from: string; body: string; href: string; cta: string; scene: ArtScene }[] = [
  {
    title: "Career switchers",
    from: "From operations, support, QA or finance",
    body: "You already understand how a business runs. Learn to turn that into requirements, process models and a portfolio a hiring manager can read.",
    href: "/roadmap",
    cta: "See the roadmap",
    scene: "path",
  },
  {
    title: "Recent graduates",
    from: "Starting your first analyst role search",
    body: "Start from the foundations and build up to real deliverables, so your first interview is about work you have actually done.",
    href: "/ba-foundations",
    cta: "Start with the foundations",
    scene: "growth",
  },
  {
    title: "Junior analysts",
    from: "Already in the role, ready to lead",
    body: "Move from taking notes to writing requirements that developers can build from and stakeholders will sign off.",
    href: "/requirements-engineering",
    cta: "Sharpen your requirements",
    scene: "documents",
  },
  {
    title: "Project and product people",
    from: "Project managers, product owners and testers",
    body: "Add structured analysis to what you already do, from backlog refinement to acceptance criteria that hold up.",
    href: "/agile-ba",
    cta: "Explore Agile BA",
    scene: "dashboard",
  },
];

/** Who the program is for, one illustrated card per audience, each linking to the page that suits them. */
export function AudienceSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <SectionHeader eyebrow="Who it's for" title="Built for people changing how they work." highlight="changing how they work." description="Four common starting points, and where each one should begin." />
        <Stagger className="mt-16 grid gap-5 md:grid-cols-2" itemClassName="h-full">
          {audiences.map((audience) => (
            <Link key={audience.title} href={audience.href} className="ui-card-link group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-soft">
              <TopicArt scene={audience.scene} seed={audience.title} flush />
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">{audience.from}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">{audience.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-ink-500">{audience.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
                  {audience.cta}
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
