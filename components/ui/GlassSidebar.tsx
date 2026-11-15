"use client";

import Link from "next/link";
import { glass } from "@/lib/design-system/classes";
import { usePathname } from "next/navigation";
import { FileText, FolderOpen, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassNavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface GlassSidebarProps {
  items?: readonly GlassNavigationItem[];
  label?: string;
}

const defaultItems: readonly GlassNavigationItem[] = [
  { id: "documents", label: "اسناد من", href: "/workspace/documents", icon: <FileText /> },
  { id: "repositories", label: "مخزن‌ها", href: "/workspace/repositories", icon: <FolderOpen /> },
  { id: "shared", label: "اشتراک‌ها", href: "/workspace/shared", icon: <Users /> },
];

/** Organism: inline mobile navigation, sticky desktop sidebar. */
export function GlassSidebar({ items = defaultItems, label = "ناوبری اصلی" }: GlassSidebarProps) {
  const pathname = usePathname();
  const activeHref = items
    .filter(({ href }) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <aside
      data-test-id="layout-sidebar"
      data-material-surface="chrome"
      data-material-variant="clear"
      className={cn(`${glass.panel} min-w-0 p-2 md:sticky md:top-24 md:max-h-[calc(100dvh-7rem)] md:overflow-y-auto md:p-3`, glass.panel)}
    >
      <nav data-test-id="GlassSidebar-nav-2" aria-label={label}>
        <ul data-test-id="GlassSidebar-ul-3" className="flex gap-2 overflow-x-auto md:flex-col md:overflow-x-visible">
          {items.map(({ id, label: itemLabel, href, icon }) => {
            const active = href === activeHref;
            return (
              <li data-test-id={`GlassSidebar-li-4-${String(id)}`} key={id} className="shrink-0">
                <Link
                  href={href}
                  data-test-id={`layout-nav-${id}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    `${glass.navigation} flex min-h-11 items-center gap-3 py-2 ps-3 pe-3 text-sm`,
                    active
                      ? `${glass.active} text-primary`
                      : "text-foreground",
                  )}
                >
                  {icon && <span data-test-id={`GlassSidebar-span-6-${String(id)}`} aria-hidden="true" className="shrink-0 [&>svg]:size-5">{icon}</span>}
                  <span data-test-id={`GlassSidebar-span-7-${String(id)}`} className="whitespace-nowrap">{itemLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
