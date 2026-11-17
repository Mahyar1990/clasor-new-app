"use client";
import { useId, type ReactNode } from "react";
import { OptionsButton } from "./OptionsButton";
import { glass } from "@/lib/design-system/classes";
export function FloatingActionBar({ open, onOpenChange, children, testId }: { open: boolean; onOpenChange: (value: boolean) => void; children: ReactNode; testId: string }) {
  const id = useId();
  return <div data-test-id={testId} className={`${glass.panel} pointer-events-auto flex max-w-full items-center gap-1 p-1.5`}>
    <OptionsButton data-test-id={`${testId}-toggle`} aria-label={open ? "بستن گزینه‌های سند" : "نمایش گزینه‌های سند"} aria-expanded={open} aria-controls={id} onClick={() => onOpenChange(!open)} />
    <div data-test-id={`${testId}-items`} id={id} hidden={!open} role="group" aria-label="گزینه‌های سند" className={open ? "flex min-w-0 flex-wrap items-center justify-center gap-1" : "hidden"}>{children}</div>
  </div>;
}
