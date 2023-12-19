type Gifts = ["🛹", "🚲", "🛴", "🏄"];

type AddOne<N extends number, A extends any[] = []> = A["length"] extends N
  ? [...A, 0]["length"]
  : AddOne<N, [...A, 0]>;

type Repeat<T, A extends number, R extends T[] = []> = R["length"] extends A
  ? R
  : Repeat<T, A, [...R, T]>;

type Rebuilder<
  TList extends number[],
  TIndex extends number = 0,
  R extends any[] = [],
> = TList extends [infer Head, ...infer Tail]
  ? Head extends number
    ? Tail extends number[]
      ? Gifts[TIndex] extends undefined
        ? Rebuilder<Tail, 1, [...R, ...Repeat<Gifts[0], Head>]>
        : Rebuilder<
            Tail,
            AddOne<TIndex>,
            [...R, ...Repeat<Gifts[TIndex], Head>]
          >
      : never
    : never
  : R;

type Rebuild<TList extends number[]> = Rebuilder<TList>;
