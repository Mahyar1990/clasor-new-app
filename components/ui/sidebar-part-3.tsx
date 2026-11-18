"use client";

import { GlassSurfaceContext } from "./glass-surface-context";
import { glass } from "@/lib/design-system/classes";
import * as React from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PanelLeftIcon } from "lucide-react";
import { useSidebar } from "./sidebar-part-1";

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button data-test-id="sidebar-part-3-button-1"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="rtl:rotate-180" />
      <span data-test-id="sidebar-part-3-span-2" className="sr-only">باز و بسته کردن فهرست</span>
    </Button>
  )
}

export function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button data-test-id="sidebar-part-3-button-3"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="باز و بسته کردن فهرست"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="باز و بسته کردن فهرست"
      className={cn("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear ltr:group-data-[side=left]:-end-4 rtl:group-data-[side=left]:-start-4 ltr:group-data-[side=right]:start-0 rtl:group-data-[side=right]:end-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize rtl:in-data-[side=left]:cursor-e-resize in-data-[side=right]:cursor-e-resize rtl:in-data-[side=right]:cursor-w-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=left][data-state=collapsed]_&]:cursor-w-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=right][data-state=collapsed]_&]:cursor-e-resize", "group-data-[collapsible=offcanvas]:translate-x-0 rtl:group-data-[collapsible=offcanvas]:-translate-x-0 group-data-[collapsible=offcanvas]:after:start-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-end-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-start-2", className, glass.nativeButton)}
      {...props}
    />
  )
}

export function SidebarInset({ className, children, ...props }: React.ComponentProps<"main">) {
  return (
    <main data-test-id="sidebar-part-3-main-4"
      data-slot="sidebar-inset"
      className={cn("relative flex w-full flex-1 flex-col bg-background lg:peer-data-[variant=inset]:m-2 lg:peer-data-[variant=inset]:ms-0 lg:peer-data-[variant=inset]:rounded-xl lg:peer-data-[variant=inset]:shadow-sm lg:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2", className, glass.panel)}
      {...props}
    ><GlassSurfaceContext.Provider value>{children}</GlassSurfaceContext.Provider></main>
  )
}

export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input data-test-id="sidebar-part-3-input-5"
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sidebar-part-3-div-6"
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sidebar-part-3-div-7"
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sidebar-part-3-div-8"
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sidebar-part-3-div-9"
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}
