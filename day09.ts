type Reverse<S extends string> = S extends `${infer C}${infer Rest}`
  ? `${Reverse<Rest>}${C}`
  : "";
