import type { Metadata } from "next";
import { ChangelogPage } from "@/components/public/ChangelogPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Changelog and release notes",
    description: "Every BA Upskill platform release: new features, improvements, fixes and security updates, newest first.",
    path: "/changelog",
  }),
  alternates: { canonical: "/changelog", types: { "application/rss+xml": "/changelog/feed.xml" } },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Changelog", path: "/changelog" }])} />
      <ChangelogPage />
    </>
  );
}
