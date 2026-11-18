"use client";
import type { CSSProperties } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { panelPaletteStyles } from "@/lib/design-system/panel-palette";
import { useDomain } from "./domain/store";
/** Catalogue-only saved theme scope; it never recolors the surrounding catalogue. */
export function DomainThemePreview() {
  const { state } = useDomain();
  return <div data-test-id="catalogue-domain-theme" style={panelPaletteStyles(state.settings.colors) as CSSProperties} className="mt-3">
    <GlassCard data-test-id="catalogue-domain-theme-card" className="space-y-2 p-3">
      <p data-test-id="catalogue-domain-theme-copy" className="text-xs">پیش‌نمایش رنگ‌های ذخیره‌شده؛ تغییرات فرم پس از ذخیره اینجا دیده می‌شوند.</p>
      <div data-test-id="catalogue-domain-theme-controls" className="flex flex-wrap items-center gap-2"><Button data-test-id="catalogue-domain-theme-button" size="sm">دکمه اصلی</Button><Input data-test-id="catalogue-domain-theme-input" aria-label="نمونه ورودی تم" placeholder="متن پیش‌فرض" className="max-w-48" /></div>
    </GlassCard>
  </div>;
}
