"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog, DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { DetailsSheet } from "@/components/ui/details-sheet";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { toast } from "@/components/ui/toast";
import { GlassPreviewFrame } from "./glass-preview-frame";

export function GlassLayerStatesCatalogue() {
  return <GlassPreviewFrame title="لایه‌های شیشه‌ای؛ حفظ تم و فوکوس" testId="glass-layer-states">
    <p data-test-id="glass-layer-description" className="text-xs leading-relaxed text-muted-foreground">حالت تاریک را روشن کنید و پنجره‌ها را باز کنید؛ تم همان نمونه به لایه منتقل می‌شود.</p>
    <p data-test-id="glass-layer-dialog-motion" className="text-xs leading-relaxed text-muted-foreground">«تأیید نمونه» یا «حذف نمونه» را باز کنید: پنجره بدون زوم ظاهر می‌شود. با Escape ببندید و بازگشت فوکوس را ببینید. در حالت کاهش حرکت، پنجره بدون گذار باز و بسته می‌شود.</p>
    <p data-test-id="glass-layer-sheet-toast-motion" className="text-xs leading-relaxed text-muted-foreground">«جزئیات نمونه» از لبه وارد می‌شود. «پیام گذرا» را چند بار بزنید تا چیدمان اعلان‌ها را ببینید؛ اعلان را برای بستن بکشید. در حالت کاهش حرکت، گذارها حذف می‌شوند.</p>
    <div data-test-id="glass-layer-controls" className="flex flex-wrap items-start gap-3">
      <ConfirmationDialog trigger={<Button data-test-id="glass-layer-confirm" variant="outline">تأیید نمونه</Button>} title="تأیید نمونه" description="این پنجره داده‌ای را تغییر نمی‌دهد." targetName="سند نمونه" confirmLabel="تأیید" onConfirm={() => {}} />
      <DestructiveDialog trigger={<Button data-test-id="glass-layer-delete" variant="destructive-outline">حذف نمونه</Button>} title="حذف نمونه" description="نمونهٔ تأیید حساس با تمرکز اولیه روی انصراف." targetName="سند نمونه" confirmLabel="حذف" onConfirm={() => {}} />
      <DetailsSheet trigger={<Button data-test-id="glass-layer-sheet" variant="outline">جزئیات نمونه</Button>} title="جزئیات نمونه" description="پنل شیشه‌ای با پیمایش مستقل"><p data-test-id="glass-layer-sheet-copy" className="text-sm">نام و مشخصات سند نمونه در این پنل نمایش داده می‌شود.</p></DetailsSheet>
      <HelpTooltip content="راهنمای مکمل با سطح شیشه‌ای و متن خوانا"><Button data-test-id="glass-layer-tooltip" variant="glass" size="icon" aria-label="راهنمای نمونه"><Info aria-hidden="true" /></Button></HelpTooltip>
      <Button data-test-id="glass-layer-toast" variant="outline" onClick={() => toast.add({ title: "نمونهٔ موفقیت", description: "سطح شیشه‌ای با رنگ معنایی مستقل", type: "success" })}>پیام گذرا</Button>
    </div>
  </GlassPreviewFrame>;
}
