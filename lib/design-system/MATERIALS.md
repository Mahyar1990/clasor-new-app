# Clasor glass contracts

The live catalogue at `/` renders the library in `components/ui`. The old standalone HTML bundle is historical. Product, workspace and wireframe components share the same rules.

## Ownership

- `tokens.json` generates `tokens.css`; `theme.css` maps semantic colors and sizes.
- `classes.ts` defines Tailwind contracts for panels, fields, controls, navigation and interaction.
- Only `tokens.css` (generated values) and `theme.css` (semantic/theme variables) remain as CSS in this directory. The six component/reference/material stylesheets were migrated and removed.
- `classes.ts` contains static Tailwind contracts for surfaces, fields, selection, button variants, navigation, focus and accessibility opt-outs. `app/globals.css` defines `glass-enabled` and `opaque` variants; it does not import global component selector stylesheets.
- Catalogue-only geometry is consumed at its root from `components/design-system/catalogue-layout.ts`. Nested shell utilities live in `workspace-styles.ts` / `wireframe-styles.ts` beside their consumers. Existing route geometry and catalogue scoped styles are layered as components so Tailwind utilities control appearance.
- `GlassCard` is the shared semantic surface; AppLayout composes it with GlassHeader and GlassSidebar. Forms retain native form semantics; tables retain semantic data rows with solid and opt-in glass appearances.
- Small primitives stay in `components/ui`; catalogue compositions and sample data stay in `components/design-system`.

## Appearance

Panels and popups use 30% tint, 12px backdrop blur, a 40% white border, and a small shadow. Floating overlays have a deeper shadow. AppLayout places fixed blue and purple blurred shapes over a mesh gradient. Corner radii are 8–16px; avatars and decorative background circles may stay circular.

Idle text fields use white at 40%, a gray border and inset shadow. Dark fields use white at 10%. Focus adds a purple border/ring; errors keep a distinct semantic border. Primary actions use purple at 60% and 80% on hover. Ordinary secondary actions use white at 50%, a visible border and base shadow. Small ghost controls use white at 10% and 20% on hover. Enabled buttons lift 2px on hover and reset on press.

All visible selection controls use the existing shadcn/Base UI Select. Both trigger and popup are glass. Menu/sidebar hover uses white at 20%, blur, a 30% white border and shadow. Active navigation uses white at 30%. Transparent borders reserve space before hover.

## Identity and table surfaces

[GlassEmblem](../../components/ui/GlassEmblem.tsx) owns the shared logo/folder tile and circular avatar surface. It uses the 30% panel tint and 12px blur with a diagonal specular layer, white edge and restrained purple inset/drop shadows. The avatar shape is the only circular variant. Sizes and accessible naming belong to the consumer. The header and dashboard consume this same component.

[SolidDataTable](../../components/ui/SolidDataTable.tsx) preserves its opaque default for existing consumers. `appearance="glass"` enables a softly graduated header and translucent, subtly alternating data rows over the blurred wrapper; individual rows do not add blur layers. Hover and keyboard focus brighten the row without moving it. The dashboard uses this appearance. The layout catalogue demonstrates glass/solid switching and local dark mode alongside the identity surfaces.

Both surfaces honor solid/contrast preferences and forced colors: gradients and emblem reflections disappear, blur is disabled and system/fallback surfaces retain readable content. No pointer tracking or additional animation is introduced.

## Icon controls and independent scrolling

`Button variant="glass"` applies the same reflective emblem material to icon actions while preserving button focus, disabled and hover/press behavior. Dashboard header controls, document action buttons, document icon tiles and repository operation tiles use this family.

[GlassScrollArea](../../components/ui/GlassScrollArea.tsx) is a named, focusable Base UI scroll region with native viewport scrolling, a separate visible glass scrollbar, reserved content space and contained overscroll. Base UI owns thumb sizing and dragging. Each dashboard list has its own region; headings and tabs remain outside it. At desktop widths the two panels stretch equally to the available viewport height. Narrow layouts stack independently scrollable panels. Loading sentinels remain inside their respective scroll regions so cumulative loading follows each list's visible bottom. `/design-system/layout` demonstrates two independent areas and the glass icon button.

## Compact density

