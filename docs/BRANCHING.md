# Branching strategy

Two long-lived branches, and short-lived working branches for features, bug fixes, releases and hotfixes.

```
main         ●─────────────●──────────────●──────────●   production, tagged vX.Y.Z
              \           / \            / \        /
release/1.3.0  \     ●──●    \          /   hotfix/x
                \   /         \        /
development      ●─●─●──●──●───●──●──●─●──●──●───────     integration, always releasable
                  \ / \ /  \ /
feature/…          ●   ●    ●  bugfix/…
```

| Branch | Purpose | Deploys to | Who can push |
|---|---|---|---|
| `main` | What is live. Every commit on it is a release. | Vercel **Production** | Nobody directly. Only merged `development`, `release/*` and `hotfix/*` PRs |
| `development` | Where finished work is combined and tested. Always in a releasable state. | Vercel **Preview** | Nobody directly. Only merged PRs |

## Working branches

All are short-lived. Name them in lowercase with hyphens.

| Type | Branch from | Merge into | Name | Use for |
|---|---|---|---|---|
| Feature | `development` | `development` | `feature/<name>` | New behaviour, a new page, a new integration |
| Bug fix | `development` | `development` | `bugfix/<name>` | A defect found in `development` or in a release candidate |
| Release | `development` | `main`, then back into `development` | `release/<major>.<minor>.<patch>` | Stabilising and shipping a version |
| Hotfix | `main` | `main`, then into `development` | `hotfix/<name>` | An urgent defect already in production |
| Chore / docs | `development` | `development` | `chore/<name>`, `docs/<name>` | Tooling, dependencies, documentation |

`scripts/branch-rules.mjs` enforces these names and targets. CI runs it on every pull request, so a `feature/` branch opened against `main` fails. The one pull request allowed to start from a long-lived branch is `development` into `main`, the normal way to ship. Dependabot's own `dependabot/*` branches are allowed into `development`.

## Day to day

```powershell
git checkout development
git pull
git checkout -b feature/student-notes        # or bugfix/login-redirect

# work, then
pnpm check
git commit -m "feat: add student notes"
git push -u origin feature/student-notes
```

Open a pull request into `development`, get a review, and merge. Delete the branch afterwards.

Write commit messages as `type: summary` using `feat`, `fix`, `docs`, `chore`, `refactor` or `test`. Keep each pull request to one purpose.

## Releasing

Releases are versioned `MAJOR.MINOR.PATCH`: breaking change, new feature, bug fix.

### The normal way: promote `development`

1. On `development` (through a normal PR), bump `version` in `package.json` and add the entry to `content/changelog.ts`.
2. Open a pull request **`development` into `main`**. CI must pass.
3. Merge it with **Create a merge commit**, not squash. A squash gives `main` a commit `development` doesn't have, and the two branches drift apart.
4. Vercel deploys production. If the release has a migration, the production build applies it (`scripts/vercel-build.mjs`).
5. Tag the merge commit and push the tag:
   ```powershell
   git checkout main && git pull
   git tag -a v1.3.0 -m "Release 1.3.0"
   git push origin v1.3.0
   ```
6. If `main` ended up with commits `development` lacks (a hotfix, for instance), merge them back through a short `chore/back-merge-1.3.0` branch.

### When a release needs stabilising: a release branch

Use a `release/x.y.z` branch when you want to freeze a release while `development` keeps moving.

1. Cut the release branch from an up-to-date `development`:
   ```powershell
   git checkout development && git pull
   git checkout -b release/1.3.0
   ```
2. On that branch only: bump `version` in `package.json`, add the entry to `content/changelog.ts`, and fix release-blocking bugs. No new features.
3. Open a PR `release/1.3.0` into `main`. CI must pass.
4. Merge it. Vercel deploys production. If the release has a migration, the production build applies it (`scripts/vercel-build.mjs`).
5. Tag the merge commit and push the tag:
   ```powershell
   git checkout main && git pull
   git tag -a v1.3.0 -m "Release 1.3.0"
   git push origin v1.3.0
   ```
6. Merge `main` back into `development` so the version bump and any release fixes aren't lost. Open the PR from `main`'s tip using a short `chore/back-merge-1.3.0` branch.

## Settings to apply on GitHub

Set `development` as the **default branch** (Settings → General → Default branch). Otherwise GitHub pre-fills `main` as the base of every new pull request, and feature branches fail the `branch-rules` check.

## Hotfixes

For a production defect that can't wait for the next release:

```powershell
git checkout main && git pull
git checkout -b hotfix/session-crash
# fix, pnpm check, commit, push
```

Open a PR into `main`, merge, tag a patch version (`v1.3.1`), then merge the same fix into `development` through a second PR.

## Pipeline

GitHub Actions (`.github/workflows`) and Vercel split the work:

| Where | When | What |
|---|---|---|
| `ci.yml` → **branch-rules** | every PR | Checks branch name and target |
| `ci.yml` → **check** | every PR and push to `main`/`development` | `pnpm check` and a production build |
| `ci.yml` → **database** | same | Applies all migrations to an empty Postgres, fails if `schema.prisma` has a change with no migration, runs the seed |
| `ci.yml` → **audit** | same | `pnpm audit` on production dependencies. Advisory only |
| `release.yml` | a `vX.Y.Z` tag is pushed | Checks the tag is on `main` and matches `package.json`, then creates the GitHub release with generated notes |
| Vercel | push to `main` / any other branch | Production deploy (runs `migrate deploy`) / Preview deploy |
| Dependabot | weekly | Opens dependency PRs into `development` |

Require **branch-rules**, **check** and **database** as status checks in branch protection.

## Database changes

A schema change ships in the same pull request as its migration (`pnpm db:migrate`). Migrations only reach the production database from a `main` build. Preview builds skip them. Use a separate database for Preview, as described in [VERCEL-DATABASE.md](VERCEL-DATABASE.md).

## Protect the branches on GitHub

These are repository settings, and they can't be committed. Under **Settings → Branches → Add rule**, for both `main` and `development`:

- Require a pull request before merging, with at least 1 approval
- Require status checks to pass: **branch-rules**, **check** and **database**
- Require branches to be up to date before merging
- Block force pushes and branch deletion

Under **Settings → General → Pull Requests**, enable "Automatically delete head branches".

## Existing branches

Earlier work used a few names that predate this strategy. They are all merged into `main` and can be deleted.

| Old branch | Status |
|---|---|
| `platform-foundation` | merged (PR #1) |
| `feature/all-workspace-features` | merged (PR #5) |
| `feature/hardening-seo-dashboards` | merged (PR #4) |
| `fix/health-config-diagnostics` | merged (PR #6). From now on this would be `bugfix/...` |
