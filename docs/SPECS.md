# Feature specifications

Spec-driven delivery: every feature below has an ID, acceptance criteria, the integration it needs, the code it touches and how it is verified. A feature is **done** only when every acceptance criterion passes, the BRD status is updated, [CODE-REFERENCE.md](CODE-REFERENCE.md) is updated and a changelog entry exists.

Status key: ⬜ not started · 🟡 partial · ✅ done. IDs `T-xx` are in [TODO.md](TODO.md); `FR/NFR` are in the [BRD](BRD.md). All specs below are ⬜ unless noted.

**Delivery rule for every feature:** branch `feature/<name>` from `development`; one PR per feature; `pnpm check` green; service logic covered by tests; authorisation enforced in the service layer; vendor calls only behind a service adapter that is a no-op when its keys are unset.

---

## Wave 1: launch blockers (P0)

### S-01 Email delivery (T-06, FR-701)
- **Needs:** Resend or Postmark account; verified sending domain (SPF, DKIM). Env: `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM`.
- **Code:** new `services/email` (adapter interface plus provider), called from `notify()` in `services/notifications` when the channel is email.
- **Acceptance:** (1) an email-channel notification sends one message; (2) a provider failure never breaks the calling action and is logged; (3) with no key, sending is skipped and the integrations page shows "not configured"; (4) templates exist for reset, invite, grading and certificate.
- **Tests:** adapter contract test with a fake provider; failure-isolation test.

### S-02 Password reset and invitations (T-07, FR-205, FR-206). Depends on S-01
- **Needs:** S-01; new model `AuthToken` (hashed token, userId, purpose, expiresAt, usedAt) and a migration.
- **Code:** `services/auth`; pages `app/auth/forgot`, `app/auth/reset/[token]`, `app/auth/invite/[token]`.
- **Acceptance:** (1) tokens are random, stored hashed, single use; reset expires in 1 hour, invite in 7 days; (2) the forgot form answers identically for known and unknown emails; (3) used or expired tokens are rejected; (4) a reset invalidates the user's other open tokens; (5) both flows are rate limited and audited.
- **Tests:** lifecycle, replay, expiry, enumeration-safe response.

