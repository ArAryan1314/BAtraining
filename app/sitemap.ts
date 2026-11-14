import type { MetadataRoute } from "next";
import { changelog } from "@/content/changelog";
import { topics } from "@/content/topics";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/changelog"), lastModified: changelog[0].date, changeFrequency: "monthly", priority: 0.4 },
    ...topics.map((topic) => ({ url: absoluteUrl(`/${topic.slug}`), changeFrequency: "monthly" as const, priority: topic.category === "learn" ? 0.8 : 0.7 })),
  ];
}
