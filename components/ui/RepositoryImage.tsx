"use client";
import { useState } from "react";
import Image from "next/image";
export function RepositoryImage({ image, name, testId, className = "" }: { image?: string; name: string; testId: string; className?: string }) {
  const [failed, setFailed] = useState<string>();
  const source = image && /^(\/|https?:\/\/|data:image\/|blob:)/.test(image) && failed !== image ? image : "/repositories/default.svg";
  const tones: Record<string, string> = { blue: "-hue-rotate-45", green: "hue-rotate-[230deg]", orange: "hue-rotate-[120deg]" };
  const tone = source.endsWith("/repositories/default.svg") ? tones[image ?? ""] ?? "" : "";
  return <span data-test-id={testId} className={`relative block overflow-hidden rounded-md bg-violet-100 ${className}`}>
    <Image data-test-id={`${testId}-image`} src={source} alt={`تصویر مخزن ${name}`} fill unoptimized sizes="160px" className={`object-cover ${tone}`} onError={() => setFailed(image)} />
  </span>;
}
