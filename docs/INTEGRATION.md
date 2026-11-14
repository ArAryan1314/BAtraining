# Integration Runbook

## Local PostgreSQL

Create a PostgreSQL database called `ba_training`, then put the connection string in `.env.local`.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ba_training"
```

## Prisma

```powershell
pnpm db:setup
```

The seed creates demo admin, trainer, student, program, course, quiz, assignment, cohort, enrollment and skills.

Demo identities:

```text
admin@baacademy.local
trainer@baacademy.local
student@baacademy.local
```

Each account signs in with `SEED_USER_PASSWORD` from `.env.local`. Only a bcrypt hash is stored, in `User.passwordHash`.

## Authentication

NextAuth credentials sign-in lives in `lib/auth/options.ts` and requires `AUTH_SECRET`. `getSessionUser()` in `services/auth` returns the current user:

```ts
{
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TRAINER" | "STUDENT";
}
```

Each workspace's `layout.tsx` uses `WorkspaceLayout`, which redirects visitors to sign in and other roles to their own workspace.

Services take the signed-in user as their first argument and call `requirePermission()` or `requireSelfOrPermission()` before touching Prisma. Server actions must get that user from `getSessionUser()`, never from form input.

## Learning integration

When a learner completes a lesson:

```text
Lesson UI
  -> completeLesson()
  -> LessonProgress upsert
  -> ProgressEvent
  -> getCourseProgress()
  -> CourseProgress upsert
  -> Progress UI
```

Quiz attempts use the same event mechanism. Add assignment/project events in their service functions.

## Content/CMS integration

The `CourseVersion` + `ContentBlock` tables provide versioned content. The lesson editor writes to a draft version, and publishing moves it to `PUBLISHED`. Student routes read only the latest published version.

## External providers

Wrap providers in services rather than importing SDKs into UI components:

```text
services/auth adapter
services/storage
services/notifications
services/payments
services/analytics
```

This keeps the UI independent from vendor changes.

## Production sequence

1. Managed PostgreSQL.
2. Set `AUTH_SECRET` and `NEXTAUTH_URL` for production.
3. Object/video storage.
4. Email/notification provider.
5. Payment provider with signed webhooks.
6. Analytics provider, if required.
7. Vercel environment variables.
8. `pnpm build` in CI before deployment.
