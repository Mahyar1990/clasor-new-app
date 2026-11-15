> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../docs/RAG.md) and shared React sources for new work.

# Implementation Plan: Clasor Frosted Glass

**Git branch**: master (unchanged) | **Feature**: 20261113-172921-frosted-glass-design-system
**Date**: 2026-11-13 | **Spec**: [spec.md](spec.md)
**Status**: React integration complete for the latest authorized scope. Standalone catalogue acceptance was explicitly deferred, not passed.

## Summary

Evolve the standalone catalogue toward frosted navigation and floating menus, opaque content, current purple and Persian typography. Add compatible material tokens and readable fallbacks. No product layout redesign or dependency change.

## Technical Context

- Language: HTML5, CSS custom properties, vanilla JS. Host: TypeScript, Next.js 16.4.3, React 19.3.0 (manifest).
- Dependencies: existing local fonts/assets; no new dependencies.
- Storage: version-controlled JSON/CSS/HTML; no database or account preference.
- Testing: tokens:check, lint/build when consumer tokens change; manual offline, responsive, keyboard and contrast checks. No npm test script.
- Target: offline Chromium/Firefox catalogue, Persian RTL, 360/390/768/1440 widths.
- Type: static design-system package with generated host token consumer.
- Performance: proposed blur <=20px, <=3 visible blur regions in composition; no animated/nested filters. Not benchmark results.
- Constraints: preserve tokens, typography, controls, radii, keyboard and independent version/approval/access semantics.
- Scope: 13 catalogue sections, 22 component contracts, one material composition, packaged and standalone HTML.

## Constitution Check

Pre-research PASS: scoped constitution restates existing package constraints; client runtime conventions are not imported into this independent app.
Post-design PASS: package boundary preserved, additive schema-compatible tokens, no dependencies, opaque reading surfaces, fallbacks and contrast gates specified, evidence distinguished from future validation. No unresolved design clarifications or unjustified gate violations.

## Project Structure

Documentation: spec.md, plan.md, research.md, data-model.md, contracts/materials.md, contracts/components.md, quickstart.md. [tasks.md](tasks.md) contains the dependency-ordered implementation checklist generated with speckit-tasks.
Source: clasor-design-system/ contains JSON tokens/contracts, CSS, HTML, preview.js, assets and validation.json. scripts/generate-design-tokens.mjs produces lib/design-system/tokens.css. app/, components/ and ds-bundle/ are outside redesign scope.
Structure decision: extend the current static package; no material engine or application architecture change.

## Phase 0: Research

Completed [research.md](research.md). Inspected local instructions, README, prior specs, token generator and package contracts. A research agent checked compatibility and layering. Apple/Fluent are primary references; Uroo is a structural reference without code reuse. No owning-project Graphify tooling/graph is available; focused source inspection was used.

## Phase 1: Design

Completed [data-model.md](data-model.md), [material contract](contracts/materials.md), [component contract](contracts/components.md) and [validation guide](quickstart.md).
Proposed chrome: white .82, blur 16px; floating: white .92, blur 20px. Values require visual/composited contrast validation. Purple #8056CB actions remain opaque. No native adaptive-refraction claim.
Layering risk: backdrop-filter creates stacking contexts; existing sidebar z=20, menu z=80, toast/skip-link z=100 need clipping/overlap checks. Keep filters off shared ancestors and preserve dialog top-layer and focus behavior. Readonly input semantics remain distinct from disabled.

## Focused implementation checklist (future work)

- [ ] Map all 22 existing component IDs and applicable states. (AC1, AC6)
- [ ] Add scalar material tokens; sync package CSS, generate host CSS and inspect consumer diff. (AC3, AC4)
- [ ] Apply glass to chrome/overlays; preserve solid fields/content and focus/status indicators. (AC1, AC5, AC6)
- [ ] Add solid preview and feature/media fallbacks. (AC7)
- [ ] Create one Persian composition; refresh both distributions and docs. (AC2, AC8)
- [ ] Run quickstart and record screenshots, contrast, fallback and responsive evidence. (AC5–AC10)

This is a planning checklist, not execution status or a substitute for tasks.md.

## Workflow setup and verification

The owning repo had no .specify, PROJECT_MAP.md or docs/README.md. Used local README/package documents; copied common.ps1, setup-plan.ps1 and plan-template.md from the user-selected workflow and recorded scoped existing constraints. Created a collision-checked Tehran timestamp directory; setup-plan.ps1 -Json succeeded against this root. Its BRANCH output is feature identity; actual Git branch is master.
No extensions.yml existed during planning: no hooks were registered. Rebuild the unified specs/INDEX.md with node scripts/update-spec-index.mjs. Product behavior specifications remain history. No Next.js feedback candidates arose during that planning pass.
Documentation checks cover artifact existence, local links, placeholders and whitespace. Runtime glass checks remain pending implementation; no visual acceptance claimed.

## Complexity Tracking

No new runtime abstraction. Minimal workflow bootstrap enables the requested skill in the owning repo. Product integration, dependencies, publishing and implementation are outside this run.


Current implementation supersedes planning-only status statements above. See quickstart.md Implementation run and validation.json; no full acceptance claim.

## React integration handoff

The latest explicit request authorizes product component styling and removal of the redundant static package. Source of truth moves to lib/design-system/{tokens,components}.json; shared materials.css uses material attributes on React primitives and chrome shells. Reading/editing/status surfaces stay opaque. Global root preference covers portalled overlays. Keep existing React props, Base UI semantics, interactions and cumulative list loading. Preserve historical evidence and pending standalone checks; do not claim them passed.
