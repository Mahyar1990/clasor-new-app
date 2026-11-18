"use client";
import type { ReactNode } from "react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
interface Mode { label: string; icon: ReactNode }
/** Two named modes, like a day/night selector; neither is an off state. */
export function ModeSwitch({ second, onValueChange, modes, label, disabled, testId }: { second: boolean; onValueChange: (second: boolean) => void; modes: [Mode, Mode]; label: string; disabled?: boolean; testId: string }) {
  const current = second ? modes[1] : modes[0];
  const next = second ? modes[0] : modes[1];
  return <Button data-test-id={testId} type="button" variant="plain" disabled={disabled} data-mode={second ? "second" : "first"} aria-label={`${label}: ${current.label}؛ تغییر به ${next.label}`} className={glass.modeSwitch} onClick={() => onValueChange(!second)}>
    <span data-test-id={`${testId}-thumb`} aria-hidden="true" className={`${glass.modeSwitchThumb} ${second ? "translate-x-full rtl:-translate-x-full" : "translate-x-0"}`} />
    {modes.map((mode, i) => <span data-test-id={`${testId}-option-${i}`} key={mode.label} className={`relative z-10 flex items-center justify-center gap-1 px-1.5 text-[10px] ${Number(second) === i ? "font-semibold text-primary [&_svg]:stroke-[2.3]" : "text-muted-foreground"}`}><span data-test-id={`${testId}-icon-${i}`} aria-hidden="true" className="[&_svg]:size-3.5">{mode.icon}</span>{mode.label}</span>)}
  </Button>;
}
