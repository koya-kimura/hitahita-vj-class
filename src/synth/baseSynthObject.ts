import p5 from "p5";
import * as easing from "../utils/math/easing";
import { clamp } from "../utils/math/mathUtils";
import { UniformRandom } from "../utils/math/uniformRandom";
import type {
  EasingFunction,
  MovementParams,
  ResolvedSynthParams,
  StyleParams,
  SynthObjectConfig,
} from "./synthTypes";
import { beatsToMs, resolveSynthParams } from "./synthTypes";

const EASING_TABLE: Record<EasingFunction, (x: number) => number> = {
  linear: easing.linear,
  easeInQuad: easing.easeInQuad,
  easeOutQuad: easing.easeOutQuad,
  easeInOutQuad: easing.easeInOutQuad,
  easeInCubic: easing.easeInCubic,
  easeOutCubic: easing.easeOutCubic,
  easeInOutCubic: easing.easeInOutCubic,
  easeOutBack: easing.easeOutBack,
  easeInOutSine: easing.easeInOutSine,
};

export abstract class BaseSynthObject {
  protected readonly startTime: number;
  protected readonly bpm: number;
  protected readonly baseX: number;
  protected readonly baseY: number;
  protected readonly baseSize: number;
  protected readonly angle: number;
  protected readonly params: ResolvedSynthParams;
  protected readonly movement?: MovementParams;
  protected readonly style: StyleParams;
  public readonly presetIndex: number;

  protected currentLevel: number;
  protected currentX: number;
  protected currentY: number;
  protected dead: boolean;

  protected constructor(config: SynthObjectConfig) {
    this.startTime = config.startTime;
    this.bpm = config.bpm;
    this.baseX = config.x;
    this.baseY = config.y;
    this.baseSize = config.size ?? 50;
    this.angle = config.angle ?? 0;
    this.params = resolveSynthParams(config.params);
    this.movement = config.movement;
    this.style = config.style ?? { mode: "fill", strokeWeight: 1 };
    this.presetIndex = config.presetIndex ?? 0;

    this.currentLevel = 0;
    this.currentX = this.baseX;
    this.currentY = this.baseY;
    this.dead = false;
  }

  update(currentTime: number): void {
    const elapsedMs = currentTime - this.startTime;
    if (elapsedMs < 0) {
      return;
    }

    const totalLifetimeMs = this.getTotalLifetimeMs();
    this.currentLevel = this.getEnvelopeLevel(elapsedMs);

    if (this.movement) {
      const progress = totalLifetimeMs <= 0 ? 1 : clamp(elapsedMs / totalLifetimeMs, 0, 1);
      const eased = this.applyEasing(progress, this.movement.easing ?? "linear");
      const distance = this.movement.distance * eased;

      const phase = (elapsedMs / beatsToMs(1, this.bpm)) * Math.PI * 2;
      const angleOffset =
        this.movement.angleLFO && this.movement.angleLFORate
          ? Math.sin(phase * this.movement.angleLFORate) * (this.movement.angleLFODepth ?? 0)
          : 0;
      const resolvedAngle = this.movement.angle + angleOffset;

      this.currentX = this.baseX + Math.cos(resolvedAngle) * distance;
      this.currentY = this.baseY + Math.sin(resolvedAngle) * distance;
    }

    this.dead = elapsedMs > totalLifetimeMs;
  }

  isDead(): boolean {
    return this.dead;
  }

  protected calculateUniformSize(currentTime: number): number {
    const elapsedMs = Math.max(0, currentTime - this.startTime);
    const lfo = this.getLfoValue(elapsedMs);
    return Math.max(0, this.baseSize * this.currentLevel + lfo);
  }

  protected setupDrawing(tex: p5.Graphics): void {
    const { hue, saturation, brightness } = this.params.colorParams;
    const alpha = clamp(this.currentLevel, 0, 1) * 100;

    tex.push();
    tex.colorMode(tex.HSB, 360, 100, 100, 100);
    tex.translate(this.currentX, this.currentY);
    tex.rotate(this.angle);
    tex.strokeWeight(this.style.strokeWeight ?? 1);

    if (this.style.mode === "stroke") {
      tex.noFill();
      tex.stroke(hue, saturation, brightness, alpha);
    } else {
      tex.noStroke();
      tex.fill(hue, saturation, brightness, alpha);
    }
  }

  protected finishDrawing(tex: p5.Graphics): void {
    tex.pop();
  }

  private getEnvelopeLevel(elapsedMs: number): number {
    const attackMs = beatsToMs(this.params.attackTime, this.bpm);
    const decayMs = beatsToMs(this.params.decayTime, this.bpm);
    const releaseMs = beatsToMs(this.params.releaseTime, this.bpm);

    if (attackMs > 0 && elapsedMs <= attackMs) {
      return elapsedMs / attackMs;
    }

    const decayStart = attackMs;
    const decayEnd = decayStart + decayMs;
    if (decayMs > 0 && elapsedMs <= decayEnd) {
      const t = (elapsedMs - decayStart) / decayMs;
      return 1 + (this.params.sustainLevel - 1) * t;
    }

    const releaseStart = decayEnd;
    const releaseEnd = releaseStart + releaseMs;
    if (releaseMs > 0 && elapsedMs <= releaseEnd) {
      const t = (elapsedMs - releaseStart) / releaseMs;
      return this.params.sustainLevel * (1 - t);
    }

    return 0;
  }

  private getLfoValue(elapsedMs: number): number {
    if (this.params.lfoRate <= 0 || this.params.lfoDepth <= 0) {
      return 0;
    }

    const phase = (elapsedMs / beatsToMs(1, this.bpm)) * this.params.lfoRate;
    const amplitude = this.baseSize * this.params.lfoDepth;

    switch (this.params.lfoType) {
      case "triangle": {
        const tri = 2 * Math.abs(2 * (phase - Math.floor(phase + 0.5))) - 1;
        return tri * amplitude;
      }
      case "saw": {
        const saw = 2 * (phase - Math.floor(phase)) - 1;
        return saw * amplitude;
      }
      case "square":
        return (Math.sin(phase * Math.PI * 2) >= 0 ? 1 : -1) * amplitude;
      case "noise": {
        const n = UniformRandom.rand(Math.floor(phase * 1024), this.startTime, this.baseSize);
        return (n * 2 - 1) * amplitude;
      }
      case "sine":
      default:
        return Math.sin(phase * Math.PI * 2) * amplitude;
    }
  }

  private getTotalLifetimeMs(): number {
    return beatsToMs(this.params.attackTime + this.params.decayTime + this.params.releaseTime, this.bpm);
  }

  private applyEasing(value: number, easingName: EasingFunction): number {
    const easingFn = EASING_TABLE[easingName] ?? easing.linear;
    return easingFn(clamp(value, 0, 1));
  }

  abstract display(p: p5, tex: p5.Graphics, currentTime: number): void;
}
