type AppendGood<L extends object> = {
  [K in keyof L as K extends string ? `good_${K}` : K]: L[K];
};
