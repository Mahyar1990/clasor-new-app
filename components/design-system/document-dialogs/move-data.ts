import type { PathNode } from "@/components/ui/PathPicker";
export const documentFolders: PathNode[] = [
  { id: "guide", name: "راهنما", children: [{ id: "start", name: "شروع کار", children: [{ id: "install", name: "نصب و راه‌اندازی" }] }, { id: "faq", name: "پرسش‌های متداول" }] },
  { id: "product", name: "محصول", children: [{ id: "design", name: "طراحی", children: [{ id: "system", name: "دیزاین سیستم" }] }, { id: "development", name: "توسعه" }] },
];
export function folderLabel(ids: string[]) {
  let level = documentFolders;
  const names = ["ریشهٔ مخزن"];
  for (const id of ids) { const node = level.find(item => item.id === id); if (!node) break; names.push(node.name); level = node.children ?? []; }
  return names.join(" / ");
}
