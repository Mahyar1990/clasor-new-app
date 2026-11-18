"use client";
import { glass } from "@/lib/design-system/classes";
import { Check, X } from "lucide-react";
import { Button } from "./button";
import { ApprovalBadge } from "./status-badge";

/** Compact, independent decisions for a pending record; permissions remain with the caller. */
export function ReviewActions({ status, label, onDecision, disabled, testId }: {
  status: "pending" | "approved" | "rejected";
  label: string; onDecision: (decision: "approved" | "rejected") => void;
  disabled?: boolean; testId: string;
}) {
  return <div data-test-id={testId} className={glass.reviewActions}>
    {status === "pending" ? <>
      <Button data-test-id={`${testId}-approve`} size="sm" className={glass.reviewDecision} disabled={disabled} aria-label={`تأیید ${label}`} onClick={() => onDecision("approved")}><Check aria-hidden="true" className="size-3!" />تأیید</Button>
      <Button data-test-id={`${testId}-reject`} size="sm" variant="outline" className={glass.reviewDecision} disabled={disabled} aria-label={`رد ${label}`} onClick={() => onDecision("rejected")}><X aria-hidden="true" className="size-3!" />رد</Button>
    </> : <ApprovalBadge status={status} />}
  </div>;
}
