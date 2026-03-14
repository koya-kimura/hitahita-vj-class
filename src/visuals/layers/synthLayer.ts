import p5 from "p5";
import type { BaseSynthObject } from "../synth/object";
import { Looper } from "../synth/looper";
import { PRESETS } from "../synth/presets";
import type { APCMiniMK2Manager } from "../../midi/apcmini_mk2/apcMiniMk2Manager";
import type { AudioMicManager } from "../../utils/audio/audioMicManager";
import type { CaptureManager } from "../../utils/capture/captureManager";

const PRESET_SLOT_COUNT = 16;
const LOOPER_COUNT = 4;

export class SynthLayer {
  private static readonly MAX_OBJECTS = 5000;

  private synthObjects: BaseSynthObject[];
  private readonly loopers: Looper[];
  private readonly previousPresetPressState: boolean[];
  private readonly previousLooperStates: number[];

  constructor() {
    this.synthObjects = [];
    this.loopers = Array.from({ length: LOOPER_COUNT }, () => new Looper());
    this.previousPresetPressState = new Array(PRESET_SLOT_COUNT).fill(false);
    this.previousLooperStates = new Array(LOOPER_COUNT).fill(0);
  }

  init(_p: p5): void {}

  update(
    p: p5,
    midiManager: APCMiniMK2Manager,
    beat: number,
    bpm: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
  ): void {
    const now = p.millis();

    this.processPresetTriggers(p, midiManager, beat, bpm);
    this.processLooperControls(midiManager, now);
    this.processLooperPlayback(p, now, p.deltaTime, bpm);

    for (const object of this.synthObjects) {
      object.update(now);
    }
    this.synthObjects = this.synthObjects.filter((object) => !object.isDead());
  }

  draw(
    p: p5,
    tex: p5.Graphics,
    midiManager: APCMiniMK2Manager,
    _beat: number,
    _bpm: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
  ): void {
    const addBlend = (midiManager.faderValues[7] ?? 0) >= 0.99;
    tex.push();
    tex.blendMode(addBlend ? p.ADD : p.BLEND);
    const now = p.millis();
    const sortedObjects = [...this.synthObjects].sort((a, b) => a.presetIndex - b.presetIndex);
    for (const object of sortedObjects) {
      object.display(p, tex, now);
    }
    tex.pop();
  }

  resize(_p: p5): void {
    this.synthObjects = [];
  }

  spawnPresetForDebug(p: p5, bpm: number, presetIndex: number): void {
    this.spawnPreset(p, bpm, p.millis(), presetIndex);
  }

  dispose(): void {
    this.synthObjects = [];
  }

  private processPresetTriggers(
    p: p5,
    midiManager: APCMiniMK2Manager,
    beat: number,
    bpm: number,
  ): void {
    const input = midiManager.midiInput;
    const now = p.millis();

    for (let i = 0; i < PRESET_SLOT_COUNT; i++) {
      const key = `synthPreset${i}`;
      const isPressed = input[key] === true;
      if (isPressed && !this.previousPresetPressState[i]) {
        this.spawnPreset(p, bpm, now, i);

        for (const looper of this.loopers) {
          if (looper.getState() === "recording") {
            looper.recordEvent(i, now, beat);
          }
        }
      }
      this.previousPresetPressState[i] = isPressed;
    }
  }

  private processLooperControls(midiManager: APCMiniMK2Manager, currentTime: number): void {
    const input = midiManager.midiInput;

    for (let i = 0; i < LOOPER_COUNT; i++) {
      const stateKey = `looper${i}_record`;
      const clearKey = `looper${i}_clear`;
      const recordState = (input[stateKey] as number | undefined) ?? 0;
      const prevState = this.previousLooperStates[i];

      if (input[clearKey] === true) {
        this.loopers[i].clear();
        this.previousLooperStates[i] = 0;
        midiManager.setButtonValue(stateKey, 0);
        continue;
      }

      if (recordState !== prevState) {
        if (recordState === 1) {
          this.loopers[i].startRecording(currentTime);
        } else if (recordState === 2) {
          this.loopers[i].stopRecordingAndPlay(currentTime);
        } else if (recordState === 0) {
          this.loopers[i].clear();
        }
      }

      this.previousLooperStates[i] = recordState;
    }
  }

  private processLooperPlayback(
    p: p5,
    currentTime: number,
    deltaTime: number,
    bpm: number,
  ): void {
    for (const looper of this.loopers) {
      if (looper.getState() !== "playing") {
        continue;
      }

      const triggeredPresetIndexes = looper.getEventsToPlay(currentTime, deltaTime);
      for (const presetIndex of triggeredPresetIndexes) {
        this.spawnPreset(p, bpm, currentTime, presetIndex);
      }
    }
  }

  private spawnPreset(p: p5, bpm: number, startTime: number, presetIndex: number): void {
    if (PRESETS.length === 0) {
      return;
    }

    const boundedIndex = ((presetIndex % PRESETS.length) + PRESETS.length) % PRESETS.length;
    const objects = PRESETS[boundedIndex](p, bpm, startTime);
    for (const object of objects) {
      this.synthObjects.push(object);
    }

    while (this.synthObjects.length > SynthLayer.MAX_OBJECTS) {
      this.synthObjects.shift();
    }
  }
}
