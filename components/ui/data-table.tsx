"use client"
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { useId, type CSSProperties, type ReactNode } from "react"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RowActionMenu, type RowAction } from "@/components/ui/row-action-menu"
import { LoadingSkeleton } from "@/components/ui/progress-indicator"
import { Feedback } from "@/components/ui/feedback"
import type { Density } from "@/lib/design-system/models"
export type DataColumn<T> = { id: string; label: string; render: (row: T) => ReactNode }
export function DataTable<T>({ id: tableId, label, rows, columns, getRowId, rowLabel, selectedIds, onSelectionChange, density = "comfortable", state = "ready", actions, renderActions, onRetry, toolbar, maxHeight = 360, actionColumnWidth = 128, emptyMessage = "موردی برای نمایش وجود ندارد." }: {
  label: string; rows: T[]; columns: DataColumn<T>[]; getRowId: (row: T) => string; rowLabel: (row: T) => string
  selectedIds: string[]; onSelectionChange: (ids: string[]) => void; density?: Density; state?: "ready" | "empty" | "loading" | "error"
  actions?: (row: T) => RowAction[]; renderActions?: (row: T) => ReactNode; onRetry?: () => void
  maxHeight?: CSSProperties["maxHeight"]; actionColumnWidth?: number; emptyMessage?: string
  id?: string; toolbar?: ReactNode
}) {
  const id = useId()
  const ids = rows.map(getRowId)
  const selected = ids.filter(value => selectedIds.includes(value))
  const ready = state === "ready" && rows.length > 0
  const hasActions = !!(actions || renderActions)
  const actionWidth = Math.max(112, actionColumnWidth)
  const actionStyle: CSSProperties = { width: actionWidth, minWidth: actionWidth, maxWidth: actionWidth }
  const colSpan = columns.length + 1 + (hasActions ? 1 : 0)
  return <div data-test-id="data-table-div-1" className={cn("min-w-0 overflow-hidden rounded-md border border-white/40 bg-white/30 shadow-sm backdrop-blur-md", glass.panel)} data-density={density} data-slot="data-table">
    {toolbar && <div data-test-id="data-table-div-2" data-slot="table-toolbar" className="border-b bg-muted/40 p-4">{toolbar}</div>}
    <div data-test-id="data-table-div-3" className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3"><p data-test-id="data-table-p-4" id={`${id}-selection`} role="status" className="text-xs text-muted-foreground">{new Intl.NumberFormat("fa").format(selected.length)} مورد انتخاب شده؛ انتخاب همه فقط شامل ردیف‌های همین فهرست است.</p><Button data-test-id="data-table-button-5" variant="ghost" size="sm" disabled={!selected.length} onClick={() => onSelectionChange([])}>پاک‌کردن انتخاب</Button></div>
    <Table id={tableId ?? `${id}-table`} className="min-w-[40rem]" aria-describedby={`${id}-selection`} aria-busy={state === "loading"} containerProps={{ role: "region", "aria-label": `پیمایش ${label}`, tabIndex: 0, className: "isolate", style: { maxHeight, overflow: "auto", scrollPaddingTop: 48 } }}>
      <TableCaption>{label}</TableCaption><TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_var(--border)]"><TableRow>
        <TableHead scope="col" className="w-12"><Checkbox data-test-id="data-table-checkbox-6" aria-label={`انتخاب همه ${label}`} checked={ready && selected.length === ids.length} indeterminate={ready && selected.length > 0 && selected.length < ids.length} disabled={!ready} onCheckedChange={value => onSelectionChange(value ? ids : [])} /></TableHead>
        {columns.map(column => <TableHead key={column.id} scope="col" className="text-sm">{column.label}</TableHead>)}{hasActions && <TableHead scope="col" style={actionStyle} className="text-sm">اقدام‌ها</TableHead>}
      </TableRow></TableHeader><TableBody className="text-xs">
        {ready ? rows.map(row => {
          const rowId = getRowId(row)
          return <TableRow data-test-id={`${tableId ?? id}-row-${rowId}`} key={rowId} data-state={selectedIds.includes(rowId) ? "selected" : undefined}>
            <TableCell><Checkbox data-test-id={`data-table-checkbox-7-${String(rowId)}`} aria-label={`انتخاب ${rowLabel(row)}`} checked={selectedIds.includes(rowId)} onCheckedChange={value => onSelectionChange(value ? [...new Set([...selectedIds, rowId])] : selectedIds.filter(id => id !== rowId))} /></TableCell>
            {columns.map(column => <TableCell key={column.id} style={{ paddingBlock: "var(--row-padding)", whiteSpace: "normal", overflowWrap: "anywhere" }} className="max-w-sm">{column.render(row)}</TableCell>)}
            {hasActions && <TableCell style={actionStyle}><div data-test-id={`data-table-div-8-${String(rowId)}`} className="whitespace-normal break-words" style={{ width: actionWidth - 16, maxWidth: "100%" }}>{renderActions ? renderActions(row) : actions && <RowActionMenu rowLabel={rowLabel(row)} items={actions(row)} />}</div></TableCell>}
          </TableRow>
        }) : <TableRow><TableCell colSpan={colSpan} className="whitespace-normal p-5">
          {state === "loading" ? <LoadingSkeleton /> : state === "error" ? <Feedback tone="error" title="دریافت فهرست انجام نشد" description="این خطا با خالی‌بودن فهرست متفاوت است." dataRetained action={onRetry ? { label: "تلاش دوباره", onAction: onRetry } : undefined} /> : <p data-test-id="data-table-p-9" className="py-8 text-center text-muted-foreground">{emptyMessage}</p>}
        </TableCell></TableRow>}
      </TableBody>
    </Table>
  </div>
}
