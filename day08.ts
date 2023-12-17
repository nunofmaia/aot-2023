type RemoveNaughtyChildren<L extends object> = {
  [K in keyof L as K extends `naughty_${string}` ? never : K]: L[K];
};
