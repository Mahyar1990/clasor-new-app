import { cloneElement, type ReactElement } from "react";

/** Base UI render elements must retain the public wrapper's test identifier. */
export function withTestId(element: ReactElement, testId: string) {
  return cloneElement(element as ReactElement<{ "data-test-id"?: string }>, { "data-test-id": testId });
}
