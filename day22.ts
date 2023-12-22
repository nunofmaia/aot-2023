/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type BoardSlice = Reindeer[]
type Board = BoardSlice[][]

type Validate<TBoard extends Board> = ValidateBoard<TBoard>

type ValidateBoard<
  TBoard extends Board,
  TIndex extends number = 0,
> = TIndex extends TBoard["length"]
  ? true
  :
        | ValidateSlice<Row<TBoard, TIndex>>
        | ValidateSlice<Column<TBoard, TIndex>>
        | ValidateSlice<Region<TBoard, TIndex>> extends true
    ? ValidateBoard<TBoard, AddOne<TIndex>>
    : false;

type ValidateSlice<TSlice extends BoardSlice> = TSlice extends []
  ? false
  : Exclude<Reindeer, ArrayToUnion<TSlice>> extends never
    ? true
    : false;

type Row<TBoard extends Board, TIndex extends number> = SliceToArray<
  TBoard[TIndex]
>;

type Column<TBoard extends Board, TIndex extends number> = TBoard extends [
  any,
  ...infer Rest extends Board,
]
  ? [Row<TBoard, 0>[TIndex], ...Column<Rest, TIndex>]
  : [];

type Region<
  TBoard extends Board,
  TIndex extends number,
> = TIndex extends keyof RegionCoords
  ? RegionCoords[TIndex] extends [
      infer A extends RegionCoord,
      infer B extends RegionCoord,
      infer C extends RegionCoord,
    ]
    ? SliceToArray<[TBoard[A[0]][A[1]], TBoard[B[0]][B[1]], TBoard[C[0]][C[1]]]>
    : never
  : never;

type SliceToArray<
  TSlices extends BoardSlice[],
  R extends Reindeer[] = [],
> = TSlices extends [infer Slice, ...infer OtherSlices extends BoardSlice[]]
  ? Slice extends [
      infer Head extends Reindeer,
      ...infer Tail extends BoardSlice,
    ]
    ? SliceToArray<[Tail, ...OtherSlices], [...R, Head]>
    : SliceToArray<OtherSlices, R>
  : R;

type ArrayToUnion<TArray extends any[]> = {
  [K in TArray[number]]: K;
}[TArray[number]];

type AddOne<N extends number, A extends any[] = []> = A["length"] extends N
  ? [...A, 0]["length"]
  : AddOne<N, [...A, 0]>;

type RegionCoord = [number, number];
type RegionCoords = {
  0: [[0, 0], [1, 0], [2, 0]];
  1: [[0, 1], [1, 1], [2, 1]];
  2: [[0, 2], [1, 2], [2, 2]];
  3: [[3, 0], [4, 0], [5, 0]];
  4: [[3, 1], [4, 1], [5, 1]];
  5: [[3, 2], [4, 2], [5, 2]];
  6: [[6, 0], [7, 0], [8, 0]];
  7: [[6, 1], [7, 1], [8, 1]];
  8: [[6, 2], [7, 2], [8, 2]];
};
