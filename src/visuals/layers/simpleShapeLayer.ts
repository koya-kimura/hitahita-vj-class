import p5 from "p5";
import { SIMPLE_SHAPE_DRAWERS } from "../simpleShapes/index";
import type { APCMiniMK2Manager } from "../../midi/apcmini_mk2/apcMiniMk2Manager";
import type { AudioMicManager } from "../../utils/audio/audioMicManager";
import type { CaptureManager } from "../../utils/capture/captureManager";

export class SimpleShapeLayer {
  init(_p: p5): void {}

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
    const selectedRaw = midiManager.midiInput["simpleLayerSelect"];
    const selected = typeof selectedRaw === "number" ? selectedRaw : 0;
    const index = Math.max(0, Math.min(SIMPLE_SHAPE_DRAWERS.length - 1, Math.floor(selected)));
    const drawer = SIMPLE_SHAPE_DRAWERS[index] ?? SIMPLE_SHAPE_DRAWERS[0];
    drawer({
      p,
      tex,
      beat,
      nowMs: p.millis(),
      width: tex.width,
      height: tex.height,
    });
  }

  resize(_p: p5): void {}

  dispose(): void {}
}
