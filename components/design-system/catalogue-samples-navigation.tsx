"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelsTopLeft, LayoutDashboard } from "lucide-react";
import { glass } from "@/lib/design-system/classes";
import { clasorPages } from "@/components/design-system/clasor-page-registry";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";

export function CatalogueSamplesNavigation({ active }: { active: boolean }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const closeMobile = () => { if (isMobile) setOpenMobile(false); };
  return <SidebarGroup>
    <SidebarGroupContent>
      <nav data-test-id="clasor-pages-navigation" aria-label="نمونه صفحات کلاسور">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton data-test-id="clasor-pages-menu" title="نمونه صفحات کلاسور" isActive={active}
              className={`${glass.navigation} ${glass.current} min-h-11`}
              render={<Link data-test-id="clasor-pages-menu" href="/clasor-pages" />} onClick={closeMobile}>
              <PanelsTopLeft aria-hidden="true" />
              <span data-test-id="clasor-pages-menu-label">نمونه صفحات کلاسور</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {clasorPages.map(page => <SidebarMenuSubItem key={page.id}>
                <SidebarMenuSubButton data-test-id={`clasor-page-${page.id}`} isActive={pathname === page.href}
                  aria-current={pathname === page.href ? "page" : undefined} className={`${glass.navigation} ${glass.current} h-auto min-h-11 py-2 text-xs`}
                  render={<Link data-test-id={`clasor-page-${page.id}`} href={page.href} />} onClick={closeMobile}>
                  <LayoutDashboard aria-hidden="true" />
                  <span data-test-id={`clasor-page-label-${page.id}`}>{page.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>)}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </nav>
    </SidebarGroupContent>
  </SidebarGroup>;
}
