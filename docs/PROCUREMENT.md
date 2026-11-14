# Procurement list

Everything below is bought or provisioned outside the codebase. `config/integrations.ts` is the source of truth; this table and `.env.example` follow it. Vendor names are options to compare, not endorsements. Check current pricing and data-residency terms before buying.

| Service | Required to launch | Why | Options | Env variables | Plugs into |
|---|---|---|---|---|---|
| Managed PostgreSQL | Yes | Primary data store with backups and point-in-time recovery. | Neon, Supabase, AWS RDS, Vercel Postgres | `DATABASE_URL` | `lib/db/prisma.ts` |
| Session signing | Yes | Signs sign-in cookies. Generate it, don't buy it. | openssl rand -base64 32 | `AUTH_SECRET` | `lib/auth/options.ts` |
| Transactional email | Yes | Password reset, enrolment, grading and certificate emails. | Resend, Postmark, AWS SES | `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM` | `services/notifications` |
| Payment gateway | Yes | Course fees, invoices, refunds and signed webhooks. | Razorpay, Stripe, Cashfree | `PAYMENT_PROVIDER_KEY_ID`, `PAYMENT_PROVIDER_SECRET`, `PAYMENT_WEBHOOK_SECRET` | `services/payments` |
| File storage | Yes | Assignment attachments, avatars and downloadable resources. | Cloudflare R2, AWS S3, Vercel Blob | `STORAGE_BUCKET`, `STORAGE_REGION`, `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY` | `services/storage` |
| Video hosting | No | Adaptive, access-controlled lesson video instead of public links. | Mux, Cloudflare Stream, Vimeo OTT | `VIDEO_PROVIDER_TOKEN_ID`, `VIDEO_PROVIDER_TOKEN_SECRET` | `services/cms` |
| Shared rate-limit store | Yes | Makes sign-in throttling work across every server instance. | Upstash Redis, Vercel KV | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | `lib/security/rate-limit.ts` |
| Bot protection | No | Stops spam on the contact form and credential stuffing on sign-in. | Cloudflare Turnstile, hCaptcha | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | `components/public/ContactForm.tsx` |
| Error monitoring | Yes | Captures server and browser exceptions that today only reach console.error. | Sentry, Highlight, Datadog | `SENTRY_DSN` | `lib/actions/result.ts` |
| Product analytics | No | Funnels, retention and course engagement beyond the built-in progress events. | PostHog, Plausible, Mixpanel | `ANALYTICS_WRITE_KEY` | `services/analytics` |
| Live classes | No | Scheduled cohort sessions with attendance and recordings. | Zoom Meeting SDK, Daily, Google Meet API | `LIVE_CLASS_API_KEY` | `new services/sessions` |
| SMS / WhatsApp reminders | No | Deadline and session reminders where email is ignored. | Twilio, MSG91, Gupshup | `MESSAGING_PROVIDER_KEY` | `services/notifications` |
| AI study assistant | No | Answers learner questions and drafts feedback for trainers to approve. | Anthropic Claude API | `ANTHROPIC_API_KEY` | `new services/assistant` |

## Also buy, but no environment variable

- **Domain and DNS** (Cloudflare, Namecheap) plus TLS. Vercel issues the certificate.
- **Hosting**: Vercel (already configured in `vercel.json`). Pro plan is needed for commercial use.
- **Uptime monitoring** against `/api/health` (Better Stack, UptimeRobot). It returns 503 when the database is down.
- **Business email** on your domain, so `EMAIL_FROM` passes SPF/DKIM/DMARC.
- **Legal**: terms, privacy policy and a refund policy. Payment gateways ask for them during onboarding.
- **Gateway KYC**: Razorpay and Stripe need business verification, which takes days. Start it first.

## Order to buy in

1. Domain, Vercel and managed Postgres.
2. Email, since password reset depends on it.
3. Payment gateway (start KYC early).
4. Storage, then video.
5. Upstash and Sentry, both small.
6. Optional extras once learners are on the platform.

## Checking it worked

Set the variables in Vercel, redeploy, and open **Admin > Settings**. Each service shows Configured or Not configured, and required ones that are missing show a warning. The page only reports yes/no, never the values.
