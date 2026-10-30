import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/topic/TopicPage";
import { getTopic, topicSlugs } from "@/content/topics";

export const dynamicParams = false;

export function generateStaticParams() {
  return topicSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <TopicPage topic={topic} />;
}
