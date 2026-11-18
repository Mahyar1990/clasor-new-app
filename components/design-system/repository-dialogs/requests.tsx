"use client";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { FormActions } from "@/components/ui/FormActions";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/text-field";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { glass } from "@/lib/design-system/classes";
import { useRef } from "react";
import { PreviewList } from "./list";
import { useRepositoryPreview, type PreviewRecord } from "./context";
function RequestViewer({ item }: { item: PreviewRecord }) {
  const { repo, setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const current = repo.requests.find(record => record.id === item.id) ?? item;
  function decide(status: string) { setRepo(value => ({ ...value, requests: value.requests.map(record => record.id === item.id ? { ...record, status } : record) })); back(); }
  return <div data-test-id="repo-request-viewer" className="space-y-3"><p data-test-id="repo-request-viewer-meta" className="text-xs text-muted-foreground">{item.detail} · ویرایش: {item.editedAt} · نسخه {item.version} · {item.kind === "draft" ? "پیش‌نویس" : "تأییدشده"}</p><TextareaField data-test-id="repo-request-content" label="محتوای نسخه" value={item.content ?? ""} readOnly rows={7} />{current.status === "pending" && <FormActions data-test-id="repo-request-viewer-actions"><Button data-test-id="repo-request-viewer-accept" size="sm" onClick={() => decide("accepted")}>تأیید درخواست</Button><Button data-test-id="repo-request-viewer-reject" variant="outline" size="sm" onClick={() => decide("rejected")}>رد درخواست</Button></FormActions>}</div>;
}
function RequestList({ kind }: { kind: string }) {
  const { repo, setRepo } = useRepositoryPreview();
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  function decide(id: string, status: string) {
    setRepo(current => ({ ...current, requests: current.requests.map(item => item.id === id ? { ...item, status } : item) }));
    triggers.current.get(id)?.focus();
  }
  const { push } = useDialogNavigation();
  return <PreviewList testId={`repo-requests-${kind}`} items={repo.requests.filter(item => item.kind === kind)} noun="درخواست" render={item => <div data-test-id={`repo-request-row-${item.id}`} className={`${glass.contentSurface} flex flex-wrap items-center gap-2 p-2`}><Button ref={node => { if (node) triggers.current.set(item.id, node); else triggers.current.delete(item.id); }} data-test-id={`repo-request-${item.id}`} variant="ghost" className="h-auto min-w-0 flex-1 flex-col items-start gap-1 whitespace-normal px-3 py-2 text-start" onClick={() => push(`نمایش نسخه ${item.version} · ${item.name}`, <RequestViewer item={item} />)}>
    <span data-test-id={`repo-request-name-${item.id}`} className="text-xs font-medium">{kind === "question" ? "پرسش دربارهٔ " : ""}{item.name}</span>
    <span data-test-id={`repo-request-person-${item.id}`} className="text-[10px] text-muted-foreground">سازنده: {item.detail} · ویرایش: {item.editedAt}</span>
    <span data-test-id={`repo-request-status-${item.id}`} className="text-[10px]">نسخه {item.version} · {kind === "draft" ? "پیش‌نویس" : kind === "version" ? "تأییدشده · درخواست عمومی شدن" : "درخواست"} · {item.status === "pending" ? "در انتظار بررسی" : item.status === "accepted" ? "تأیید شد" : "رد شد"}</span>
  </Button>
    {item.status === "pending" && <div data-test-id={`repo-request-actions-${item.id}`} className="flex shrink-0 gap-1">
      <Button data-test-id={`repo-request-accept-${item.id}`} size="sm" aria-label={`تأیید درخواست ${item.name}`} onClick={() => decide(item.id, "accepted")}>تأیید</Button>
      <Button data-test-id={`repo-request-reject-${item.id}`} size="sm" variant="outline" aria-label={`رد درخواست ${item.name}`} onClick={() => decide(item.id, "rejected")}>رد</Button>
    </div>}
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
