## What and why
<!-- One or two sentences. Link the issue if there is one. -->

## Type
- [ ] feature  (branch `feature/...`, targets `development`)
- [ ] bugfix   (branch `bugfix/...`, targets `development`)
- [ ] release  (branch `release/x.y.z`, targets `main`)
- [ ] hotfix   (branch `hotfix/...`, targets `main`, then merge back into `development`)

## Checklist
- [ ] `pnpm check` passes
- [ ] Schema change? A migration is included (`pnpm db:migrate`) and noted below
- [ ] User-visible change? `content/changelog.ts` has an entry
- [ ] New setting? `.env.example` and `config/integrations.ts` are updated

## Notes for the reviewer
<!-- Migration steps, new environment variables, anything to check after deploy. -->
