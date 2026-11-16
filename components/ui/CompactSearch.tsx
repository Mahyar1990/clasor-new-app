"use client";
import { useId } from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
export function CompactSearch({ value, onValueChange, onApply, mode, onModeChange, testId, label }: { value: string; onValueChange: (value: string) => void; onApply: () => void; mode?: string; onModeChange?: (mode: string) => void; testId: string; label: string }) {
  const id = useId();
  return <form data-test-id={`${testId}-form`} role="search" aria-label={label} onSubmit={event => { event.preventDefault(); onApply(); }} className={`flex w-full flex-wrap items-center gap-1.5 ${mode ? "max-w-md" : "max-w-xs"}`}>
    <label data-test-id={`${testId}-label`} htmlFor={id} className="sr-only">{label}</label>
    {mode && <Select value={mode} onValueChange={value => onModeChange?.(value ?? "title")} items={[{ value: "title", label: "نام سند" }, { value: "content", label: "محتوا" }]}>
      <SelectTrigger data-test-id={`${testId}-mode`} aria-label="جستجو در" className="h-8 w-24 shrink-0 text-xs"><SelectValue /></SelectTrigger>
      <SelectContent dir="rtl" alignItemWithTrigger={false}><SelectItem data-test-id={`${testId}-mode-title`} value="title">نام سند</SelectItem><SelectItem data-test-id={`${testId}-mode-content`} value="content">محتوا</SelectItem></SelectContent>
    </Select>}
    <Input data-test-id={testId} id={id} type="search" value={value} placeholder={label} className="h-8 min-w-24 flex-1 text-xs" onChange={event => onValueChange(event.target.value)} />
    <Button data-test-id={`${testId}-apply`} type="submit" variant="outline" size="sm" className="h-8 gap-1 px-2"><Search aria-hidden="true" className="size-3.5!" />اعمال</Button>
  </form>;
}
