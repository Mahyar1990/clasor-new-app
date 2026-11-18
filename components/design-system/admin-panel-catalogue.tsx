"use client";
import { useState } from "react";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { CheckboxField } from "@/components/ui/choice-field";
import { AdminSummary } from "./admin/summary";
import { AdminFeedbackList } from "./admin/feedback";
import { adminFeedback } from "./admin/fixtures";
export function AdminPanelCatalogue() {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [zero, setZero] = useState(false);
  return <GlassPreviewFrame title="کارت آمار و جدول بازخورد؛ الگوی پنل ادمین" testId="admin-panel-catalogue">
    <div data-test-id="catalogue-admin-controls" className="flex flex-wrap gap-4">
      <CheckboxField data-test-id="catalogue-admin-loading" label="بارگذاری آمار" checked={loading} onCheckedChange={setLoading} />
      <CheckboxField data-test-id="catalogue-admin-zero" label="آمار صفر" checked={zero} onCheckedChange={setZero} />
      <CheckboxField data-test-id="catalogue-admin-empty" label="بازخورد خالی" checked={empty} onCheckedChange={setEmpty} />
    </div>
    <AdminSummary loading={loading} empty={zero} />
    <AdminFeedbackList key={String(empty)} records={empty ? [] : adminFeedback} />
  </GlassPreviewFrame>;
}
