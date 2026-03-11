import p5 from "p5";
import type { BaseSynthObject } from "../object";
import { synthObject00 } from "./objects/synthObject00";
import { synthObject01 } from "./objects/synthObject01";
import { synthObject02 } from "./objects/synthObject02";
import { synthObject03 } from "./objects/synthObject03";
import { synthObject04 } from "./objects/synthObject04";
import { synthObject05 } from "./objects/synthObject05";
import { synthObject06 } from "./objects/synthObject06";
import { synthObject07 } from "./objects/synthObject07";
import { synthObject08 } from "./objects/synthObject08";
import { synthObject09 } from "./objects/synthObject09";
import { synthObject10 } from "./objects/synthObject10";
import { synthObject11 } from "./objects/synthObject11";
import { synthObject12 } from "./objects/synthObject12";
import { synthObject13 } from "./objects/synthObject13";
import { synthObject14 } from "./objects/synthObject14";
import { synthObject15 } from "./objects/synthObject15";

export type PresetFunction = (p: p5, bpm: number, startTime: number) => BaseSynthObject[];

const PRESET_ENTRIES: Array<{ name: string; fn: PresetFunction }> = [
  { name: "synthObject00", fn: synthObject00 },
  { name: "synthObject01", fn: synthObject01 },
  { name: "synthObject02", fn: synthObject02 },
  { name: "synthObject03", fn: synthObject03 },
  { name: "synthObject04", fn: synthObject04 },
  { name: "synthObject05", fn: synthObject05 },
  { name: "synthObject06", fn: synthObject06 },
  { name: "synthObject07", fn: synthObject07 },
  { name: "synthObject08", fn: synthObject08 },
  { name: "synthObject09", fn: synthObject09 },
  { name: "synthObject10", fn: synthObject10 },
  { name: "synthObject11", fn: synthObject11 },
  { name: "synthObject12", fn: synthObject12 },
  { name: "synthObject13", fn: synthObject13 },
  { name: "synthObject14", fn: synthObject14 },
  { name: "synthObject15", fn: synthObject15 },
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
