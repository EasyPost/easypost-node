# Type Strategy (Permissive-First)

## Goal

As the source migrates from JavaScript to TypeScript, keep the SDK permissive and backwards-compatible for consumers while improving maintainability for contributors.

## Core Rules

1. Prefer permissive API boundaries.

- Request payloads should allow extension fields.
- Response objects should model known fields and allow unknown extras.

1. Prefer `unknown` over `any` by default.

- Use `unknown` for data that must be narrowed before use.
- Use `any` only at compatibility-critical dynamic seams (middleware adapters, opaque third-party objects), with a short justification comment.

1. Widen rather than narrow when uncertain.

- If a strict type risks breaking existing consumers, choose the wider compatible type in migration PRs.
- Track stricter candidates as follow-up work, not migration blockers.

1. Keep runtime behavior unchanged.

- No new runtime schema enforcement during migration.
- Typing changes must not alter accepted payloads or returned object shapes.

## Recommended Patterns

1. Input payloads

- Use known optional fields plus an index signature for open-ended payloads.
- Use `Record<string, unknown>` for opaque payload passthroughs.

1. Output payloads

- Type stable fields explicitly.
- Add `[key: string]: unknown` for provider-specific or future fields.

1. Middleware and hooks

- Keep callback inputs broad enough for current and future adapters.
- Preserve pass-through support for wrapper libraries.

1. Enums and literals

- Avoid over-constraining values that may expand server-side.
- Prefer `string` where provider values are not contractually closed.

## Review Checklist

- Does this type change preserve existing consumer call patterns?
- Does it avoid rejecting currently valid payloads?
- Is any `any` usage localized and justified?
- Are dynamic fields still representable without unsafe casts at call sites?
