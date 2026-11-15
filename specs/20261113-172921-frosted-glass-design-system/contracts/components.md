> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../../docs/RAG.md) and shared React sources for new work.

# Component application contract

Applies to all 22 existing components.json entries; implementation must preserve their identifiers and rules. Group mapping is semantic; verify full inventory before editing.

| Component family | Surface and state requirements |
| --- | --- |
| Sidebar/header/navigation | glass.chrome, solid selected marker, keyboard focus outline, readable labels |
| Button | solid primary; secondary may sit on glass with sufficient border contrast; hover/pressed visibly distinct; loading retains label and prevents duplicate action; disabled native semantics |
| Text-field/select/file-input | opaque field interior, persistent label; invalid border plus text and aria association; disabled reason outside control |
| Choice/tabs/breadcrumb/stepper | parent material inherited; selected and focus separate; keyboard semantics preserved |
| Data-table/content card/identity/approval-context | solid; version, approval and access stay distinct; no per-row blur |
| Action-menu/popover/floating toolbar | glass.floating if no nested glass; opaque fallback; Escape closes, focus returns; no clipping |
| Dialog/drawer | opaque content; separate neutral dimming scrim; modal focus behavior unchanged |
| Badge/feedback/system-state/toast | opaque semantic status surfaces and text; do not recolor errors/success to purple |
| Tooltip/permission-action | opaque readable explanation, accessible trigger and disabled reason |

All families document default, hover, pressed, focus-visible, selected, loading, invalid and disabled as applicable; mark non-applicable states explicitly in components.json. No interaction logic changes except catalogue-only material preference.

Original deliverables described the retired standalone package. Current deliverables are the shared React library, live catalogue, token source/generator and material contracts in lib/design-system. Preserve existing interactions and regenerate tokens.css from tokens.json when tokens change; generated bundles are not authored sources.

The catalogue gains one small representative composition with right sidebar, top toolbar, document table and contextual menu. It illustrates the material hierarchy, not a new product workflow or route.
