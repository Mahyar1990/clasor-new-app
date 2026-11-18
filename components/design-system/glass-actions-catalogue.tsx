"use client";
import { useState } from "react";
import { Bell, FolderOpen, MessageSquare, UserRound, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassPreviewFrame } from "./glass-preview-frame";
export function GlassActionsCatalogue() {
  const [selected, setSelected] = useState(false);
  return <GlassPreviewFrame title="دکمه و آیکون شیشه‌ای؛ لبهٔ نورگیر و عمق ظریف" testId="glass-actions-catalogue">
    <div data-test-id="glass-actions-controls" className="flex flex-wrap items-center gap-3">
      <Button data-test-id="glass-actions-primary"><Plus aria-hidden="true" />ایجاد سند</Button>
      <Button data-test-id="glass-actions-secondary" variant="outline">مشاهده</Button>
      <IconButton data-test-id="glass-actions-bell" variant="glass" aria-label="اعلان‌ها" aria-pressed={selected} onClick={() => setSelected(!selected)}><Bell aria-hidden="true" /></IconButton>
      <IconButton data-test-id="glass-actions-feedback" variant="glass" aria-label="بازخورد"><MessageSquare aria-hidden="true" /></IconButton>
      <IconButton data-test-id="glass-actions-disabled" variant="glass" aria-label="حساب غیرفعال" disabled><UserRound aria-hidden="true" /></IconButton>
      <GlassEmblem data-test-id="glass-actions-emblem" role="img" aria-label="نشان مخزن" className="size-9"><FolderOpen aria-hidden="true" className="size-5" /></GlassEmblem>
    </div>
    <p data-test-id="glass-actions-description" className="text-xs text-muted-foreground">نماد خوانا، سطح نیمه‌شفاف، انعکاس ملایم و حاشیهٔ داخلی؛ فوکوس و حالت فشرده حفظ می‌شوند. حرکت و شفافیت تابع تنظیمات دسترس‌پذیری‌اند.</p>
  </GlassPreviewFrame>;
}
