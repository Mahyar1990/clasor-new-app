"use client";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuItem } from "./dropdown-menu";
export interface EditorVersionOption { id: string; label: string }
export function VersionPicker({ versions, value, onValueChange, onViewAll }: { versions: EditorVersionOption[]; value: string; onValueChange: (id: string) => void; onViewAll: (trigger: HTMLElement) => void }) {
  const trigger = useRef<HTMLButtonElement>(null);
  return <DropdownMenu><DropdownMenuTrigger data-test-id="reader-version-select" ref={trigger} render={<Button data-test-id="reader-version-select" size="sm" variant="outline" className="w-44 max-w-[52vw] justify-between text-xs" />} aria-label="نسخهٔ سند">
    <span data-test-id="reader-version-current" className="min-w-0 truncate">{versions.find(item => item.id === value)?.label ?? "نسخهٔ سند"}</span><ChevronDown aria-hidden="true" className="size-3" />
  </DropdownMenuTrigger><DropdownMenuContent data-test-id="reader-version-list" dir="rtl" align="start" surface="liquid" aria-label="نسخه‌های سند" className="min-w-48 max-w-[calc(100vw-2rem)]">
    <VersionMenuItems versions={versions} value={value} onValueChange={onValueChange} onViewAll={() => { if (trigger.current) onViewAll(trigger.current); }} />
  </DropdownMenuContent></DropdownMenu>;
}

export function VersionMenuItems({ versions, value, onValueChange, onViewAll }: { versions: EditorVersionOption[]; value: string; onValueChange: (id: string) => void; onViewAll: () => void }) {
  return <>
    <DropdownMenuRadioGroup data-test-id="reader-version-choices" value={value} onValueChange={onValueChange}>{versions.map(item => <DropdownMenuRadioItem data-test-id={`reader-version-option-${item.id}`} key={item.id} value={item.id} closeOnClick className="text-xs">{item.label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup>
    <DropdownMenuSeparator data-test-id="reader-version-separator" />
    <DropdownMenuItem data-test-id="reader-view-all-versions" onClick={onViewAll} className="text-xs">مشاهده همه نسخه‌ها</DropdownMenuItem>
  </>;
}
