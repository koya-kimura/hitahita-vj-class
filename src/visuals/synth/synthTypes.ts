import type { SynthColorKey } from "../../utils/color/colorPalette";
import { getSynthColorHSB } from "../../utils/color/colorPalette";

export type Waveform = "sine" | "saw" | "square" | "noise";
export type LfoType = "sine" | "triangle" | "saw" | "square" | "noise";
export type EasingFunction =
  | "linear"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeOutBack"
  | "easeInOutSine";

export interface ColorParams {
  hue?: number;
  saturation?: number;
  brightness?: number;
  paletteColor?: SynthColorKey;
}

export interface SynthParams {
  attackTime?: number;
  decayTime?: number;
  sustainLevel?: number;
  releaseTime?: number;
  waveform?: Waveform;
  lfoType?: LfoType;
  lfoRate?: number;
  lfoDepth?: number;
  colorParams?: ColorParams;
}

export interface MovementParams {
  angle: number;
  distance: number;
  angleLFO?: boolean;
  angleLFORate?: number;
  angleLFODepth?: number;
  easing?: EasingFunction;
}

export interface StyleParams {
  mode?: "fill" | "stroke";
  strokeWeight?: number;
}

export interface SynthObjectConfig {
  startTime: number;
  bpm: number;
  x: number;
  y: number;
  size?: number;
  angle?: number;
  params?: SynthParams;
  movement?: MovementParams;
  style?: StyleParams;
  presetIndex?: number;
}

export interface ResolvedColorParams {
  hue: number;
  saturation: number;
  brightness: number;
}

export interface ResolvedSynthParams {
  attackTime: number;
  decayTime: number;
  sustainLevel: number;
  releaseTime: number;
  waveform: Waveform;
  lfoType: LfoType;
  lfoRate: number;
  lfoDepth: number;
  colorParams: ResolvedColorParams;
}

export const beatsToMs = (beats: number, bpm: number): number => {
  return (beats * 60000) / bpm;
};

export const resolveSynthParams = (params?: SynthParams): ResolvedSynthParams => {
  const color = params?.colorParams;

  const resolvedColor = color?.paletteColor
    ? getSynthColorHSB(color.paletteColor)
    : {
        hue: color?.hue ?? 0,
        saturation: color?.saturation ?? 90,
        brightness: color?.brightness ?? 100,
      };

  return {
    attackTime: params?.attackTime ?? 0.1,
    decayTime: params?.decayTime ?? 0,
    sustainLevel: params?.sustainLevel ?? 1,
    releaseTime: params?.releaseTime ?? 0.1,
    waveform: params?.waveform ?? "sine",
    lfoType: params?.lfoType ?? "sine",
    lfoRate: params?.lfoRate ?? 0,
    lfoDepth: params?.lfoDepth ?? 0,
    colorParams: resolvedColor,
  };
};
