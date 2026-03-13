import type p5 from "p5";

export interface ImageLayerLike {
  getImageByKey(key: string): p5.Image | undefined;
  getAnimationFrame(
    category: string,
    animationIndex: number,
    beat: number,
    speed: number,
  ): p5.Image | undefined;
}

export type ImageDrawer = (
  layer: ImageLayerLike,
  p: p5,
  tex: p5.Graphics,
  beat: number,
  nowMs: number,
) => void;
