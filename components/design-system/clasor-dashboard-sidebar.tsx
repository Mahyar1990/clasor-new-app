"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, FileText, FolderOpen, Users, Building2, Globe, Bookmark, Archive, Share2 } from "lucide-react";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/design-system/classes";

const groups = [
  { title: "اسناد شخصی", items: [{ id: "my-documents", label: "سندهای من", icon: FileText }, { id: "shared-documents", label: "سندهای اشتراکی", icon: Users }] },
  { title: "مدیریت مخزن‌ها", items: [{ id: "my-repositories", label: "مخزن‌های من", icon: FolderOpen }, { id: "shared-repositories", label: "مخزن‌های اشتراکی", icon: Users }, { id: "bookmarked-repositories", label: "مخزن‌های نشان‌شده", icon: Bookmark }, { id: "archived-repositories", label: "مخزن‌های بایگانی‌شده", icon: Archive }, { id: "published-repositories", label: "مخزن‌های منتشرشده", icon: Share2 }] },
  { title: "مدیریت", items: [{ id: "domain-management", label: "مدیریت دامنه", icon: Globe }, { id: "organization-management", label: "مدیریت سازمانی", icon: Building2 }] },
];

function DashboardNavigation({ onNavigate, activePage = "dashboard" }: { onNavigate?: () => void; activePage?: string }) {
  return <GlassCard as="div" data-test-id="dashboard-product-sidebar" className="p-2.5">
    <nav data-test-id="dashboard-product-navigation" aria-label="منوی نمونه کلاسور">
      <Link data-test-id="dashboard-current-page" href="/clasor-pages/dashboard" onClick={onNavigate} aria-current={activePage === "dashboard" ? "page" : undefined} className={`${glass.navigation} ${activePage === "dashboard" ? glass.current : ""} flex min-h-11 md:min-h-8 items-center gap-3 px-3 text-sm text-primary`}>
        <LayoutDashboard aria-hidden="true" className="size-5" />داشبورد
      </Link>
      {groups.map(group => <div data-test-id={`dashboard-nav-group-${group.title}`} key={group.title} className="mt-3">
        <p data-test-id={`dashboard-nav-heading-${group.title}`} className="mb-1 px-3 text-xs font-medium text-muted-foreground">{group.title}</p>
        <ul data-test-id={`dashboard-nav-items-${group.title}`} className="space-y-1">
          {group.items.map(({ id, label, icon: Icon }) => <li data-test-id={`dashboard-nav-item-${label}`} key={label}>
            {id ? <Link data-test-id={`dashboard-nav-link-${id}`} href={`/clasor-pages/${id}`} onClick={onNavigate} aria-current={activePage === id ? "page" : undefined} className={`${glass.navigation} ${activePage === id ? glass.current : ""} flex min-h-11 md:min-h-8 items-center gap-3 px-3 text-xs`}><Icon aria-hidden="true" className="size-4" />{label}</Link> : <Button data-test-id={`dashboard-nav-button-${label}`} variant="plain" disabled title="این صفحه در نمونه‌های بعدی اضافه می‌شود" className="w-full justify-start text-xs disabled:opacity-60"><Icon aria-hidden="true" className="size-4" />{label}</Button>}
          </li>)}
        </ul>
      </div>)}
    </nav>
    <div data-test-id="dashboard-sample-user" className="mt-4 flex items-center gap-2 border-t border-white/40 px-2 pt-3">
      <GlassEmblem shape="avatar" data-test-id="dashboard-user-avatar" className="size-8 text-sm" aria-hidden="true">ک ن</GlassEmblem>
      <div data-test-id="dashboard-user-copy"><p data-test-id="dashboard-user-name" className="text-sm font-medium">کاربر نمونه</p><p data-test-id="dashboard-user-note" className="text-xs text-muted-foreground">حساب نمایشی</p></div>
    </div>
    <Link data-test-id="dashboard-back-to-catalogue" href="/" className={`${glass.navigation} mt-2 flex min-h-11 md:min-h-8 items-center px-3 text-xs text-primary`}>بازگشت به سیستم طراحی</Link>
  </GlassCard>;
}

export function ClasorDashboardSidebar({ activePage = "dashboard" }: { activePage?: string } = {}) {
  const [open, setOpen] = useState(false);
  return <>
    <div data-test-id="dashboard-desktop-navigation" className="hidden md:block"><DashboardNavigation activePage={activePage} /></div>
    <div data-test-id="dashboard-mobile-navigation" className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger data-test-id="dashboard-mobile-menu" render={<Button data-test-id="dashboard-mobile-menu" variant="outline" className="w-full justify-start" />}><Menu aria-hidden="true" />منوی کلاسور</SheetTrigger>
        <SheetContent data-test-id="dashboard-mobile-sheet" side="right" dir="rtl" className="overflow-y-auto p-4">
          <SheetTitle>منوی کلاسور</SheetTitle>
          <SheetDescription>داشبورد و بخش‌های نمونه مدیریت اسناد</SheetDescription>
          <DashboardNavigation activePage={activePage} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  </>;
}
