import p5 from "p5";
import type { APCMiniMK2Manager } from "../midi/apcmini_mk2/apcMiniMk2Manager"; // MIDIコントローラー管理クラス
import type { AudioMicManager } from "../utils/audio/audioMicManager"; // オーディオ入力管理クラス
import type { CaptureManager } from "../utils/capture/captureManager"; // カメラキャプチャ管理クラス
import { ImageLayer } from "../visuals/layers/imageLayer";
import { SimpleShapeLayer } from "../visuals/layers/simpleShapeLayer";
import { SynthLayer } from "../visuals/layers/synthLayer";

export interface VisualLayerVisibility {
  shape: boolean;
  image: boolean;
  synth: boolean;
}

/**
 * VisualComposer はレンダーターゲットとアクティブなビジュアル1つを管理する。
 */
export class VisualComposer {
  private renderTexture: p5.Graphics | undefined; // ビジュアル描画用のオフスクリーンキャンバス
  private readonly simpleShapeLayer: SimpleShapeLayer;
  private readonly imageLayer: ImageLayer;
  private readonly synthLayer: SynthLayer;

  constructor() {
    this.renderTexture = undefined;
    this.simpleShapeLayer = new SimpleShapeLayer();
    this.imageLayer = new ImageLayer();
    this.synthLayer = new SynthLayer();
  }

  /**
   * ビジュアル描画用の `p5.Graphics` を生成する。
   *
   * @param p p5 インスタンス。
   */
  init(p: p5): void {
    this.renderTexture = p.createGraphics(p.width, p.height);
    this.simpleShapeLayer.init(p);
    this.imageLayer.init(p);
    this.synthLayer.init(p);
  }

  /**
   * ビジュアル描画結果を保持している `p5.Graphics` を返す。
   *
   * @returns ビジュアルテクスチャ。
   * @throws Error 初期化前に呼び出された場合。
   */
  getTexture(): p5.Graphics {
    if (!this.renderTexture) {
      throw new Error("Render texture not initialized");
    }
    return this.renderTexture;
  }

  /**
   * テクスチャが初期化されていることを保証する。
   *
   * @returns テクスチャ。
   * @throws Error 初期化されていない場合。
   */
  private ensureTexture(): p5.Graphics {
    if (!this.renderTexture) {
      throw new Error("Render texture not initialized");
    }
    return this.renderTexture;
  }

  /**
   * ビジュアルの更新処理。
   *
   * @param _p p5 インスタンス。
   * @param _midiManager MIDI 状態。
   * @param _beat 現在のビート。
   * @param _audioManager オーディオマネージャー。
   * @param _captureManager キャプチャマネージャー。
   * @param _font フォント。
   */
  update(
    p: p5,
    midiManager: APCMiniMK2Manager,
    beat: number,
    bpm: number,
    visibility: VisualLayerVisibility,
    audioManager?: AudioMicManager,
    captureManager?: CaptureManager,
    font?: p5.Font,
  ): void {
    this.simpleShapeLayer.update(p, midiManager, beat, bpm, audioManager, captureManager, font);
    this.imageLayer.update(p, midiManager, beat, bpm, audioManager, captureManager, font);
    if (visibility.synth) {
      this.synthLayer.update(p, midiManager, beat, bpm, audioManager, captureManager, font);
    }
  }

  /**
   * ビジュアルを描画する。
   *
   * @param _p p5 インスタンス。
   * @param _midiManager MIDI 状態。
   * @param _beat 現在のビート。
   * @param _audioManager オーディオマネージャー。
   * @param _captureManager キャプチャマネージャー。
   * @param _font フォント。
   */
  draw(
    p: p5,
    midiManager: APCMiniMK2Manager,
    beat: number,
    bpm: number,
    visibility: VisualLayerVisibility,
    audioManager?: AudioMicManager,
    captureManager?: CaptureManager,
    font?: p5.Font,
  ): void {
    const tex = this.ensureTexture();
    tex.push();
    tex.background(0);
    tex.pop();

    if (visibility.shape) {
      this.simpleShapeLayer.draw(p, tex, midiManager, beat, bpm, audioManager, captureManager, font);
    }
    if (visibility.image) {
      this.imageLayer.draw(p, tex, midiManager, beat, bpm, audioManager, captureManager, font);
    }
    if (visibility.synth) {
      this.synthLayer.draw(p, tex, midiManager, beat, bpm, audioManager, captureManager, font);
    }
  }

  /**
   * ウィンドウリサイズに合わせてテクスチャのサイズを更新する。
   *
   * @param p p5 インスタンス。
   */
  resize(p: p5): void {
    const texture = this.ensureTexture();
    texture.resizeCanvas(p.width, p.height);
    this.simpleShapeLayer.resize(p);
    this.imageLayer.resize(p);
    this.synthLayer.resize(p);
  }

  triggerDebugSynthPreset(p: p5, bpm: number, presetIndex: number): void {
    this.synthLayer.spawnPresetForDebug(p, bpm, presetIndex);
  }

  /**
   * リソースを解放する。
   */
  dispose(): void {
    this.simpleShapeLayer.dispose();
    this.imageLayer.dispose();
    this.synthLayer.dispose();
    this.renderTexture?.remove();
    this.renderTexture = undefined;
  }
}