"use client";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/text-field";
import { RepositoryList } from "../clasor-dashboard-repositories";
import { RepositoryPreviewProvider } from "../repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "../repository-dialogs/dialog";
import { updateRepositoryRecords } from "./repository-state";
import { useLibrary } from "./store";
import { LibraryShell } from "./shell";
import { CreationDialog } from "./create";
import { queryRepositories } from "./query";
export type RepositoryScope = "my-repositories" | "shared-repositories" | "bookmarked-repositories" | "archived-repositories" | "published-repositories";
export const repositoryTitles = { "my-repositories": "مخزن‌های من", "shared-repositories": "مخزن‌های اشتراکی", "bookmarked-repositories": "مخزن‌های نشان‌شده", "archived-repositories": "مخزن‌های بایگانی‌شده", "published-repositories": "مخزن‌های منتشرشده" };
export function RepositoriesPage({ scope }: { scope: RepositoryScope }) {
  const { repositories, setRepositories } = useLibrary();
  const [query, setQuery] = useState("");
  const [create, setCreate] = useState<HTMLElement | null>(null);
  const [selection, setSelection] = useState<(DialogSelection & { recordId: string }) | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLDivElement>(null);
  const visible = queryRepositories(repositories, scope, query);
  const selected = repositories.find(item => item.id === selection?.recordId);
  return <LibraryShell page={scope} title={repositoryTitles[scope]}>
    <div data-test-id="library-repository-toolbar" ref={heading} tabIndex={-1} className="mb-3 flex flex-wrap items-end gap-2">
      <div data-test-id="library-repository-search-wrap" className="min-w-40 flex-1"><SearchField data-test-id="library-repository-search" label="جستجوی مخزن" value={query} onValueChange={setQuery} /></div>
      <Button data-test-id="library-repository-create" size="sm" onClick={event => setCreate(event.currentTarget)}><Plus aria-hidden="true" />ایجاد مخزن</Button>
      <span data-test-id="library-repository-count" role="status" className="pb-2 text-xs text-muted-foreground">{visible.length} مخزن</span>
    </div>
    <p data-test-id="library-repository-status" role="status" className="sr-only">{message}</p>
    <div data-test-id="library-repository-results" className="flex h-[calc(100dvh-17rem)] min-h-80 flex-col">
      <RepositoryList key={query} repositories={visible.map(item => ({ ...item, preview: item }))} onAction={setSelection} />
    </div>
    {create && <CreationDialog kind="repository" close={() => setCreate(null)} trigger={create} />}
    {selection && selected && <RepositoryPreviewProvider value={selected} onChange={update => setRepositories(current => updateRepositoryRecords(current, selected.id, update))}>
      <RepositoryActionDialog key={`${selection.recordId}-${selection.id}`} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />
    </RepositoryPreviewProvider>}
  </LibraryShell>;
}
