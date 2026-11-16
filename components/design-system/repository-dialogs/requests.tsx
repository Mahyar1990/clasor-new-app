"use client";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { Button } from "@/components/ui/button";
import { PreviewList } from "./list";
import { useRepositoryPreview } from "./context";
function RequestList({ kind }: { kind: string }) {
  const { repo, setRepo } = useRepositoryPreview();
  function decide(id: string, status: string) { setRepo(current => ({ ...current, requests: current.requests.map(item => item.id === id ? { ...item, status } : item) })); }
  return <PreviewList testId={`repo-requests-${kind}`} items={repo.requests.filter(item => item.kind === kind)} noun="درخواست" render={item => <div data-test-id={`repo-request-${item.id}`} className="space-y-3 rounded-lg border border-white/40 bg-white/15 p-3">
    <div data-test-id={`repo-request-copy-${item.id}`}><p data-test-id={`repo-request-name-${item.id}`} className="text-xs font-semibold">{kind === "question" ? "پرسش دربارهٔ " : ""}{item.name}</p><p data-test-id={`repo-request-person-${item.id}`} className="mt-1 text-[11px] text-muted-foreground">{item.detail} · نسخهٔ ۲</p></div>
    <div data-test-id={`repo-request-actions-${item.id}`} className="flex flex-wrap items-center justify-end gap-2">
      {item.status === "pending" ? <><Button data-test-id={`repo-request-reject-${item.id}`} variant="outline" size="sm" onClick={() => decide(item.id, "rejected")}>رد درخواست</Button><Button data-test-id={`repo-request-accept-${item.id}`} size="sm" onClick={() => decide(item.id, "accepted")}>قبول درخواست</Button></> : <p data-test-id={`repo-request-status-${item.id}`} role="status" className="text-xs">{item.status === "accepted" ? "در نمونه تأیید شد" : "در نمونه رد شد"}</p>}
    </div>
  </div>} />;
}
export function RepositoryRequests({ action }: { action: string }) {
  if (action === "document-requests") return <RequestList kind="access" />;
  if (action === "questions") return <RequestList kind="question" />;
  return <ClasorTabs label="درخواست‌های مخزن" defaultValue="draft" items={[
    { value: "draft", label: "پیش‌نویس‌های در انتظار تأیید", content: <RequestList kind="draft" /> },
    { value: "version", label: "نسخه‌های در انتظار عمومی شدن", content: <RequestList kind="version" /> },
  ]} />;
}
