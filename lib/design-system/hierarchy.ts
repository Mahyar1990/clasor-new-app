export interface HierarchyNode { id: string; label: string; disabled?: boolean; children?: HierarchyNode[] }
/** Stable ancestor path, with cycle protection for malformed caller data. */
export function hierarchyPath(items: HierarchyNode[], selectedId?: string): string[] {
  const seen = new Set<string>();
  function visit(nodes: HierarchyNode[], path: string[]): string[] {
    for (const node of nodes) {
      if (seen.has(node.id)) continue;
      seen.add(node.id);
      const current = [...path, node.id];
      if (node.id === selectedId) return current;
      const result = visit(node.children ?? [], current);
      if (result.length) return result;
    }
    return [];
  }
  return visit(items, []);
}
