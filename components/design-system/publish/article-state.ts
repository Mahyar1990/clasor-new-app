export type ArticleBlock = { type: "heading"; id: string; level: number; text: string } | { type: "paragraph"; id: string; text: string };
/** Plain text/Markdown headings only; content never becomes untrusted HTML. */
export function publicationBlocks(content: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let paragraph: string[] = [];
  function flush() { if (paragraph.length) { blocks.push({ type: "paragraph", id: `publish-block-${blocks.length}`, text: paragraph.join("\n") }); paragraph = []; } }
  for (const line of content.split("\n")) {
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) { flush(); blocks.push({ type: "heading", id: `publish-section-${blocks.length}`, level: heading[1].length, text: heading[2].trim() }); }
    else if (!line.trim()) flush();
    else paragraph.push(line);
  }
  flush(); return blocks;
}
export function reactionCounts(value: "like" | "dislike" | null, likes = 0, dislikes = 0) { return { likes: likes + Number(value === "like"), dislikes: dislikes + Number(value === "dislike") }; }
export function canOpenPublishedInPanel(user: { repositoryIds: string[] } | null, repositoryId?: string) { return !!user && !!repositoryId && user.repositoryIds.includes(repositoryId); }
export function publicAttachmentUrl(value?: string) { return !!value && /^(https?:\/\/|\/[^/]|data:(text\/plain|application\/pdf|image\/(png|jpeg|webp|svg\+xml))[,;])/i.test(value); }
