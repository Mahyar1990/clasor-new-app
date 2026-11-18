import type { MouseEvent } from "react";
/** Delegate blank-row clicks to the existing primary link/button without replacing table semantics. */
export function activateRowLink(event: MouseEvent<HTMLElement>) {
  if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return;
  const row = event.currentTarget;
  if (!row.contains(event.target) || event.target.closest('a,button,input,textarea,select,label,[data-row-ignore],[role="button"],[role="checkbox"],[role="switch"],[role="menuitem"],[contenteditable="true"]')) return;
  const selection = row.ownerDocument.defaultView?.getSelection();
  if (selection?.toString() && selection.anchorNode && row.contains(selection.anchorNode)) return;
  row.querySelector<HTMLElement>("[data-row-link]")?.click();
}
