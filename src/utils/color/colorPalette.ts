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

export const COLOR_PALETTES: ColorPalette[] = [
  // 1. 赤メイン × 青サブ × 黄アクセント（トリコロール）
  { mainColor: "#0f162fff", subColor: "#10fa1bff", accentColor: "#e2debcff" },

  // 2. オレンジメイン × 紫サブ × シアンアクセント
  { mainColor: "#eb2929ff", subColor: "#2626daff", accentColor: "#f3f320ff" },

  // 3. ピンクメイン × 緑サブ × 黄アクセント
  { mainColor: "#ff2970ff", subColor: "#13c31cff", accentColor: "#13abcaff" },

  // 4. 青メイン × オレンジサブ × ライムアクセント
  { mainColor: "#1060ebff", subColor: "#fde424ff", accentColor: "#f70becff" },

  // 5. 紫メイン × 黄緑サブ × オレンジアクセントs
  { mainColor: "#9C27B0", subColor: "#8BC34A", accentColor: "#FF9800" },

  // 6. ティールメイン × 赤サブ × 黄アクセント
  { mainColor: "#00897B", subColor: "#D32F2F", accentColor: "#FFD600" },

  // 7. インディゴメイン × ピンクサブ × シアンアクセント
  { mainColor: "#3949AB", subColor: "#F06292", accentColor: "#00E5FF" },
];

/**
 * インデックスでパレットを取得
 */
export const getPalette = (index: number): ColorPalette => {
  return COLOR_PALETTES[index % COLOR_PALETTES.length];
};

export const ROLE_COLOR_PALETTE = {
  base: "#0f162f",
  main: "#13abcaff",
  sub1: "#1060ebff",
  sub2: "#eb2929ff",
  sub3: "#10fa1bff",
  accent1: "#f3f320ff",
  accent2: "#ff2970ff",
  line: "#e2debcff",
} as const;

export type RoleColorKey = keyof typeof ROLE_COLOR_PALETTE;

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
  alpha = 255,
): void => {
  const { r, g, b } = getRoleColorRgb(key);
  target.stroke(r, g, b, alpha);
};

export const applyRoleFill = (
  target: p5 | p5.Graphics,
  key: RoleColorKey,
  alpha = 255,
): void => {
  const { r, g, b } = getRoleColorRgb(key);
  target.fill(r, g, b, alpha);
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
