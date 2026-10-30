"use client";

import { useState } from "react";
import { CheckCircle2, FileSignature, Search, Send, Workflow } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/ui/marketing-primitives";
import { Motion } from "@/components/ui/motion/Motion";

const stages = [
  {
    id: "discover",
    title: "Discover",
    icon: Search,
    summary: "Interview stakeholders and frame the problem",
    output: "Stakeholder map",
    tasks: ["Identify stakeholders and their influence", "Run a structured elicitation interview", "Write a one-line problem statement"],
    preview: [
      ["Head of E-commerce", "High influence · High interest"],
      ["Customer Support Lead", "Medium influence · High interest"],
      ["Payments Ops", "High influence · Medium interest"],
    ],
  },
  {
    id: "analyze",
    title: "Analyse",
    icon: FileSignature,
    summary: "Turn conversations into prioritised requirements",
    output: "Requirements backlog",
    tasks: ["Separate needs from solutions", "Resolve conflicting requirements", "Prioritise with MoSCoW"],
    preview: [
      ["REQ-031 Postcode address lookup", "Must"],
      ["REQ-032 Save address for next order", "Should"],
      ["REQ-033 Apple Pay at delivery step", "Could"],
    ],
  },
  {
    id: "model",
    title: "Model",
    icon: Workflow,
    summary: "Map the as-is, design the to-be",
    output: "BPMN process map",
    tasks: ["Map the current checkout in BPMN 2.0", "Find the bottlenecks and hand-offs", "Design the to-be flow"],
    preview: [
      ["As-is: 7 steps, 3 hand-offs", "Baseline"],
      ["To-be: 4 steps, 1 hand-off", "Proposed"],
      ["Gap: manual address entry", "Root cause"],
    ],
  },
  {
    id: "deliver",
    title: "Deliver",
    icon: Send,
    summary: "Specify, refine and accept with the team",
    output: "Stories & acceptance criteria",
    tasks: ["Slice epics into INVEST stories", "Write Gherkin acceptance criteria", "Plan UAT with the business"],
    preview: [
      ["CHK-142 Guest address lookup", "Ready"],
      ["CHK-143 Save address on confirm", "In refinement"],
      ["CHK-144 No-match postcode error", "Ready"],
    ],
  },
];

export function Workbench() {
  const [activeId, setActiveId] = useState(stages[0].id);
  const active = stages.find((s) => s.id === activeId) ?? stages[0];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="How you learn"
          title="Learn the BA workflow by actually doing it."
          highlight="actually doing it."
          description="Every module is anchored in one realistic project. You move through the same four stages a working BA does — and leave each with an artifact."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[400px_1fr]">
          <div role="tablist" aria-label="BA workflow stages" className="flex gap-2 overflow-x-auto hide-scrollbar lg:flex-col">
            {stages.map((stage, index) => {
              const selected = stage.id === activeId;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="workbench-panel"
                  onClick={() => setActiveId(stage.id)}
                  className={cn(
                    "group relative flex min-w-[240px] items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 lg:p-5",
                    selected ? "border-primary-200 bg-white shadow-lift" : "border-transparent hover:bg-ink-50"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-300",
                      selected ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow" : "bg-ink-100 text-ink-500"
                    )}
                  >
                    <stage.icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-ink-400">0{index + 1}</span>
                      <span className="text-lg font-semibold text-ink-900">{stage.title}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-500">{stage.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="workbench-panel"
            role="tabpanel"
            className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-ink-50 to-white p-6 shadow-soft sm:p-10"
          >
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60 mask-radial" />
            <Motion key={active.id} animation="fade-in" className="relative grid gap-8 xl:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-primary-600">You will build</span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900">{active.output}</h3>
                <ul className="mt-6 space-y-3">
                  {active.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-3 text-[15px] text-ink-700">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-semibold text-ink-900">{active.output}</span>
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700">Checkout project</span>
                </div>
                <ul className="space-y-1.5">
                  {active.preview.map(([label, tag], i) => (
                    <Motion as="li" key={label} delay={i * 90} className="flex items-center justify-between gap-3 rounded-xl bg-ink-50 px-3.5 py-3">
                      <span className="text-[13px] font-medium text-ink-800">{label}</span>
                      <span className="shrink-0 rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-ink-500">{tag}</span>
                    </Motion>
                  ))}
                </ul>
              </div>
            </Motion>
          </div>
        </div>
      </div>
    </section>
  );
}
