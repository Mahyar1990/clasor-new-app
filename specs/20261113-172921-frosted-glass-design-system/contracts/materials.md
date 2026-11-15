> Historical feature record. Material values, standalone paths and original acceptance plans below describe their own stage, not the current contract. Use the [current retrieval map](../../../docs/RAG.md) and shared React sources for new work.

# Material and identity contract

Proposed v0.3 parameters; validate before marking ready. These are local design choices, not Apple or Fluent numeric specifications.

| Preset | Tint / fill alpha | Blur / saturation | Boundary and depth | Use |
| --- | --- | --- | --- | --- |
| content.solid | #FFFFFF / 1 | 0 / 1 | existing subtle border | tables, forms, text, content cards, dialogs, drawers |
| glass.chrome | #FFFFFF / .82 | 16px / 1.1 | 1px white at .72; shadow black at .06, x=0px, y=4px, blur=16px, spread=0px | sidebar, header |
| glass.floating | #FFFFFF / .92 | 20px / 1.1 | 1px white at .80; shadow black at .10, x=0px, y=8px, blur=24px, spread=0px | menus, popovers, floating toolbar |
| fallback.solid | #FFFFFF / 1 | 0 / 1 | existing structural border and elevation | all glass when effects disabled |

Canvas: existing neutral #F8F8F8 with restrained static lavender tint outside reading surfaces. No animated gradients or photographic background requirement. Glass borders are decorative; add a distinct structural border when needed for contrast. Text #1D1C22 and secondary #5D5B65 remain opaque.

Token families: material.chrome.*, material.floating.* include tint(color), alpha(number), blur(dimension), saturation(number), highlightColor/Alpha, borderWidth, shadowColor/Alpha, shadowX/Y/Blur/Spread, fallback(color alias). Encode hex6 colors and scalar values only. Existing semantic names remain valid; no renamed/removed keys.

For both material.chrome.* and material.floating.*, shadowX and shadowSpread are dimension tokens with $value {"value":0,"unit":"px"}. The fallback token has $type "color" and $value "{color.surface.default}", resolving to the existing #FFFFFF surface. In opaque fallback mode use fill alpha 1 and no backdrop blur; keep normal text opacity. Forced-colors system colors take precedence over this white fallback. Shadow blur is separate from backdrop blur; the floating shadow's 24px blur does not change the 20px maximum backdrop blur.

Primary actions remain solid #8056CB with opaque white labels. Selected navigation uses opaque/tinted purple fill plus non-color selection cue; focus uses a clearly contrasting outline independent of material. Focus must stay visible on both opaque and glass backgrounds. Never communicate errors/selection solely through tint.

Keep current 32/36/44px control sizes and 44px touch targets, 16px cards, 20px dialogs, 24px frames, IRANYekan 400/500/700 and existing line heights. Existing inline SVG icon language is retained; do not introduce an icon/font dependency.

Fallback: author opaque baseline first, enhance within @supports for backdrop-filter or its prefixed equivalent. Reduced-transparency media where supported, explicit solid preview and forced-colors must remove blur and translucent fill. Use system colors in forced-colors. Reduced-motion disables decorative transitions. Do not disable system adjustments globally.

Apply blur to one backing surface per region, never each row/control. Avoid nesting glass inside glass; use solid menus if a blur region budget would be exceeded. Never animate backdrop-filter.
