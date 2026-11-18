"use client";
import { useRef, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassModal } from "@/components/ui/GlassModal";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { DomainCollection, useDomainQuery } from "./collection";
import { DomainConfirmation } from "./confirmation";
import { NewsForm } from "./news-form";
import { useDomain } from "./store";
import { matchesDomainQuery } from "./queries";
import type { DomainNews } from "./model";
export function DomainNewsList({ privateNews = false, repositoryId }: { privateNews?: boolean; repositoryId?: string }) {
  const { state, setState } = useDomain();
  const [query, setQuery] = useDomainQuery();
  const [form, setForm] = useState<{ existing?: DomainNews; trigger: HTMLElement | null } | null>(null);
  const [remove, setRemove] = useState<DomainNews | null>(null);
  const [view, setView] = useState<{ item: DomainNews; trigger: HTMLElement } | null>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const imageTones: Record<string, string> = { purple: "text-purple-600", blue: "text-blue-600", green: "text-green-600", orange: "text-orange-600" };
  const items = state.news.filter(item => !!item.repositoryId === privateNews && (!repositoryId || item.repositoryId === repositoryId) && matchesDomainQuery(query, [item.title, item.body, item.link], { link: item.link ? "with" : "without" }));
  return <div data-test-id="domain-news-host" ref={anchor} tabIndex={-1}>
    <DomainCollection title={privateNews ? "خبرنامه‌های این مخزن" : "خبرنامه‌های عمومی"} testId={privateNews ? "domain-private-news-list" : "domain-public-news"} query={query} onQueryChange={setQuery} items={items} filters={[{ id: "link", label: "لینک خبرنامه", options: [{ value: "all", label: "همه خبرنامه‌ها" }, { value: "with", label: "دارای لینک" }, { value: "without", label: "بدون لینک" }] }]} action={<Button data-test-id="domain-create-news" size="sm" onClick={event => setForm({ trigger: event.currentTarget })}><Plus aria-hidden="true" className="size-3!" />ایجاد خبرنامه</Button>} columns={[
      { id: "title", label: "عنوان", width: 220, render: row => <Button data-test-id={`domain-news-open-${row.id}`} variant="plain" className="h-auto max-w-full justify-start whitespace-normal px-0 text-start text-xs" onClick={event => setView({ item: row, trigger: event.currentTarget })}><GlassEmblem data-test-id={`domain-news-icon-${row.id}`} className={`size-6 shrink-0 ${imageTones[row.image] ?? ""}`}><FileText aria-hidden="true" className="size-3.5" /></GlassEmblem>{row.title}</Button> },
      { id: "body", label: "متن", render: row => <span data-test-id={`domain-news-excerpt-${row.id}`} className="line-clamp-2 leading-6 text-muted-foreground">{row.body}</span> },
      { id: "link", label: "لینک", width: 136, render: row => row.link ? <a data-test-id={`domain-news-link-${row.id}`} href={row.link} target="_blank" rel="noopener noreferrer" className="block truncate text-primary underline underline-offset-4" title={row.link}>{new URL(row.link).hostname}</a> : "—" },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.title} fallbackFocusRef={anchor} items={[{ id: "edit", label: "ویرایش خبرنامه", onSelect: () => setForm({ existing: row, trigger: anchor.current }) }, { id: "delete", label: "حذف خبرنامه", destructive: true, onSelect: () => setRemove(row) }]} /> },
    ]} />
    {form && <NewsForm existing={form.existing} repositoryId={repositoryId} privateNews={privateNews} trigger={form.trigger} close={() => setForm(null)} />}
    {remove && <DomainConfirmation title="حذف خبرنامه" description={`خبرنامه «${remove.title}» حذف شود؟`} trigger={null} anchorRef={anchor} close={() => setRemove(null)} confirm={() => { anchor.current?.focus(); setState(current => ({ ...current, news: current.news.filter(item => item.id !== remove.id) })); }} />}
    {view && <GlassModal testId="domain-news-view" title={view.item.title} themeAnchorRef={anchor} compact surface="liquid" open onOpenChange={open => { if (!open) setView(null); }} finalFocus={() => view.trigger.isConnected ? view.trigger : true}><p data-test-id="domain-news-view-body" className="whitespace-pre-wrap text-xs leading-7">{view.item.body}</p>{view.item.link && <a data-test-id="domain-news-view-link" href={view.item.link} target="_blank" rel="noopener noreferrer" className="mt-3 block text-xs text-primary underline">مشاهده لینک خبرنامه</a>}</GlassModal>}
  </div>;
}
