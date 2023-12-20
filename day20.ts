type Letters = {
  A: [
    '█▀█ ',
    '█▀█ ',
    '▀ ▀ ',
  ],
  B: [
    '█▀▄ ',
    '█▀▄ ',
    '▀▀  '
  ],
  C: [
    '█▀▀ ',
    '█ ░░',
    '▀▀▀ '
  ],
  E: [
    '█▀▀ ',
    '█▀▀ ',
    '▀▀▀ '
  ],
  H: [
    '█ █ ',
    '█▀█ ',
    '▀ ▀ '
  ],
  I: [
    '█ ',
    '█ ',
    '▀ '
  ],
  M: [
    '█▄░▄█ ',
    '█ ▀ █ ',
    '▀ ░░▀ '
  ],
  N: [
    '█▄░█ ',
    '█ ▀█ ',
    '▀ ░▀ '
  ],
  P: [
    '█▀█ ',
    '█▀▀ ',
    '▀ ░░'
  ],
  R: [
    '█▀█ ',
    '██▀ ',
    '▀ ▀ '
  ],
  S: [
    '█▀▀ ',
    '▀▀█ ',
    '▀▀▀ '
  ],
  T: [
    '▀█▀ ',
    '░█ ░',
    '░▀ ░'
  ],
  Y: [
    '█ █ ',
    '▀█▀ ',
    '░▀ ░'
  ],
  W: [
    '█ ░░█ ',
    '█▄▀▄█ ',
    '▀ ░ ▀ '
  ],
  ' ': [
    '░',
    '░',
    '░'
  ],
  ':': [
    '#',
    '░',
    '#'
  ],
  '*': [
    '░',
    '#',
    '░'
  ],
};

type LetterSize = Letters["A"]["length"]

type AddOne<N extends number, A extends any[] = []> = A["length"] extends N
  ? [...A, 0]["length"]
  : AddOne<N, [...A, 0]>;

type Split<
  T extends string,
  R extends string[] = [],
> = T extends `${infer Head}\n${infer Tail}`
  ? Split<Tail, [...R, Head]>
  : [...R, T];

type ToAsciiString<
  TBase extends string,
  E extends string = TBase,
  C extends number = 0,
  S extends string = "",
  R extends string[] = [],
> = C extends LetterSize
  ? R
  : E extends `${infer Char}${infer Tail}`
    ? Uppercase<Char> extends keyof Letters
      ? Letters[Uppercase<Char>] extends string[]
        ? ToAsciiString<TBase, Tail, C, `${S}${Letters[Uppercase<Char>][C]}`, R>
        : never
      : never
    : ToAsciiString<TBase, TBase, AddOne<C>, "", [...R, S]>;

type ToAscii<
  TStrings extends string[],
  R extends string[] = [],
> = TStrings extends [infer Head, ...infer Tail]
  ? Head extends string
    ? Tail extends string[]
      ? ToAscii<Tail, [...R, ...ToAsciiString<Head>]>
      : never
    : never
  : R;

type ToAsciiArt<TText extends string> = ToAscii<Split<TText>>;
