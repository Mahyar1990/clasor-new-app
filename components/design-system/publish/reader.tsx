"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePane } from "@/components/ui/ResizablePane";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { glass } from "@/lib/design-system/classes";
import { useLibrary } from "../library/store";
import { PublishShell } from "./shell";
import { PublishedSidebar } from "./sidebar";
import { PublishedContent } from "./content-workspace";
import { readerFolderPath } from "../reader/reader-path";
import { publicDocuments, publicationHref } from "./publication-state";
export function PublishedReader({ repositoryId, documentId, embedded = false }: { repositoryId: string; documentId?: string; embedded?: boolean }) {
  const { repositories, documents } = useLibrary();
  const [mobileOpen, setMobileOpen] = useState(false);
  const repository = repositories.find(item => item.id === repositoryId && item.published && !item.deleted && !item.archived && !item.left);
  const visible = repository ? publicDocuments(documents, repositoryId) : [];
  const leaves = visible.filter(item => item.kind !== "folder");
  const selected = documentId ? leaves.find(item => item.id === documentId) : leaves[0];
  const Main = embedded ? "section" : "main";
  const UnavailableTitle = embedded ? "h4" : "h1";
  return <PublishShell reading embedded={embedded} tools={repository && <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger data-test-id="publish-mobile-menu" render={<Button data-test-id="publish-mobile-menu" size="icon-sm" variant="outline" className="md:hidden" aria-label="فهرست اسناد" />}><Menu aria-hidden="true" /></SheetTrigger><SheetContent data-test-id="publish-mobile-sheet" side="right" dir="rtl" className="w-[min(20rem,90vw)]! gap-2 p-3 pt-12"><SheetTitle>فهرست اسناد</SheetTitle><SheetDescription className="sr-only">انتخاب سند از درخت مستندات مخزن</SheetDescription><PublishedSidebar testId="publish-mobile-sidebar" repository={repository} documents={visible} selectedId={selected?.id} onNavigate={() => setMobileOpen(false)} /></SheetContent></Sheet>}>
    <div data-test-id="publish-reader-layout" className="flex min-h-0 min-w-0 flex-1 gap-3">
      {repository && <ResizablePane testId="publish-desktop-sidebar" label="عرض فهرست اسناد مخزن" className="hidden md:flex"><PublishedSidebar testId="publish-sidebar" repository={repository} documents={visible} selectedId={selected?.id} /></ResizablePane>}
      <Main data-test-id="publish-reader-main" id={embedded ? undefined : "publish-main"} tabIndex={-1} className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
        <div data-test-id="publish-path" className="min-w-0 px-2 py-1"><ClasorBreadcrumb items={[{ id: "docs", label: "داکس", href: "/clasor-pages/publish" }, ...(repository ? [{ id: repository.id, label: repository.name, href: publicationHref(repository.id) }] : []), ...(selected?.parentId ? readerFolderPath(selected, visible).map(item => ({ id: item.id, label: item.label })) : []), ...(selected ? [{ id: selected.id, label: selected.title, emphasis: true }] : [])]} /></div>
        {repository && selected ? <PublishedContent embedded={embedded} key={selected.id} document={selected} documents={leaves} repositoryName={repository.name} /> : <section data-test-id="publish-unavailable" className={`${glass.panel} flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center`}><UnavailableTitle data-test-id="publish-unavailable-title" className="text-base font-semibold">{!repository ? "مخزن در دسترس نیست" : documentId ? "این سند منتشر نشده یا در دسترس نیست" : "هنوز سند عمومی منتشر نشده است"}</UnavailableTitle><Link data-test-id="publish-unavailable-home" href="/clasor-pages/publish" className={`${glass.navigation} px-3 py-2 text-xs text-primary`}>مشاهدهٔ مخزن‌های منتشرشده</Link></section>}
      </Main>
    </div>
  </PublishShell>;
}
