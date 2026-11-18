"use client";
import { useState } from "react";
import { Save, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormActions } from "@/components/ui/FormActions";
import { useStatusToast } from "@/components/ui/status-toast";
import { DomainTools, useDomainQuery } from "./collection";
import { baseFields, colorFields, advancedFlags } from "./settings-schema";
import { SettingsIdentity, SettingsFeatures } from "./settings-sections";
import { SettingsColors } from "./settings-colors";
import { normalizeDomainText } from "./queries";
import { useDomain } from "./store";
export function DomainSettingsPanel() {
  const { state, setState, settingsDraft: draft, setSettingsDraft: setDraft } = useDomain();
  const [query, setQuery] = useDomainQuery();
  const [error, setError] = useState("");
  const toast = useStatusToast();
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.settings);
  const matches = (label: string, kind: string) => (!query.filters.group || query.filters.group === "all" || query.filters.group === kind) && normalizeDomainText(label).includes(normalizeDomainText(query.text));
  const basic = baseFields.filter(item => matches(`${item.label} ${draft.fields[item.id]}`, "basic"));
  const colors = colorFields.filter(item => matches(`${item.label} ${draft.colors[item.id]}`, "colors"));
  const flags = advancedFlags.filter(item => matches(item.label, "advanced"));
  function save() {
    if (!draft.fields.name.trim()) { setError("نام دامنه را وارد کنید."); return; }
    if (Object.values(draft.colors).some(value => !/^#[a-f0-9]{6}$/i.test(value))) { setError("کد رنگ‌های نامعتبر را اصلاح کنید؛ با پاک‌کردن فیلتر همه فیلدها دیده می‌شوند."); return; }
    setState(current => ({ ...current, settings: draft })); setError(""); toast.show("تنظیمات دامنه ذخیره شد.", { type: "success" });
  }
  return <section data-test-id="domain-settings" className="space-y-4">
    <div data-test-id="domain-settings-heading" className="flex flex-wrap items-center justify-between gap-3">
      <div data-test-id="domain-settings-heading-copy"><h2 data-test-id="domain-settings-title" className="text-sm font-bold">تنظیمات دامنه</h2><p data-test-id="domain-settings-dirty" role="status" className="mt-1 text-[10px] text-muted-foreground">{dirty ? "تغییرات ذخیره‌نشده دارید." : "اطلاعات، قابلیت‌ها و هویت بصری دامنه"}</p></div>
      <FormActions data-test-id="domain-settings-actions"><Button data-test-id="domain-settings-undo" variant="outline" size="sm" disabled={!dirty} onClick={() => { setDraft(state.settings); setError(""); }}><Undo2 aria-hidden="true" className="size-3!" />بازگردانی</Button><Button data-test-id="domain-settings-save" size="sm" disabled={!dirty} onClick={save}><Save aria-hidden="true" className="size-3!" />ذخیره تغییرات</Button></FormActions>
    </div>
    <DomainTools testId="domain-settings" query={query} onChange={setQuery} count={basic.length + colors.length + flags.length} filters={[{ id: "group", label: "بخش تنظیمات", options: [{ value: "all", label: "همه بخش‌ها" }, { value: "basic", label: "پایه و سرویس‌ها" }, { value: "colors", label: "رنگ‌ها" }, { value: "advanced", label: "تنظیمات پیشرفته" }] }]} />
    {!!error && <p data-test-id="domain-settings-error" role="alert" className="text-xs text-destructive">{error}</p>}
    {(!!basic.length || !!flags.length) && <div data-test-id="domain-settings-main-grid" className={`grid items-start gap-3 ${basic.length && flags.length ? "xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" : ""}`}>
      {!!basic.length && <SettingsIdentity fields={basic} values={draft.fields} onChange={(id, value) => setDraft(current => ({ ...current, fields: { ...current.fields, [id]: value } }))} />}
      {!!flags.length && <SettingsFeatures flags={flags} values={draft.flags} onChange={(id, value) => setDraft(current => ({ ...current, flags: { ...current.flags, [id]: value } }))} />}
    </div>}
    {!!colors.length && <SettingsColors fields={colors} values={draft.colors} expanded={!!query.text} onChange={(id, value) => setDraft(current => ({ ...current, colors: { ...current.colors, [id]: value } }))} />}
    {!basic.length && !colors.length && !flags.length && <p data-test-id="domain-settings-empty" className="py-6 text-center text-xs text-muted-foreground">تنظیمی با این جستجو و فیلتر یافت نشد.</p>}
  </section>;
}
