"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLibrary } from "../library/store";
import { publishedSearchRecords } from "./search-state";
import { publicationHref } from "./publication-state";
import { PublishShell } from "./shell";
export function PublicShortLink({ documentId, "data-test-id": testId = "publish-short-route" }: { documentId: string; "data-test-id"?: string }) {
  const library = useLibrary();
  const router = useRouter();
  const record = publishedSearchRecords(library.documents, library.repositories).find(item => item.id === documentId);
  const href = record ? publicationHref(record.repository.id, record.id) : null;
  useEffect(() => { if (href) router.replace(href); }, [href, router]);
  if (href) return <main data-test-id={testId} dir="rtl" className="p-6 text-sm"><p data-test-id="publish-short-route-status" role="status">در حال باز کردن سند…</p><Link data-test-id="publish-short-route-link" href={href}>مشاهدهٔ سند</Link></main>;
  return <PublishShell><main data-test-id={testId} id="publish-main" tabIndex={-1} className="space-y-3 p-6 text-sm"><p data-test-id="publish-short-route-status" role="status">این سند عمومی در دسترس نیست.</p><Link data-test-id="publish-short-route-link" href="/clasor-pages/publish" className="text-primary underline">بازگشت به داکس</Link></main></PublishShell>;
}
