"use client";
import { useRef, useState } from "react";
import { Sample } from "./sample";
import { DomainProvider, useDomain } from "./domain/store";
import { LibraryProvider } from "./library/store";
import { DomainSettingsPanel } from "./domain/settings";
import { NewsletterRepositoryCards } from "./domain/repository-cards";
import { useDomainRepositories } from "./domain/shared";
import { NewsForm } from "./domain/news-form";
import { Button } from "@/components/ui/button";
import { DomainNewsList } from "./domain/news-list";
import { DomainReviewCatalogue } from "./domain-controls-catalogue";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassCard } from "@/components/ui/GlassCard";
function NewsExample() {
  const [privateNews, setPrivateNews] = useState(false);
  const [dark, setDark] = useState(false);
  const { state } = useDomain();
  return <Sample title="مدیریت خبرنامه و جستجوی فیلترپذیر" description="نمونه مستقل الگوی دامنه: عنوان، متن، لینک و چهار تصویر پیش‌فرض؛ خبرنامه خصوصی به انتخاب مخزن نیاز دارد. ساخت، ویرایش و حذف فقط داده‌های همین نمونه را تغییر می‌دهند.">
    <div data-test-id="catalogue-domain-news-controls" className="mb-3 flex flex-wrap gap-4 text-xs"><label data-test-id="catalogue-domain-private-label" className="flex items-center gap-2"><Checkbox data-test-id="catalogue-domain-private" checked={privateNews} onCheckedChange={value => setPrivateNews(!!value)} />خبرنامه خصوصی</label><label data-test-id="catalogue-domain-dark-label" className="flex items-center gap-2"><Checkbox data-test-id="catalogue-domain-dark" checked={dark} onCheckedChange={value => setDark(!!value)} />تم تیره محلی</label></div>
    <GlassCard data-test-id="catalogue-domain-news-surface" className={`${dark ? "dark" : ""} p-3`}><DomainNewsList key={String(privateNews)} privateNews={privateNews} /></GlassCard>
    <p data-test-id="catalogue-domain-news-status" role="status" className="mt-2 text-xs text-muted-foreground">تعداد کل خبرنامه‌های نمونه: {state.news.length.toLocaleString("fa-IR")}</p>
  </Sample>;
}
function RepositoryCardsExample() {
  const { state } = useDomain();
  const repositories = useDomainRepositories();
  const [selected, setSelected] = useState<string | null>(null);
  const [create, setCreate] = useState<string | null>(null);
  const anchor = useRef<HTMLDivElement>(null);
  return <Sample title="کارت مخزن‌های خبرنامه خصوصی" description="همان کارت مشترک مخزن با تصویر، تعداد خبرنامه و عملیات مستقل. بازکردن کارت، خبرنامه‌های همان مخزن را نشان می‌دهد.">
    <div data-test-id="catalogue-news-repository-cards" ref={anchor} tabIndex={-1} className="space-y-3">
      {selected ? <><Button data-test-id="catalogue-news-repositories-back" size="sm" variant="outline" onClick={() => setSelected(null)}>بازگشت به مخزن‌ها</Button><DomainNewsList privateNews repositoryId={selected} /></> : <NewsletterRepositoryCards repositories={repositories.map(repo => ({ ...repo, newsCount: state.news.filter(item => item.repositoryId === repo.id).length }))} onOpen={setSelected} onCreate={setCreate} />}
      {create && <NewsForm privateNews repositoryId={create} trigger={null} anchorRef={anchor} close={() => setCreate(null)} />}
    </div>
  </Sample>;
}
export function DomainPatternsCatalogue() {
  return <LibraryProvider><DomainProvider><DomainReviewCatalogue /><Sample title="تنظیمات گروه‌بندی‌شده دامنه" description="هویت و سرویس‌ها در بخش اصلی، قابلیت‌ها در ستون کنار و گروه‌های رنگ با پیش‌نمایش مستقل؛ در موبایل پشت‌سرهم قرار می‌گیرند."><DomainSettingsPanel /></Sample><RepositoryCardsExample /><NewsExample /></DomainProvider></LibraryProvider>;
}
