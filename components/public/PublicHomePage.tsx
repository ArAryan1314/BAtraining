import { HomeHero } from "@/components/home/HomeHero";
import { ToolMarquee } from "@/components/home/ToolMarquee";
import { Workbench } from "@/components/home/Workbench";
import { BentoFeatures, CurriculumTimeline, PortfolioShowcase, ProgramFacts } from "@/components/home/HomeSections";
import { TopicFaq } from "@/components/topic/TopicSections";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { getTopic } from "@/content/topics";

export function PublicHomePage() {
  const faqs = getTopic("faq")?.faqs.slice(0, 6) ?? [];

  return (
    <>
      <HomeHero />
      <ToolMarquee />
      <Workbench />
      <BentoFeatures />
      <CurriculumTimeline />
      <PortfolioShowcase />
      <ProgramFacts />
      {faqs.length > 0 && <TopicFaq faqs={faqs} />}
      <CtaBand />
    </>
  );
}
