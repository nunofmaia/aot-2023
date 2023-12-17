type FindSanta<T extends string[], R extends any[] = []> = T extends [
  infer Head,
  ...infer Rest,
]
  ? Head extends "🎅🏼"
    ? R["length"]
    : Rest extends string[]
      ? FindSanta<Rest, [Head, ...R]>
      : never
  : never;
