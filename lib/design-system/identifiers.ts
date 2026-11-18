export function splitIdentifiers(value: string): string[] {
  return [...new Set(value.split(/[\s,،]+/u).map(item => item.trim()).filter(Boolean))];
}
export function appendIdentifiers(current: string[], value: string): string[] {
  return [...new Set([...current, ...splitIdentifiers(value)])];
}
