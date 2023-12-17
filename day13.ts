type DayCounter<F, L, R extends any[] = [F], Day = R["length"]> = Day extends L
  ? Day
  : Day | DayCounter<Day, L, [...R, Day]>;
