# Technical Requirements Document (TRD)

**Product:** BA Upskill platform · **Version:** 1.0, aligned with release 1.2.0
Requirement IDs (FR-…, NFR-…) refer to the [BRD](BRD.md). Task IDs (T-…) refer to [TODO.md](TODO.md).

## 1. Technology stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Server Components, Server Actions) | 16.4 |
| UI | React, Tailwind CSS, lucide-react icons | 19.3, 4.3 |
| Language | TypeScript, strict mode | 6.0 |
| Database | PostgreSQL | managed (Vercel / Neon) |
| ORM | Prisma with the `pg` driver adapter | 7.10 |
| Authentication | NextAuth, credentials provider, JWT sessions | 4.24 |
| Validation | Zod | 4.6 |
| Hashing | bcryptjs, 12 rounds | 3.0 |
| Runtime | Node.js | 22.12 or newer |
| Package manager | pnpm | 12 |
| Hosting | Vercel (Production from `main`, Preview from other branches) | |
| CI | GitHub Actions | |
| Tests | Node's built-in test runner through `tsx` | 51 tests |

## 2. Architecture

```
Browser
  │
  ▼
proxy.ts ── role guard on /student /trainer /admin (reads the session cookie)
  │
  ▼
app/**  ── route files only: compose components, no styling classes (enforced)
  │   ├─ page.tsx / layout.tsx        Server Components, read data through services
  │   └─ actions.ts                   Server Actions, wrapped by lib/actions/act.ts
  ▼
services/**  ── all business rules and data access
  │   every function takes the signed-in user first and calls requirePermission()
  ▼
lib/db/prisma.ts ── one Prisma client, pooled pg connection
  ▼
PostgreSQL
```

Design rules (also in the README):

1. Route files under `app/**` contain no Tailwind classes. Styling lives in `components/**` and `app/globals.css`.
2. Business rules and queries live in `services/**`, never in components.
3. Authorisation is enforced in services, not just by hiding buttons.
4. The signed-in user always comes from the session, never from form input.
5. Progress is event-driven: pages never calculate it.
6. External providers sit behind service interfaces.

### Request flow for a server action

`act()` resolves the signed-in user → runs the service function → the service checks the permission, validates input with Zod, writes through Prisma and writes an audit entry → the workspace path is revalidated → a typed `{ ok, message }` result returns to the form. Expected problems throw `DomainError` and show their message. Anything else is logged and shown as a generic failure.

## 3. Directory map

| Path | Contents |
|---|---|
| `app/` | Routes: `(public)`, `auth`, `student`, `trainer`, `admin`, `verify`, `api`, plus `sitemap.ts`, `robots.ts`, social image routes |
| `components/` | `ui` primitives, `layout`, `home`, `topic` (with `layouts/`), `dashboard`, `student`, `trainer`, `admin`, `common`, `illustrations`, `seo`, `public` |
| `services/` | One folder per domain (see [MODULES.md](MODULES.md)) |
| `lib/` | `auth`, `db`, `actions`, `security`, `validations`, `progress`, `env`, `seo`, `permissions` |
| `config/` | Site identity, navigation, permissions, integrations registry, roadmap |
| `content/` | Topic pages (38) and the changelog, as typed data |
| `prisma/` | `schema.prisma`, migrations, `seed.ts`, `create-admin.ts` |
| `scripts/` | Repository checks, branch rules, Vercel build |
| `tests/` | Unit tests |
| `docs/` | This documentation |
| `.github/` | CI, release and Dependabot configuration, PR template |

## 4. Data model

36 models and 15 enums in `prisma/schema.prisma`.

