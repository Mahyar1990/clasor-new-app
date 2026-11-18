export interface EditorHeading { id: string; label: string; level: number; offset: number }
/** Plain-text editor contract: Markdown headings, no HTML interpretation. */
export function editorHeadings(value: string): EditorHeading[] {
  const items: EditorHeading[] = [];
  let offset = 0;
  value.split('\n').forEach((line, index) => {
    const match = /^(#{1,6})[\t ]+(.+?)\s*$/.exec(line);
    const label = match?.[2].trim();
    if (match && label) items.push({ id: `editor-heading-${index}`, label, level: match[1].length, offset });
    offset += line.length + 1;
  });
  return items;
}
