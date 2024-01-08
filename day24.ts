type Alley = "  ";
type Santa = "🎅";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type Victory = [
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
  ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"],
];

type Move<
  TMaze extends MazeMatrix,
  TDirection extends Directions,
> = Escaped<TMaze> extends true ? Victory : UpdateMaze<TMaze, TDirection>;

type UpdateMaze<
  TMaze extends MazeMatrix,
  TDirection extends Directions,
> = TDirection extends "up"
  ? MoveUp<TMaze>
  : TDirection extends "down"
    ? MoveDown<TMaze>
    : TDirection extends "left"
      ? MoveLeft<TMaze>
      : TDirection extends "right"
        ? MoveRight<TMaze>
        : never;

type MoveUp<TMaze extends MazeMatrix> = Transpose<TMaze> extends [
  infer Row extends MazeItem[],
  ...infer Rest extends MazeMatrix,
]
  ? Transpose<Transpose<Transpose<[MoveRowRight<Row>, ...MoveRight<Rest>]>>>
  : [];

type MoveDown<TMaze extends MazeMatrix> = Transpose<TMaze> extends [
  infer Row extends MazeItem[],
  ...infer Rest extends MazeMatrix,
]
  ? Transpose<Transpose<Transpose<[MoveRowLeft<Row>, ...MoveLeft<Rest>]>>>
  : [];

type MoveLeft<TMaze extends MazeMatrix> = TMaze extends [
  infer Row extends MazeItem[],
  ...infer Rest extends MazeMatrix,
]
  ? [MoveRowLeft<Row>, ...MoveLeft<Rest>]
  : [];

type MoveRight<TMaze extends MazeMatrix> = TMaze extends [
  infer Row extends MazeItem[],
  ...infer Rest extends MazeMatrix,
]
  ? [MoveRowRight<Row>, ...MoveRight<Rest>]
  : [];

type MoveRowLeft<TRow extends MazeItem[]> = TRow extends [
  Alley,
  Santa,
  ...infer Tail extends MazeItem[],
]
  ? [Santa, Alley, ...Tail]
  : TRow extends [infer Head, ...infer Tail extends MazeItem[]]
    ? [Head, ...MoveRowLeft<Tail>]
    : [];

type MoveRowRight<TRow extends MazeItem[]> = TRow extends [
  Santa,
  Alley,
  ...infer Tail extends MazeItem[],
]
  ? [Alley, Santa, ...Tail]
  : TRow extends [infer Head, ...infer Tail extends MazeItem[]]
    ? [Head, ...MoveRowRight<Tail>]
    : [];

type Escaped<TMaze extends MazeMatrix> = TMaze extends [
  infer FirstRow extends MazeItem[],
  ...MazeMatrix,
]
  ? HasSanta<FirstRow> extends true
    ? true
    : TMaze extends [...MazeMatrix, infer LastRow extends MazeItem[]]
      ? HasSanta<LastRow> extends true
        ? true
        : Transpose<TMaze> extends [
              infer FirstColumn extends MazeItem[],
              ...MazeMatrix,
            ]
          ? HasSanta<FirstColumn> extends true
            ? true
            : Transpose<TMaze> extends [
                  ...MazeMatrix,
                  infer LastColumn extends MazeItem[],
                ]
              ? HasSanta<LastColumn> extends true
                ? true
                : false
              : false
          : false
      : false
  : false;

type HasSanta<TRow extends MazeItem[]> = TRow extends [
  infer Head,
  ...infer Tail extends MazeItem[],
]
  ? Head extends Santa
    ? true
    : HasSanta<Tail>
  : false;

type Transpose<
  TMatrix extends any[][],
  Index extends number = 0,
  R extends any[][] = [],
> = Index extends TMatrix[0]["length"]
  ? R
  : Col<TMatrix, Index> extends infer C
    ? C extends undefined
      ? R
      : C extends any[]
        ? Transpose<TMatrix, AddOne<Index>, [...R, C]>
        : R
    : R;

type Col<TMaze extends any[][], TIndex extends number> = TMaze extends [
  ...infer Tail extends any[][],
  infer Head extends any[],
]
  ? [Head[TIndex], ...Col<Tail, TIndex>]
  : [];

type AddOne<N extends number, A extends any[] = []> = A["length"] extends N
  ? [...A, 0]["length"]
  : AddOne<N, [...A, 0]>;
