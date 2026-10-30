import { Clock, Mail, MessagesSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { DarkBackdrop, Eyebrow, IconBadge } from "@/components/ui/marketing-primitives";
import { Motion } from "@/components/ui/motion/Motion";
import { TopicFaq } from "@/components/topic/TopicSections";
import { getTopic } from "@/content/topics";
import { ContactForm } from "./ContactForm";

const channels = [
  { icon: Mail, title: "Email admissions", body: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
  { icon: Clock, title: "Response time", body: `We reply within ${siteConfig.responseTime}.` },
  { icon: MessagesSquare, title: "Advisor call", body: "Prefer to talk? Ask for a 20-minute call in your message." },
];

export function ContactPage() {
  const faqs = getTopic("faq")?.faqs.slice(0, 5) ?? [];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <DarkBackdrop />
        <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Motion animation="blur-in">
            <Eyebrow tone="dark">Admissions</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Let&apos;s talk about your{" "}
              <span className="font-display font-normal italic tracking-normal text-gradient">BA career.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-ink-300">
              Tell us where you are today and where you want to be. An advisor will help you decide whether the program is the right fit — no hard sell.
            </p>
            <ul className="mt-12 space-y-5">
              {channels.map((channel) => (
                <li key={channel.title} className="flex items-start gap-4">
                  <IconBadge icon={channel.icon} variant="dark" size="sm" />
                  <div>
                    <p className="font-semibold text-white">{channel.title}</p>
                    {channel.href ? (
                      <a href={channel.href} className="text-ink-400 underline-offset-4 hover:text-white hover:underline">
                        {channel.body}
                      </a>
                    ) : (
                      <p className="text-ink-400">{channel.body}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Motion>

          <Motion animation="slide-up" delay={150}>
            <ContactForm email={siteConfig.contactEmail} />
          </Motion>
        </div>
      </section>
      {faqs.length > 0 && <TopicFaq faqs={faqs} large />}
    </>
  );
}
