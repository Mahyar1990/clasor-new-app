"use client";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { Menu, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePane } from "@/components/ui/ResizablePane";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const openSidebarControl = useRef<HTMLButtonElement>(null);
  const closeSidebarControl = useRef<HTMLButtonElement>(null);
  const focusSidebarControl = useRef(false);
  useLayoutEffect(() => {
    if (!focusSidebarControl.current) return;
    focusSidebarControl.current = false;
    (sidebarOpen ? closeSidebarControl : openSidebarControl).current?.focus({ preventScroll: true });
  }, [sidebarOpen]);
  function changeSidebar(open: boolean) {
    focusSidebarControl.current = true;
    setSidebarOpen(open);
  }
  const repository = repositories.find(item => item.id === repositoryId && item.published && !item.deleted && !item.archived && !item.left);
  const visible = repository ? publicDocuments(documents, repositoryId) : [];
  const leaves = visible.filter(item => item.kind !== "folder");
  const selected = documentId ? leaves.find(item => item.id === documentId) : leaves[0];
  const Main = embedded ? "section" : "main";
  const UnavailableTitle = embedded ? "h4" : "h1";
  return <PublishShell reading embedded={embedded}>
    <div data-test-id="publish-reader-layout" className={`grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-3 ${repository ? "grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)] md:grid-rows-1" : "grid-rows-1"}`}>
      {repository && <>
        <div data-test-id="publish-sidebar-controls" className={`relative z-10 col-start-1 row-start-1 flex items-start md:justify-self-start ${sidebarOpen ? "md:hidden" : ""}`}>
          {!sidebarOpen && <Button ref={openSidebarControl} data-test-id="publish-desktop-sidebar-open" size="icon-sm" variant="outline" className="hidden md:inline-flex" aria-label="بازکردن درخت اسناد" aria-controls="publish-desktop-sidebar" aria-expanded={false} onClick={() => changeSidebar(true)}>
            <PanelRightOpen data-test-id="publish-sidebar-open-icon" aria-hidden="true" />
          </Button>}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger data-test-id="publish-mobile-menu" render={<Button data-test-id="publish-mobile-menu" size="icon-sm" variant="outline" className="md:hidden" aria-label="فهرست اسناد" />}><Menu aria-hidden="true" /></SheetTrigger>
            <SheetContent data-test-id="publish-mobile-sheet" side="right" dir="rtl" showCloseButton={false} className="w-[min(20rem,90vw)]! gap-2 p-3">
              <SheetTitle>فهرست اسناد</SheetTitle>
              <SheetDescription className="sr-only">انتخاب سند از درخت مستندات مخزن</SheetDescription>
              <PublishedSidebar testId="publish-mobile-sidebar" repository={repository} documents={visible} selectedId={selected?.id} onNavigate={() => setMobileOpen(false)}
                headerAction={<SheetClose data-test-id="sheet-sheetprimitive-close-6" render={<Button data-test-id="sheet-sheetprimitive-close-6" variant="ghost" size="icon-sm" aria-label="بستن درخت اسناد" />}><PanelRightClose data-test-id="publish-mobile-sidebar-close-icon" aria-hidden="true" /></SheetClose>} />
            </SheetContent>
          </Sheet>
        </div>
        <ResizablePane testId="publish-desktop-sidebar" id="publish-desktop-sidebar" open={sidebarOpen} label="عرض فهرست اسناد مخزن" className="col-start-1 row-start-1 hidden motion-safe:max-md:transition-none md:flex">
          <PublishedSidebar testId="publish-sidebar" repository={repository} documents={visible} selectedId={selected?.id}
            headerAction={<Button ref={closeSidebarControl} data-test-id="publish-desktop-sidebar-toggle" size="icon-sm" variant="ghost" aria-label="بستن درخت اسناد" aria-controls="publish-desktop-sidebar" aria-expanded={sidebarOpen} onClick={() => changeSidebar(false)}>
              <PanelRightClose data-test-id="publish-sidebar-toggle-icon" aria-hidden="true" />
            </Button>} />
        </ResizablePane>
      </>}
      <Main data-test-id="publish-reader-main" id={embedded ? undefined : "publish-main"} tabIndex={-1} className={`flex min-h-0 min-w-0 flex-col gap-3 ${repository ? "row-start-2 md:col-start-2 md:row-start-1" : ""}`}>
        <div data-test-id="publish-path" className="min-w-0 px-2 py-1"><ClasorBreadcrumb items={[{ id: "docs", label: "داکس", href: "/clasor-pages/publish" }, ...(repository ? [{ id: repository.id, label: repository.name, href: publicationHref(repository.id) }] : []), ...(selected?.parentId ? readerFolderPath(selected, visible).map(item => ({ id: item.id, label: item.label })) : []), ...(selected ? [{ id: selected.id, label: selected.title, emphasis: true }] : [])]} /></div>
        {repository && selected ? <PublishedContent embedded={embedded} key={selected.id} document={selected} documents={leaves} repositoryName={repository.name} /> : <section data-test-id="publish-unavailable" className={`${glass.panel} flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center`}><UnavailableTitle data-test-id="publish-unavailable-title" className="text-base font-semibold">{!repository ? "مخزن در دسترس نیست" : documentId ? "این سند منتشر نشده یا در دسترس نیست" : "هنوز سند عمومی منتشر نشده است"}</UnavailableTitle><Link data-test-id="publish-unavailable-home" href="/clasor-pages/publish" className={`${glass.navigation} px-3 py-2 text-xs text-primary`}>مشاهدهٔ مخزن‌های منتشرشده</Link></section>}
      </Main>
    </div>
  </PublishShell>;
}
