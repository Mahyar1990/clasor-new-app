---
title: اصلاح فاصله هدر هنگام جمع‌شدن سایدبار کاتالوگ
status: complete
created: 2026-11-01
completed: 2026-11-01
owner: clasor-new-app
---

# Catalogue header and sidebar spacing

## Problem and evidence
On localhost:3001, collapsed sidebar leaves the header inset by 58.8px on both sides at the current desktop viewport. The sticky topbar is nested inside .content, whose centered max-width is 1280px. SidebarInset already fills the available area. Source: foundations-catalogue.tsx and reference-style.css. This independent app has no PROJECT_MAP/docs/README/Graphify graph; README, local AGENTS and existing specs supply context. Next CSS guide read.

## Goals and non-goals
Keep the header connected to the sidebar and the frame's left inner edge in expanded/collapsed states. Preserve readable content width, outer frame, navigation and mobile sheet. No API, dependency, shared sidebar primitive or workspace changes.

## Requirements and acceptance
- R1 / AC1: Header spans SidebarInset with no extra left/right margin at desktop expanded and collapsed sizes, including wide viewports.
- R2 / AC2: Header remains sticky when scrolling; mobile/tablet menu opens/closes and narrow layouts have no horizontal overflow.
- R3 / AC3: Scoped styling, lint, TypeScript and production build pass without unrelated changes.

## Constraints, risks and rollback
The catalogue owns the header layout; keep CSS scoped to .clasor. No interface changes. Preserve content max-width and existing outer frame inset. Risk: mobile header corners/sticky behavior; verify in browser. Rollback only the two affected source files. UNKNOWN: physical touch and human screen-reader testing.

## Checklist and progress
- [x] W1: Move topbar outside width-limited content and adapt scoped CSS; verify browser geometry (R1/AC1).
- [x] W2: Verify scroll/mobile/desktop, lint/build, update spec/index (R2/R3; AC2/AC3).

| Unit | State | Evidence |
| --- | --- | --- |
| W1 | complete | Header left/right now match SidebarInset exactly in expanded/collapsed states; previous 58.8px margins eliminated |
| W2 | complete | Browser checks at native 1536, wide 1920, tablet 768 and mobile 360; ESLint and production build passed |

## Verification
| Criterion | Expected check | Actual |
| --- | --- | --- |
| AC1 | Header edges match inset edges in both sidebar states | Pass: zero left/right gap in both states, including width 1920 |
| AC2 | Sticky header, mobile menu, no page overflow | Pass: header top=0 after scroll, mobile dialog opens/closes; no overflow at 360/768/1536/1920; viewport reset |
| AC3 | ESLint, production build and diff check pass | Pass: npm run lint, npm run build (89 tokens, TypeScript, 49 pages), git diff --check |

## Decisions and deviations
User authorized this visual fix; no approval-sensitive changes needed. Header is independent of readable content width.


## Final evidence
Source changes: components/design-system/foundations-catalogue.tsx and lib/design-system/reference-style.css. Screenshot: .codex/qa-sidebar-spacing/collapsed-header.png. No new imports/declarations/dependencies or remaining implementation TODO. Next.js feedback review found no qualifying framework issues. Desktop content stays centered at its existing readable maximum; only header spans the frame. Browser automation used temporary viewport overrides and cleared them.

## Follow-up: collapsed logo alignment (2026-11-01)
Objective: center the logo horizontally in the collapsed sidebar; keep expanded/mobile appearance. Inline checklist: inspect padding conflict, add collapsed-only padding/justification in reference-style.css, verify geometry and lint. Complete: the high-specificity 16px header padding had overridden collapsed utility padding, leaving insufficient room for the 44px mark. Collapsed header now has zero inline padding and a centered row. Browser confirms 64px rail / 44px logo / 10px on each side after repeated toggles. Expanded remains 232px / 40px logo / 16px right inset. npm run lint and git diff --check pass. Screenshot: .codex/qa-sidebar-spacing/centered-logo.png. No framework feedback candidates or remaining TODO for this adjustment.

## Follow-up: synchronized scroll alignment
R4 / AC4: Sidebar and header top edges must remain aligned at page start, partial scroll and deep scroll in expanded/collapsed desktop states, including the 1024–1100 breakpoint. Preserve readable content, logo centering and mobile sheet. Evidence: page scrollY=1036 gives header top=0 but fixed sidebar top=30. W3 complete: replace catalogue-only fixed positioning with sticky top=0 inside the existing stretched sidebar column; remove breakpoint viewport offsets. Verify geometry/navigation, lint/build and screenshot. Risks: sticky containing-block height and sidebar column sizing; inspect both states and end of page. No shared primitive or API changes.

AC4 verification passed: start top=29.6 for both; partial scrollY=10.4 gives top=19.2 for both; deep expanded scrollY=1036 gives top=0 for both; collapsed scrollY=588.8 gives top=0 for both with rail width64. Width1050 (former22px offset breakpoint) and end-of-page scrollY=15528 both give header/sidebar top=0; no horizontal overflow. Native viewport restored. Screenshot .codex/qa-sidebar-spacing/scroll-aligned.png. npm run lint and npm run build passed (89 tokens, TypeScript, 49 pages); git diff --check passed. Only catalogue reference-style.css implementation changed for this follow-up; no new imports or declarations. No remaining implementation TODO; no qualifying Next.js feedback issues.
