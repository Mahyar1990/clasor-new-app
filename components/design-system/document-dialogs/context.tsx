"use client";

import { createContext, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { DocumentPreview } from "./model";
import type { RepositoryPreview } from "../repository-dialogs/context";
import type { ReaderFolder } from "../reader/reader-path";
export type DocumentSetter = Dispatch<SetStateAction<DocumentPreview>>;
const Context = createContext<{ document: DocumentPreview; setDocument: DocumentSetter; repository?: RepositoryPreview; folders?: ReaderFolder[]; onCommit?: (next: DocumentPreview) => boolean } | null>(null);
export function DocumentPreviewProvider({ document, setDocument, children, repository, folders, onCommit }: { document: DocumentPreview; setDocument: DocumentSetter; repository?: RepositoryPreview; children: ReactNode; folders?: ReaderFolder[]; onCommit?: (next: DocumentPreview) => boolean }) {
  return <Context.Provider value={{ document, setDocument, repository, folders, onCommit }}>{children}</Context.Provider>;
}
export function useDocumentPreview() {
  const value = useContext(Context);
  if (!value) throw new Error("Document dialog requires its preview provider");
  return value;
}