| Area | Models |
|---|---|
| People | `User` (role: ADMIN, TRAINER, STUDENT), `StudentProfile`, `TrainerProfile` |
| Curriculum | `Program`, `Course`, `Module`, `Lesson`, `LessonResource` |
| Versioned content | `CourseVersion` (DRAFT, REVIEW, PUBLISHED, ARCHIVED), `ContentBlock` (TEXT, VIDEO, DOCUMENT, IMAGE, CALLOUT, QUIZ, ASSIGNMENT) |
| Enrolment and progress | `Enrollment` (ACTIVE, COMPLETED, PAUSED), `LessonProgress`, `CourseProgress`, `ProgressEvent` |
| Assessment | `Quiz`, `Question`, `QuizAttempt`, `Assignment`, `AssignmentSubmission` |
| Projects | `Project`, `ProjectMilestone`, `ProjectSubmission`, `Feedback` |
| Skills and portfolio | `Skill`, `StudentSkill`, `SkillEvidence`, `Portfolio`, `PortfolioItem` |
| Credentials | `Certificate` (DRAFT, ISSUED, REVOKED), unique on (student, title) and on verification code |
| Operations | `Cohort`, `CohortMember`, `Notification` (IN_APP, EMAIL), `Payment`, `Subscription`, `AuditLog`, `Enquiry` (NEW, CONTACTED, CLOSED) |

Key constraints: unique email; unique (student, course) enrolment; unique (student, lesson) progress; unique (course, version) content version; indexes on the progress event, feedback, notification, payment, audit and cohort lookups.

**Migrations** live in `prisma/migrations`: `0_init` (baseline), `1_certificate_unique` and `2_contact_enquiries`. Every schema change ships with a migration. CI applies all migrations to an empty database and fails if `schema.prisma` has a change with no migration.

## 5. Authentication and authorisation

- **Sign-in:** email and password. Unknown emails take as long to reject as wrong passwords. Five failures in fifteen minutes block the email and the client address (per server instance for now; see NFR-03).
- **Session:** a signed JWT cookie. The session carries user id, name, email and role.
- **Route guard:** `proxy.ts` sends signed-out visitors to the sign-in page and wrong-role users to their own workspace. Layouts and services check again.
- **After sign-in:** the user returns to the page they asked for only if it is inside their own workspace.
- **Permissions:** `config/permissions` maps each role to named permissions. Services call `requirePermission`, or `requireSelfOrPermission` for a learner's own records.

| Capability | Admin | Trainer | Student |
|---|---|---|---|
| Manage users, publish courses, revoke certificates, manage payments, settings | ✅ | | |
| Edit content and quizzes | ✅ | content, not quizzes | |
| Enrol students | ✅ | ✅ | |
| Grade assignments, review projects, run reports | ✅ | ✅ (own cohorts) | |
| Learn, attempt quizzes, submit assignments and projects | | | ✅ |
| Read own certificates, notifications, payments | | | ✅ |

Trainer scope: `learnerWhere()` limits a trainer to learners in cohorts they own.

## 6. Core algorithms

- **Course progress:** weighted share of completed parts: lessons 0.4, assignments 0.2, project milestones 0.2, quizzes passed 0.2. A part a course doesn't have is dropped and the remaining weights are rescaled, so finishing everything always reaches 100.
- **Lesson completion:** a transaction upserts `LessonProgress`, records a `LESSON_COMPLETED` event, then recomputes and stores course progress. Repeating it is a no-op.
- **Completion:** at 100% the enrolment becomes COMPLETED and a certificate is issued. The unique constraint makes concurrent completion safe.
- **Quiz scoring:** points earned over points available, computed on the server from stored answers.
- **Streak:** consecutive UTC days with an event, ending today or yesterday.
- **Stalled learner:** no activity for 7 days.
- **Content publishing:** edits go to a draft copy of the latest version. Publishing archives the current published version and promotes the draft in one transaction.

## 6a. Server-side rules worth remembering

| Rule | Where |
|---|---|
| A lesson with completions can't be deleted; a module must be empty to delete | `services/cms` |
| A graded assignment can no longer be revised | `services/assessments` |
| A score can't exceed the assignment's points | `services/assessments` |
| Students can only join published courses; paused enrolments block activity | `services/enrollments` |
| Lesson and resource links must be http(s) | `lib/validations` |

## 7. Security controls

