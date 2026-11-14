import { TopicArt } from "@/components/illustrations";
import { SectionHeader } from "@/components/ui/marketing-primitives";
import { siteConfig } from "@/config/site";

const steps = [
  { title: "You send your details", body: "Tell us your background and the role you want. Two or three sentences is plenty." },
  { title: `We reply within ${siteConfig.responseTime}`, body: "An advisor answers your questions and, if you'd like, books a 20-minute call." },
  { title: "You decide, with no pressure", body: "We explain the program, the next cohort and what the work involves, so you can choose whether it fits." },
];

/** What happens after someone applies, so the form doesn't feel like a black box. */
export function ContactNextSteps() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeader eyebrow="What happens next" title="From message to decision in three steps" highlight="three steps" align="left" />
          <ol className="mt-10 space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary-200 bg-primary-50 font-mono text-sm font-semibold text-primary-700">{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mt-1 leading-7 text-ink-500">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <TopicArt scene="path" seed="contact-next-steps" className="hidden lg:block" />
      </div>
    </section>
  );
}
