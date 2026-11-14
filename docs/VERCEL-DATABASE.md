# Connecting the Vercel database

The app talks to PostgreSQL through Prisma's `pg` driver adapter. These steps connect your local machine and your Vercel deployments to the same hosted database and apply the schema safely.

## 1. Pull the connection strings (once, on your machine)

```powershell
npm i -g vercel
vercel login
vercel link              # pick the existing project
vercel env pull .env.local
```

`.env.local` is git-ignored. Never paste its contents into chat or a commit.

The code recognises Vercel's variable names automatically, so nothing needs renaming:

| Used for | Looked up in this order |
|---|---|
| The running app (pooled) | `DATABASE_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL` |
| Migrations and `db push` (direct) | `DIRECT_URL`, `DATABASE_URL_UNPOOLED`, `POSTGRES_URL_NON_POOLING`, then the pooled URL |

Only standard `postgres://` URLs are used. If the integration is **Prisma Postgres** and `DATABASE_URL` starts with `prisma+postgres://`, the app skips it and uses `POSTGRES_URL` instead, which Vercel also sets. If neither exists, startup stops with a clear message.

## 2. Apply the schema

The repo now has real migrations (`prisma/migrations`): `0_init` is the baseline and `1_certificate_unique` adds the unique certificate constraint. Pick the case that matches the database.

**A. The database is empty**

```powershell
pnpm db:deploy
pnpm db:seed          # demo accounts; needs SEED_USER_PASSWORD
```

**B. The tables already exist** (created earlier with `db push`)

```powershell
pnpm db:baseline      # marks 0_init as already applied, without running it
pnpm db:deploy        # applies 1_certificate_unique
```

`1_certificate_unique` fails if a student already has two certificates with the same title. Find them first:

```sql
SELECT "studentId", title, count(*) FROM "Certificate" GROUP BY 1, 2 HAVING count(*) > 1;
```

## 3. Environment variables in Vercel

Set these for **Production** (and Preview, with a separate database):

| Variable | Value |
|---|---|
| `DATABASE_URL` | Pooled connection string (or let the integration provide `POSTGRES_URL`) |
| `DIRECT_URL` | Non-pooled string, used only for migrations |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-domain` (https is required in production) |
| `NEXT_PUBLIC_APP_URL` | Same domain. It's read at build time, so redeploy after changing it |
| `DATABASE_POOL_MAX` | Optional, default 5 |

## 4. What the build does

`vercel.json` runs `scripts/vercel-build.mjs`:

1. `prisma generate`
2. `prisma migrate deploy`, **only when `VERCEL_ENV=production`**. A preview deployment never touches the production schema.
3. `next build`

## 5. Settings worth checking in the Vercel dashboard

- **Function region** should match the database region. A cross-region hop adds latency to every query.
- **Pooled string for the app.** Serverless instances multiply connections. The pool is capped at 5 per instance (`DATABASE_POOL_MAX`) and idle connections are released after 10 seconds.
- **SSL.** Hosted databases require `sslmode=require` in the URL. Vercel's strings include it.
- **Separate Preview database.** Without one, preview deployments read and write production data.
- **Backups.** Turn on point-in-time recovery on the database plan.
- **Uptime check.** Point a monitor at `/api/health`. It returns 503 when the database is unreachable.
- **Rotate credentials** if `.env.local` is ever shared or committed.

## Verifying the connection

```powershell
pnpm exec prisma migrate status    # should report "Database schema is up to date"
pnpm dev                           # then open http://localhost:3000/api/health -> {"ok":true,"database":"up"}
```
