"use client";
import { Globe, Plug, SlidersHorizontal } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { baseFields, advancedFlags } from "./settings-schema";
type Field = typeof baseFields[number];
type Flag = typeof advancedFlags[number];
export function SettingsIdentity({ fields, values, onChange }: { fields: Field[]; values: Record<string, string>; onChange: (id: string, value: string) => void }) {
  const identity = fields.filter(field => field.group === "پایه");
  const services = fields.filter(field => field.group === "سرویس‌ها");
  return <div data-test-id="domain-settings-primary" className="min-w-0 space-y-3">
    {!!identity.length && <GlassCard data-test-id="domain-settings-identity" className="p-4">
      <h3 data-test-id="domain-settings-identity-title" className="mb-4 flex items-center gap-2 text-xs font-bold"><Globe aria-hidden="true" className="size-4 text-primary" />هویت دامنه</h3>
      <div data-test-id="domain-settings-identity-fields" className="grid gap-3 sm:grid-cols-2">
        {identity.filter(field => field.id !== "description").map(field => <TextField key={field.id} data-test-id={`domain-setting-${field.id}`} label={field.label === "لوگو" ? "آدرس لوگو" : field.label} required={field.id === "name"} maxLength={300} dir={field.id === "logo" ? "ltr" : "rtl"} value={values[field.id]} onValueChange={value => onChange(field.id, value)} />)}
        {identity.some(field => field.id === "description") && <div data-test-id="domain-settings-description-row" className="sm:col-span-2"><TextareaField data-test-id="domain-setting-description" label="توضیحات دامنه" rows={3} maxLength={1000} value={values.description} onValueChange={value => onChange("description", value)} /></div>}
      </div>
    </GlassCard>}
    {!!services.length && <GlassCard data-test-id="domain-settings-services" className="p-4">
      <h3 data-test-id="domain-settings-services-title" className="mb-4 flex items-center gap-2 text-xs font-bold"><Plug aria-hidden="true" className="size-4 text-primary" />اتصال به سرویس‌ها</h3>
      <div data-test-id="domain-settings-service-fields" className="grid gap-3 sm:grid-cols-2">
        {services.map(field => <TextField key={field.id} data-test-id={`domain-setting-${field.id}`} label={field.label} maxLength={300} dir="ltr" value={values[field.id]} onValueChange={value => onChange(field.id, value)} />)}
      </div>
    </GlassCard>}
  </div>;
}
const flagGroups = [
  { title: "انتشار و دسترسی", ids: ["landing", "privateNews", "personal", "createRepository", "domainTags"] },
  { title: "تعامل کاربران", ids: ["reactions", "comments", "approveComments", "questions", "approveQuestions", "answers"] },
  { title: "نمایش و ساختار", ids: ["defaultFont", "branches"] },
];
export function SettingsFeatures({ flags, values, onChange }: { flags: Flag[]; values: Record<string, boolean>; onChange: (id: string, value: boolean) => void }) {
  return <GlassCard data-test-id="domain-settings-advanced" className="p-4">
    <h3 data-test-id="domain-settings-advanced-title" className="mb-3 flex items-center gap-2 text-xs font-bold"><SlidersHorizontal aria-hidden="true" className="size-4 text-primary" />قابلیت‌های دامنه</h3>
    <div data-test-id="domain-settings-flags" className="space-y-3">
      {flagGroups.map(group => {
        const items = flags.filter(flag => group.ids.includes(flag.id));
        return !!items.length && <fieldset key={group.title} data-test-id={`domain-feature-group-${group.title}`} className="border-t border-white/30 pt-2">
          <legend data-test-id={`domain-feature-title-${group.title}`} className="pe-2 text-[10px] font-medium text-muted-foreground">{group.title}</legend>
          <div data-test-id={`domain-feature-rows-${group.title}`} className="space-y-1.5">
            {items.map(flag => <label key={flag.id} data-test-id={`domain-flag-label-${flag.id}`} className={`flex cursor-pointer items-center justify-between gap-3 py-1 text-[11px] leading-5 ${["approveComments", "approveQuestions", "answers"].includes(flag.id) ? "ms-3 border-s border-white/35 ps-3" : ""}`}>
              <span data-test-id={`domain-flag-text-${flag.id}`} className="min-w-0">{flag.label}</span>
              <Checkbox data-test-id={`domain-flag-${flag.id}`} checked={values[flag.id]} onCheckedChange={value => onChange(flag.id, !!value)} />
            </label>)}
          </div>
        </fieldset>;
      })}
    </div>
  </GlassCard>;
}
