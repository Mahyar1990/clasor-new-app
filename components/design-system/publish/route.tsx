"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { PublishedReader } from "./reader";
export function PublishedRoute({ repositoryId }: { repositoryId: string }) {
  const documentId = useSelectedLayoutSegment();
  return <PublishedReader repositoryId={repositoryId} documentId={documentId ?? undefined} />;
}
