export const productRoadmap = [
  { version: "V4", name: "Global UI System", phase: "Phase 4", status: "FOUNDATION" },
  { version: "V5", name: "Application Shell + Authentication + RBAC", phase: "Phase 3", status: "SCAFFOLD" },
  { version: "V6", name: "Student LMS", phase: "Phase 5 + Phase 7", status: "SCAFFOLD" },
  { version: "V7", name: "Trainer Workspace", phase: "Phase 7", status: "SCAFFOLD" },
  { version: "V8", name: "Admin Workspace", phase: "Phase 12", status: "SCAFFOLD" },
  { version: "V9", name: "Progress Engine", phase: "Phase 7", status: "FOUNDATION" },
  { version: "V10", name: "Course / Content Builder", phase: "Phase 6", status: "FOUNDATION" },
  { version: "V11", name: "Assessments + Projects", phase: "Phase 8 + Phase 9", status: "FOUNDATION" },
  { version: "V12", name: "Certificates + Notifications", phase: "Phase 11", status: "FOUNDATION" },
  { version: "V13", name: "Analytics + Payments", phase: "Phase 12 + Phase 14", status: "FOUNDATION" },
] as const;

export const engineeringPhases = [
  { number: 1, name: "Clean v2 baseline", outcome: "Stable component foundation and fixed barrel exports." },
  { number: 2, name: "PostgreSQL + Prisma", outcome: "Production-ready relational domain model and Prisma workflow." },
  { number: 3, name: "Authentication", outcome: "Typed session contract and role-aware guards." },
  { number: 4, name: "Global Design System", outcome: "Reusable UI primitives, composition sections and class recipes." },
  { number: 5, name: "Student Data Model", outcome: "Profiles, enrollments, skills and learning records." },
  { number: 6, name: "Course CMS", outcome: "Programs, courses, versions and content blocks." },
  { number: 7, name: "Learning Engine", outcome: "Progress events, calculations and learning services." },
  { number: 8, name: "Quiz / Assessment Engine", outcome: "Questions, attempts, scoring and readiness foundation." },
  { number: 9, name: "Projects + Submissions", outcome: "Capstone projects, milestones, submissions and evidence." },
  { number: 10, name: "Skills + Evidence", outcome: "Skill taxonomy, proficiency and linked evidence." },
  { number: 11, name: "Portfolio + Certificates", outcome: "Learner portfolio and certificate verification foundation." },
  { number: 12, name: "Admin Analytics", outcome: "Platform metrics, operational reporting and payment summaries." },
  { number: 13, name: "Security Hardening", outcome: "RBAC, audit logs, secure headers and validation gates." },
  { number: 14, name: "Vercel + Production", outcome: "Deployment configuration and external provider integration points." },
] as const;

export type EngineeringPhase = (typeof engineeringPhases)[number];
