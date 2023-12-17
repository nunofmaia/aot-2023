type SantaListProtector<T> = T extends () => any
  ? T
  : T extends object
    ? Readonly<{ [K in keyof Readonly<T>]: SantaListProtector<T[K]> }>
    : T;
