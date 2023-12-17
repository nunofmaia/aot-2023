type FindSantaInRow<T extends string[], R extends any[] = []> = T extends [
  infer Head,
  ...infer Rest,
]
  ? Head extends "🎅🏼"
    ? R["length"]
    : Rest extends string[]
      ? FindSantaInRow<Rest, [Head, ...R]>
      : undefined
  : undefined;

type FindSanta<
  TForest extends string[][],
  R extends any[] = [],
  Col = FindSantaInRow<TForest[0]>,
> = Col extends number
  ? [R["length"], Col]
  : TForest extends [infer Head, ...infer Rest]
    ? Rest extends string[][]
      ? FindSanta<Rest, [...R, Head]>
      : never
    : never;
