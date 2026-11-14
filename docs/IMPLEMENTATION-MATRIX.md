# BA Training Platform — Unified Implementation Matrix

This document reconciles the product roadmap (V4→V13) with the engineering phases (1→14).

| Product version | Engineering phase(s) | Status in this baseline |
|---|---|---|
| V4 Global UI System | Phase 1 + Phase 4 | Implemented foundation + enforcement |
| V5 Application Shell + Authentication + RBAC | Phase 3 | Shell, RBAC and credentials sign-in implemented |
| V6 Student LMS | Phase 5 + Phase 7 | Dashboard, course outline, lesson view and completion implemented |
| V7 Trainer Workspace | Phase 7 | Cohorts, grading, project reviews and reports implemented |
| V8 Admin Workspace | Phase 12 | Users, publishing, enrolment, reports and settings implemented |
| V9 Progress Engine | Phase 7 | Event model + calculator + service foundation |
| V10 Course / Content Builder | Phase 6 | Course and lesson editor with draft and publish implemented |
| V11 Assessments + Projects | Phase 8 + Phase 9 | Quizzes, assignments, grading and project reviews implemented |
| V12 Certificates + Notifications | Phase 11 | Automatic certificates and in-app notifications implemented; email pending |
| V13 Analytics + Payments | Phase 12 + Phase 14 | Reports and manual payment records implemented; gateway pending |

## Engineering phases

1. Clean v2 baseline — preserve existing working foundation and remove broken barrel exports.
2. PostgreSQL + Prisma — schema, client singleton, migrations/db push workflow.
3. Authentication — session contract, role guards, provider integration point.
4. Global Design System — reusable UI primitives, section compositions, centralized class recipes.
5. Student Data Model — profiles, enrollments, learning records, skills and evidence.
6. Course CMS — program/course/module/lesson/content-block versioning model and service contracts.
7. Learning Engine — lesson completion, events, progress calculation and trainer intervention signals.
8. Quiz / Assessment Engine — questions, attempts, scoring and assessment readiness data.
9. Projects + Submissions — projects, milestones, submissions and evidence review.
10. Skills + Evidence — skill taxonomy, learner proficiency and evidence mapping.
11. Portfolio + Certificates — portfolio, portfolio items, certificate issuance and verification contract.
12. Admin Analytics — events, aggregates, operational analytics and payment reporting contracts.
13. Security Hardening — RBAC at service boundary, audit log, secure headers, validation and production checks.
14. Vercel + Production — environment configuration, PostgreSQL, external storage, email, payments, analytics and deployment.

## Styling contract

- Route/page files under `app/**` must contain no Tailwind utility classes.
- Route/page files should normally contain no `className` at all; they compose components.
- New repeated utility combinations should become a recipe in `components/ui/styles.ts` or a reusable component variant.
- Tailwind utility strings are allowed in reusable components and shared component recipes only.
- Do not copy long Tailwind strings into page files.

## TypeScript contract

- `strict` mode stays enabled.
- Shared domain types live under `types/**`.
- Service input/output contracts should be typed.
- Avoid `any` in application code.
- Use Zod at external boundaries when wiring forms/API inputs.
