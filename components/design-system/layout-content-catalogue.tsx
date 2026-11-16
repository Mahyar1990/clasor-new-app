"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AppLayout } from "@/components/ui/AppLayout";
import { SolidDataTable, type SolidColumn } from "@/components/ui/SolidDataTable";
import { SolidForm, type SolidFormValues } from "@/components/ui/SolidForm";
import { CatalogueProfileMenu, GlassOverlayCatalogue } from "@/components/design-system/glass-overlay-catalogue";
import { GlassCard } from "@/components/ui/GlassCard";
import { DocumentDialogsCatalogue } from "./document-dialogs-catalogue";
import { RepositoryDialogsCatalogue } from "@/components/design-system/repository-dialogs-catalogue";
import { GlassOptionsCatalogue } from "@/components/design-system/glass-options-catalogue";
import { GlassScrollCatalogue } from "@/components/design-system/glass-scroll-catalogue";
import { DocumentTableCatalogue } from "@/components/design-system/document-table-catalogue";
import { GlassIdentityCatalogue } from "@/components/design-system/glass-identity-catalogue";

type SampleRow = { id: string; name: string; email: string; category: string };
const initialRows: SampleRow[] = [
  { id: "sample-1", name: "کاربر نمونه اول", email: "user1@example.com", category: "تیمی" },
  { id: "sample-2", name: "کاربر نمونه دوم", email: "user2@example.com", category: "شخصی" },
];
const columns: [SolidColumn<SampleRow>, ...SolidColumn<SampleRow>[]] = [
  { id: "name", label: "نام و نام خانوادگی", render: row => row.name },
  { id: "email", label: "ایمیل", render: row => <bdi data-test-id="layout-content-catalogue-bdi-1">{row.email}</bdi> },
  { id: "category", label: "دسته‌بندی", width: 96, render: row => row.category },
];

/** Catalogue-only composition; reusable components remain in components/ui. */
export function LayoutContentCatalogue() {
  const [rows, setRows] = useState(initialRows);
  const [disabled, setDisabled] = useState(false);
  const [dark, setDark] = useState(false);
  const [glassTable, setGlassTable] = useState(true);
  const [compact, setCompact] = useState(false);
  const [hideCaption, setHideCaption] = useState(false);

  function addRow(values: SolidFormValues) {
    setRows(current => [...current, {
      ...values,
      id: crypto.randomUUID(),
      category: values.category === "team" ? "تیمی" : "شخصی",
    }]);
  }

  return (
    <section aria-labelledby="layout-content-title" data-test-id="layout-content-catalogue" className="mb-8 min-w-0">
      <h2 data-test-id="layout-content-catalogue-h2-3" id="layout-content-title" className="mb-2 text-xl font-bold">چیدمان و کنترل‌های شیشه‌ای</h2>
      <p data-test-id="layout-content-catalogue-p-4" className="mb-4 text-sm leading-body text-muted-foreground">
        نمونهٔ AppLayout شامل GlassHeader، GlassSidebar، SolidDataTable و SolidForm؛ ثبت فرم یک ردیف به جدول همین نمونه اضافه می‌کند. داده‌ها با بارگذاری دوبارهٔ صفحه بازنشانی می‌شوند.
      </p>
      <GlassCard as="div" data-test-id="catalogue-glass-card" className="mb-4 flex flex-wrap items-center gap-4 p-3 text-sm">
        <label data-test-id="catalogue-caption-label" className="flex min-h-11 cursor-pointer items-center gap-2">
          <Checkbox checked={hideCaption} onCheckedChange={checked => setHideCaption(checked)} data-test-id="catalogue-caption-toggle" aria-label="پنهان کردن عنوان بالای جدول" />
          پنهان کردن عنوان بالای جدول
        </label>
        <label data-test-id="catalogue-compact-label" className="flex min-h-11 cursor-pointer items-center gap-2">
          <Checkbox checked={compact} onCheckedChange={checked => setCompact(checked)} data-test-id="catalogue-compact-toggle" aria-label="چیدمان جمع‌وجور" />
          چیدمان جمع‌وجور
        </label>
        <label data-test-id="catalogue-glass-table-label" className="flex min-h-11 cursor-pointer items-center gap-2">
          <Checkbox checked={glassTable} onCheckedChange={checked => setGlassTable(checked)} data-test-id="catalogue-glass-table-toggle" aria-label="ردیف‌های شیشه‌ای جدول" />
          ردیف‌های شیشه‌ای جدول
        </label>
        <label data-test-id="layout-content-catalogue-label-5" className="flex min-h-11 cursor-pointer items-center gap-2">
          <Checkbox checked={dark} onCheckedChange={checked => setDark(checked)} data-test-id="catalogue-solid-dark" aria-label="نمایش فرم و جدول در حالت تاریک" />
          نمایش فرم و جدول در حالت تاریک
        </label>
        <label data-test-id="layout-content-catalogue-label-7" className="flex min-h-11 cursor-pointer items-center gap-2">
          <Checkbox checked={disabled} onCheckedChange={checked => setDisabled(checked)} data-test-id="catalogue-solid-disabled" aria-label="غیرفعال کردن فرم" />
          غیرفعال کردن فرم
        </label>
      </GlassCard>
      <div data-test-id="layout-content-catalogue-div-9" className="isolate overflow-hidden rounded-xl border [&_[data-test-id=layout-root]]:min-h-0 [&_[data-test-id=layout-main]]:min-h-0 [&_[data-test-id=layout-header]]:static [&_[data-test-id=layout-sidebar]]:static">
        <AppLayout density={compact ? "compact" : "comfortable"} title="نمونه چیدمان کلاسور" contentAs="section" profile={<CatalogueProfileMenu />}>
          <div data-test-id="layout-content-catalogue-div-10" className="mb-6"><GlassOverlayCatalogue /><GlassOptionsCatalogue /></div>
          <div data-test-id="layout-content-catalogue-div-11" className={`${dark ? "dark scheme-dark rounded-lg bg-slate-950/80 p-4" : "scheme-light"} min-w-0 space-y-6`}>
            <RepositoryDialogsCatalogue /><DocumentDialogsCatalogue />
            <GlassIdentityCatalogue />
            <GlassScrollCatalogue />
            <DocumentTableCatalogue />
            <SolidDataTable hideCaption={hideCaption} layout="fixed" appearance={glassTable ? "glass" : "solid"} caption="اطلاعات ثبت‌شده در نمونه" columns={columns} rows={rows} getRowId={row => row.id} />
            <SolidForm disabled={disabled} onSubmit={addRow} />
          </div>
        </AppLayout>
      </div>
    </section>
  );
}
