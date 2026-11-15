# Clasor glass contracts

The live catalogue at `/` renders the library in `components/ui`. The old standalone HTML bundle is historical. Product, workspace and wireframe components share the same rules.

## Ownership

- `tokens.json` generates `tokens.css`; `theme.css` maps semantic colors and sizes.
- `classes.ts` defines Tailwind contracts for panels, fields, controls, navigation and interaction.
- Only `tokens.css` (generated values) and `theme.css` (semantic/theme variables) remain as CSS in this directory. The six component/reference/material stylesheets were migrated and removed.
- `classes.ts` contains static Tailwind contracts for surfaces, fields, selection, button variants, navigation, focus and accessibility opt-outs. `app/globals.css` defines `glass-enabled` and `opaque` variants; it does not import global component selector stylesheets.
- Catalogue-only geometry is consumed at its root from `components/design-system/catalogue-layout.ts`. Nested shell utilities live in `workspace-styles.ts` / `wireframe-styles.ts` beside their consumers. Existing route geometry and catalogue scoped styles are layered as components so Tailwind utilities control appearance.
- `GlassCard` is the shared semantic surface; AppLayout composes it with GlassHeader and GlassSidebar. Forms retain native form semantics; tables retain readable opaque data rows.
- Small primitives stay in `components/ui`; catalogue compositions and sample data stay in `components/design-system`.

## Appearance

Panels and popups use 30% tint, 12px backdrop blur, a 40% white border, and a small shadow. Floating overlays have a deeper shadow. AppLayout places fixed blue and purple blurred shapes over a mesh gradient. Corner radii are 8–16px; avatars and decorative background circles may stay circular.

Idle text fields use white at 40%, a gray border and inset shadow. Dark fields use white at 10%. Focus adds a purple border/ring; errors keep a distinct semantic border. Primary actions use purple at 60% and 80% on hover. Ordinary secondary actions use white at 50%, a visible border and base shadow. Small ghost controls use white at 10% and 20% on hover. Enabled buttons lift 2px on hover and reset on press.

All visible selection controls use the existing shadcn/Base UI Select. Both trigger and popup are glass. Menu/sidebar hover uses white at 20%, blur, a 30% white border and shadow. Active navigation uses white at 30%. Transparent borders reserve space before hover.

## Behavior and verification

Base UI retains focus trapping/restoration, Escape/outside dismissal, keyboard selection and scroll locking. Portals preserve local dark previews through `usePortalTheme`. Public wrapper IDs are retained on rendered trigger elements through `withTestId`.

Every authored DOM element and interactive leaf has an explicit `data-test-id`. Repeated rows have record IDs where available; reusable primitives may be scoped to their parent. Base UI's hidden implementation inputs are not public UI selectors.

`npm run ui:check` checks authored React files for the 200 physical line cap, test IDs, logical directional utilities, forbidden native Select and oversized corners. It also verifies that only foundation-variable CSS remains in this directory. Run `node scripts/check-design-system.mjs --write` deliberately to fill missing selectors; existing public IDs remain unchanged. ESLint independently enforces the line cap. Build runs both structural/style guards and the token check before Next.js compilation.

Solid preference, reduced transparency, increased contrast, forced colors and reduced motion take precedence through utility variants. Accessibility-only important utility modifiers prevent focus/hover from restoring transparency after an opt-out. No control behavior or cumulative workspace loading contract is replaced by the material layer. Custom variants follow the [Tailwind v4 documented variant mechanism](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants).
