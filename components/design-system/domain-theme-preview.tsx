"use client";
import type { CSSProperties } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { panelPaletteStyles } from "@/lib/design-system/panel-palette";
import { useDomain } from "./domain/store";
import { GlassPreviewFrame } from "./glass-preview-frame";
/** Catalogue-only saved theme scope; it never recolors the surrounding catalogue. */
export function DomainThemePreview() {
  const { state } = useDomain();
  const palette = panelPaletteStyles(state.settings.colors);
  return <GlassPreviewFrame title="رنگ ذخیره‌شدهٔ دامنه در دو تم" testId="glass-domain-palette">
    <div data-test-id="catalogue-domain-theme" style={palette as CSSProperties}>
    <GlassCard data-test-id="catalogue-domain-theme-card" surface="glass" className="space-y-2 p-3">
      <p data-test-id="catalogue-domain-theme-copy" className="text-xs">تغییرات فرم فقط پس از ذخیره اینجا دیده می‌شوند. رنگ سفارشی در هر دو تم همان مقدار ذخیره‌شده است؛ خوانایی آن را در هر دو تم بررسی کنید.</p>
      <div data-test-id="catalogue-domain-theme-controls" className="flex flex-wrap items-center gap-2">
        <Button data-test-id="catalogue-domain-theme-button" size="sm">دکمه اصلی</Button>
        <Input data-test-id="catalogue-domain-theme-input" aria-label="نمونه ورودی تم" placeholder="متن پیش‌فرض" className={palette["--glass-tint"] ? "max-w-48 dark:glass-enabled:bg-[var(--glass-tint)]/40" : "max-w-48"} />
      </div>
    </GlassCard>
    </div>
  </GlassPreviewFrame>;
}
