# EasyPost Node TS Migration Execution Board

## Goal

Execute the JS-to-TS migration as one native GitHub stack of dependent pull requests:

- No integration branch
- No manual merge choreography outside stack semantics
- Each PR targets the branch below it
- Backwards compatible runtime behavior
- Permissive type behavior for SDK consumers

This board is the operational companion to `TS_MIGRATION_PLAN.md`.

## GitHub Stacks Reference Model

Based on GitHub stacked pull requests docs:

- Bottom PR targets trunk (`master`).
- Every next PR targets the branch below.
- Stack-aware CI/rules apply across layers.
- Rebase and retargeting are handled by stack workflows.
- To land all migration layers together, merge from the top PR (or stack-merge up to top).

Notes:

- If only a lower PR is merged, upper PRs remain open and are re-targeted/rebased.
- We will not use a temporary integration branch.

## Operating Model

### Tooling

- GitHub CLI 2.90.0+ and Git 2.20+
- `gh extension install github/gh-stack`

Primary commands:

- `gh stack init`
- `gh stack add`
- `gh stack submit`
- `gh stack sync`
- `gh stack view`

Draft-first PR command behavior:

- Use `gh stack submit --auto` to create new stack PRs as drafts by default.
- Use `gh stack submit --open` only when a layer (or the whole stack) is ready for review.

### Stack Initialization

1. Start from clean `master`.
2. Initialize migration stack:
   - `gh stack init ts-migrate/00-baseline-safety-net`
3. Add each next branch at top with:
   - `gh stack add ts-migrate/<next-layer>`
4. Commit layer-specific changes on each branch.
5. Submit/update full stack with:
   - `gh stack submit --auto`
6. Keep stack current with:
   - `gh stack sync`

### Merge Policy

- We will not run merges directly from this execution process.
- Review/approval happens per layer.
- When repository maintainers are ready to land everything, they merge the top migration PR (or equivalent stack merge operation to top).
- New PRs should remain draft until a layer passes its required checks.

### PR Size Targets

- Preferred: 150-500 changed lines per PR.
- Hard cap: 800 changed lines unless it is mechanical rename-only work.
- If a PR exceeds cap, split by module boundary into an additional stack layer.

### Definition of Safe for Every PR

- Runtime behavior unchanged unless explicitly approved.
- Existing tests pass.
- Node compatibility is not regressed.
- Public API shape remains unchanged.

## Single Stack Topology

All branches are in one stack and must remain in this order.

1. `ts-migrate/00-baseline-safety-net`
2. `ts-migrate/01-ts-build-scaffolding`
3. `ts-migrate/02-package-export-readiness`
4. `ts-migrate/03-type-strategy-guardrails`
5. `ts-migrate/04-core-entry-shared-infra`
6. `ts-migrate/05-base-service-hydration`
7. `ts-migrate/06-services-group-a`
8. `ts-migrate/07-services-group-b`
9. `ts-migrate/08-services-group-c`
10. `ts-migrate/09-services-group-d`
11. `ts-migrate/10-services-group-e`
12. `ts-migrate/11-models-group-a`
13. `ts-migrate/12-models-group-b`
14. `ts-migrate/13-models-group-c`
15. `ts-migrate/14-models-group-d`
16. `ts-migrate/15-models-group-e`
17. `ts-migrate/90-cutover-generated-types`
18. `ts-migrate/91-cleanup-calibration`

## Detailed PR Board

