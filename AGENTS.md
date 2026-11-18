<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

## Panel lists

Always load growing data lists in `/workspace` automatically when their bottom enters the viewport, including documents, repositories, folders, versions and recipients. Append batches of 10; preserve existing items, scroll position, keyboard focus, context and selection. Show row skeletons during loading; keep existing items while appending. Reset the visible count and cancel pending loads on search, filter or sort changes. Use the shared workspace LoadMore component and cumulative helper. Do not use numbered pagination or require a button click for normal loading. Keep a manual fallback only for browsers without IntersectionObserver. Short lists need no extra control; fixed menus and form options are not data lists. Mock loading currently simulates 600ms latency; a future backend should drive loading from the request lifecycle.

## Design system component previews

Every newly designed UI component must have a representative example on the relevant independent design system catalogue page, reachable from `app/page.tsx` and the catalogue menu. Keep demo data and interactions in `components/design-system`; keep React component files within 200 physical lines and add `data-test-id` to interactive elements.

## Grow the design system with Clasor pages

- For every Clasor page design or revision, compare the observed elements, controls and interaction patterns with the existing design system before implementation.
- Reuse or extend an existing component when it covers the need. When a required component or pattern is missing, implement it and its catalogue example alongside the page; do not leave the reusable part embedded only in the page preview.
- Keep product-independent primitives and compositions in `components/ui`, product behavior in its owning product module, and fictional data and preview interactions in `components/design-system`. Document product-specific compositions as patterns without moving business rules into generic primitives.
- Show representative states and interactions in the component catalogue, including keyboard behavior, RTL, responsive layout and relevant disabled, loading, empty or error states. Update the owning component contract when its public API or behavior changes.
- Preserve the source page's content structure and behavior while applying the shared visual contracts. New components must address an observed need rather than add unrequested product features.
- Include the page, missing components, catalogue examples and their documentation in the same feature branch and logical delivery. A standalone product-page preview does not replace a component catalogue example.

## Unified glass contracts

Use the static Tailwind contracts in `lib/design-system/classes.ts` for shared panels, controls and navigation. Only generated `tokens.css` and variable-only `theme.css` belong in that directory; component CSS is forbidden there by `check-style-contracts.mjs`. Catalogue geometry lives in `components/design-system/catalogue-layout.ts`; shell-specific nested styles live beside their workspace/wireframe components. Main wrappers are glass; table data rows may stay opaque. Use shadcn Select; native `<select>` is forbidden in authored React. Add explicit `data-test-id` to authored DOM containers and interactive leaves; preserve wrapper test IDs when composing Base UI `render` elements. Use logical RTL utilities. Run `npm run ui:check`, `npm run lint`, and `npm run build` before delivery. Do not bypass the 200 physical line limit; split modules while retaining public exports.

## Retrieval and source precedence

Start with [docs/RAG.md](docs/RAG.md) to select the relevant source. Current user instructions take precedence, then these engineering rules; current implementation, `classes.ts`, material CSS and `MATERIALS.md` establish the implemented contract. Older stage reports and generated exports are historical evidence, not permission to restore retired behavior. If source and current documentation disagree, inspect and resolve the mismatch explicitly.

`AGENTS.md` is the actual agent entry point; do not create a competing `AGENT.md`. The retired `clasor-design-system/` HTML package and ignored `ds-bundle/` are not source directories. Do not edit generated `tokens.css` directly; change `tokens.json` and run `npm run tokens:generate`.

`specs/INDEX.md` is the sole specification index. Regenerate it from remaining source specs with `node scripts/update-spec-index.mjs`; use `--check` for verification. Run `node scripts/check-doc-links.mjs` after documentation cleanup. Preserve relevant product history, distinguish historical material plans from the current contract, and remove references when retiring files.

## Component architecture and interaction

- Keep shadcn/Base UI primitives and product-independent compositions in `components/ui`. Keep sample data in `components/design-system`; render new components through `app/page.tsx`. AppLayout is a template; GlassHeader/GlassSidebar/GlassModal/SolidDataTable/SolidForm are compositions; GlassCard owns the common semantic surface.
- Preserve barrel exports when splitting files into `*-part-*` modules. Keep all authored React files within 200 physical lines, including blank lines and comments; never compress code or disable lint to evade the limit.
- Panels use 30% tint, 12px backdrop blur, white borders and restrained shadows; use rounded-lg or rounded-xl. Avatars and decorative mesh circles may remain circular. Preserve AppLayout's fixed blue/purple backdrop. `glass-enabled` and `opaque` are Tailwind variants in app/globals.css; keep mode/contrast/motion overrides in the relevant utility contracts instead of recreating global component selectors. Layer legacy route geometry under `@layer components` so utilities own appearance.
- Inputs must be visible before focus: white at 40%, gray border and inset shadow; dark fields use white at 10%. Retain purple focus and semantic error states. Ordinary secondary buttons need a visible border/base shadow; primary buttons use purple at 60% and 80% on hover. Small ghost/close controls stay at 10%/20% white.
- Enabled buttons lift 2px on hover and reset on press. Sidebar/menu hover uses 20% white, blur and a 30% white border; active navigation uses 30% white. Reserve border space so hover does not move labels. Keep reduced-motion and transparency/contrast opt-outs effective in every state.
- Let Base UI handle keyboard navigation, focus trapping/restoration, dismissal and scroll locking. Preserve local dark themes in portals with `usePortalTheme`; retain wrapper selectors with `withTestId`. Do not replace these with ad hoc document event handlers.
- Retain explicit public test IDs. Repeated records need stable record IDs or scoped selectors. Base UI hidden form inputs are implementation details; test the visible trigger/control. `ui:check` is read-only; use its `--write` mode deliberately and review changes to composed render elements.

## Validation and reporting

For behavior changes, also run `node --test test/workspace-mutations.test.mjs test/workspace-documents.test.mjs test/workspace-collaboration.test.mjs` and targeted browser checks. Verify RTL/mobile overflow, menu and modal layering, focus, default/hover/active/error/disabled states, local dark portals and accessibility preferences as relevant. Automated checks do not establish human screen-reader, contrast or usability acceptance. Label evidence with its revision; do not copy historical pass counts as new runs. Keep `.playwright-mcp/` and generated bundles out of commits. Commit or push only when requested.
