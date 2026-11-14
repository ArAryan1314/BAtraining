import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getTopic, topicSlugs } from "@/content/topics";
import { truncate } from "@/lib/seo";

export const alt = "BA Upskill topic";
/** 1200x630 is the 1.91:1 ratio used by Open Graph and X large cards. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return topicSlugs.map((slug) => ({ slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #090b11 0%, #1e1b4b 100%)", color: "white" }}>
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#a5b4fc" }}>{topic.eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{topic.title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#cbd5e1" }}>{truncate(topic.summary, 140)}</div>
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8" }}>{siteConfig.name}</div>
      </div>
    ),
    size,
  );
}
