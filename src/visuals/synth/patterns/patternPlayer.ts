import type { Pattern } from "./patternTypes";

const LOOP_BEATS = 8;
const BEAT_TOLERANCE = 0.01;

export class PatternPlayer {
  private readonly pattern: Pattern;
  private previousBeat: number | undefined;

  constructor(pattern: Pattern) {
    this.pattern = pattern;
    this.previousBeat = undefined;
  }

  reset(): void {
    this.previousBeat = undefined;
  }

  update(currentBeat: number): number[] {
    if (this.previousBeat === undefined) {
      this.previousBeat = currentBeat;
      return [];
    }

    const triggered: number[] = [];
    const start = this.previousBeat;
    const end = currentBeat;

    if (end < start) {
      this.previousBeat = end;
      return triggered;
    }

    const startCycle = Math.floor(start / LOOP_BEATS);
    const endCycle = Math.floor(end / LOOP_BEATS);

    for (let cycle = startCycle; cycle <= endCycle; cycle++) {
      for (const event of this.pattern.events) {
        const absoluteBeat = cycle * LOOP_BEATS + event.beat;
        if (absoluteBeat > start + BEAT_TOLERANCE && absoluteBeat <= end + BEAT_TOLERANCE) {
          triggered.push(event.presetIndex);
        }
      }
    }

    this.previousBeat = end;
    return triggered;
  }
}
