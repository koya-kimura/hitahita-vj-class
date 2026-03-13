import p5 from "p5";
import type { BaseSynthObject } from "../object";
import { preset01 } from "./preset01";
import { preset02 } from "./preset02";
import { preset03 } from "./preset03";
import { preset04 } from "./preset04";
import { preset05 } from "./preset05";
import { preset06 } from "./preset06";
import { preset07 } from "./preset07";
import { preset08 } from "./preset08";
import { preset09 } from "./preset09";
import { preset10 } from "./preset10";
import { preset11 } from "./preset11";
import { preset12 } from "./preset12";
import { preset13 } from "./preset13";
import { preset14 } from "./preset14";
import { preset15 } from "./preset15";
import { preset16 } from "./preset16";

export type PresetFunction = (p: p5, bpm: number, startTime: number) => BaseSynthObject[];

const PRESET_ENTRIES: Array<{ name: string; fn: PresetFunction }> = [
  { name: "preset01", fn: preset01 },
  { name: "preset02", fn: preset02 },
  { name: "preset03", fn: preset03 },
  { name: "preset04", fn: preset04 },
  { name: "preset05", fn: preset05 },
  { name: "preset06", fn: preset06 },
  { name: "preset07", fn: preset07 },
  { name: "preset08", fn: preset08 },
  { name: "preset09", fn: preset09 },
  { name: "preset10", fn: preset10 },
  { name: "preset11", fn: preset11 },
  { name: "preset12", fn: preset12 },
  { name: "preset13", fn: preset13 },
  { name: "preset14", fn: preset14 },
  { name: "preset15", fn: preset15 },
  { name: "preset16", fn: preset16 },
];

export const PRESETS: PresetFunction[] = PRESET_ENTRIES.map((entry) => entry.fn);

export const getPresetIndex = (name: string): number => {
  const index = PRESET_ENTRIES.findIndex((entry) => entry.name === name);
  if (index === -1) {
    console.warn(`Preset \"${name}\" not found, defaulting to 0`);
    return 0;
  }
  return index;
};
