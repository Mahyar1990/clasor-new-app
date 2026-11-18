import type { ReactNode } from "react";
import { LibraryProvider } from "@/components/design-system/library/store";
import { DomainProvider } from "@/components/design-system/domain/store";
import { PublishSessionProvider } from "@/components/design-system/publish/session";
export default function Layout({ children }: { children: ReactNode }) { return <LibraryProvider><DomainProvider><PublishSessionProvider persist>{children}</PublishSessionProvider></DomainProvider></LibraryProvider>; }
