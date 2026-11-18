"use client";
import { ArrowUp, ArrowDown, X, Plus } from "lucide-react";
import { SelectField } from "./select-field";
import { Button } from "./button";
export interface SortRule { id?: string; field: string; direction: "asc" | "desc" }
export function MultiSortEditor({ value, onValueChange, fields }: { value: SortRule[]; onValueChange: (rules: SortRule[]) => void; fields: { value: string; label: string }[] }) {
  function move(index: number, offset: number) { const next = [...value]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; onValueChange(next); }
  return <div data-test-id="multi-sort" className="space-y-3">
    <p data-test-id="multi-sort-help" className="text-xs text-muted-foreground">معیار بالاتر زودتر اعمال می‌شود؛ معیار بعدی موارد برابر را مرتب می‌کند.</p>
    {value.map((rule, i) => <div data-test-id={`sort-rule-${rule.field}`} key={rule.id ?? rule.field} className="flex flex-wrap items-end gap-2 border-b border-white/25 pb-3">
      <span data-test-id={`sort-priority-${rule.field}`} className="pb-2 text-xs">{i + 1}</span>
      <div data-test-id={`sort-field-wrap-${rule.field}`} className="min-w-28 flex-1"><SelectField data-test-id={`sort-field-${rule.field}`} label="معیار" value={rule.field} options={fields.map(field => ({ ...field, disabled: field.value !== rule.field && value.some(item => item.field === field.value) }))} onValueChange={field => onValueChange(value.map((item, j) => j === i ? { ...item, id: item.id ?? item.field, field } : item))} /></div>
      <div data-test-id={`sort-direction-wrap-${rule.field}`} className="w-24"><SelectField data-test-id={`sort-direction-${rule.field}`} label="جهت" value={rule.direction} options={[{ value: "asc", label: "صعودی" }, { value: "desc", label: "نزولی" }]} onValueChange={direction => onValueChange(value.map((item, j) => j === i ? { ...item, direction: direction as SortRule["direction"] } : item))} /></div>
      <div data-test-id={`sort-actions-${rule.field}`} className="flex gap-1">
        <Button data-test-id={`sort-up-${rule.field}`} size="icon-sm" variant="ghost" aria-label="افزایش تقدم معیار" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp aria-hidden="true" /></Button>
        <Button data-test-id={`sort-down-${rule.field}`} size="icon-sm" variant="ghost" aria-label="کاهش تقدم معیار" disabled={i === value.length - 1} onClick={() => move(i, 1)}><ArrowDown aria-hidden="true" /></Button>
        <Button data-test-id={`sort-remove-${rule.field}`} size="icon-sm" variant="ghost" aria-label="حذف معیار" onClick={() => onValueChange(value.filter((_, j) => j !== i))}><X aria-hidden="true" /></Button>
      </div>
    </div>)}
    <Button data-test-id="sort-add" size="sm" variant="outline" disabled={value.length === fields.length} onClick={() => { const field = fields.find(field => !value.some(item => item.field === field.value)); if (field) onValueChange([...value, { id: crypto.randomUUID(), field: field.value, direction: "asc" }]); }}><Plus aria-hidden="true" />افزودن معیار</Button>
  </div>;
}
