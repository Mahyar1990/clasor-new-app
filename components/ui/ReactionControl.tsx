"use client";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "./button";
export type ReactionValue = "like" | "dislike" | null;
export function ReactionControl({ value, likes, dislikes, onValueChange, disabled = false, testId }: { value: ReactionValue; likes: number; dislikes: number; onValueChange: (value: ReactionValue) => void; disabled?: boolean; testId: string }) {
  return <div data-test-id={testId} role="group" aria-label="بازخورد به سند" className="flex items-center gap-0.5">
    {([{ key: "like", label: "پسندیدن", count: likes, Icon: ThumbsUp }, { key: "dislike", label: "نپسندیدن", count: dislikes, Icon: ThumbsDown }] as const).map(({ key, label, count, Icon }) => <Button data-test-id={`${testId}-${key}`} key={key} variant="glass" size="sm" className="gap-1 px-1.5 text-[10px]" disabled={disabled} aria-label={`${label}؛ ${count}`} aria-pressed={value === key} onClick={() => onValueChange(value === key ? null : key)}><Icon aria-hidden="true" className="size-3.5!" /><span data-test-id={`${testId}-${key}-count`}>{new Intl.NumberFormat("fa").format(count)}</span></Button>)}
  </div>;
}
