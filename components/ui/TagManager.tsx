"use client";
import { useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { TextField } from "./text-field";
import { Button } from "./button";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { GlassScrollArea } from "./GlassScrollArea";
export function TagManager({ value, onValueChange, testId, onDelete }: { value: string[]; onValueChange: (tags: string[]) => void; testId: string; onDelete?: (tag: string) => void }) {
  const [count, setCount] = useState(10);
  const nameInput = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const result = getLoadedItems(value, count);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const normalize = (text: string) => text.normalize("NFKC").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\s]+/g, " ").trim();
  function create() {
    const tag = normalize(name);
    if (!tag) { setError("نام تگ را وارد کنید."); return; }
    if (value.some(item => normalize(item) === tag)) { setError("این تگ از قبل وجود دارد."); return; }
    onValueChange([...value, tag]); setName(""); setError("");
  }
  return <div data-test-id={testId} className="space-y-2">
    <p data-test-id={`${testId}-help`} className="text-xs text-muted-foreground">تگ‌های این مخزن را بسازید؛ هنگام تنظیم تگ سندها از همین فهرست استفاده می‌شود.</p>
    <div data-test-id={`${testId}-create-row`} className="flex items-start gap-2">
      <div data-test-id={`${testId}-field`} className="min-w-0 flex-1"><TextField ref={nameInput} data-test-id={`${testId}-name`} label="نام تگ" maxLength={80} value={name} error={error} onValueChange={value => { setName(value); setError(""); }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); create(); } }} /></div>
      <Button data-test-id={`${testId}-add`} type="button" size="sm" variant="outline" className="mt-7" onClick={create}><Plus aria-hidden="true" />ایجاد تگ</Button>
    </div>
    <GlassScrollArea data-test-id={`${testId}-scroll`} label="تگ‌های مخزن" className={value.length > 4 ? "h-44" : "max-h-44"}>
      <ul ref={list} data-test-id={`${testId}-list`} className="space-y-1">
        {result.rows.map(tag => <li data-load-more-item data-test-id={`${testId}-tag-${tag}`} key={tag} className="flex items-center gap-2 border-b border-white/25 px-1 py-1 text-xs last:border-b-0"><span data-test-id={`${testId}-title-${tag}`} className="min-w-0 flex-1 wrap-anywhere">{tag}</span><Button data-test-id={`${testId}-delete-${tag}`} type="button" size="icon-sm" variant="plain" aria-label={`حذف تگ ${tag}`} onClick={() => { if (onDelete) onDelete(tag); else { onValueChange(value.filter(item => item !== tag)); nameInput.current?.focus(); } }}><Trash2 aria-hidden="true" className="size-3.5!" /></Button></li>)}
        {!value.length && <li data-test-id={`${testId}-empty`} className="py-3 text-xs text-muted-foreground">هنوز تگی ساخته نشده است.</li>}
      </ul>
      <LoadMore noun="تگ" listRef={list} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>
  </div>;
}
