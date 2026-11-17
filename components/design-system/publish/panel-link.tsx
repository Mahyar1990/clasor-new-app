"use client";
import { ExternalLink } from "lucide-react";
import { glass } from "@/lib/design-system/classes";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { useLibrary } from "../library/store";
import { saveReaderSnapshot } from "../reader/transfer";
import { readerFolderPath } from "../reader/reader-path";
import { useStatusToast } from "@/components/ui/status-toast";
import type { DocumentPreview } from "../document-dialogs/model";
import { usePublishSession } from "./session";
import { canOpenPublishedInPanel } from "./article-state";
export function PublishedPanelLink({ document, "data-test-id": testId = "publish-open-in-panel" }: { document: DocumentPreview; "data-test-id"?: string }) {
  const { user } = usePublishSession();
  const library = useLibrary();
  const toast = useStatusToast();
  if (!canOpenPublishedInPanel(user, document.repositoryId)) return null;
  return <HelpTooltip content="باز کردن سند در پنل"><a data-test-id={testId} href={`/clasor-pages/read/${encodeURIComponent(document.id)}`} target="_blank" rel="noopener noreferrer" aria-label="باز کردن سند در پنل؛ تب جدید" className={`${glass.navigation} inline-flex size-8 shrink-0 items-center justify-center`} onClick={event => { if (!saveReaderSnapshot(document, library.repositories.find(item => item.id === document.repositoryId), readerFolderPath(document, library.documents))) { event.preventDefault(); toast.show("باز کردن سند انجام نشد؛ دوباره تلاش کنید.", { type: "error" }); } }}><ExternalLink data-test-id="publish-open-in-panel-icon" aria-hidden="true" className="size-3.5" /></a></HelpTooltip>;
}
