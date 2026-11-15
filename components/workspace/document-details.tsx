import { LockKeyhole } from "lucide-react";
import { ApprovalBadge } from "@/components/ui/status-badge";
import { DocumentSymbol } from "@/components/workspace/document-list";
import DocumentRecipients from "@/components/workspace/document-recipients";
import { folders, repositories } from "@/lib/workspace/fixtures";
import { formatDocumentDate } from "@/lib/workspace/documents";
import { getDocumentVersions } from "@/lib/workspace/mutations";
import type { IDocument } from "@/interface/document";

export default function DocumentDetails({ document }: { document: IDocument }) {
  const repository = repositories.find(item => item.id === document.repositoryId)!;
  const latest = getDocumentVersions(document).at(-1)!;
  const path = [repository.name];
  let folder = folders.find(item => item.id === document.folderId);
  const parents: string[] = [];
  while (folder) { parents.unshift(folder.name); folder = folders.find(item => item.id === folder?.parentId); }
  path.push(...parents);
  return <div data-test-id="document-details-div-1" className="ws-documentDetails"><div data-test-id="document-details-div-2" className="ws-detailsIntro"><DocumentSymbol kind={document.kind} /><ApprovalBadge status={document.approval} /></div><p data-test-id="document-details-p-3" className="ws-detailsDescription">{document.description}</p><dl data-test-id="document-details-dl-4" className="ws-metadata">
    <div data-test-id="document-details-div-5"><dt data-test-id="document-details-dt-6">مسیر سند</dt><dd data-test-id="document-details-dd-7">{path.join(" / ")}</dd></div><div data-test-id="document-details-div-8"><dt data-test-id="document-details-dt-9">سازنده</dt><dd data-test-id="document-details-dd-10">{document.creator?.name ?? "هویت نامشخص"}</dd></div><div data-test-id="document-details-div-11"><dt data-test-id="document-details-dt-12">تاریخ ایجاد</dt><dd data-test-id="document-details-dd-13"><time data-test-id="document-details-time-14" dateTime={document.createdAt}>{formatDocumentDate(document.createdAt)}</time></dd></div><div data-test-id="document-details-div-15"><dt data-test-id="document-details-dt-16">آخرین تغییر</dt><dd data-test-id="document-details-dd-17"><time data-test-id="document-details-time-18" dateTime={document.updatedAt}>{formatDocumentDate(document.updatedAt)}</time></dd></div><div data-test-id="document-details-div-19"><dt data-test-id="document-details-dt-20">دسترسی</dt><dd data-test-id="document-details-dd-21">{document.share ? `اشتراکی · ${document.share.access}` : document.recipients?.length ? "دارای گیرنده نمونه · بدون انتشار عمومی" : repository.id === "repo-personal" ? "خصوصی · فضای شخصی" : "اعضای مخزن"}</dd></div>{document.share && <div data-test-id="document-details-div-22"><dt data-test-id="document-details-dt-23">اشتراک‌گذار</dt><dd data-test-id="document-details-dd-24">{document.share.by.name}</dd></div>}
    <div data-test-id="document-details-div-25"><dt data-test-id="document-details-dt-26">آخرین نسخه محتوا</dt><dd data-test-id="document-details-dd-27">نسخه {new Intl.NumberFormat("fa").format(latest.number)}</dd></div>
    {!!document.recipients?.length && <div data-test-id="document-details-div-28"><dt data-test-id="document-details-dt-29">گیرندگان نمونه</dt><dd data-test-id="document-details-dd-30"><DocumentRecipients key={document.id} recipients={document.recipients} /></dd></div>}
  </dl><p data-test-id="document-details-p-31" className="ws-privacyNote"><LockKeyhole size={17} aria-hidden="true" />تأیید محتوا به معنی انتشار عمومی آن نیست.</p></div>;
}
