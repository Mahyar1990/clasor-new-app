"use client";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Bookmark, History, MessageSquare, CircleHelp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { OptionsButton } from "@/components/ui/OptionsButton";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { DocumentCanvas } from "./document-canvas";
import { DocumentActionDialog } from "../document-dialogs/dialog";
import { documentOptions } from "../clasor-document-options";
import { useLibrary } from "../library/store";
import { readReaderSnapshot, parseReaderSnapshot, saveReaderSnapshot, subscribeReader } from "./transfer";
import type { DocumentSetter } from "../document-dialogs/context";
import type { DialogSelection } from "../repository-dialogs/dialog";
const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;
export function ReaderPage({ documentId }: { documentId: string }) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const library = useLibrary();
  const raw = useSyncExternalStore(subscribeReader, () => readReaderSnapshot(documentId), () => null);
  const snapshot = useMemo(() => parseReaderSnapshot(raw, documentId), [raw, documentId]);
  const document = snapshot?.document ?? library.documents.find(item => item.id === documentId);
  const repository = snapshot?.repository ?? library.repositories.find(item => item.id === document?.repositoryId);
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [versionId, setVersionId] = useState("");
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (document) window.document.title = `${document.title} | کلاسور`; if (document?.deleted) heading.current?.focus(); }, [document?.title, document?.deleted, document]);
  const change: DocumentSetter = update => { if (!document) return; const next = typeof update === "function" ? update(document) : update; saveReaderSnapshot(next, repository); library.setDocuments(current => current.map(item => item.id === next.id ? next : item)); };
  if (!hydrated) return <p data-test-id="reader-hydrating" role="status" className="p-6 text-sm">در حال بازکردن سند…</p>;
  if (!document || document.deleted) return <main data-test-id="reader-unavailable" className="p-6 text-sm"><h1 data-test-id="reader-unavailable-title" ref={heading} tabIndex={-1} className="mb-3">سند در این پیش‌نمایش در دسترس نیست.</h1><Link data-test-id="reader-back-documents" href="/clasor-pages/my-documents" className="text-primary underline">بازگشت به سندها</Link></main>;
  const version = document.versions.find(item => item.id === versionId) ?? document.versions.find(item => item.latest && item.approval === "approved") ?? document.versions[0];
  const canEdit = !document.shared || repository?.role === "مالک" || repository?.role === "مدیر" || repository?.role === "ویرایشگر";
  function open(id: string, label: string, trigger: HTMLElement | null) { setSelection({ id, label, trigger }); }
  return <main data-test-id="document-reader-page" dir="rtl" className="flex h-dvh min-h-0 flex-col gap-3 bg-[image:var(--material-canvas)] p-3 text-foreground">
    <GlassCard data-test-id="reader-heading-panel" className="flex shrink-0 flex-wrap items-center gap-3 p-3">
      <div data-test-id="reader-heading-copy" className="min-w-0 flex-1"><Link data-test-id="reader-repository-link" href={document.repositoryId ? `/clasor-pages/repositories/${document.repositoryId}` : "/clasor-pages/my-documents"} className="text-[11px] text-primary">{repository?.name ?? "سندهای من"}</Link><h1 data-test-id="reader-title" ref={heading} tabIndex={-1} className="mt-1 text-sm font-bold wrap-anywhere">{document.title}</h1></div>
      <Button data-test-id="reader-bookmark" size="icon-sm" variant="outline" aria-label="نشان‌کردن سند" aria-pressed={document.bookmarked} onClick={() => change(current => ({ ...current, bookmarked: !current.bookmarked }))}><Bookmark aria-hidden="true" /></Button>
      <GlassOptionsMenu testId="reader-options" title={document.title} description="عملیات سند" trigger={<OptionsButton data-test-id="reader-options" aria-label="عملیات سند" />} items={documentOptions(!canEdit, { bookmarked: document.bookmarked, hidden: document.hidden, hasPassword: !!document.password, hasLink: !!document.publishLink, publicationControls: canEdit }).filter(item => item.id !== "move")} onAction={(id, label, trigger) => open(id, label, trigger ?? null)} />
    </GlassCard>
    <GlassCard data-test-id="reader-content-panel" className="flex min-h-0 flex-1 flex-col gap-3 p-3 lg:flex-row">
      <aside data-test-id="reader-tools" aria-label="ابزارهای سند" className="flex shrink-0 flex-wrap items-start gap-2 lg:w-44 lg:flex-col">
        {version && <div data-test-id="reader-version-select-wrap" className="w-full min-w-0"><SelectField data-test-id="reader-version-select" label="نسخهٔ سند" value={version.id} onValueChange={setVersionId} options={document.versions.map(item => ({ value: item.id, label: `${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}` }))} /></div>}
        {[{ id: "versions", label: "نسخه‌ها", icon: History }, { id: "comments", label: "دیدگاه‌ها", icon: MessageSquare }, { id: "questions", label: "پرسش و پاسخ", icon: CircleHelp }].map(({ id, label, icon: Icon }) => <Button data-test-id={`reader-tool-${id}`} key={id} size="sm" variant="outline" className="lg:w-full lg:justify-start" onClick={event => open(id, label, event.currentTarget)}><Icon aria-hidden="true" />{label}</Button>)}
        <p data-test-id="reader-action-message" role="status" className="text-[11px] text-muted-foreground">{message}</p>
      </aside>
      <DocumentCanvas document={document} version={version} />
    </GlassCard>
    {selection && <DocumentActionDialog key={selection.id} document={document} repository={repository} onChange={change} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />}
  </main>;
}
