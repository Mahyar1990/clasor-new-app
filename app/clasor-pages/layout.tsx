import type { ReactNode } from "react";
import { LibraryProvider } from "@/components/design-system/library/store";
import { PublishSessionProvider } from "@/components/design-system/publish/session";
export default function Layout({ children }: { children: ReactNode }) { return <LibraryProvider><PublishSessionProvider persist>{children}</PublishSessionProvider></LibraryProvider>; }
