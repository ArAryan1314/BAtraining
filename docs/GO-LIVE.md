# Go-live checklist

What has to happen on your side so `https://batraining.vercel.app` lets people sign in. The code is ready. These steps need your Vercel and database accounts.

If the sign-in page says *"Sign-in is temporarily unavailable"*, open `/api/health`. It names the missing setting.

## 1. Connect the repository to Vercel

The repository is private, which is fine. Vercel's GitHub integration works with private repositories on a personal account.

1. Vercel → **Add New → Project** → pick `BAtraining`, or open the existing project.
2. **Settings → Git → Production Branch**: `main`. Every other branch gets a Preview deployment.
3. Settings → General → Node.js version: **22.x**.

## 2. Create the database

Vercel → **Storage → Create → Postgres** (Neon) → connect it to the project. This adds `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING` and related variables automatically. The app recognises those names, so there is nothing to rename. See [VERCEL-DATABASE.md](VERCEL-DATABASE.md).

Use a **separate** database for Preview deployments. Otherwise previews read and write production data.

## 3. Set the environment variables

Vercel → **Settings → Environment Variables**. Set them for Production, and for Preview too.

| Variable | Value | Required |
|---|---|---|
| `AUTH_SECRET` | A random value of at least 16 characters. PowerShell: `[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))` | **Yes** |
| `DATABASE_URL` | Added by the Postgres integration, or set the pooled connection string yourself | **Yes** |
| `DIRECT_URL` | The non-pooled string, if the integration doesn't add one | Recommended |
| `NEXT_PUBLIC_APP_URL` | `https://batraining.vercel.app`. It is read at build time, so redeploy after changing it | Yes |
| `NEXTAUTH_URL` | Leave unset on Vercel. If you set it, it must be `https://…` | No |

Then **redeploy**. A production build runs `prisma migrate deploy` automatically (`scripts/vercel-build.mjs`), so on an empty database the tables are created for you.

> If the database already has tables from an earlier `db push`, that build fails with *"database schema is not empty"*. Run `pnpm db:baseline` once against it first. The old deployment keeps serving meanwhile.

Check `https://batraining.vercel.app/api/health`. You want `{"ok":true,"database":"up"}`.

## 4. Create the first admin (production)

Do **not** run the demo seed on production. It creates accounts with a known shared password. Create one real admin instead, from your machine:

```powershell
vercel link
vercel env pull .env.local          # gives your machine the database URL
$env:ADMIN_EMAIL = "you@yourdomain.com"
$env:ADMIN_PASSWORD = "a-long-random-passphrase"
pnpm db:admin
Remove-Item Env:ADMIN_PASSWORD
```

It prints `Created admin you@yourdomain.com` and never prints the password. Re-running it resets that admin's password. It refuses to touch an email that belongs to a trainer or student.

Then sign in at `/auth/login`. Create trainers and students from **Admin → Users**, and share each temporary password securely.

## Login credentials

**Production**

| Role | Email | Password |
|---|---|---|
| Admin | the `ADMIN_EMAIL` you chose in step 4 | the `ADMIN_PASSWORD` you chose |
| Trainer, Student | created by the admin in **Admin → Users** | set by the admin |

**Local development and staging only** (after `pnpm db:setup`, which runs the seed)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@baacademy.local` | `SEED_USER_PASSWORD`, default `ChangeMe123!` outside production |
| Trainer | `trainer@baacademy.local` | same |
| Student | `student@baacademy.local` | same |

Never seed these accounts onto a database real people use.

## 5. After it works

1. Confirm `/api/health` shows `database: up`.
2. Sign in as the admin and open **Admin → Settings**. It shows which integrations are still unconfigured.
3. Tag the release on `main` (see [BRANCHING.md](BRANCHING.md)).

## What stays out of the repository, and why

Everything in `.gitignore` is either rebuilt from the code or a secret. Making the repository private doesn't change that: collaborators, forks, build logs and any leaked token can still read it, and a secret in git history can't be taken back.

| Ignored | Why it is not committed | Where it comes from instead |
|---|---|---|
| `.env`, `.env.local` | Database URL, `AUTH_SECRET`, passwords | Vercel environment variables, or `vercel env pull` |
| `node_modules/` | Hundreds of MB, rebuilt from `pnpm-lock.yaml` | `pnpm install` |
| `.next/` | Build output | `pnpm build` |
| `generated/` | The Prisma client | `pnpm db:generate` (runs on install) |
| `*.tsbuildinfo` | A compiler cache | rebuilt |
| `.playwright-mcp/`, `.graphify/` | Tool output | rebuilt |

## Still open after login works

- **Email**: there is no password-reset or invite email yet. Admins hand out temporary passwords.
- **Payments and file storage** have no provider wired up (see [PROCUREMENT.md](PROCUREMENT.md)).
- **Sign-in rate limit** is per server instance. It needs a shared store (Upstash) to be global.
- **Error monitoring** (Sentry) is not set up; errors only reach the Vercel logs.
- **Branch protection** must be switched on in GitHub settings (see [BRANCHING.md](BRANCHING.md)).
