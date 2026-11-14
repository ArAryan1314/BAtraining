# What needs to be done

The single prioritised backlog. It replaces the earlier [PENDING-INTEGRATIONS.md](PENDING-INTEGRATIONS.md), which stays for its vendor detail. IDs are referenced from the [BRD](BRD.md) and [TRD](TRD.md).

**Owner key:** **You** = needs your accounts or a business decision. **Dev** = code work. **Both** = code plus an account.
**Priority:** P0 blocks launch · P1 before real use at scale · P2 later.

## P0: to make the live site usable

| ID | Task | Owner | Requirement | Notes |
|---|---|---|---|---|
| T-01 | Add `AUTH_SECRET` in Vercel (Production and Preview) and redeploy. Confirm a Postgres URL is set | You | NFR-04 | `/api/health` currently reports `AUTH_SECRET` missing. Steps in [GO-LIVE.md](GO-LIVE.md) |
| T-02 | Apply migrations to the production database. If tables already exist from `db push`, run `pnpm db:baseline` first | You | | A production build runs `migrate deploy` itself |
| T-03 | Create the first admin with `pnpm db:admin` | You | FR-204 | Never seed demo accounts on production |
| T-04 | Give Preview deployments their own database | You | | Otherwise previews touch production data |
| T-05 | Turn on branch protection for `main` and `development`; make `development` the default branch | You | | Required checks: branch-rules, check, database |
| T-06 | Choose an email provider and implement email delivery in `services/notifications` | Both | FR-701 | Resend or Postmark fit the existing settings |
| T-07 | Password reset and user invitations | Dev | FR-205, FR-206 | Needs T-06. Single-use expiring tokens |
| T-08 | Watch the first CI runs on `development` and fix any failure, especially the `database` job | Dev | | Added but never run on GitHub |
| T-09 | Connect error monitoring (Sentry) | Both | FR-705, NFR-10 | Hook into `lib/actions/result.ts` and `app/error.tsx` |
| T-10 | Enable database backups with point-in-time recovery and test a restore once | You | NFR-11 | |
| T-11 | Add privacy policy, terms and refund policy pages | Both | NFR-12 | Content must come from you |
| T-12 | Store contact enquiries: a table, an admin inbox and an email alert | Dev | FR-104 | The form only opens the visitor's email app today, so enquiries can be lost |

## P1: before growing

| ID | Task | Owner | Requirement | Notes |
|---|---|---|---|---|
| T-13 | Payment gateway with signed, idempotent webhooks; enrolment gated on payment | Both | FR-703 | Razorpay fits the INR default. Start gateway KYC early |
| T-14 | Pagination, search and filters on users, payments, notifications, certificates and reports | Dev | FR-510 | Lists are capped at fixed limits today |
| T-15 | File storage adapter (R2 or S3) and attachments on submissions | Both | FR-702, FR-309 | Implement `StorageAdapter`; use signed upload URLs |
| T-16 | Shared sign-in rate limit (Upstash Redis) | Both | NFR-03 | The limiter class is already swappable |
| T-17 | Tests for services against a real database in CI | Dev | | The CI Postgres service is already available |
| T-18 | End-to-end browser tests for the three roles | Dev | | Needs the seeded database |
| T-19 | Review every signed-in screen in a browser once a seeded database exists | Dev | | Student, trainer and admin dashboards have never been seen rendered |
| T-20 | Accessibility audit of every workspace with an assistive-technology pass | Dev | NFR-08 | |
| T-21 | Student screens for portfolio and skills | Dev | FR-308 | Services already exist |
| T-22 | Trainer screens for content authoring | Dev | FR-406 | Permissions already allow it |
| T-23 | Certificate PDF and a shareable badge | Dev | FR-605 | |
| T-24 | Move the Content-Security-Policy to per-request nonces | Dev | | Removes `'unsafe-inline'` for scripts |
| T-33 | Decide a quiz attempt policy (cap or cool-down) | You | | Attempts are unlimited today |

## P2: later

| ID | Task | Owner | Requirement |
|---|---|---|---|
| T-25 | Public catalogue, self sign-up and checkout | Both | FR-106, FR-107 |
| T-26 | Cohort announcements | Dev | FR-407 |
| T-27 | Live sessions and attendance | Both | FR-706 |
| T-28 | Product analytics and a success-measures dashboard | Both | FR-704, BRD §7 |
| T-29 | Two-factor sign-in or single sign-on | Dev | FR-207 |
| T-30 | Audit-log retention, export and a learner data-deletion process | Both | NFR-11, NFR-12 |
| T-31 | Video hosting for lessons (Mux or Cloudflare Stream) | Both | |
| T-32 | Confirm the audience and admissions copy is accurate; consider real photography instead of generated art | You | |
| T-34 | Lighthouse and performance budgets in CI | Dev | NFR-07 |

## Done recently

- Environment checks, sign-in throttling, security headers, role route guard and a database-aware health endpoint
- Prisma migrations and Vercel-aware connection settings
- Per-page SEO, sitemap, social images, public changelog
- Role-specific dashboards, one radius and one set of interaction states, scroll progress and back-to-top button
- Generated artwork and new audience and contact sections
- Branching strategy, CI with a database job, release workflow, Dependabot
- First-admin command, sign-in "unavailable" notice, go-live guide
- BRD, TRD, module reference and this backlog

## How to use this list

1. Work top to bottom within a priority.
2. Each task becomes a branch named by type, for example `feature/contact-enquiries` for T-12 (see [BRANCHING.md](BRANCHING.md)).
3. When a task ships, move it to "Done recently", update its status in the BRD, and add a changelog entry.
