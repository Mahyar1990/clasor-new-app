"use client";

import { createContext, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { DocumentPreview } from "./model";
import type { RepositoryPreview } from "../repository-dialogs/context";
export type DocumentSetter = Dispatch<SetStateAction<DocumentPreview>>;
const Context = createContext<{ document: DocumentPreview; setDocument: DocumentSetter; repository?: RepositoryPreview } | null>(null);
export function DocumentPreviewProvider({ document, setDocument, children, repository }: { document: DocumentPreview; setDocument: DocumentSetter; repository?: RepositoryPreview; children: ReactNode }) {
  return <Context.Provider value={{ document, setDocument, repository }}>{children}</Context.Provider>;
}
export function useDocumentPreview() {
  const value = useContext(Context);
  if (!value) throw new Error("Document dialog requires its preview provider");
  return value;
}
