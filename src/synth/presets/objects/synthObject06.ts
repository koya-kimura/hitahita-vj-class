import p5 from "p5";
import type { BaseSynthObject } from "../../object";
import { createSynthObject } from "./factory";

export const synthObject06 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return createSynthObject(6, p, bpm, startTime);
};
