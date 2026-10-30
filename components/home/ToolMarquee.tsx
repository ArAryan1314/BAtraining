const tools = [
  "Jira",
  "Confluence",
  "BPMN 2.0",
  "SQL",
  "Excel",
  "Power BI",
  "Miro",
  "Lucidchart",
  "BABOK® v3",
  "Scrum",
  "Gherkin",
  "Figma",
  "Visio",
  "UML",
];

export function ToolMarquee() {
  return (
    <section className="border-b border-line bg-white py-10">
      <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
        The tools and frameworks you will use on the job
      </p>
      <div className="relative mt-7 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...tools, ...tools].map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              aria-hidden={index >= tools.length}
              className="rounded-full border border-line bg-ink-50/70 px-5 py-2.5 text-[15px] font-medium text-ink-600"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
