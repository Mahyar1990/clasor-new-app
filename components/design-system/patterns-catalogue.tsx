"use client"
import { useEffect, useId, useRef, useState } from "react"
import { Sample, SectionTitle } from "@/components/design-system/sample"
import { DocumentTableCatalogue } from "@/components/design-system/document-table-catalogue";
import { DataTable } from "@/components/ui/data-table"
import { ApprovalBadge, VisibilityBadge, LatestBadge } from "@/components/ui/status-badge"
import { SelectField } from "@/components/ui/select-field"
import { TextField } from "@/components/ui/text-field"
import { TableSearch } from "@/components/ui/table-search"
import { IconButton } from "@/components/ui/icon-button"
import { Trash2 } from "lucide-react"
import { RadioField } from "@/components/ui/choice-field"
import { Button } from "@/components/ui/button"
import { PermissionAction, permissionActionItem } from "@/components/ui/permission-action"
import { RowActionMenu } from "@/components/ui/row-action-menu"
import { CreationStepper } from "@/components/ui/creation-stepper"
import { ApprovalContext } from "@/components/ui/approval-context"
import { SystemState } from "@/components/ui/system-state"
import type { ApprovalStatus, Visibility, ResolvedPermission, ApprovalContext as Context } from "@/lib/design-system/models"
const rows: { id: string; name: string; approval: ApprovalStatus; visibility: Visibility }[] = [
  { id: "doc-1", name: "راهنمای همکاری تیم و اصول نگهداری اسناد مشترک با نام طولانی برای بررسی شکست متن", approval: "draft", visibility: "private" },
  { id: "doc-2", name: "گزارش فصلی — Project Report Q4.pdf", approval: "approved", visibility: "link" },
  { id: "folder-1", name: "پوشه مستندات پژوهش", approval: "pending", visibility: "private" },
]
const searchableRows = Array.from({ length: 18 }, (_, index) => ({ ...rows[index % rows.length], id: `sample-${String(index + 1).padStart(3, "0")}`, name: `${rows[index % rows.length].name} — ${new Intl.NumberFormat("fa").format(index + 1)}` }))
const normalizeSearch = (value: string) => value.normalize("NFKC").replace(/[يى]/g, "ی").replace(/ك/g, "ک").trim().toLocaleLowerCase("fa")
function SearchableTableExample() {
  const tableId = useId()
  const [items, setItems] = useState(searchableRows)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [message, setMessage] = useState("حذف و جست‌وجو فقط روی داده‌های همین نمونه انجام می‌شوند.")
  const search = useRef<HTMLInputElement>(null)
  const focusAfterDelete = useRef(false)
  useEffect(() => {
    if (!focusAfterDelete.current) return
    focusAfterDelete.current = false
    const frame = requestAnimationFrame(() => search.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [items])
  const filtered = items.filter(row => normalizeSearch(`${row.name} ${row.id}`).includes(normalizeSearch(query)))
  function remove(row: typeof searchableRows[number]) {
    focusAfterDelete.current = true
    setItems(current => current.filter(item => item.id !== row.id))
    setSelected(current => current.filter(id => id !== row.id))
    setMessage(`«${row.name}» از نمونه محلی حذف شد. برای بازیابی، بازنشانی نمونه را بزنید.`)
  }
  return <div data-test-id="patterns-catalogue-div-1" data-example="searchable-table"><Sample title="جدول جست‌وجوپذیر با هدر ثابت" description="هدر در جای خود می‌ماند و فقط ردیف‌ها در ارتفاع محدود پیمایش می‌شوند. ستون اقدام شامل منو و حذف محلی است.">
    <DataTable id={tableId} toolbar={<div data-test-id="patterns-catalogue-div-2" className="space-y-3"><div data-test-id="patterns-catalogue-div-3" className="flex flex-wrap items-center gap-3"><div data-test-id="patterns-catalogue-div-4" className="min-w-0 flex-1 basis-64"><TableSearch ref={search} tableId={tableId} label="جست‌وجو در جدول نمونه" placeholder="نام سند را جست‌وجو کنید" value={query} onValueChange={value => { setQuery(value); setSelected([]) }} onSearch={value => { setQuery(value); setSelected([]); setMessage(value.trim() ? `نتایج جست‌وجوی «${value}» در جدول نمایش داده شد.` : "همه ردیف‌های موجود در جدول نمایش داده شدند.") }} /></div><Button data-test-id="patterns-catalogue-button-5" variant="outline" onClick={() => { setItems(searchableRows); setQuery(""); setSelected([]); setMessage("۱۸ ردیف نمونه بازیابی شدند.") }}>بازنشانی نمونه جدول</Button></div><p data-test-id="patterns-catalogue-p-6" role="status" className="text-xs text-muted-foreground">نمایش {new Intl.NumberFormat("fa").format(filtered.length)} از {new Intl.NumberFormat("fa").format(items.length)} ردیف نمونه</p></div>}
      label="جدول جست‌وجوپذیر نمونه" rows={filtered} maxHeight={320} selectedIds={selected} onSelectionChange={setSelected} getRowId={row => row.id} rowLabel={row => row.name} emptyMessage={query ? "نتیجه‌ای برای این جست‌وجو پیدا نشد؛ نام یا شناسه دیگری وارد کنید." : "همه ردیف‌های نمونه حذف شده‌اند؛ با بازنشانی، آن‌ها را بازیابی کنید."} columns={[
      { id: "name", label: "نام", render: row => <span data-test-id="patterns-catalogue-span-7" className="font-medium">{row.name}</span> },
      { id: "approval", label: "تأیید", kind: "metadata", render: row => <ApprovalBadge status={row.approval} /> },
      { id: "visibility", label: "دسترسی", kind: "metadata", render: row => <VisibilityBadge visibility={row.visibility} /> },
    ]} renderActions={row => <div data-test-id="patterns-catalogue-div-8" className="flex items-center gap-2"><RowActionMenu fallbackFocusRef={search} rowLabel={row.name} items={[{ id: "view", label: "مشاهده مشخصات نمونه", onSelect: () => setMessage(`مشخصات نمونه: ${row.name}`) }, { id: "delete", label: "حذف ردیف نمونه", destructive: true, onSelect: () => remove(row) }]} /><IconButton data-test-id="patterns-catalogue-iconbutton-9" variant="ghost" aria-label={`حذف ردیف ${row.name}`} onClick={() => remove(row)}><Trash2 aria-hidden="true" /></IconButton></div>} />
    <p data-test-id="patterns-catalogue-p-10" role="status" className="break-words text-xs leading-body text-muted-foreground">{message}</p>
  </Sample></div>
}
export function DataCatalogue() {
  const [selected, setSelected] = useState<string[]>([])
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable")
  const [state, setState] = useState<"ready" | "empty" | "loading" | "error">("ready")
  const [message, setMessage] = useState("داده‌ها ساختگی و ثابت‌اند.")
  return <div data-test-id="patterns-catalogue-div-11" className="space-y-5 pt-10" data-catalogue="data"><SectionTitle id="data" title="داده و جدول" number="09" />
    <DocumentTableCatalogue />
    <Sample title="فهرست خوانا، انتخاب مشخص" description="انتخاب همه فقط همین سه ردیف محلی را شامل می‌شود؛ اسکرول افقی داخل ظرف جدول باقی می‌ماند.">
      <div data-test-id="patterns-catalogue-div-12" className="grid gap-4 sm:grid-cols-2"><SelectField data-test-id="patterns-catalogue-selectfield-13" label="تراکم جدول" value={density} onValueChange={value => setDensity(value as typeof density)} options={[{ value: "comfortable", label: "راحت" }, { value: "compact", label: "فشرده" }]} /><SelectField data-test-id="patterns-catalogue-selectfield-14" label="حالت جدول" value={state} onValueChange={value => { setState(value as typeof state); setSelected([]) }} options={[{ value: "ready", label: "دارای داده" }, { value: "empty", label: "خالی" }, { value: "loading", label: "بارگذاری" }, { value: "error", label: "خطا" }]} /></div>
      <DataTable label="اسناد نمونه" rows={state === "empty" ? [] : rows} state={state} density={density} selectedIds={selected} onSelectionChange={setSelected} getRowId={row => row.id} rowLabel={row => row.name} onRetry={() => setState("ready")} columns={[
        { id: "name", label: "نام", render: row => <span data-test-id="patterns-catalogue-span-15" className="font-medium">{row.name}</span> },
        { id: "approval", label: "تأیید", kind: "metadata", render: row => <ApprovalBadge status={row.approval} /> },
        { id: "visibility", label: "دسترسی", kind: "metadata", render: row => <VisibilityBadge visibility={row.visibility} /> },
        { id: "version", label: "نسخه", kind: "metadata", render: () => <LatestBadge status="latest" /> },
      ]} actions={row => [{ id: "view", label: "دیدن نمونه", onSelect: () => setMessage(`نمایش «${row.name}» فقط شبیه‌سازی شد.`) }]} />
      <p data-test-id="patterns-catalogue-p-16" role="status" className="text-xs text-muted-foreground">{message}</p>
    </Sample>
    <SearchableTableExample />
  </div>
}
const fixtures: Record<string, ResolvedPermission> = { manager: { kind: "direct-approval", allowed: true }, editor: { kind: "request-approval", allowed: true }, writer: { kind: "request-approval", allowed: true }, guest: { kind: "blocked", allowed: false, reason: "مهمان در این سناریوی نمایشی امکان درخواست تأیید ندارد." } }
const contextBase = { creator: { kind: "known" as const, id: "person-1", name: "نیلوفر احمدی" }, lastEditor: { kind: "known" as const, id: "person-2", name: "آرمان رضایی" }, requester: { kind: "known" as const, id: "person-3", name: "سارا کریمی" }, requestedAt: "2026-10-20T09:00:00Z" }
export function PatternsCatalogue() {
  const [role, setRole] = useState("manager")
  const [message, setMessage] = useState("نقش‌ها فقط fixture هستند؛ مجوز عملیاتی را تعیین نمی‌کنند.")
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState("")
  const [mode, setMode] = useState("empty")
  const [partial, setPartial] = useState(true)
  const [result, setResult] = useState<"none" | "partial" | "complete">("none")
  const [decided, setDecided] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)
  useEffect(() => { if (previousStep.current !== step) { previousStep.current = step; heading.current?.focus() } }, [step])
  const permission = fixtures[role]
  const actionProps = { permission, onDirectApproval: () => setMessage("تأیید مستقیم فقط شبیه‌سازی شد."), onRequestApproval: () => setMessage("درخواست تأیید فقط شبیه‌سازی شد.") }
  const context: Context = decided ? { ...contextBase, status: "decided", decision: { by: { kind: "known", id: "person-4", name: "رضا موسوی" }, at: "2026-10-21T10:30:00Z", outcome: "approved" } } : { ...contextBase, status: "pending" }
  return <div data-test-id="patterns-catalogue-div-17" className="space-y-5 pt-10" data-catalogue="patterns"><SectionTitle id="patterns" title="الگوهای ترکیبی" number="12" />
    <Sample title="یک نتیجه مجوز، چند ورودی هماهنگ" description="نقش به مجوز تبدیل نمی‌شود؛ این انتخاب‌گر فقط چهار fixture مشاهده‌شده را بارگذاری می‌کند. نویسنده در نسخه خود با درخواست ادامه می‌دهد.">
      <SelectField data-test-id="patterns-catalogue-selectfield-18" label="سناریوی نقش" value={role} onValueChange={setRole} options={[{ value: "manager", label: "مدیر" }, { value: "editor", label: "ویرایشگر" }, { value: "writer", label: "نویسنده در نسخه خود" }, { value: "guest", label: "مهمان" }]} />
      <div data-test-id="patterns-catalogue-div-19" className="flex flex-wrap items-start gap-5"><div data-test-id="patterns-catalogue-div-20"><PermissionAction {...actionProps} /></div><RowActionMenu rowLabel="نسخه نمایشی" items={[permissionActionItem(actionProps)]} /></div><p data-test-id="patterns-catalogue-p-21" role="status" className="text-sm leading-body text-muted-foreground">{message}</p>
    </Sample>
    <Sample title="ادامه، ایجاد نیست" description="ورودی با برگشت حفظ می‌شود؛ فقط دکمه نهایی ایجاد را شبیه‌سازی می‌کند.">
      {result === "none" ? <CreationStepper steps={[{ id: "title", label: "عنوان" }, { id: "source", label: "مبنای نسخه" }, { id: "review", label: "بازبینی" }]} currentStep={step} onStepChange={setStep} canContinue={step !== 0 || !!title.trim()} validationMessage="برای ادامه، عنوان نسخه را وارد کنید." commitLabel="ایجاد نسخه نمونه" onCommit={() => setResult(partial ? "partial" : "complete")}>
        <div data-test-id="patterns-catalogue-div-22" className="space-y-4"><h3 data-test-id="patterns-catalogue-h3-23" ref={heading} tabIndex={-1} className="text-base font-medium">{["عنوان نسخه نمونه", "مبنای نسخه تازه", "بازبینی پیش از ایجاد"][step]}</h3>
          {step === 0 && <TextField data-test-id="patterns-catalogue-textfield-24" label="عنوان نسخه" value={title} onValueChange={setTitle} required />}
          {step === 1 && <RadioField label="شروع نسخه" name="version-source" value={mode} onValueChange={value => setMode(String(value))} options={[{ value: "empty", label: "نسخه خالی؛ بدون محتوای قبلی" }, { value: "based", label: "مبتنی بر نسخه ۱؛ با محتوای نسخه موجود" }]} />}
          {step === 2 && <><p data-test-id="patterns-catalogue-p-25" className="text-sm leading-body">عنوان: {title}؛ {mode === "empty" ? "نسخه خالی است." : "محتوای نسخه ۱ مبناست."} «ایجاد نسخه نمونه» مرحله نهایی است؛ چیزی در سرویس ذخیره نمی‌شود.</p><SelectField data-test-id="patterns-catalogue-selectfield-26" label="نتیجه نمایشی ایجاد" value={partial ? "partial" : "complete"} onValueChange={value => setPartial(value === "partial")} options={[{ value: "partial", label: "ایجاد با ویرایشگر ناتمام" }, { value: "complete", label: "ایجاد کامل نمونه" }]} /></>}
        </div>
      </CreationStepper> : result === "partial" ? <SystemState state={{ kind: "partial-success", createdItem: { id: "demo-version-1", name: title }, unfinishedStep: "نسخه نمونه ایجاد شد؛ بازشدن ویرایشگر ناتمام است. برای بازیابی، نسخه دیگری نسازید.", recoveryLabel: "ادامه بازکردن ویرایشگر نمونه" }} onRecovery={() => setResult("complete")} /> : <div data-test-id="patterns-catalogue-div-27" role="status" className="space-y-3 text-sm"><p data-test-id="patterns-catalogue-p-28">نسخه «{title}» در نمونه کامل شد؛ ذخیره‌سازی واقعی انجام نشد.</p><Button data-test-id="patterns-catalogue-button-29" variant="outline" onClick={() => { setResult("none"); setStep(0) }}>بازنشانی نمونه مراحل</Button></div>}
    </Sample>
    <Sample title="زمینه تصمیم قابل پیگیری" description="سازنده، آخرین ویرایشگر، درخواست‌دهنده و تصمیم‌گیرنده مستقل‌اند؛ نام‌ها و زمان‌ها ساختگی‌اند.">
      <Button data-test-id="patterns-catalogue-button-30" variant="outline" onClick={() => setDecided(value => !value)}>{decided ? "نمایش انتظار تصمیم" : "نمایش تصمیم ثبت‌شده"}</Button><ApprovalContext context={context} />
    </Sample>
  </div>
}
