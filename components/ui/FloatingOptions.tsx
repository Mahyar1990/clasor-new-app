"use client";
import { GlassOptionsMenu, type GlassOption } from "./GlassOptionsMenu";
import { OptionsButton } from "./OptionsButton";
import { glass } from "@/lib/design-system/classes";
export function FloatingOptions({ title, items, onAction, testId, disabled = false }: { title: string; items: GlassOption[]; onAction: (id: string) => void; testId: string; disabled?: boolean }) {
  return <div data-test-id={`${testId}-surface`} className={`${glass.panel} pointer-events-auto flex items-center gap-2 px-2 py-1.5`}>
    <span data-test-id={`${testId}-label`} className="max-w-36 truncate ps-1 text-[11px]">{title}</span>
    <GlassOptionsMenu testId={testId} title={title} description="گزینه‌های سند" items={items} onAction={onAction} trigger={<OptionsButton data-test-id={testId} aria-label={title} disabled={disabled} />} />
  </div>;
}
