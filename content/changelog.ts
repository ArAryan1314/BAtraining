export type ChangeType = "added" | "improved" | "fixed" | "security";

export interface ChangelogEntry {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: string;
  summary: string;
  changes: { type: ChangeType; text: string }[];
}

/** Newest first. Add an entry here for every release; the page, feed and sitemap pick it up. */
export const changelog: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2026-11-14",
    title: "Safer sign-in and search-ready pages",
    summary: "Sign-in is harder to attack, the server checks its own configuration, and every public page now ships with the metadata search engines and social previews need.",
    changes: [
      { type: "security", text: "Sign-in is throttled after five failed attempts, and unknown emails take as long to reject as wrong passwords." },
      { type: "security", text: "Content-Security-Policy and HSTS headers, plus a route guard in front of every workspace." },
      { type: "added", text: "Unique titles, descriptions, canonical links, Open Graph cards and structured data on every public page." },
      { type: "added", text: "Sitemap, robots rules, 1200x630 social preview images and a public changelog with an RSS feed." },
      { type: "improved", text: "Student, trainer and admin dashboards each have their own layout, with a What's new card linking here." },
      { type: "improved", text: "Learning tracks, career guides, resources and platform pages each have their own page structure." },
      { type: "added", text: "A reading-progress bar and a back-to-top button with a progress ring on every page." },
      { type: "improved", text: "The sign-in page has a show-password toggle and returns you to the page you were trying to reach." },
      { type: "improved", text: "One corner radius and one set of hover, active and focus states across the whole site." },
      { type: "improved", text: "The health endpoint now checks the database and reports 503 when it is unreachable." },
      { type: "fixed", text: "Certificates are issued once even when two lessons finish at the same moment." },
      { type: "fixed", text: "New modules and lessons no longer share a position after something was deleted." },
      { type: "fixed", text: "Email addresses with stray spaces are accepted when creating a user." },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-10-31",
    title: "Student, trainer and admin workspaces",
    summary: "Every role now has a working workspace: learning and assessments for students, grading and cohorts for trainers, and publishing and reporting for admins.",
    changes: [
      { type: "added", text: "Student dashboard, course outline, lessons, quizzes, assignments, projects, certificates and notifications." },
      { type: "added", text: "Trainer cohorts, grading queue, project reviews and reports." },
      { type: "added", text: "Admin users, course and lesson editor with draft and publish, assessments, payments record and settings." },
      { type: "added", text: "Automatic certificates on course completion, with public verification by code." },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-31",
    title: "Platform foundation",
    summary: "The design system, public site, authentication with role-based access, and the PostgreSQL data model.",
    changes: [
      { type: "added", text: "Public marketing site with 38 topic pages across learning, career, resources and platform." },
      { type: "added", text: "Credentials sign-in with student, trainer and admin roles." },
      { type: "added", text: "Prisma schema for courses, progress, assessments, projects, certificates and payments." },
    ],
  },
];

export const latestRelease = changelog[0];
