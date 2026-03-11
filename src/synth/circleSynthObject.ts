import p5 from "p5";
import { BaseSynthObject } from "./baseSynthObject";
import type { SynthObjectConfig } from "./synthTypes";

interface CircleConfig extends SynthObjectConfig {
  ellipse?: {
    aspectRatio?: number;
  };
}

export class CircleSynthObject extends BaseSynthObject {
  private readonly aspectRatio: number;

  constructor(config: CircleConfig) {
    super(config);
    this.aspectRatio = config.ellipse?.aspectRatio ?? 1;
  }

  display(_p: p5, tex: p5.Graphics, currentTime: number): void {
    if (this.isDead()) {
      return;
    }

    const size = this.calculateUniformSize(currentTime);
    this.setupDrawing(tex);
    tex.ellipse(0, 0, size * this.aspectRatio, size);
    this.finishDrawing(tex);
  }
}
