export enum FigKey {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  LP,
  MP,
  LK,
  MK,
  SPECIAL,
}

export interface KeyboardMap {
  [key: string]: FigKey;
}

export let MAP_A = {
  ArrowUp: FigKey.UP,
  ArrowDown: FigKey.DOWN,
  ArrowLeft: FigKey.LEFT,
  ArrowRight: FigKey.RIGHT,
  i: FigKey.LP,
  o: FigKey.MP,
  k: FigKey.LK,
  l: FigKey.MK,
  p: FigKey.SPECIAL,
};
export let MAP_B = {
  w: FigKey.UP,
  s: FigKey.DOWN,
  a: FigKey.LEFT,
  d: FigKey.RIGHT,
  g: FigKey.LP,
  h: FigKey.MP,
  b: FigKey.LK,
  n: FigKey.MK,
  j: FigKey.SPECIAL,
};
