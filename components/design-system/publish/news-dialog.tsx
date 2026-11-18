"use client";
import { useRef, useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { NavigableGlassModal, useDialogNavigation } from "@/components/ui/DialogNavigation";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "../preview-list";
import { usePublishSession } from "./session";
const news = [
  { id: "public-1", title: "راهنمای تازهٔ شروع به کار", date: "۱۴۰۵/۰۸/۲۶", body: "راهنمای شروع به کار و نمونه‌های استفاده به‌روز شده‌اند. از صفحهٔ مخزن می‌توانید نسخهٔ عمومی مستندات را مطالعه کنید.", private: false },
  { id: "public-2", title: "به‌روزرسانی مستندات محصول", date: "۱۴۰۵/۰۸/۲۵", body: "توضیحات و نمونه‌های جدید به مستندات محصول افزوده شده‌اند.", private: false },
  { id: "private-1", title: "خبرهای تیم نمونه", date: "۱۴۰۵/۰۸/۲۴", body: "این خبر خصوصی فقط برای نمایش حالت حساب نمونه است.", private: true },
];
function NewsList({ privateNews, onLogin }: { privateNews: boolean; onLogin: () => void }) {
  const { push } = useDialogNavigation();
  const session = usePublishSession();
  if (privateNews && !session.user) return <div data-test-id="publish-news-login-required" className="space-y-3 py-4 text-xs"><p data-test-id="publish-news-login-note">برای مشاهدهٔ خبرنامه‌های خصوصی وارد حساب شوید.</p><Button data-test-id="publish-news-login" size="sm" variant="outline" onClick={onLogin}>ورود</Button></div>;
  return <PreviewList testId="publish-news-list" noun="خبر" items={news.filter(item => item.private === privateNews)} render={item => <article data-test-id={`publish-news-${item.id}`} className={`${glass.insetCard} space-y-2 p-3`}><div data-test-id={`publish-news-heading-${item.id}`} className="flex flex-wrap justify-between gap-2"><h3 data-test-id={`publish-news-title-${item.id}`} className="text-xs font-semibold">{item.title}</h3><time data-test-id={`publish-news-date-${item.id}`} className="text-[10px] text-muted-foreground">{item.date}</time></div><p data-test-id={`publish-news-excerpt-${item.id}`} className="line-clamp-2 text-[11px] leading-6 text-muted-foreground">{item.body}</p><Button data-test-id={`publish-news-more-${item.id}`} size="sm" variant="ghost" onClick={event => push(item.title, <p data-test-id={`publish-news-body-${item.id}`} className="text-xs leading-7">{item.body}</p>, event.currentTarget)}>مشاهده بیشتر</Button></article>} />;
}
export function PublishNewsDialog({ trigger, close }: { trigger: HTMLElement; close: () => void }) {
  const anchor = useRef(trigger);
  const [tab, setTab] = useState("public");
  const session = usePublishSession();
  const login = () => { close(); session.requestLogin(trigger); };
  return <NavigableGlassModal testId="publish-news-dialog" title="خبرنامه‌ها" description="خبرها و اطلاعیه‌های داکس" themeAnchorRef={anchor} open onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger.isConnected ? trigger : true} compact surface="liquid" size="lg"><ClasorTabs label="نوع خبرنامه" value={tab} onValueChange={value => setTab(String(value))} testIds={{ tab: value => `publish-news-tab-${value}` }} items={[{ value: "public", label: "خبرنامه‌های عمومی", content: <NewsList privateNews={false} onLogin={login} /> }, { value: "private", label: "خبرنامه‌های خصوصی", content: <NewsList privateNews onLogin={login} /> }]} /></NavigableGlassModal>;
}
