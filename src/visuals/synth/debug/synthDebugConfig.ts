export const SYNTH_DEBUG_KEY_CONFIG = {
  // 本番では false にする。開発時は true にしてキーボードトリガーを有効化する。
  enabled: true,
  triggerKey: "z",
  triggerKeyCode: 90,
  presetIndex: 11,
} as const;

export const shouldTriggerSynthDebugKey = (key: string, keyCode: number): boolean => {
  if (!SYNTH_DEBUG_KEY_CONFIG.enabled) {
    return false;
  }

  const normalizedKey = key.toLowerCase();
  return (
    normalizedKey === SYNTH_DEBUG_KEY_CONFIG.triggerKey ||
    keyCode === SYNTH_DEBUG_KEY_CONFIG.triggerKeyCode
  );
};