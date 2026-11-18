"use client";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { readerFolderPath } from "./reader-path";
import { EditorWorkspace } from "./editor-workspace";
import { useLibrary } from "../library/store";
import { readReaderSnapshot, parseReaderSnapshot, saveReaderSnapshot, subscribeReader } from "./transfer";
import { useStatusToast } from "@/components/ui/status-toast";
import type { DocumentPreview } from "../document-dialogs/model";
import type { DocumentSetter } from "../document-dialogs/context";
const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;
export function ReaderPage({ documentId }: { documentId: string }) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const library = useLibrary();
  const toast = useStatusToast();
  const raw = useSyncExternalStore(subscribeReader, () => readReaderSnapshot(documentId), () => null);
  const snapshot = useMemo(() => parseReaderSnapshot(raw, documentId), [raw, documentId]);
  const document = snapshot?.document ?? library.documents.find(item => item.id === documentId);
  const repository = snapshot?.repository ?? library.repositories.find(item => item.id === document?.repositoryId);
  const folders = useMemo(() => snapshot?.folderPath ?? (document ? readerFolderPath(document, library.documents) : []), [snapshot?.folderPath, document, library.documents]);
  const setDocuments = library.setDocuments;
  useEffect(() => { if (document) window.document.title = `${document.title} | کلاسور`; }, [document?.title, document]);
  const commit = useCallback((next: DocumentPreview) => {
    if (!saveReaderSnapshot(next, repository, folders)) return false;
    setDocuments(current => current.map(item => item.id === next.id ? next : item)); return true;
  }, [repository, setDocuments, folders]);
  const change: DocumentSetter = update => {
    if (document && !commit(typeof update === "function" ? update(document) : update)) toast.show("ذخیره انجام نشد؛ فضای ذخیرهٔ مرورگر را بررسی کنید.", { type: "error" });
  };
  if (!hydrated) return <p data-test-id="reader-hydrating" role="status" className="p-6 text-sm">در حال بازکردن سند…</p>;
  if (!document || document.deleted) return <main data-test-id="reader-unavailable" className="p-6 text-sm"><h1 data-test-id="reader-unavailable-title" className="mb-3">سند در این پیش‌نمایش در دسترس نیست.</h1><Link data-test-id="reader-back-documents" href="/clasor-pages/my-documents" className="text-primary underline">بازگشت به سندها</Link></main>;
  return <div data-test-id="reader-viewport" className="flex h-dvh min-h-0 flex-col"><EditorWorkspace key={document.id} document={document} repository={repository} folders={folders} onChange={change} onCommit={commit} /></div>;
}
