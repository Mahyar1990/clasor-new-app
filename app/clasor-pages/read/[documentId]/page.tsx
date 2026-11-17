import { Suspense } from "react";
import { ReaderPage } from "@/components/design-system/reader/reader-page";
async function Document({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return <ReaderPage documentId={documentId} />;
}
export default function Page({ params }: { params: Promise<{ documentId: string }> }) {
  return <Suspense fallback={<p data-test-id="reader-route-loading">در حال آماده‌سازی سند…</p>}><Document params={params} /></Suspense>;
}
