"use client";

import { createContext, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { DocumentPreview } from "./model";
export type DocumentSetter = Dispatch<SetStateAction<DocumentPreview>>;
const Context = createContext<{ document: DocumentPreview; setDocument: DocumentSetter } | null>(null);
export function DocumentPreviewProvider({ document, setDocument, children }: { document: DocumentPreview; setDocument: DocumentSetter; children: ReactNode }) {
  return <Context.Provider value={{ document, setDocument }}>{children}</Context.Provider>;
}
export function useDocumentPreview() {
  const value = useContext(Context);
  if (!value) throw new Error("Document dialog requires its preview provider");
  return value;
}
