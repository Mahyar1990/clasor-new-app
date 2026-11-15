import { Suspense } from "react";
import { notFound } from "next/navigation";
import { repositories } from "@/lib/workspace/fixtures";
import RepositoryBrowser from "@/components/workspace/repository-browser";

export function generateStaticParams() { return repositories.map(repository => ({ repoId: repository.id })); }
async function RepositoryContent({ params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = await params;
  const repository = repositories.find(item => item.id === repoId);
  if (!repository) notFound();
  return <RepositoryBrowser repository={repository} />;
}

export default function RepositoryPage(props: { params: Promise<{ repoId: string }> }) {
  return <Suspense fallback={<p data-test-id="page-p-1">در حال آماده‌سازی مخزن…</p>}><RepositoryContent {...props} /></Suspense>;
}
