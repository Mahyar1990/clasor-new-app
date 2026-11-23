"use client";
import { useRef, useState } from "react";
import { ListTree } from "lucide-react";
import { FloatingActionBar } from "@/components/ui/FloatingActionBar";
import { ReactionControl, type ReactionValue } from "@/components/ui/ReactionControl";
import { ContentsNavigation } from "@/components/ui/ContentsNavigation";
import { DockedPanel } from "@/components/ui/DockedPanel";
import { ReadingSurface } from "@/components/ui/ReadingSurface";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PublishHeaderActions } from "./publish/header-actions";
import { PublishSessionProvider } from "./publish/session";
import { reactionCounts } from "./publish/article-state";
import { LibraryProvider } from "./library/store";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { publishToolsDemoLayout } from "./catalogue-layout";
const headings = [{ id: "catalogue-publish-intro", label: "معرفی", level: 1 }, { id: "catalogue-publish-start", label: "شروع به کار", level: 2 }, { id: "catalogue-publish-category", label: "دسته‌بندی‌ها", level: 3 }, { id: "catalogue-publish-nested", label: "زیرمجموعهٔ داخلی", level: 4 }, { id: "catalogue-publish-detail", label: "جزئیات", level: 5 }, { id: "catalogue-publish-leaf", label: "سرفصل نهایی", level: 6 }, { id: "catalogue-publish-help", label: "راهنما و پرسش‌ها", level: 2 }];
function DeepHeadings() {
  return headings.slice(2, 6).map(item => {
    return <h6 key={item.id} id={item.id} tabIndex={-1} data-test-id={`publish-demo-heading-${item.id}`} className="text-xs font-medium focus-visible:outline-2 focus-visible:outline-ring">{item.label}</h6>;
  });
}
function Examples() {
  const [expanded, setExpanded] = useState(false);
  const [dock, setDock] = useState(false);
  const [reaction, setReaction] = useState<ReactionValue>(null);
  const [empty, setEmpty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(headings[0].id);
  const origin = useRef<HTMLButtonElement>(null);
  const tools = useRef<HTMLDivElement>(null);
  const article = useRef<HTMLDivElement>(null);
  function select(id: string) { setSelected(id); article.current?.querySelector<HTMLElement>(`[id="${id}"]`)?.focus({ preventScroll: true }); }
  function closeDock() {
    setDock(false);
    const target = expanded ? origin.current : tools.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-demo-bar-toggle"]');
    target?.focus({ preventScroll: true });
  }
  return <GlassPreviewFrame testId="publish-tools-catalogue" title="ابزارهای پابلیش؛ هدر مهمان و حساب، جستجو، بازخورد و فهرست سند">
    <PublishHeaderActions />
    <p data-test-id="publish-tools-demo-note" className="text-[11px] text-muted-foreground">ورود نمونه، تصویر حساب را جایگزین ورود می‌کند. خبرنامه و دو حالت جستجو از همین هدر باز می‌شوند.</p>
    <label data-test-id="publish-demo-disabled-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-demo-disabled" checked={disabled} onCheckedChange={value => setDisabled(!!value)} />واکنش غیرفعال</label>
    <label data-test-id="publish-demo-empty-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-demo-empty" checked={empty} onCheckedChange={value => setEmpty(!!value)} />فهرست خالی</label>
    <div data-test-id="publish-demo-tools" ref={tools}><FloatingActionBar testId="publish-demo-bar" open={expanded} onOpenChange={setExpanded}><Button data-test-id="publish-demo-contents-toggle" ref={origin} size="icon-sm" variant="ghost" aria-label="فهرست سند نمونه" aria-expanded={dock} aria-controls="publish-demo-drawer" onClick={() => setDock(current => !current)}><ListTree aria-hidden="true" /></Button><ReactionControl testId="publish-demo-reaction" value={reaction} {...reactionCounts(reaction, 20, 3)} onValueChange={setReaction} disabled={disabled} /></FloatingActionBar></div>
    <div data-test-id="publish-tools-demo-stage" className={publishToolsDemoLayout}>
      <DockedPanel testId="publish-demo-drawer" title="فهرست سند" closeLabel="بستن فهرست سند" open={dock} onClose={closeDock} animate className="max-md:h-40 max-md:w-full max-md:max-w-none"><ContentsNavigation testId="publish-demo-contents" items={empty ? [] : headings} selectedId={selected} onSelect={select} /></DockedPanel>
      <div ref={article} data-test-id="publish-demo-paper-region" className="min-w-0 flex-1"><ReadingSurface titleAs="h4" testId="publish-demo-paper" width="full" titleId={headings[0].id} title="معرفی" metadata="نمای تمام‌عرض بدون محدودیت خواندن"><h5 id={headings[1].id} tabIndex={-1} data-test-id="publish-demo-start" className="text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">شروع به کار</h5><p data-test-id="publish-demo-body">فهرست سند در فضای خودش قرار می‌گیرد و محتوا را نمی‌پوشاند.</p><DeepHeadings /><h5 id="catalogue-publish-help" tabIndex={-1} data-test-id="publish-demo-help" className="text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">راهنما و پرسش‌ها</h5></ReadingSurface></div>
    </div>
  </GlassPreviewFrame>;
}
export function PublishToolsCatalogue() { return <LibraryProvider><PublishSessionProvider><Examples /></PublishSessionProvider></LibraryProvider>; }
