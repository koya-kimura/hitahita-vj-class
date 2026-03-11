export interface PatternEvent {
  beat: number;
  presetIndex: number;
}

export interface Pattern {
  name: string;
  events: PatternEvent[];
}
