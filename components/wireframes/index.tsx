"use client";

import { wireframeNavigation } from "@/components/wireframes/wireframe-styles";
import { cn } from "@/lib/utils";
import { GlassSurfaceContext } from "@/components/ui/glass-surface-context";
import { glass } from "@/lib/design-system/classes";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, FileImage, FileText, Folder, FolderOpen, Info, Layers, LayoutGrid, List, LockKeyhole, Menu, PanelRightClose, PanelRightOpen, Plus, Search, SlidersHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchField, TextField } from "@/components/ui/text-field";
import { CreationStepper } from "@/components/ui/creation-stepper";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectField } from "@/components/ui/select-field";
import { ApprovalBadge } from "@/components/ui/status-badge";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { DetailsSheet } from "@/components/ui/details-sheet";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { documents, folders, normalizeSearch, repositories, type SampleDocument, type WireframeView } from "@/lib/wireframes/sample";
import "./wireframes.css";

const fa = (value: number) => new Intl.NumberFormat("fa").format(value);
const viewTitles = { documents: "اسناد من", shared: "اشتراک‌گذاری‌شده با من", repositories: "مخزن‌ها", repository: "محتوای مخزن", document: "سند" };
const navigation = [
  { id: "documents", title: "اسناد من", icon: FileText },
  { id: "shared", title: "اشتراکی‌ها", icon: Users },
  { id: "repositories", title: "مخزن‌ها", icon: Layers },
] as const;

function DocumentIcon({ type }: { type: SampleDocument["type"] }) {
  const Icon = type === "تصویر" ? FileImage : FileText;
  return <span data-test-id="index-span-1" className="wf-fileIcon" data-type={type}><Icon aria-hidden="true" size={21} /></span>;
}

function DocumentDetails({ document }: { document: SampleDocument }) {
  const repo = repositories.find(item => item.id === document.repoId)!;
  return <dl data-test-id="index-dl-2" className="wf-metadata">
    <div data-test-id="index-div-3"><dt data-test-id="index-dt-4">نام سند</dt><dd data-test-id="index-dd-5">{document.title}</dd></div>
    <div data-test-id="index-div-6"><dt data-test-id="index-dt-7">مخزن</dt><dd data-test-id="index-dd-8">{repo.name}</dd></div>
    <div data-test-id="index-div-9"><dt data-test-id="index-dt-10">سازنده</dt><dd data-test-id="index-dd-11">{document.owner}</dd></div>
    <div data-test-id="index-div-12"><dt data-test-id="index-dt-13">آخرین تغییر</dt><dd data-test-id="index-dd-14">{document.updated}</dd></div>
    <div data-test-id="index-div-15"><dt data-test-id="index-dt-16">نوع محتوا</dt><dd data-test-id="index-dd-17">{document.type}</dd></div>
    <div data-test-id="index-div-18"><dt data-test-id="index-dt-19">دسترسی نمونه</dt><dd data-test-id="index-dd-20">{document.shared ? "اشتراکی با اعضای تیم" : "خصوصی"}</dd></div>
  </dl>;
}

