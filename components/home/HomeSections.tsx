import Link from "next/link";
import { ArrowUpRight, Award, BadgeCheck, BarChart3, FileText, FolderKanban, GitBranch, MessageSquareText, Mic, Workflow } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconBadge, SectionHeader } from "@/components/ui/marketing-primitives";
import { Motion, Stagger } from "@/components/ui/motion/Motion";

/* ---------------- Bento: what the program gives you ---------------- */

function BentoCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoFeatures() {
  return (
    <section className="relative border-y border-line bg-ink-50/70 py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid mask-radial opacity-70" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Inside the program"
          title="Everything a working BA needs. Nothing filler."
          highlight="Nothing filler."
          description="Built around the deliverables, tools and conversations that fill a real Business Analyst's week."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Motion className="h-full md:col-span-4">
            <BentoCard className="bg-gradient-to-br from-white to-primary-50/60">
              <IconBadge icon={MessageSquareText} variant="brand" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Line-by-line mentor review</h3>
              <p className="mt-2 max-w-md text-ink-500">
                Practising senior BAs review your BRDs, stories and models the way a lead BA would on a live project — then you revise.
              </p>
              <div className="mt-8 space-y-2.5">
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                  <span className="mt-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 font-mono text-[11px] text-amber-700">BRD §3.1</span>
                  <p className="text-sm text-ink-600">&ldquo;Fast checkout&rdquo; isn&apos;t testable. What&apos;s the measurable target, and who signs it off?</p>
                </div>
                <div className="ml-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <span className="mt-0.5 rounded-md bg-emerald-100 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700">Revised</span>
                  <p className="text-sm text-emerald-900">Checkout completes in ≤ 60 seconds for 90% of guest sessions. Owner: Head of E-commerce.</p>
                </div>
              </div>
            </BentoCard>
          </Motion>

          <Motion className="h-full md:col-span-2" delay={80}>
            <BentoCard className="bg-ink-950 text-white">
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-500/30 blur-3xl" />
              <IconBadge icon={BarChart3} variant="dark" />
              <h3 className="relative mt-6 text-2xl font-semibold tracking-tight">Readiness you can see</h3>
              <p className="relative mt-2 text-ink-400">Progress is tracked as evidence, not video minutes.</p>
              <div className="relative mt-8 space-y-4">
                {[
                  ["Requirements", 100],
                  ["Process modeling", 80],
                  ["Agile delivery", 65],
                  ["SQL & data", 40],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-ink-300">{label}</span>
                      <span className="tabular-nums text-ink-500">{value}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-accent-400" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </Motion>

          <Motion className="h-full md:col-span-2" delay={120}>
            <BentoCard>
              <IconBadge icon={Workflow} variant="outline" />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">Realistic scenarios</h3>
              <p className="mt-2 text-[15px] text-ink-500">Checkout optimisation, a CRM data migration and a field-worker app MVP — with personas, constraints and conflicting asks.</p>
            </BentoCard>
          </Motion>

          <Motion className="h-full md:col-span-2" delay={160}>
            <BentoCard>
              <IconBadge icon={GitBranch} variant="outline" />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">Tools, not slides</h3>
              <p className="mt-2 text-[15px] text-ink-500">Work in Jira, Confluence, BPMN modelers, SQL and Excel — the stack you&apos;ll meet in week one of the job.</p>
            </BentoCard>
          </Motion>

          <Motion className="h-full md:col-span-2" delay={200}>
            <BentoCard>
              <IconBadge icon={Mic} variant="outline" />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">Interview rehearsal</h3>
              <p className="mt-2 text-[15px] text-ink-500">Practise scenario questions and walk an interviewer through your own portfolio, with feedback.</p>
            </BentoCard>
          </Motion>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Curriculum journey ---------------- */

const curriculum = [
  { weeks: "Weeks 1–2", title: "BA Foundations", body: "The role, the SDLC and how BAs create business value.", href: "/ba-foundations" },
  { weeks: "Weeks 3–4", title: "Requirements Engineering", body: "Elicitation, specification, validation and traceability.", href: "/requirements-engineering" },
  { weeks: "Weeks 5–6", title: "Agile Business Analysis", body: "Backlogs, INVEST stories and Gherkin acceptance criteria.", href: "/agile-ba" },
  { weeks: "Weeks 7–8", title: "Process Modeling", body: "BPMN 2.0, as-is and to-be, gap analysis.", href: "/process-analysis" },
  { weeks: "Weeks 9–10", title: "Data Analysis", body: "SQL and Excel for validation, reconciliation and insight.", href: "/data-analysis" },
  { weeks: "Weeks 11–13", title: "Capstone & Career", body: "An end-to-end project, portfolio and interview prep.", href: "/projects" },
];

export function CurriculumTimeline() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Curriculum"
            title="Six modules. One structured path."
            highlight="One structured path."
            description="A deliberate progression from first principles to an end-to-end capstone."
            align="left"
          />
          <Link href="/curriculum" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
            Full curriculum <ArrowUpRight size={16} />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {curriculum.map((module, index) => (
            <Link key={module.title} href={module.href} className="group relative flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-ink-50/80">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl italic leading-none text-primary-200 transition-colors duration-300 group-hover:text-primary-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-500">{module.weeks}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">{module.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink-500">{module.body}</p>
              <ArrowUpRight
                size={18}
                className="absolute bottom-8 right-8 text-ink-300 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-600 group-hover:opacity-100"
              />
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Portfolio deliverables (dark) ---------------- */

const deliverables = [
  { icon: FileText, title: "Business Requirements Document", meta: "Checkout optimisation · 14 pages" },
  { icon: Workflow, title: "As-is & to-be BPMN models", meta: "CRM migration · 2 diagrams" },
  { icon: FolderKanban, title: "Backlog with acceptance criteria", meta: "Field-worker MVP · 18 stories" },
  { icon: GitBranch, title: "Requirements traceability matrix", meta: "Capstone · 42 requirements" },
];

export function PortfolioShowcase() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-radial" />
      <div aria-hidden className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-primary-600/25 blur-[140px]" />
      <div className="container relative grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="Your portfolio"
            title="Leave with the evidence, not just a certificate."
            highlight="the evidence,"
            description="Hiring managers ask, “Show me something you’ve written.” You’ll have a portfolio of reviewed, industry-standard deliverables ready to walk through."
            align="left"
            tone="dark"
          />
          <Stagger className="mt-10 space-y-3">
            {deliverables.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-primary-400/40 hover:bg-white/[0.06]"
              >
                <IconBadge icon={item.icon} variant="dark" size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-ink-500">{item.meta}</p>
                </div>
                <BadgeCheck size={18} className="text-accent-300" />
              </div>
            ))}
          </Stagger>
        </div>

        <Motion animation="slide-up" delay={150}>
          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-full w-full rotate-[-4deg] rounded-[1.75rem] border border-white/10 bg-white/[0.03] lg:block" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-8 text-ink-900 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.9)] sm:p-10">
              <div className="flex items-center justify-between border-b border-line pb-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">BRD · v1.3 · Approved</p>
                  <p className="mt-1 text-lg font-semibold">Guest Checkout Optimisation</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">Mentor signed-off</span>
              </div>
              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <p className="font-semibold">1. Business objective</p>
                  <p className="mt-1.5 leading-6 text-ink-500">Reduce guest checkout abandonment by simplifying address capture and payment selection.</p>
                </div>
                <div>
                  <p className="font-semibold">2. Scope</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-emerald-50/70 p-3 text-[13px] text-emerald-900">
                      <span className="font-semibold">In</span> · Delivery step, address lookup, saved addresses
                    </div>
                    <div className="rounded-xl bg-ink-50 p-3 text-[13px] text-ink-600">
                      <span className="font-semibold">Out</span> · Loyalty, returns, marketplace sellers
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">3. Functional requirements</p>
                  <div className="mt-2 overflow-hidden rounded-xl border border-line">
                    {[
                      ["REQ-031", "System shall list addresses matching a valid postcode", "Must"],
                      ["REQ-032", "System shall offer to save the address on confirmation", "Should"],
                      ["REQ-034", "System shall show an inline error for unmatched postcodes", "Must"],
                    ].map(([id, text, priority]) => (
                      <div key={id} className="grid grid-cols-[72px_1fr_56px] items-center gap-2 border-b border-line px-3 py-2.5 text-[12.5px] last:border-0">
                        <span className="font-mono text-primary-600">{id}</span>
                        <span className="text-ink-600">{text}</span>
                        <span className="text-right font-medium text-ink-900">{priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
}

/* ---------------- Program facts ---------------- */

const facts = [
  { value: "13", unit: "weeks", label: "From foundations to a finished capstone" },
  { value: "6", unit: "modules", label: "Sequenced like a real BA's growth" },
  { value: "3", unit: "scenarios", label: "Realistic practice projects with personas" },
  { value: "1", unit: "certificate", label: "Verifiable online with a unique code" },
];

export function ProgramFacts() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Motion key={fact.unit} delay={index * 80} className="bg-white p-8 md:p-10">
              <p className="flex items-baseline gap-2">
                <span className="text-6xl font-semibold tracking-[-0.05em] text-ink-900 md:text-7xl">{fact.value}</span>
                <span className="font-display text-2xl italic text-primary-500">{fact.unit}</span>
              </p>
              <p className="mt-4 text-[15px] leading-6 text-ink-500">{fact.label}</p>
            </Motion>
          ))}
        </div>
        <Motion className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-line bg-gradient-to-r from-primary-50 via-white to-white p-6 sm:flex-row sm:items-center md:p-8">
          <div className="flex items-center gap-4">
            <IconBadge icon={Award} variant="brand" />
            <div>
              <p className="font-semibold text-ink-900">Every certificate is publicly verifiable</p>
              <p className="text-sm text-ink-500">Employers can confirm your credential and the evidence behind it in seconds.</p>
            </div>
          </div>
          <Link href="/certification" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
            How certification works <ArrowUpRight size={16} />
          </Link>
        </Motion>
      </div>
    </section>
  );
}
