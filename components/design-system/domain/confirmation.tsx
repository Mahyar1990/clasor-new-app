"use client";
import { useRef, type RefObject } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
export function DomainConfirmation({ title, description, confirm, close, trigger, anchorRef }: { title: string; description: string; confirm: () => void; close: () => void; trigger: HTMLElement | null; anchorRef?: RefObject<HTMLElement | null> }) {
  const anchor = useRef(trigger);
  return <GlassModal testId="domain-confirmation" themeAnchorRef={anchorRef ?? anchor} title={title} description={description} open compact surface="liquid" size="sm" onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger?.isConnected ? trigger : anchorRef?.current ?? true} footer={<>
    <Button data-test-id="domain-confirm-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button>
    <Button data-test-id="domain-confirm-delete" size="sm" variant="destructive-outline" onClick={() => { confirm(); close(); }}>حذف</Button>
  </>}><p data-test-id="domain-confirm-note" className="text-xs leading-6">برای ادامه حذف را تأیید کنید.</p></GlassModal>;
}
