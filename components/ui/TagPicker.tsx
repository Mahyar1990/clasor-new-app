"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FieldFrame, useFieldMeta } from "@/components/ui/field-frame";
import { glass } from "@/lib/design-system/classes";

export interface TagPickerProps {
  label: string;
  value: string[];
  options: string[];
  onValueChange: (value: string[]) => void;
  testId: string;
  disabled?: boolean;
  description?: string;
  error?: string;
}

/** Searchable, fixed form options; data lists keep their own loading contract. */
export function TagPicker({ label, value, options, onValueChange, testId, disabled, description, error }: TagPickerProps) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const meta = { label, description, error, disabled };
  const { controlId, describedBy } = useFieldMeta(meta);
  const available = [...new Set([...options, ...value])].filter(option => option.includes(query.trim()));
  function toggle(tag: string) {
    onValueChange(value.includes(tag) ? value.filter(item => item !== tag) : [...value, tag]);
  }
  return <div data-test-id={testId}>
    <FieldFrame {...meta} controlId={controlId}>
      <Input data-test-id={`${testId}-search`} id={controlId} ref={input} type="search" value={query} disabled={disabled} aria-describedby={describedBy} aria-invalid={!!error} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Enter") event.preventDefault(); }} placeholder={`جستجوی تگ‌ها (${options.length})`} />
      <div data-test-id={`${testId}-selected`} className="flex flex-wrap gap-1" aria-label="برچسب‌های انتخاب‌شده">
        {value.map(tag => <Badge key={tag} variant="secondary" data-test-id={`${testId}-chip-${tag}`} className="max-w-full gap-1 rounded-lg">
          <span data-test-id={`${testId}-name-${tag}`} className="wrap-anywhere">{tag}</span>
          <Button data-test-id={`${testId}-remove-${tag}`} type="button" variant="ghost" disabled={disabled} size="icon-sm" className="size-6 p-0 [&_svg]:size-3" aria-label={`حذف برچسب ${tag}`} onClick={() => { toggle(tag); input.current?.focus(); }}><X aria-hidden="true" /></Button>
        </Badge>)}
        {!value.length && <p data-test-id={`${testId}-empty`} className="text-xs text-muted-foreground">برچسبی انتخاب نشده است.</p>}
      </div>
      <div data-test-id={`${testId}-options`} className={`${glass.contentSurface} grid max-h-36 gap-1 overflow-y-auto p-1 sm:grid-cols-2`} role="group" aria-label="برچسب‌های موجود">
        {available.map(tag => <label data-test-id={`${testId}-option-${tag}`} key={tag} className={`rounded-md border border-transparent flex min-h-8 cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-white/15 has-data-checked:border-purple-300/40 has-data-checked:bg-purple-200/15`}>
          <Checkbox data-test-id={`${testId}-check-${tag}`} aria-label={tag} disabled={disabled} checked={value.includes(tag)} onCheckedChange={() => toggle(tag)} />{tag}
        </label>)}
        {!available.length && <p data-test-id={`${testId}-no-results`} className="p-2 text-xs text-muted-foreground">برچسبی با این نام پیدا نشد.</p>}
      </div>
    </FieldFrame>
  </div>;
}