`AppLayout density="compact"` opts into the shared `compactLayout` contract. Body labels reduce from 14px to 12px, panel headings from 18px to 14px, major headings from 24px to 18px, and header titles from 20px to 16px. General metadata stays at 12px; repository date, role and status use an explicit 11px secondary line at the product owner’s request. Desktop controls use 32px height; mobile control defaults and dashboard tabs keep 44px targets. Table cells use 8px vertical padding, while header and content padding also decrease. This is scoped layout density, with no browser zoom or global token changes; portals retain their standard control sizing.

The dashboard uses compact density with smaller icon tiles, row spacing, panel padding and a 200px desktop sidebar. Its viewport-filling panels and independent scrollbars remain intact. The layout catalogue includes a density toggle for direct comparison.

## Column sizing and action controls

[table-contract.ts](table-contract.ts) owns the shared geometry: `TABLE_ACTION_WIDTH=76`, `TABLE_METADATA_WIDTH=112` and `TABLE_MULTI_ACTION_WIDTH=128`. Both table compositions consume it. A column's `kind="metadata"` reserves 112px; `kind="actions"` reserves 76px in `SolidDataTable`, enables fixed layout by default and aligns its header and content to the inline end (left in RTL). Content columns without a width fill the remainder. `width` can override a column allocation. Keep actions last in the column sequence.

`classes.ts` owns `tableCell`, `tableActionCell` and `tableActions`: 16px inline padding on headers/data/action cells, left alignment of operations in RTL and wrapping full document titles. Do not remove cell padding to move an action toward the edge. A 76px operation column accommodates a 44px mobile control and 16px padding on each side. `DataTable` uses the same 76px single-menu column; custom `renderActions` defaults to 128px for multiple controls and can explicitly request a wider allocation through `actionColumnWidth`. Its metadata columns also accept `kind`/`width` and it retains selection, sticky header and loading/error states.

`RowActionMenu` uses the shared glass icon button. Base UI owns menu keyboard navigation, dismissal, focus restoration and local dark portals. Preserve disabled reasons and the trigger's accessible name.

The dashboard consumes column kinds directly; it no longer sets private action widths or cell-padding selectors. Its document label is «نام سند» and the semantic caption is hidden with `hideCaption`, retaining the accessible name «فهرست سندها». Generic mixed-object tables may still use «نام». `DataTable` also hides its caption visually while preserving its accessible table name.

[DocumentTableCatalogue](../../components/design-system/document-table-catalogue.tsx) renders a long title, bounded creator column, padded glass action menu and local details dialog on both `/design-system/data` and `/design-system/layout`. The layout catalogue also demonstrates caption visibility, compact density, glass/solid appearance and dark mode. The data section includes selectable tables with single and multiple actions.

## Record options menus

`GlassOptionsMenu` reuses the floating 30% tint/12px blur surface, a subtle glass heading and reflective icon tiles. The compact popup is 208px wide (previously 288px), with 11px labels, 28px minimum desktop rows and 36px minimum narrow-layout rows. Icon tiles are 20px with 12px glyphs; the heading uses a 24px tile, 11px title, 10px context label and 6px padding. Main menus and submenus share these dimensions, reserved hover borders and semantic destructive coloring. Submenus use the same material and Base UI positioning; content scrolls within the available viewport. Solid/contrast preferences, forced colors and reduced motion continue to use the shared primitive contracts. See [navigation](NAVIGATION.md) for the menu API and source-aligned fixture ownership.

## Behavior and verification

Base UI retains focus trapping/restoration, Escape/outside dismissal, keyboard selection and scroll locking. Portals preserve local dark previews through `usePortalTheme`. Public wrapper IDs are retained on rendered trigger elements through `withTestId`.

Every authored DOM element and interactive leaf has an explicit `data-test-id`. Repeated rows have record IDs where available; reusable primitives may be scoped to their parent. Base UI's hidden implementation inputs are not public UI selectors.

`npm run ui:check` checks authored React files for the 200 physical line cap, test IDs, logical directional utilities, forbidden native Select and oversized corners. It also verifies that only foundation-variable CSS remains in this directory. Run `node scripts/check-design-system.mjs --write` deliberately to fill missing selectors; existing public IDs remain unchanged. ESLint independently enforces the line cap. Build runs both structural/style guards and the token check before Next.js compilation.

Solid preference, reduced transparency, increased contrast, forced colors and reduced motion take precedence through utility variants. Accessibility-only important utility modifiers prevent focus/hover from restoring transparency after an opt-out. No control behavior or cumulative workspace loading contract is replaced by the material layer. Custom variants follow the [Tailwind v4 documented variant mechanism](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants).
