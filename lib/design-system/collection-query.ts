/** Search text and conjunctive, named filters owned by the consuming collection. */
export interface CollectionQuery { text: string; filters: Record<string, string> }
