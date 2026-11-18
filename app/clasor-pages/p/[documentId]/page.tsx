import { Suspense } from "react";
import { PublicShortLink } from "@/components/design-system/publish/short-link";
async function ShortRoute({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return <PublicShortLink data-test-id="publish-short-route" documentId={documentId} />;
}
export default function Page({ params }: { params: Promise<{ documentId: string }> }) {
  return <Suspense fallback={<p data-test-id="publish-short-route-loading">در حال باز کردن سند…</p>}><ShortRoute params={params} /></Suspense>;
}
