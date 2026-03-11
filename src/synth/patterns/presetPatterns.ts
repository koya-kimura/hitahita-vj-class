import { getPresetIndex } from "../presets";
import type { Pattern } from "./patternTypes";

export const PRESET_PATTERNS: Pattern[] = [
  {
    name: "basic",
    events: [
      { beat: 0, presetIndex: getPresetIndex("kickPulse") },
      { beat: 1, presetIndex: getPresetIndex("hatScatter") },
      { beat: 2, presetIndex: getPresetIndex("snareSweep") },
      { beat: 3, presetIndex: getPresetIndex("hatScatter") },
      { beat: 4, presetIndex: getPresetIndex("kickPulse") },
      { beat: 5, presetIndex: getPresetIndex("hatScatter") },
      { beat: 6, presetIndex: getPresetIndex("snareSweep") },
      { beat: 7, presetIndex: getPresetIndex("hatScatter") },
    ],
  },
  {
    name: "polygon-drive",
    events: [
      { beat: 0, presetIndex: getPresetIndex("bassPolygon") },
      { beat: 2, presetIndex: getPresetIndex("kickPulse") },
      { beat: 4, presetIndex: getPresetIndex("bassPolygon") },
      { beat: 6, presetIndex: getPresetIndex("snareSweep") },
    ],
  },
  {
    name: "burst-fill",
    events: [
      { beat: 0, presetIndex: getPresetIndex("fxBurst") },
      { beat: 2, presetIndex: getPresetIndex("hatScatter") },
      { beat: 4, presetIndex: getPresetIndex("fxBurst") },
      { beat: 6, presetIndex: getPresetIndex("hatScatter") },
    ],
  },
];
