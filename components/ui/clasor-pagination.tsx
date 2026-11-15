"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
export function ClasorPagination({ page, pageCount, onPageChange }: { page: number; pageCount: number; onPageChange: (page: number) => void }) {
  const count = Math.max(1, Math.floor(pageCount))
  const current = Math.max(1, Math.min(count, page))
  const pages = [...new Set([1, current - 1, current, current + 1, count])].filter(value => value >= 1 && value <= count).sort((a, b) => a - b)
  return <Pagination aria-label="صفحه‌بندی"><PaginationContent className="flex-wrap justify-center">
    <PaginationItem><Button data-test-id="clasor-pagination-button-1" variant="outline" size="icon" aria-label="صفحه قبل" disabled={current === 1} onClick={() => onPageChange(current - 1)}><ChevronRight className="ltr:rotate-180" aria-hidden="true" /></Button></PaginationItem>
    {pages.map((value, index) => <PaginationItem key={value} className="flex items-center gap-1">
      {index > 0 && value - pages[index - 1] > 1 && <PaginationEllipsis />}
      <Button data-test-id={`clasor-pagination-button-2-${String(value)}`} size="icon" variant={value === current ? "default" : "ghost"} aria-label={`صفحه ${value}`} aria-current={value === current ? "page" : undefined} onClick={() => onPageChange(value)}>{new Intl.NumberFormat("fa").format(value)}</Button>
    </PaginationItem>)}
    <PaginationItem><Button data-test-id="clasor-pagination-button-3" variant="outline" size="icon" aria-label="صفحه بعد" disabled={current === count} onClick={() => onPageChange(current + 1)}><ChevronLeft className="ltr:rotate-180" aria-hidden="true" /></Button></PaginationItem>
  </PaginationContent></Pagination>
}
