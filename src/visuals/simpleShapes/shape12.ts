import type p5 from "p5";
import { easeInCubic, easeOutCubic } from "../../utils/math/easing";
import type { RoleColorKey } from "../../utils/color/colorPalette";
import { fillRole, strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

type ParticleState = "inbound" | "arc" | "outbound";

const SHAPE12_COLOR_ROLES: RoleColorKey[] = [
  "main",
  "sub1",
  "accent2",
  "main",
  "accent1",
  "accent2",
  "accent1",
];

class Shape12Particle {
  private readonly p: p5;
  private angle: number;
  private readonly radiusOuter: number;
  private radiusInner: number;
  private radius: number;
  private state: ParticleState;

  private moveProgress: number;
  private arcProgress: number;
  private arcStartBeat: number;

  private readonly moveDurationInSec: number;
  private readonly moveDurationOutSec: number;
  private readonly weight: number;
  private readonly colorRole: RoleColorKey;

  constructor(
    p: p5,
    width: number,
    height: number,
  ) {
    this.p = p;
    this.radiusOuter = Math.max(width, height) * 0.75;
    this.radiusInner = this.pickInnerRadius(width, height);
    this.angle = p.random(p.TWO_PI);
    this.radius = this.radiusOuter;
    this.state = "inbound";
    this.moveProgress = 0;
    this.arcProgress = 0;
    this.arcStartBeat = 0;

    this.moveDurationInSec = p.random(1.2, 2.4);
    this.moveDurationOutSec = p.random(1.4, 2.8);
    this.weight = p.random(1, 50);
    this.colorRole = p.random(SHAPE12_COLOR_ROLES);
  }

  private pickInnerRadius(width: number, height: number): number {
    const minSide = Math.min(width, height);
    return this.p.random([0.14, 0.25, 0.36]) * minSide;
  }

  private resetCycle(width: number, height: number): void {
    this.angle = this.p.random(this.p.TWO_PI);
    this.radiusInner = this.pickInnerRadius(width, height);
    this.radius = this.radiusOuter;
    this.state = "inbound";
    this.moveProgress = 0;
    this.arcProgress = 0;
    this.arcStartBeat = 0;
  }

  move(dtSec: number, beat: number, width: number, height: number): void {
    if (this.state === "inbound") {
      this.moveProgress = Math.min(1, this.moveProgress + dtSec / this.moveDurationInSec);
      const eased = easeOutCubic(this.moveProgress);
      this.radius = this.p.lerp(this.radiusOuter, this.radiusInner, eased);
      if (this.moveProgress >= 1) {
        this.state = "arc";
        this.arcStartBeat = beat;
      }
      return;
    }

    if (this.state === "arc") {
      // Arc 1周を4ビートで進める。
      this.arcProgress = Math.min(1, Math.max(0, (beat - this.arcStartBeat) / 4));
      if (this.arcProgress >= 1) {
        this.state = "outbound";
        this.moveProgress = 0;
      }
      return;
    }

    this.moveProgress = Math.min(1, this.moveProgress + dtSec / this.moveDurationOutSec);
    const eased = easeInCubic(this.moveProgress);
    this.radius = this.p.lerp(this.radiusInner, this.radiusOuter, eased);
    if (this.moveProgress >= 1) {
      this.resetCycle(width, height);
    }
  }

  draw(pg: p5.Graphics): void {
    const cx = pg.width * 0.5;
    const cy = pg.height * 0.5;
    const x = cx + this.radius * Math.cos(this.angle);
    const y = cy + this.radius * Math.sin(this.angle);

    if (this.state !== "arc") {
      const heading = this.state === "inbound" ? this.angle + this.p.PI : this.angle;
      const size = this.p.map(this.weight, 1, 50, 6, 28);

      pg.push();
      pg.translate(x, y);
      pg.rotate(heading);
      pg.noStroke();
      fillRole(pg, this.colorRole, 235);
      pg.triangle(
        size,
        0,
        -size * 0.65,
        -size * 0.7,
        -size * 0.65,
        size * 0.7,
      );
      pg.pop();
      return;
    }

    pg.noFill();
    pg.strokeCap(this.p.PROJECT);
    pg.strokeWeight(this.weight);
    strokeRole(pg, this.colorRole, 220);

    const arcSweep = this.p.TWO_PI * this.arcProgress;
    pg.arc(
      cx,
      cy,
      this.radius * 2,
      this.radius * 2,
      this.angle,
      this.angle + arcSweep,
    );
  }
}

let shape12Buffer: p5.Graphics | undefined;
let shape12Particles: Shape12Particle[] = [];
let shape12LastMs: number | undefined;

export const drawShape12: SimpleShapeDrawer = (context) => {
  const { p, tex, beat, nowMs } = context;

  if (
    !shape12Buffer ||
    shape12Buffer.width !== tex.width ||
    shape12Buffer.height !== tex.height
  ) {
    shape12Buffer?.remove();
    shape12Buffer = p.createGraphics(tex.width, tex.height);
    shape12Particles = [];
    shape12LastMs = nowMs;
  }

  const dtSec = Math.max(0, Math.min(0.1, (nowMs - (shape12LastMs ?? nowMs)) / 1000));
  shape12LastMs = nowMs;

  const buffer = shape12Buffer;
  buffer.background(0);

  if (p.frameCount % 100 === 0 && shape12Particles.length < 200) {
    shape12Particles.push(new Shape12Particle(p, tex.width, tex.height));
  }

  for (const particle of shape12Particles) {
    particle.move(dtSec, beat, tex.width, tex.height);
    particle.draw(buffer);
  }

  tex.push();
  tex.image(buffer, 0, 0, tex.width, tex.height);
  tex.pop();
};
