export interface ContentHeading { id: string; label: string; level: number }
export interface ContentHeadingNode extends ContentHeading { children: ContentHeadingNode[] }
/** Nest under the nearest preceding lower heading, including skipped heading levels. */
export function contentsTree(items: ContentHeading[]): ContentHeadingNode[] {
  const roots: ContentHeadingNode[] = [];
  const stack: ContentHeadingNode[] = [];
  for (const item of items) {
    const level = Number.isFinite(item.level) ? Math.max(1, Math.floor(item.level)) : 1;
    const node: ContentHeadingNode = { ...item, level, children: [] };
    while (stack.length && stack.at(-1)!.level >= level) stack.pop();
    const parent = stack.at(-1);
    if (parent) parent.children.push(node); else roots.push(node);
    stack.push(node);
  }
  return roots;
}
