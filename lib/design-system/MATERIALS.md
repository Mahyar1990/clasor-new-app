## Catalogue theme preference

The shared catalogue header offers System (default), Light, and Dark. The choice is saved in browser-local storage and is independent of the material selector. System follows changes to the OS preference. While the catalogue shell is mounted, the resolved theme applies to the document root so the header, sidebar and body-mounted portals share it; leaving the shell restores the prior root state. Existing local dark previews still work in the light catalogue. Fixed demo colors and individual state contrast are audited separately.

The Colors, Typography, and Geometry catalogue pages use semantic theme roles for sample surfaces, text, borders and focus. Raw brand and neutral swatches preserve their source values; usage samples follow the active theme. Semantic cards display the active role and copy its rendered text color. Dark status roles define matching text, surface and border.

## Connected heading lists and distinct floating trigger — 2026/11/18

ContentsNavigation's nested groups use shared contentsBranch/contentsNode rails and elbow connectors. Chevron/leaf cues and native list structure make the parent-child relationship visible across heading levels; leaf glyphs stay at 6px inside compact panels. Logical start borders preserve RTL/LTR and system-color borders remain effective in forced colors.

The shared accent OptionsButton uses a purple glass tint with white glyph, brighter border and restrained shadow. It retains the same 32px geometry as neutral options; only the floating action bar selects the new tone. Solid/forced-color and reduced-motion contracts remain authoritative. ResizablePane uses the shared resizeSeparator grip/rail/focus/drag styles and adds no extra glass surface around its existing panel.

## Compact publish navigation and expanded action bar — 2026/11/17

The public outline uses shared outlineRow/outlineGroup contracts: smaller labels/icons, tighter rows, an emphasized selected branch rail and the existing current-navigation glass treatment. Hover does not translate navigation rows. The public ReadingSurface explicitly opts into full width; its readable paper material is retained. There is no new content-width cap or second glass layer around each paragraph.

FloatingActionBar uses one existing glass.panel around its controls and canonical OptionsButton disclosure. Reactions reuse the existing glass button's aria-pressed, disabled, dark, solid and forced-color states. The section drawer reuses DockedPanel, reserving layout space rather than covering the paper. Header identity uses the shared Avatar and fallback; the independent catalogue demonstrates local dark portals and accessibility preferences.

## Public reading surface and floating controls — 2026/11/17

The public portal reuses the fixed AppLayout mesh through GlassBackdrop; public header/sidebar/action chrome uses the existing glass.panel contract. ReadingSurface uses the shared glass.readingSurface contract: a quiet 85% white paper fill (slate in dark mode), white edge and restrained shadow, without backdrop filtering. Long-form content intentionally prioritizes readability; controls retain glass. Solid/forced-color fallbacks reuse the existing contract. FloatingOptions adds no new button/menu appearance; it combines the canonical record control and shared glass menu.

## Rectangular repository list cards — 2026/11/17

GlassTile now uses a larger horizontal layout: a 128px minimum height, image/icon beside title and metadata, and a reserved operation column in normal flow. The operation area has no internal divider and never overlays media or text. The existing glass tile material is retained. Shared repositoryGrid geometry uses adaptive columns with an 18rem preferred minimum, bounded by container width so mobile uses one column. Loading skeletons match the new geometry. This supersedes the earlier square-card layout below.

The independent layout/overlays examples show custom and default images with the real non-overlapping action area. Repository lists in all scopes and the dashboard consume the same component/geometry. The create action sits at the upper-left, opposite the page title through LibraryShell's titleActions slot, above the separate search region. No page-specific tile material or new action-button style is added.

## Distinguished inset cards — 2026/11/17

`glass.insetCard` extends the existing flat content surface with 35% white fill, a 65% white border and a restrained edge highlight/shadow; dark mode uses 10% white and a 25% border. It adds no backdrop blur, preserving one glass master rather than stacking frosted surfaces. Existing solid/contrast/forced-color fallbacks remain authoritative.

RepositoryHeader consumes this shared contract to distinguish the selected repository summary from its document list. The Back to repositories link is removed; the image, options and focus targets remain. The name is now inside the card, tags and the Active label are removed, and canonical RoleBadge appears below the description (archived repositories retain their archive indicator). RecordGroup uses the same contract, making numbered version cards distinct while draft/approved snapshots continue sharing one heading with internal separators. Row density, actions and canonical badges remain unchanged. Layout/overlays show the real repository composition and two adjacent numbered group examples; no page-only material override is introduced.

## Document status and editor surfaces — 2026/11/17

Version status uses the established semantic status badges, including draft, approved, pending, public and latest; no alternate text-only visual is introduced in version rows. Document flags reuse Badge and the existing bookmark/visibility/shield/ban icon family. Repository pending invite rows share accepted-row geometry with reduced emphasis and a single visible cancellation action.

