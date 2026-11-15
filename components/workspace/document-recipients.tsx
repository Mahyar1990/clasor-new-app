"use client";

import { useRef, useState, type ReactNode } from "react";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems, LIST_BATCH_SIZE } from "@/lib/workspace/documents";
import type { IDocumentRecipient } from "@/interface/document";

export default function DocumentRecipients({ recipients, renderAction }: { recipients: IDocumentRecipient[]; renderAction?: (recipient: IDocumentRecipient) => ReactNode }) {
  const [visibleCount, setVisibleCount] = useState(LIST_BATCH_SIZE);
  const listRef = useRef<HTMLUListElement>(null);
  const result = getLoadedItems(recipients, visibleCount);
  return <><ul data-test-id="document-recipients-ul-1" ref={listRef} className={renderAction ? "ws-recipientList" : "ws-recipientSummary"}>{result.rows.map(recipient => <li data-test-id={`document-recipients-li-2-${String(recipient.person.id)}`} key={recipient.person.id} tabIndex={-1} data-load-more-item><span data-test-id={`document-recipients-span-3-${String(recipient.person.id)}`}><strong data-test-id={`document-recipients-strong-4-${String(recipient.person.id)}`}>{recipient.person.name}</strong><small data-test-id={`document-recipients-small-5-${String(recipient.person.id)}`}>{recipient.access}</small></span>{renderAction?.(recipient)}</li>)}</ul><LoadMore noun="گیرنده" listRef={listRef} result={result} onLoadMore={() => setVisibleCount(result.nextCount)} /></>;
}
