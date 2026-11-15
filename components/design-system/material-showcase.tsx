"use client"

import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function MaterialShowcase() {
  return <section data-test-id="material-showcase-section-1" className={cn("material-showcase", "my-6 rounded-xl p-6", glass.canvas)} aria-labelledby="material-title">
    <h2 data-test-id="material-showcase-h2-2" id="material-title" className="mb-2 text-xl font-bold">شیشه مات، محتوای خوانا</h2>
    <p data-test-id="material-showcase-p-3" className="mb-4 text-sm text-muted-foreground">ناوبری، پوشش محتوا و کنترل‌ها شیشه‌ای هستند؛ ردیف‌های داده سطح خوانا دارند.</p>
    <div data-test-id="material-showcase-div-4" className={cn("material-showcase-grid", "grid grid-cols-1 gap-4 min-[641px]:grid-cols-2")}>
      <div data-test-id="material-showcase-div-5" className={cn("material-showcase-panel", glass.panel, "rounded-lg p-5")} data-material-surface="chrome">
        <h3 data-test-id="material-showcase-h3-6" className="mb-3 font-bold">ناوبری و نوار ابزار</h3>
        <p data-test-id="material-showcase-p-7" className="mb-4 text-sm">سطح نیمه‌شفاف با حاشیه روشن و عمق ملایم.</p>
        <DropdownMenu>
          <DropdownMenuTrigger data-test-id="material-menu-trigger" render={<Button data-test-id="material-menu-trigger" variant="outline" />}>مشاهده منوی شیشه‌ای</DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-48" dir="rtl">
            <DropdownMenuItem data-test-id="material-menu-details">نمایش اطلاعات</DropdownMenuItem>
            <DropdownMenuItem data-test-id="material-menu-versions">مشاهده نسخه‌ها</DropdownMenuItem>
            <DropdownMenuItem data-test-id="material-menu-disabled" disabled>گزینه غیرفعال نمونه</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div data-test-id="material-showcase-div-10" className={cn("material-showcase-panel ", glass.panel, "rounded-lg p-5")}>
        <h3 data-test-id="material-showcase-h3-11" className="mb-3 font-bold">پوشش و ورودی شیشه‌ای</h3>
        <Label htmlFor="material-example-title">عنوان سند نمونه</Label>
        <Input id="material-example-title" data-test-id="material-example-input" className="mt-2" placeholder="مثلاً راهنمای همکاری" />
        <p data-test-id="material-showcase-p-13" className="mt-4 text-sm leading-body">متن‌های طولانی و داده‌ها با پس‌زمینه خوانا نمایش داده می‌شوند. شفافیت هیچ‌گاه به متن یا آیکون اعمال نمی‌شود.</p>
      </div>
    </div>
  </section>
}
