"use client";

import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailsSheet } from "@/components/ui/details-sheet";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { ApprovalBadge, LatestBadge } from "@/components/ui/status-badge";
import DocumentDetails from "@/components/workspace/document-details";
import { folders, repositories, sampleUser } from "@/lib/workspace/fixtures";
import { useDocumentStore } from "@/components/workspace/document-store";
import DocumentActions from "@/components/workspace/document-actions";
import TextEditor from "@/components/workspace/text-editor";
import { DocumentCollaboration, DocumentVersions } from "@/components/workspace/document-collaboration";
import { canManageDocument } from "@/lib/workspace/mutations";
import { folderPath, repositoryHref, safeReturnHref } from "@/lib/workspace/navigation";
import type { IDocument } from "@/interface/document";

export default function DocumentReader({ documentId }: { documentId: string }) {
  const { documents, deleted } = useDocumentStore();
  const document = documents.find(item => item.id === documentId);
  if (!document) return <section data-test-id="document-reader-section-1" className={cn("ws-empty", glass.panel)}><FileText size={32} aria-hidden="true" /><h1 data-test-id="document-reader-h1-2">{deleted.some(item => item.id === documentId) ? "این سند از فهرست حذف شده است" : "سند در این نشست پیدا نشد"}</h1><p data-test-id="document-reader-p-3">سندهای تازه فقط تا زمانی که صفحه دوباره بارگذاری نشود در همین نشست باقی می‌مانند.</p><Link data-test-id="document-reader-link-4" className="ws-textLink" href="/workspace/documents">بازگشت به اسناد من</Link></section>;
  return <DocumentReading key={document.id} document={document} />;
}

