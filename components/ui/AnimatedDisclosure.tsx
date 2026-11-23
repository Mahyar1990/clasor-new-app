"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import type { ReactElement, Ref } from "react";
import { glass } from "@/lib/design-system/classes";
import { withTestId } from "@/lib/design-system/test-id";

export function AnimatedDisclosure({ open, panel, testId, rootRef, slide = "block" }: {
  open: boolean;
  panel: ReactElement;
  testId: string;
  rootRef?: Ref<HTMLDivElement>;
  slide?: "block" | "inline";
}) {
  return <Collapsible.Root open={open} ref={rootRef} data-test-id={`${testId}-disclosure`} className="contents">
    <Collapsible.Panel
      keepMounted
      data-test-id={testId}
      inert={!open}
      className={slide === "inline" ? glass.sidebarDisclosureMotion : glass.disclosureMotion}
      render={withTestId(panel, testId)}
    />
  </Collapsible.Root>;
}
