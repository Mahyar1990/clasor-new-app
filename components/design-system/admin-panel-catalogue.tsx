"use client";
import { useState } from "react";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { SelectField } from "@/components/ui/select-field";
import { CheckboxField } from "@/components/ui/choice-field";
import { AdminSummary } from "./admin/summary";
import { AdminFeedbackList } from "./admin/feedback";
import { adminFeedback } from "./admin/fixtures";
export function AdminPanelCatalogue() {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [zero, setZero] = useState(false);
  const [attachments, setAttachments] = useState("normal");
  const records = adminFeedback.map((record, index) => index !== adminFeedback.length - 1 || attachments === "normal" ? record : { ...record, attachments: attachments === "many" ? Array.from({ length: 14 }, (_, index) => ({ ...record.attachments![index % record.attachments!.length], id: `attachment-${index}`, name: `پیوست ${index + 1}.pdf`, size: 2288, url: "/sample-content/research-report.pdf" })) : [{ id: "unavailable", name: "پیوست ناموجود.pdf", size: 0 }] });
  return <GlassPreviewFrame title="کارت آمار و جدول بازخورد؛ الگوی پنل ادمین" testId="admin-panel-catalogue">
    <div data-test-id="catalogue-admin-controls" className="flex flex-wrap gap-4">
      <CheckboxField data-test-id="catalogue-admin-loading" label="بارگذاری آمار" checked={loading} onCheckedChange={setLoading} />
      <CheckboxField data-test-id="catalogue-admin-zero" label="آمار صفر" checked={zero} onCheckedChange={setZero} />
      <CheckboxField data-test-id="catalogue-admin-empty" label="بازخورد خالی" checked={empty} onCheckedChange={setEmpty} />
    </div>
    <div data-test-id="catalogue-admin-attachment-case" className="max-w-xs"><SelectField data-test-id="catalogue-admin-attachments" label="پیوست‌های آخرین بازخورد" size="sm" value={attachments} onValueChange={setAttachments} options={[{ value: "normal", label: "متن، PDF و تصویر" }, { value: "many", label: "فایل‌های زیاد" }, { value: "unavailable", label: "فایل در دسترس نیست" }]} /></div>
    <AdminSummary loading={loading} empty={zero} />
    <AdminFeedbackList key={String(empty)} records={empty ? [] : records} />
  </GlassPreviewFrame>;
}
