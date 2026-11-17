"use client";
import { useState, type RefObject } from "react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { ReaderHistory, ReaderTags, ReaderChat, ReaderAttachments } from "./drawer-content";
import { DocumentActivities } from "../document-dialogs/activity";
export function ReaderDrawer({ open, onOpenChange, editing, canEdit, anchor }: { open: boolean; onOpenChange: (open: boolean) => void; editing: boolean; canEdit: boolean; anchor: RefObject<HTMLElement | null> }) {
  const [tab, setTab] = useState("tags");
  const items = [
    ...(editing ? [{ value: "history", label: "تاریخچه", content: <ReaderHistory /> }] : []),
    { value: "tags", label: "تگ‌ها", content: <ReaderTags editable={canEdit} /> },
    { value: "attachments", label: "پیوست", content: <ReaderAttachments editable={canEdit} /> },
    { value: "chat", label: "چت", content: <ReaderChat /> },
    { value: "comments", label: "دیدگاه‌ها", content: <DocumentActivities kind="comments" /> },
    { value: "questions", label: "پرسش و پاسخ", content: <DocumentActivities kind="questions" /> },
  ];
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent data-test-id="reader-drawer" themeAnchorRef={anchor} dir="rtl" side="left" finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="reader-drawer-toggle"]') ?? true} className="w-[min(25rem,100vw)]! max-w-none! gap-2 p-3">
    <SheetTitle data-test-id="reader-drawer-title" className="pe-8 text-sm">ابزارهای سند</SheetTitle><SheetDescription data-test-id="reader-drawer-description" className="sr-only">تاریخچه، تگ‌ها و گفتگوهای سند</SheetDescription>
    <GlassScrollArea data-test-id="reader-drawer-scroll" label="ابزارهای سند" className="min-h-0 flex-1"><ClasorTabs label="بخش‌های سند" value={!editing && tab === "history" ? "tags" : tab} onValueChange={value => setTab(String(value))} testIds={{ root: "reader-drawer-tabs", list: "reader-drawer-tab-list", tab: value => `reader-tab-${value}`, panel: value => `reader-panel-${value}` }} items={items} /></GlassScrollArea>
  </SheetContent></Sheet>;
}
