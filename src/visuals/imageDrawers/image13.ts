import type { ImageDrawer } from "./types";

export const drawImage13: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  tex.push();
  tex.pop();
};
