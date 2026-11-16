"use client";
import { useRef, useState, type RefObject } from "react";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { RepositoryImage } from "@/components/ui/RepositoryImage";
import { repositoryActionItems } from "../repository-dialogs/options";
import { RepositoryPreviewProvider } from "../repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "../repository-dialogs/dialog";
import { useLibrary, type LibraryRepository } from "./store";
import { updateRepositoryRecords } from "./repository-state";
export function RepositoryHeader({ repository, fallbackFocusRef }: { repository: LibraryRepository; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const { setRepositories } = useLibrary();
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLElement>(null);
  return <section data-test-id="repository-detail-card" ref={heading} tabIndex={-1} className="mb-4 shrink-0 border-b border-white/35 pb-3">
    <Link data-test-id="repository-detail-back" href={repository.shared ? "/clasor-pages/shared-repositories" : "/clasor-pages/my-repositories"} className="mb-3 inline-block rounded-md text-xs text-primary focus-visible:outline-2 focus-visible:outline-ring">بازگشت به مخزن‌ها ←</Link>
    <div data-test-id="repository-detail-information" className="flex items-start gap-3">
      <RepositoryImage testId="repository-detail-image" image={repository.image} name={repository.name} className="h-16 w-24 shrink-0" />
      <div data-test-id="repository-detail-text" className="min-w-0 flex-1 space-y-1"><p data-test-id="repository-detail-role" className="text-[10px] text-muted-foreground">{repository.role} · {repository.archived ? "بایگانی‌شده" : "فعال"}</p><p data-test-id="repository-detail-description" className="text-xs wrap-anywhere">{repository.description}</p><p data-test-id="repository-detail-tags" className="text-[10px] text-muted-foreground wrap-anywhere">تگ‌های مخزن: {repository.tags?.join(" · ") || "بدون تگ"}</p></div>
      <GlassOptionsMenu testId="repository-detail-options" title={repository.name} description="عملیات مخزن" trigger={<Button data-test-id="repository-detail-options" variant="plain" size="icon-sm" aria-label="عملیات مخزن"><Ellipsis aria-hidden="true" /></Button>} items={repositoryActionItems(repository)} onAction={(id, label, trigger) => setSelection({ id, label, trigger: trigger ?? null })} />
    </div>
    <p data-test-id="repository-detail-status" role="status" className="sr-only">{message}</p>
    {selection && <RepositoryPreviewProvider value={repository} onChange={update => setRepositories(current => updateRepositoryRecords(current, repository.id, update))}><RepositoryActionDialog key={selection.id} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={fallbackFocusRef ?? heading} /></RepositoryPreviewProvider>}
  </section>;
}
