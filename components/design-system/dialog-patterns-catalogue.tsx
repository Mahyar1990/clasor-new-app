"use client";
import { useState } from "react";
import { NavigableGlassModal, useDialogNavigation } from "@/components/ui/DialogNavigation";
import { UploadProgress } from "@/components/ui/UploadProgress";
import { PathPicker } from "@/components/ui/PathPicker";
import { RadioField } from "@/components/ui/choice-field";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { documentFolders } from "./document-dialogs/move-data";
function NavigationExample() {
  const { push, back } = useDialogNavigation();
  return <Button data-test-id="catalogue-dialog-next" onClick={() => push("عملیات عضو", <div data-test-id="catalogue-dialog-inner" className="space-y-3"><TextField data-test-id="catalogue-dialog-inner-name" label="نام کاربر" defaultValue="همکار نمونه" /><Button data-test-id="catalogue-dialog-inner-back" variant="outline" onClick={back}>بازگشت به فهرست</Button></div>)}>نمایش عملیات عضو</Button>;
}
export function DialogPatternsCatalogue() {
  const [path, setPath] = useState<string[]>([]);
  const [progress, setProgress] = useState(45);
  const [cancelled, setCancelled] = useState(false);
  const [choice, setChoice] = useState("default");
  return <section data-test-id="dialog-patterns-catalogue" className="space-y-4">
    <h3 data-test-id="dialog-patterns-title" className="text-lg font-bold">ناوبری دیالوگ، بارگذاری و مسیر درختی</h3>
    <NavigableGlassModal testId="catalogue-navigation-dialog" title="فهرست اعضا" description="عملیات داخلی در همین پنجره؛ بازگشت با حفظ فرم و فوکوس." compact surface="liquid" trigger={<Button data-test-id="catalogue-navigation-open" variant="outline">نمونهٔ دیالوگ با بازگشت</Button>}><NavigationExample /></NavigableGlassModal>
    <UploadProgress name="راهنمای نمونه.pdf" value={progress} cancelled={cancelled} onRetry={() => { setCancelled(false); setProgress(45); }} onCancel={() => { setCancelled(true); setProgress(0); }} />
    <PathPicker nodes={documentFolders} value={path} onValueChange={setPath} />
    <RadioField label="تنظیمات زیر گزینهٔ فعال" value={choice} onValueChange={value => setChoice(String(value))} options={[{ value: "default", label: "تصویر پیش‌فرض", content: <p data-test-id="catalogue-radio-default" className="text-xs">نمونه‌های پیش‌فرض در زیر همین گزینه ظاهر می‌شوند.</p> }, { value: "custom", label: "تصویر سفارشی", content: <TextField data-test-id="catalogue-radio-custom" label="نام تصویر دلخواه" /> }]} />
  </section>;
}
