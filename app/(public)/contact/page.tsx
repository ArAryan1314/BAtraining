import type { Metadata } from "next";
import { ContactPage } from "@/components/public/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact an advisor",
  description: "Talk to a BA Upskill advisor about the Business Analyst program, prerequisites, fees and the date of the next cohort.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <ContactPage />
    </>
  );
}
