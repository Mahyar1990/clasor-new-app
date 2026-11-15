"use client";

import { useState } from "react";
import { Settings, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassDropdown } from "@/components/ui/GlassDropdown";

export function CatalogueProfileMenu() {
  const [message, setMessage] = useState("");
  return <>
    <GlassDropdown items={[
      { id: "profile", label: "نمایش پروفایل", icon: <UserRound />, onSelect: () => setMessage("نمایش پروفایل در نمونه انتخاب شد.") },
      { id: "settings", label: "تنظیمات حساب", icon: <Settings />, onSelect: () => setMessage("تنظیمات حساب در نمونه انتخاب شد.") },
      { id: "unavailable", label: "گزینه غیرفعال نمونه", disabled: true, onSelect: () => {} },
    ]} />
    <span role="status" data-test-id="catalogue-profile-status" className="sr-only">{message}</span>
  </>;
}

export function GlassOverlayCatalogue() {
  const [message, setMessage] = useState("");
  return (
    <section aria-labelledby="glass-overlays-title" data-test-id="glass-overlay-catalogue" className="space-y-4">
      <h2 data-test-id="glass-overlay-catalogue-h2-3" id="glass-overlays-title" className="text-xl font-bold">پنجره و منوی شیشه‌ای</h2>
      <p data-test-id="glass-overlay-catalogue-p-4" className="text-sm leading-body">منوی پروفایل را از هدر باز کنید یا پنجرهٔ نمونه را ببینید. کلید Escape پنجره و منو را می‌بندد.</p>
      <GlassModal
        title="پنجرهٔ شیشه‌ای کلاسور"
        description="نمونهٔ لایهٔ شناور با پس‌زمینهٔ تاریک و محو."
        trigger={<Button data-test-id="glass-overlay-catalogue-button-5" variant="outline">باز کردن مودال شیشه‌ای</Button>}
      >
        <div data-test-id="glass-overlay-catalogue-div-6" className="space-y-4">
          <p data-test-id="glass-overlay-catalogue-p-7" className="text-sm leading-body">این محتوا از طریق children نمایش داده می‌شود. فوکوس داخل پنجره می‌ماند و پس از بستن به دکمهٔ آغازگر برمی‌گردد.</p>
          <GlassDropdown
            testId="modal-dropdown"
            label="اقدام‌های نمونه"
            trigger={<Button data-test-id="glass-overlay-catalogue-button-8" variant="outline">منوی داخل مودال</Button>}
            items={[
              { id: "preview", label: "انتخاب اقدام نمونه", onSelect: () => setMessage("اقدام نمونه انتخاب شد.") },
              { id: "disabled", label: "اقدام غیرفعال", disabled: true, onSelect: () => {} },
            ]}
          />
          <p role="status" data-test-id="catalogue-overlay-status" className="text-sm">{message}</p>
        </div>
      </GlassModal>
    </section>
  );
}
