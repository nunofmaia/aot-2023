type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '],
  ['  ', '  ', '  '],
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type TicTacToe<
  TGame extends TicTacToeGame,
  TPosition extends TicTacToePositions,
> = Solve<TGame, TPosition>;

type Solve<
  TGame extends TicTacToeGame,
  TPosition extends TicTacToePositions,
  UpdatedBoard extends TicTacToeBoard = UpdateBoard<
    TGame["board"],
    TPosition,
    TGame["state"]
  >,
  UpdatedState extends TicTacToeState = UpdatedBoard extends TGame["board"]
    ? TGame["state"]
    : UpdateState<UpdatedBoard, TGame["state"]>,
> = { board: UpdatedBoard; state: UpdatedState };

type UpdateRow<
  TRow extends string[],
  TIndex extends number,
  TChip extends TicTacToeChip,
  R extends string[] = [],
> = TRow extends [infer Head extends string, ...infer Tail extends string[]]
  ? TIndex extends R["length"]
    ? Head extends TicTacToeEmptyCell
      ? [...R, TChip, ...Tail]
      : UpdateRow<Tail, TIndex, TChip, [...R, Head]>
    : UpdateRow<Tail, TIndex, TChip, [...R, Head]>
  : R;

type UpdateBoard<
  TBoard extends TicTacToeBoard,
  TPosition extends TicTacToePositions,
  TState extends TicTacToeState,
> = TState extends TicTacToeChip
  ? PositionIndex<TPosition> extends [
      infer Row extends number,
      infer Col extends number,
    ]
    ? Row extends 0
      ? [UpdateRow<TBoard[0], Col, TState>, TBoard[1], TBoard[2]]
      : Row extends 1
        ? [TBoard[0], UpdateRow<TBoard[1], Col, TState>, TBoard[2]]
        : Row extends 2
          ? [TBoard[0], TBoard[1], UpdateRow<TBoard[2], Col, TState>]
          : TBoard
    : TBoard
  : TBoard;

type UpdateState<
  TBoard extends TicTacToeBoard,
  TState extends TicTacToeState,
  W = [TState, TState, TState],
> = TState extends TicTacToeChip
  ? TBoard[0] extends W
    ? `${TState} Won`
    : TBoard[1] extends W
      ? `${TState} Won`
      : TBoard[2] extends W
        ? `${TState} Won`
        : [TBoard[0][0], TBoard[1][0], TBoard[2][0]] extends W
          ? `${TState} Won`
          : [TBoard[0][1], TBoard[1][1], TBoard[2][1]] extends W
            ? `${TState} Won`
            : [TBoard[0][2], TBoard[1][2], TBoard[2][2]] extends W
              ? `${TState} Won`
              : [TBoard[0][0], TBoard[1][1], TBoard[2][2]] extends W
                ? `${TState} Won`
                : [TBoard[0][2], TBoard[1][1], TBoard[2][0]] extends W
                  ? `${TState} Won`
                  :
                        | NotEmpty<TBoard[0]>
                        | NotEmpty<TBoard[1]>
                        | NotEmpty<TBoard[2]> extends true
                    ? "Draw"
                    : TState extends "⭕"
                      ? "❌"
                      : "⭕"
  : TState;

type XPositionIndex<TPosition extends TicTacToeXPositions> =
  TPosition extends "left"
    ? 0
    : TPosition extends "center"
      ? 1
      : TPosition extends "right"
        ? 2
        : never;

type YPositionIndex<TPosition extends TicTacToeYPositions> =
  TPosition extends "top"
    ? 0
    : TPosition extends "middle"
      ? 1
      : TPosition extends "bottom"
        ? 2
        : never;

type PositionIndex<TPositions extends TicTacToePositions> = {
  [P in TPositions]: P extends `${infer Y extends
    TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
    ? [YPositionIndex<Y>, XPositionIndex<X>]
    : never;
}[TPositions];

type NotEmpty<TRow extends TicTacToeCell[]> = TRow extends [
  infer Head,
  ...infer Tail extends TicTacToeCell[],
]
  ? Head extends TicTacToeEmptyCell
    ? false
    : NotEmpty<Tail>
  : true;
