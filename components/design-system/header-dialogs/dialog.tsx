"use client";
import { useId, useRef, type RefObject } from "react";
import { Bell, MessageSquare, LogOut } from "lucide-react";
import { NavigableGlassModal } from "@/components/ui/DialogNavigation";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { Button } from "@/components/ui/button";
import { HeaderFeedback } from "./feedback";
import { HeaderInvitations } from "./invitations";
import type { HeaderInvitation } from "./model";
export type HeaderDialogKind = "requests" | "feedback" | "logout";
export function HeaderDialog({ kind, items, onDecision, close, onFeedback, onLogout, trigger, fallbackFocusRef }: { kind: HeaderDialogKind; items: HeaderInvitation[]; onDecision: (id: string, state: "accepted" | "rejected") => void; close: () => void; onFeedback: () => void; onLogout: () => void; trigger: HTMLElement | null; fallbackFocusRef: RefObject<HTMLElement | null> }) {
  const formId = useId();
  const focusFallback = useRef(false);
  const title = { requests: "لیست درخواست‌ها", feedback: "ارسال نظر و بازخورد", logout: "خروج از حساب" }[kind];
  const Icon = kind === "requests" ? Bell : kind === "feedback" ? MessageSquare : LogOut;
  return <NavigableGlassModal testId="dashboard-header-modal" themeAnchorRef={fallbackFocusRef} open title={title} description={kind === "requests" ? "دعوت‌های پیوستن به مخزن" : "کاربر نمونه"} compact surface="liquid" size={kind === "requests" ? "md" : "sm"} onOpenChange={open => { if (!open) close(); }} finalFocus={() => focusFallback.current ? fallbackFocusRef.current ?? true : trigger?.isConnected ? trigger : fallbackFocusRef.current ?? true}
    icon={<GlassEmblem data-test-id="dashboard-header-dialog-icon" className="size-7"><Icon aria-hidden="true" className="size-3.5" /></GlassEmblem>}
    footer={<>
      <Button data-test-id="dashboard-header-cancel" variant="outline" size="sm" onClick={close}>{kind === "requests" ? "بستن" : "انصراف"}</Button>
      {kind === "feedback" && <Button data-test-id="dashboard-feedback-submit" size="sm" type="submit" form={formId}>ثبت بازخورد</Button>}
      {kind === "logout" && <Button data-test-id="dashboard-header-logout-confirm" size="sm" variant="destructive-outline" onClick={() => { focusFallback.current = true; onLogout(); }}>خروج</Button>}
    </>}>
    {kind === "requests" && <HeaderInvitations items={items} onDecision={onDecision} />}
    {kind === "feedback" && <HeaderFeedback formId={formId} done={onFeedback} />}
    {kind === "logout" && <p data-test-id="dashboard-logout-note" className="text-xs leading-relaxed">از حساب نمایشی خارج می‌شوید؟</p>}
  </NavigableGlassModal>;
}
