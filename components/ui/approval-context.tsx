import { Identity } from "@/components/ui/identity"
import { ApprovalBadge } from "@/components/ui/status-badge"
import type { ApprovalContext as Context } from "@/lib/design-system/models"
function Timestamp({ value }: { value: string }) {
  const valid = !Number.isNaN(Date.parse(value))
  return valid ? <time data-test-id="approval-context-time-1" dateTime={value}>{new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tehran" }).format(new Date(value))}</time> : <span data-test-id="approval-context-span-2">زمان ثبت نشده</span>
}
export function ApprovalContext({ context, showStatus = true }: { context: Context; showStatus?: boolean }) {
  return <div data-test-id="approval-context-div-3" className="space-y-4">{showStatus && <ApprovalBadge status={context.status === "pending" ? "pending" : context.decision.outcome} />}<dl data-test-id="approval-context-dl-4" className="grid gap-5 sm:grid-cols-2">
    {([{ label: "سازنده", identity: context.creator }, { label: "آخرین ویرایشگر", identity: context.lastEditor }, { label: "درخواست‌دهنده", identity: context.requester }, { label: "تصمیم‌گیرنده", identity: context.status === "decided" ? context.decision.by : { kind: "unknown" as const, label: "هنوز تصمیمی ثبت نشده" } }]).map(item => <div data-test-id={`approval-context-div-5-${String(item.label)}`} key={item.label} className="min-w-0 space-y-2"><dt data-test-id={`approval-context-dt-6-${String(item.label)}`} className="text-xs text-muted-foreground">{item.label}</dt><dd data-test-id={`approval-context-dd-7-${String(item.label)}`}><Identity identity={item.identity} /></dd></div>)}
    <div data-test-id="approval-context-div-8"><dt data-test-id="approval-context-dt-9" className="text-xs text-muted-foreground">زمان درخواست</dt><dd data-test-id="approval-context-dd-10" className="text-sm"><Timestamp value={context.requestedAt} /></dd></div>
    {context.status === "decided" && <div data-test-id="approval-context-div-11"><dt data-test-id="approval-context-dt-12" className="text-xs text-muted-foreground">زمان تصمیم</dt><dd data-test-id="approval-context-dd-13" className="text-sm"><Timestamp value={context.decision.at} /></dd></div>}
  </dl></div>
}
