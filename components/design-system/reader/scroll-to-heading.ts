/** Locate a plain-text offset even when contentEditable inserts div/br line breaks. */
export function scrollToEditorHeading(root: HTMLElement, offset: number) {
  const prefix = root.innerText.slice(0, offset).replace(/[\r\n]/g, "");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = prefix.length;
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? "";
    const length = text.replace(/[\r\n]/g, "").length;
    if (remaining >= length) { remaining -= length; continue; }
    let index = 0;
    while (index < text.length && remaining > 0) { if (!/[\r\n]/.test(text[index])) remaining--; index++; }
    while (index < text.length && /[\r\n]/.test(text[index])) index++;
    const range = document.createRange();
    range.setStart(node, index); range.collapse(true);
    const rect = range.getBoundingClientRect();
    root.focus({ preventScroll: true });
    window.scrollBy({ top: rect.top - 32, behavior: "instant" });
    return;
  }
}
