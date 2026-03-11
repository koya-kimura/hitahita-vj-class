import p5 from "p5";
import type { BaseSynthObject } from "../../object";
import { createSynthObject } from "./factory";

export const synthObject15 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return createSynthObject(15, p, bpm, startTime);
};