### S-03 Stored contact enquiries (T-12, FR-104, FR-709)
- **Needs:** migration for `ContactEnquiry`; S-01 for the alert; optional Cloudflare Turnstile (`TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).
- **Code:** `services/enquiries`; `app/admin/enquiries`; `components/public/ContactForm.tsx` submits to a server action.
- **Acceptance:** (1) a valid submission is saved before any email is attempted; (2) zod validation, honeypot field and per-IP rate limit; (3) admin sees a paginated inbox with new/handled status; (4) admin gets an email alert.
- **Tests:** validation, rate limit, persistence-first ordering.

### S-04 Error monitoring (T-09, FR-705, NFR-10)
- **Needs:** Sentry project. Env: `SENTRY_DSN` (and `NEXT_PUBLIC_SENTRY_DSN` for the browser).
- **Code:** `instrumentation.ts`, `lib/actions/result.ts` (`runAction`), `app/error.tsx`, `app/global-error.tsx`.
- **Acceptance:** (1) unexpected server and client errors reach Sentry with route and role, never passwords, tokens or full emails; (2) expected `ActionResult` failures are not reported; (3) no DSN means no-op.
- **Tests:** scrubber unit test.

### S-05 Policy pages (T-11, NFR-12)
- **Needs:** **the business owner supplies the legal text.**
- **Code:** content under `content/`; routes `/privacy`, `/terms`, `/refunds`; footer links; sitemap entries.
- **Acceptance:** pages render, are in the sitemap, linked from the footer and contact form; SEO tests still pass.

### S-06 Shared rate limiter (T-16, NFR-03)
- **Needs:** Upstash Redis. Env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Code:** `lib/security/rate-limit.ts` gains a Redis implementation behind the existing class interface; memory fallback with no keys.
- **Acceptance:** limits hold across instances; a Redis outage is logged and does not block sign-in; existing rate-limit tests pass against both backends.

### S-07 Sign-in lockout visibility (FR-208, T-35)
- **Code:** `lib/auth/options.ts` and the login page.
- **Acceptance:** a throttled sign-in shows "too many attempts, try again later" (not "wrong password") and writes an audit entry.

### S-08 Course draft collision retry (FR-504a, T-36)
- **Code:** `getOrCreateDraft` in `services/cms`.
- **Acceptance:** two concurrent first edits both succeed (one retry on the unique violation); covered by a concurrency test.

---

## Wave 2: before growing (P1)

### S-09 Payments (T-13, FR-703)
- **Needs:** Razorpay account and KYC. Env: `PAYMENT_PROVIDER_KEY_ID`, `PAYMENT_PROVIDER_SECRET`, `PAYMENT_WEBHOOK_SECRET`.
- **Code:** `services/payments`; `app/api/webhooks/payments/route.ts`.
- **Acceptance:** (1) signature verified before any work; (2) handling idempotent on `providerRef`; (3) enrolment created only on `PAID`; (4) refunds update status and access; (5) all events audited.
- **Tests:** bad signature, replayed webhook, out-of-order events.

### S-10 File storage and attachments (T-15, FR-702, FR-309)
- **Needs:** Cloudflare R2 or S3. Env: `STORAGE_BUCKET`, `STORAGE_REGION`, `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY`.
- **Code:** implement `StorageAdapter` in `services/storage`; attachment model; submission forms.
- **Acceptance:** signed upload URLs (files never pass through the server); size and type limits enforced; short-lived, role-authorised download URLs.

### S-11 Pagination, search, filters (T-14, FR-510)
- **Code:** cursor pagination in `listUsers`, `listRecentPayments`, notifications, certificates and reports, using the existing `Pagination` component.
- **Acceptance:** no unbounded list; filters run in the database; page size capped server-side.

### S-12 Student portfolio and skills screens (T-21, FR-308)
- **Code:** `app/student/portfolio` and `app/student/skills` over `services/portfolio` and `services/skills`.
- **Acceptance:** a learner manages only their own items; visibility respected; no Tailwind in route files.

### S-13 Trainer content authoring (T-22, FR-406)
- **Code:** `app/trainer/content/**` reusing the admin editor components, scoped to the trainer's courses.
- **Acceptance:** permission enforced in the service; publish only if permitted; audited.

### S-14 Certificate PDF and badge (T-23, FR-605)
- **Code:** PDF route for a certificate; share link and Open Graph image.
- **Acceptance:** PDF shows title, learner, date and verification code; revoked certificates cannot be downloaded.

### S-15 Service tests on a real database (T-17)
- **Needs:** the CI Postgres service (present).
- **Acceptance:** service tests for enrolments, progress, certificates and payments run in the `database` job.

### S-16 End-to-end tests (T-18, T-19)
- **Needs:** seeded database; Playwright.
- **Acceptance:** one happy path per role (student completes a lesson and quiz; trainer grades; admin publishes) runs in CI.

### S-17 Accessibility audit (T-20, NFR-08)
- **Acceptance:** keyboard and screen-reader pass on all three workspaces; contrast and tap-target results recorded in `docs/`.

### S-18 CSP nonces (T-24)
- **Acceptance:** `script-src` has no `'unsafe-inline'`; app and tests pass.

### S-19 Quiz attempt policy (T-33)
- **Needs: a business decision** (cap or cool-down).
- **Acceptance:** policy enforced in the quiz service and explained to the learner.

---

## Wave 3: product growth (P2)

| ID | Feature | Needs | Backlog |
|---|---|---|---|
| S-20 | Public catalogue, self sign-up, checkout; `Subscription` service | S-09 | T-25 |
| S-21 | Cohort announcements and discussion threads (FR-407, FR-408) | migration | T-26 |
| S-22 | Live sessions and attendance (FR-706) | Zoom or Daily, `LIVE_CLASS_API_KEY` | T-27 |
| S-23 | AI study assistant, trainer-approved drafts (FR-707) | `ANTHROPIC_API_KEY` | T-37 |
| S-24 | Video hosting | Mux or Stream, `VIDEO_PROVIDER_TOKEN_ID`, `VIDEO_PROVIDER_TOKEN_SECRET` | T-31 |
| S-25 | Product analytics and success dashboard (FR-704) | PostHog, `ANALYTICS_WRITE_KEY` | T-28 |
| S-26 | Two-factor sign-in or SSO (FR-207) | decision | T-29 |
| S-27 | Audit-log retention, export, learner data deletion | policy | T-30 |
| S-28 | SMS or WhatsApp reminders (FR-708) | Twilio or MSG91, `MESSAGING_PROVIDER_KEY` | T-38 |
| S-29 | Lighthouse and performance budgets in CI | none | T-34 |

---

## Environment integration checklist

Set in Vercel for **Production and Preview** (Preview needs its own database).

| Area | Item | Owner | Done when |
|---|---|---|---|
| Core | `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL` | You | `/api/health` is green |
| Core | Migrations applied, first admin created | You | T-02, T-03 |
| Git | Branch protection on `main` and `development`; default branch `development` | You | T-05 |
| Git | `GITHUB_PERSONAL_ACCESS_TOKEN` for the Claude `github` plugin (fine-grained, this repo only) | You | plugin connects |
| CI | `database` job green on `development` | Dev | T-08 |
| Email | S-01 keys, domain verified | You | test mail delivered |
| Monitoring | S-04 DSN | You | test error visible in Sentry |
| Rate limit | S-06 keys | You | limit shared across instances |
| Payments | S-09 keys; webhook URL registered | You | signed test webhook accepted |
| Storage | S-10 bucket and CORS for signed uploads | You | browser upload works |
| Backups | Point-in-time recovery on; one restore tested | You | T-10 |
| Legal | S-05 text | You | pages published |

## Claude Code tooling (development environment)

Declared in `.claude/settings.json`: `frontend-design`, `modern-web-guidance`, `chrome-devtools-mcp`, `playwright`, `typescript-lsp`, `context7`, `github`, `feature-dev`, `code-review`, `code-simplifier`, `pr-review-toolkit`, `commit-commands`, `security-guidance`, `claude-md-management`. Secrets such as the GitHub token live in user environment variables, never in the repository.
