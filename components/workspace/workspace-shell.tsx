"use client";

import { workspaceStyles } from "@/components/workspace/workspace-styles";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import Link from "next/link";
import { MaterialPreference } from "@/components/design-system/material-preference";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ArrowUpLeft, FileText, Layers, LockKeyhole, Menu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { sampleUser } from "@/lib/workspace/fixtures";
import { safeReturnHref } from "@/lib/workspace/navigation";
import { UndoDeleteNotice } from "@/components/workspace/document-store";
import "./workspace.css";

function WorkspaceNavigation({ mobile = false, onSelect }: { mobile?: boolean; onSelect?: () => void }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const activePath = pathname.startsWith("/workspace/documents/") ? safeReturnHref(params.get("from")) : pathname;
  const links = [{ href: "/workspace/documents", label: "اسناد من", icon: FileText }, { href: "/workspace/shared", label: "اشتراکی‌ها", icon: Users }, { href: "/workspace/repositories", label: "مخزن‌ها", icon: Layers }];
  return <>
    <div data-test-id="workspace-shell-div-1" className="ws-brand"><span data-test-id="workspace-shell-span-2"><Layers size={25} aria-hidden="true" /></span><div data-test-id="workspace-shell-div-3"><strong data-test-id="workspace-shell-strong-4">کلاسور</strong><p data-test-id="workspace-shell-p-5">دانسته‌هایتان را کنار هم نگه دارید</p></div></div>
    <p data-test-id="workspace-shell-p-6" className="ws-navLabel">فضای کار شما</p>
    <nav data-test-id="workspace-shell-nav-7" className={cn("ws-nav", workspaceStyles.navigation)} aria-label={mobile ? "ناوبری موبایل" : "ناوبری اصلی"}>
      {links.map(item => <Link data-test-id={`workspace-shell-link-8-${String(item.href)}`} key={item.href} href={item.href} aria-current={activePath.startsWith(item.href) ? "page" : undefined} onClick={onSelect}><item.icon data-test-id={`workspace-shell-item-icon-9-${String(item.href)}`} size={20} aria-hidden="true" />{item.label}</Link>)}
    </nav>
    <div data-test-id="workspace-shell-div-10" className="ws-sidebarBottom"><div data-test-id="workspace-shell-div-11" className="ws-personalNote"><LockKeyhole size={18} aria-hidden="true" /><strong data-test-id="workspace-shell-strong-12">هر سند، در فضای خودش</strong><p data-test-id="workspace-shell-p-13">اسناد شخصی و تیمی را با مسیر مشخص مرور کنید.</p></div><div data-test-id="workspace-shell-div-14" className="ws-profile"><span data-test-id="workspace-shell-span-15">ن ا</span><div data-test-id="workspace-shell-div-16"><strong data-test-id="workspace-shell-strong-17">{sampleUser.name}</strong><p data-test-id="workspace-shell-p-18">حساب نمونه</p></div></div></div>
  </>;
}

export default function WorkspaceShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const section = pathname.startsWith("/workspace/repositories") ? "مخزن‌ها" : pathname.startsWith("/workspace/shared") ? "اشتراکی‌ها" : pathname === "/workspace/documents" ? "اسناد من" : "مشاهده سند";
  return <div data-test-id="workspace-shell-div-19" className={cn("ws-canvas", glass.canvas)}><div data-test-id="workspace-shell-div-20" className={cn("ws-app", glass.panel)}>
    <a data-test-id="workspace-shell-a-21" href="#workspace-main" className="ws-skip">رفتن به محتوای اصلی</a>
    <aside data-test-id="workspace-shell-aside-22" className={cn("ws-sidebar", glass.panel)} data-material-surface="chrome"><WorkspaceNavigation /></aside>
    <div data-test-id="workspace-shell-div-23" className={cn("ws-body", glass.panel)}><header data-test-id="workspace-shell-header-24" className={cn("ws-topbar", glass.panel)} data-material-surface="chrome">
      <div data-test-id="workspace-shell-div-25" className="ws-topbarStart"><div data-test-id="workspace-shell-div-26" className="ws-mobileNav"><Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetTrigger data-test-id="workspace-shell-sheettrigger-27" render={<Button data-test-id="workspace-shell-sheettrigger-27" variant="ghost" size="icon" aria-label="بازکردن فهرست" />}><Menu aria-hidden="true" /></SheetTrigger><SheetContent side="right" dir="rtl" className="ws-navigationSheet w-[min(340px,100vw)] overflow-y-auto p-5"><SheetTitle className="sr-only">فهرست فضای کار</SheetTitle><SheetDescription className="sr-only">انتخاب بخش برنامه</SheetDescription><WorkspaceNavigation mobile onSelect={() => setMenuOpen(false)} /><SheetClose data-test-id="workspace-shell-sheetclose-29" render={<Button data-test-id="workspace-shell-sheetclose-29" variant="outline" />}>بستن فهرست</SheetClose></SheetContent></Sheet></div><span data-test-id="workspace-shell-span-31" className="ws-workspaceName"><span data-test-id="workspace-shell-span-32" className="ws-smallMark"><Layers size={16} aria-hidden="true" /></span>فضای کار<span data-test-id="workspace-shell-span-33" className="ws-pathSeparator">/</span><strong data-test-id="workspace-shell-strong-34">{section}</strong></span></div>
      <div data-test-id="workspace-shell-div-35" className="ws-topbarLinks"><MaterialPreference /><span data-test-id="workspace-shell-span-36" className="ws-demoBadge">نسخه نمونه</span><Link data-test-id="workspace-shell-link-37" href="/wireframes">طرح صفحات<ArrowUpLeft size={14} aria-hidden="true" /></Link></div>
    </header><main data-test-id="workspace-shell-main-38" id="workspace-main" tabIndex={-1} className="ws-main"><UndoDeleteNotice />{children}</main><footer data-test-id="workspace-shell-footer-39" className="ws-footer"><span data-test-id="workspace-shell-span-40">کلاسور · فضایی برای نظم دادن به دانسته‌ها</span><Link data-test-id="workspace-shell-link-41" href="/">کتابخانه طراحی</Link></footer></div>
  </div></div>;
}
