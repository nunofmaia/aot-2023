type Counter<TStack, TToy, R extends any[] = []> = TStack extends [
  infer Head,
  ...infer Rest,
]
  ? Head extends TToy
    ? Counter<Rest, TToy, [...R, TToy]>
    : Counter<Rest, TToy, R>
  : R["length"];

type Count<TStack, TToy> = Counter<TStack, TToy>;
