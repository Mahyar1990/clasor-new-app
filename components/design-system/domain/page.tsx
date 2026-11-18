"use client";
import { GlassCard } from "@/components/ui/GlassCard";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { LibraryShell } from "../library/shell";
import { DomainSettingsPanel } from "./settings";
import { DomainAccess } from "./access";
import { DomainNewsList } from "./news-list";
import { DomainPrivateNews } from "./private-news";
import { DomainModeration } from "./moderation";
import { DomainReports } from "./reports";
import { DomainTags } from "./tags";
import { DomainRepositories } from "./repositories";
export function DomainWorkspace() {
  return <ClasorTabs label="مدیریت دامنه" defaultValue="settings" testIds={{ root: "domain-tabs", list: "domain-tabs-list", tab: value => `domain-tab-${value}` }} items={[
    { value: "settings", label: "تنظیمات", content: <DomainSettingsPanel /> },
    { value: "access", label: "دسترسی", content: <DomainAccess /> },
    { value: "public-news", label: "خبرنامه عمومی", content: <DomainNewsList /> },
    { value: "private-news", label: "خبرنامه خصوصی", content: <DomainPrivateNews /> },
    { value: "comments", label: "نظرات", content: <DomainModeration kind="comment" /> },
    { value: "questions", label: "سوالات", content: <DomainModeration kind="question" /> },
    { value: "repositories", label: "مدیریت مخزن‌ها", content: <DomainRepositories /> },
    { value: "reports", label: "گزارش تخلف", content: <DomainReports /> },
    { value: "tags", label: "تگ‌ها", content: <DomainTags /> },
  ]} />;
}
export function DomainPage() {
  return <LibraryShell page="domain-management" title="مدیریت دامنه"><GlassCard data-test-id="domain-workspace" className="min-w-0 p-3 md:p-4"><DomainWorkspace /></GlassCard></LibraryShell>;
}
