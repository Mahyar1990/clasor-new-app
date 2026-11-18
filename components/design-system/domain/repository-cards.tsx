"use client";
import { useRef, useState } from "react";
import { FolderOpen } from "lucide-react";
import { GlassTile } from "@/components/ui/GlassTile";
import { RepositoryImage } from "@/components/ui/RepositoryImage";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { glass } from "@/lib/design-system/classes";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
export interface NewsletterRepository { id: string; name: string; image?: string; newsCount: number }
/** Product composition: shared repository cards with newsletter-specific metadata/actions. */
export function NewsletterRepositoryCards({ repositories, onOpen, onCreate }: { repositories: NewsletterRepository[]; onOpen: (id: string) => void; onCreate: (id: string) => void }) {
  const [count, setCount] = useState(10);
  const ref = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(repositories, count);
  return <div data-test-id="domain-news-repository-cards" className="space-y-2">
    <div data-test-id="domain-news-repository-grid" ref={ref} className={glass.repositoryGrid}>
      {result.rows.map(repo => <GlassTile key={repo.id} testId={`domain-private-repository-${repo.id}`} title={repo.name} icon={<FolderOpen aria-hidden="true" />} media={<RepositoryImage testId={`domain-news-repository-image-${repo.id}`} image={repo.image} name={repo.name} className="h-full w-full" />} metadata={<span data-test-id={`domain-news-repository-count-${repo.id}`}>{repo.newsCount.toLocaleString("fa-IR")} خبرنامه</span>} onOpen={() => onOpen(repo.id)} actions={<RowActionMenu rowLabel={repo.name} items={[{ id: "create-news", label: "ایجاد خبرنامه", onSelect: () => onCreate(repo.id) }]} />} />)}
    </div>
    {!repositories.length && <p data-test-id="domain-news-repository-empty" className="py-8 text-center text-xs text-muted-foreground">مخزنی با این جستجو و فیلتر یافت نشد.</p>}
    <LoadMore noun="مخزن" listRef={ref} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </div>;
}
