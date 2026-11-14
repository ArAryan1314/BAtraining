export interface Integration {
  id: string;
  name: string;
  purpose: string;
  /** Vendors worth comparing. The app talks to them only through a service adapter, so any one can be swapped for another. */
  options: readonly string[];
  /** Every key must be set for the integration to count as configured. */
  env: readonly string[];
  /** Whether the platform can't run in production without it. */
  required: boolean;
  /** The service adapter that will consume it. */
  adapter: string;
}

export const integrations: readonly Integration[] = [
  { id: "database", name: "Managed PostgreSQL", purpose: "Primary data store with backups and point-in-time recovery.", options: ["Neon", "Supabase", "AWS RDS", "Vercel Postgres"], env: ["DATABASE_URL"], required: true, adapter: "lib/db/prisma.ts" },
  { id: "auth", name: "Session signing", purpose: "Signs sign-in cookies. Generate it, don't buy it.", options: ["openssl rand -base64 32"], env: ["AUTH_SECRET"], required: true, adapter: "lib/auth/options.ts" },
  { id: "email", name: "Transactional email", purpose: "Password reset, enrolment, grading and certificate emails.", options: ["Resend", "Postmark", "AWS SES"], env: ["EMAIL_PROVIDER_API_KEY", "EMAIL_FROM"], required: true, adapter: "services/notifications" },
  { id: "payments", name: "Payment gateway", purpose: "Course fees, invoices, refunds and signed webhooks.", options: ["Razorpay", "Stripe", "Cashfree"], env: ["PAYMENT_PROVIDER_KEY_ID", "PAYMENT_PROVIDER_SECRET", "PAYMENT_WEBHOOK_SECRET"], required: true, adapter: "services/payments" },
  { id: "storage", name: "File storage", purpose: "Assignment attachments, avatars and downloadable resources.", options: ["Cloudflare R2", "AWS S3", "Vercel Blob"], env: ["STORAGE_BUCKET", "STORAGE_REGION", "STORAGE_ACCESS_KEY", "STORAGE_SECRET_KEY"], required: true, adapter: "services/storage" },
  { id: "video", name: "Video hosting", purpose: "Adaptive, access-controlled lesson video instead of public links.", options: ["Mux", "Cloudflare Stream", "Vimeo OTT"], env: ["VIDEO_PROVIDER_TOKEN_ID", "VIDEO_PROVIDER_TOKEN_SECRET"], required: false, adapter: "services/cms" },
  { id: "rate-limit", name: "Shared rate-limit store", purpose: "Makes sign-in throttling work across every server instance.", options: ["Upstash Redis", "Vercel KV"], env: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"], required: true, adapter: "lib/security/rate-limit.ts" },
  { id: "bot-protection", name: "Bot protection", purpose: "Stops spam on the contact form and credential stuffing on sign-in.", options: ["Cloudflare Turnstile", "hCaptcha"], env: ["TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"], required: false, adapter: "components/public/ContactForm.tsx" },
  { id: "monitoring", name: "Error monitoring", purpose: "Captures server and browser exceptions that today only reach console.error.", options: ["Sentry", "Highlight", "Datadog"], env: ["SENTRY_DSN"], required: true, adapter: "lib/actions/result.ts" },
  { id: "analytics", name: "Product analytics", purpose: "Funnels, retention and course engagement beyond the built-in progress events.", options: ["PostHog", "Plausible", "Mixpanel"], env: ["ANALYTICS_WRITE_KEY"], required: false, adapter: "services/analytics" },
  { id: "live-classes", name: "Live classes", purpose: "Scheduled cohort sessions with attendance and recordings.", options: ["Zoom Meeting SDK", "Daily", "Google Meet API"], env: ["LIVE_CLASS_API_KEY"], required: false, adapter: "new services/sessions" },
  { id: "messaging", name: "SMS / WhatsApp reminders", purpose: "Deadline and session reminders where email is ignored.", options: ["Twilio", "MSG91", "Gupshup"], env: ["MESSAGING_PROVIDER_KEY"], required: false, adapter: "services/notifications" },
  { id: "ai-tutor", name: "AI study assistant", purpose: "Answers learner questions and drafts feedback for trainers to approve.", options: ["Anthropic Claude API"], env: ["ANTHROPIC_API_KEY"], required: false, adapter: "new services/assistant" },
] as const;

export const integrationEnvKeys: readonly string[] = [...new Set(integrations.flatMap((integration) => integration.env))].filter((key) => key !== "DATABASE_URL" && key !== "AUTH_SECRET");
