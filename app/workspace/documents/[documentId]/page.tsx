import { Suspense } from "react";
import { sampleDocuments } from "@/lib/workspace/fixtures";
import DocumentReader from "@/components/workspace/document-reader";

export function generateStaticParams() { return sampleDocuments.map(document => ({ documentId: document.id })); }
async function DocumentContent({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return <DocumentReader documentId={documentId} />;
}

export default function DocumentPage(props: { params: Promise<{ documentId: string }> }) {
  return <Suspense fallback={<p data-test-id="page-p-1">در حال آماده‌سازی سند…</p>}><DocumentContent {...props} /></Suspense>;
}
