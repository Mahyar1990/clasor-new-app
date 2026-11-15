> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../docs/RAG.md) and shared React sources for new work.

# Validation guide

Run from clasor-new-app. Prerequisites: existing npm dependencies, local browser and bundled fonts; no CDN or new dependency. This guide is for later implementation; checks below have not yet been executed for glass.

1. Open clasor-design-system/index.html locally. Verify Persian RTL, fonts and all existing component examples.
2. After token edits run npm run tokens:generate, then npm run tokens:check. Compare package tokens.css values with tokens.json and generated lib/design-system/tokens.css; generated names use --clasor-* while catalogue names are unprefixed.
3. Run npm run lint and npm run build if generated host tokens or shared source change. Do not install dependencies or invent npm test: this manifest has no test script. Catalogue-only changes still require browser validation.
4. Open index.html and clasor-design-system.html offline in Chromium and Firefox; verify no missing fonts/resources and inspect console errors. Standalone download links may still need adjacent JSON files.
5. Inspect widths 360, 390, 768, 1440. Check the composition and complete catalogue for document overflow, clipped menus, labels and focus.
6. Exercise controls with Tab/Shift+Tab, Enter/Space and Escape. Verify selected, loading, disabled and invalid states, focus containment/return and meaningful errors.
7. Compare auto and explicit solid mode. Test unsupported-filter CSS fallback, reduced-transparency where supported, forced colors and reduced motion. Record unsupported emulation separately.
8. Measure actual composited contrast on white, gray, lavender and busy backgrounds: normal text >=4.5:1; large text and essential UI boundaries >=3:1. Large text means computed font-size >=24 CSS px at any existing weight, or >=18.67 CSS px with the bundled bold weight 700 (18pt regular / approximately 14pt bold). All other text requires >=4.5:1; a heading label alone does not qualify as large text. Check both material presets and all states. Increase opacity or use opaque fallback on failure.
9. Inspect scrolling and opening menus over a representative longer table. No animated filters or nested backdrop surfaces; at most three visible blur regions and blur <=20px in the composition. Record observed stutter/device/browser rather than claiming a frame budget without measurements.
10. Update validation.json with date, browsers, viewports, modes, contrast and screenshot paths. Update docs to distinguish current v0.3 from historical v0.1/v0.2. Repeat standalone/offline parity after regeneration.

## Fixed contrast fixtures and measurement

Use these four deterministic backgrounds behind each material preset; they are validation fixtures, not new product backgrounds:

| Fixture ID | Background |
| --- | --- |
| white | Solid #FFFFFF |
| neutral | Solid #EBECF0 |
| lavender | Solid #F0E9FD |
| busy | Checkerboard alternating #FFFFFF and #1D1C22; each square is 16 CSS px, repeat tile 32 by 32 CSS px, top-left square white |

Anchor the checkerboard at the fixture's top-left corner with no animation or random positioning. Hold the component position and fixture geometry fixed for a given viewport; record viewport, component coordinates, scroll position, browser, device pixel ratio, font size/weight, material preset and mode so the check can be reproduced.

For each fixture, preset and applicable state, wait for local fonts and transitions to settle. Capture the normal view, then capture the same view with only the target text paint made transparent while preserving layout, surface fill, blur and other styles. Obtain the final background pixels beneath each text region from that second capture; compare them with the opaque computed text color using the WCAG relative-luminance contrast calculation. Do not use anti-aliased glyph edge pixels as the text color, the uncomposited base fixture color or an average background color. Record the minimum ratio across the text region and its sample position, together with the paired screenshot evidence. Evaluate essential boundaries/focus separately against the actual adjacent rendered colors.

Check both chrome and floating presets in auto and solid modes, plus supported accessibility/fallback modes from step 7. Apply the thresholds and large-text definition in step 8 without rounding a failing value up to a pass. If a fixture fails, increase fill alpha or use the opaque fallback, then repeat the affected checks. Record unsupported modes as limitations rather than passes.