function CreatePlacement({ destination }: { destination: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("متن ساده");
  const stepHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (open) stepHeading.current?.focus(); }, [open, step]);
  return <Dialog open={open} onOpenChange={value => { setOpen(value); if (value) { setStep(0); setTitle(""); setKind("متن ساده"); } }}><DialogTrigger data-test-id="index-dialogtrigger-21" render={<Button data-test-id="index-dialogtrigger-21" />}><Plus aria-hidden="true" />ایجاد سند</DialogTrigger>
    <DialogContent dir="rtl" className="wf-createDialog">
      <DialogTitle>ایجاد سند تازه</DialogTitle>
      <DialogDescription>عنوان و نوع سند را مشخص کنید؛ محل ایجاد، همین مسیر فعلی است.</DialogDescription>
      <p data-test-id="index-p-23" className="wf-destination"><span data-test-id="index-span-24">محل ایجاد سند</span><strong data-test-id="index-strong-25">{destination}</strong></p>
      <CreationStepper steps={[{ id: "title", label: "عنوان و نوع" }, { id: "review", label: "بازبینی" }]} currentStep={step} onStepChange={setStep} canContinue={Boolean(title.trim())} onCommit={() => setOpen(false)} commitLabel="پایان پیش‌نمایش">
        <div data-test-id="index-div-26" className="wf-createFields"><h3 data-test-id="index-h3-27" ref={stepHeading} tabIndex={-1}>{step === 0 ? "چه سندی می‌سازید؟" : "بازبینی سند"}</h3>{step === 0 ? <><TextField data-test-id="index-textfield-28" label="عنوان سند (الزامی)" value={title} onValueChange={setTitle} maxLength={180} placeholder="مثلاً یادداشت جلسه طراحی" /><SelectField data-test-id="index-selectfield-29" label="نوع محتوا" value={kind} onValueChange={setKind} options={[{ value: "متن ساده", label: "متن ساده" }, { value: "PDF نمونه", label: "PDF نمونه" }, { value: "تصویر نمونه", label: "تصویر نمونه" }]} /></> : <dl data-test-id="index-dl-30" className="wf-createReview"><div data-test-id="index-div-31"><dt data-test-id="index-dt-32">عنوان</dt><dd data-test-id="index-dd-33">{title.trim()}</dd></div><div data-test-id="index-div-34"><dt data-test-id="index-dt-35">نوع محتوا</dt><dd data-test-id="index-dd-36">{kind}</dd></div><div data-test-id="index-div-37"><dt data-test-id="index-dt-38">محل ایجاد</dt><dd data-test-id="index-dd-39">{destination}</dd></div></dl>}<p data-test-id="index-p-40" className="wf-muted">این پیش‌نمایش طراحی است؛ سند یا فایل واقعی ذخیره نمی‌شود.</p></div>
      </CreationStepper>
      <DialogClose data-test-id="index-dialogclose-41" render={<Button data-test-id="index-dialogclose-41" variant="ghost" />}>انصراف از ایجاد</DialogClose>
    </DialogContent>
  </Dialog>;
}

