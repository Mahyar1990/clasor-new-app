import type { ReactNode } from "react";
import { LibraryProvider } from "@/components/design-system/library/store";
export default function Layout({ children }: { children: ReactNode }) { return <LibraryProvider>{children}</LibraryProvider>; }
