"use client";

import { workspaceStyles } from "@/components/workspace/workspace-styles";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { ChevronLeft, Folder } from "lucide-react";
import PersonalDocuments from "@/components/workspace/personal-documents";
import LoadMore from "@/components/workspace/load-more";
import { useListSession } from "@/components/workspace/list-session";
import { folders } from "@/lib/workspace/fixtures";
import { folderPath, repositoryHref } from "@/lib/workspace/navigation";
import { getLoadedItems, LIST_BATCH_SIZE } from "@/lib/workspace/documents";
import type { IFolder, IRepository } from "@/interface/repository";

function FolderList({ items, repositoryId, onSelect }: { items: IFolder[]; repositoryId: string; onSelect: () => void }) {
  const [visibleCount, setVisibleCount] = useState(LIST_BATCH_SIZE);
  const listRef = useRef<HTMLElement>(null);
  const result = getLoadedItems(items, visibleCount);
  return <><section data-test-id="repository-browser-section-1" ref={listRef} className={cn("ws-folders", workspaceStyles.folders)} aria-label="پوشه‌های این مسیر">{result.rows.map(folder => <Link data-test-id={`repository-browser-link-2-${String(folder.id)}`} data-load-more-item key={folder.id} href={repositoryHref(repositoryId, folder.id)} onClick={onSelect}><Folder size={27} aria-hidden="true" /><strong data-test-id={`repository-browser-strong-3-${String(folder.id)}`}>{folder.name}</strong><ChevronLeft size={17} aria-hidden="true" /></Link>)}</section><LoadMore noun="پوشه" listRef={listRef} result={result} onLoadMore={() => setVisibleCount(result.nextCount)} /></>;
}

export default function RepositoryBrowser({ repository }: { repository: IRepository }) {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folder");
  const path = folderPath(folders, repository.id, folderId);
  const { setSelectedIds } = useListSession(repositoryHref(repository.id, folderId));
  const clearSelection = () => setSelectedIds([]);
  if (!path) return <section data-test-id="repository-browser-section-4" className={cn("ws-empty", glass.contentSurface)}><Folder size={32} aria-hidden="true" /><h1 data-test-id="repository-browser-h1-5">پوشه پیدا نشد</h1><p data-test-id="repository-browser-p-6">این پوشه در مخزن انتخاب‌شده وجود ندارد.</p><Link data-test-id="repository-browser-link-7" className="ws-textLink" href={repositoryHref(repository.id)}>بازگشت به ریشه مخزن</Link></section>;
  const childFolders = folders.filter(folder => folder.repositoryId === repository.id && folder.parentId === folderId);
  const breadcrumb = <nav data-test-id="repository-browser-nav-8" className="ws-breadcrumb" aria-label="مسیر مخزن"><Link data-test-id="repository-browser-link-9" href="/workspace/repositories" onClick={clearSelection}>مخزن‌ها</Link><ChevronLeft size={14} aria-hidden="true" /><Link data-test-id="repository-browser-link-10" href={repositoryHref(repository.id)} onClick={clearSelection} aria-current={!folderId ? "page" : undefined}>{repository.name}</Link>{path.map((folder, index) => <span data-test-id={`repository-browser-span-11-${String(folder.id)}`} key={folder.id}><ChevronLeft size={14} aria-hidden="true" />{index === path.length - 1 ? <span data-test-id={`repository-browser-span-12-${String(folder.id)}`} aria-current="page">{folder.name}</span> : <Link data-test-id={`repository-browser-link-13-${String(folder.id)}`} href={repositoryHref(repository.id, folder.id)} onClick={clearSelection}>{folder.name}</Link>}</span>)}</nav>;
  const folderCards = childFolders.length ? <FolderList key={repositoryHref(repository.id, folderId)} items={childFolders} repositoryId={repository.id} onSelect={clearSelection} /> : null;
  return <>{repository.archived && <p data-test-id="repository-browser-p-14" className="ws-archiveNote">این مخزن بایگانی‌شده است؛ محتوای نمونه برای مطالعه نمایش داده می‌شود.</p>}<PersonalDocuments scope="repository" repositoryId={repository.id} folderId={folderId} title={path.at(-1)?.name ?? repository.name} breadcrumb={breadcrumb} foldersContent={folderCards} /></>;
}
