import p5 from "p5";
import type { APCMiniMK2Manager } from "../../midi/apcmini_mk2/apcMiniMk2Manager";
import type { AudioMicManager } from "../../utils/audio/audioMicManager";
import { ImageAnimation } from "../../utils/animation/imageAnimation";
import type { CaptureManager } from "../../utils/capture/captureManager";
import { IMAGE_DRAWERS } from "../imageDrawers/index";

const IMAGE_MAIN_KEYS = [
  "apple",
  "building",
  "calculator",
  "car",
  "clock",
  "flower1",
  "flower2",
  "glass",
  "hand",
  "water",
] as const;

export class ImageLayer {
  private readonly imageAnimation: ImageAnimation;
  private readonly imageMap: Map<string, p5.Image>;
  private assetsReady: boolean;

  constructor() {
    this.imageAnimation = new ImageAnimation();
    this.imageMap = new Map<string, p5.Image>();
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
    this.imageMap.clear();
    this.assetsReady = false;
  }

  getImageByKey(key: string): p5.Image | undefined {
    return this.imageMap.get(key);
  }

  getAnimationFrame(
    category: string,
    animationIndex: number,
    beat: number,
    speed: number,
  ): p5.Image | undefined {
    try {
      const progress = ((beat * speed) % 1 + 1) % 1;
      return this.imageAnimation.getImage(category, animationIndex, progress);
    } catch {
      return undefined;
    }
  }

  private async loadAssets(p: p5): Promise<void> {
    const [loaded] = await Promise.all([
      Promise.all(
        IMAGE_MAIN_KEYS.map(async (key) => {
          const img = await this.loadImage(p, `/image/main/${key}.png`);
          return { key, img };
        }),
      ),
      this.imageAnimation.load(p, "/animation", [
        {
          name: "hand",
          animationCount: 5,
          framesPerAnimation: 40,
        },
      ]),
    ]);

    this.imageMap.clear();
    for (const item of loaded) {
      if (item.img) {
        this.imageMap.set(item.key, item.img);
      }
    }
    this.assetsReady = this.imageMap.size > 0;
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