The reader's outer panels and viewport dialog use the shared glass contracts. The embedded editor deliberately has an opaque paper surface for content readability. No additional glass cards are nested around each status or toolbar. Existing material/contrast/motion preferences continue to own shared controls and portals.

When Base UI marks a toast portal as outside an active dialog, `glass.toastPortal` moves its viewport behind the dialog and disables pointer interception until the dialog closes. The toast's live region remains present; success feedback cannot cover a full-size editor's Save button. This behavior follows the primitive's inert marker rather than a separate global overlay listener.

## Unified record options and compact vertical versions — 2026/11/16

`OptionsButton` is the single three-dot control for repository/document/version/file/member/group menus, catalogue examples and RowActionMenu. `glass.recordOptions` owns its 32px geometry, full opacity, visible border, stronger neutral foreground and light/dark base; normal focus, hover, disabled and transparency opt-outs remain shared Button behavior. Individual records no longer override its variant, size or opacity. This supersedes the earlier faded tile-control treatment below.

RecordGroup now stacks snapshots vertically with one shared version heading and separators. `glass.versionRow` and `glass.recordActions` keep the menu in normal flow, reserve an inset at both edges and prevent long metadata from colliding with it. Rows retain plain content surfaces and compact inline metadata. The earlier side-by-side version layout below is historical and superseded.

## Repository cards and row feedback — 2026/11/16

Repository tiles now use `glass.repositoryTile`: a clearer thin edge, slightly stronger flat tint and restrained shadow separate adjacent cards without adding another backdrop filter. `RepositoryImage` displays the selected image in a consistent thumbnail area, with a local default illustration for empty/failed images. The options control remains visible for touch/keyboard users with a smaller, quieter surface. It is independent of the card's navigation action.

Apple's [Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables) recommends appropriate row feedback and outline disclosure for hierarchical content; [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) distinguishes content from glass controls. Our interpretation retains a gentle whole-row highlight and keyboard outline, while removing the title button's separate lift, shadow and hover patch. These are web design decisions, not a claim that Apple prescribes this exact card layout.

## Surface hierarchy — 2026/11/16

Apple's [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) recommends avoiding stacked glass and grouping content with spacing. This revision keeps one glass shell per surface and flattens its content. This is a web interpretation, not native optical rendering.

`GlassCard surface="auto"` reads `GlassSurfaceContext`: an outer card uses `glass.panel`; a nested card uses `glass.contentSurface` (no backdrop blur or drop shadow). `surface="glass"` and `surface="content"` are explicit overrides. Modal, sheet, alert-dialog, sidebar inset and product/workspace/wireframe shells establish context. Portals retain the existing local theme behavior.

`DialogSection` uses spacing and separators. Record groups, table headings, selected-file summaries, tags, approval context and content emblems use restrained flat tint rather than another glass pane. Menus keep one 30% tint/12px blur surface and a plain separated header; labels no longer have individual glass pills. Fields, interactive controls and the approved tab bar retain their own visibility/focus contracts. Inner emblems use `insetEmblem`; standalone emblems retain their glass relief. Earlier descriptions of nested graduated headers or label pills below are historical and superseded by this section.

## iPhone-inspired controls - 2026/11/16

The button/icon review used Apple's [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) and [Liquid Glass introduction](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/). The implemented web interpretation uses a brighter top edge, subtle inner rim, restrained depth and clear foreground symbols; it does not reproduce Apple's real-time native optical rendering.

`glassRelief` in classes.ts owns the shared edge/reflection treatment. GlassEmblem retains the 30% panel tint; Button's glass variant uses a lighter 20% control tint. The icon-button contract is separate from emblem geometry, so button sizes no longer inherit a decorative size/grid. Primary and secondary buttons retain their established tint and contrast, with more restrained drop shadows and clearer inset highlights. Pressed/selected, keyboard focus and disabled states remain visible. Solid mode, increased contrast, forced colors and reduced motion retain priority; reflections and glyph shadows disappear when transparency is disabled.

Independent light/dark control examples are on `/design-system/buttons`; header dialog examples are on overlays/layout, and compact attachments are on inputs. The dashboard uses the same contracts.

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

Dropdown menus and nested submenus share `glass.menuMotion`: only opacity transitions (120 ms) on the Base UI popup lifecycle; no translate, scale, blur or shadow transition. Base UI instant states and reduced motion skip the fade. Positioning, focus and portal theme remain owned by the existing primitives. The overlays catalogue demonstrates nested RTL menus and local dark mode.

