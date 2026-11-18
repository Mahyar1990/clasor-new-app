import { Suspense, type ReactNode } from "react";
import { PublishedRoute } from "@/components/design-system/publish/route";
async function Repository({ params, children }: { params: Promise<{ repositoryId: string }>; children: ReactNode }) {
  const { repositoryId } = await params;
  return <><PublishedRoute repositoryId={repositoryId} />{children}</>;
}
export default function Layout({ params, children }: { params: Promise<{ repositoryId: string }>; children: ReactNode }) {
  return <Suspense fallback={<p data-test-id="publish-route-loading">در حال آماده‌سازی مستندات…</p>}><Repository params={params}>{children}</Repository></Suspense>;
}
