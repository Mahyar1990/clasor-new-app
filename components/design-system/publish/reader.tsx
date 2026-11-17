"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { ReadingSurface } from "@/components/ui/ReadingSurface";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { glass } from "@/lib/design-system/classes";
import { useLibrary } from "../library/store";
import type { DocumentPreview } from "../document-dialogs/model";
import { PublishShell } from "./shell";
import { PublishedSidebar } from "./sidebar";
import { PublishedActions } from "./document-actions";
import { publicDocuments, publicVersion, publicationHref } from "./publication-state";
function PublishedContent({ document, documents, repositoryName }: { document: DocumentPreview; documents: DocumentPreview[]; repositoryName: string }) {
  const [versionId, setVersionId] = useState(publicVersion(document)?.id);
  const version = document.versions.find(item => item.id === versionId && item.approval === "approved" && item.published) ?? publicVersion(document);
  if (!version) return null;
  const index = documents.findIndex(item => item.id === document.id);
  const adjacent = [{ item: documents[index - 1], label: "سند قبلی", icon: ArrowRight }, { item: documents[index + 1], label: "سند بعدی", icon: ArrowLeft }];
  return <div data-test-id="publish-reading-stage" className="relative flex min-h-0 min-w-0 flex-1 flex-col">
    <GlassScrollArea key={document.id} data-test-id="publish-content-scroll" label="محتوای سند منتشرشده" contentClassName={`${glass.boundedScrollContent} pb-24`}>
      <ReadingSurface className="min-h-[calc(100dvh-10rem)]" testId="publish-article" title={document.title} metadata={<><span data-test-id="publish-article-repository">{repositoryName}</span><span data-test-id="publish-article-version">· {version.name}</span></>} footer={<nav data-test-id="publish-adjacent" aria-label="اسناد مجاور" className="flex flex-wrap justify-between gap-3">{adjacent.map(({ item, label, icon: Icon }) => item ? <Link data-test-id={`publish-adjacent-${item.id}`} key={label} href={publicationHref(item.repositoryId!, item.id)} className={`${glass.navigation} flex max-w-full items-center gap-2 px-2 py-2 text-xs`}><Icon aria-hidden="true" className="size-3" /><span data-test-id={`publish-adjacent-label-${item.id}`} className="min-w-0 wrap-anywhere"><span data-test-id={`publish-adjacent-caption-${item.id}`} className="mb-1 block text-[10px] text-muted-foreground">{label}</span>{item.title}</span></Link> : <span data-test-id={`publish-adjacent-empty-${label}`} key={label} />)}</nav>}>
        {version.content.split(/\n\s*\n/).map((paragraph, i) => <p data-test-id={`publish-paragraph-${i}`} key={i} className="whitespace-pre-wrap">{paragraph}</p>)}
      </ReadingSurface>
    </GlassScrollArea>
    <PublishedActions document={document} version={version} onVersionChange={setVersionId} />
  </div>;
}
export function PublishedReader({ repositoryId, documentId }: { repositoryId: string; documentId?: string }) {
  const { repositories, documents } = useLibrary();
  const [mobileOpen, setMobileOpen] = useState(false);
  const repository = repositories.find(item => item.id === repositoryId && item.published && !item.deleted && !item.archived && !item.left);
  const visible = repository ? publicDocuments(documents, repositoryId) : [];
  const leaves = visible.filter(item => item.kind !== "folder");
  const selected = documentId ? leaves.find(item => item.id === documentId) : leaves[0];
  return <PublishShell reading tools={repository && <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger data-test-id="publish-mobile-menu" render={<Button data-test-id="publish-mobile-menu" size="icon-sm" variant="outline" className="md:hidden" aria-label="فهرست اسناد" />}><Menu aria-hidden="true" /></SheetTrigger><SheetContent data-test-id="publish-mobile-sheet" side="right" dir="rtl" className="w-[min(20rem,90vw)]! gap-2 p-3 pt-12"><SheetTitle>فهرست اسناد</SheetTitle><SheetDescription className="sr-only">انتخاب سند از درخت مستندات مخزن</SheetDescription><PublishedSidebar testId="publish-mobile-sidebar" repository={repository} documents={visible} selectedId={selected?.id} onNavigate={() => setMobileOpen(false)} /></SheetContent></Sheet>}>
    <div data-test-id="publish-reader-layout" className="flex min-h-0 min-w-0 flex-1 gap-3">
      {repository && <div data-test-id="publish-desktop-sidebar" className="hidden w-60 shrink-0 md:block lg:w-64"><PublishedSidebar testId="publish-sidebar" repository={repository} documents={visible} selectedId={selected?.id} /></div>}
      <main data-test-id="publish-reader-main" id="publish-main" tabIndex={-1} className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
        <div data-test-id="publish-path" className="min-w-0 px-2 py-1"><ClasorBreadcrumb items={[{ id: "docs", label: "داکس", href: "/clasor-pages/publish" }, ...(repository ? [{ id: repository.id, label: repository.name, href: publicationHref(repository.id) }] : []), ...(selected ? [{ id: selected.id, label: selected.title, emphasis: true }] : [])]} /></div>
        {repository && selected ? <PublishedContent key={selected.id} document={selected} documents={leaves} repositoryName={repository.name} /> : <section data-test-id="publish-unavailable" className={`${glass.panel} flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center`}><h1 data-test-id="publish-unavailable-title" className="text-base font-semibold">{!repository ? "مخزن در دسترس نیست" : documentId ? "این سند منتشر نشده یا در دسترس نیست" : "هنوز سند عمومی منتشر نشده است"}</h1><Link data-test-id="publish-unavailable-home" href="/clasor-pages/publish" className={`${glass.navigation} px-3 py-2 text-xs text-primary`}>مشاهدهٔ مخزن‌های منتشرشده</Link></section>}
      </main>
    </div>
  </PublishShell>;
}
