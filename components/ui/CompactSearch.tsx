"use client";
import { useId } from "react";
import { glass } from "@/lib/design-system/classes";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
export function CompactSearch({ value, onValueChange, onApply, mode, onModeChange, testId, label, autoFocus = false }: { value: string; onValueChange: (value: string) => void; onApply: () => void; mode?: string; onModeChange?: (mode: string) => void; testId: string; label: string; autoFocus?: boolean }) {
  const id = useId();
  return <form data-test-id={`${testId}-form`} role="search" aria-label={label} onSubmit={event => { event.preventDefault(); onApply(); }} className={`${glass.searchGroup} ${mode ? "" : "max-w-xs"}`}>
    <label data-test-id={`${testId}-label`} htmlFor={id} className="sr-only">{label}</label>
    {mode && <Select value={mode} onValueChange={value => onModeChange?.(value ?? "title")} items={[{ value: "title", label: "نام سند" }, { value: "content", label: "محتوا" }]}>
      <SelectTrigger data-test-id={`${testId}-mode`} aria-label="جستجو در" size="sm" className={glass.searchMode}><SelectValue /></SelectTrigger>
      <SelectContent dir="rtl" alignItemWithTrigger={false}><SelectItem data-test-id={`${testId}-mode-title`} value="title">نام سند</SelectItem><SelectItem data-test-id={`${testId}-mode-content`} value="content">محتوا</SelectItem></SelectContent>
    </Select>}
    <Input data-test-id={testId} id={id} autoFocus={autoFocus} type="search" value={value} placeholder={label} className={`${glass.searchInput} text-xs`} onChange={event => onValueChange(event.target.value)} />
    <Button data-test-id={`${testId}-apply`} type="submit" variant="outline" size="sm" className={glass.searchApply}><Search aria-hidden="true" className="size-3.5!" />اعمال</Button>
  </form>;
}
