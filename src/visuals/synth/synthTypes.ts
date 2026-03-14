import type { RoleColorKey, SynthColorKey } from "../../utils/color/colorPalette";
import { CORE_ROLE_COLOR_KEYS, getRoleColorHSB, getSynthColorHSB } from "../../utils/color/colorPalette";

export type Waveform = "sine" | "saw" | "square" | "noise";
export type LfoType = "sine" | "triangle" | "saw" | "square" | "noise";
export type EasingFunction =
  | "linear"
  | "easeInSine"
  | "easeOutSine"
  | "easeInExpo"
  | "easeOutExpo"
  | "easeInOutExpo"
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
  roleColor?: RoleColorKey;
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

const HUE_CANDIDATES: Array<{ key: RoleColorKey; hue: number }> = CORE_ROLE_COLOR_KEYS.map((key) => ({
  key,
  hue: getRoleColorHSB(key).hue,
}));

const circularHueDistance = (a: number, b: number): number => {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
};

const pickNearestRoleColorByHue = (hue: number): RoleColorKey => {
  let nearest = HUE_CANDIDATES[0];
  let bestDistance = circularHueDistance(hue, nearest.hue);

  for (let i = 1; i < HUE_CANDIDATES.length; i++) {
    const candidate = HUE_CANDIDATES[i];
    const distance = circularHueDistance(hue, candidate.hue);
    if (distance < bestDistance) {
      nearest = candidate;
      bestDistance = distance;
    }
  }

  return nearest.key;
};

export const resolveSynthParams = (params?: SynthParams): ResolvedSynthParams => {
  const color = params?.colorParams;
  const fallbackHue = color?.hue ?? getRoleColorHSB("main").hue;
  const fallbackRole = pickNearestRoleColorByHue(fallbackHue);

  const resolvedColor = color?.roleColor
    ? getRoleColorHSB(color.roleColor)
    : color?.paletteColor
      ? getSynthColorHSB(color.paletteColor)
      : getRoleColorHSB(fallbackRole);

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
