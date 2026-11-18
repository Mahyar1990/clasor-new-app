"use client";
import { Palette, ChevronDown } from "lucide-react";
import { ColorField } from "@/components/ui/ColorField";
import { glass } from "@/lib/design-system/classes";
import { colorFields } from "./settings-schema";
export function SettingsColors({ fields, values, expanded, onChange }: { fields: typeof colorFields; values: Record<string, string>; expanded: boolean; onChange: (id: string, value: string) => void }) {
  const groups = [...new Set(fields.map(field => field.group))];
  return <section data-test-id="domain-settings-colors" className="space-y-3">
    <div data-test-id="domain-settings-colors-heading" className="flex items-center justify-between gap-2">
      <h3 data-test-id="domain-settings-colors-title" className="flex items-center gap-2 text-xs font-bold"><Palette aria-hidden="true" className="size-4 text-primary" />رنگ‌ها و هویت بصری</h3>
      <span data-test-id="domain-settings-colors-count" className="text-[10px] text-muted-foreground">{fields.length.toLocaleString("fa-IR")} رنگ</span>
    </div>
    <div data-test-id="domain-settings-color-groups" className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
      {groups.map(group => {
        const colors = fields.filter(field => field.group === group);
        return <details key={group} data-test-id={`domain-colors-${group}`} open={expanded} className={`group ${glass.contentSurface} p-3`}>
          <summary data-test-id={`domain-colors-toggle-${group}`} className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-semibold [&::-webkit-details-marker]:hidden">
            <span data-test-id={`domain-color-group-name-${group}`} className="flex items-center gap-1.5"><ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-180 motion-reduce:transition-none" />{group}</span>
            <span data-test-id={`domain-color-group-swatches-${group}`} aria-hidden="true" className="flex shrink-0 gap-1">{colors.slice(0, 3).map(field => <span data-test-id={`domain-color-swatch-${field.id}`} key={field.id} className="size-4 rounded-md border border-white/70" style={{ backgroundColor: /^#[0-9a-f]{6}$/i.test(values[field.id]) ? values[field.id] : "transparent" }} />)}</span>
          </summary>
          <div data-test-id={`domain-colors-fields-${group}`} className="grid gap-3 border-t border-white/30 pt-3 mt-3">{colors.map(field => <ColorField key={field.id} testId={`domain-${field.id}`} label={field.label} value={values[field.id]} onValueChange={value => onChange(field.id, value)} />)}</div>
        </details>;
      })}
    </div>
  </section>;
}
