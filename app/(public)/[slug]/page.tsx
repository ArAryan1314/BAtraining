import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TopicPage } from "@/components/topic/TopicPage";
import { getTopic, topicSlugs, type TopicContent } from "@/content/topics";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, courseJsonLd, faqJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return topicSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return buildMetadata({ title: topic.title, description: topic.summary, path: `/${topic.slug}`, type: topic.category === "learn" ? "website" : "article" });
}

function structuredData(topic: TopicContent) {
  const path = `/${topic.slug}`;
  const main = topic.category === "learn"
    ? courseJsonLd({ name: topic.title, description: topic.summary, path })
    : articleJsonLd({ headline: topic.title, description: topic.summary, path });
  return [
    main,
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: topic.title, path }]),
    ...(topic.faqs.length ? [faqJsonLd(topic.faqs)] : []),
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return (
    <>
      <JsonLd data={structuredData(topic)} />
      <TopicPage topic={topic} />
    </>
  );
}
