import { Suspense, type ReactNode } from "react";
import WorkspaceShell from "@/components/workspace/workspace-shell";
import { ListSessionProvider } from "@/components/workspace/list-session";
import { DocumentStoreProvider } from "@/components/workspace/document-store";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <ListSessionProvider><DocumentStoreProvider><Suspense fallback={<p data-test-id="layout-p-1" className="p-8">در حال آماده‌سازی فضای کار…</p>}><WorkspaceShell>{children}</WorkspaceShell></Suspense></DocumentStoreProvider></ListSessionProvider>;
}
