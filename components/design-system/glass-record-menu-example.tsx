"use client";

import { useRef, useState, type ReactNode } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { documentOptions } from "./clasor-document-options";
import { repositoryActionItems } from "./repository-dialogs/options";
import { initialRepository, RepositoryPreviewProvider, type PreviewRole } from "./repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "./repository-dialogs/dialog";
import { DocumentActionDialog } from "./document-dialogs/dialog";
import { initialDocument } from "./document-dialogs/model";
import { dashboardDocuments } from "./clasor-dashboard-data";

export function GlassRecordMenuExample({ id, name, description, icon }: { id: string; name: string; description: string; icon: ReactNode }) {
  const isDocument = ["document", "shared-document"].includes(id);
  const [document, setDocument] = useState(() => initialDocument({ ...dashboardDocuments[1], id: `catalogue-${id}`, title: name, shared: id === "shared-document" }));
  const [repo, setRepo] = useState(() => ({ ...initialRepository(), id: `catalogue-${id}`, name, published: id === "owner", role: (id === "owner" ? "مالک" : "ویرایشگر") as PreviewRole }));
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [message, setMessage] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const fallback = useRef<HTMLParagraphElement>(null);
  const disabled = isDocument ? document.deleted : repo.deleted || repo.left;
  return <GlassCard data-test-id={`glass-options-example-${id}`} className="flex min-w-0 items-center justify-between gap-3 p-4">
    <div data-test-id={`glass-options-copy-${id}`} className="min-w-0"><p data-test-id={`glass-options-type-${id}`} className="text-xs text-muted-foreground">{description}</p><p data-test-id={`glass-options-name-${id}`} ref={fallback} tabIndex={-1} className="mt-1 wrap-anywhere text-sm font-medium">{isDocument ? document.title : repo.name}</p><p data-test-id={`glass-options-status-${id}`} role="status" className="text-[11px] text-muted-foreground">{disabled ? "از نمونه حذف شده" : message}</p></div>
    <GlassOptionsMenu testId={`catalogue-options-${id}`} triggerRef={trigger} title={isDocument ? document.title : repo.name} description={description} icon={icon} items={isDocument ? documentOptions(document.shared, { bookmarked: document.bookmarked }) : repositoryActionItems(repo)} trigger={<Button data-test-id={`catalogue-options-${id}`} variant="glass" size="icon" disabled={disabled} aria-label={`نمایش ${description}`}><Ellipsis aria-hidden="true" /></Button>} onAction={(action, label) => setSelection({ id: action, label, trigger: trigger.current })} />
    {selection && (isDocument ? <DocumentActionDialog key={selection.id} document={document} onChange={setDocument} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={fallback} /> : <RepositoryPreviewProvider value={repo} onChange={setRepo}><RepositoryActionDialog key={selection.id} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={fallback} /></RepositoryPreviewProvider>)}
  </GlassCard>;
}
