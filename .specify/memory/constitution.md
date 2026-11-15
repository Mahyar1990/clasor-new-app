# Clasor design planning constraints

Version: 1.2.0 | Updated: 2026-11-14 (Asia/Tehran)

This scoped baseline records existing rules from AGENTS.md and lib/design-system/DESIGN_SYSTEM.md. Start retrieval at docs/RAG.md. It is not the Pardis client's constitution and introduces no independent product policy.

1. The latest explicit user request authorizes integration into shared React components and application shells, migration of token/contract ownership to lib/design-system, and retirement of the redundant standalone package. New dependencies, backend, authentication and deployment remain outside scope.
2. Preserve Persian RTL, local IRANYekan assets and their existing licensing constraints, logical CSS properties, DOM reading order and bidirectional identifiers.
3. Preserve component behavior and semantic distinctions: approval, version and access are independent; roles do not establish authorization. Disabled controls must be behaviorally disabled and explain why.
4. Keep semantic token names and the existing JSON source of truth. Generated consumers must stay synchronized. Do not import the catalogue CSS wholesale into the product.
5. Prioritize readable content, keyboard operation, persistent labels, actionable errors and local/offline preview. Material effects cannot replace focus or status indicators.
6. Evidence must distinguish planned acceptance checks from executed validation. Preserve existing specs and external concepts; no deployment or unrelated edits.
7. The completed Master Refactor uses shared glass wrappers, shadcn Base UI Select, explicit authored test IDs and logical RTL utilities. Every authored React file stays within 200 physical lines; splitting must preserve public exports. New components are demonstrated through app/page.tsx. classes.ts Tailwind contracts own appearance; tokens.css/theme.css retain only foundation variables; old Solid-form and large-radius stage descriptions are historical. Run ui:check, lint and build before delivery; neither a fixture nor a structural check establishes production authorization or full accessibility acceptance.

Ratification scope: restatement of existing package constraints for this feature; no independent approval of future runtime changes.
