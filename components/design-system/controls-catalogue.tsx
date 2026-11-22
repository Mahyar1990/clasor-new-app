"use client"

import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useRef, useState, type ReactNode } from "react"
import { MousePointer2, SlidersHorizontal, UsersRound, Plus, Trash2, Download, ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { TextField, SearchField, TextareaField } from "@/components/ui/text-field"
import { SelectField } from "@/components/ui/select-field"
import { CheckboxField, RadioField, SwitchField } from "@/components/ui/choice-field"
import { FileInput } from "@/components/ui/file-input"
import { ApprovalBadge, VisibilityBadge, LatestBadge, RoleBadge } from "@/components/ui/status-badge"
import { TagPickerCatalogue } from "./tag-picker-catalogue";
import { GlassActionsCatalogue } from "./glass-actions-catalogue";
import { AttachmentPickerCatalogue } from "./attachment-picker-catalogue";
import { GlassControlStatesCatalogue } from "./glass-control-states-catalogue";
import { GlassStatusStatesCatalogue } from "./glass-status-feedback-catalogue";
import { Identity } from "@/components/ui/identity"

function Sample({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <GlassCard data-test-id="controls-catalogue-section-1" className="min-w-0 overflow-hidden">
    <header data-test-id="controls-catalogue-header-2" className="border-b px-5 py-4"><h3 data-test-id="controls-catalogue-h3-3" className="text-sm font-medium">{title}</h3><p data-test-id="controls-catalogue-p-4" className="mt-1 text-xs leading-body text-muted-foreground">{description}</p></header>
    <div data-test-id="controls-catalogue-div-5" className="space-y-6 p-5 sm:p-6">{children}</div>
  </GlassCard>
}
function SectionTitle({ id, title, description, number, children }: { id: string; title: string; description: string; number: string; children: ReactNode }) {
  return <div data-test-id="controls-catalogue-div-6" id={id} className="mb-5 flex scroll-mt-6 items-center gap-3 border-t pt-8">
    <span data-test-id="controls-catalogue-span-7" className="grid size-11 shrink-0 place-items-center rounded-md border border-[var(--clasor-color-brand-200)] bg-accent text-primary">{children}</span>
    <div data-test-id="controls-catalogue-div-8" className="min-w-0"><h2 data-test-id="controls-catalogue-h2-9" className="text-xl font-bold">{title}</h2><p data-test-id="controls-catalogue-p-10" className="text-xs text-muted-foreground">{description}</p></div>
    <bdi data-test-id="controls-catalogue-bdi-11" className="ms-auto hidden text-xs text-muted-foreground sm:block">COMPONENTS / {number}</bdi>
  </div>
}
const roles = [{ value: "writer", label: "نویسنده" }, { value: "editor", label: "ویرایشگر" }, { value: "guest", label: "مهمان" }]

export default function ControlsCatalogue({ section = "buttons" }: { section?: "buttons" | "inputs" | "status" }) {
  const [loading, setLoading] = useState(false)
  const [actions, setActions] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inFlight = useRef(false)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [selectedRole, setSelectedRole] = useState("writer")
  const [checked, setChecked] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [visibility, setVisibility] = useState("private")
  function simulateAction() {
    if (inFlight.current) return
    inFlight.current = true
    setLoading(true)
    timer.current = setTimeout(() => { setLoading(false); setActions(value => value + 1); inFlight.current = false }, 1200)
  }
  return <div data-test-id="controls-catalogue-div-12" className="space-y-5 pt-10" data-catalogue="controls">
    {section === "buttons" && <>
    <SectionTitle id="buttons" title="دکمه و اقدام" description="یک اقدام روشن، در اندازه و جای مناسب" number="05"><MousePointer2 className="size-5" aria-hidden="true" /></SectionTitle>
    <GlassActionsCatalogue />
    <Sample title="هر اقدام، یک تأکید مشخص" description="اصلی، حاشیه‌دار و آرام؛ عملیات مخرب با نام صریح از هم جدا می‌شوند. با ماوس بالا آمدن و برگشت دکمه را امتحان کنید؛ با Tab فوکوس را بدون جابه‌جایی ببینید. تنظیم کاهش حرکت دستگاه، جابه‌جایی را حذف می‌کند.">
      <div data-test-id="controls-catalogue-div-13" className="flex flex-wrap items-center gap-3">
        <Button data-test-id="controls-catalogue-button-14" onClick={simulateAction} loading={loading} loadingLabel="شبیه‌سازی ذخیره در حال اجراست"><Plus aria-hidden="true" />ایجاد سند</Button>
        <Button data-test-id="controls-catalogue-button-15" variant="outline" onClick={() => setActions(value => value + 1)}><Download aria-hidden="true" />دریافت نمونه</Button>
        <Button data-test-id="controls-catalogue-button-16" variant="ghost" onClick={() => setActions(value => value + 1)}>مشاهده جزئیات<ArrowLeft className="rtl:rotate-0 ltr:rotate-180" aria-hidden="true" /></Button>
        <Button data-test-id="controls-catalogue-button-17" variant="destructive-outline" onClick={() => setActions(value => value + 1)}><Trash2 aria-hidden="true" />حذف نمونه</Button>
        <Button data-test-id="controls-catalogue-button-18" variant="destructive" onClick={() => setActions(value => value + 1)}>حذف قطعی نمونه</Button>
        <IconButton data-test-id="controls-catalogue-iconbutton-19" aria-label="دریافت فایل نمونه" variant="outline" onClick={() => setActions(value => value + 1)}><Download aria-hidden="true" /></IconButton>
      </div>
      <p data-test-id="controls-catalogue-p-20" className="text-xs text-muted-foreground" role="status">همه اقدام‌ها نمایشی‌اند؛ چیزی ایجاد، حذف یا دریافت نمی‌شود. شمار اجرای محلی: {new Intl.NumberFormat("fa").format(actions)}</p>
    </Sample>
    <div data-test-id="controls-catalogue-div-21" className="grid gap-5 lg:grid-cols-2">
      <Sample title="سه اندازه، یک زبان" description="ارتفاع ۳۲، ۳۶ و ۴۴ پیکسل؛ در دستگاه لمسی حداقل هدف ۴۴ است."><div data-test-id="controls-catalogue-div-22" className="flex flex-wrap items-center gap-3"><Button data-test-id="controls-catalogue-button-23" size="sm">کوچک</Button><Button data-test-id="controls-catalogue-button-24">متوسط</Button><Button data-test-id="controls-catalogue-button-25" size="lg">بزرگ</Button></div></Sample>
      <Sample title="انتظار و محدودیت قابل فهم" description="برچسب در انتظار باقی می‌ماند و علت غیرفعال‌بودن همیشه قابل خواندن است."><div data-test-id="controls-catalogue-div-26" className="flex flex-wrap items-start gap-5"><Button data-test-id="controls-catalogue-button-27" loading loadingLabel="نمونه دکمه در حال ذخیره">ذخیره تغییرات</Button><div data-test-id="controls-catalogue-div-28"><Button data-test-id="controls-catalogue-button-29" disabled disabledReason="برای تأیید، ابتدا یک نسخه انتخاب کنید.">تأیید نسخه</Button></div></div></Sample>
    </div>

    </>}
    {section === "inputs" && <>
    <SectionTitle id="inputs" title="ورودی و انتخاب" description="عنوان دائمی، راهنمای نزدیک و خطای قابل اصلاح" number="06"><SlidersHorizontal className="size-5" aria-hidden="true" /></SectionTitle>
    <GlassControlStatesCatalogue /><TagPickerCatalogue /><AttachmentPickerCatalogue />
    <div data-test-id="controls-catalogue-div-30" className="grid items-start gap-5 lg:grid-cols-2">
      <Sample title="از ورودی تا بازبینی" description="اعتبارسنجی محلی است؛ خطا مقدار واردشده را پاک نمی‌کند.">
        <form data-test-id="controls-catalogue-form-31" className="space-y-5" noValidate onSubmit={event => {
          event.preventDefault(); setFormMessage("")
          if (!title.trim()) { setError("عنوان سند خالی است؛ عنوانی مشخص وارد کنید."); document.getElementById("demo-document-title")?.focus(); return }
          setError(""); setFormMessage(`عنوان «${title}» در نمونه معتبر است؛ هیچ ذخیره‌سازی انجام نشد.`)
        }}>
          <TextField data-test-id="controls-catalogue-textfield-32" id="demo-document-title" name="title" label="عنوان سند" required placeholder="مثلاً راهنمای همکاری" description="عنوانی کوتاه و مشخص انتخاب کنید." value={title} onValueChange={setTitle} error={error} />
          <TextareaField data-test-id="controls-catalogue-textareafield-33" name="description" label="توضیحات" placeholder="درباره این سند بنویسید…" description="توضیحات اختیاری است." />
          <Button data-test-id="controls-catalogue-button-34" type="submit"><Save aria-hidden="true" />بررسی عنوان</Button>
          <p data-test-id="controls-catalogue-p-35" role="status" className="text-xs leading-body text-success">{formMessage}</p>
        </form>
      </Sample>
      <Sample title="جست‌وجو و دسترسی به مقدار" description="فقط‌خواندنی قابل انتخاب و کپی است؛ غیرفعال امکان ویرایش ندارد.">
        <SearchField data-test-id="controls-catalogue-searchfield-36" name="search" label="جست‌وجوی سند" placeholder="نام یا شناسه سند" description="جست‌وجو در این نمونه به داده متصل نیست." />
        <TextField data-test-id="controls-catalogue-textfield-37" label="شناسه سند" value="DOC-1042" readOnly dir="ltr" description="شناسه پس از ایجاد قابل ویرایش نیست." />
        <TextField data-test-id="controls-catalogue-textfield-38" label="نام بایگانی" defaultValue="اسناد تیم" disabled disabledReason="برای تغییر نام بایگانی، دسترسی ویرایش لازم است." />
        <TextField data-test-id="controls-catalogue-textfield-39" label="نمونه خطای ورودی" defaultValue="عنوان نامعتبر" error="عنوان باید روشن باشد؛ یک نام مشخص برای سند بنویسید." />
      </Sample>
    </div>
    <div data-test-id="controls-catalogue-div-40" className="grid items-start gap-5 lg:grid-cols-2">
      <Sample title="انتخاب یک گزینه" description="Select مبتنی بر Base UI؛ نقش فقط داده نمایشی است و مجوزی ایجاد نمی‌کند.">
        <SelectField data-test-id="controls-catalogue-selectfield-41" label="نقش نمایشی" name="role" options={roles} value={selectedRole} onValueChange={setSelectedRole} description="با کلیدهای جهت حرکت کنید، با Enter انتخاب و با Escape پنجره را ببندید." />
        <SelectField data-test-id="controls-catalogue-selectfield-42" label="نقش قفل‌شده" options={roles} defaultValue="guest" disabled disabledReason="در این نمونه، تغییر نقش مهمان در دسترس نیست." />
        <SelectField data-test-id="controls-catalogue-selectfield-43" label="نمونه خطای انتخاب" options={roles.map(option => ({ ...option, disabled: option.value === "guest" }))} error="یک نقش انتخاب کنید؛ مهمان در این نمونه قابل انتخاب نیست." required />
        <RadioField label="دسترسی نمونه" name="demo-visibility" value={visibility} onValueChange={value => setVisibility(String(value))} options={[{ value: "private", label: "خصوصی" }, { value: "link", label: "با پیوند" }, { value: "public", label: "عمومی", disabled: true, disabledReason: "انتشار عمومی در این نمونه فعال نیست." }]} description="نوع دسترسی مستقل از تأیید محتواست." />
      </Sample>
      <Sample title="انتخاب، تأیید و روشن‌کردن" description="Checkbox برای انتخاب و Switch برای وضعیت روشن یا خاموش است.">
        <CheckboxField name="selected" label="انتخاب این سند" checked={checked} onCheckedChange={setChecked} />
        <CheckboxField label="بخشی از سندها انتخاب شده‌اند" indeterminate description="نمونه مستقل حالت انتخاب جزئی؛ جدول در مرحله E ساخته می‌شود." />
        <CheckboxField label="انتخاب بایگانی بسته" disabled disabledReason="بایگانی بسته است؛ ابتدا آن را باز کنید." />
        <SwitchField name="notifications" label="اعلان تغییرات" checked={notifications} onCheckedChange={setNotifications} description="تغییر وضعیت فقط در همین صفحه باقی می‌ماند." />
        <SwitchField label="اعلان مهمان" disabled disabledReason="اعلان برای مهمان در این نمونه در دسترس نیست." />
      </Sample>
    </div>
    <div data-test-id="controls-catalogue-div-44" className="grid items-start gap-5 lg:grid-cols-2">
      <Sample title="انتخاب فایل، بدون ارسال" description="نام، اندازه و خطا کنار فایل دیده می‌شوند؛ انتخاب و پاک‌کردن فقط محلی است.">
        <FileInput data-test-id="controls-catalogue-fileinput-45" label="فایل نمونه" name="attachment" accept=".txt,.pdf" maxSizeBytes={1024 * 1024} restrictionsText="فقط برای نمایش: متن یا PDF تا یک مگابایت؛ محدودیت محصول نیست." />
      </Sample>
      <Sample title="محدودیت پیش از انتخاب" description="اجازه انتخاب و علت غیرفعال‌بودن به‌صورت روشن نمایش داده می‌شود.">
        <FileInput data-test-id="controls-catalogue-fileinput-46" label="فایل بایگانی" disabled disabledReason="برای افزودن فایل، ابتدا یک سند انتخاب کنید." />
        <TextareaField data-test-id="controls-catalogue-textareafield-47" label="یادداشت فقط‌خواندنی" readOnly defaultValue="این یادداشت برای مرور و کپی در دسترس است." />
      </Sample>
    </div>

    </>}
    {section === "status" && <>
    <SectionTitle id="status" title="وضعیت و هویت" description="تأیید، دسترسی، نسخه و نقش؛ چهار معنای مستقل" number="07"><UsersRound className="size-5" aria-hidden="true" /></SectionTitle>
    <GlassStatusStatesCatalogue />
    <Sample title="وضعیت را با متن بخوانید" description="تأییدشدن به معنی عمومی‌بودن نیست؛ آخرین نسخه هم مجوز ایجاد نمی‌کند.">
      <div data-test-id="controls-catalogue-div-48" className="grid gap-5 sm:grid-cols-[100px_1fr]">
        <span data-test-id="controls-catalogue-span-49" className="text-xs text-muted-foreground">تأیید محتوا</span><div data-test-id="controls-catalogue-div-50" className="flex flex-wrap gap-2">{(["draft", "pending", "approved", "rejected"] as const).map(status => <ApprovalBadge key={status} status={status} />)}</div>
        <span data-test-id="controls-catalogue-span-51" className="text-xs text-muted-foreground">نوع دسترسی</span><div data-test-id="controls-catalogue-div-52" className="flex flex-wrap gap-2">{(["private", "link", "public"] as const).map(visibility => <VisibilityBadge key={visibility} visibility={visibility} />)}</div>
        <span data-test-id="controls-catalogue-span-53" className="text-xs text-muted-foreground">نسخه</span><div data-test-id="controls-catalogue-div-54"><LatestBadge status="latest" /><LatestBadge status="previous" /></div>
        <span data-test-id="controls-catalogue-span-55" className="text-xs text-muted-foreground">نقش نمایشی؛ مستقل از مجوز عملیاتی</span><div data-test-id="controls-catalogue-div-56" className="flex flex-wrap gap-2">{(["owner", "admin", "editor", "writer", "viewer", "anonymous", "manager", "guest"] as const).map(role => <RoleBadge key={role} role={role} />)}</div>
      </div>
    </Sample>
    <Sample title="هر هویت، یک جای مشخص" description="نام‌های زیر ساختگی‌اند. نقش و مجوز از نام یا تصویر شخص نتیجه‌گیری نمی‌شوند.">
      <div data-test-id="controls-catalogue-div-57" className="grid gap-6 sm:grid-cols-2"><div data-test-id="controls-catalogue-div-58" className="space-y-3"><p data-test-id="controls-catalogue-p-59" className="text-xs text-muted-foreground">هویت مشخص</p><Identity identity={{ kind: "known", id: "sample-1", name: "نیلوفر احمدی" }} /></div><div data-test-id="controls-catalogue-div-60" className="space-y-3"><p data-test-id="controls-catalogue-p-61" className="text-xs text-muted-foreground">هویت ثبت‌نشده</p><Identity identity={{ kind: "unknown", label: "هویت نامشخص" }} /></div></div>
    </Sample>
    </>}
  </div>
}
