"use client";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { readerFolderPath } from "../reader/reader-path";
import { useState, type ReactNode } from "react";
import { normalized } from "../library/query";
import { useRouter } from "next/navigation";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { CompactSearch } from "@/components/ui/CompactSearch";
import { OutlineNavigation } from "@/components/ui/OutlineNavigation";
import { RepositoryImage } from "@/components/ui/RepositoryImage";
import { glass } from "@/lib/design-system/classes";
import type { LibraryRepository } from "../library/store";
import type { DocumentPreview } from "../document-dialogs/model";
import { publicationOutline, publicationHref } from "./publication-state";
export function PublishedSidebar({ repository, documents, selectedId, onNavigate, testId, headerAction }: { repository: LibraryRepository; documents: DocumentPreview[]; selectedId?: string; onNavigate?: () => void; testId: string; headerAction?: ReactNode }) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(() => new Set(documents.filter(item => item.kind === "folder").map(item => item.id)));
  const selected = documents.find(item => item.id === selectedId);
  const path = selected?.parentId ? readerFolderPath(selected, documents) : [];
  const [lastSelected, setLastSelected] = useState(selectedId);
  if (lastSelected !== selectedId) {
    setLastSelected(selectedId);
    setExpanded(current => new Set([...current, ...path.map(item => item.id)]));
  }
  const filtered = query ? documents.filter(item => item.kind !== "folder" && normalized(item.title).includes(normalized(query))) : documents;
  return <aside data-test-id={testId} className={`${glass.panel} flex h-full min-h-0 flex-col gap-3 p-3`} aria-label="مستندات مخزن">
    <div data-test-id={`${testId}-identity`} className="flex items-start gap-2">
      <RepositoryImage testId={`${testId}-image`} name={repository.name} image={repository.image} className="size-10 shrink-0" />
      <div data-test-id={`${testId}-copy`} className="min-w-0 flex-1 self-center">
        <h2 data-test-id={`${testId}-title`} className="text-xs leading-5 font-semibold wrap-anywhere">{repository.name}</h2>
        <p data-test-id={`${testId}-caption`} className="text-[10px] text-muted-foreground">مستندات منتشرشده</p>
      </div>
      {headerAction}
    </div>
    {path.length > 0 && <div data-test-id={`${testId}-current-path`} className="[&_ol]:gap-1 [&_li]:text-[9px] [&_svg]:size-2.5"><ClasorBreadcrumb items={path.map(item => ({ id: item.id, label: item.label }))} /></div>}
    <CompactSearch testId={`${testId}-search`} label="جستجو در اسناد" value={draft} onValueChange={setDraft} onApply={() => setQuery(draft)} />
    <GlassScrollArea data-test-id={`${testId}-scroll`} label="درخت مستندات" contentClassName={glass.boundedScrollContent}>
      <OutlineNavigation revealSelected density="compact" key={query} testId={`${testId}-outline`} label="فهرست اسناد" items={publicationOutline(filtered, repository.id)} selectedId={selectedId} expanded={expanded} onExpandedChange={id => setExpanded(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; })} onSelect={id => { router.push(publicationHref(repository.id, id)); onNavigate?.(); }} />
    </GlassScrollArea>
  </aside>;
}
