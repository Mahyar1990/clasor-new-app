"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { activateRowLink } from "@/lib/design-system/row-activation";
import { SolidDataTable, type SolidColumn } from "@/components/ui/SolidDataTable";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";

const documents = [
  { id: "long-title", name: "صورت‌جلسه بررسی برنامه جامع توسعه محصول و بهبود تجربه کاربری سامانه مدیریت اسناد در همه واحدهای سازمان", creator: "تیم طراحی" },
  { id: "short-title", name: "راهنمای همکاری", creator: "تیم محصول" },
];
type Document = typeof documents[number];

export function DocumentTableCatalogue() {
  const [opened, setOpened] = useState<Document | null>(null);
  const columns: [SolidColumn<Document>, ...SolidColumn<Document>[]] = [
    { id: "name", label: "نام سند", render: row => <Button data-row-link data-test-id={`catalogue-document-open-${row.id}`} variant="ghost" className="h-auto min-h-11 max-w-full justify-start whitespace-normal text-start" onClick={() => setOpened(row)}>
      <GlassEmblem data-test-id={`catalogue-document-icon-${row.id}`} className="size-6"><FileText aria-hidden="true" className="size-4" /></GlassEmblem>{row.name}
    </Button> },
    { id: "creator", label: "نام سازنده", kind: "metadata", render: row => row.creator },
    { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.name} items={[{ id: "view", label: "مشاهده سند نمونه", onSelect: () => setOpened(row) }]} /> },
  ];
  return <section data-test-id="document-table-catalogue" aria-labelledby="document-table-contract-title" className="space-y-3 text-foreground">
    <h3 data-test-id="document-table-contract-title" id="document-table-contract-title" className="font-bold">جدول سندها و ستون عملیات</h3>
    <p data-test-id="document-table-contract-note" className="text-sm text-muted-foreground">نام سند فضای باقی‌مانده را می‌گیرد؛ نام سازنده ۱۱۲ و عملیات ۷۶ پیکسل است. عنوان‌ها و کنترل عملیات از لبهٔ جدول ۱۶ پیکسل فاصله دارند. کلیک روی فضای ردیف هم سند را باز می‌کند؛ کنترل عملیات مستقل است.</p>
    <SolidDataTable onRowClick={(_row, event) => activateRowLink(event)} testId="catalogue-document-table" caption="سندهای نمونه دیزاین سیستم" hideCaption appearance="glass" columns={columns} rows={documents} getRowId={row => row.id} />
    <GlassModal testId="catalogue-document-table-modal" title={opened?.name ?? "سند نمونه"} description="عملیات محلی نمونهٔ دیزاین سیستم" open={!!opened} onOpenChange={open => { if (!open) setOpened(null); }}>
      <p data-test-id="catalogue-document-table-detail">سازنده: {opened?.creator}</p>
    </GlassModal>
  </section>;
}
