import type { Metadata } from "next";
import { ContactPage } from "@/components/public/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to an advisor about the BA Upskill program, prerequisites and the next cohort.",
};

export default function Page() {
  return <ContactPage />;
}
