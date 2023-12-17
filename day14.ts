type DecipherNaughtyList<L extends string> =
  L extends `${infer Name}/${infer Names}`
    ? Name | DecipherNaughtyList<Names>
    : L;
