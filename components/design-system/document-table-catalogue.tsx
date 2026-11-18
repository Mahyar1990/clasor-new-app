"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { activateRowLink } from "@/lib/design-system/row-activation";
import { SolidDataTable, type SolidColumn } from "@/components/ui/SolidDataTable";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassModal } from "@/components/ui/GlassModal";
import { RecordDates } from "@/components/ui/RecordDates";
import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button";

const documents = [
  { id: "long-title", name: "صورت‌جلسه بررسی برنامه جامع توسعه محصول و بهبود تجربه کاربری سامانه مدیریت اسناد در همه واحدهای سازمان", order: 1, createdAt: "2026-11-01T08:00:00Z", updatedAt: "2026-11-18T09:00:00Z", creator: "تیم طراحی" },
  { id: "short-title", name: "راهنمای همکاری", order: 2, createdAt: undefined, updatedAt: "invalid-date", creator: "تیم محصول" },
];
type Document = typeof documents[number];

export function DocumentTableCatalogue() {
  const [opened, setOpened] = useState<Document | null>(null);
  const columns: [SolidColumn<Document>, ...SolidColumn<Document>[]] = [
    { id: "priority", label: "اولویت", kind: "priority", render: row => row.order.toLocaleString("fa-IR") },
    { id: "name", label: "نام", render: row => <Button data-row-link data-test-id={`catalogue-document-open-${row.id}`} variant="ghost" className="h-auto min-h-11 max-w-full justify-start whitespace-normal text-start" onClick={() => setOpened(row)}>
      <GlassEmblem data-test-id={`catalogue-document-icon-${row.id}`} className="size-6"><FileText aria-hidden="true" className="size-4" /></GlassEmblem>{row.name}
    </Button> },
    { id: "dates", label: "ایجاد / ویرایش", kind: "dates", render: row => <RecordDates testId={`catalogue-document-dates-${row.id}`} createdAt={row.createdAt} updatedAt={row.updatedAt} /> },
    { id: "creator", label: "سازنده", kind: "metadata", render: row => row.creator },
    { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.name} items={[{ id: "view", label: "مشاهده سند نمونه", onSelect: () => setOpened(row) }]} /> },
  ];
  return <section data-test-id="document-table-catalogue" aria-labelledby="document-table-contract-title" className="space-y-3 text-foreground">
    <h3 data-test-id="document-table-contract-title" id="document-table-contract-title" className="font-bold">جدول سندها و ستون عملیات</h3>
    <p data-test-id="document-table-contract-note" className="text-sm text-muted-foreground">اولویت ۸۰، تاریخ ایجاد و ویرایش در یک ستون ۱۶۰، سازنده ۱۱۲ و عملیات ۷۶ پیکسل است؛ نام فضای باقی‌مانده را می‌گیرد. تاریخ نامشخص با خط تیره نمایش داده می‌شود. عنوان‌ها و کنترل عملیات از لبهٔ جدول ۱۶ پیکسل فاصله دارند. کلیک روی فضای ردیف هم سند را باز می‌کند؛ کنترل عملیات مستقل است.</p>
    <div data-test-id="catalogue-document-table-viewport" className={glass.documentTableViewport}><SolidDataTable onRowClick={(_row, event) => activateRowLink(event)} testId="catalogue-document-table" caption="سندهای نمونه دیزاین سیستم" hideCaption appearance="glass" columns={columns} rows={documents} getRowId={row => row.id} /></div>
    <GlassModal testId="catalogue-document-table-modal" title={opened?.name ?? "سند نمونه"} description="عملیات محلی نمونهٔ دیزاین سیستم" open={!!opened} onOpenChange={open => { if (!open) setOpened(null); }}>
      <p data-test-id="catalogue-document-table-detail">سازنده: {opened?.creator}</p>
    </GlassModal>
  </section>;
}
