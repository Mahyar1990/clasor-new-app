"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { sampleDocuments, sampleUser, samplePeople, repositories, folders } from "@/lib/workspace/fixtures";
import { applyDocumentMutation, documentText, getDocumentVersions } from "@/lib/workspace/mutations";
import { useClearListSelections } from "@/components/workspace/list-session";
import type { DocumentMutation, IDocument, IDocumentWorkspace } from "@/interface/document";

type DocumentStore = IDocumentWorkspace & {
  mutate: (action: DocumentMutation) => void;
  create: (input: Pick<IDocument, "title" | "kind" | "repositoryId" | "folderId">) => string;
  setDraft: (id: string, text: string | null) => void;
};
const Context = createContext<DocumentStore | null>(null);

export function DocumentStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IDocumentWorkspace>(() => ({ documents: sampleDocuments.map(document => ({ ...document, versions: getDocumentVersions(document) })), deleted: [], drafts: {} }));
  const stateRef = useRef(state);
  const clearSelections = useClearListSelections();
  function commit(next: IDocumentWorkspace) { stateRef.current = next; setState(next); }
  function mutate(action: DocumentMutation) {
    commit(applyDocumentMutation(stateRef.current, action, { repositories, folders, userId: sampleUser.id, people: samplePeople }));
    if (action.type === "delete" || action.type === "move") clearSelections();
  }
  function create(input: Pick<IDocument, "title" | "kind" | "repositoryId" | "folderId">) {
    const id = `local-${crypto.randomUUID()}`;
    const at = new Date().toISOString();
    mutate({ type: "create", document: { ...input, id, approval: "draft", creator: sampleUser, createdAt: at, updatedAt: at, description: "سند ایجادشده در نشست نمونه؛ پس از بارگذاری دوباره بازنشانی می‌شود.", ...(input.kind === "text" ? { content: "" } : {}) } });
    return id;
  }
  function setDraft(id: string, text: string | null) {
    const drafts = { ...stateRef.current.drafts };
    if (text === null) delete drafts[id]; else drafts[id] = text;
    commit({ ...stateRef.current, drafts });
  }
  const dirty = state.documents.some(document => state.drafts[document.id] !== undefined && state.drafts[document.id] !== documentText(document));
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  return <Context.Provider value={{ ...state, mutate, create, setDraft }}>{children}</Context.Provider>;
}

export function useDocumentStore() {
  const context = useContext(Context);
  if (!context) throw new Error("DocumentStoreProvider is required");
  return context;
}

export function UndoDeleteNotice() {
  const { deleted, mutate } = useDocumentStore();
  const latest = deleted.at(-1);
  if (!latest) return null;
  return <div data-test-id="document-store-div-1" className="ws-undoNotice" role="status"><p data-test-id="document-store-p-2">«{latest.title}» از فهرست حذف شد.</p><Button data-test-id="document-store-button-3" variant="outline" size="sm" onClick={() => mutate({ type: "restore", id: latest.id })}>برگرداندن سند</Button></div>;
}