export default function Wireframes() {
  const [view, setView] = useState<WireframeView>("documents");
  const [repoId, setRepoId] = useState("team");
  const [folderId, setFolderId] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState("guide");
  const [returnView, setReturnView] = useState<WireframeView>("documents");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [empty, setEmpty] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const filterId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const initialView = useRef(true);
  useEffect(() => {
    if (initialView.current) { initialView.current = false; return; }
    headingRef.current?.focus();
  }, [view, folderId]);

  const repo = repositories.find(item => item.id === repoId)!;
  const currentFolder = folders.find(item => item.id === folderId);
  const creationDestination = view === "repository" ? [repo.name, currentFolder?.parentId ? folders.find(item => item.id === currentFolder.parentId)?.name : null, currentFolder?.name].filter(Boolean).join(" / ") : "فضای شخصی";
  const document = documents.find(item => item.id === documentId)!;
  const title = view === "repository" ? (currentFolder?.name ?? repo.name) : view === "document" ? document.title : viewTitles[view];
  const activeNav = view === "document" ? returnView : view;
  const scopedDocuments = documents.filter(item => view === "shared" ? item.shared : view === "repository" ? item.repoId === repoId && item.folderId === folderId : item.repoId === "personal");
  const visibleDocuments = empty ? [] : scopedDocuments.filter(item => normalizeSearch(item.title).includes(normalizeSearch(query)) && (type === "all" || item.type === type));
  const visibleFolders = empty || query || type !== "all" || view !== "repository" ? [] : folders.filter(item => item.repoId === repoId && item.parentId === folderId);
  const isList = view === "documents" || view === "shared" || view === "repository";

  function navigate(next: WireframeView) {
    setView(next); setMobileOpen(false); setQuery(""); setType("all"); setEmpty(false); setPreviewLoading(false); setFiltersOpen(false);
  }
  function openDocument(item: SampleDocument) {
    setReturnView(view); setDocumentId(item.id); setView("document");
  }
  function openRepository(id: string) {
    setRepoId(id); setFolderId(null); navigate("repository");
  }
  function openFolder(id: string | null) {
    setFolderId(id); setQuery(""); setType("all"); setEmpty(false); setPreviewLoading(false);
  }
  function navContent(closeMobile = false) {
    return <>
      <div data-test-id="index-div-43" className="wf-brand"><span data-test-id="index-span-44" className="wf-brandMark"><Layers aria-hidden="true" size={24} /></span><div data-test-id="index-div-45"><strong data-test-id="index-strong-46">کلاسور</strong><span data-test-id="index-span-47">فضایی برای اسناد شما</span></div></div>
      <p data-test-id="index-p-48" className="wf-navLabel">فضای کار</p>
      <nav data-test-id="index-nav-49" aria-label={closeMobile ? "ناوبری موبایل" : "ناوبری اصلی"} className={cn("wf-nav", wireframeNavigation)}>
        {navigation.map(item => <button className={cn(glass.interaction)} data-test-id={`index-button-50-${String(item.id)}`} key={item.id} aria-label={item.title} title={item.title} aria-current={(activeNav === item.id || (activeNav === "repository" && item.id === "repositories")) ? "page" : undefined} onClick={() => navigate(item.id)}><item.icon data-test-id={`index-item-icon-51-${String(item.id)}`} size={20} aria-hidden="true" /><span data-test-id={`index-span-52-${String(item.id)}`} className="wf-navText">{item.title}</span>{item.id === "shared" && <span data-test-id={`index-span-53-${String(item.id)}`} className="wf-navCount">۳</span>}</button>)}
      </nav>
      <div data-test-id="index-div-54" className="wf-sidebarNote"><BookOpen size={19} aria-hidden="true" /><strong data-test-id="index-strong-55">از یک سند شروع می‌شود.</strong><p data-test-id="index-p-56">ایده‌ها، تصمیم‌ها و دانسته‌ها؛ همه در یک جای آشنا.</p></div>
      <div data-test-id="index-div-57" className="wf-profile"><span data-test-id="index-span-58" className="wf-avatar">ن</span><div data-test-id="index-div-59"><strong data-test-id="index-strong-60">نیلوفر احمدی</strong><span data-test-id="index-span-61">حساب نمونه</span></div><LockKeyhole size={16} aria-hidden="true" /></div>
    </>;
  }

  return <div data-test-id="index-div-62" className={cn("wf-wireframe", glass.canvas)}>
    <a data-test-id="index-a-63" href="#wireframe-main" className="wf-skip">رفتن به محتوای اصلی</a>
    <div data-test-id="index-div-64" className="wf-reviewBar"><div data-test-id="index-div-65"><span data-test-id="index-span-66" className="wf-reviewDot" /><strong data-test-id="index-strong-67">طرح تعاملی</strong><span data-test-id="index-span-68" className="wf-reviewSub">سیستم طراحی ۰٫۲ · چیدمان و مسیرها</span></div><Link data-test-id="index-link-69" href="/">کتابخانه طراحی <ArrowLeft size={14} aria-hidden="true" /></Link></div>
    <div data-test-id="index-div-70" className={cn("wf-shell", glass.panel)} data-sidebar-open={sidebarOpen}>
      <GlassSurfaceContext.Provider value>
      <aside data-test-id="index-aside-71" id="wireframe-sidebar" aria-label="فهرست فضای کار" className={cn("wf-sidebar", glass.contentSurface)} data-material-surface="chrome">{navContent()}</aside>
      <div data-test-id="index-div-72" className="wf-workspace">
        <header data-test-id="index-header-73" className={cn("wf-topbar", glass.contentSurface)} data-material-surface="chrome">
          <div data-test-id="index-div-74" className="wf-topbarStart"><Button data-test-id="index-button-75" className="wf-sidebarToggle" variant="ghost" size="icon" aria-label={sidebarOpen ? "بستن سایدبار" : "بازکردن سایدبار"} title={sidebarOpen ? "بستن سایدبار" : "بازکردن سایدبار"} aria-controls="wireframe-sidebar" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(open => !open)}>{sidebarOpen ? <PanelRightClose data-test-id="index-panelrightclose-76" aria-hidden="true" /> : <PanelRightOpen aria-hidden="true" />}</Button><div data-test-id="index-div-77" className="wf-mobileMenu"><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger data-test-id="index-sheettrigger-78" render={<Button data-test-id="index-sheettrigger-78" variant="ghost" size="icon" aria-label="بازکردن فهرست" />}><Menu aria-hidden="true" /></SheetTrigger><SheetContent side="right" dir="rtl" className="wf-mobileSheet w-[min(320px,100vw)] overflow-y-auto p-5"><SheetTitle className="sr-only">فهرست فضای کار</SheetTitle><SheetDescription className="sr-only">انتخاب بخش مدیریت اسناد</SheetDescription>{navContent(true)}<SheetClose data-test-id="index-sheetclose-80" render={<Button data-test-id="index-sheetclose-80" variant="outline" />}>بستن فهرست</SheetClose></SheetContent></Sheet></div><span data-test-id="index-span-82" className="wf-topbarPath">فضای کار <ChevronLeft size={14} aria-hidden="true" /> {view === "document" ? "مشاهده سند" : viewTitles[view]}</span></div>
          <span data-test-id="index-span-83" className="wf-sessionNote"><span data-test-id="index-span-84" />داده‌های ساختگی</span>
        </header>
        <main data-test-id="index-main-85" id="wireframe-main" className="wf-main">
          <div data-test-id="index-div-86" className="wf-pageHeading">
            <div data-test-id="index-div-87"><p data-test-id="index-p-88" className="wf-eyebrow">{view === "documents" ? "کتابخانه شخصی شما" : view === "shared" ? "همکاری، با زمینه روشن" : view === "document" ? "فضای مطالعه" : "نظم مشترک"}</p><h1 data-test-id="index-h1-89" tabIndex={-1} ref={headingRef}>{title}</h1><p data-test-id="index-p-90" className="wf-subtitle">{view === "documents" ? "فکرهای امروز، مرجع‌های فردا. اسنادتان را اینجا پیدا کنید." : view === "shared" ? "اسنادی که دیگران برای همکاری یا مطالعه در اختیارتان گذاشته‌اند." : view === "repositories" ? "هر پروژه، یک فضای مشخص برای نگهداری و همکاری." : view === "repository" ? repo.description : document.excerpt}</p></div>
            {view === "document" ? <Button data-test-id="index-button-91" variant="outline" onClick={() => setView(returnView)}><ArrowRight aria-hidden="true" />بازگشت به فهرست</Button> : view !== "repositories" && view !== "shared" && <CreatePlacement destination={creationDestination} />}
          </div>

          {view === "repository" && <nav data-test-id="index-nav-92" className="wf-breadcrumb" aria-label="مسیر مخزن"><button className={cn(glass.interaction)} data-test-id="index-button-93" onClick={() => navigate("repositories")}>مخزن‌ها</button><ChevronLeft aria-hidden="true" size={14} /><button className={cn(glass.interaction)} data-test-id="index-button-94" onClick={() => openFolder(null)} aria-current={!folderId ? "page" : undefined}>{repo.name}</button>{currentFolder?.parentId && <><ChevronLeft aria-hidden="true" size={14} /><button className={cn(glass.interaction)} data-test-id="index-button-95" onClick={() => openFolder(currentFolder.parentId)}>برنامه‌ریزی</button></>}{currentFolder && <><ChevronLeft aria-hidden="true" size={14} /><span data-test-id="index-span-96" aria-current="page">{currentFolder.name}</span></>}</nav>}

          {isList && <>
            <div data-test-id="index-div-97" className={cn("wf-toolbar", glass.contentSurface)}><div data-test-id="index-div-98" className="wf-search"><SearchField data-test-id="index-searchfield-99" label={view === "repository" ? "جست‌وجو در این پوشه" : "جست‌وجو در این فهرست"} placeholder="نام سند را جست‌وجو کنید…" value={query} onValueChange={setQuery} /><Search size={18} aria-hidden="true" /></div><Button data-test-id="index-button-100" variant="outline" aria-expanded={filtersOpen} aria-controls={filterId} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal aria-hidden="true" />فیلترها{type !== "all" && " (۱)"}</Button><div data-test-id="index-div-101" id={filterId} hidden={!filtersOpen} className="wf-filter"><SelectField data-test-id="index-selectfield-102" label="نوع سند" value={type} onValueChange={setType} options={[{ value: "all", label: "همه نوع‌ها" }, { value: "متن", label: "متن" }, { value: "PDF", label: "PDF" }, { value: "تصویر", label: "تصویر" }]} /></div></div>
            <div data-test-id="index-div-103" className="wf-listSummary"><p data-test-id="index-p-104" role="status">{previewLoading ? "در حال بارگذاری اسناد…" : <>{fa(visibleDocuments.length)} سند{visibleFolders.length > 0 ? ` و ${fa(visibleFolders.length)} پوشه` : ""}{query && <> برای «{query}»</>}</>}</p><span data-test-id="index-span-105"><List size={15} aria-hidden="true" />نمای فهرست</span></div>
            {!previewLoading && visibleFolders.length > 0 && <div data-test-id="index-div-106" className="wf-folderGrid">{visibleFolders.map(folder => <button className={cn(glass.interaction)} data-test-id={`index-button-107-${String(folder.id)}`} key={folder.id} onClick={() => openFolder(folder.id)}><Folder size={26} aria-hidden="true" /><div data-test-id={`index-div-108-${String(folder.id)}`}><strong data-test-id={`index-strong-109-${String(folder.id)}`}>{folder.name}</strong><span data-test-id={`index-span-110-${String(folder.id)}`}>{folder.description}</span></div><ChevronLeft size={18} aria-hidden="true" /></button>)}</div>}
            {previewLoading ? <div data-test-id="index-div-111" className={cn("wf-loading", glass.contentSurface)} role="status" aria-label="پیش‌نمایش بارگذاری اسناد" aria-busy="true"><span data-test-id="index-span-112" className="sr-only">در حال بارگذاری اسناد…</span><div data-test-id="index-div-113" aria-hidden="true">{Array.from({ length: 4 }, (_, index) => <div data-test-id={`index-div-114-${String(index)}`} className="wf-skeletonRow" key={index}><Skeleton className="h-9 w-8 shrink-0 motion-reduce:animate-none" /><div data-test-id={`index-div-115-${String(index)}`}><Skeleton className="h-3 w-3/4 motion-reduce:animate-none" /><Skeleton className="h-2 w-1/2 motion-reduce:animate-none" /></div><Skeleton className="h-4 w-14 shrink-0 motion-reduce:animate-none" /></div>)}</div></div> : visibleDocuments.length > 0 ? <div data-test-id="index-div-116" className={cn("wf-documentList", glass.contentSurface)}>
              <div data-test-id="index-div-117" className="wf-tableHeader" aria-hidden="true"><span data-test-id="index-span-118">نام سند</span><span data-test-id="index-span-119">وضعیت محتوا</span><span data-test-id="index-span-120">آخرین تغییر</span><span data-test-id="index-span-121">اطلاعات</span></div>
              <ul data-test-id="index-ul-122" aria-label="فهرست اسناد">{visibleDocuments.map(item => <li data-test-id={`index-li-123-${String(item.id)}`} key={item.id} className="wf-documentRow">
                <button data-test-id={`index-button-124-${String(item.id)}`} className={cn("wf-documentName", glass.interaction)} onClick={() => openDocument(item)}><DocumentIcon type={item.type} /><span data-test-id={`index-span-125-${String(item.id)}`}><strong data-test-id={`index-strong-126-${String(item.id)}`}>{item.title}</strong><span data-test-id={`index-span-127-${String(item.id)}`}>{item.type} <i data-test-id={`index-i-128-${String(item.id)}`}>·</i> {view === "shared" ? `از ${item.owner}` : repositories.find(repository => repository.id === item.repoId)!.name}</span></span></button>
                <div data-test-id={`index-div-129-${String(item.id)}`} className="wf-rowStatus"><ApprovalBadge status={item.status} /></div><span data-test-id={`index-span-130-${String(item.id)}`} className="wf-rowDate">{item.updated}</span>
                <DetailsSheet title="اطلاعات سند" description={item.title} trigger={<Button data-test-id={`index-button-131-${String(item.id)}`} variant="ghost" size="icon" aria-label={`اطلاعات ${item.title}`}><Info aria-hidden="true" /></Button>}><DocumentDetails document={item} /></DetailsSheet>
              </li>)}</ul>
            </div> : visibleFolders.length === 0 && <section data-test-id="index-section-132" className={cn("wf-empty", glass.contentSurface)}><span data-test-id="index-span-133"><FolderOpen size={32} aria-hidden="true" /></span><h2 data-test-id="index-h2-134">{query || type !== "all" ? "سندی با این مشخصات پیدا نشد" : view === "shared" ? "هنوز سندی با شما به اشتراک گذاشته نشده" : "این فضا منتظر اولین سند شماست"}</h2><p data-test-id="index-p-135">{query || type !== "all" ? "یک عبارت دیگر امتحان کنید یا فیلترها را بردارید." : view === "shared" ? "وقتی سندی در اختیارتان قرار بگیرد، اینجا نمایش داده می‌شود." : "یک یادداشت، یک ایده یا یک فایل؛ نقطه شروع با شماست."}</p>{query || type !== "all" ? <Button data-test-id="index-button-136" variant="outline" onClick={() => { setQuery(""); setType("all"); }}>پاک‌کردن جست‌وجو و فیلتر</Button> : view !== "shared" && <CreatePlacement destination={creationDestination} />}</section>}
            <p data-test-id="index-p-137" className="wf-listFootnote"><LockKeyhole size={14} aria-hidden="true" />{view === "shared" ? "اشتراک‌گذاری به معنی عمومی بودن سند نیست." : "وضعیت تأیید محتوا، مستقل از دسترسی به سند است."}</p>
          </>}

          {view === "repositories" && <><div data-test-id="index-div-138" className="wf-sectionLabel"><h2 data-test-id="index-h2-139">فضاهای در دسترس شما</h2><span data-test-id="index-span-140">{fa(empty ? 0 : repositories.length)} مخزن <LayoutGrid size={15} aria-hidden="true" /></span></div>{empty ? <section data-test-id="index-section-141" className={cn("wf-empty", glass.contentSurface)}><Layers size={32} aria-hidden="true" /><h2 data-test-id="index-h2-142">هنوز مخزنی در این فهرست نیست</h2><p data-test-id="index-p-143">مخزن‌های شخصی و تیمی شما اینجا قرار می‌گیرند.</p></section> : <div data-test-id="index-div-144" className="wf-repositoryGrid">{repositories.map(item => <button data-test-id={`index-button-145-${String(item.id)}`} key={item.id} className={cn("wf-repositoryCard", glass.contentSurface, glass.interaction)} onClick={() => openRepository(item.id)}><div data-test-id={`index-div-146-${String(item.id)}`} className="wf-repositoryCardTop"><span data-test-id={`index-span-147-${String(item.id)}`} className="wf-repoIcon"><Layers size={25} aria-hidden="true" /></span><span data-test-id={`index-span-148-${String(item.id)}`} className="wf-role">{item.role}</span></div><h2 data-test-id={`index-h2-149-${String(item.id)}`}>{item.name}</h2><p data-test-id={`index-p-150-${String(item.id)}`}>{item.description}</p><div data-test-id={`index-div-151-${String(item.id)}`} className="wf-repositoryFooter"><span data-test-id={`index-span-152-${String(item.id)}`}>{fa(item.count)} سند <i data-test-id={`index-i-153-${String(item.id)}`}>·</i> {item.owner}</span><ArrowLeft size={18} aria-hidden="true" /></div></button>)}</div>}<div data-test-id="index-div-154" className="wf-quietNote"><Info size={18} aria-hidden="true" /><p data-test-id="index-p-155">مخزن با پوشه فرق دارد؛ هر مخزن، اعضا و فضای همکاری خودش را دارد.</p></div></>}

          {view === "document" && <div data-test-id="index-div-156" className="wf-readerLayout">
            <section data-test-id="index-section-157" className={cn("wf-reader", glass.contentSurface)}><div data-test-id="index-div-158" className="wf-readerTop"><span data-test-id="index-span-159"><DocumentIcon type={document.type} />{document.type}</span><ApprovalBadge status={document.status} /></div>
              <ClasorTabs label="بخش‌های سند" defaultValue="content" items={[
                { value: "content", label: "محتوا", content: <article data-test-id="index-article-160" className="wf-paper"><p data-test-id="index-p-161" className="wf-paperOverline">کلاسور / سند نمونه</p><h2 data-test-id="index-h2-162">{document.title}</h2><p data-test-id="index-p-163" className="wf-paperLead">{document.excerpt}</p><hr data-test-id="index-hr-164" /><h3 data-test-id="index-h3-165">یک مسیر روشن برای شروع</h3><p data-test-id="index-p-166">اسناد زمانی ارزشمند می‌شوند که پیدا کردن، خواندن و ادامه دادنشان آسان باشد. این صفحه نمونه‌ای از فضای مطالعه است؛ محتوای آن برای بررسی چیدمان ساخته شده است.</p><blockquote data-test-id="index-blockquote-167">یک جای مشخص برای هر ایده، یک زمینه روشن برای هر تصمیم.</blockquote><h3 data-test-id="index-h3-168">قدم‌های بعدی</h3><ul data-test-id="index-ul-169"><li data-test-id="index-li-170">هدف و زمینه سند را در ابتدای آن روشن کنیم.</li><li data-test-id="index-li-171">تصمیم‌ها را همراه با دلیل و قدم بعدی ثبت کنیم.</li><li data-test-id="index-li-172">نسخه‌ها و اطلاعات تکمیلی را در دسترس نگه داریم.</li></ul>{document.type !== "متن" && <p data-test-id="index-p-173" className="wf-previewNote">این قاب جای پیش‌نمایش {document.type} است؛ فایل واقعی در مرحله ساخت نمونه افزوده می‌شود.</p>}</article> },
                { value: "versions", label: "نسخه‌ها", content: <div data-test-id="index-div-174" className="wf-tabPreview"><span data-test-id="index-span-175" className="wf-outlineIcon"><Layers aria-hidden="true" /></span><h2 data-test-id="index-h2-176">تاریخچه، کنار محتوای سند</h2><p data-test-id="index-p-177">در این قسمت نسخه‌ها، پیش‌نویس‌ها و مبنای نسخه تازه نمایش داده می‌شوند.</p><div data-test-id="index-div-178" className="wf-versionPlacement"><Check size={18} aria-hidden="true" /><strong data-test-id="index-strong-179">جایگاه ردیف آخرین نسخه</strong><span data-test-id="index-span-180">شماره · زمان · سازنده</span></div><p data-test-id="index-p-181" className="wf-muted">این نمای جانمایی است؛ مدیریت نسخه در مرحله همکاری ساخته می‌شود.</p></div> },
                { value: "activity", label: "فعالیت‌ها", content: <div data-test-id="index-div-182" className="wf-tabPreview"><span data-test-id="index-span-183" className="wf-outlineIcon"><Users aria-hidden="true" /></span><h2 data-test-id="index-h2-184">هر تغییر، با زمینه مشخص</h2><p data-test-id="index-p-185">اینجا رویدادهای ایجاد، ویرایش و تصمیم‌ها با نام شخص و زمان قرار می‌گیرند.</p><p data-test-id="index-p-186" className="wf-muted">هنوز رویداد عملیاتی ثبت نشده؛ این بخش برای بررسی جایگاه اطلاعات است.</p></div> },
              ]} />
            </section>
            <aside data-test-id="index-aside-187" className={cn("wf-documentAside", glass.contentSurface)}><div data-test-id="index-div-188" className="wf-infoHeading"><h2 data-test-id="index-h2-189">درباره این سند</h2><Info size={18} aria-hidden="true" /></div><DocumentDetails document={document} /><div data-test-id="index-div-190" className="wf-contextNote"><LockKeyhole size={17} aria-hidden="true" /><p data-test-id="index-p-191">تأیید محتوا به معنی انتشار عمومی آن نیست.</p></div></aside>
            <div data-test-id="index-div-192" className="wf-mobileDetails"><DetailsSheet title="درباره این سند" description={document.title} trigger={<Button data-test-id="index-button-193" variant="outline"><Info aria-hidden="true" />درباره این سند</Button>}><DocumentDetails document={document} /></DetailsSheet></div>
          </div>}
          <footer data-test-id="index-footer-194" className="wf-designReview"><div data-test-id="index-div-195"><span data-test-id="index-span-196" className="wf-stepLabel">۰٫۲</span><p data-test-id="index-p-197"><strong data-test-id="index-strong-198">بررسی ساختار و ظاهر</strong><span data-test-id="index-span-199">این پیش‌نمایش ذخیره‌سازی یا اشتراک‌گذاری واقعی ندارد.</span></p></div>{view !== "document" && <div data-test-id="index-div-200" className="wf-previewActions">{isList && <Button data-test-id="index-button-201" variant="outline" size="sm" aria-pressed={previewLoading} onClick={() => { setPreviewLoading(!previewLoading); setEmpty(false); }}>{previewLoading ? "پایان پیش‌نمایش بارگذاری" : "بررسی بارگذاری"}</Button>}<Button data-test-id="index-button-202" variant="outline" size="sm" aria-pressed={empty} onClick={() => { setEmpty(!empty); setPreviewLoading(false); }}>{empty ? "نمایش داده نمونه" : "بررسی حالت خالی"}</Button></div>}</footer>
          <p data-test-id="index-p-203" className="wf-prototypeLink">فهرست‌های این طرح کوتاه‌اند؛ در <Link data-test-id="index-link-204" href="/workspace/documents">نمونه پنل</Link>، دسته‌های بعدی با اسکرول و skeleton خودکار بارگذاری می‌شوند.</p>
        </main>
      </div>
      </GlassSurfaceContext.Provider>
    </div>
  </div>;
}
