"use client";

import { workspaceStyles } from "@/components/workspace/workspace-styles";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowDownUp, ArrowLeft, FileSearch, FileText, FolderOpen, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Feedback } from "@/components/ui/feedback";
import ListSkeleton from "@/components/workspace/list-skeleton";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import DocumentList from "@/components/workspace/document-list";
import DocumentDetails from "@/components/workspace/document-details";
import LoadMore from "@/components/workspace/load-more";
import { defaultFilters, getDocumentResults, kindLabels, LIST_BATCH_SIZE } from "@/lib/workspace/documents";
import { personalRepositoryId } from "@/lib/workspace/fixtures";
import { useDocumentStore } from "@/components/workspace/document-store";
import CreateDocumentDialog from "@/components/workspace/create-document-dialog";
import { getSharedDocuments, repositoryHref } from "@/lib/workspace/navigation";
import { useListSession } from "@/components/workspace/list-session";
import type { IDocumentFilters, ListScenario } from "@/interface/workspace";

const fa = (value: number) => new Intl.NumberFormat("fa").format(value);
const approvalOptions = [{ value: "all", label: "همه وضعیت‌ها" }, { value: "draft", label: "پیش‌نویس" }, { value: "pending", label: "در انتظار تأیید" }, { value: "approved", label: "تأییدشده" }, { value: "rejected", label: "ردشده" }];
const sortOptions = [{ value: "updated-desc", label: "تازه‌ترین تغییر" }, { value: "updated-asc", label: "قدیمی‌ترین تغییر" }, { value: "title-asc", label: "نام: الف تا ی" }, { value: "title-desc", label: "نام: ی تا الف" }];

