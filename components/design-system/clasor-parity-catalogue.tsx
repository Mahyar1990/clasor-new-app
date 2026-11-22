"use client";

import { useCallback, useState, type ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SelectField } from "@/components/ui/select-field";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { DashboardCollections } from "./clasor-documents-preview";
import { ClasorDashboardSidebar } from "./clasor-dashboard-sidebar";
import { LibraryProvider, useLibrary } from "./library/store";
import { DocumentBrowser } from "./library/documents-page";
import { LibraryHeading } from "./library/shell";
import { RepositoryHeader } from "./library/repository-header";
import { RepositoryCollection, repositoryTitles, type RepositoryScope } from "./library/repositories-page";
import { OrganizationProvider } from "./organization/store";
import { OrganizationWorkspace } from "./organization/workspace";
import { DomainProvider } from "./domain/store";
import { DomainWorkspace } from "./domain/page";
import { PublishSessionProvider } from "./publish/session";
import { PublishHomeContent } from "./publish/home";
import { PublishedReader } from "./publish/reader";
import { PublishShell } from "./publish/shell";
import { GlassSurfaceContext } from "@/components/ui/glass-surface-context";

function Example({ id, title, children, nested = true }: { id: string; title: string; children: ReactNode; nested?: boolean }) {
  const [open, setOpen] = useState(false);
  const syncOpen = useCallback((details: HTMLDetailsElement | null) => {
    if (details) setOpen(details.open);
  }, []);
  return <details ref={syncOpen} id={id} data-test-id={id} className="min-w-0 rounded-lg border border-border p-3" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary data-test-id={`${id}-open`} className="cursor-pointer rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">{title}</summary>
    {open && <GlassPreviewFrame testId={`${id}-preview`} title={title}><GlassSurfaceContext.Provider value={nested}>{children}</GlassSurfaceContext.Provider></GlassPreviewFrame>}
  </details>;
}

function DocumentsExample() {
  const [scope, setScope] = useState("mine");
  const { repositories } = useLibrary();
  const repository = scope === "repository" ? repositories[0] : scope === "archived" ? repositories.find(item => item.archived) : undefined;
  return <>
    <SelectField data-test-id="parity-documents-scope" label="نمای سندها" value={scope} onValueChange={setScope} options={[
      { value: "mine", label: "سندهای من" },
      { value: "shared", label: "سندهای اشتراکی" },
      { value: "repository", label: "داخل مخزن" },
      { value: "archived", label: "داخل مخزن بایگانی‌شده" },
    ]} />
    <div data-test-id="parity-documents-stage" className="flex min-h-[38rem] min-w-0 flex-col xl:h-[38rem]">
      {repository ? <RepositoryHeader key={repository.id} repository={repository} /> : <LibraryHeading title={scope === "shared" ? "سندهای اشتراکی" : "سندهای من"} embedded />}
      <DocumentBrowser key={scope} shared={repository?.shared ?? (scope === "shared")} repositoryId={repository?.id} writable={!repository?.archived} />
    </div>
  </>;
}

function RepositoriesExample() {
  const [scope, setScope] = useState<RepositoryScope>("my-repositories");
  return <>
    <SelectField data-test-id="parity-repositories-scope" label="نوع فهرست مخزن" value={scope} onValueChange={value => {
      if (Object.hasOwn(repositoryTitles, value)) setScope(value as RepositoryScope);
    }} options={Object.entries(repositoryTitles).map(([value, label]) => ({ value, label }))} />
    <RepositoryCollection key={scope} scope={scope} />
  </>;
}

export function ClasorLayoutParityCatalogue() {
  return <>
    <Example id="clasor-dashboard-pattern" title="داشبورد؛ دو فهرست مستقل سند و مخزن">
      <LibraryProvider><GlassCard data-test-id="parity-dashboard-stage" className="flex min-w-0 flex-col gap-3 xl:h-[36rem]"><DashboardCollections /></GlassCard></LibraryProvider>
    </Example>
    <Example id="clasor-sidebar-pattern" title="منوی واقعی کلاسور؛ دسکتاپ و دراور موبایل" nested={false}>
      <div data-test-id="parity-sidebar-stage" className="max-w-xs"><ClasorDashboardSidebar /></div>
    </Example>
  </>;
}

export function ClasorLibraryParityCatalogue() {
  return <>
    <Example id="clasor-documents-pattern" title="سندهای من، اشتراکی و فضای داخل مخزن">
      <LibraryProvider><DocumentsExample /></LibraryProvider>
    </Example>
    <Example id="clasor-repositories-pattern" title="پنج فهرست مخزن؛ جستجو، ساخت و عملیات وابسته به وضعیت">
      <LibraryProvider><RepositoriesExample /></LibraryProvider>
    </Example>
  </>;
}

export function ClasorAdministrationParityCatalogue() {
  return <>
    <Example id="clasor-organization-pattern" title="سازمان؛ شعب، افراد، سمت‌ها و عملیات هر شعبه">
      <OrganizationProvider><LibraryHeading title="مدیریت سازمانی" embedded /><OrganizationWorkspace /></OrganizationProvider>
    </Example>
    <Example id="clasor-domain-pattern" title="دامنه؛ نه تب و عملیات مدیریتی">
      <DomainProvider><LibraryProvider><LibraryHeading title="مدیریت دامنه" embedded /><DomainWorkspace /></LibraryProvider></DomainProvider>
    </Example>
  </>;
}

function PublishExample() {
  const [view, setView] = useState("landing");
  return <>
    <SelectField data-test-id="parity-publish-view" label="نمای انتشار" value={view} onValueChange={setView} options={[
      { value: "landing", label: "صفحهٔ آغاز و جستجوی مخزن" },
      { value: "reader", label: "خواندن مستندات" },
      { value: "unavailable", label: "سند در دسترس نیست" },
    ]} />
    <LibraryProvider><PublishSessionProvider>
      {view === "landing" ? <PublishShell embedded><PublishHomeContent embedded /></PublishShell> : <PublishedReader embedded repositoryId="dashboard-repository-1" documentId={view === "unavailable" ? "unavailable-sample" : undefined} />}
    </PublishSessionProvider></LibraryProvider>
  </>;
}

export function ClasorPublishParityCatalogue() {
  return <Example id="clasor-publish-pattern" title="داکس؛ فهرست عمومی مخزن‌ها و مستندات منتشرشده" nested={false}><PublishExample /></Example>;
}
