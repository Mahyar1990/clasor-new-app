import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tableColumnWidth, type TableColumnKind } from "@/lib/design-system/table-contract";
import { glass } from "@/lib/design-system/classes";
import { GlassCard } from "@/components/ui/GlassCard";

export interface SolidColumn<T> {
  id: string;
  label: string;
  width?: number;
  kind?: TableColumnKind;
  render: (row: T) => ReactNode;
}

export interface SolidDataTableProps<T> {
  caption: string;
  hideCaption?: boolean;
  columns: readonly [SolidColumn<T>, ...SolidColumn<T>[]];
  rows: readonly T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
  testId?: string;
  appearance?: "solid" | "glass";
  layout?: "auto" | "fixed";
}

/** Semantic table with a glass wrapper and an optional translucent data surface. */
export function SolidDataTable<T>({
  caption, columns, rows, getRowId, hideCaption = false,
  emptyMessage = "اطلاعاتی برای نمایش وجود ندارد.",
  testId = "solid-table",
  appearance = "solid",
  layout = columns.some(column => column.kind === "actions") ? "fixed" : "auto",
}: SolidDataTableProps<T>) {
  return (
    <GlassCard as="div"
      dir="rtl"
      role="region"
      aria-label={caption}
      tabIndex={0}
      data-test-id={`${testId}-scroll`}
      className="max-w-full overflow-x-auto"
    >
      <table data-test-id={testId} className={`w-full min-w-[36rem] border-collapse text-start text-sm leading-body ${layout === "fixed" ? "table-fixed" : "table-auto"}`}>
        <caption data-test-id="SolidDataTable-caption-3" className={hideCaption ? "sr-only" : "border-b border-white/30 px-4 py-3 text-start font-bold"}>
          {caption}
        </caption>
        <colgroup data-test-id={`${testId}-columns`}>
          {columns.map(column => <col data-test-id={`${testId}-column-${column.id}`} key={column.id} style={{ width: tableColumnWidth(column) }} />)}
        </colgroup>
        <thead data-test-id="SolidDataTable-thead-4" className={appearance === "glass" ? glass.tableHeader : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"}>
          <tr data-test-id={`${testId}-header`}>
            {columns.map(column => (
              <th data-test-id={`SolidDataTable-th-6-${String(column.id)}`} key={column.id} scope="col" className={cn(glass.tableCell, "border-b font-bold", appearance === "glass" ? "border-white/50 shadow-[inset_0_-1px_0_rgb(130_90_175/0.08)]" : "border-slate-200 dark:border-slate-700", column.kind === "actions" && glass.tableActionCell)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-test-id="SolidDataTable-tbody-7">
          {rows.map(row => {
            const rowId = getRowId(row);
            return (
              <tr
                key={rowId}
                data-test-id={`${testId}-row-${rowId}`}
                className={appearance === "glass" ? glass.tableRow : "border-b border-slate-200 bg-white last:border-b-0 hover:bg-slate-100 focus-within:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus-within:bg-slate-800"}
              >
                {columns.map(column => (
                  <td data-test-id={`SolidDataTable-td-9-${String(column.id)}`} key={column.id} className={cn(glass.tableCell, "max-w-sm", column.kind === "actions" && glass.tableActionCell)}>
                    {column.kind === "actions" ? <div data-test-id={`${testId}-actions-${rowId}`} className={glass.tableActions}>{column.render(row)}</div> : column.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr data-test-id={`${testId}-empty`} className={appearance === "glass" ? glass.tableRow : "bg-white dark:bg-slate-900"}>
              <td data-test-id="SolidDataTable-td-11" colSpan={columns.length} className="px-4 py-8 text-center">{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </GlassCard>
  );
}
