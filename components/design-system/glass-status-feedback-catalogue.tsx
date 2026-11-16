"use client";

import { ApprovalBadge, VisibilityBadge, RoleBadge } from "@/components/ui/status-badge";
import { Identity } from "@/components/ui/identity";
import { Feedback } from "@/components/ui/feedback";
import { ProgressIndicator, LoadingSkeleton } from "@/components/ui/progress-indicator";
import { GlassPreviewFrame } from "./glass-preview-frame";

export function GlassStatusStatesCatalogue() {
  return <GlassPreviewFrame title="نشان و هویت؛ رنگ معنایی روی شیشه" testId="glass-status-states">
    <div data-test-id="glass-status-badges" className="flex flex-wrap gap-3">
      <ApprovalBadge status="draft" /><ApprovalBadge status="pending" /><ApprovalBadge status="approved" /><ApprovalBadge status="rejected" />
      <VisibilityBadge visibility="private" /><RoleBadge role="owner" />
    </div>
    <div data-test-id="glass-status-identities" className="flex flex-wrap gap-6">
      <Identity identity={{ kind: "known", id: "glass-person", name: "همکار نمونه" }} />
      <Identity identity={{ kind: "unknown", label: "هویت نامشخص" }} />
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
  </GlassPreviewFrame>;
}
