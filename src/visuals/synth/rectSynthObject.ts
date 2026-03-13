import p5 from "p5";
import { BaseSynthObject } from "./baseSynthObject";
import type { SynthObjectConfig } from "./synthTypes";

type StretchMode = "uniform" | "horizontal" | "vertical";

interface RectConfig extends SynthObjectConfig {
  rect?: {
    stretchMode?: StretchMode;
    aspectRatio?: number;
  };
}

export class RectSynthObject extends BaseSynthObject {
  private readonly stretchMode: StretchMode;
  private readonly aspectRatio: number;

  constructor(config: RectConfig) {
    super(config);
    this.stretchMode = config.rect?.stretchMode ?? "uniform";
    this.aspectRatio = config.rect?.aspectRatio ?? 1;
  }

  display(p: p5, tex: p5.Graphics, currentTime: number): void {
    if (this.isDead()) {
      return;
    }

    const size = this.calculateUniformSize(currentTime);
    let width = this.baseSize * this.aspectRatio;
    let height = this.baseSize;

    if (this.stretchMode === "uniform") {
      width = size * this.aspectRatio;
      height = size;
    } else if (this.stretchMode === "horizontal") {
      width = size * this.aspectRatio;
    } else {
      height = size;
    }

    this.setupDrawing(tex);
    tex.rectMode(p.CENTER);
    tex.rect(0, 0, width, height);
    this.finishDrawing(tex);
  }
}
