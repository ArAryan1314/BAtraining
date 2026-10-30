# BA Training Platform — Final Integration Baseline

This repository consolidates the complete BA Training product roadmap into one Next.js + TypeScript + Tailwind + PostgreSQL/Prisma foundation.

The project is intentionally structured as a **platform**, not a collection of independently styled pages.

## Non-negotiable architecture rules

1. Route/page files under `app/**` contain **no Tailwind utility classes** and normally contain no `className` at all. They compose reusable components.
2. Reusable Tailwind styling belongs inside `components/**` and shared component recipes under `components/ui/styles.ts`.
3. Global visual tokens belong in `app/globals.css`.
4. Repeated UI patterns become a component or a typed variant before they are reused on another page.
5. Domain data access belongs in `services/**` and `lib/**`, not inside presentational components.
6. `strict` TypeScript remains enabled; avoid `any` in application code.
7. Progress is event/domain driven. Pages never own progress calculations.
8. Authorization must be enforced at the server/service boundary, not only by hiding UI.
9. External providers are integration points and must be wrapped behind service contracts.

## Product roadmap

```text
V4  Global UI System
 ↓
V5  Application Shell + Authentication + RBAC
 ↓
V6  Student LMS
 ↓
V7  Trainer Workspace
 ↓
V8  Admin Workspace
 ↓
V9  Progress Engine
 ↓
V10 Course / Content Builder
 ↓
V11 Assessments + Projects
 ↓
V12 Certificates + Notifications
 ↓
V13 Analytics + Payments
```

## Engineering phases

```text
Phase 1  Clean v2 baseline
 ↓
Phase 2  PostgreSQL + Prisma
 ↓
Phase 3  Authentication
 ↓
Phase 4  Global Design System
 ↓
Phase 5  Student Data Model
 ↓
Phase 6  Course CMS
 ↓
Phase 7  Learning Engine
 ↓
Phase 8  Quiz / Assessment Engine
 ↓
Phase 9  Projects + Submissions
 ↓
Phase 10 Skills + Evidence
 ↓
Phase 11 Portfolio + Certificates
 ↓
Phase 12 Admin Analytics
 ↓
Phase 13 Security Hardening
 ↓
Phase 14 Vercel + Production
```

See `docs/IMPLEMENTATION-MATRIX.md` for the mapping and delivery status.

## Current baseline coverage

### Global UI and page compositions

- Global UI primitives: button, card, badge, inputs, forms, overlays, tables, tabs, menus, pagination, feedback, progress and loading components.
- Reusable page section compositions: hero, feature grid, content split, metrics, timeline, CTA, assessment, capstone, curriculum and learning sections.
- Shared layout shell and role-specific navigation.
- Central Tailwind class recipes in `components/ui/styles.ts` to reduce repeated utility combinations.
- Global theme tokens in `app/globals.css`.

### Application shells

- Public foundation.
- Student dashboard route and components.
- Trainer dashboard route and components.
- Admin dashboard route and components.
- Health endpoint and certificate verification route.

### Backend / domain foundation

Prisma models cover:

- Users, student/trainer profiles and roles.
- Programs, courses, modules, lessons and resources.
- Course versions and content blocks for the CMS.
- Enrollments and lesson/course progress.
- Progress events.
- Assignments and submissions.
- Quizzes, questions and attempts.
- Projects, milestones and project submissions.
- Trainer feedback.
- Skills, learner proficiency and skill evidence.
- Portfolio and portfolio items.
- Certificates and verification codes.
- Notifications.
- Payments and subscriptions.
- Audit logs.

### Services

Service boundaries exist for:

```text
services/users
services/courses
services/enrollments
services/progress
services/assessments
services/cms
services/projects
services/skills
services/portfolio
services/certificates
services/notifications
services/analytics
services/payments
services/security
services/auth
services/storage
```

## Integration steps

### 1. Replace the old project

Keep your previous project as a backup, then extract this repository as the active project.

### 2. Install dependencies

```powershell
pnpm install
```

### 3. Configure environment

```powershell
Copy-Item .env.example .env.local
```

Set a real PostgreSQL URL and a random `AUTH_SECRET` in `.env.local`. Each variable is explained in `.env.example`.

### 4. PostgreSQL + Prisma

Create the tables and the demo accounts (`pnpm install` already generated the Prisma client into `generated/`):

```powershell
pnpm db:setup
```

Demo accounts are `admin@baacademy.local`, `trainer@baacademy.local` and `student@baacademy.local`. Their password is `SEED_USER_PASSWORD` from `.env.local`.

For migrations:

```powershell
pnpm db:migrate
```

### 5. Validate architecture

```powershell
pnpm check
```

### 6. Start development

```powershell
pnpm dev
```

Open `http://localhost:3000`.

## What is already implemented vs. what still requires provider integration

### Implemented in this baseline

- Global component architecture.
- Page-level Tailwind restriction.
- Typed role/permission system.
- Prisma relational data model.
- Progress event and calculation foundation.
- Course CMS data model.
- Quiz/assessment foundation.
- Project/submission foundation.
- Skills/evidence foundation.
- Portfolio/certificate foundation.
- Notification foundation.
- Analytics query foundation.
- Payment/subscription data foundation.
- Audit/security foundation.
- Validation scripts.

### External integration still required

- Production PostgreSQL instance.
- Video/document/object storage.
- Email/SMS delivery provider.
- Payment gateway and webhook verification.
- External product analytics provider, if required.
- Vercel environment variables and production deployment.
- Production seed data and operational accounts.

These are deliberately isolated behind service contracts so provider changes do not force a UI rewrite.

## Styling workflow

Do this:

```tsx
<Button variant="primary" size="md" />
<Card variant="elevated" />
<ProgressBar value={progress} />
```

For a new visual treatment, add a variant or a reusable section component. Reuse `uiStyles` from `components/ui/styles.ts` for common layouts.

Do not do this inside `app/**`:

```tsx
<div className="grid gap-4 lg:grid-cols-3 ..." />
```

Route pages should remain composition-only.

## Validation gates

Run before commit/build:

```powershell
pnpm check
pnpm build
```

`pnpm check` runs the route-styling and barrel checks, ESLint, TypeScript and the unit tests. It fails if a route file contains `className` or Tailwind utility styling.

## Suggested implementation order after this baseline

Already built: sign-in and role workspaces, database-backed dashboards, enrolment, the student course and lesson flow, and permission checks in every service.

1. Build the course and lesson editor on the CMS services.
2. Add quiz-taking and assignment screens, then trainer grading.
3. Add cohorts so trainers only see their own learners.
4. Connect skill evidence and portfolio generation.
5. Issue certificates when a course is completed.
6. Add notification delivery.
7. Integrate payments/webhooks and production infrastructure.
