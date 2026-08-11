# Canonical metadata repair handoff

- Timestamp: 2026-08-11T13:30:34+09:00
- Goal: repair the homepage-canonical collapse on `pregnancy.ehon365.kr` with the smallest possible source change.
- Scope: remove only the root `alternates.canonical: "/"` override from `src/app/layout.tsx`. No content, ads, account, GSC, AdSense, CMS, SSH, or cache work.

## Source and deployment evidence

- Clean clone: `D:\web\pregnancy-canonical-20260811-133034`, pinned from `origin/main` at `59d6ec1dc9d93956326955cf09c661b844c09338`.
- `.vercel/project.json`: project `pregnancy-ehon365-kr` (`prj_Flw0C8LtlR9SusncRHCNunJ9lHYD`) in `limsubs-projects`.
- Vercel production deployment `dpl_28pK3hxcnvjr46Mmj34rY3UM4XpV` is Ready and aliases `https://pregnancy.ehon365.kr`.

## Change and rationale

The root layout previously supplied `canonical: "/"`, causing descendants without their own override to declare the homepage as canonical. Removing that root override lets Next.js derive each route's canonical from `metadataBase` and the current pathname, while preserving the RSS alternate and route-specific metadata.

## Risk notice and rollback

- Task: Git-connected production metadata repair.
- Impact: canonical `<link>` metadata only for affected routes.
- Rollback: revert this focused commit, push `main`, then confirm the Vercel production alias resolves to the rollback deployment.
- Safer alternative rejected: editing the dirty original checkout; a new clean clone preserves unrelated owner work.
- Approval: supplied in the task instruction to commit, push, and verify after clean-clone parity.

## Verification status

`npm ci` is blocked by a pre-existing `package-lock.json` dependency-tree mismatch; it was not changed. A disposable-clone `npm install --package-lock=false` enabled `tsc --noEmit` and `npm run build`, both of which passed. The build produced expected local missing-SQLite-table fallback logs but exited successfully.

No supported test-runner or standalone ESLint configuration exists in this repository.

## Implemented metadata expansion

The root canonical remains `/` for the homepage. Each verified non-home page family now overrides it with an explicit self-canonical: `/blog`, `/pregnancy/[week]`, `/fetal-insurance`, `/about`, `/contact`, `/privacy`, and `/terms`. This is metadata-only; no rendered content, data access, advertising, or external operational state changed.

`scripts/verify-canonicals.mjs` is a no-dependency regression verifier: it starts the built Next.js app locally, asserts HTTP 200 and the exact canonical URL for home plus the seven required routes, and stops its child server.

## Validation

- `tsc --noEmit` passed.
- `npm run build` passed. Local missing-SQLite-table fallback logs are expected in the clone without seeded data and did not affect the build outcome.
- `node scripts/verify-canonicals.mjs` passed for `/`, `/blog`, `/pregnancy/18`, `/fetal-insurance`, `/about`, `/contact`, `/privacy`, and `/terms`.
- `npm ci` remains unavailable because the committed lockfile has a pre-existing dependency-tree mismatch; it was not edited. `npm install --package-lock=false` was used only to populate ignored dependencies in this disposable clone.

## Commit and deployment handoff

- Focused commit was rebased onto the concurrent upstream commit `5421756` and is now `3e8b0c3` (`fix(seo): add route self-canonicals`).
- The original checkout remains untouched; this clone is clean after the rebase and regression rerun.
- Rollback after production verification: `git revert 3e8b0c3`, push `main`, then re-run `node scripts/verify-canonicals.mjs` locally and the eight public probes.

Next action: push `3e8b0c3` to `origin/main`, wait for the Git-connected Vercel production deployment, then repeat the eight-route canonical assertions against `https://pregnancy.ehon365.kr`.