| Control | Detail |
|---|---|
| Transport and headers | HSTS, CSP (inline scripts allowed until nonces are adopted), frame denial, nosniff, referrer and permissions policies |
| Secrets | Only in Vercel environment variables. Nothing sensitive is committed. The health endpoint names missing settings but never prints values |
| Input | Zod validation at every boundary; links limited to http(s). The public contact form adds a hidden bot trap and a limit of five enquiries an hour per address and per email |
| Output | Quiz answers are never selected for learners |
| Audit | Admin and trainer changes write an `AuditLog` entry |
| Environment | `lib/env.ts` lists configuration problems; startup logs them and `/api/health` reports them |
| Sign-in unavailable | If the secret or database is missing, the sign-in page explains it instead of failing |
| Open item | CSP nonces; shared rate limit; dependency audit is advisory |

## 8. Environment configuration

Full list and examples in `.env.example`. Key variables:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` (or `POSTGRES_URL`) | Yes | Pooled connection for the running app |
| `DIRECT_URL` (or `POSTGRES_URL_NON_POOLING`) | Recommended | Direct connection for migrations |
| `AUTH_SECRET` | Yes | Signs session cookies (16+ characters) |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical links, sitemap, social images. Read at build time |
| `NEXTAUTH_URL` | No on Vercel | Must be https if set |
| `DATABASE_POOL_MAX` | No | Connections per instance, default 5 |
| `SEED_USER_PASSWORD` | Seeding only | Password for demo accounts |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` | `pnpm db:admin` only | First admin |
| Email, payment, storage, analytics, monitoring keys | Per integration | See `config/integrations.ts` and [PROCUREMENT.md](PROCUREMENT.md) |

## 9. Integration points

Each external service is wrapped by a service so the vendor can change without touching the UI.

| Integration | Service | State |
|---|---|---|
| Email | `services/notifications` | ⬜ in-app only. New-enquiry alerts wait on this |
| Payments | `services/payments` | ⬜ manual records only |
| Storage | `services/storage` (interface) | ⬜ no implementation |
| Analytics | `services/analytics` | 🟡 counts internal events only |
| Error monitoring | `lib/actions/result.ts` | ⬜ |
| Shared rate limit | `lib/security/rate-limit.ts` | ⬜ in memory |

## 10. Search and sharing

Per-page metadata with a unique title and description (tests enforce uniqueness), canonical URL, Open Graph and Twitter cards, JSON-LD (Organization, Website, Course or Article, Breadcrumb, FAQ), `sitemap.xml`, `robots.txt`, 1200 by 630 generated social images, and `noindex` on private routes.

## 11. Frontend standards

- One corner radius (`rounded-md`) and one set of hover, active, focus and focus-within states, defined once in `app/globals.css` and `components/ui/Button.tsx`.
- `pnpm check:ui` fails on any other radius or any one-off hover colour.
- Artwork is generated SVG (`components/illustrations`), seeded per page, with no image files.
- Accessibility: visible focus, labelled controls, 24 px minimum targets, reduced-motion support.

## 12. Testing

| Kind | Coverage today |
|---|---|
| Unit (59 tests) | Permissions, guards, progress maths, validation, environment, database URL resolution, rate limiter, headers, SEO content, branch rules, first-admin input, redirect safety, sign-in availability |
| Repository checks | Page styles, barrel exports, UI contract, lint, typecheck |
| Integration | CI applies all migrations to an empty Postgres and runs the seed |
| Not yet covered | Service functions against a real database; end-to-end browser tests for the three roles |

## 13. CI/CD and release

See [BRANCHING.md](BRANCHING.md). Pull requests run branch-name rules, `pnpm check` plus a build, a database migration job and a dependency audit. A `vX.Y.Z` tag on `main` creates the GitHub release. Vercel deploys `main` to Production, running `prisma migrate deploy` first, and every other branch to Preview without migrations.

## 14. Capacity and performance notes

- Topic pages are static. Workspace pages render on demand.
- Lists use fixed limits (users 200, payments 20, notifications 50, certificates 50, recent quiz attempts 20). They need pagination before large cohorts (T-14).
- Each serverless instance holds at most 5 database connections. Use the pooled URL.

## 15. Known technical gaps

Listed with owners and priority in [TODO.md](TODO.md). The main ones: enquiry storage, email, password reset, file storage, payments, shared rate limit, monitoring, pagination, service-level and end-to-end tests, CSP nonces, accessibility audit, and retention policy.
