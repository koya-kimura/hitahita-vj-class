export type LooperState = "idle" | "recording" | "playing";

interface LooperEvent {
  presetIndex: number;
  timestamp: number;
  beat: number;
}

export class Looper {
  private state: LooperState;
  private recordStartTime: number;
  private loopStartTime: number;
  private loopDuration: number;
  private events: LooperEvent[];

  constructor() {
    this.state = "idle";
    this.recordStartTime = 0;
    this.loopStartTime = 0;
    this.loopDuration = 0;
    this.events = [];
  }

  getState(): LooperState {
    return this.state;
  }

  startRecording(currentTime: number): void {
    this.state = "recording";
    this.recordStartTime = currentTime;
    this.events = [];
    this.loopDuration = 0;
  }

  stopRecordingAndPlay(currentTime: number): void {
    if (this.state !== "recording") {
      return;
    }

    this.loopDuration = Math.max(currentTime - this.recordStartTime, 1);
    this.loopStartTime = currentTime;
    this.state = "playing";
  }

  recordEvent(presetIndex: number, currentTime: number, beat: number): void {
    if (this.state !== "recording") {
      return;
    }
    this.events.push({
      presetIndex,
      timestamp: currentTime - this.recordStartTime,
      beat,
    });
  }

  getEventsToPlay(currentTime: number, deltaTime: number): number[] {
    if (this.state !== "playing" || this.events.length === 0 || this.loopDuration <= 0) {
      return [];
    }

    const elapsed = currentTime - this.loopStartTime;
    const loopPosition = ((elapsed % this.loopDuration) + this.loopDuration) % this.loopDuration;
    let previousPosition = loopPosition - deltaTime;
    while (previousPosition < 0) {
      previousPosition += this.loopDuration;
    }

    const presetIndexes: number[] = [];
    const wrapped = previousPosition > loopPosition;

    for (const event of this.events) {
      if (!wrapped) {
        if (event.timestamp > previousPosition && event.timestamp <= loopPosition) {
          presetIndexes.push(event.presetIndex);
        }
      } else if (event.timestamp > previousPosition || event.timestamp <= loopPosition) {
        presetIndexes.push(event.presetIndex);
      }
    }

    return presetIndexes;
  }

  clear(): void {
    this.state = "idle";
    this.events = [];
    this.loopDuration = 0;
    this.recordStartTime = 0;
    this.loopStartTime = 0;
  }
}
