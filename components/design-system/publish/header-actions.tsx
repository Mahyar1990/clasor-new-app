"use client";
import { useRef, useState } from "react";
import { PublicHeaderActions } from "@/components/ui/PublicHeaderActions";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { PublishSearchDialog } from "./search-dialog";
import { PublishNewsDialog } from "./news-dialog";
import { usePublishSession } from "./session";
export function PublishHeaderActions() {
  const session = usePublishSession();
  const [dialog, setDialog] = useState<{ kind: "news" | "search" | "profile"; trigger: HTMLElement } | null>(null);
  const anchor = useRef<HTMLDivElement>(null);
  function open(kind: "news" | "search" | "profile") { setDialog({ kind, trigger: window.document.activeElement as HTMLElement }); }
  return <div data-test-id="publish-header-actions-anchor" ref={anchor}>
    <PublicHeaderActions testId="publish-header-actions" user={session.user} panelHref="/clasor-pages/dashboard" onLogin={() => session.requestLogin()} onProfile={() => open("profile")} onNewsletter={() => open("news")} onSearch={() => open("search")} />
    {dialog?.kind === "search" && <PublishSearchDialog trigger={dialog.trigger} close={() => setDialog(null)} />}
    {dialog?.kind === "news" && <PublishNewsDialog trigger={dialog.trigger} close={() => setDialog(null)} />}
    <GlassModal testId="publish-profile-dialog" themeAnchorRef={anchor} open={dialog?.kind === "profile"} title="حساب کاربری" description={session.user?.name} onOpenChange={open => { if (!open) setDialog(null); }} finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-header-actions-profile"], [data-test-id="publish-header-actions-login"]') ?? true} compact surface="liquid" size="sm"><Button data-test-id="publish-profile-logout" variant="outline" size="sm" onClick={() => { session.signOut(); setDialog(null); }}>خروج از حساب نمونه</Button></GlassModal>
  </div>;
}
