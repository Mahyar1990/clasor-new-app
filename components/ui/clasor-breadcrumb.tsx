import { Fragment } from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
export function ClasorBreadcrumb({ items, className }: { className?: string; items: { id: string; label: string; href?: string; emphasis?: boolean }[] }) {
  return <Breadcrumb className={className} aria-label="مسیر صفحه"><BreadcrumbList className="flex-wrap break-words">{items.map((item, index) => <Fragment key={item.id}>
    {index > 0 && <BreadcrumbSeparator />}
    <BreadcrumbItem className="min-w-0 break-words">{index === items.length - 1 ? <BreadcrumbPage className={item.emphasis ? "font-bold" : undefined}>{item.label}</BreadcrumbPage> : item.href ? <BreadcrumbLink className={item.emphasis ? "font-bold" : undefined} data-test-id={`clasor-breadcrumb-breadcrumblink-1-${String(item.id)}`} href={item.href}>{item.label}</BreadcrumbLink> : <span className={item.emphasis ? "font-bold" : undefined} data-test-id={`clasor-breadcrumb-text-${item.id}`}>{item.label}</span>}</BreadcrumbItem>
  </Fragment>)}</BreadcrumbList></Breadcrumb>
}
