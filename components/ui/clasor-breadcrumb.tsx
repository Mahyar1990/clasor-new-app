import { Fragment } from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
export function ClasorBreadcrumb({ items }: { items: { id: string; label: string; href?: string }[] }) {
  return <Breadcrumb aria-label="مسیر صفحه"><BreadcrumbList className="flex-wrap break-words">{items.map((item, index) => <Fragment key={item.id}>
    {index > 0 && <BreadcrumbSeparator />}
    <BreadcrumbItem className="min-w-0 break-words">{index === items.length - 1 ? <BreadcrumbPage>{item.label}</BreadcrumbPage> : <BreadcrumbLink data-test-id={`clasor-breadcrumb-breadcrumblink-1-${String(item.id)}`} href={item.href}>{item.label}</BreadcrumbLink>}</BreadcrumbItem>
  </Fragment>)}</BreadcrumbList></Breadcrumb>
}