| PR ID | Branch | Base Branch | Scope | Est. Effort | Required Checks |
| --- | --- | --- | --- | --- | --- |
| TSM-00 | `ts-migrate/00-baseline-safety-net` | `master` | baseline scripts, API surface snapshot, migration checklist wiring | S | build, test, lint, types, node-compat smoke |
| TSM-01 | `ts-migrate/01-ts-build-scaffolding` | `ts-migrate/00-baseline-safety-net` | tsconfig split, mixed JS/TS compile setup, lint parser readiness | M | build, test, lint, types |
| TSM-02 | `ts-migrate/02-package-export-readiness` | `ts-migrate/01-ts-build-scaffolding` | package metadata prep, consumer import compatibility tests | S | build, test, package smoke |
| TSM-03 | `ts-migrate/03-type-strategy-guardrails` | `ts-migrate/02-package-export-readiness` | permissive TS policy doc + type tests for compatibility | S | types, test |
| TSM-04 | `ts-migrate/04-core-entry-shared-infra` | `ts-migrate/03-type-strategy-guardrails` | convert core entry/shared files to TS with behavior parity | M | build, test, lint, types |
| TSM-05 | `ts-migrate/05-base-service-hydration` | `ts-migrate/04-core-entry-shared-infra` | convert base service + dynamic hydration layer | M | build, test, types, targeted service tests |
| TSM-06 | `ts-migrate/06-services-group-a` | `ts-migrate/05-base-service-hydration` | convert Group A services + immediate deps | M | group tests, build, types |
| TSM-07 | `ts-migrate/07-services-group-b` | `ts-migrate/06-services-group-a` | convert Group B services + immediate deps | M | group tests, build, types |
| TSM-08 | `ts-migrate/08-services-group-c` | `ts-migrate/07-services-group-b` | convert Group C services + immediate deps | M | group tests, build, types |
| TSM-09 | `ts-migrate/09-services-group-d` | `ts-migrate/08-services-group-c` | convert Group D services + immediate deps | M | group tests, build, types |
| TSM-10 | `ts-migrate/10-services-group-e` | `ts-migrate/09-services-group-d` | convert Group E services + immediate deps | M | group tests, build, types |
| TSM-11 | `ts-migrate/11-models-group-a` | `ts-migrate/10-services-group-e` | convert remaining Group A models | S-M | group tests, build, types |
| TSM-12 | `ts-migrate/12-models-group-b` | `ts-migrate/11-models-group-a` | convert remaining Group B models | S-M | group tests, build, types |
| TSM-13 | `ts-migrate/13-models-group-c` | `ts-migrate/12-models-group-b` | convert remaining Group C models | S-M | group tests, build, types |
| TSM-14 | `ts-migrate/14-models-group-d` | `ts-migrate/13-models-group-c` | convert remaining Group D models | S-M | group tests, build, types |
| TSM-15 | `ts-migrate/15-models-group-e` | `ts-migrate/14-models-group-d` | convert remaining Group E models | S-M | group tests, build, types |
| TSM-90 | `ts-migrate/90-cutover-generated-types` | `ts-migrate/15-models-group-e` | generated declarations from src, remove `types/`, metadata switch | M-L | full CI, package smoke, TS demo compile |
| TSM-91 | `ts-migrate/91-cleanup-calibration` | `ts-migrate/90-cutover-generated-types` | remove migration-only exceptions, docs cleanup, final polish | S-M | full CI |

## Scope Group Definitions

Group A:

- Address, Parcel, Customs, Shipment

Group B:

- Batch, Order, Pickup, Rate, SmartRate, ScanForm, Refund

Group C:

- CarrierAccount, CarrierType, CarrierMetadata, Billing

Group D:

- Tracker, Event, Webhook, Insurance, Claim

Group E:

- User, ApiKey, Referral/CustomerPortal, EndShipper, Embeddable, Luma, FedExRegistration

## File Ownership Boundaries Per Layer

Each layer must only edit files in its declared scope plus minimal shared typing/config glue needed to compile.

Foundation layers (TSM-00 through TSM-05) can edit:

- `package.json`
- `tsconfig*.json`
- `.eslintrc`
- `.github/workflows/ci.yml`
- core runtime files (`src/easypost.*`, `src/constants.*`, base utilities, base service/model primitives)

Service/model layers (TSM-06 through TSM-15):

- only module-group service/model files
- related tests for those modules
- minimal local imports/types required by those modules

Cutover layers (TSM-90 through TSM-91):

- `types/` deletion and declaration wiring
- docs updates
- removal of migration scaffolding

## Agent Collaboration Model (Parallel Research, Serial Landing)

Multiple agents are still useful with a single stack:

- Stack Maintainer:
  - owns branch creation, stack submit/sync, and final PR descriptions
- Worker Agents:
  - prepare patch proposals for upcoming layers
  - run focused verification on their slice
  - hand off patch sets to stack maintainer

