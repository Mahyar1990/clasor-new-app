"use client";

import { glass } from "@/lib/design-system/classes";
import * as React from "react";
import { cn } from "cn";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./sidebar-part-1";

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  id,
  onOpenChangeComplete,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  onOpenChangeComplete?: (open: boolean) => void
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div data-test-id="sidebar-part-2-div-1"
        data-slot="sidebar"
        data-material-surface="chrome"
        id={id}
        className={cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className, glass.panel)}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} onOpenChangeComplete={onOpenChangeComplete} {...props}>
        <SheetContent
          dir={dir}
          id={id}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              width: "var(--sidebar-width)",
              maxWidth: "calc(100vw - 2rem)",
              height: "100dvh",
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>فهرست سیستم طراحی</SheetTitle>
            <SheetDescription>یکی از بخش‌های سیستم طراحی کلاسور را انتخاب کنید.</SheetDescription>
          </SheetHeader>
          <div data-test-id="sidebar-part-2-div-2" className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div data-test-id="sidebar-part-2-div-3"
      className="group peer hidden text-sidebar-foreground lg:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div data-test-id="sidebar-part-2-div-4"
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div data-test-id="sidebar-part-2-div-5"
        data-slot="sidebar-container"
        id={id}
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[inset-inline-start,inset-inline-end,width] duration-200 ease-linear ltr:data-[side=left]:start-0 rtl:data-[side=left]:end-0 ltr:data-[side=left]:group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)] rtl:data-[side=left]:group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)] ltr:data-[side=right]:end-0 rtl:data-[side=right]:start-0 ltr:data-[side=right]:group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)] rtl:data-[side=right]:group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)] lg:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div data-test-id="sidebar-part-2-div-6"
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          data-material-surface="chrome"
          className={cn("flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border", glass.panel)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
