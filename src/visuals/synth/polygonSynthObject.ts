import p5 from "p5";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { BaseSynthObject } from "./baseSynthObject";
import type { SynthObjectConfig } from "./synthTypes";

interface PolygonConfig extends SynthObjectConfig {
  polygon?: {
    sides?: number;
    irregularity?: number;
    spikiness?: number;
    vertexLFO?: boolean;
    vertexLFORate?: number;
    vertexLFODepth?: number;
  };
}

interface Vertex {
  angle: number;
  radiusFactor: number;
}

export class PolygonSynthObject extends BaseSynthObject {
  private readonly sides: number;
  private readonly irregularity: number;
  private readonly spikiness: number;
  private readonly vertexLFO: boolean;
  private readonly vertexLFORate: number;
  private readonly vertexLFODepth: number;
  private readonly vertices: Vertex[];

  constructor(config: PolygonConfig) {
    super(config);
    this.sides = Math.max(3, Math.floor(config.polygon?.sides ?? 6));
    this.irregularity = Math.min(1, Math.max(0, config.polygon?.irregularity ?? 0));
    this.spikiness = Math.min(1, Math.max(0, config.polygon?.spikiness ?? 0));
    this.vertexLFO = config.polygon?.vertexLFO ?? false;
    this.vertexLFORate = config.polygon?.vertexLFORate ?? 0;
    this.vertexLFODepth = config.polygon?.vertexLFODepth ?? 0;
    this.vertices = this.generateVertices();
  }

  display(p: p5, tex: p5.Graphics, currentTime: number): void {
    if (this.isDead()) {
      return;
    }

    const size = this.calculateUniformSize(currentTime);
    const elapsed = Math.max(0, currentTime - this.startTime);

    this.setupDrawing(tex);
    tex.beginShape();
    this.vertices.forEach((vertex, index) => {
      let radius = size * vertex.radiusFactor;
      if (this.vertexLFO && this.vertexLFORate > 0 && this.vertexLFODepth > 0) {
        const phase = (elapsed / (60000 / this.bpm)) * this.vertexLFORate * Math.PI * 2 + index;
        radius += Math.sin(phase) * (size * this.vertexLFODepth);
      }
      const x = Math.cos(vertex.angle) * radius;
      const y = Math.sin(vertex.angle) * radius;
      tex.vertex(x, y);
    });
    tex.endShape(p.CLOSE);
    this.finishDrawing(tex);
  }

  private generateVertices(): Vertex[] {
    const vertices: Vertex[] = [];
    for (let i = 0; i < this.sides; i++) {
      const baseAngle = (i / this.sides) * Math.PI * 2;
      const irregularOffset =
        (UniformRandom.rand(this.startTime, i, this.baseSize) * 2 - 1) *
        (Math.PI / this.sides) *
        this.irregularity;
      const angle = baseAngle + irregularOffset;

      let radiusFactor = 1;
      if (this.spikiness > 0 && i % 2 === 1) {
        radiusFactor = 1 - this.spikiness * 0.6;
      }
      vertices.push({ angle, radiusFactor });
    }
    return vertices;
  }
}
