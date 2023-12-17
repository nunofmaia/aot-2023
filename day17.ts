type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type WhoWins<T, U> = [T, U] extends ["✌🏽", "👊🏻"]
  ? "win"
  : [T, U] extends ["👊🏻", "🖐🏾"]
    ? "win"
    : [T, U] extends ["🖐🏾", "✌🏽"]
      ? "win"
      : T extends U
        ? "draw"
        : "lose";
