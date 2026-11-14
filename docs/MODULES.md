# Module reference

Where everything lives and what it does. For the architecture and rules see the [TRD](TRD.md).

## Routes

| Area | Path | Purpose |
|---|---|---|
| Public | `/` | Home |
| | `/<slug>` (38 pages) | Learn, career, resources and platform topics |
| | `/contact` | Admissions enquiry (opens the visitor's email app) |
| | `/changelog`, `/changelog/feed.xml` | Release notes and RSS |
| | `/verify/<code>` | Certificate check (not indexed) |
| | `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Search and sharing |
| Auth | `/auth/login` | Sign in |
| API | `/api/auth/*` | NextAuth |
| | `/api/health` | Readiness: configuration and database |
| Student | `/student/dashboard`, `courses`, `courses/<slug>`, `courses/<slug>/lessons/<id>`, `assessments`, `assessments/quizzes/<id>`, `assessments/assignments/<id>`, `projects`, `certificates`, `notifications`, `account` | Learning workspace |
| Trainer | `/trainer/dashboard`, `cohorts`, `assessments`, `projects`, `reports`, `account` | Teaching workspace |
| Admin | `/admin/dashboard`, `users`, `courses`, `content`, `content/<courseId>`, `content/<courseId>/lessons/<id>`, `assessments`, `assessments/quizzes/<id>`, `reports`, `settings` | Operations |

Server Actions: `app/student/actions.ts`, `app/trainer/actions.ts`, `app/admin/actions.ts`, `app/account-actions.ts`.

## Services

Every function takes the signed-in user first and checks a permission.

| Service | Functions |
|---|---|
| `auth` | `getSessionUser`, `requireWorkspaceUser` |
| `users` | `getUserById`, `listUsers`, `createUser`, `changeMyPassword` |
| `courses` | `listMyCourses`, `getCourseOutline`, `getLessonView` |
| `cms` | `listPrograms`, `listCoursesForAdmin`, `createCourse`, `updateCourse`, `setCoursePublished`, `getCourseEditor`, `addModule`, `deleteModule`, `addLesson`, `deleteLesson`, `getLessonEditor`, `saveLessonContent`, `publishCourseContent`, `addLessonResource`, `deleteLessonResource` |
| `enrollments` | `listEnrollments`, `enrollStudent` |
| `progress` | `completeLesson`, `getCourseProgress`, `syncCourseProgress`, `recordProgressEvent` |
| `assessments` | `listMyAssessments`, `getQuizToTake`, `submitQuizAttempt`, `getAssignmentToSubmit`, `submitAssignment`, `getGradingWorkspace`, `gradeAssignment`, `listAssessmentsForAdmin`, `createQuiz`, `getQuizForEditing`, `addQuestion`, `deleteQuestion`, `createAssignment` |
| `projects` | `listStudentProjects`, `createProject`, `submitProject`, `listProjectReviewQueue`, `reviewProjectSubmission`, `updateProjectStatus` |
| `cohorts` | `getCohortWorkspace`, `createCohort`, `addCohortMember`, `removeCohortMember`, `learnerWhere`, `requireLearnerInScope` |
| `certificates` | `listStudentCertificates`, `verifyCertificate`, `issueCourseCertificate`, `listCertificatesForAdmin`, `revokeCertificate` |
| `notifications` | `notify`, `listMyNotifications`, `markAllNotificationsRead` |
| `payments` | `listStudentPayments`, `listRecentPayments`, `recordManualPayment` |
| `skills` | `listSkills`, `listStudentSkills`, `upsertStudentSkill` (no screens yet) |
| `portfolio` | `getStudentPortfolio`, `upsertMyPortfolio` (no screens yet) |
| `dashboards` | `getStudentDashboard`, `getTrainerDashboard`, `getAdminDashboard` |
| `reports` | `getLearnerReport`, `getPlatformReport`, `getIntegrationStatus` |
| `analytics` | `getPlatformEventCounts`, `getEnrollmentCount` |
| `security` | `writeAuditLog` |
| `storage` | `StorageAdapter` interface only |

## Libraries

| Path | Purpose |
|---|---|
| `lib/auth` | `options` (NextAuth), `guards` (permission checks), `redirect` (safe post-sign-in path), `availability` (is sign-in configured), `first-admin` |
| `lib/db` | `prisma` client, `connection` (URL and pool resolution) |
| `lib/actions` | `act` (server action wrapper), `result` (typed results and `DomainError`) |
| `lib/validations` | Zod schemas for every form |
| `lib/progress` | `calculate` (weighted progress), `streak` |
| `lib/security` | `headers`, `rate-limit` |
| `lib/env.ts` | Environment problems and parsing |
| `lib/seo.ts` | Metadata and structured-data builders |
| `lib/permissions` | `can`, `canAll`, `canAny` |

## Components

| Folder | Contents |
|---|---|
| `components/ui` | Buttons, inputs, cards, tables, modals, tabs, badges and other primitives; `styles.ts` shared recipes; `marketing-primitives` |
| `components/layout` | App shell, workspace layout, public header, mega menu, footer |
| `components/home`, `public`, `topic`, `sections` | Public pages. `topic/layouts` holds the learn, career and resource layouts |
| `components/dashboard`, `student`, `trainer`, `admin` | Workspace screens |
| `components/common` | Login screen, scroll progress, account panels, shared forms |
| `components/illustrations` | `TopicArt`, the generated artwork |
| `components/seo` | `JsonLd` |

## Content

| File | Contents |
|---|---|
| `content/topics/*.ts` | 38 topic pages as typed data: learn (10), career (9), platform (10), resources (9) |
| `content/changelog.ts` | Release notes shown on `/changelog`, the feed and every dashboard |
| `config/integrations.ts` | Registry of purchasable services: vendors, environment keys, whether required |
| `config/navigation.ts`, `config/permissions` | Workspace navigation and the permission matrix |

## Commands

| Command | Does |
|---|---|
| `pnpm dev` / `build` / `start` | Run, build and serve |
| `pnpm check` | Page styles, barrels, UI contract, lint, typecheck, tests |
| `pnpm check:ui` | Only the radius and interaction-state contract |
| `pnpm test` | Unit tests |
| `pnpm db:deploy` | Apply committed migrations |
| `pnpm db:migrate` | Create a migration while developing |
| `pnpm db:baseline` | Mark `0_init` applied on a database made with `db push` |
| `pnpm db:seed` | Demo accounts and sample course (development only) |
| `pnpm db:admin` | Create or reset the first real admin |
| `pnpm db:studio` | Browse data |

## Tests (`tests/`)

`guards`, `permissions`, `progress`, `validations`, `env`, `db-connection`, `rate-limit`, `headers`, `integrations`, `seo-content`, `branch-rules`, `redirect`, `availability`, `first-admin`.
