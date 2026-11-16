"use client";

import { useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { Sample } from "@/components/design-system/sample";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { Checkbox } from "@/components/ui/checkbox";

export function GlassTabsCatalogue() {
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState<string | number | null>("all");
  return <div data-test-id="glass-tabs-catalogue" className="space-y-5">
    <GlassPreviewFrame title="تب‌های پیش‌فرض؛ سطح و انتخاب شیشه‌ای" testId="glass-default-tabs">
      <Tabs data-test-id="glass-default-tabs-root" defaultValue="overview">
        <TabsList data-test-id="glass-default-tabs-list" aria-label="نمونه تب‌های پیش‌فرض" activateOnFocus className="max-w-full flex-wrap group-data-horizontal/tabs:h-auto">
          <TabsTrigger data-test-id="glass-default-tab-overview" value="overview" className="min-h-11 px-4">نمای کلی</TabsTrigger>
          <TabsTrigger data-test-id="glass-default-tab-activity" value="activity" className="min-h-11 px-4">فعالیت‌ها</TabsTrigger>
          <TabsTrigger data-test-id="glass-default-tab-disabled" value="disabled" disabled className="min-h-11 px-4">غیرفعال</TabsTrigger>
        </TabsList>
        <TabsContent data-test-id="glass-default-panel-overview" value="overview" className="py-4">نمای کلی نمونه</TabsContent>
        <TabsContent data-test-id="glass-default-panel-activity" value="activity" className="py-4">فعالیت‌های نمونه</TabsContent>
      </Tabs>
    </GlassPreviewFrame>
    <Sample title="تب‌بار شیشه‌ای بخش‌بندی‌شده" description="همان کامپوننت مشترک داشبورد؛ ریل فرورفته، نور مورب روی تب فعال، لبه روشن و سایه شناوری؛ با متن کامل، فوکوس مستقل و پیمایش در عرض کم. نمای سطح بالای کاتالوگ حالت بدون شفافیت را فعال می‌کند.">
      <ClasorTabs variant="segmented" label="نمونه تب‌های سندها" defaultValue="mine" items={[
        { value: "mine", label: "سندهای من", content: "اسناد شخصی نمونه؛ انتخاب این بخش روی تب‌های مخزن‌ها اثری ندارد." },
        { value: "shared", label: "سندهای اشتراکی", content: "اسناد اشتراکی نمونه؛ داده‌ای از حساب واقعی خوانده نمی‌شود." },
      ]} />
      <label data-test-id="glass-tabs-disabled-label" className="flex min-h-11 items-center gap-2 text-sm">
        <Checkbox data-test-id="glass-tabs-disabled" aria-label="غیرفعال‌کردن تب مخزن‌های اشتراکی" checked={disabled} onCheckedChange={checked => { setDisabled(checked === true); if (checked && selected === "shared") setSelected("all"); }} />غیرفعال‌کردن تب مخزن‌های اشتراکی
      </label>
      <ClasorTabs variant="segmented" label="نمونه تب‌های مخزن‌ها" value={selected} onValueChange={setSelected} items={[
        { value: "all", label: "همه‌ی مخزن‌ها", content: "همه مخزن‌های نمونه نمایش داده می‌شوند." },
        { value: "mine", label: "مخزن‌های من", content: "فقط مخزن‌های شخصی نمونه نمایش داده می‌شوند." },
        { value: "shared", label: "مخزن‌های اشتراکی", content: "فقط مخزن‌های اشتراکی نمونه نمایش داده می‌شوند.", disabled },
      ]} />
    </Sample>
    <Sample title="عنوان بلند و زمینه تیره" description="برچسب‌ها بریده نمی‌شوند. در عرض کم، ریل به‌صورت افقی پیمایش می‌شود؛ فوکوس با کلیدهای جهت، تب را در دید قرار می‌دهد.">
      <div data-test-id="glass-tabs-dark" className="dark scheme-dark rounded-lg bg-slate-950 p-4 text-slate-100">
        <ClasorTabs variant="segmented" label="نمونه تب‌های بلند" defaultValue="active" items={[
          { value: "active", label: "سندهای فعال گروه طراحی", content: "نمای سندهای فعال؛ نمونه زمینه تیره." },
          { value: "archive", label: "سندهای بایگانی‌شده گروه طراحی", content: "نمای بایگانی؛ نمونه برچسب بلند." },
        ]} />
      </div>
    </Sample>
  </div>;
}
