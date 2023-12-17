type BoxToys<TToy, TBoxes extends number, R extends any[] = []> = {
  [Boxes in TBoxes]: R["length"] extends Boxes
    ? R
    : BoxToys<TToy, Boxes, [...R, TToy]>;
}[TBoxes];
