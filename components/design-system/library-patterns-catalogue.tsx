"use client";
import { useState } from "react";
import { FolderOpen, Ellipsis } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { DialogSection } from "@/components/ui/DialogSection";
import { GlassTile } from "@/components/ui/GlassTile";
import { Button } from "@/components/ui/button";
import { MultiSortEditor } from "@/components/ui/MultiSortEditor";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { RepositorySkeletons } from "./library/repository-skeletons";
import { LibraryProvider } from "./library/store";
import { CreationDialog, type CreationKind } from "./library/create";
import { FilterDialog } from "./library/filters";
import { defaultSort, emptyFilters, sortFields } from "./library/query";
function Patterns() {
  const [sort, setSort] = useState(defaultSort);
  const [filters, setFilters] = useState(emptyFilters);
  const [opened, setOpened] = useState<{ kind: string; trigger: HTMLElement } | null>(null);
  const [notice, setNotice] = useState("");
  return <GlassPreviewFrame title="فهرست‌های کلاسور؛ سطح ساده، کارت مربعی و ساخت مرحله‌ای" testId="library-patterns-catalogue">
    <GlassCard data-test-id="catalogue-flat-nesting" className="p-3"><DialogSection testId="catalogue-flat-section" title="گروه داخلی بدون شیشهٔ تکراری"><p data-test-id="catalogue-flat-copy" className="text-xs text-muted-foreground">سطح اصلی شیشه‌ای است؛ گروه‌های داخل آن با فاصله و جداکننده تعریف می‌شوند.</p></DialogSection></GlassCard>
    <div data-test-id="library-patterns-tiles" className="grid max-w-sm grid-cols-2 gap-2">
      <GlassTile testId="catalogue-square-tile" title="مستندات محصول" icon={<FolderOpen />} metadata="مالک · فعال" actions={<Button data-test-id="catalogue-square-actions" variant="glass" size="icon-sm" aria-label="عملیات مخزن نمونه" onClick={() => setNotice("کارت و عملیات آن دو کنترل مستقل‌اند.")}><Ellipsis aria-hidden="true" /></Button>} onOpen={() => setNotice("مشاهدهٔ اطلاعات مخزن نمونه")} />
    </div>
    <RepositorySkeletons testId="catalogue-repository-skeletons" />
    <p data-test-id="library-patterns-notice" role="status" className="text-xs">{notice}</p>
    <MultiSortEditor fields={sortFields} value={sort} onValueChange={setSort} />
    <div data-test-id="library-patterns-creation" className="flex flex-wrap gap-2">
      {(["document", "folder", "template", "repository"] as CreationKind[]).map(kind => <Button data-test-id={`catalogue-create-${kind}`} key={kind} size="sm" variant="outline" onClick={event => setOpened({ kind, trigger: event.currentTarget })}>{{ document: "ساخت سند", folder: "دسته‌بندی", template: "نمونه سند", repository: "مخزن" }[kind]}</Button>)}
      <Button data-test-id="catalogue-library-filter" size="sm" variant="outline" onClick={event => setOpened({ kind: "filter", trigger: event.currentTarget })}>فیلتر اسناد</Button>
    </div>
    {opened && opened.kind !== "filter" && <CreationDialog kind={opened.kind as CreationKind} trigger={opened.trigger} close={() => setOpened(null)} />}
    {opened?.kind === "filter" && <FilterDialog value={filters} onApply={setFilters} trigger={opened.trigger} close={() => setOpened(null)} tags={["راهنما", "محصول"]} />}
  </GlassPreviewFrame>;
}
export function LibraryPatternsCatalogue() { return <LibraryProvider><Patterns /></LibraryProvider>; }
