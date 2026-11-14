import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const DESCRIPTION_MAX = 155;
/** Site-wide social card (app/opengraph-image.tsx). Pages with their own opengraph-image file override it. */
const DEFAULT_SOCIAL_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name };

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Shortens on a word boundary so search snippets never end mid-word. */
export function truncate(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[.,;:–-]+$/, "")}…`;
}

interface PageSeo {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/** Metadata for an indexable public page: unique title and description, canonical URL, Open Graph and Twitter card. */
export function buildMetadata({ title, description, path, type = "website" }: PageSeo): Metadata {
  const summary = truncate(description);
  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: { type, title, description: summary, url: absoluteUrl(path), siteName: siteConfig.name, locale: "en_IN", images: [DEFAULT_SOCIAL_IMAGE] },
    twitter: { card: "summary_large_image", title, description: summary, images: [DEFAULT_SOCIAL_IMAGE.url] },
  };
}

/** For sign-in and workspace routes: crawlers should neither index nor follow them. */
export const privateMetadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

type JsonLd = Record<string, unknown>;

export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.contactEmail,
});

export const websiteJsonLd = (): JsonLd => ({ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url });

export const breadcrumbJsonLd = (trail: { name: string; path: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
});

export const faqJsonLd = (faqs: { question: string; answer: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
});

export const courseJsonLd = (course: { name: string; description: string; path: string }): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.name,
  description: course.description,
  url: absoluteUrl(course.path),
  provider: { "@type": "EducationalOrganization", name: siteConfig.name, url: siteConfig.url },
});

export const articleJsonLd = (article: { headline: string; description: string; path: string }): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.headline,
  description: article.description,
  mainEntityOfPage: absoluteUrl(article.path),
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
});
