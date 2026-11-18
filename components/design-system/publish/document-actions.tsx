"use client";
import { useRef, useState } from "react";
import { History, Link2, ListTree, Paperclip } from "lucide-react";
import { FloatingActionBar } from "@/components/ui/FloatingActionBar";
import { ReactionControl } from "@/components/ui/ReactionControl";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { Button } from "@/components/ui/button";
import { PublishedActionDialogs, type PublishedAction } from "./action-dialogs";
import { PublishedPanelLink } from "./panel-link";
import { usePublishSession } from "./session";
import { publicationFeedback } from "./fixtures";
import { reactionCounts } from "./article-state";
import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
export function PublishedActions({ document, version, onVersionChange, contentsOpen, onContentsToggle }: { document: DocumentPreview; version: DocumentVersion; onVersionChange: (id: string) => void; contentsOpen: boolean; onContentsToggle: (trigger: HTMLButtonElement) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState<PublishedAction | null>(null);
  const [shortLink, setShortLink] = useState("");
  const anchor = useRef<HTMLDivElement>(null);
  const session = usePublishSession();
  const value = session.votes[document.id] ?? null;
  const counts = reactionCounts(value, publicationFeedback[document.id]?.likes ?? 0, publicationFeedback[document.id]?.dislikes ?? 0);
  function open(action: PublishedAction, trigger: HTMLButtonElement) {
    anchor.current?.querySelectorAll('[data-action-origin]').forEach(item => item.removeAttribute('data-action-origin'));
    trigger.dataset.actionOrigin = "true";
    if (action === "short-link") setShortLink(`${window.location.origin}/clasor-pages/p/${encodeURIComponent(document.id)}`);
    setOpened(action);
  }
  return <>
    <div data-test-id="publish-floating-position" ref={anchor} className="pointer-events-none absolute inset-x-2 bottom-4 z-20 flex justify-center">
      <FloatingActionBar testId="publish-action-bar" open={expanded} onOpenChange={setExpanded}>
        <HelpTooltip content="فهرست سند"><Button data-test-id="publish-contents-toggle" size="icon-sm" variant="ghost" aria-label="فهرست سند" aria-expanded={contentsOpen} aria-controls="publish-contents-drawer" onClick={event => onContentsToggle(event.currentTarget)}><ListTree aria-hidden="true" /></Button></HelpTooltip>
        <HelpTooltip content="فایل‌های پیوست سند"><Button data-test-id="publish-attachments-open" size="icon-sm" variant="ghost" aria-label={`فایل‌های پیوست سند؛ ${document.attachments?.length ?? 0} فایل`} onClick={event => open("attachments", event.currentTarget)}><Paperclip aria-hidden="true" /></Button></HelpTooltip>
        <PublishedPanelLink data-test-id="publish-open-in-panel" document={document} />
        <HelpTooltip content="لینک کوتاه سند"><Button data-test-id="publish-short-link-open" size="icon-sm" variant="ghost" aria-label="لینک کوتاه سند" onClick={event => open("short-link", event.currentTarget)}><Link2 aria-hidden="true" /></Button></HelpTooltip>
        <ReactionControl testId="publish-reaction" value={value} {...counts} onValueChange={next => { if (!session.user) session.requestLogin(); else session.vote(document.id, next); }} />
        <HelpTooltip content={`انتخاب نسخهٔ سند؛ ${version.name}`}><Button data-test-id="publish-versions-open" size="icon-sm" variant="ghost" aria-label="انتخاب نسخهٔ سند" onClick={event => open("versions", event.currentTarget)}><History aria-hidden="true" /></Button></HelpTooltip>
      </FloatingActionBar>
    </div>
    <PublishedActionDialogs opened={opened} close={() => setOpened(null)} anchor={anchor} document={document} version={version} onVersionChange={onVersionChange} shortLink={shortLink} />
  </>;
}
