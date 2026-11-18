"use client";
import { useRef, useState, type RefObject } from "react";
import { glass } from "@/lib/design-system/classes";
import { RoleBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { OptionsButton } from "@/components/ui/OptionsButton";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { RepositoryImage } from "@/components/ui/RepositoryImage";
import { repositoryActionItems } from "../repository-dialogs/options";
import { RepositoryPreviewProvider } from "../repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "../repository-dialogs/dialog";
import { useLibrary, type LibraryRepository } from "./store";
import { updateRepositoryRecords } from "./repository-state";
const displayRoles = { "مالک": "owner", "مدیر": "admin", "ویرایشگر": "editor" } as const;
export function RepositoryHeader({ repository, fallbackFocusRef, titleRef }: { titleRef?: RefObject<HTMLHeadingElement | null>; repository: LibraryRepository; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const { setRepositories } = useLibrary();
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLElement>(null);
  const Heading = titleRef ? "h1" : "h2";
  return <section data-test-id="repository-detail-card" ref={heading} tabIndex={-1} className={`${glass.insetCard} mb-4 shrink-0 p-2`}>
    <div data-test-id="repository-detail-information" className="flex items-start gap-3">
      <RepositoryImage testId="repository-detail-image" image={repository.image} name={repository.name} className="h-16 w-24 shrink-0" />
      <div data-test-id="repository-detail-text" className="min-w-0 flex-1 space-y-1">
        <Heading data-test-id="repository-detail-name" ref={titleRef} tabIndex={titleRef ? -1 : undefined} className="text-sm font-bold wrap-anywhere">{repository.name}</Heading>
        <p data-test-id="repository-detail-description" className="text-xs wrap-anywhere">{repository.description}</p>
        <div data-test-id="repository-detail-meta" className="flex flex-wrap items-center gap-1.5"><span data-test-id="repository-detail-role"><RoleBadge role={displayRoles[repository.role]} /></span>{repository.archived && <Badge data-test-id="repository-detail-state" variant="outline" className={glass.statusNeutral}>بایگانی‌شده</Badge>}</div>
      </div>
      <GlassOptionsMenu testId="repository-detail-options" title={repository.name} description="عملیات مخزن" trigger={<OptionsButton data-test-id="repository-detail-options" aria-label="عملیات مخزن" />} items={repositoryActionItems(repository)} onAction={(id, label, trigger) => setSelection({ id, label, trigger: trigger ?? null })} />
    </div>
    <p data-test-id="repository-detail-status" role="status" className="sr-only">{message}</p>
    {selection && <RepositoryPreviewProvider value={repository} onChange={update => setRepositories(current => updateRepositoryRecords(current, repository.id, update))}><RepositoryActionDialog key={selection.id} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={fallbackFocusRef ?? heading} /></RepositoryPreviewProvider>}
  </section>;
}
