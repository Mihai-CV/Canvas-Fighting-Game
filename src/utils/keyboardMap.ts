export enum FigKey {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  H,
}

export interface KeyboardMap {
  [key: string]: FigKey;
}

export let MAP_A = {
  ArrowUp: FigKey.UP,
  ArrowDown: FigKey.DOWN,
  ArrowLeft: FigKey.LEFT,
  ArrowRight: FigKey.RIGHT,
  h: FigKey.H
};
export let MAP_B = {
  w: FigKey.UP,
  s: FigKey.DOWN,
  a: FigKey.LEFT,
  d: FigKey.RIGHT,
};
