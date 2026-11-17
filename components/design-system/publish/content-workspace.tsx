"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { ReadingSurface } from "@/components/ui/ReadingSurface";
import { ContentsNavigation } from "@/components/ui/ContentsNavigation";
import { DockedPanel } from "@/components/ui/DockedPanel";
import { glass } from "@/lib/design-system/classes";
import type { DocumentPreview } from "../document-dialogs/model";
import { publicVersion, publicationHref } from "./publication-state";
import { publicationBlocks } from "./article-state";
import { PublishedBody } from "./content-body";
import { PublishedActions } from "./document-actions";
import { usePublishedContents } from "./use-contents";
export function PublishedContent({ document, documents, repositoryName }: { document: DocumentPreview; documents: DocumentPreview[]; repositoryName: string }) {
  const [versionId, setVersionId] = useState(publicVersion(document)?.id);
  const [contentsOpen, setContentsOpen] = useState(false);
  const contentsTrigger = useRef<HTMLButtonElement | null>(null);
  const actionsHost = useRef<HTMLDivElement>(null);
  const version = document.versions.find(item => item.id === versionId && item.approval === "approved" && item.published) ?? publicVersion(document);
  const blocks = publicationBlocks(version?.content ?? "");
  const headings = [{ id: "publish-content-title", label: document.title, level: 1 }, ...blocks.filter(item => item.type === "heading").map(item => ({ id: item.id, label: item.text, level: item.level }))];
  const contentViewport = useRef<HTMLDivElement>(null);
  const { active, select, onScroll } = usePublishedContents(headings, contentViewport, version?.content ?? "");
  if (!version) return null;
  const index = documents.findIndex(item => item.id === document.id);
  const adjacent = [{ item: documents[index - 1], label: "سند قبلی", icon: ArrowRight }, { item: documents[index + 1], label: "سند بعدی", icon: ArrowLeft }];
  function closeContents() {
    setContentsOpen(false);
    const origin = contentsTrigger.current;
    if (origin?.getClientRects().length) origin.focus({ preventScroll: true });
    else actionsHost.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-action-bar-toggle"]')?.focus({ preventScroll: true });
  }
  return <div data-test-id="publish-reading-stage" className="relative flex min-h-0 min-w-0 flex-1 flex-col">
    <div data-test-id="publish-reading-layout" className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 md:flex-row">
      <DockedPanel testId="publish-contents-drawer" title="فهرست سند" closeLabel="بستن فهرست سند" open={contentsOpen} onClose={closeContents} className="max-md:h-40 max-md:w-full max-md:max-w-none md:w-44 md:max-w-[30%]">
        <ContentsNavigation testId="publish-contents" items={headings} selectedId={active} onSelect={select} />
      </DockedPanel>
      <GlassScrollArea onScroll={onScroll} ref={contentViewport} key={document.id} data-test-id="publish-content-scroll" label="محتوای سند منتشرشده" contentClassName={`${glass.boundedScrollContent} pb-32`}>
        <ReadingSurface width="full" titleId="publish-content-title" className="min-h-[calc(100dvh-10rem)]" testId="publish-article" title={document.title} metadata={<><span data-test-id="publish-article-repository">{repositoryName}</span><span data-test-id="publish-article-version">· {version.name}</span></>} footer={<nav data-test-id="publish-adjacent" aria-label="اسناد مجاور" className="flex flex-wrap justify-between gap-3">{adjacent.map(({ item, label, icon: Icon }) => item ? <Link data-test-id={`publish-adjacent-${item.id}`} key={label} href={publicationHref(item.repositoryId!, item.id)} className={`${glass.navigation} flex max-w-full items-center gap-2 px-2 py-2 text-xs`}><Icon aria-hidden="true" className="size-3" /><span data-test-id={`publish-adjacent-label-${item.id}`} className="min-w-0 wrap-anywhere"><span data-test-id={`publish-adjacent-caption-${item.id}`} className="mb-1 block text-[10px] text-muted-foreground">{label}</span>{item.title}</span></Link> : <span data-test-id={`publish-adjacent-empty-${label}`} key={label} />)}</nav>}>
          <PublishedBody blocks={blocks} />
        </ReadingSurface>
      </GlassScrollArea>
    </div>
    <div data-test-id="publish-actions-host" ref={actionsHost}><PublishedActions document={document} version={version} onVersionChange={setVersionId} contentsOpen={contentsOpen} onContentsToggle={trigger => { contentsTrigger.current = trigger; setContentsOpen(current => !current); }} /></div>
  </div>;
}
