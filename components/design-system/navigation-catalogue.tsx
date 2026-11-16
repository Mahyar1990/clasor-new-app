"use client"
import { useState } from "react"
import { GlassFeedbackStatesCatalogue } from "./glass-status-feedback-catalogue";
import { GlassLayerStatesCatalogue } from "./glass-layer-states-catalogue";
import { Info } from "lucide-react"
import { Sample, SectionTitle } from "@/components/design-system/sample"
import { DocumentDialogsCatalogue } from "./document-dialogs-catalogue";
import { LibraryPatternsCatalogue } from "./library-patterns-catalogue";
import { HeaderActionsCatalogue } from "./header-actions-catalogue";
import { RepositoryDialogsCatalogue } from "@/components/design-system/repository-dialogs-catalogue";
import { GlassOptionsCatalogue } from "@/components/design-system/glass-options-catalogue";
import { GlassTabsCatalogue } from "@/components/design-system/glass-tabs-catalogue";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb"
import { ClasorPagination } from "@/components/ui/clasor-pagination"
import { Feedback } from "@/components/ui/feedback"
import { SystemState } from "@/components/ui/system-state"
import { ProgressIndicator, LoadingSkeleton } from "@/components/ui/progress-indicator"
import { RowActionMenu } from "@/components/ui/row-action-menu"
import { ConfirmationDialog, DestructiveDialog } from "@/components/ui/confirmation-dialog"
import { DetailsSheet } from "@/components/ui/details-sheet"
import { HelpTooltip } from "@/components/ui/help-tooltip"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
function Examples({ section }: { section: "navigation" | "feedback" | "overlays" }) {
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState(45)
  const [event, setEvent] = useState("هنوز اقدامی انجام نشده است.")
  function log(message: string) { setEvent(`${message} — فقط در این نمونه؛ بدون ذخیره‌سازی.`) }
  return <div data-test-id="navigation-catalogue-div-1" className="space-y-5 pt-10" data-catalogue="navigation">
    {section === "navigation" && <>
    <SectionTitle id="navigation" title="ناوبری" number="08" />
    <Sample title="مسیر و صفحه‌بندی" description="هر الگو وظیفه جدا دارد؛ صفحه‌بندی این نمونه فقط شماره صفحه را تغییر می‌دهد.">
      <ClasorBreadcrumb items={[{ id: "home", label: "کتابخانه", href: "/" }, { id: "team", label: "اسناد گروه", href: "#navigation" }, { id: "current", label: "راهنمای همکاری" }]} />
      <ClasorPagination page={page} pageCount={5} onPageChange={setPage} /><p data-test-id="navigation-catalogue-p-2" role="status" className="text-xs text-muted-foreground">صفحه نمایشی: {new Intl.NumberFormat("fa").format(page)}؛ داده جدول تغییر نمی‌کند.</p>
    </Sample>
    <GlassTabsCatalogue />
    </>}
    {section === "feedback" && <>
    <SectionTitle id="feedback" title="بازخورد" number="10" />
    <GlassFeedbackStatesCatalogue />
    <div data-test-id="navigation-catalogue-div-3" className="grid gap-4 lg:grid-cols-2">{(["success", "warning", "error", "info"] as const).map(tone => <Feedback key={tone} tone={tone} title={{ success: "نمونه موفقیت", warning: "نیاز به بررسی", error: "انجام نشد", info: "اطلاعات بیشتر" }[tone]} description="این پیام نمونه است. جزئیات را بررسی کنید و سپس ادامه دهید." dataRetained={tone === "error" ? true : undefined} />)}</div>
    <div data-test-id="navigation-catalogue-div-4" className="grid gap-4 lg:grid-cols-2">
      <SystemState state={{ kind: "empty", title: "هنوز سندی نیست", description: "پس از افزودن سند، فهرست اینجا نمایش داده می‌شود." }} onRecovery={() => log("نمونه افزودن سند")} />
      <SystemState state={{ kind: "permission-denied", title: "دسترسی کافی ندارید", reason: "برای دیدن این بخش، از مدیر گروه درخواست دسترسی کنید." }} />
      <SystemState state={{ kind: "partial-success", createdItem: { id: "sample-1", name: "راهنمای همکاری" }, unfinishedStep: "نسخه نمونه ساخته شد؛ بازکردن ویرایشگر ناتمام ماند. ایجاد مجدد لازم نیست.", recoveryLabel: "بازکردن دوباره ویرایشگر" }} onRecovery={() => log("نمونه بازیابی ویرایشگر")} />
      <SystemState state={{ kind: "service-error", title: "دریافت اطلاعات انجام نشد", description: "دریافت مجدد را امتحان کنید؛ این خطا نمونه است.", dataRetained: true, recoveryLabel: "تلاش دوباره" }} onRecovery={() => log("نمونه تلاش مجدد")} />
    </div>
    <Sample title="پیشرفت مشخص" description="مقدار عددی و پایان معلوم؛ بدون انیمیشن بی‌پایان برای پیشرفت."><ProgressIndicator label="آماده‌سازی نمونه" value={progress} /><Button data-test-id="navigation-catalogue-button-5" variant="outline" onClick={() => setProgress(value => value === 100 ? 0 : Math.min(100, value + 25))}>{progress === 100 ? "شروع دوباره نمونه" : "پیشروی نمونه"}</Button><LoadingSkeleton /></Sample>
    </>}
    {section === "overlays" && <>
    <SectionTitle id="overlays" title="لایه و پیام" number="11" />
    <GlassLayerStatesCatalogue />
    <GlassOptionsCatalogue />
    <LibraryPatternsCatalogue /><HeaderActionsCatalogue /><RepositoryDialogsCatalogue /><DocumentDialogsCatalogue />
    <Sample title="تصمیم روشن، بازگشت به زمینه" description="Escape و انصراف فوکوس را برمی‌گردانند؛ کلیک بیرون تأیید مخرب را نمی‌بندد.">
      <div data-test-id="navigation-catalogue-div-6" className="flex flex-wrap items-start gap-4">
        <ConfirmationDialog trigger={<Button data-test-id="navigation-catalogue-button-7" variant="outline">تأیید نمونه</Button>} title="تأیید محتوای نمونه" description="تأیید محتوا نوع دسترسی مخاطبان را تغییر نمی‌دهد. این اقدام فقط نمایشی است." targetName="راهنمای همکاری — نسخه ۱" confirmLabel="تأیید محتوای نمونه" onConfirm={() => log("محتوای نمونه تأیید شد")} />
        <DestructiveDialog trigger={<Button data-test-id="navigation-catalogue-button-8" variant="destructive-outline">حذف در نمونه</Button>} title="حذف سند نمونه؟" description="این تصمیم فقط برای مشاهده الگوی تأیید است و سند واقعی حذف نمی‌شود." targetName="راهنمای همکاری" confirmLabel="حذف سند نمونه" onConfirm={() => log("حذف نمونه بررسی شد")} />
        <DetailsSheet trigger={<Button data-test-id="navigation-catalogue-button-9" variant="outline">جزئیات سند نمونه</Button>} title="راهنمای همکاری" description="پنل جزئیات از انتهای خط، سمت چپ RTL، باز می‌شود."><p data-test-id="navigation-catalogue-p-10" className="text-sm leading-body">شناسه: <bdi data-test-id="navigation-catalogue-bdi-11">DOC-1042</bdi></p><p data-test-id="navigation-catalogue-p-12" className="text-sm leading-body">تأیید: پیش‌نویس؛ دسترسی: خصوصی؛ نسخه: آخرین نسخه. این ابعاد مستقل‌اند.</p></DetailsSheet>
        <HelpTooltip content="توضیح مکمل؛ راهنمای ضروری همیشه در متن صفحه دیده می‌شود."><IconButton data-test-id="navigation-catalogue-iconbutton-13" aria-label="راهنمای پیام" variant="outline"><Info aria-hidden="true" /></IconButton></HelpTooltip>
        <RowActionMenu rowLabel="راهنمای همکاری" items={[{ id: "view", label: "دیدن نمونه", onSelect: () => log("مشاهده نمونه") }, { id: "rename", label: "تغییر نام نمونه", onSelect: () => log("تغییر نام نمونه") }, { id: "delete", label: "حذف", destructive: true, disabledReason: "دسترسی حذف در این نمونه وجود ندارد.", onSelect: () => {} }]} />
      </div>
      <p data-test-id="navigation-catalogue-p-14" role="status" className="text-xs leading-body text-muted-foreground">{event}</p>
    </Sample>
    <Sample title="پیام گذرا؛ پنج حالت مشخص" description="Toast مبتنی بر Base UI در shadcn؛ پیام‌ها پس از ۶٫۵ ثانیه بسته می‌شوند و بستن دستی هم دارند. همه پیام‌ها نمایشی‌اند.">
      <div data-test-id="navigation-catalogue-div-15" className="flex flex-wrap gap-3">{[
        { type: "default", label: "Default", title: "پیام پیش‌فرض", description: "این یک پیام نمایشی است؛ هیچ داده‌ای تغییر نکرد." },
        { type: "success", label: "Success", title: "عملیات نمونه موفق بود", description: "این نتیجه صرفاً نمایشی است؛ ذخیره‌سازی واقعی انجام نشد." },
        { type: "info", label: "Info", title: "اطلاعات نمونه", description: "نسخه‌های سند را پیش از ادامه بررسی کنید." },
        { type: "warning", label: "Warning", title: "نیاز به بررسی", description: "پیش از ادامه، محتوای نمونه را بازبینی کنید." },
        { type: "error", label: "Error", title: "عملیات نمونه انجام نشد", description: "اطلاعات نمونه حفظ شده است؛ دوباره تلاش کنید." },
      ].map(example => <Button data-test-id={`navigation-catalogue-button-16-${String(example.type)}`} key={example.type} variant="outline" onClick={() => toast.add({ type: example.type === "default" ? undefined : example.type, title: example.title, description: example.description, priority: "low" })}>{example.label}</Button>)}</div>
      <p data-test-id="navigation-catalogue-p-17" className="text-xs leading-body text-muted-foreground">حالت پیش‌فرض خنثی است؛ موفقیت، اطلاعات، هشدار و خطا با آیکون و رنگ مستقل نمایش داده می‌شوند. پیام گذرا تنها سابقه یک تصمیم مهم نیست.</p>
    </Sample>
    </>}
  </div>
}
export default function NavigationCatalogue({ section = "navigation" }: { section?: "navigation" | "feedback" | "overlays" }) { return <Examples section={section} /> }
