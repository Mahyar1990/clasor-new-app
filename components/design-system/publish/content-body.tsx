import type { ArticleBlock } from "./article-state";
export function PublishedBody({ blocks }: { blocks: ArticleBlock[] }) {
  return blocks.map(block => {
    if (block.type === "paragraph") return <p data-test-id={block.id} key={block.id} className="whitespace-pre-wrap">{block.text}</p>;
    const Heading = `h${Math.max(2, block.level)}` as "h2" | "h3" | "h4" | "h5" | "h6";
    return <Heading data-test-id={block.id} id={block.id} key={block.id} tabIndex={-1} className="mt-7 scroll-mt-4 border-s-2 border-primary/50 ps-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-ring">{block.text}</Heading>;
  });
}
