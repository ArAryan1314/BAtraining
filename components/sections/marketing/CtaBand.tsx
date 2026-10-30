import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { DarkBackdrop } from "@/components/ui/marketing-primitives";
import { Motion } from "@/components/ui/motion/Motion";

export function CtaBand({
  title = "Build the skills. Build the evidence.",
  accent = "Build the career.",
  description = "Mentor-reviewed projects, a portfolio of real BA deliverables and a verifiable certificate — in 13 focused weeks.",
}: {
  title?: string;
  accent?: string;
  description?: string;
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <Motion animation="fade-in">
        <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-20 text-center text-white sm:rounded-[2.5rem] md:py-28">
          <DarkBackdrop />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              {title}{" "}
              <span className="font-display font-normal italic tracking-normal text-gradient">{accent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-400">{description}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="light" size="xl">
                Start your application <ArrowRight size={18} className="transition-transform group-hover/button:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/program" variant="glass" size="xl">
                Explore the program
              </ButtonLink>
            </div>
          </div>
        </div>
      </Motion>
    </section>
  );
}
