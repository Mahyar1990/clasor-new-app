"use client";
import { useEffect, useRef, useState } from "react";
import { FileText, Plus } from "lucide-react";
import { SearchField } from "@/components/ui/text-field";
import { UploadProgress } from "@/components/ui/UploadProgress";
import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button";
import { PreviewList } from "./list";
import { useRepositoryPreview } from "./context";
export function RepositoryFiles() {
  const { repo, setRepo } = useRepositoryPreview();
  const [query, setQuery] = useState("");
  const [upload, setUpload] = useState<{ file: File; progress: number; cancelled: boolean; attempt: number } | null>(null);
  const picker = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!upload || upload.cancelled || upload.progress >= 100) return;
    const timer = setTimeout(() => {
      const progress = Math.min(100, upload.progress + 10);
      if (progress === 100) setRepo(current => ({ ...current, files: [{ id: crypto.randomUUID(), name: upload.file.name, detail: `${Math.ceil(upload.file.size / 1024)} کیلوبایت · نمایشی` }, ...current.files] }));
      setUpload({ ...upload, progress });
    }, 250);
    return () => clearTimeout(timer);
  }, [upload, setRepo]);
  return <div data-test-id="repo-files" className="space-y-3">
    <div data-test-id="repo-file-upload" className="flex items-center justify-between gap-2">
      <p data-test-id="repo-file-local-note" className="text-[11px] text-muted-foreground">بارگذاری نمایشی در همین پیش‌نمایش</p>
      <input data-slot="input" data-test-id="repo-file-picker" ref={picker} type="file" hidden onChange={event => { const file = event.target.files?.[0]; if (file) setUpload({ file, progress: 0, cancelled: false, attempt: 0 }); event.target.value = ""; }} />
      <Button data-test-id="repo-file-add" size="sm" disabled={!!upload && !upload.cancelled && upload.progress < 100} onClick={() => picker.current?.click()}><Plus aria-hidden="true" />افزودن</Button>
    </div>
    {upload && <UploadProgress name={upload.file.name} value={upload.progress} cancelled={upload.cancelled} onCancel={() => setUpload({ ...upload, cancelled: true })} onRetry={() => { if (upload.progress < 100) setUpload({ ...upload, progress: 0, cancelled: false, attempt: upload.attempt + 1 }); }} />}
    <SearchField data-test-id="repo-files-search" label="جستجوی فایل" value={query} onValueChange={setQuery} />
    <PreviewList key={query} testId="repo-files-list" items={repo.files.filter(item => item.name.includes(query))} noun="فایل" render={item => <div data-test-id={`repo-file-${item.id}`} className={glass.compactRecord}><FileText aria-hidden="true" className="size-4 shrink-0 text-primary" /><div data-test-id={`repo-file-copy-${item.id}`} className="min-w-0 flex-1"><p data-test-id={`repo-file-name-${item.id}`} className="break-words text-xs font-medium">{item.name}</p><p data-test-id={`repo-file-meta-${item.id}`} className="text-[10px] text-muted-foreground">{item.detail}</p></div></div>} />
  </div>;
}
