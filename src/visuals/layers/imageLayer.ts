import p5 from "p5";
import type { APCMiniMK2Manager } from "../../midi/apcmini_mk2/apcMiniMk2Manager";
import type { AudioMicManager } from "../../utils/audio/audioMicManager";
import { ImageAnimation } from "../../utils/animation/imageAnimation";
import type { CaptureManager } from "../../utils/capture/captureManager";

type ImageDrawer = (layer: ImageLayer, p: p5, tex: p5.Graphics, beat: number, nowMs: number) => void;

export class ImageLayer {
  private imageAnimation: ImageAnimation;
  private buildingA?: p5.Image;
  private buildingB?: p5.Image;
  private assetsReady: boolean;

  constructor() {
    this.imageAnimation = new ImageAnimation();
    this.assetsReady = false;
  }

  init(p: p5): void {
    void this.loadAssets(p);
  }

  update(
    _p: p5,
    _midiManager: APCMiniMK2Manager,
    _beat: number,
    _bpm: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
  ): void {}

  draw(
    p: p5,
    tex: p5.Graphics,
    midiManager: APCMiniMK2Manager,
    beat: number,
    _bpm: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
  ): void {
    if (!this.assetsReady) {
      return;
    }

    const selectedRaw = midiManager.midiInput["imageLayerSelect"];
    const selected = typeof selectedRaw === "number" ? selectedRaw : 0;
    const index = Math.max(0, Math.min(IMAGE_DRAWERS.length - 1, Math.floor(selected)));
    const drawer = IMAGE_DRAWERS[index] ?? IMAGE_DRAWERS[0];

    // 画像レイヤーのみ軽量にモノクロ化する。
    const ctx2d = tex.drawingContext as CanvasRenderingContext2D;
    ctx2d.save();
    ctx2d.filter = "grayscale(100%)";
    drawer(this, p, tex, beat, p.millis());
    ctx2d.restore();
  }

  resize(_p: p5): void {}

  dispose(): void {
    this.buildingA = undefined;
    this.buildingB = undefined;
  }

  getBuildingA(): p5.Image | undefined {
    return this.buildingA;
  }

  getBuildingB(): p5.Image | undefined {
    return this.buildingB;
  }

  getHandFrame(animationIndex: number, beat: number, speed: number): p5.Image | undefined {
    try {
      const progress = ((beat * speed) % 1 + 1) % 1;
      return this.imageAnimation.getImage("hand", animationIndex, progress);
    } catch {
      return undefined;
    }
  }

  private async loadAssets(p: p5): Promise<void> {
    const [buildingA, buildingB] = await Promise.all([
      this.loadImage(p, "/image/building/1.png"),
      this.loadImage(p, "/image/building/2.png"),
      this.imageAnimation.load(p, "/animation", [
        {
          name: "hand",
          animationCount: 5,
          framesPerAnimation: 40,
        },
      ]),
    ]);

    this.buildingA = buildingA;
    this.buildingB = buildingB;
    this.assetsReady = !!buildingA && !!buildingB;
  }

  private loadImage(p: p5, path: string): Promise<p5.Image | undefined> {
    return new Promise((resolve) => {
      p.loadImage(
        path,
        (img) => resolve(img),
        () => {
          console.warn(`Failed to load image: ${path}`);
          resolve(undefined);
        },
      );
    });
  }
}

