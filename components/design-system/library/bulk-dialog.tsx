"use client";
import { useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { PathPicker } from "@/components/ui/PathPicker";
import { useLibrary } from "./store";
import { bulkDocuments } from "./tree";
import { descendants, folderTree } from "./tree";
export function BulkDialog({ ids, action, trigger, close, done, fallback }: { ids: string[]; action: "move" | "delete"; trigger: HTMLElement | null; close: () => void; done: () => void; fallback: () => HTMLElement | null }) {
  const { documents, repositories, setDocuments } = useLibrary();
  const anchor = useRef(trigger);
  const committed = useRef(false);
  const selected = documents.filter(item => ids.includes(item.id));
  const destinations = repositories.filter(repo => !repo.archived && !repo.deleted && !repo.left);
  const [repositoryId, setRepositoryId] = useState(selected[0]?.repositoryId ?? destinations[0]?.id ?? "");
  const [path, setPath] = useState<string[]>([]);
  const [error, setError] = useState("");
  const excluded = new Set(ids.flatMap(id => [...descendants(documents, id)]));
  const folders = documents.filter(item => item.repositoryId === repositoryId && !excluded.has(item.id)).map(item => ({ ...item, shared: false }));
  function submit() {
    try {
      const repo = destinations.find(item => item.id === repositoryId);
      if (action === "move" && !repo) throw new Error("مخزن مقصد را انتخاب کنید.");
      const target = repo ? { repositoryId, parentId: path.at(-1), shared: repo.shared, tags: repo.tags ?? [] } : undefined;
      const next = bulkDocuments(documents, ids, action, target);
      setDocuments(next); committed.current = true; done();
    } catch (error) { setError(error instanceof Error ? error.message : "عملیات انجام نشد."); }
  }
  return <GlassModal testId="bulk-document-dialog" open title={action === "move" ? "انتقال گروهی" : "حذف گروهی"} compact surface="liquid" size="sm" themeAnchorRef={anchor} onOpenChange={open => { if (!open) close(); }} finalFocus={() => committed.current ? fallback() ?? true : trigger?.isConnected ? trigger : fallback() ?? true} footer={<><Button data-test-id="bulk-cancel" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="bulk-submit" variant={action === "delete" ? "destructive" : "default"} onClick={submit}>{action === "delete" ? "حذف" : "انتقال"} {ids.length} آیتم</Button></>}>
    <ul data-test-id="bulk-document-summary" className="max-h-24 overflow-y-auto text-xs leading-relaxed">{selected.map(item => <li data-test-id={`bulk-summary-${item.id}`} key={item.id} className="wrap-anywhere">{item.title}{item.kind === "folder" ? " (همراه محتویات دسته‌بندی)" : ""}</li>)}</ul>
    {action === "move" ? <><SelectField data-test-id="bulk-repository" label="مخزن مقصد" value={repositoryId} onValueChange={id => { setRepositoryId(id); setPath([]); }} options={destinations.map(repo => ({ value: repo.id, label: repo.name }))} /><PathPicker nodes={folderTree(folders)} value={path} onValueChange={setPath} /><p data-test-id="bulk-tags-notice" className="text-xs text-muted-foreground">در انتقال به مخزن دیگر، فقط تگ‌های موجود در مخزن مقصد حفظ می‌شوند.</p></> : <p data-test-id="bulk-delete-warning" className="text-xs">آیتم‌های انتخاب‌شده و تمام محتویات دسته‌بندی‌ها حذف شوند؟</p>}
    {error && <p data-test-id="bulk-error" role="alert" className="text-xs text-destructive">{error}</p>}
  </GlassModal>;
}
