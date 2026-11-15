"use client";

import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { useRef, useState, type RefObject } from "react";
import { CheckCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { SelectField } from "@/components/ui/select-field";
import { TextareaField } from "@/components/ui/text-field";
import { ApprovalContext } from "@/components/ui/approval-context";
import { ApprovalBadge, LatestBadge, RoleBadge } from "@/components/ui/status-badge";
import { useDocumentStore } from "@/components/workspace/document-store";
import LoadMore from "@/components/workspace/load-more";
import DocumentRecipients from "@/components/workspace/document-recipients";
import { canManageDocument, documentText, getDocumentVersions } from "@/lib/workspace/mutations";
import { formatDocumentDate, getLoadedItems, LIST_BATCH_SIZE } from "@/lib/workspace/documents";
import { repositories, samplePeople, sampleUser } from "@/lib/workspace/fixtures";
import type { IDocument, IDocumentPerson, IDocumentVersion } from "@/interface/document";

const fa = (value: number) => new Intl.NumberFormat("fa").format(value);
const identity = (person: IDocumentPerson | null) => person ? { kind: "known" as const, ...person } : { kind: "unknown" as const, label: "هویت نامشخص" };

function ReviewDetails({ document, version }: { document: IDocument; version: IDocumentVersion }) {
  const review = version.review;
  if (!review) return <p data-test-id="document-collaboration-p-1" className="ws-formHint">{version.approval === "draft" ? "برای این نسخه هنوز درخواست بررسی ثبت نشده است." : "این وضعیت از داده اولیه آمده و جزئیات درخواست آن در نمونه ثبت نشده است."}</p>;
  const base = { creator: identity(document.creator), lastEditor: identity(version.by), requester: identity(review.by), requestedAt: review.requestedAt };
  return <div data-test-id="document-collaboration-div-2" className="ws-reviewContext"><p data-test-id="document-collaboration-p-3" className="ws-reviewer">بررسی‌کننده: {review.reviewer.name} <RoleBadge role="admin" /></p><ApprovalContext showStatus={false} context={review.decision ? { ...base, status: "decided", decision: { ...review.decision, by: identity(review.decision.by) } } : { ...base, status: "pending" }} />{review.decision?.reason && <div data-test-id="document-collaboration-div-4" className="ws-reviewReason"><strong data-test-id="document-collaboration-strong-5">توضیح تصمیم</strong><p data-test-id="document-collaboration-p-6">{review.decision.reason}</p></div>}</div>;
}

export function DocumentVersions({ document }: { document: IDocument }) {
  const versions = getDocumentVersions(document);
  const [visibleCount, setVisibleCount] = useState(LIST_BATCH_SIZE);
  const listRef = useRef<HTMLOListElement>(null);
  const result = getLoadedItems([...versions].reverse(), visibleCount);
  return <div data-test-id="document-collaboration-div-7"><div data-test-id="document-collaboration-div-8" className="ws-sectionHeading"><h2 data-test-id="document-collaboration-h2-9">تاریخچه نسخه‌ها</h2><span data-test-id="document-collaboration-span-10">{fa(versions.length)} نسخه</span></div><p data-test-id="document-collaboration-p-11" className="ws-formHint">هر ذخیره متنِ متفاوت، نسخه تازه‌ای بر مبنای آخرین نسخه می‌سازد. نسخه‌های پیشین فقط خواندنی‌اند.</p><ol data-test-id="document-collaboration-ol-12" ref={listRef} className="ws-versionList">{result.rows.map(version => <li data-test-id={`document-collaboration-li-13-${String(version.id)}`} key={version.id} tabIndex={-1} data-load-more-item><div data-test-id={`document-collaboration-div-14-${String(version.id)}`} className="ws-versionHeader"><strong data-test-id={`document-collaboration-strong-15-${String(version.id)}`}>نسخه {fa(version.number)}</strong><LatestBadge status={version.id === versions.at(-1)!.id ? "latest" : "previous"} /><ApprovalBadge status={version.approval} /></div><p data-test-id={`document-collaboration-p-16-${String(version.id)}`} className="ws-versionMeta">{version.by?.name ?? "هویت نامشخص"} · <time data-test-id={`document-collaboration-time-17-${String(version.id)}`} dateTime={version.at}>{formatDocumentDate(version.at)}</time>{version.basedOn && ` · بر مبنای نسخه ${fa(versions.find(item => item.id === version.basedOn)?.number ?? 0)}`}</p><Dialog><DialogTrigger data-test-id={`document-collaboration-dialogtrigger-18-${String(version.id)}`} render={<Button data-test-id={`document-collaboration-dialogtrigger-18-${String(version.id)}`} variant="outline" size="sm" />}>مشاهده نسخه {fa(version.number)}</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog ws-versionDialog" showCloseButton={false}><DialogTitle>نسخه {fa(version.number)} · {version.title}</DialogTitle><DialogDescription>محتوای ثبت‌شده در {formatDocumentDate(version.at)}؛ فقط خواندنی</DialogDescription><div data-test-id={`document-collaboration-div-20-${String(version.id)}`} className="ws-versionHeader"><LatestBadge status={version.id === versions.at(-1)!.id ? "latest" : "previous"} /><ApprovalBadge status={version.approval} /></div>{document.kind === "text" ? <div data-test-id={`document-collaboration-div-21-${String(version.id)}`} className="ws-versionContent ws-plainText">{version.content || "این نسخه متن ندارد."}</div> : <p data-test-id={`document-collaboration-p-22-${String(version.id)}`} className="ws-formHint">این نسخه از {document.kind === "pdf" ? <a data-test-id={`document-collaboration-a-23-${String(version.id)}`} className="ws-textLink" href="/sample-content/research-report.pdf" target="_blank" rel="noopener noreferrer">فایل PDF نمونه</a> : <a data-test-id={`document-collaboration-a-24-${String(version.id)}`} className="ws-textLink" href="/sample-content/workspace.svg" target="_blank" rel="noopener noreferrer">تصویر نمونه</a>} استفاده می‌کند؛ فایل تازه‌ای ارسال نشده است.</p>}<ReviewDetails document={document} version={version} /><DialogClose data-test-id={`document-collaboration-dialogclose-25-${String(version.id)}`} render={<Button data-test-id={`document-collaboration-dialogclose-25-${String(version.id)}`} variant="outline" />}>بازگشت به نسخه‌ها</DialogClose></DialogContent></Dialog></li>)}</ol><LoadMore noun="نسخه" listRef={listRef} result={result} onLoadMore={() => setVisibleCount(result.nextCount)} /></div>;
}

function ReviewActions({ document, version, fallbackFocusRef }: { document: IDocument; version: IDocumentVersion; fallbackFocusRef: RefObject<HTMLHeadingElement | null> }) {
  const { mutate, drafts } = useDocumentStore();
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState<"approved" | "rejected">("approved");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [target, setTarget] = useState({ versionId: version.id, requestedAt: version.review?.requestedAt });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dirty = drafts[document.id] !== undefined && drafts[document.id] !== documentText(document);
  const deciding = version.approval === "pending" && Boolean(version.review);
  if (version.approval === "pending" && !version.review) return null;
  function commit() {
    try {
      const at = new Date().toISOString();
      mutate(deciding ? { type: "decide-approval", id: document.id, versionId: target.versionId, requestedAt: target.requestedAt ?? "", outcome, reason, at } : { type: "request-approval", id: document.id, versionId: target.versionId, reviewerId: samplePeople[0].id, at });
      setOpen(false);
    } catch (cause) { setError((cause as Error).message); }
  }
  return <>{version.approval === "approved" && <p data-test-id="document-collaboration-p-27" className="ws-formHint">این نسخه تأیید شده است. ذخیره متن تازه، پیش‌نویس نسخه بعدی را می‌سازد.</p>}<Dialog open={open} onOpenChange={setOpen}>{version.approval !== "approved" && <DialogTrigger data-test-id="document-collaboration-dialogtrigger-28" ref={triggerRef} render={<Button data-test-id="document-collaboration-dialogtrigger-28" variant="outline" disabled={dirty} disabledReason={dirty ? "ابتدا متن ویرایش‌شده را ذخیره یا کنار بگذارید." : undefined} onClick={() => { setTarget({ versionId: version.id, requestedAt: version.review?.requestedAt }); setError(""); setReason(""); setOutcome("approved"); }} />}><CheckCheck aria-hidden="true" />{deciding ? "شبیه‌سازی تصمیم مدیر" : "درخواست تأیید نمونه"}</DialogTrigger>}<DialogContent finalFocus={() => triggerRef.current?.isConnected ? triggerRef.current : fallbackFocusRef.current ?? true} dir="rtl" className="ws-editDialog" showCloseButton={false}><DialogTitle>{deciding ? "شبیه‌سازی تصمیم درباره محتوا" : "ارسال نسخه برای بررسی نمونه"}</DialogTitle><DialogDescription>نسخه {fa(version.number)} از «{document.title}». این اقدام فقط داده ساختگی همین نشست را عوض می‌کند.</DialogDescription><p data-test-id="document-collaboration-p-30">بررسی‌کننده: {version.review?.reviewer.name ?? samplePeople[0].name} <RoleBadge role="admin" /></p>{deciding ? <div data-test-id="document-collaboration-div-31" className="ws-formFields"><SelectField data-test-id="document-collaboration-selectfield-32" label="تصمیم نمونه" value={outcome} onValueChange={value => setOutcome(value as "approved" | "rejected")} options={[{ value: "approved", label: "تأیید محتوا" }, { value: "rejected", label: "رد محتوا" }]} /><TextareaField data-test-id="document-collaboration-textareafield-33" label="توضیح تصمیم" description={outcome === "rejected" ? "برای رد محتوا دلیل بنویسید." : "نوشتن توضیح اختیاری است."} required={outcome === "rejected"} value={reason} onValueChange={setReason} rows={3} maxLength={500} /></div> : <p data-test-id="document-collaboration-p-34" className="ws-formHint">آخرین محتوای ذخیره‌شده برای بررسی انتخاب می‌شود. هیچ اعلان یا پیامی برای شخصی ارسال نمی‌شود.</p>}<p data-test-id="document-collaboration-p-35" className="ws-privacyNote">تأیید محتوا دسترسی یا انتشار عمومی ایجاد نمی‌کند.</p>{error && <p data-test-id="document-collaboration-p-36" className="ws-formError" role="alert">{error}</p>}<div data-test-id="document-collaboration-div-37" className="ws-formButtons"><DialogClose data-test-id="document-collaboration-dialogclose-38" render={<Button data-test-id="document-collaboration-dialogclose-38" variant="outline" />}>انصراف</DialogClose><Button data-test-id="document-collaboration-button-40" onClick={commit}>{deciding ? "ثبت تصمیم نمونه" : "ثبت درخواست نمونه"}</Button></div></DialogContent></Dialog></>;
}

function ShareDialog({ document }: { document: IDocument }) {
  const { mutate } = useDocumentStore();
  const [personId, setPersonId] = useState(samplePeople[0].id);
  const [access, setAccess] = useState<"مشاهده" | "ویرایش">("مشاهده");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const recipientsHeadingRef = useRef<HTMLHeadingElement>(null);
  const recipients = document.recipients ?? [];
  function selectPerson(id: string) { setPersonId(id); setAccess(recipients.find(recipient => recipient.person.id === id)?.access ?? "مشاهده"); setError(""); setMessage(""); }
  function save() {
    try { mutate({ type: "set-recipient", id: document.id, personId, access }); setError(""); setMessage(`دسترسی نمونه ${samplePeople.find(person => person.id === personId)?.name} ثبت شد.`); } catch (cause) { setError((cause as Error).message); }
  }
  return <Dialog><DialogTrigger data-test-id="document-collaboration-dialogtrigger-41" render={<Button data-test-id="document-collaboration-dialogtrigger-41" variant="outline" onClick={() => { selectPerson(samplePeople[0].id); }} />}><Share2 aria-hidden="true" />مدیریت اشتراک نمونه</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog" showCloseButton={false}><DialogTitle>اشتراک نمونه «{document.title}»</DialogTitle><DialogDescription>فقط اشخاص ساختگی همین برنامه؛ هیچ دعوت، دسترسی واقعی یا پیوند عمومی ساخته نمی‌شود.</DialogDescription><div data-test-id="document-collaboration-div-43" className="ws-formFields"><SelectField data-test-id="document-collaboration-selectfield-44" label="شخص نمونه" value={personId} onValueChange={selectPerson} options={samplePeople.map(person => ({ value: person.id, label: person.name }))} /><SelectField data-test-id="document-collaboration-selectfield-45" label="سطح دسترسی نمونه" value={access} onValueChange={value => setAccess(value as "مشاهده" | "ویرایش")} options={[{ value: "مشاهده", label: "مشاهده" }, { value: "ویرایش", label: "ویرایش" }]} /><Button data-test-id="document-collaboration-button-46" onClick={save}>{recipients.some(recipient => recipient.person.id === personId) ? "ذخیره سطح دسترسی" : "افزودن گیرنده نمونه"}</Button></div>{error && <p data-test-id="document-collaboration-p-47" className="ws-formError" role="alert">{error}</p>}<p data-test-id="document-collaboration-p-48" className="ws-formHint" role="status">{message}</p><section data-test-id="document-collaboration-section-49" aria-label="گیرندگان فعلی"><h3 data-test-id="document-collaboration-h3-50" ref={recipientsHeadingRef} tabIndex={-1} className="ws-formHeading">گیرندگان فعلی · {fa(recipients.length)}</h3>{recipients.length ? <DocumentRecipients recipients={recipients} renderAction={recipient => <DestructiveDialog contentClassName="ws-confirmDialog" trigger={<Button data-test-id="document-collaboration-button-51" variant="destructive-outline" size="sm" aria-label={`حذف دسترسی ${recipient.person.name}`}>حذف</Button>} fallbackFocusRef={recipientsHeadingRef} title="حذف گیرنده نمونه؟" description="این شخص از فهرست گیرندگان ساختگی همین سند حذف می‌شود." targetName={recipient.person.name} confirmLabel="حذف گیرنده" onConfirm={() => { mutate({ type: "remove-recipient", id: document.id, personId: recipient.person.id }); setMessage(`گیرنده نمونه ${recipient.person.name} حذف شد.`); }} />} /> : <p data-test-id="document-collaboration-p-52" className="ws-formHint">هنوز گیرنده‌ای اضافه نشده است.</p>}</section><DialogClose data-test-id="document-collaboration-dialogclose-53" render={<Button data-test-id="document-collaboration-dialogclose-53" variant="outline" />}>بستن اشتراک</DialogClose></DialogContent></Dialog>;
}

export function DocumentCollaboration({ document }: { document: IDocument }) {
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const version = getDocumentVersions(document).at(-1)!;
  const manageable = canManageDocument(document, repositories, sampleUser.id);
  return <div data-test-id="document-collaboration-div-55" className="ws-collaboration"><section data-test-id="document-collaboration-section-56" className={cn("ws-collaborationCard", glass.panel)} aria-label="بررسی محتوا"><div data-test-id="document-collaboration-div-57" className="ws-sectionHeading" role="status"><h2 data-test-id="document-collaboration-h2-58" ref={reviewHeadingRef} tabIndex={-1}>بررسی محتوای نسخه {fa(version.number)}</h2><ApprovalBadge status={version.approval} /></div><p data-test-id="document-collaboration-p-59" className="ws-formHint">تأیید محتوا، آخرین نسخه و دسترسی سند مستقل‌اند.</p><ReviewDetails document={document} version={version} />{manageable ? <ReviewActions fallbackFocusRef={reviewHeadingRef} key={version.id} document={document} version={version} /> : <p data-test-id="document-collaboration-p-60" className="ws-formHint">این سند در سناریوی شما فقط خواندنی است؛ درخواست و تصمیم از اینجا ثبت نمی‌شود.</p>}</section><section data-test-id="document-collaboration-section-61" className={cn("ws-collaborationCard", glass.panel)} aria-label="اشتراک سند"><h2 data-test-id="document-collaboration-h2-62">اشتراک‌گذاری نمونه</h2><p data-test-id="document-collaboration-p-63" className="ws-formHint">{document.share ? `این سند توسط ${document.share.by.name} با دسترسی ${document.share.access} در اختیار شما قرار گرفته است.` : document.recipients?.length ? `با ${fa(document.recipients.length)} شخص ساختگی در این نشست به اشتراک گذاشته شده است.` : "گیرنده‌ای برای این سند ثبت نشده است."}</p>{manageable && <ShareDialog document={document} />}</section></div>;
}
