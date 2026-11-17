"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { FormActions } from "@/components/ui/FormActions";
export interface WorkspaceDecision { title: string; description: string; commit: () => boolean; cancel: () => void; discard?: () => void; confirmLabel: string; origin?: () => HTMLElement | null }
export type DecisionHost = (request: WorkspaceDecision) => void;
export function useDecisionHost(host: DecisionHost | undefined, key: unknown, request: WorkspaceDecision) {
  const handled = useRef<unknown>(null);
  useEffect(() => {
    if (!key) { handled.current = null; return; }
    if (!host || handled.current === key) return;
    handled.current = key; host(request);
  }, [host, key, request]);
}
/** Reuses the surrounding dialog navigation instead of opening a dialog over it. */
export function WorkspaceDecisionPage({ request }: { request: WorkspaceDecision }) {
  const { back } = useDialogNavigation();
  const [error, setError] = useState("");
  const mounted = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; queueMicrotask(() => { if (!mounted.current) request.cancel(); }); }; }, [request]);
  return <div data-test-id="workspace-decision-page" className="space-y-3"><p data-test-id="workspace-decision-description" className="text-xs leading-loose">{request.description}</p><p data-test-id="workspace-decision-error" role="alert" className="text-xs text-danger">{error}</p><FormActions data-test-id="workspace-decision-actions"><Button data-test-id="workspace-decision-cancel" variant="outline" onClick={back}>بازگشت</Button>{request.discard && <Button data-test-id="workspace-decision-discard" variant="outline" onClick={() => { request.discard?.(); back(); }}>ذخیره نشود</Button>}<Button data-test-id="workspace-decision-confirm" onClick={() => { if (request.commit()) back(); else setError("ذخیره انجام نشد؛ تغییرات حفظ شده‌اند. دوباره تلاش کنید."); }}>{request.confirmLabel}</Button></FormActions></div>;
}
