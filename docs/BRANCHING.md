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
| `main` | What is live. Every commit on it is a release. | Vercel **Production** | Nobody directly. Only merged `release/*` and `hotfix/*` PRs |
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

`scripts/branch-rules.mjs` enforces these names and targets. CI runs it on every pull request, so a `feature/` branch opened against `main` fails.

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

## Hotfixes

For a production defect that can't wait for the next release:

```powershell
git checkout main && git pull
git checkout -b hotfix/session-crash
# fix, pnpm check, commit, push
```

Open a PR into `main`, merge, tag a patch version (`v1.3.1`), then merge the same fix into `development` through a second PR.

## Database changes

A schema change ships in the same pull request as its migration (`pnpm db:migrate`). Migrations only reach the production database from a `main` build. Preview builds skip them. Use a separate database for Preview, as described in [VERCEL-DATABASE.md](VERCEL-DATABASE.md).

## Protect the branches on GitHub

These are repository settings, and they can't be committed. Under **Settings → Branches → Add rule**, for both `main` and `development`:

- Require a pull request before merging, with at least 1 approval
- Require status checks to pass: **branch-rules** and **check**
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
