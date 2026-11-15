# Project retrieval map — current implementation

Updated: 2026-11-14 (Asia/Tehran). Implementation checkpoint: `d124673`. This is a curated context/retrieval index, not a vector database or a claim that embeddings were generated.

## Read in this order

1. The current request and [AGENTS.md](../AGENTS.md): authorized scope and mandatory engineering rules.
2. [Current design contract](../lib/design-system/DESIGN_SYSTEM.md) and [materials](../lib/design-system/MATERIALS.md): implemented appearance and ownership.
3. The actual component, hook or state module relevant to the task.
4. The topical references below. Their dated stage sections are history, not current styling rules.
5. Historical specs or exports only to answer questions about earlier decisions. Do not import old behavior into a new change without checking the current contract.

## Query routing

| Question | Primary source | Supporting context |
| --- | --- | --- |
| Shared glass classes and colors | [classes.ts](../lib/design-system/classes.ts), [theme.css](../lib/design-system/theme.css) | [MATERIALS.md](../lib/design-system/MATERIALS.md); component CSS was migrated to Tailwind |
| Clasor product page previews | [Page registry](../components/design-system/clasor-page-registry.ts), [dashboard preview](../components/design-system/clasor-documents-preview.tsx) | `/clasor-pages/dashboard` is a standalone full-width product preview with one sidebar, linked from the catalogue menu. Independent document/repository tabs, repository rows, three-column document table and source header controls use fictional data. Desktop panels fill the remaining viewport equally; each list has a named, independently scrollable GlassScrollArea and its own loading sentinel. The old documents URL redirects here. |
| Dashboard tab bar proposal | [Segmented glass tabs proposal](../specs/20261115-142227-dashboard-tab-bar-proposal.md) | Implemented as `ClasorTabs variant="segmented"`; used in dashboard and demonstrated on `/design-system/navigation`; current contract: `lib/design-system/NAVIGATION.md` |
| Glass design references and inspiration | [Frosted Glass research](../specs/20261113-172921-frosted-glass-design-system/research.md) | Includes the later-added rdev/liquid-glass-react reference; references do not override the current material contract |
| Base colors, spacing and typography | [tokens.json](../lib/design-system/tokens.json), [theme.css](../lib/design-system/theme.css) | [FOUNDATIONS.md](../lib/design-system/FOUNDATIONS.md) |
| Atomic boundaries and source ownership | [ARCHITECTURE.md](../lib/design-system/ARCHITECTURE.md) | `components/ui` vs `components/design-system` vs `components/workspace` |
| Layout and cards | [AppLayout](../components/ui/AppLayout.tsx), [GlassCard](../components/ui/GlassCard.tsx), [GlassSidebar](../components/ui/GlassSidebar.tsx) | [catalogue composition](../components/design-system/layout-content-catalogue.tsx) |
| Catalogue geometry and shell-specific utilities | [catalogue-layout.ts](../components/design-system/catalogue-layout.ts), [workspace-styles.ts](../components/workspace/workspace-styles.ts), [wireframe-styles.ts](../components/wireframes/wireframe-styles.ts) | Static Tailwind classes owned by the consuming view; no global selector stylesheet |
| Input, Select, button and validation | [CONTROLS.md](../lib/design-system/CONTROLS.md), [SolidForm](../components/ui/SolidForm.tsx) | [Select](../components/ui/select.tsx), [input](../components/ui/input.tsx), [button](../components/ui/button.tsx) |
| Overlay, navigation and focus | [NAVIGATION.md](../lib/design-system/NAVIGATION.md), [GlassModal](../components/ui/GlassModal.tsx), [GlassDropdown](../components/ui/GlassDropdown.tsx) | [portal theme](../hooks/use-portal-theme.ts), [render IDs](../lib/design-system/test-id.ts) |
| Tables and composite flows | [Column contract](../lib/design-system/table-contract.ts), [PATTERNS.md](../lib/design-system/PATTERNS.md), [SolidDataTable](../components/ui/SolidDataTable.tsx) | [DataTable](../components/ui/data-table.tsx) |
| Workspace list loading | [LoadMore](../components/workspace/load-more.tsx), [list session](../components/workspace/list-session.tsx) | AGENTS.md: batches of 10, cumulative append, 600ms mock latency |
| Document semantics and mutations | [mutations.ts](../lib/workspace/mutations.ts), [documents.ts](../lib/workspace/documents.ts) | `test/workspace-*.test.mjs`; approval, version and access remain independent |
| Structural enforcement | [check-design-system.mjs](../scripts/check-design-system.mjs), [eslint config](../eslint.config.mjs) | [VALIDATION.md](../lib/design-system/VALIDATION.md), package scripts |
| Handoff and open product decisions | [DESIGN_HANDOFF.md](DESIGN_HANDOFF.md) | [USABILITY_TEST.md](USABILITY_TEST.md) |
| Previous plans and decisions | [Unified specification index](../specs/INDEX.md) | Update source metadata and regenerate with `node scripts/update-spec-index.mjs`; historical plans do not override current contracts |

## State and limits to retain

- The live catalogue starts at `/` (colors); its 14 sections have separate pages at `/design-system/[section]`, including `/design-system/layout` for glass layout and controls. Menu entries and route IDs are owned by `components/design-system/catalogue-sections.ts`. `/workspace` and `/wireframes` consume the shared UI. The standalone `clasor-design-system/` package is retired. `ds-bundle/` and Playwright captures are generated artifacts.
- `docs` retains current handoff, usability guidance and this retrieval map. `specs/INDEX.md` is the sole index for task and feature history. Duplicate screenshot aliases have been removed; retained feature evidence is historical, not a current visual baseline.
- Main wrappers, fields and controls are glass. Table data rows default to opaque; `SolidDataTable appearance="glass"` is used by the dashboard and demonstrated with `GlassEmblem` on `/design-system/layout`. `SolidForm` and `SolidDataTable` retain their public names; those names do not require opaque outer surfaces.
- Use the existing shadcn Base UI family. Native `<select>` is forbidden in authored React; Base UI's hidden form inputs remain valid implementation details.
- Public barrel entry points remain stable after splitting sidebar, dropdown-menu, field and toast into parts. Do not infer new component families from internal part files.
- At `d124673`, 110 React files passed the structural guard; lint/build and 23 existing workspace logic tests passed. Browser checks covered form submission, Select, modal focus/restoration, nested menus, local dark portals, preferences and 390px layouts on catalogue/workspace/wireframes. These are recorded previous results, not tests newly run by reading this file.
- No backend, authentication, real upload, persistent storage or remote publication was added. Mock fixtures and in-memory actions do not establish production authorization.
- No claim of complete WCAG certification, human screen-reader acceptance or human usability testing follows from the refactor.

## Updating this context

Change implementation and its owning contract together. Add new UI examples through `app/page.tsx`. Shared document-column geometry and glass actions are demonstrated in `components/design-system/document-table-catalogue.tsx` on `/design-system/data` and `/design-system/layout`; dashboard columns consume the shared kinds. Re-run the required checks and record the actual revision and scope; keep older evidence labeled as historical. This index and linked current summaries are the RAG entry points; do not create a second conflicting agent guide.

For documentation changes, run `node scripts/update-spec-index.mjs --check` and `node scripts/check-doc-links.mjs`. After adding/removing source specifications, regenerate the single index with `node scripts/update-spec-index.mjs`; do not restore a parallel index in docs.
