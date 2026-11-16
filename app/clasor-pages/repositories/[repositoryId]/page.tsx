import { Suspense } from "react";
import { DocumentsPage } from "@/components/design-system/library/documents-page";
async function Repository({ params }: { params: Promise<{ repositoryId: string }> }) {
  const { repositoryId } = await params;
  return <DocumentsPage repositoryId={repositoryId} />;
}
export default function Page({ params }: { params: Promise<{ repositoryId: string }> }) {
  return <Suspense fallback={<p data-test-id="repository-route-loading">در حال آماده‌سازی مخزن…</p>}><Repository params={params} /></Suspense>;
}
