# Production Deployment

## Vercel

1. Push this repository to Git.
2. Import it into Vercel as a Next.js application.
3. Set production environment variables from `.env.example`, plus `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses the pnpm version pinned in `package.json`.
4. Point `DATABASE_URL` to a managed PostgreSQL instance.
5. Configure `AUTH_SECRET` and the storage, email, payment and analytics secrets.
6. Run Prisma migrations from CI/release tooling before serving new application code.
7. Verify `/api/health` after deployment.

## Security checklist

- Never expose `DATABASE_URL`, auth secrets or provider secrets to `NEXT_PUBLIC_*` variables.
- Use signed webhook verification for payments.
- Enforce `requirePermission()` in service/server actions.
- Record sensitive administrative mutations with `writeAuditLog()`.
- Validate external inputs with Zod.
- Keep dependency lockfiles committed in the application repository.
- Run the full validation gate in CI.
