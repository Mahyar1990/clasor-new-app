---
title: اصلاح اسکرول و جمع‌کردن سایدبار وایرفریم
status: complete
created: 2026-11-01
completed: 2026-11-01
owner: clasor-new-app
---

# Wireframe sidebar scroll and toggle

## Problem and evidence
The user requests the catalogue's sidebar scroll fix and a close control in wireframes. `wf-sidebar` sticks at top:24px with min-height:510px; `wf-topbar` is not sticky. The catalogue now aligns both at top:0 and supports an icon rail. README and local AGENTS are the independent application's navigation sources; PROJECT_MAP/docs/README/Graphify are absent. Next use-client guide and shared Button/Sheet patterns inspected.

## Goals, requirements and acceptance
- R1 / AC1: Sidebar and full-width header align at start, partial and deep scroll, including desktop 1050px and short windows. Sidebar content can scroll when height is constrained.
- R2 / AC2: An accessible header button collapses the desktop sidebar to a centered icon rail and reopens it. Named navigation and active state survive; document/filter state remains intact.
- R3 / AC3: Mobile/tablet retains the Sheet, close control, Escape and navigation closing. No horizontal overflow at 360/768/1440px.
- R4 / AC4: Focused lint, production build and diff checks pass; browser evidence recorded.

## Scope and constraints
Only wireframe composition and scoped CSS; reuse existing Button, Sheet and icons. No shared primitive, interface, API, dependency or workspace behavior changes. Existing unrelated edits preserved. Physical touch and human screen-reader testing UNKNOWN. Affected sources: components/wireframes/index.tsx and wireframes.css. Existing wireframe M2 spec remains the historical visual baseline; this separate follow-up owns only sidebar behavior.

## Checklist and progress
- [x] W1: Implement sticky alignment, bounded scrolling and desktop icon toggle. (R1/R2; AC1/AC2)
- [x] W2: Verify desktop/mobile/short-height behavior, lint/build; update README and index. (R3/R4; AC3/AC4)

| Unit | State | Evidence |
| --- | --- | --- |
| W1 | complete | Focused ESLint/diff checks passed. Native viewport: sidebar/header both top 77.6 at start and 0 at scrollY312.8. Collapse width64, centered42px mark, preserved search and icon navigation. |
| W2 | complete | Browser checks at native1536×674, 1440×800, 1050×460, 768×700 and 360×640; lint/build passed. README/index updated. |

## Verification
| Criterion | Evidence | Result |
| --- | --- | --- |
| AC1 | At1440: start sidebar/header top77.6; partial scrollY40 both37.6; reader end scrollY454.4 both0. At1050×460 both0; sidebar clientHeight352/scrollHeight532 and keyboard PageDown changes its scrollTop. | Pass |
| AC2 | Header button changes expanded true/false and rail width64; 42px brand centered. Search «راهنمای» remains after collapse; named icon navigation works and reopen restores full labels/profile. Collapsed reader sidebar/header both0. | Pass |
| AC3 | No horizontal overflow at360/768/1050/1440/native1536. Mobile Sheet opens, selecting مخزن‌ها closes it and changes h1. Explicit close at768 and Escape at360 restore focus to menu trigger. Temporary viewport overrides reset. | Pass |
| AC4 | `npm run lint` exit0; `npm run build` exit0 (89tokens, TypeScript,49pages); focused diff check exit0. | Pass |

Screenshot: `.codex/qa-wireframe-sidebar/collapsed.png`. Source changes confined to the two wireframe files, with README and this spec/index documentation. Existing unrelated working-tree changes preserved.

## Risks and rollback
Sticky positioning depends on containing-block height and frame clipping. Check end of page and short viewport. Revert only this change in the two wireframe sources and README if needed.

## Decisions and deviations
User explicitly authorizes sidebar UI change. Desktop close means the same icon collapse used by the main catalogue; mobile remains an overlay. No remaining implementation TODO. Human screen-reader and physical touch testing remain UNKNOWN. Final Next.js feedback review found no qualifying framework issue; routine browser automation timing was handled by waiting for visible/hidden state.
