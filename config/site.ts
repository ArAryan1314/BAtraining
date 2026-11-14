/** Public-site identity. Update the contact details before going live. */
export const siteConfig = {
  name: "BA Upskill",
  tagline: "Become a job-ready Business Analyst",
  description: "A mentor-led, project-based Business Analyst program. Learn requirements, process modeling, Agile delivery and data analysis by building a real portfolio.",
  contactEmail: "admissions@baupskill.com",
  responseTime: "one working day",
  /** Canonical origin used for canonical links, the sitemap and structured data. */
  url: (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, ""),
} as const;