Landing policy:

- Exactly one active landing branch at a time (current top of stack).
- Accepted worker patches are applied in stack order.
- No separate integration branch.

## Required Validation Matrix by Stage

### Foundation Layers

Run:

- `npm run build`
- `npm run test`
- `npm run lint`
- `npm run typescript`

### Service/Model Layers

Run:

- `npm run build`
- `npm run test` (targeted subset allowed for per-layer iteration)
- `npm run typescript`

### Cutover Layers

Run:

- `npm run clean && npm run build`
- `npm run test`
- `npm run lint`
- `npm run typescript`
- package smoke install/consume tests for CJS, ESM, TS demo

## Stack Coordination Playbook

1. Initialize stack and create TSM-00 branch.
2. Create each next branch with `gh stack add` in strict order.
3. Commit one logical unit per branch layer.
4. Submit/update PR chain with `gh stack submit --auto` (draft by default).
5. Keep stack rebased and synchronized with `gh stack sync`.
6. Review each layer in GitHub stack map.
7. Land entire migration by merging top PR when approved.

## Post-Migration Cleanup (Expected)

After TSM-91 and a stabilization period, clean up migration-only scaffolding.

Likely cleanup candidates:

- Consolidate migration-specific TypeScript scripts in `package.json`.
- Collapse temporary multi-tsconfig setup if fewer files can represent the final workflow.
- Remove temporary lint overrides that were only needed during mixed JS/TS transition.
- Archive or remove migration process docs that are no longer active runbooks.
- Keep only durable compatibility tests; remove one-off transition tests.

Cleanup acceptance criteria:

- No loss of runtime behavior coverage.
- No loss of CJS/ESM import compatibility checks.
- No loss of permissive public type-surface regression coverage.

## Labeling

Recommended labels:

- `ts-migration`
- `stacked-pr`
- `compatibility-critical`
- `permissive-types`
- `tsm-00` ... `tsm-91`

## PR Summary Standards

Do not leave the pull request template text in place.

For each stacked PR, replace the template with a concise, PR-specific summary:

- 1 short paragraph describing what changed in this layer.
- 3-6 bullets listing concrete file/scope changes.
- a short testing section with exact commands run.

Keep PR summaries brief and communicative:

- avoid long narrative prose.
- avoid repeating migration context from other docs.
- link to stack PR numbers only when needed for dependency context.

Suggested title pattern:

- `TSM-XX: <action-oriented summary>`

Suggested body shape:

- `Summary`
- `Changes in this PR`
- `Testing`
- `Stack Context` (optional, one line)

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Hidden runtime behavior drift during conversion | Medium | High | no-refactor rule, baseline snapshots, test parity |
| Type tightening causes consumer compile failures | Medium | High | permissive guardrails, type tests, widen by default |
| Branch drift within stack | Medium | High | frequent `gh stack sync`, single maintainer ownership |
| Declaration output path mistakes at cutover | Medium | High | package smoke tests + TS demo compile |
| CI duration growth slows review loop | Medium | Medium | targeted checks per layer + full checks at cutover |

## Cutover Gate Checklist (Must Be Green Before TSM-90 Merge)

- [ ] Layers TSM-00 through TSM-15 are complete and green
- [ ] No remaining `.js` source in `src/`
- [ ] Declarations generated from TS source successfully
- [ ] `types/` no longer required by any script/workflow
- [ ] package consume tests pass for CJS/ESM/TS users

## Release Readiness Checklist (Before Landing Top PR)

- [ ] Changelog entry drafted for migration internals and no expected runtime break
- [ ] README updated to reflect TS-source-generated declarations
- [ ] UPGRADE_GUIDE updated if any type-level behavior requires note
- [ ] Post-merge monitoring owner assigned

## Suggested Execution Cadence

- Foundation phase: one layer per day
- Conversion phase: one to two layers per day depending on churn
- Cutover phase: one focused layer per day
- Rebase/sync window: at least twice daily

## Optional Automation Helpers

- Script to verify layer ownership boundaries by glob before CI.
- Script to compare exported key lists against baseline snapshots.
- Script to ensure no `types/` imports remain after cutover.
