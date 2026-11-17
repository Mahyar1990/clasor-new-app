interface OutlinePathNode { id: string; children?: OutlinePathNode[] }
export function outlineSelectionPath(items: OutlinePathNode[], selectedId?: string): string[] {
  if (!selectedId) return [];
  function visit(nodes: OutlinePathNode[], path: string[], seen: Set<string>): string[] {
    for (const node of nodes) {
      if (seen.has(node.id)) continue;
      const next = [...path, node.id];
      if (node.id === selectedId) return next;
      const nested = visit(node.children ?? [], next, new Set([...seen, node.id]));
      if (nested.length) return nested;
    }
    return [];
  }
  return visit(items, [], new Set());
}
