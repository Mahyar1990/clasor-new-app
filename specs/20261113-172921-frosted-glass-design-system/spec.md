> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../docs/RAG.md) and shared React sources for new work.

# Feature Specification: Clasor Frosted Glass

**Created**: 2026-11-13 (Asia/Tehran)
**Status**: React integration complete for the latest authorized scope. Standalone catalogue acceptance was explicitly deferred, not passed.
**Owner**: clasor-new-app / clasor-design-system
**Request**: Change the design-system direction to neutral light canvas, frosted glass navigation, a blue or purple accent, and clear Persian typography; start with speckit-plan.

## Scope and relationship to history

This records the original material-system feature scope. Earlier completed v0.2 specifications remain product history. Current appearance and engineering contracts are owned by lib/design-system and AGENTS.md; see docs/RAG.md for retrieval precedence.

## User scenarios and acceptance

### US1 — Understand the material hierarchy (P1)
A designer opens the offline catalogue and sees a neutral canvas, frosted sidebar/header and a floating menu, alongside solid table, form and long text.
AC1: A documented matrix assigns every existing component a material. No glass table cells, long text panels or field interiors.
AC2: One composition demonstrates navigation/content separation on the same representative Persian content.

### US2 — Apply a coherent identity (P1)
A developer uses semantic tokens for material and states without substituting arbitrary colors.
AC3: Preserve purple #8C66E0 brand and #8056CB action as the initial direction, IRANYekan 400/500/700 and existing radius/control-size scales. Blue is an alternative, not a second active theme.
AC4: Material tokens specify tint, opacity, blur, highlight, structural boundary, shadow and opaque fallback; published CSS and generated consumer CSS remain consistent.

### US3 — Work comfortably without effects (P1)
A keyboard or reduced-transparency user can use controls regardless of background.
AC5: Normal text reaches 4.5:1, large text 3:1 and essential UI boundaries/focus 3:1 against adjacent colors on measured composited backgrounds. Decorative highlights are not control boundaries. Large text means computed font-size >=24 CSS px at any existing weight, or >=18.67 CSS px with the bundled bold weight 700 (18pt regular / approximately 14pt bold). All other text requires >=4.5:1; a heading label alone does not qualify as large text. See [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
AC5 fixture contract: Use white #FFFFFF, neutral gray #EBECF0, lavender #F0E9FD and a fixed checkerboard alternating #FFFFFF / #1D1C22 in 16 CSS px squares, with the top-left square white and its origin fixed to the fixture's top-left corner. Measure against the final rendered background after tint, alpha and blur; record the lowest contrast beneath each text region, not a surface-wide average. See quickstart.md for the repeatable measurement procedure.
AC6: Every interactive component documents applicable default, hover, pressed, focus-visible, selected, loading, invalid and disabled states. Existing keyboard, Escape and focus-return behavior is preserved.
AC7: Unsupported backdrop-filter, reduced transparency and forced colors use opaque readable surfaces; reduced motion removes decorative transitions. A manual solid-material preview is available where media support is absent.

### US4 — Review a portable package (P2)
AC8: Both index.html and the standalone HTML reflect the same material rules and work offline with local fonts; asset-dependent download links are documented.
AC9: At widths 360, 390, 768 and 1440, no document-level horizontal overflow, clipped labels or inaccessible actions. Table-local scrolling is allowed.
AC10: Validation records measured results, screenshots and remaining limitations, never inherited v0.2 claims as new evidence.

## Non-goals

No application route/layout redesign, React component migration, API, authorization, new font/icon dependency, dark theme, native Apple refraction, WebGL, animation system, external design service or publication. One static catalogue composition may illustrate application context without changing the product.

## Assumptions and decisions

Purple and existing typography retain identity while material treatment changes. Proposed material values are starting design parameters, subject to contrast and visual validation. Native Apple/Fluent systems inspire rules; CSS does not claim native adaptive rendering.

## Original request scope

The initial speckit-plan request covered research and Phase 1 planning artifacts. Task generation, analysis and implementation were subsequent workflow steps; current progress is recorded below.


## Subsequent workflow progress

Research, Phase 1 design, task generation with speckit-tasks and cross-artifact analysis with speckit-analyze are complete. The four reported analysis findings were addressed through user-approved documentation updates: large-text thresholds, fixed contrast fixtures and measurement procedure, explicit shadow/fallback values, and historical/current scope wording. See [tasks.md](tasks.md) for 26 unchecked implementation/validation tasks. Implementation has not started; these documentation updates are not runtime or visual validation. Setup uses the owning repository's persisted feature context; no before_tasks or after_tasks hooks are registered because .specify/extensions.yml is absent.


Current implementation supersedes planning-only status statements above. See quickstart.md Implementation run and validation.json; no full acceptance claim.

## Authorized scope handoff — React integration

The user explicitly stopped further standalone-catalogue acceptance work and requested migration to all real components and the live design system, with removal of the legacy folder when redundant. This section supersedes the original standalone-only boundary and prior pending catalogue tasks, which remain historical unchecked records, not completed checks.

Current acceptance: R1 migrate authoritative tokens/contracts to lib/design-system and remove runtime dependencies on clasor-design-system; R2 apply chrome/floating/solid material roles through shared React primitives, catalogue, workspace and wireframes while preserving behavior and RTL; R3 demonstrate both materials and solid mode in the live catalogue; R4 retain fonts/contracts/documentation needed by consumers and remove redundant static catalogue only after reference migration; R5 verify token generation, build, relevant lint/logic checks and representative browser views. Full old standalone accessibility/performance acceptance is explicitly deferred by the user.
