"use client";
import { useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { glass } from "@/lib/design-system/classes";
import { Button } from "./button";
import { GlassScrollArea } from "./GlassScrollArea";
/** A nonmodal surface: its parent flex row reserves real layout space. */
export function DockedPanel({ open, title, onClose, children, testId }: { open: boolean; title: string; onClose: () => void; children: ReactNode; testId: string }) {
  const heading = useId();
  return <aside data-test-id={testId} id={testId} hidden={!open} aria-labelledby={heading} className={`${glass.dockedPanel} ${open ? "flex" : "hidden"}`}>
    <header data-test-id={`${testId}-header`} className="flex shrink-0 items-center justify-between gap-1 border-b border-white/25 px-2 py-1"><h2 data-test-id={`${testId}-title`} id={heading} className="text-[10px] font-semibold">{title}</h2><Button data-test-id={`${testId}-close`} size="icon-sm" variant="ghost" className="size-6" aria-label="بستن ابزارهای سند" onClick={onClose}><X aria-hidden="true" className="size-3!" /></Button></header>
    <GlassScrollArea data-test-id={`${testId}-scroll`} label={title} contentClassName={glass.boundedScrollContent} className="min-h-0 flex-1"><div data-test-id={`${testId}-content`} className={glass.compactPanelContent}>{children}</div></GlassScrollArea>
  </aside>;
}
