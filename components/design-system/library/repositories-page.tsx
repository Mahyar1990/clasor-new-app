"use client";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompactSearch } from "@/components/ui/CompactSearch";
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
  const [draftQuery, setDraftQuery] = useState("");
  const [create, setCreate] = useState<HTMLElement | null>(null);
  const [selection, setSelection] = useState<(DialogSelection & { recordId: string }) | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLDivElement>(null);
  const visible = queryRepositories(repositories, scope, query);
  const selected = repositories.find(item => item.id === selection?.recordId);
  return <LibraryShell page={scope} title={repositoryTitles[scope]}>
    <div data-test-id="library-repository-toolbar" ref={heading} tabIndex={-1} className="mb-3 shrink-0 space-y-3">
      <CompactSearch testId="library-repository-search" label="جستجوی مخزن" value={draftQuery} onValueChange={setDraftQuery} onApply={() => setQuery(draftQuery)} />
      <div data-test-id="library-repository-create-row" className="flex items-center gap-3">
      <Button data-test-id="library-repository-create" size="sm" onClick={event => setCreate(event.currentTarget)}><Plus aria-hidden="true" />ایجاد مخزن</Button>
      <span data-test-id="library-repository-count" role="status" className="pb-2 text-xs text-muted-foreground">{visible.length} مخزن</span></div>
    </div>
    <p data-test-id="library-repository-status" role="status" className="sr-only">{message}</p>
    <div data-test-id="library-repository-results" className="flex h-[calc(100dvh-17rem)] min-h-80 flex-col xl:h-auto xl:min-h-0 xl:flex-1">
      <RepositoryList key={query} repositories={visible.map(item => ({ ...item, preview: item }))} onAction={setSelection} />
    </div>
    {create && <CreationDialog kind="repository" close={() => setCreate(null)} trigger={create} />}
    {selection && selected && <RepositoryPreviewProvider value={selected} onChange={update => setRepositories(current => updateRepositoryRecords(current, selected.id, update))}>
      <RepositoryActionDialog key={`${selection.recordId}-${selection.id}`} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />
    </RepositoryPreviewProvider>}
  </LibraryShell>;
}
