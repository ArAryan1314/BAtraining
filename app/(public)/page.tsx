import type { Metadata } from "next";
import { PublicHomePage } from "@/components/public/PublicHomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, path: "/" }),
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <PublicHomePage />
    </>
  );
}
