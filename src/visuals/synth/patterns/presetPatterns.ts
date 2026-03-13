import { getPresetIndex } from "../presets";
import type { Pattern } from "./patternTypes";

export const PRESET_PATTERNS: Pattern[] = [
  {
    name: "basic",
    events: [
      { beat: 0, presetIndex: getPresetIndex("preset01") },
      { beat: 1, presetIndex: getPresetIndex("preset03") },
      { beat: 2, presetIndex: getPresetIndex("preset02") },
      { beat: 3, presetIndex: getPresetIndex("preset03") },
      { beat: 4, presetIndex: getPresetIndex("preset01") },
      { beat: 5, presetIndex: getPresetIndex("preset03") },
      { beat: 6, presetIndex: getPresetIndex("preset02") },
      { beat: 7, presetIndex: getPresetIndex("preset03") },
    ],
  },
  {
    name: "polygon-drive",
    events: [
      { beat: 0, presetIndex: getPresetIndex("preset04") },
      { beat: 2, presetIndex: getPresetIndex("preset01") },
      { beat: 4, presetIndex: getPresetIndex("preset10") },
      { beat: 6, presetIndex: getPresetIndex("preset06") },
    ],
  },
  {
    name: "burst-fill",
    events: [
      { beat: 0, presetIndex: getPresetIndex("preset07") },
      { beat: 2, presetIndex: getPresetIndex("preset09") },
      { beat: 4, presetIndex: getPresetIndex("preset13") },
      { beat: 6, presetIndex: getPresetIndex("preset15") },
    ],
  },
];
