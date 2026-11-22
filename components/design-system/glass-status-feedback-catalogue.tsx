"use client";

import { ApprovalBadge, VisibilityBadge, LatestBadge, RoleBadge } from "@/components/ui/status-badge";
import { Identity } from "@/components/ui/identity";
import { Feedback } from "@/components/ui/feedback";
import { ProgressIndicator, LoadingSkeleton } from "@/components/ui/progress-indicator";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { Sample } from "./sample";

export function GlassStatusStatesCatalogue() {
  return <GlassPreviewFrame title="نشان و هویت؛ رنگ معنایی روی شیشه" testId="glass-status-states">
    <div data-test-id="glass-status-badges" className="min-w-0">
    <Sample title="وضعیت را با متن بخوانید" description="تأییدشدن به معنی عمومی‌بودن نیست؛ آخرین نسخه هم مجوز ایجاد نمی‌کند.">
      <div data-test-id="controls-catalogue-div-48" className="grid min-w-0 gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">
        <span data-test-id="controls-catalogue-span-49" className="text-xs text-muted-foreground">تأیید محتوا</span><div data-test-id="controls-catalogue-div-50" className="flex flex-wrap gap-2">{(["draft", "pending", "approved", "rejected"] as const).map(status => <ApprovalBadge key={status} status={status} />)}</div>
        <span data-test-id="controls-catalogue-span-51" className="text-xs text-muted-foreground">نوع دسترسی</span><div data-test-id="controls-catalogue-div-52" className="flex flex-wrap gap-2">{(["private", "link", "public"] as const).map(visibility => <VisibilityBadge key={visibility} visibility={visibility} />)}</div>
        <span data-test-id="controls-catalogue-span-53" className="text-xs text-muted-foreground">نسخه</span><div data-test-id="controls-catalogue-div-54" className="flex flex-wrap items-center gap-2"><LatestBadge status="latest" /><span data-test-id="glass-status-previous" className="text-xs text-muted-foreground">نسخهٔ قبلی نشان ندارد</span></div>
        <span data-test-id="controls-catalogue-span-55" className="text-xs text-muted-foreground">نقش نمایشی؛ مستقل از مجوز عملیاتی</span><div data-test-id="controls-catalogue-div-56" className="flex flex-wrap gap-2">{(["owner", "admin", "editor", "writer", "viewer", "anonymous", "manager", "guest"] as const).map(role => <RoleBadge key={role} role={role} />)}</div>
      </div>
    </Sample>
    </div>
    <div data-test-id="glass-status-identities" className="min-w-0">
    <Sample title="هر هویت، یک جای مشخص" description="نام‌های زیر ساختگی‌اند. نقش و مجوز از نام یا تصویر شخص نتیجه‌گیری نمی‌شوند.">
      <div data-test-id="controls-catalogue-div-57" className="grid min-w-0 gap-6 sm:grid-cols-2"><div data-test-id="controls-catalogue-div-58" className="space-y-3"><p data-test-id="controls-catalogue-p-59" className="text-xs text-muted-foreground">هویت مشخص</p><Identity identity={{ kind: "known", id: "sample-1", name: "نیلوفر احمدی", avatarUrl: "/avatars/preview-user.svg" }} /></div><div data-test-id="controls-catalogue-div-60" className="space-y-3"><p data-test-id="controls-catalogue-p-61" className="text-xs text-muted-foreground">هویت ثبت‌نشده</p><Identity identity={{ kind: "unknown", label: "هویت نامشخص" }} /></div><div data-test-id="glass-status-no-photo" className="space-y-3"><p data-test-id="glass-status-no-photo-label" className="text-xs text-muted-foreground">نام مشخص، بدون تصویر</p><Identity identity={{ kind: "known", id: "sample-no-photo", name: "همکار نمونه" }} /></div><div data-test-id="glass-status-broken-photo" className="space-y-3"><p data-test-id="glass-status-broken-photo-label" className="text-xs text-muted-foreground">تصویر در دسترس نیست</p><Identity density="compact" identity={{ kind: "known", id: "sample-broken-photo", name: "همکار بدون تصویر معتبر", avatarUrl: "data:image/png;base64,AA==" }} /></div></div>
    </Sample>
    </div>
  </GlassPreviewFrame>;
}

export function GlassFeedbackStatesCatalogue() {
  return <GlassPreviewFrame title="پیام و پیشرفت؛ حالت روشن و تاریک" testId="glass-feedback-states">
    <div data-test-id="glass-feedback-tones" className="grid gap-3 sm:grid-cols-2">
      <Feedback tone="success" title="ذخیره شد" description="اطلاعات نمونه به‌روز شد." />
      <Feedback tone="warning" title="نیاز به بررسی" description="محتوا را پیش از ادامه مرور کنید." />
      <Feedback tone="error" title="انجام نشد" description="دوباره تلاش کنید." dataRetained />
      <Feedback tone="info" title="اطلاعات بیشتر" description="این پیام فقط برای نمایش است." />
    </div>
    <ProgressIndicator label="هنوز شروع نشده" value={0} />
    <ProgressIndicator label="آماده‌سازی نمونه" value={45} />
    <ProgressIndicator label="کامل‌شده" value={100} />
    <LoadingSkeleton rows={2} label="دریافت داده‌های نمونه" />
    <p data-test-id="glass-loading-static" className="text-xs text-muted-foreground">جای‌نگهدارهای بارگذاری ثابت‌اند و پالس ندارند.</p>
  </GlassPreviewFrame>;
}
