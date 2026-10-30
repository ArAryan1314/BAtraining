import { ArrowRight, Check, CircleDot, FileText, GitBranch, MessageSquare, Workflow } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { DarkBackdrop } from "@/components/ui/marketing-primitives";
import { Motion } from "@/components/ui/motion/Motion";

const modules = [
  { label: "BA Foundations", state: "done" },
  { label: "Requirements", state: "done" },
  { label: "Agile BA", state: "active" },
  { label: "Process Modeling", state: "todo" },
  { label: "Data & SQL", state: "todo" },
  { label: "Capstone", state: "todo" },
] as const;

function ReadinessRing({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <defs>
        <linearGradient id="ring" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--color-primary-400)" />
          <stop offset="100%" stopColor="var(--color-accent-400)" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="7" />
      <circle cx="40" cy="40" r={r} fill="none" stroke="url(#ring)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
    </svg>
  );
}

/** Stylised product preview: the learner workspace with a story under mentor review. */
function WorkspacePreview() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div aria-hidden className="absolute -inset-x-20 -top-20 bottom-0 rounded-full bg-primary-600/25 blur-[100px]" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/70 p-1.5 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.8)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mx-auto hidden rounded-full border border-white/10 bg-white/5 px-4 py-1 font-mono text-[11px] text-ink-400 sm:block">
            app.baupskill.com/workspace/checkout-optimisation
          </span>
        </div>

        <div className="grid gap-1.5 rounded-[1.4rem] bg-ink-950/80 p-1.5 md:grid-cols-[220px_1fr_260px]">
          {/* Sidebar */}
          <aside className="hidden rounded-2xl bg-white/[0.03] p-4 md:block">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">Your path</p>
            <ul className="mt-4 space-y-1">
              {modules.map((m) => (
                <li
                  key={m.label}
                  className={
                    m.state === "active"
                      ? "flex items-center gap-2.5 rounded-lg bg-primary-500/15 px-2.5 py-2 text-[13px] font-medium text-white ring-1 ring-primary-400/30"
                      : "flex items-center gap-2.5 px-2.5 py-2 text-[13px] text-ink-400"
                  }
                >
                  {m.state === "done" ? (
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  ) : m.state === "active" ? (
                    <CircleDot size={16} className="text-accent-300" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-white/15" />
                  )}
                  {m.label}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main: user story */}
          <div className="rounded-2xl bg-white/[0.03] p-5 text-left sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-primary-500/15 px-2 py-0.5 font-mono text-[11px] text-primary-200">CHK-142</span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-ink-400">User story</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> In mentor review
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-xl">Guest checkout with saved address lookup</h3>
            <p className="mt-2 text-sm leading-6 text-ink-400">
              <span className="text-ink-200">As a</span> returning guest shopper, <span className="text-ink-200">I want</span> to find my address by postcode{" "}
              <span className="text-ink-200">so that</span> I can complete checkout in under a minute.
            </p>
            <div className="mt-5 rounded-xl border border-white/10 bg-ink-950/60 p-4 font-mono text-[12px] leading-6">
              <p>
                <span className="text-primary-300">Given</span> <span className="text-ink-300">a guest on the delivery step</span>
              </p>
              <p>
                <span className="text-primary-300">When</span> <span className="text-ink-300">they enter a valid postcode</span>
              </p>
              <p>
                <span className="text-primary-300">Then</span> <span className="text-ink-300">matching addresses are listed within 1s</span>
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Workflow, label: "To-be checkout.bpmn" },
                { icon: FileText, label: "BRD §4.2" },
                { icon: GitBranch, label: "RTM: REQ-031" },
              ].map((link) => (
                <span key={link.label} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[12px] text-ink-300">
                  <link.icon size={13} className="text-accent-300" /> {link.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: readiness + review */}
          <div className="hidden flex-col gap-1.5 md:flex">
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 text-left">
              <div className="relative">
                <ReadinessRing value={68} />
                <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">68%</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">Job readiness</p>
                <p className="text-[12px] text-ink-500">11 of 16 evidence items</p>
              </div>
            </div>
            <div className="flex-1 rounded-2xl bg-white/[0.03] p-4 text-left">
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
                <MessageSquare size={12} /> Mentor feedback
              </p>
              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[12px] leading-5 text-ink-300">
                  Strong story. Add a negative path: what happens when the postcode returns no matches?
                </p>
                <p className="mt-2 text-[11px] text-ink-500">Senior BA reviewer · 2h ago</p>
              </div>
              <div className="mt-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-[12px] leading-5 text-emerald-200">AC-3 added for the no-match case.</p>
                <p className="mt-2 text-[11px] text-ink-500">You · just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <DarkBackdrop />
      <div className="container relative text-center">
        <Motion animation="fade-in">
          <Link
            href="/program"
            className="group mx-auto inline-flex items-center gap-2 rounded-full shimmer-border py-1 pl-1 pr-4 text-sm text-ink-300"
          >
            <span className="rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-semibold text-primary-200">New cohort</span>
            <span className="hidden sm:inline">Enrolment is open for the 13-week program</span>
            <span className="sm:hidden">Enrolment now open</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Motion>

        <Motion animation="blur-in" delay={80}>
          <h1 className="mx-auto mt-8 max-w-5xl text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[6.25rem]">
            Become the analyst every team{" "}
            <span className="font-display font-normal italic tracking-[-0.01em] text-gradient">wants to hire.</span>
          </h1>
        </Motion>

        <Motion animation="slide-up" delay={200}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ink-300 md:text-xl">
            Learn how real Business Analysts discover, analyse, model and deliver — then prove it with a portfolio of mentor-reviewed BRDs, user stories and process models.
          </p>
        </Motion>

        <Motion animation="slide-up" delay={300}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="glow" size="xl">
              Start your application <ArrowRight size={18} className="transition-transform group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/curriculum" variant="glass" size="xl">
              Explore the curriculum
            </ButtonLink>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500">
            {["Mentor-reviewed work", "Real-world scenarios", "Verifiable certificate"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check size={14} className="text-accent-400" /> {item}
              </span>
            ))}
          </p>
        </Motion>

        <Motion animation="slide-up" delay={450} className="mt-16 md:mt-24">
          <WorkspacePreview />
        </Motion>
      </div>
    </section>
  );
}