These procedures are planned validation work; no fixture or contrast result has been implemented or measured by documenting them.

Contracts: contracts/materials.md, contracts/components.md. Model: data-model.md.


## Implementation run ? 2026-11-13

Inventory: 22 IDs preserved in components.json. All receive explicit material assignment and eight-state applicability; action-menu is floating; other component entries are solid (navigation chrome is demonstrated by catalogue layout). Existing preview handlers retain RTL tab arrows, menu arrows/Escape/focus return, native modal behavior, validation, selection and file controls. Only the material selector handler is added.

Precedence: tokens.css ? design-system.css ? reference-overrides.css. Material recipes use specific selectors so reference layout does not override fills. Standalone assembly is now reproducible using scripts/assemble-design-catalogue.py; all fonts, CSS and JS embed; JSON downloads remain adjacent-file dependencies.

Baseline tokens:check passed (89); after additions passed (117). Only 28 additive material declarations enter generated host CSS; no component migration. npm run build passed. npm run lint failed in unchanged ds-bundle (164 errors/1897 warnings); no generated bundle fixes attempted. No qualifying Next.js feedback candidates.

Edge headless Chromium is available and was exercised offline via file URLs at 360/390/768/1440, both distributions, auto/solid. Fonts loaded and labels remained Persian; chrome computes blur(16px) and .82 fill in auto, white and no blur in solid. Document overflow check passed at all widths after positioning table scroll wrappers to contain absolute screen-reader text. Table scrolling remains local. See evidence/browser.json and PNGs for exact checks; screenshots are composition evidence, not contrast measurements. Firefox executable exists but runtime checks were not executed.

Acceptance remains incomplete: paired pixel-sampled contrast over the four fixed fixtures, full keyboard/focus regression, forced colors/reduced transparency/unsupported-filter checks and longer-table performance are still pending. Existing v0.2 contrast values are retained as historical only. No accessibility compliance or complete visual acceptance is claimed.

Additional Edge evidence: evidence/interactions.json confirms menu focus and Escape/focus return, opaque reduced-transparency and forced-colors emulation in both variants. Catalogue shell is solid to reserve the three-region blur budget for composition navigation/header and floating menu.

## React migration verification

Latest user instruction stops the remaining standalone acceptance checks and authorizes real-component migration and retirement of the static package.

- Tokens/contracts now reside in lib/design-system; all 22 component IDs and all 117 token values preserved. Existing app font files match retired duplicates by SHA256. Generator and coverage imports no longer reference the retired folder.
- Shared materials.css applies chrome to sidebar/header and floating to dropdown/select primitives; content, fields, tables, dialogs, tooltips and semantic states remain opaque. All 78 React TSX files are inventoried in MATERIALS.md; behavior props/list loading unchanged.
- Catalogue has a React material showcase and auto/solid root preference also affecting portalled menus. Workspace has the same preference.
- npm run tokens:check passed (117); npm run build passed after migration and folder removal; focused ESLint over components/app/lib/token generator passed; 23 existing workspace logic tests passed. Full repository lint was previously known to fail on the unchanged ds-bundle and was not represented as a successful check here.
- Browser smoke: Chromium, /, /workspace/documents and /wireframes at 1440 and 390 CSS px had no document overflow. Visible chrome computes blur(16px) saturate(1.1); popup computes blur(20px) with .92 white fill. Solid root preference yields opaque white and no popup blur. Forced-colors plus solid yields no blur and a system-color boundary. Latest console snapshot had no errors. Screenshot: evidence/react-materials-desktop.png.
- Popup filter/fill transitions are excluded; transform/opacity popup motion remains. A CSS compilation observation required prefixed backdrop-filter before the standard declaration; computed style was rechecked after the ordering fix.
- Packaging script verification passed (central guide links, archive membership, checksums); generated verification ZIP was removed after checking, not published.
- Not claimed: comprehensive contrast measurement, Firefox, all keyboard states or performance acceptance from the old static scope. Static validation.json remains historical evidence, not React certification.
