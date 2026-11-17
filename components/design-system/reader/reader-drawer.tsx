"use client";
import { useState, type RefObject } from "react";
import { DockedPanel } from "@/components/ui/DockedPanel";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
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
  return <DockedPanel testId="reader-drawer" title="ابزارهای سند" open={open} onClose={() => { onOpenChange(false); anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="reader-drawer-toggle"]')?.focus(); }}>
    <ClasorTabs label="بخش‌های سند" value={!editing && tab === "history" ? "tags" : tab} onValueChange={value => setTab(String(value))} testIds={{ root: "reader-drawer-tabs", list: "reader-drawer-tab-list", tab: value => `reader-tab-${value}`, panel: value => `reader-panel-${value}` }} items={items} />
  </DockedPanel>;
}
