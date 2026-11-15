import { FileText, Ellipsis, Bell } from "lucide-react";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";

const examples = ["سندها", "مخزن‌ها"];

export function GlassScrollCatalogue() {
  return <section data-test-id="glass-scroll-catalogue" aria-labelledby="glass-scroll-title" className="space-y-3 text-foreground">
    <h3 data-test-id="glass-scroll-title" id="glass-scroll-title" className="font-bold">فهرست‌های مستقل و کنترل‌های شیشه‌ای</h3>
    <GlassModal testId="catalogue-scroll-modal" title="اعلان نمونه" description="نمونهٔ دکمه شیشه‌ای هدر" trigger={<Button data-test-id="catalogue-glass-header-button" variant="glass" size="icon" aria-label="نمایش اعلان نمونه"><Bell aria-hidden="true" /></Button>}>
      <p data-test-id="catalogue-glass-header-note">درخواست تازه‌ای وجود ندارد.</p>
    </GlassModal>
    <div data-test-id="glass-scroll-examples" className="grid gap-4 lg:grid-cols-2">
      {examples.map((label, index) => <GlassCard key={label} data-test-id={`catalogue-scroll-panel-${index}`} className="flex h-72 min-h-0 flex-col p-3">
        <h4 data-test-id={`catalogue-scroll-heading-${index}`} className="mb-3 font-medium">{label}</h4>
        <GlassScrollArea data-test-id={`catalogue-scroll-${index}`} label={`فهرست نمونه ${label}`}>
          {Array.from({ length: 12 }, (_, row) => <div key={row} data-test-id={`catalogue-scroll-row-${index}-${row}`} className="flex items-center gap-3 border-b border-white/30 p-3">
            <GlassEmblem data-test-id={`catalogue-scroll-icon-${index}-${row}`} className="size-9"><FileText aria-hidden="true" className="size-4" /></GlassEmblem>
            <span data-test-id={`catalogue-scroll-label-${index}-${row}`} className="flex-1 text-sm">مورد نمونه {row + 1}</span>
            <GlassEmblem data-test-id={`catalogue-scroll-operation-${index}-${row}`} className="size-9"><Ellipsis aria-hidden="true" className="size-4" /></GlassEmblem>
          </div>)}
        </GlassScrollArea>
      </GlassCard>)}
    </div>
  </section>;
}
