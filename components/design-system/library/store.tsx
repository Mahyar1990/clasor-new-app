"use client";
import { createContext, useContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { dashboardRepositories } from "../clasor-dashboard-data";
import { type DocumentPreview } from "../document-dialogs/model";
import { initialRepository, type RepositoryPreview, type PreviewRole } from "../repository-dialogs/context";
import { resolveRepositoryDocuments } from "./repository-state";
import { readerPrefix, parseReaderSnapshot } from "../reader/transfer";
import { libraryDocuments } from "./fixtures";
export interface LibraryRepository extends RepositoryPreview { shared: boolean; updatedAt: string }
interface Store { setRepositoryTags: (id: string, tags: string[]) => void; documents: DocumentPreview[]; setDocuments: Dispatch<SetStateAction<DocumentPreview[]>>; repositories: LibraryRepository[]; setRepositories: Dispatch<SetStateAction<LibraryRepository[]>> }
const Context = createContext<Store | null>(null);
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentPreview[]>(libraryDocuments);
  const [repositories, setRepositories] = useState<LibraryRepository[]>(() => dashboardRepositories.map((item, i) => ({ ...initialRepository(), ...item, image: i % 4 === 0 ? "/repositories/sample-cover.svg" : "purple", role: (item.shared ? item.role === "مالک" ? "مدیر" : item.role : "مالک") as PreviewRole, bookmarked: i % 5 === 0, archived: i >= 20 && !item.shared })));
  useEffect(() => {
    function receive(event: StorageEvent) { if (!event.key?.startsWith(readerPrefix)) return; const item = parseReaderSnapshot(event.newValue); if (item) setDocuments(current => current.map(document => document.id === item.document.id ? item.document : document)); }
    window.addEventListener("storage", receive); return () => window.removeEventListener("storage", receive);
  }, []);
  function setRepositoryTags(id: string, tags: string[]) {
    setRepositories(current => current.map(repo => repo.id === id ? { ...repo, tags } : repo));
    setDocuments(current => current.map(doc => doc.repositoryId === id ? { ...doc, tags: doc.tags.filter(tag => tags.includes(tag)) } : doc));
  }
  return <Context.Provider value={{ documents: resolveRepositoryDocuments(documents, repositories), setDocuments, repositories, setRepositories, setRepositoryTags }}>{children}</Context.Provider>;
}
export function useOptionalLibrary() { return useContext(Context); }
export function useLibrary() { const value = useOptionalLibrary(); if (!value) throw new Error("LibraryProvider is required"); return value; }