function DocumentReading({ document }: { document: IDocument }) {
  const params = useSearchParams();
  const back = safeReturnHref(params.get("from"));
  const repository = repositories.find(item => item.id === document.repositoryId)!;
  const path = folderPath(folders, repository.id, document.folderId) ?? [];
  const content = document.kind === "image" ? <figure data-test-id="document-reader-figure-5" className="ws-imagePreview"><Image src="/sample-content/workspace.svg" alt="طرح ساختگی فضای کار: نوار ناوبری، جست‌وجو و فهرست اسناد" width={1200} height={760} unoptimized /><figcaption data-test-id="document-reader-figcaption-6">تصویر نمونه · طرح مفهومی فضای کار</figcaption></figure> : document.kind === "pdf" ? <div data-test-id="document-reader-div-7" className="ws-pdfPreview"><p data-test-id="document-reader-p-8">گزارش ساختگی پژوهش کاربران · پیش‌نمایش صفحه اول</p><Image src="/sample-content/research-report.png" alt="صفحه اول گزارش ساختگی پژوهش: یافتن اسناد، درک زمینه و ادامه کار" width={707} height={1000} unoptimized /><a data-test-id="document-reader-a-9" href="/sample-content/research-report.pdf" target="_blank" rel="noopener noreferrer" className="ws-textLink">بازکردن PDF در صفحه جداگانه</a></div> : <article data-test-id="document-reader-article-10" className="ws-readingPaper"><p data-test-id="document-reader-p-11" className="ws-eyebrow">یادداشت نمونه · کلاسور</p><h2 data-test-id="document-reader-h2-12">{document.title}</h2><p data-test-id="document-reader-p-13" className="ws-lead">{document.description}</p><hr data-test-id="document-reader-hr-14" /><h3 data-test-id="document-reader-h3-15">از دانسته‌ها به تصمیم‌های روشن</h3><p data-test-id="document-reader-p-16">یک سند خوب، زمینه را روشن می‌کند. هدف این یادداشت ثبت دانسته‌ها، دلیل تصمیم‌ها و قدم بعدی است؛ تا هر بار برای ادامه کار از ابتدا شروع نکنیم.</p><blockquote data-test-id="document-reader-blockquote-17">هر ایده در جای خودش، هر تصمیم با زمینه‌ای روشن.</blockquote><h3 data-test-id="document-reader-h3-18">چطور این سند را مرور کنیم؟</h3><ul data-test-id="document-reader-ul-19"><li data-test-id="document-reader-li-20">ابتدا هدف و زمینه موضوع را بخوانید.</li><li data-test-id="document-reader-li-21">تصمیم‌ها را با نیازهای پروژه تطبیق دهید.</li><li data-test-id="document-reader-li-22">قدم بعدی و مسئول پیگیری را مشخص کنید.</li></ul><p data-test-id="document-reader-p-23" className="ws-sampleNote">این محتوا برای نمایش تجربه مطالعه ساخته شده است.</p></article>;
  return <>
    <nav data-test-id="document-reader-nav-24" className="ws-breadcrumb" aria-label="مسیر سند"><Link data-test-id="document-reader-link-25" href="/workspace/repositories">مخزن‌ها</Link><span data-test-id="document-reader-span-26">/</span><Link data-test-id="document-reader-link-27" href={repositoryHref(repository.id)}>{repository.name}</Link>{path.map(folder => <span data-test-id={`document-reader-span-28-${String(folder.id)}`} key={folder.id}> / <Link data-test-id={`document-reader-link-29-${String(folder.id)}`} href={repositoryHref(repository.id, folder.id)}>{folder.name}</Link></span>)}</nav>
    <div data-test-id="document-reader-div-30" className="ws-pageHeading"><div data-test-id="document-reader-div-31"><p data-test-id="document-reader-p-32" className="ws-eyebrow">فضای مطالعه</p><h1 data-test-id="document-reader-h1-33">{document.title}</h1><p data-test-id="document-reader-p-34" className="ws-subtitle">محتوای نمونه · {document.share ? `اشتراک‌گذاشته‌شده توسط ${document.share.by.name}` : repository.name}</p></div><Link data-test-id="document-reader-link-35" className={cn("ws-backLink", glass.panel)} href={back}><ArrowRight size={18} aria-hidden="true" />بازگشت به فهرست</Link></div>
    <div data-test-id="document-reader-div-36" className="ws-documentToolbar">{document.kind === "text" && canManageDocument(document, repositories, sampleUser.id) && <TextEditor document={document} />}<DocumentActions document={document} back={back} /></div>
    <div data-test-id="document-reader-div-37" className="ws-readerLayout"><section data-test-id="document-reader-section-38" className={cn("ws-reader", glass.panel)}><div data-test-id="document-reader-div-39" className="ws-readerHeader"><span data-test-id="document-reader-span-40"><FileText size={18} aria-hidden="true" />{document.kind === "pdf" ? "PDF" : document.kind === "image" ? "تصویر" : "متن"}</span><div data-test-id="document-reader-div-41" className="ws-versionHeader"><LatestBadge status="latest" /><ApprovalBadge status={document.approval} /></div></div><ClasorTabs label="بخش‌های سند" defaultValue="content" items={[{ value: "content", label: "محتوا", content: document.kind === "text" && document.content !== undefined ? <article data-test-id="document-reader-article-42" className="ws-readingPaper"><h2 data-test-id="document-reader-h2-43">{document.title}</h2><p data-test-id="document-reader-p-44" className="ws-plainText">{document.content || "هنوز متنی در این سند نوشته نشده است."}</p></article> : content }, { value: "versions", label: "نسخه‌ها", content: <DocumentVersions document={document} /> }, { value: "collaboration", label: "تأیید و اشتراک", content: <DocumentCollaboration document={document} /> }]} /></section>
      <aside data-test-id="document-reader-aside-45" className={cn("ws-readerAside", glass.panel)}><h2 data-test-id="document-reader-h2-46">درباره این سند</h2><DocumentDetails document={document} /></aside>
      <div data-test-id="document-reader-div-47" className="ws-readerMobileInfo"><DetailsSheet title="درباره این سند" description={document.title} trigger={<Button data-test-id="document-reader-button-48" variant="outline"><Info aria-hidden="true" />اطلاعات سند</Button>}><DocumentDetails document={document} /></DetailsSheet></div>
    </div>
  </>;
}
