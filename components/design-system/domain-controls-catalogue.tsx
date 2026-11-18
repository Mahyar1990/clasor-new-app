"use client";
import { useState } from "react";
import { ColorField } from "@/components/ui/ColorField";
import { Checkbox } from "@/components/ui/checkbox";
import { ReviewActions } from "@/components/ui/ReviewActions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sample } from "./sample";
export function DomainInputsCatalogue() {
  const [value, setValue] = useState("#7c3aed");
  const [disabled, setDisabled] = useState(false);
  return <Sample title="رنگ قابل ویرایش" description="کد شش‌رقمی و انتخابگر رنگ همگام‌اند؛ خطای مقدار نامعتبر و حالت غیرفعال قابل بررسی‌اند.">
    <label data-test-id="catalogue-color-disabled-label" className="mb-3 flex items-center gap-2 text-xs"><Checkbox data-test-id="catalogue-color-disabled" checked={disabled} onCheckedChange={value => setDisabled(!!value)} />غیرفعال</label>
    <div data-test-id="catalogue-color-field-wrap" className="max-w-xs"><ColorField testId="catalogue-color-field" label="رنگ اصلی" value={value} onValueChange={setValue} disabled={disabled} /></div>
  </Sample>;
}
export function DomainReviewCatalogue() {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [dark, setDark] = useState(false);
  return <Sample title="تصمیم مستقیم روی ردیف" description="تأیید و رد جمع‌وجور؛ بعد از تصمیم برچسب وضعیت جای کنترل‌ها را می‌گیرد. کسب‌وکار و مجوز در مالک فهرست باقی می‌مانند.">
    <label data-test-id="catalogue-review-dark-label" className="mb-3 flex items-center gap-2 text-xs"><Checkbox data-test-id="catalogue-review-dark" checked={dark} onCheckedChange={value => setDark(!!value)} />تم تیره محلی</label>
    <GlassCard data-test-id="catalogue-review-surface" className={`${dark ? "dark" : ""} space-y-3 p-3`}>
      <ReviewActions testId="catalogue-review-actions" status={status} label="درخواست نمونه" onDecision={setStatus} />
      <ReviewActions testId="catalogue-review-disabled" status="pending" label="درخواست بدون دسترسی" onDecision={() => {}} disabled />
      <Button data-test-id="catalogue-review-reset" size="sm" variant="outline" onClick={() => setStatus("pending")}>بازنشانی نمونه</Button>
    </GlassCard>
  </Sample>;
}