const IMAGE_DRAWERS: ImageDrawer[] = [
  (layer, _p, tex) => {
    const img = layer.getBuildingA();
    if (!img) return;
    drawCenteredImage(tex, img, 0.72, 0.92);
  },
  (layer, _p, tex) => {
    const img = layer.getBuildingB();
    if (!img) return;
    drawCenteredImage(tex, img, 0.72, 0.92);
  },
  (layer, _p, tex) => {
    const a = layer.getBuildingA();
    const b = layer.getBuildingB();
    if (!a || !b) return;
    drawCornerImage(tex, a, 0.02, 0.04, 0.42);
    drawCornerImage(tex, b, 0.56, 0.04, 0.42);
  },
  (layer, _p, tex, beat) => {
    const a = layer.getBuildingA();
    if (!a) return;
    const scale = 0.55 + Math.sin(beat * Math.PI * 2) * 0.06;
    drawCenteredImage(tex, a, scale, 0.92);
  },
  (layer, _p, tex, beat) => {
    const b = layer.getBuildingB();
    if (!b) return;
    const y = 0.45 + Math.sin(beat * 0.4) * 0.05;
    drawCenteredImage(tex, b, 0.65, 0.9, 0.5, y);
  },
  (layer, _p, tex, beat) => {
    const hand = layer.getHandFrame(0, beat, 0.5);
    if (!hand) return;
    drawCenteredImage(tex, hand, 0.45, 1.0);
  },
  (layer, _p, tex, beat) => {
    const hand = layer.getHandFrame(1, beat, 0.8);
    if (!hand) return;
    drawCenteredImage(tex, hand, 0.45, 1.0, 0.25, 0.55);
    drawCenteredImage(tex, hand, 0.45, 1.0, 0.75, 0.55);
  },
  (layer, _p, tex, beat) => {
    const hand = layer.getHandFrame(2, beat, 1.2);
    const a = layer.getBuildingA();
    if (!hand || !a) return;
    drawCenteredImage(tex, a, 0.75, 0.75);
    drawCenteredImage(tex, hand, 0.38, 1.0);
  },
  (layer, _p, tex, beat) => {
    const hand = layer.getHandFrame(3, beat, 0.7);
    const b = layer.getBuildingB();
    if (!hand || !b) return;
    drawCenteredImage(tex, b, 0.78, 0.8);
    drawCenteredImage(tex, hand, 0.35, 1.0, 0.8, 0.72);
  },
  (layer, _p, tex, beat) => {
    const h0 = layer.getHandFrame(0, beat, 1.3);
    const h1 = layer.getHandFrame(4, beat, 0.9);
    if (!h0 || !h1) return;
    drawCenteredImage(tex, h0, 0.28, 1.0, 0.32, 0.6);
    drawCenteredImage(tex, h1, 0.28, 1.0, 0.68, 0.6);
  },
  (layer, _p, tex, beat) => {
    const a = layer.getBuildingA();
    const h = layer.getHandFrame(4, beat, 1.0);
    if (!a || !h) return;
    drawCenteredImage(tex, a, 0.8, 0.9);
    drawCenteredImage(tex, h, 0.22, 1.0, 0.2, 0.25);
    drawCenteredImage(tex, h, 0.22, 1.0, 0.8, 0.25);
  },
  (layer, _p, tex, beat) => {
    const b = layer.getBuildingB();
    const h = layer.getHandFrame(2, beat, 0.6);
    if (!b || !h) return;
    drawCenteredImage(tex, b, 0.8, 0.9);
    drawCenteredImage(tex, h, 0.25, 1.0, 0.5, 0.2 + Math.sin(beat * 0.5) * 0.08);
  },
  (layer, _p, tex, beat) => {
    const a = layer.getBuildingA();
    const b = layer.getBuildingB();
    const h = layer.getHandFrame(1, beat, 1.1);
    if (!a || !b || !h) return;
    drawCornerImage(tex, a, 0.02, 0.02, 0.32);
    drawCornerImage(tex, b, 0.66, 0.66, 0.32);
    drawCenteredImage(tex, h, 0.26, 1.0, 0.5, 0.5);
  },
  (layer, _p, tex, beat) => {
    const h0 = layer.getHandFrame(0, beat, 1.8);
    const h1 = layer.getHandFrame(3, beat, 1.2);
    if (!h0 || !h1) return;
    drawCenteredImage(tex, h0, 0.22, 1.0, 0.2, 0.75);
    drawCenteredImage(tex, h1, 0.22, 1.0, 0.5, 0.75);
    drawCenteredImage(tex, h0, 0.22, 1.0, 0.8, 0.75);
  },
  (layer, _p, tex, beat) => {
    const a = layer.getBuildingA();
    const h = layer.getHandFrame(4, beat, 0.75);
    if (!a || !h) return;
    const x = 0.5 + Math.sin(beat * 0.35) * 0.15;
    drawCenteredImage(tex, a, 0.75, 0.86);
    drawCenteredImage(tex, h, 0.33, 1.0, x, 0.62);
  },
  (layer, _p, tex, beat) => {
    const a = layer.getBuildingA();
    const b = layer.getBuildingB();
    const h = layer.getHandFrame(2, beat, 1.5);
    if (!a || !b || !h) return;
    drawCenteredImage(tex, a, 0.46, 0.9, 0.28, 0.52);
    drawCenteredImage(tex, b, 0.46, 0.9, 0.72, 0.52);
    drawCenteredImage(tex, h, 0.25, 1.0, 0.5, 0.2);
  },
];

const drawCenteredImage = (
  tex: p5.Graphics,
  img: p5.Image,
  widthRatio: number,
  alpha: number,
  xRatio: number = 0.5,
  yRatio: number = 0.5,
): void => {
  const w = tex.width * widthRatio;
  const h = img.width > 0 ? (img.height / img.width) * w : w;

  tex.push();
  tex.imageMode(tex.CENTER);
  tex.tint(255, Math.max(0, Math.min(255, alpha * 255)));
  tex.image(img, tex.width * xRatio, tex.height * yRatio, w, h);
  tex.pop();
};

const drawCornerImage = (
  tex: p5.Graphics,
  img: p5.Image,
  xRatio: number,
  yRatio: number,
  widthRatio: number,
): void => {
  const w = tex.width * widthRatio;
  const h = img.width > 0 ? (img.height / img.width) * w : w;
  tex.push();
  tex.tint(255, 220);
  tex.image(img, tex.width * xRatio, tex.height * yRatio, w, h);
  tex.pop();
};
