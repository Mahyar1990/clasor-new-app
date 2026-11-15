import { FolderOpen, Layers, UserRound } from "lucide-react";
import { GlassEmblem } from "@/components/ui/GlassEmblem";

/** Representative identity surfaces; inherits the catalogue's local theme. */
export function GlassIdentityCatalogue() {
  return <section data-test-id="glass-identity-catalogue" aria-labelledby="glass-identity-title" className="space-y-3 text-foreground">
    <h3 data-test-id="glass-identity-title" id="glass-identity-title" className="font-bold">نشان‌ها و آواتار شیشه‌ای</h3>
    <p data-test-id="glass-identity-description" className="text-sm text-muted-foreground">قاب نشان برنامه، آیکون مخزن و هویت کاربر با انعکاس نور و لبهٔ برجسته.</p>
    <div data-test-id="glass-identity-examples" className="flex flex-wrap items-center gap-6">
      <GlassEmblem data-test-id="catalogue-glass-logo" className="size-10" role="img" aria-label="نشان برنامه"><Layers aria-hidden="true" className="size-6" /></GlassEmblem>
      <GlassEmblem data-test-id="catalogue-glass-folder" role="img" aria-label="مخزن"><FolderOpen aria-hidden="true" className="size-6" /></GlassEmblem>
      <GlassEmblem data-test-id="catalogue-glass-avatar" shape="avatar" className="size-9 text-sm" role="img" aria-label="کاربر نمونه">ک ن</GlassEmblem>
      <GlassEmblem data-test-id="catalogue-glass-avatar-fallback" shape="avatar" role="img" aria-label="کاربر بدون تصویر"><UserRound aria-hidden="true" className="size-5" /></GlassEmblem>
    </div>
  </section>;
}
