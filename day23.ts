type Connect4Chips = "🔴" | "🟡";
type Connect4EmptyCell = "  ";
type Connect4Cell = Connect4Chips | Connect4EmptyCell;
type Connect4EndState = "🔴 Won" | "🟡 Won" | "Draw";
type Connect4State = "🔴" | "🟡" | Connect4EndState;

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type Board = Connect4Cell[][];
type Game = {
  board: Board;
  state: Connect4State;
};

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Connect4<TGame extends Game, TColumn extends number> = Play<TGame, TColumn>

type Play<
  TGame extends Game,
  TColumn extends number,
  UpdatedBoard extends Board = UpdateBoard<
    TGame["board"],
    TColumn,
    TGame["state"]
  >,
> = { board: UpdatedBoard; state: UpdateState<UpdatedBoard, TGame["state"]> };

type UpdateBoard<
  TBoard extends Board,
  TColumn extends number,
  TState extends Connect4State,
> = TBoard extends [
  ...infer Head extends Board,
  infer Tail extends Connect4Cell[],
]
  ? Tail[TColumn] extends Connect4EmptyCell
    ? [...Head, UpdateLine<Tail, TColumn, TState>]
    : [...UpdateBoard<Head, TColumn, TState>, Tail]
  : [];

type UpdateState<
  TBoard extends Board,
  TState extends Connect4State,
> = TState extends Connect4EndState
  ? TState
  : TState extends Connect4Chips
    ? Validate<TBoard, TState> extends true
      ? `${TState} Won`
      : NotEmpty<TBoard[0]> extends true
        ? 'Draw'
        : TState extends "🔴"
          ? "🟡"
          : "🔴"
    : never

type Validate<TBoard extends Board, TChip extends Connect4Chips> =
  ValidateRows<TBoard, TChip> extends true ? true
  : ValidateCols<TBoard, TChip> extends true ? true
  : ValidateDiags<TBoard, TChip> extends true ? true
  : ValidateDiags<Invert<TBoard>, TChip>

type UpdateLine<TLine extends Connect4Cell[], TIndex extends number, TState extends Connect4State> =
  TState extends Connect4Chips
  ? TLine extends [...infer Head extends Connect4Cell[], infer Tail extends Connect4Cell]
    ? Head["length"] extends TIndex
      ? [...Head, TState]
      : [...UpdateLine<Head, TIndex, TState>, Tail]
    : []
  : TLine

type ValidateLine<TLine extends Connect4Cell[], TChip extends Connect4Chips, Acc extends Connect4Cell[] = []> =
  Acc["length"] extends 4
  ? true
  : TLine extends [infer Head, ...infer Tail extends Connect4Cell[]]
    ? Head extends TChip
      ? ValidateLine<Tail, TChip, [...Acc, TChip]>
      : ValidateLine<Tail, TChip>
    : false

type ValidateRows<TBoard extends Board, TChip extends Connect4Chips> =
  TBoard extends [...infer Rest extends Board, infer Row extends Connect4Cell[]]
  ? ValidateLine<Row, TChip> extends true
    ? true
    : ValidateRows<Rest, TChip>
  : false

type ValidateCols<TBoard extends Board, TChip extends Connect4Chips> =
  ValidateRows<Transpose<TBoard>, TChip>

type ValidateDiags<TBoard extends Board, TChip extends Connect4Chips> =
  ValidateRows<Transpose<ShiftBoard<TBoard>>, TChip> extends true
    ? true
    : TBoard extends [...infer Rest extends Board, any]
      ? ValidateDiags<Rest, TChip>
      : false

type Col<TBoard extends Board, TIndex extends number> =
  TBoard extends [...infer Tail extends Board, infer Head extends Connect4Cell[]]
  ? [Head[TIndex], ...Col<Tail, TIndex>]
  : []

type NumbersOfColumns = EmptyBoard[0]["length"]
type Transpose<TBoard extends Board, Index extends number = 0, R extends Board = []> =
  Index extends NumbersOfColumns
  ? R
  : Col<TBoard, Index> extends infer C
    ? C extends undefined
      ? R
      : C extends Connect4Cell[]
        ? Transpose<TBoard, AddOne<Index>, [...R, C]>
        : R
    : R

type NotEmpty<TRow extends Connect4Cell[]> = TRow extends [
  infer Head,
  ...infer Tail extends Connect4Cell[],
]
  ? Head extends Connect4EmptyCell
    ? false
    : NotEmpty<Tail>
  : true;

type AddOne<N extends number, A extends any[] = []> = A["length"] extends N
  ? [...A, 0]["length"]
  : AddOne<N, [...A, 0]>;

type SubtractOne<N extends number, A extends any[] = []> = [...A, 0]["length"] extends N
  ? A["length"]
  : SubtractOne<N, [...A, 0]>;

type Shift<TRow extends any[], TAmount extends number> =
  TAmount extends 0
    ? TRow
    : TRow extends [any, ...infer Tail extends any[]]
      ? Shift<Tail, SubtractOne<TAmount>>
      : []

type ShiftBoard<TBoard extends Board, TShift extends number = 0> =
  TBoard extends [...infer Rest extends Board, infer Row extends Connect4Cell[]]
    ? [...ShiftBoard<Rest, AddOne<TShift>>, Shift<Row, TShift>]
    : TBoard

type Invert<TBoard extends Board> =
  TBoard extends [...infer Rest extends Board, infer Row]
    ? [Row, ...Invert<Rest>]
    : []
