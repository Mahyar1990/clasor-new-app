> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../docs/RAG.md) and shared React sources for new work.

# Design model

No database or network entities are introduced.

| Entity | Fields / constraints | Relationships |
| --- | --- | --- |
| PrimitiveToken | path, $type, $value; supported types color(hex6), number, dimension(px), duration(ms), fontFamily, fontWeight | Existing primitives feed semantic tokens |
| MaterialPreset | id, tint reference, alpha [0,1], blur px [0,20], saturation [1,1.2], highlight, border width, shadow fields, opaque fallback | Composes scalar material tokens into a surface |
| SurfaceAssignment | component id, role(content/navigation/overlay), preset, forbidden nesting | References existing components.json identifiers |
| ComponentState | default/hover/pressed/focus-visible/selected/loading/invalid/disabled where applicable | Existing behavior plus material-safe colors |
| PreviewPreference | material auto/solid; session-local default auto | Affects catalogue materials only, no account setting |
| ValidationRecord | viewport, browser, background, mode, component/state, measured contrast, result, evidence, limitation | Updates validation.json after actual checks |

All token references must resolve without cycles and retain type compatibility. Color paths remain stable. Alpha is applied to the material fill, never container opacity.

For both chrome and floating MaterialPreset records, shadowX=0px and shadowSpread=0px. Each fallback is a color alias to {color.surface.default} (existing #FFFFFF); fallback rendering uses fill alpha 1 and no backdrop blur, subject to forced-colors system-color precedence.

Material selection precedence: forced colors > explicit solid or reduced transparency > unsupported backdrop-filter > glass. Reduced motion is independent. Closing an overlay restores focus to its trigger; selected state is independent of hover; invalid and disabled remain semantically represented.

Documentation files are authoritative design inputs; generated CSS and standalone HTML are derived delivery outputs. No runtime persistence or migration is required.
