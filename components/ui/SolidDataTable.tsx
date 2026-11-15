import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export interface SolidColumn<T> {
  id: string;
  label: string;
  render: (row: T) => ReactNode;
}

export interface SolidDataTableProps<T> {
  caption: string;
  columns: readonly [SolidColumn<T>, ...SolidColumn<T>[]];
  rows: readonly T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
  testId?: string;
}

/** Organism: glass wrapper and opaque data rows in a keyboard-scrollable region. */
export function SolidDataTable<T>({
  caption, columns, rows, getRowId,
  emptyMessage = "اطلاعاتی برای نمایش وجود ندارد.",
  testId = "solid-table",
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
      <table data-test-id={testId} className="w-full min-w-[36rem] border-collapse text-start text-sm leading-body">
        <caption data-test-id="SolidDataTable-caption-3" className="border-b border-white/30 px-4 py-3 text-start font-bold">
          {caption}
        </caption>
        <thead data-test-id="SolidDataTable-thead-4" className="bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
          <tr data-test-id={`${testId}-header`}>
            {columns.map(column => (
              <th data-test-id={`SolidDataTable-th-6-${String(column.id)}`} key={column.id} scope="col" className="border-b border-slate-200 py-3 ps-4 pe-4 text-start font-bold dark:border-slate-700">
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
                className="border-b border-slate-200 bg-white last:border-b-0 hover:bg-slate-100 focus-within:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus-within:bg-slate-800"
              >
                {columns.map(column => (
                  <td data-test-id={`SolidDataTable-td-9-${String(column.id)}`} key={column.id} className="max-w-sm py-3 ps-4 pe-4 text-start align-middle wrap-anywhere">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr data-test-id={`${testId}-empty`} className="bg-white dark:bg-slate-900">
              <td data-test-id="SolidDataTable-td-11" colSpan={columns.length} className="px-4 py-8 text-center">{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </GlassCard>
  );
}