`GlassOptionsMenu` uses a distinct transparent liquid surface: 15% light tint and 10px blur, with a subtle glass heading and reflective icon tiles. A local 20% white veil beneath medium-weight labels (25% slate in dark mode) suppresses background text interference while leaving the surrounding surface more transparent. Destructive labels use a pale red in dark mode. This intentionally departs from the ordinary 30%/12px panel contract so background shapes remain visible. The compact popup is 208px wide (previously 288px), with 11px labels, 28px minimum desktop rows and 36px minimum narrow-layout rows. Icon tiles are 20px with 12px glyphs; the heading uses a 24px tile, 11px title, 10px context label and 6px padding. The main menu remains 208px wide; submenus use a narrower 160px width. Both share compact rows, reserved hover borders and semantic destructive coloring. `DropdownMenuContent surface="liquid"` and the matching submenu composition use `glass.liquidFloating`: 15% light tint/10px blur plus 150% backdrop saturation, a low-opacity diagonal reflection, a second inner rim, blue/purple edge highlights and inset highlights. Text is never distorted. This is a CSS optical treatment rather than physical refraction. Dark mode uses a 65% slate tint to keep light labels readable even over a light page, while retaining background visibility. Dark variants soften the reflections; opaque/forced-color modes remove both decorative layers and the entire backdrop filter. Other dropdowns retain their default frosted surface. Submenus use the same liquid material and Base UI positioning; content scrolls within the available viewport. Solid/contrast preferences, forced colors and reduced motion continue to use the shared primitive contracts. The catalogue includes a busy-text background toggle to examine this tradeoff in light and dark themes. This CSS treatment takes inspiration from Apple’s [material legibility guidance](https://developer.apple.com/design/human-interface-guidelines/materials); it does not reproduce the native adaptive compositor. See [navigation](NAVIGATION.md) for the menu API and source-aligned fixture ownership.

## Repository dialog compositions

Select popups use the same 120 ms opacity-only motion as menus, including item-aligned lists; alignment and focus stay with Base UI. Sheet panels transition only translate and opacity over 180 ms; the backdrop fades without changing blur. Left and right sheets move from their physical edge in both text directions. Toasts enter and leave with 180 ms transform/opacity transitions and no height tween. Stacking and Base UI swipe offsets stay intact; swiping has no transition, and reduced motion skips the fades and slides.

The shared Dialog and AlertDialog popups use `glass.dialogMotion`: a 180 ms opacity-only transition driven by Base UI's starting and ending states. The full-screen backdrop does not animate and stays in place until dismissal completes. Neither zoom nor blur is animated, and reduced motion skips the transition. Base UI still owns focus, dismissal and scroll locking. Test both variants in the overlays catalogue's glass layer examples.

`GlassModal surface="liquid" compact` shares the liquid surface with menus while using a lighter slate 15% backdrop and 2px backdrop blur. Compact modals cap their height at 46rem or the available viewport; headers and footers remain visible while the body scrolls. Width presets are 24rem/32rem/42rem and always respect a 1rem viewport margin. `glass.dialogCompact`, `glass.dialogSection` and `glass.dialogFooter` own the shared compact geometry and section/footer appearance. `DialogSection` and `CopyField` are product-independent UI; repository fixtures and dialog compositions live in `components/design-system/repository-dialogs`. See [navigation](NAVIGATION.md) for behavior, source alignment and explicit preview adaptations.

## Catalogue-wide refinement — 2026-11-16

The audit covers all 14 live catalogue sections and the shared primitives they render. Choice controls now use `choice`, `switchTrack` and `switchThumb`: translucent idle/selected fills, inset highlights, purple selection and explicit error/focus/disabled states. Base UI continues to own checked/mixed state, radio keys, form serialization and RTL switch semantics. Selected controls use 60% purple in glass mode; solid/forced-color modes have opaque, distinguishable states and no blur. Thumb movement respects reduced motion.

`statusSurface` and `statusNeutral/Success/Warning/Danger/Info` give badges, alerts and toasts the same glass edge/blur while retaining independent semantic color and text. Semantic panels use a 60% semantic surface tint; dark variants use 75% dark semantic tint and light text so labels remain legible over brighter backdrops. Neutral badges use foreground text and keep the existing glass tint. Ordinary floating surfaces use 65% slate tint in local dark previews to keep light labels readable over light content. This legibility exception matches the liquid popup's dark treatment. Toast tone classes apply after the base panel so the shared panel does not erase success/error color. Dark toasts use an 80% slate surface over light pages, retaining semantic text/icon/border colors for legibility.

Avatars reuse the reflective emblem surface, with a transparent fallback over the same surface. File selection summaries and approval property groups use the shared panel. Progress remains a native, labeled `progress` with glass track/value styling for WebKit/Blink and Gecko. Skeleton rows use a soft translucent highlight without per-row backdrop filters; reduced motion stops the pulse. Step indicators use the emblem contract and explicit current/complete/pending state. The tab refinement from this audit was subsequently consolidated into one approved default glass appearance; the former line and segmented treatments are retired. Primary, secondary and destructive buttons have restrained inner highlights; semantic destructive labels remain visible in dark mode.

The decorative progress fill transitions only its horizontal scale over 120 ms, from the inline start in LTR and RTL. The native value and visible percentage update immediately; reduced motion and cancelled uploads skip the transition. Skeletons are static placeholders, including cumulative list batches and sidebar items; existing loading status and row geometry stay in place.

Dialog, Sheet, Tooltip and Toast portals preserve local dark themes. `ConfirmationDialog`/`DestructiveDialog` and `DetailsSheet` pass their stable trigger refs through `themeAnchorRef` to Dialog/AlertDialog/Sheet content; theme propagation therefore does not depend on where focus moves while opening. `HelpTooltip` supplies its trigger ref to `TooltipContent themeAnchorRef` so mouse hover also resolves the originating local theme; `usePortalTheme` accepts that optional source and observes scoped class changes. Base UI remains responsible for dismissal, placement, focus and trapping. The catalogue has a fixed purple/blue background and state previews on inputs, status, feedback, navigation and overlays. Actual color swatches, typography/spacing specimens, text-only breadcrumb links and opaque table data rows deliberately retain their semantic presentation.

New representative previews are `GlassControlStatesCatalogue`, `GlassStatusStatesCatalogue`, `GlassFeedbackStatesCatalogue`, `GlassLayerStatesCatalogue` and the default-tabs sample. They are reachable through the existing catalogue menu, with local light/dark toggles and scoped selectors. Catalogue toggle controls also consume the shared Checkbox instead of native checkbox styling. The 22 material entries in `components.json` now describe the current implementation, replacing the retired blanket solid-inside-glass rule; table data rows and text breadcrumbs are explicit exceptions. No new product action, backend or dependency was added.

## Dashboard record dialogs

Repository and document option menus on the dashboard now open the same local dialog compositions shown in overlays/layout. Per-record state lives above the filtered tab lists; closing a dialog or switching a tab does not merge/reset record data. Removal operations choose a stable focus destination before removing the source trigger. The separate repository-dialog navigation entry was removed; its previous URL redirects to the dashboard.

`TagPicker` composes the shared input, checkbox, badge and button materials without a new surface preset. Fixed options support search, removable chips, empty/error/disabled states and keyboard focus. Its standalone example is on inputs; the document tag dialog consumes it directly. Compact modal textareas now use the same text size as compact inputs. Document activity and access lists share the cumulative `PreviewList`, including visible loading skeleton geometry outside the workspace shell. Product-specific model/state remains in the preview modules, with no service mutations.

## One tab appearance

`glass.tabsList` and `glass.tab` now own the single approved default appearance, shared by raw primitives, ClasorTabs, dashboard and dialogs. The 30%/12px rail has 3px padding and a 12px radius; active tabs use a 40% white fill, 70% white edge and the approved inset/drop highlight. Dark active tabs use 15% white. The segmented rail, decorative gradient and line underline contracts were removed. Dashboard compact height remains a density decision, with no separate material or padding. The navigation page contains one interactive preview with dark, disabled and long-label controls. See [navigation](NAVIGATION.md) for the current API and retired variants.

## Behavior and verification

Base UI retains focus trapping/restoration, Escape/outside dismissal, keyboard selection and scroll locking. Portals preserve local dark previews through `usePortalTheme`. Public wrapper IDs are retained on rendered trigger elements through `withTestId`.

Every authored DOM element and interactive leaf has an explicit `data-test-id`. Repeated rows have record IDs where available; reusable primitives may be scoped to their parent. Base UI's hidden implementation inputs are not public UI selectors.

`npm run ui:check` checks authored React files for the 200 physical line cap, test IDs, logical directional utilities, forbidden native Select and oversized corners. It also verifies that only foundation-variable CSS remains in this directory. Run `node scripts/check-design-system.mjs --write` deliberately to fill missing selectors; existing public IDs remain unchanged. ESLint independently enforces the line cap. Build runs both structural/style guards and the token check before Next.js compilation.

Solid preference, reduced transparency, increased contrast, forced colors and reduced motion take precedence through utility variants. Accessibility-only important utility modifiers prevent focus/hover from restoring transparency after an opt-out. No control behavior or cumulative workspace loading contract is replaced by the material layer. Custom variants follow the [Tailwind v4 documented variant mechanism](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants).
