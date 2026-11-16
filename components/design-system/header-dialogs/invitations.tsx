"use client";
import { useRef } from "react";
import { FolderOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { CopyField } from "@/components/ui/CopyField";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { PreviewList } from "../preview-list";
import { glass } from "@/lib/design-system/classes";
import type { HeaderInvitation } from "./model";
function AcceptedInvitation({ invitation }: { invitation: HeaderInvitation }) {
  return <div data-test-id="header-invitation-accepted" className="space-y-3">
    <p data-test-id="header-invitation-success" role="status" className="flex items-start gap-2 text-xs leading-relaxed"><Check aria-hidden="true" className="size-4 shrink-0 text-success" />شما به مخزن «{invitation.repoName}» پیوستید.</p>
    <CopyField testId="header-invitation-link" compact label="لینک ورود به مخزن" value={`https://example.com/admin/repositories?repoId=${encodeURIComponent(invitation.repoId)}`} />
    <Button data-test-id="header-invitation-enter" variant="outline" size="sm" disabled disabledReason="صفحهٔ داخلی این مخزن هنوز در پیش‌نمایش طراحی نشده است.">ورود به مخزن</Button>
  </div>;
}
export function HeaderInvitations({ items, onDecision }: { items: HeaderInvitation[]; onDecision: (id: string, state: "accepted" | "rejected") => void }) {
  const { push } = useDialogNavigation();
  const heading = useRef<HTMLParagraphElement>(null);
  const pending = items.filter(item => item.state === "pending");
  return <div data-test-id="dashboard-header-invitations" className="space-y-2">
    <p data-test-id="header-invitations-summary" ref={heading} tabIndex={-1} className="text-[11px] text-muted-foreground">درخواست‌های پیوستن به مخزن · {new Intl.NumberFormat("fa").format(pending.length)} درخواست</p>
    <PreviewList testId="header-invitations-list" items={pending} noun="درخواست" render={item => <div data-test-id={`header-invitation-${item.id}`} className={`${glass.compactRecord} flex-wrap`}>
      <GlassEmblem data-test-id={`header-invitation-icon-${item.id}`} className="size-7"><FolderOpen aria-hidden="true" className="size-3.5" /></GlassEmblem>
      <div data-test-id={`header-invitation-copy-${item.id}`} className="min-w-0 flex-1"><p data-test-id={`header-invitation-name-${item.id}`} className="wrap-anywhere text-xs font-medium">{item.repoName}</p><p data-test-id={`header-invitation-role-${item.id}`} className="text-[10px] text-muted-foreground">{item.role}</p></div>
      <div data-test-id={`header-invitation-actions-${item.id}`} className="flex gap-1">
        <Button data-test-id={`header-invitation-reject-${item.id}`} variant="outline" size="sm" aria-label={`رد درخواست ${item.repoName}`} onClick={() => { onDecision(item.id, "rejected"); heading.current?.focus(); }}>ردکردن</Button>
        <Button data-test-id={`header-invitation-accept-${item.id}`} size="sm" aria-label={`تأیید درخواست ${item.repoName}`} onClick={() => { onDecision(item.id, "accepted"); push("پیوستن به مخزن", <AcceptedInvitation invitation={item} />, heading.current); }}>تأیید</Button>
      </div>
    </div>} />
  </div>;
}