export default function PersonalDocuments({ scope = "personal", repositoryId = personalRepositoryId, folderId = null, title, breadcrumb, foldersContent }: {
  scope?: "personal" | "shared" | "repository";
  repositoryId?: string;
  folderId?: string | null;
  title?: string;
  breadcrumb?: ReactNode;
  foldersContent?: ReactNode;
}) {
  const listHref = scope === "personal" ? "/workspace/documents" : scope === "shared" ? "/workspace/shared" : repositoryHref(repositoryId, folderId);
  const { documents: sampleDocuments } = useDocumentStore();
  const { filters, setFilters, selectedIds, setSelectedIds, scenario, setScenario } = useListSession(listHref);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const filterFieldsId = useId();
  const selectionScopeId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const source = scope === "shared" ? getSharedDocuments(sampleDocuments) : scope === "repository" ? sampleDocuments.filter(document => document.repositoryId === repositoryId && document.folderId === folderId) : sampleDocuments.filter(document => document.repositoryId === personalRepositoryId);
  const result = getDocumentResults(scenario === "empty" ? [] : source, null, filters);
  const visibleIds = new Set(result.rows.map(document => document.id));
  const visibleSelectedIds = selectedIds.filter(id => visibleIds.has(id));
  const openedDocument = sampleDocuments.find(document => document.id === openedId);
  const filterCount = Number(filters.kind !== "all") + Number(filters.approval !== "all");
  const isFiltered = Boolean(filters.query.trim() || filterCount);
  const loading = initialLoading || scenario === "loading";
  const ready = !initialLoading && (scenario === "ready" || scenario === "empty");
  const totalPersonal = source.length;
  const listTitle = title ?? (scope === "shared" ? "اشتراک‌گذاری‌شده با من" : "اسناد من");

  function updateFilters(patch: Partial<IDocumentFilters>) {
    setFilters(previous => ({ ...previous, ...patch, visibleCount: LIST_BATCH_SIZE }));
    setSelectedIds([]);
  }
  function changeScenario(value: ListScenario) { setScenario(value); setSelectedIds([]); }
  function reset() { setFilters(defaultFilters); setSelectedIds([]); setScenario("ready"); }

  return <>
    {breadcrumb}
    <div data-test-id="personal-documents-div-1" className="ws-pageHeading"><div data-test-id="personal-documents-div-2"><p data-test-id="personal-documents-p-3" className="ws-eyebrow">{scope === "personal" ? "کتابخانه شخصی شما" : scope === "shared" ? "همکاری با زمینه روشن" : "محتوای مخزن"}</p><h1 data-test-id="personal-documents-h1-4" ref={headingRef} tabIndex={-1}>{listTitle}<span data-test-id="personal-documents-span-5">{fa(totalPersonal)}</span></h1><p data-test-id="personal-documents-p-6" className="ws-subtitle">{scope === "shared" ? "اسنادی که برای مطالعه یا همکاری در اختیارتان قرار گرفته‌اند." : scope === "repository" ? "پوشه‌ها و اسناد این مسیر؛ هر چیز در جای خودش." : "یادداشت‌ها، فایل‌ها و ایده‌هایتان؛ منظم و در دسترس."}</p></div>{scope !== "shared" && <div data-test-id="personal-documents-div-7" className="ws-createAction"><CreateDocumentDialog key={listHref} listHref={listHref} repositoryId={repositoryId} folderId={folderId} /></div>}</div>
    <section data-test-id="personal-documents-section-8" className={cn("ws-controls", glass.contentSurface)} aria-label="جست‌وجو و فیلتر اسناد">
      <div data-test-id="personal-documents-div-9" className="ws-searchRow"><div data-test-id="personal-documents-div-10" className="ws-search"><SearchField data-test-id="personal-documents-searchfield-11" label={scope === "repository" ? "جست‌وجو در اسناد همین مسیر" : scope === "shared" ? "جست‌وجو در اسناد اشتراکی" : "جست‌وجو در اسناد من"} placeholder="نام سند را بنویسید…" value={filters.query} onValueChange={query => updateFilters({ query })} /><Search size={19} aria-hidden="true" /></div><Button data-test-id="personal-documents-button-12" variant="outline" aria-expanded={filtersOpen} aria-controls={filterFieldsId} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal aria-hidden="true" />فیلترها{filterCount > 0 ? ` (${fa(filterCount)})` : ""}</Button></div>
      <div data-test-id="personal-documents-div-13" id={filterFieldsId} className="ws-filterRow" hidden={!filtersOpen}><div data-test-id="personal-documents-div-14"><SelectField data-test-id="personal-documents-selectfield-15" label="نوع سند" value={filters.kind} onValueChange={kind => updateFilters({ kind: kind as IDocumentFilters["kind"] })} options={[{ value: "all", label: "همه نوع‌ها" }, ...Object.entries(kindLabels).map(([value, label]) => ({ value, label }))]} /></div><div data-test-id="personal-documents-div-16"><SelectField data-test-id="personal-documents-selectfield-17" label="وضعیت محتوا" value={filters.approval} onValueChange={approval => updateFilters({ approval: approval as IDocumentFilters["approval"] })} options={approvalOptions} /></div>{filterCount > 0 && <Button data-test-id="personal-documents-button-18" variant="ghost" onClick={() => updateFilters({ kind: "all", approval: "all" })}>پاک‌کردن فیلترها</Button>}</div>
    </section>
    {scenario === "ready" && !isFiltered && foldersContent}
    {filterCount > 0 && <div data-test-id="personal-documents-div-19" className="ws-activeFilters" aria-label="فیلترهای فعال">{filters.kind !== "all" && <Button data-test-id="personal-documents-button-20" size="sm" variant="secondary" aria-label={`حذف فیلتر نوع ${kindLabels[filters.kind]}`} onClick={() => updateFilters({ kind: "all" })}>{kindLabels[filters.kind]}<X aria-hidden="true" /></Button>}{filters.approval !== "all" && <Button data-test-id="personal-documents-button-21" size="sm" variant="secondary" aria-label="حذف فیلتر وضعیت محتوا" onClick={() => updateFilters({ approval: "all" })}>{approvalOptions.find(option => option.value === filters.approval)?.label}<X aria-hidden="true" /></Button>}</div>}
    <div data-test-id="personal-documents-div-22" className="ws-resultsSummary"><p data-test-id="personal-documents-p-23" role="status" aria-live="polite">{ready ? <>نمایش {fa(result.shown)} از <strong data-test-id="personal-documents-strong-24">{fa(result.total)} سند</strong>{isFiltered && <span data-test-id="personal-documents-span-25"> · نتیجه جست‌وجو و فیلتر</span>}</> : loading ? "در حال آماده‌سازی فهرست…" : "فهرست دریافت نشد"}</p><DropdownMenu><DropdownMenuTrigger data-test-id="personal-documents-dropdownmenutrigger-26" render={<Button data-test-id="personal-documents-dropdownmenutrigger-26" variant="ghost" size="sm" aria-label={`مرتب‌سازی: ${sortOptions.find(option => option.value === filters.sort)?.label}`} />}><ArrowDownUp aria-hidden="true" />{sortOptions.find(option => option.value === filters.sort)?.label}</DropdownMenuTrigger><DropdownMenuContent align="end" dir="rtl"><DropdownMenuRadioGroup value={filters.sort} onValueChange={sort => updateFilters({ sort: sort as IDocumentFilters["sort"] })}>{sortOptions.map(option => <DropdownMenuRadioItem key={option.value} value={option.value} closeOnClick>{option.label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu></div>

    {ready && result.total > 0 && <section data-test-id="personal-documents-section-28" ref={listRef} className={cn("ws-listSection", glass.contentSurface)} aria-label={`فهرست ${listTitle}`}>
      <div data-test-id="personal-documents-div-29" className="ws-selectionBar" data-active={visibleSelectedIds.length > 0}><p data-test-id="personal-documents-p-30" id={selectionScopeId} role="status"><strong data-test-id="personal-documents-strong-31">{fa(visibleSelectedIds.length)} سند انتخاب شده</strong><span data-test-id="personal-documents-span-32">انتخاب همه فقط شامل اسناد نمایش‌داده‌شده است.</span></p><Button data-test-id="personal-documents-button-33" variant="ghost" size="sm" disabled={!visibleSelectedIds.length} onClick={() => setSelectedIds([])}>پاک‌کردن انتخاب</Button></div>
      <DocumentList selectionScopeId={selectionScopeId} rows={result.rows} selectedIds={visibleSelectedIds} onSelectionChange={setSelectedIds} shared={scope === "shared"} documentHref={document => `/workspace/documents/${document.id}?from=${encodeURIComponent(listHref)}`} onOpen={(document, trigger) => { openerRef.current = trigger; setOpenedId(document.id); }} />
      <LoadMore key={JSON.stringify([listHref, filters.query, filters.kind, filters.approval, filters.sort])} noun="سند" listRef={listRef} result={result} onLoadMore={() => setFilters(previous => ({ ...previous, visibleCount: result.nextCount }))} />
    </section>}

    {ready && !result.total && <section data-test-id="personal-documents-section-34" className={cn("ws-empty", glass.contentSurface)}><span data-test-id="personal-documents-span-35">{scenario === "empty" || !isFiltered ? <FolderOpen size={34} aria-hidden="true" /> : <FileSearch size={34} aria-hidden="true" />}</span><h2 data-test-id="personal-documents-h2-36">{scenario === "empty" || !isFiltered ? (scope === "repository" ? "در این مسیر سندی نیست" : scope === "shared" ? "هنوز سندی با شما به اشتراک گذاشته نشده" : "اولین سند، شروع یک فضای منظم") : "سندی با این مشخصات پیدا نشد"}</h2><p data-test-id="personal-documents-p-37">{scenario === "empty" || !isFiltered ? "اسناد این بخش پس از اضافه‌شدن اینجا نمایش داده می‌شوند." : "عبارت کوتاه‌تری امتحان کنید یا فیلترها را بردارید."}</p>{scenario !== "empty" && isFiltered && <Button data-test-id="personal-documents-button-38" variant="outline" onClick={() => updateFilters({ query: "", kind: "all", approval: "all" })}>پاک‌کردن جست‌وجو و فیلتر<ArrowLeft aria-hidden="true" /></Button>}</section>}
    {loading && <div data-test-id="personal-documents-div-39" className={cn("ws-loading", glass.contentSurface)}><ListSkeleton rows={6} /></div>}
    {scenario === "error" && <Feedback tone="error" title="دریافت اسناد انجام نشد" description="دوباره تلاش کنید. جست‌وجو و فیلترهای شما حفظ شده‌اند." action={{ label: "تلاش دوباره", onAction: () => setScenario("ready") }} />}

    <details data-test-id="personal-documents-details-40" className={cn("ws-demoTools", workspaceStyles.demoTools)}><summary data-test-id="personal-documents-summary-41"><FileText size={16} aria-hidden="true" />درباره این نسخه و حالت‌های نمونه</summary><div data-test-id="personal-documents-div-42"><p data-test-id="personal-documents-p-43">همه اسناد ساختگی‌اند. این نسخه فقط برای مرور و بررسی تجربه کاربری است و با بارگذاری دوباره صفحه بازنشانی می‌شود.</p><div data-test-id="personal-documents-div-44" className="ws-demoControls"><SelectField data-test-id="personal-documents-selectfield-45" label="حالت نمایش نمونه" value={scenario} onValueChange={value => changeScenario(value as ListScenario)} options={[{ value: "ready", label: "داده‌های نمونه" }, { value: "empty", label: "فضای خالی" }, { value: "loading", label: "در حال بارگذاری" }, { value: "error", label: "خطا در دریافت" }]} /><Button data-test-id="personal-documents-button-46" variant="outline" onClick={reset}><RotateCcw aria-hidden="true" />بازنشانی نمایش</Button></div></div></details>

    <Sheet open={Boolean(openedDocument)} onOpenChange={open => { if (!open) setOpenedId(null); }}><SheetContent dir="rtl" side="left" className="ws-detailsSheet" finalFocus={() => openerRef.current?.isConnected ? openerRef.current : headingRef.current ?? true}>
      <SheetTitle className="pe-8">اطلاعات سند</SheetTitle><SheetDescription>{openedDocument?.title}</SheetDescription>{openedDocument && <DocumentDetails document={openedDocument} />}<SheetClose data-test-id="personal-documents-sheetclose-47" render={<Button data-test-id="personal-documents-sheetclose-47" variant="outline" />}>بازگشت به فهرست</SheetClose>
    </SheetContent></Sheet>
  </>;
}
