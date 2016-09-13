let base = 0;
const buckets = 100;
const next = () => ++base * buckets;

export const pile = next();
export const hand = next();
