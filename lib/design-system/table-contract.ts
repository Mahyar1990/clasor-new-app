/** Shared RTL table geometry: a flexible title, bounded metadata and padded actions. */
export const TABLE_ACTION_WIDTH = 76;
export const TABLE_METADATA_WIDTH = 112;
export const TABLE_MULTI_ACTION_WIDTH = 128;

export type TableColumnKind = "content" | "metadata" | "actions";

export function tableColumnWidth(column: { width?: number; kind?: TableColumnKind }) {
  return column.width ?? (column.kind === "actions" ? TABLE_ACTION_WIDTH : column.kind === "metadata" ? TABLE_METADATA_WIDTH : undefined);
}
