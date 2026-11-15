> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../docs/RAG.md) and shared React sources for new work.

# Research: Frosted Glass

Reviewed 2026-11-13. Decisions below are project proposals unless explicitly attributed.

## 1. Material placement
Decision: Use frosted glass for sidebar, header and transient menus; keep reading and editing surfaces opaque.
Rationale: Apple's [Materials](https://developer.apple.com/design/human-interface-guidelines/materials.md) separates controls/navigation from content; [Liquid Glass overview](https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md) describes a native platform material. [Fluent Materials](https://fluent2.microsoft.design/material) places Acrylic on transient menus/popovers. Our persistent navigation is a project adaptation, not a Fluent requirement.
Alternatives: Glass everywhere reduces predictable legibility; native optical refraction is outside this browser package.

## 2. Identity and reuse
Decision: Preserve #8C66E0 brand, #8056CB action, local IRANYekan, existing scale and line-icon language. Use consistent 20px icons, approximately 1.75px strokes and logical direction; directional icons mirror, identity/status symbols do not.
Rationale: tokens.css, tokens.json, REFERENCE_STYLE.md and DESIGN_SYSTEM.md establish v0.2 identity; changing material should remain coherent.
Alternatives: New blue identity or new font/library would add unrelated change. Blue remains an optional later direction.

## 3. Token schema and dependency boundary
Decision: Add scalar material.* tokens only: hex6 colors, number alpha/saturation, px dimensions and same-type aliases. Compose rgba channels, borders and shadows in catalogue CSS.
Rationale: scripts/generate-design-tokens.mjs rejects alpha color strings and composite token types; it generates --clasor-* properties for lib/design-system/tokens.css. Package tokens.css separately uses unprefixed names. Both outputs need explicit validation.
Alternatives: Composite shadow/color schema requires generator changes and is unnecessary. CSS opacity on a whole panel also fades its text and is prohibited.
Do not change the generator or installed dependencies for this feature.

## 4. Reference systems
Decision: Use [Uroo UI](https://github.com/uroo-dev/uroo-ui) as an organizational reference only; no code or assets are imported. Its repository describes a no-build HTML/CSS/JS toolkit with Lucide.
Alternatives: Adopting its Tailwind v3 stack conflicts with the host's existing Tailwind v4 environment.
The [Memorables gallery](https://memorabl.es/inspiration/glassmorphism) is visual exploration, not an accessibility or component contract source.

### Additional reference — 2026-11-15

Added at the project owner's request: [Liquid Glass React by rdev](https://github.com/rdev/liquid-glass-react), a React implementation of an Apple-inspired liquid glass effect. Use it as a visual and technical reference for refraction, edge highlights, configurable frosting and interaction effects. Its README notes partial effect support in Safari and Firefox, where displacement is not visible.

This reference was added after the original research; it is not evidence that the current design used this library. No package, code or assets have been imported. Adoption or changes to the current material contract remain separate implementation work.

## 5. Accessibility and compositing
Decision: Use opaque fallbacks by default and enhance with @supports; explicitly support reduced transparency, forced colors and reduced motion, plus a solid-material preview switch.
Rationale: Blurred backgrounds vary; white highlights alone cannot establish control contrast. Validate actual composites over white, neutral gray, purple-tinted and deliberately busy fixtures.
Alternatives: Blur alone or decorative gradients behind every surface make readability and performance unpredictable.

## 6. Performance and portability
Decision: Static blur with no animated filters, pointer-tracking highlights, noise assets or nested blur surfaces. Initial maximum blur 20px; target at most three visible blur regions in the representative composition, using an opaque dialog above a glass shell.
Rationale: Package must remain offline and portable. These limits are design budgets, not measured performance claims.
Alternatives: WebGL refraction and animated blur add dependencies/work without a task requirement.
Browser/device performance remains a validation activity, not a missing design decision.

## Workflow bootstrap
The owning repo had no .specify, constitution, PROJECT_MAP.md or docs/README.md. Local README, package documents, source and existing specs were used. Minimal common/setup-plan scripts and plan template were copied from the explicitly supplied client workflow; scoped constitution restates existing package constraints. No extension hooks were present before planning. Setup used the owning root and explicit feature directory. Setup's BRANCH field reports feature identity; actual Git branch remains master.
