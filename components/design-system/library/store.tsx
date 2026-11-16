"use client";
import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { dashboardDocuments, dashboardRepositories } from "../clasor-dashboard-data";
import { initialDocument, type DocumentPreview } from "../document-dialogs/model";
import { initialRepository, type RepositoryPreview, type PreviewRole } from "../repository-dialogs/context";
export interface LibraryRepository extends RepositoryPreview { shared: boolean; updatedAt: string }
interface Store { documents: DocumentPreview[]; setDocuments: Dispatch<SetStateAction<DocumentPreview[]>>; repositories: LibraryRepository[]; setRepositories: Dispatch<SetStateAction<LibraryRepository[]>> }
const Context = createContext<Store | null>(null);
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentPreview[]>(() => [
    ...Array.from({ length: 36 }, (_, i) => ({ ...initialDocument({ ...dashboardDocuments[i % 12], id: i < 12 ? dashboardDocuments[i].id : `library-document-${i}`, title: dashboardDocuments[i % 12].title + (i >= 12 ? ` ${i + 1}` : "") }), kind: "document" as const, contentType: ["classic", "excel", "file"][i % 3], createdAt: `2026-10-${String(1 + i % 28).padStart(2, "0")}`, updatedAt: `2026-11-${String(1 + i % 14).padStart(2, "0")}`, order: i % 7 + 1 })),
    { ...initialDocument({ id: "library-template", title: "الگوی صورت‌جلسه", shared: false, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: "عنوان جلسه:\nحاضران:\nتصمیم‌ها:" }), kind: "template", contentType: "classic", createdAt: "2026-10-01", updatedAt: "2026-11-01" },
    ...["راهنما", "محصول", "آموزش"].map((title, i) => ({ ...initialDocument({ id: `library-folder-${i}`, title, shared: false, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: "" }), kind: "folder" as const, createdAt: "2026-10-01", updatedAt: "2026-11-01" })),
  ]);
  const [repositories, setRepositories] = useState<LibraryRepository[]>(() => dashboardRepositories.map((item, i) => ({ ...initialRepository(), ...item, role: (item.shared ? item.role === "مالک" ? "مدیر" : item.role : "مالک") as PreviewRole, bookmarked: i % 5 === 0, archived: i >= 20 && !item.shared })));
  return <Context.Provider value={{ documents, setDocuments, repositories, setRepositories }}>{children}</Context.Provider>;
}
export function useOptionalLibrary() { return useContext(Context); }
export function useLibrary() { const value = useOptionalLibrary(); if (!value) throw new Error("LibraryProvider is required"); return value; }
