"use client";
import { CheckSquare, FolderInput, Trash2, X } from "lucide-react";
import { Button } from "./button";
export function BatchActions({ active, count, onActiveChange, onMove, onDelete }: { active: boolean; count: number; onActiveChange: (active: boolean) => void; onMove: (trigger: HTMLElement) => void; onDelete: (trigger: HTMLElement) => void }) {
  return <div data-test-id="batch-actions" className="flex flex-wrap items-center gap-2 text-xs">
    <Button data-test-id="document-selection-mode" variant="outline" size="sm" aria-pressed={active} onClick={() => onActiveChange(!active)}>{active ? <X aria-hidden="true" /> : <CheckSquare aria-hidden="true" />}{active ? "پایان انتخاب" : "انتخاب چند آیتم"}</Button>
    {active && <><span data-test-id="document-selection-count" role="status">{count} از ۱۰ انتخاب شده</span><Button data-test-id="document-bulk-move" size="sm" variant="outline" disabled={!count} onClick={event => onMove(event.currentTarget)}><FolderInput data-test-id="batch-move-icon" aria-hidden="true" />انتقال</Button><Button data-test-id="document-bulk-delete" size="sm" variant="destructive-outline" disabled={!count} onClick={event => onDelete(event.currentTarget)}><Trash2 aria-hidden="true" />حذف</Button><span data-test-id="document-selection-help" className="text-[10px] text-muted-foreground">انتخاب‌ها با تغییر نمایش یا جستجو حفظ می‌شوند.</span></>}
  </div>;
}
