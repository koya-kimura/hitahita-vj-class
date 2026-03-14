import p5 from "p5";

/**
 * カラーパレット定義
 * mainColor: メインカラー（ベース）
 * subColor: サブカラー（補色系）
 * accentColor: アクセントカラー（目立つ色）
 */

export interface ColorPalette {
  mainColor: string;
  subColor: string;
  accentColor: string;
}

const FIVE_COLOR_HEX = {
  base: "#4e64b6",
  main: "#4eb699",
  sub1: "#95b64e",
  accent1: "#b159ae",
  accent2: "#4e64b6",
} as const;

export const COLOR_PALETTES: ColorPalette[] = [
  { mainColor: FIVE_COLOR_HEX.main, subColor: FIVE_COLOR_HEX.sub1, accentColor: FIVE_COLOR_HEX.accent1 },
  { mainColor: FIVE_COLOR_HEX.accent2, subColor: FIVE_COLOR_HEX.sub1, accentColor: FIVE_COLOR_HEX.main },
  { mainColor: FIVE_COLOR_HEX.sub1, subColor: FIVE_COLOR_HEX.main, accentColor: FIVE_COLOR_HEX.accent2 },
  { mainColor: FIVE_COLOR_HEX.base, subColor: FIVE_COLOR_HEX.main, accentColor: FIVE_COLOR_HEX.accent1 },
  { mainColor: FIVE_COLOR_HEX.main, subColor: FIVE_COLOR_HEX.accent2, accentColor: FIVE_COLOR_HEX.accent1 },
];

/**
 * インデックスでパレットを取得
 */
export const getPalette = (index: number): ColorPalette => {
  return COLOR_PALETTES[index % COLOR_PALETTES.length];
};

export const ROLE_COLOR_PALETTE = {
  base: FIVE_COLOR_HEX.base,
  main: FIVE_COLOR_HEX.main,
  sub1: FIVE_COLOR_HEX.sub1,
  sub2: FIVE_COLOR_HEX.accent2,
  sub3: FIVE_COLOR_HEX.main,
  accent1: FIVE_COLOR_HEX.accent1,
  accent2: FIVE_COLOR_HEX.accent2,
  line: FIVE_COLOR_HEX.accent1,
} as const;

export type RoleColorKey = keyof typeof ROLE_COLOR_PALETTE;
export const CORE_ROLE_COLOR_KEYS = ["base", "main", "sub1", "accent1", "accent2"] as const;

export const getRoleColorHex = (key: RoleColorKey): string => {
  return ROLE_COLOR_PALETTE[key];
};

export const getRoleColorHSB = (
  key: RoleColorKey,
): { hue: number; saturation: number; brightness: number } => {
  return hexToHsb(ROLE_COLOR_PALETTE[key]);
};

export const getRoleColorRgb = (key: RoleColorKey): { r: number; g: number; b: number } => {
  const normalized = ROLE_COLOR_PALETTE[key].replace("#", "").slice(0, 6);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

export const applyRoleStroke = (
  target: p5 | p5.Graphics,
  key: RoleColorKey,
  _alpha = 255,
): void => {
  const { r, g, b } = getRoleColorRgb(key);
  target.stroke(r, g, b, 255);
};

export const applyRoleFill = (
  target: p5 | p5.Graphics,
  key: RoleColorKey,
  _alpha = 255,
): void => {
  const { r, g, b } = getRoleColorRgb(key);
  target.fill(r, g, b, 255);
};

export const SYNTH_COLORS = {
  RED: ROLE_COLOR_PALETTE.sub2,
  RED_PURPLE: ROLE_COLOR_PALETTE.accent2,
  ORANGE: ROLE_COLOR_PALETTE.accent1,
  YELLOW: ROLE_COLOR_PALETTE.line,
  GREEN: ROLE_COLOR_PALETTE.sub3,
  LIGHT_BLUE: ROLE_COLOR_PALETTE.main,
  BLUE: ROLE_COLOR_PALETTE.sub1,
  DARK_BLUE: ROLE_COLOR_PALETTE.base,
  PINK: ROLE_COLOR_PALETTE.accent2,
  PURPLE: ROLE_COLOR_PALETTE.sub1,
  BROWN: ROLE_COLOR_PALETTE.line,
} as const;

export type SynthColorKey = keyof typeof SYNTH_COLORS;

export const getSynthColorHSB = (
  key: SynthColorKey,
): { hue: number; saturation: number; brightness: number } => {
  const hex = SYNTH_COLORS[key];
  return hexToHsb(hex);
};

const hexToHsb = (hex: string): { hue: number; saturation: number; brightness: number } => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }

  const saturation = max === 0 ? 0 : (delta / max) * 100;
  const brightness = max * 100;

  return { hue, saturation, brightness };
};
