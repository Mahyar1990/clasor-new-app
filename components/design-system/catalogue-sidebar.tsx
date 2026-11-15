"use client"
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { useRef } from "react"
import { Layers, Palette, Type, Ruler, MousePointer2, SlidersHorizontal, UsersRound, Navigation, Table2, MessageCircle, PanelsTopLeft, Workflow, Accessibility, PackageCheck } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

const icons = [Palette, Type, Ruler, MousePointer2, SlidersHorizontal, UsersRound, Navigation, Table2, MessageCircle, PanelsTopLeft, Workflow, Accessibility, PackageCheck]
const sidebarId = "catalogue-sidebar"

export function CatalogueSidebarToggle() {
  const { isMobile, open, openMobile } = useSidebar()
  return <SidebarTrigger data-test-id="catalogue-sidebar-sidebartrigger-1" aria-label="باز و بسته کردن فهرست" aria-controls={sidebarId} aria-expanded={isMobile ? openMobile : open} className="shrink-0" />
}

export function CatalogueSidebar({ sections, anchors, activeSection, onNavigate }: { sections: string[]; anchors: string[]; activeSection: number; onNavigate: (index: number) => void }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const pendingAnchor = useRef<string | null>(null)
  return <Sidebar id={sidebarId} side="right" dir="rtl" collapsible="icon" aria-label="فهرست سیستم طراحی" role="complementary" onOpenChangeComplete={open => {
    if (!open && pendingAnchor.current) {
      const anchor = pendingAnchor.current
      pendingAnchor.current = null
      window.history.pushState(null, "", `#${anchor}`)
      const target = document.getElementById(anchor)
      target?.scrollIntoView({ block: "start" })
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }) }
    }
  }}>
    <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
      <div data-test-id="catalogue-sidebar-div-2" className="flex items-center gap-3"><span data-test-id="catalogue-sidebar-span-3" role="img" aria-label="نشان موقت کلاسور" className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground group-data-[collapsible=icon]:size-11"><Layers className="size-6" aria-hidden="true" /></span><div data-test-id="catalogue-sidebar-div-4" className="min-w-0 group-data-[collapsible=icon]:hidden"><strong data-test-id="catalogue-sidebar-strong-5" className="block text-xl font-bold">کلاسور</strong><span data-test-id="catalogue-sidebar-span-6" className="text-xs text-muted-foreground">سیستم طراحی</span></div><span data-test-id="catalogue-sidebar-span-7" className="ms-auto hidden rounded-sm border px-1.5 text-xs text-muted-foreground lg:inline-flex group-data-[collapsible=icon]:hidden">۰.۳</span></div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="justify-between text-muted-foreground"><span data-test-id="catalogue-sidebar-span-8">کتابخانه طراحی</span><span data-test-id="catalogue-sidebar-span-9">۱۳ بخش</span></SidebarGroupLabel>
        <SidebarGroupContent>
          <nav data-test-id="catalogue-sidebar-nav-10" data-catalogue-navigation="" aria-label="بخش‌های سیستم طراحی"><SidebarMenu className="gap-1">
            {sections.map((section, index) => {
              const Icon = icons[index] ?? Layers
              return <SidebarMenuItem key={anchors[index]}>
                <SidebarMenuButton data-test-id={`catalogue-nav-${anchors[index]}`} isActive={activeSection === index} aria-current={activeSection === index ? "location" : undefined} aria-label={section} title={section} className={cn("h-11 rounded-lg border border-transparent pe-9 text-xs transition-all duration-200 hover:border-white/50 hover:bg-white/40 hover:shadow-sm hover:backdrop-blur-md group-data-[collapsible=icon]:justify-center", glass.navigation, glass.current)} render={<a data-test-id={`catalogue-nav-${anchors[index]}`} href={`#${anchors[index]}`} />} onClick={event => {
                  onNavigate(index)
                  if (isMobile) { event.preventDefault(); pendingAnchor.current = anchors[index]; setOpenMobile(false) }
                }}><Icon aria-hidden="true" /><span data-test-id={`catalogue-sidebar-span-13-${String(anchors[index])}`} className="group-data-[collapsible=icon]:hidden">{section}</span></SidebarMenuButton>
                <SidebarMenuBadge aria-hidden="true" style={{ top: "50%", transform: "translateY(-50%)" }} className="text-xs text-muted-foreground">{new Intl.NumberFormat("fa", { minimumIntegerDigits: 2 }).format(index + 1)}</SidebarMenuBadge>
              </SidebarMenuItem>
            })}
          </SidebarMenu></nav>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className="border-t p-4 text-xs leading-body text-muted-foreground group-data-[collapsible=icon]:hidden"><p data-test-id="catalogue-sidebar-p-14">نسخه پیش‌نمایش طراحی</p><p data-test-id="catalogue-sidebar-p-15">فارسی، روشن و راست‌به‌چپ</p><p data-test-id="catalogue-sidebar-p-16">نشان بالا موقت است.</p></SidebarFooter>
  </Sidebar>
}
