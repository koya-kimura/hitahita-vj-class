/**
 * MIDI設定ファイル
 * APC Mini MK2のボタン・セルの設定を定義します。
 */
import type { ButtonConfig, FaderButtonMode } from "../../types";
import { LED_PALETTE } from "./ledPalette";

// ========================================
// ボタン設定
// ========================================

/**
 * グリッドボタンの設定
 * 必要に応じてページ・行・列を指定してボタンを登録してください。
 */
export const MIDI_BUTTON_CONFIGS: ButtonConfig[] = [
  ...Array.from({ length: 16 }, (_, index): ButtonConfig => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return {
      key: `synthPreset${index}`,
      type: "momentary",
      cells: [{ page: 0, row, col }],
      activeColor: LED_PALETTE.GREEN,
      inactiveColor: LED_PALETTE.DIM,
    };
  }),
  ...Array.from({ length: 4 }, (_, index): ButtonConfig => ({
    key: `looper${index}_record`,
    type: "multistate",
    // 下段 8 ボタンの上段（7行目）: 左から4つ (col 0-3)
    cells: [{ page: 0, row: 6, col: index }],
    stateCount: 3,
    stateColors: [LED_PALETTE.CYAN, LED_PALETTE.RED, LED_PALETTE.GREEN],
    defaultValue: 0,
  })),
  ...Array.from({ length: 4 }, (_, index): ButtonConfig => ({
    key: `looper${index}_clear`,
    type: "oneshot",
    // 下段 8 ボタンの下段（8行目）: 左から4つ (col 0-3)
    cells: [{ page: 0, row: 7, col: index }],
    activeColor: LED_PALETTE.ORANGE,
    inactiveColor: LED_PALETTE.DIM,
    defaultValue: false,
  })),
  {
    key: "imageLayerSelect",
    type: "radio",
    cells: Array.from({ length: 16 }, (_, index) => ({
      page: 0,
      row: Math.floor(index / 4),
      col: 4 + (index % 4),
    })),
    activeColor: LED_PALETTE.PINK,
    inactiveColor: LED_PALETTE.DIM,
    defaultValue: 0,
  },
  {
    key: "uiSelect",
    type: "radio",
    cells: Array.from({ length: 8 }, (_, index) => ({
      page: 0,
      row: 4 + Math.floor(index / 4),
      col: index % 4,
    })),
    activeColor: LED_PALETTE.YELLOW,
    inactiveColor: LED_PALETTE.DIM,
    defaultValue: 0,
  },
  {
    key: "simpleLayerSelect",
    type: "radio",
    cells: Array.from({ length: 16 }, (_, index) => ({
      page: 0,
      row: 4 + Math.floor(index / 4),
      col: 4 + (index % 4),
    })),
    activeColor: LED_PALETTE.PURPLE,
    inactiveColor: LED_PALETTE.DIM,
    defaultValue: 0,
  },
];

// ========================================
// フェーダーボタンモード設定
// ========================================

/**
 * フェーダーボタンのモード
 * - "mute": フェーダーボタンON時、フェーダー値を0にミュート
 * - "random": フェーダーボタンON時、フェーダー値をBPM同期でランダムに0/1切り替え
 */
export const FADER_BUTTON_MODE: FaderButtonMode = "random";

// ========================================
// デフォルト値設定
// MIDI接続なしで使用する場合の初期値
// ========================================

/**
 * フェーダーのデフォルト値（9本分: 0-7 + マスター）
 * 値は0.0～1.0の範囲
 */
export const DEFAULT_FADER_VALUES: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * フェーダーボタンのデフォルトトグル状態（9本分）
 * true = ON（ミュートまたはランダム有効）
 */
export const DEFAULT_FADER_BUTTON_TOGGLE_STATE: boolean[] = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

/**
 * サイドボタン（ページ選択）のデフォルトインデックス
 * 0-7の範囲（ページ0～7）
 */
export const DEFAULT_PAGE_INDEX: number = 0;
