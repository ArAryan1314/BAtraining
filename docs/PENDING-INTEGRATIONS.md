# Pending work and integration checklist

> **Superseded by [TODO.md](TODO.md)**, the single prioritised backlog. This file is kept for its vendor detail.

Ordered by what blocks a real launch first. What to buy, and the matching env variables, is in [PROCUREMENT.md](PROCUREMENT.md). Each item names where it plugs in.

## Blocks launch

| # | Item | Where it plugs in | Notes |
|---|---|---|---|
| 1 | **Apply the migrations to the Vercel database** | `pnpm db:deploy` | `0_init` is the baseline and `1_certificate_unique` adds a unique (studentId, title) on `Certificate`. If the tables were created with `db push`, run `pnpm db:baseline` first. See [VERCEL-DATABASE.md](VERCEL-DATABASE.md). |
| 2 | **Email delivery** | new `services/email`, called from `notify()` | `NotificationChannel` already has an email value. Needed for password reset, enrolment and certificate emails. Resend or Postmark fit the `EMAIL_PROVIDER_API_KEY` slot. |
| 3 | **Password reset / invite flow** | `services/users`, new `/auth/reset` pages | Today admins create accounts with a temporary password. Needs a single-use, expiring token table and #2. |
| 4 | **Payment gateway + signed webhook** | `services/payments`, new `app/api/webhooks/payments/route.ts` | Only manual records exist. Verify the signature with `PAYMENT_WEBHOOK_SECRET`, make handling idempotent on `providerRef`, and gate enrolment on `PAID`. Razorpay fits the INR default. |
| 5 | **File/video storage** | implement `StorageAdapter` in `services/storage` | Interface only. Needed for assignment attachments, avatars and lesson video. Use signed upload URLs, never route files through the server. |
| 6 | **Shared rate-limit store** | `lib/security/rate-limit.ts` | The limiter is in-memory per instance, so on Vercel an attacker is limited per lambda, not globally. Back it with Upstash/Redis behind the same class interface. |

## Should do before real users

- **Move CSP to nonces.** `script-src` still has `'unsafe-inline'` because Next injects inline bootstrap scripts (`lib/security/headers.ts`).
- **Quiz attempt policy.** Attempts are unlimited and every attempt is stored. Decide on a cap or cool-down.
- **Pagination.** Lists use fixed `take` limits (users 200, payments 20, notifications 50). Add cursor pagination to `listUsers`, `listRecentPayments` and the reports tables.
- **Account lockout visibility.** Blocked sign-ins return the same error as a wrong password. Add a visible "too many attempts" message and an audit entry.
- **Error and uptime monitoring.** `console.error` is the only sink. Add Sentry (or similar) in `runAction` and `app/error.tsx`.
- **Analytics.** `services/analytics` only counts `ProgressEvent` rows; `ANALYTICS_WRITE_KEY` is unused.
- **Backups and retention.** Managed Postgres point-in-time recovery, plus an audit-log retention policy.
- **Draft-creation race.** Two simultaneous first edits of a course can collide on `CourseVersion(courseId, version)`. The unique constraint stops corruption, but the loser sees a generic error; retry once in `getOrCreateDraft`.

## Product gaps

- Self sign-up and a public course catalogue with checkout.
- Subscriptions (`Subscription` model exists, no service).
- Portfolio and skill-evidence screens (services exist for both, no UI route).
- Trainer content authoring (permissions allow it; only `/admin/content` is wired).
- Certificate PDF generation and a shareable LinkedIn badge.
- Live sessions / calendar, discussion threads, and cohort announcements.
- i18n and accessibility audit (run the `a11y-debugging` pass on every workspace).

## Done in this pass

- `lib/env.ts` + `instrumentation.ts`: the server refuses to start with a missing, short or placeholder `AUTH_SECRET` or no Postgres URL. `NEXTAUTH_URL` is optional on Vercel and must be https when set.
- `proxy.ts`: role-based route guard in front of every workspace (layouts and services still enforce it too).
- Sign-in throttling (5 failures per 15 minutes, per email and per IP) and constant-time handling of unknown emails.
- CSP and HSTS headers.
- `/api/health` now checks the database and returns 503 when it is down.
- Certificates are issued exactly once even under concurrent completions.
- Module/lesson ordering no longer duplicates after a deletion.
- Audit log now covers module, lesson, resource, question and content-save changes.
- Fixed: emails with surrounding spaces were rejected by the user form.
- Tests: 2 → 38 (env, DB connection, rate limiter, permissions, validations, headers, SEO content, sign-in redirects).
- One shared radius and one shared set of hover/active/focus states, enforced by `pnpm check:ui`.
- Scroll progress bar and back-to-top button with a progress ring; redesigned sign-in page.
- Prisma migrations, pooled/direct URL resolution for Vercel, and a production-only `migrate deploy` build step.
- CI workflow (`.github/workflows/ci.yml`) running `pnpm check` and `pnpm build`.
- Both lint warnings resolved.
