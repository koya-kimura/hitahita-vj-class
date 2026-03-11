import p5 from "p5";

export interface SimpleShapeContext {
	p: p5;
	tex: p5.Graphics;
	beat: number;
	nowMs: number;
	width: number;
	height: number;
}

export type SimpleShapeDrawer = (context: SimpleShapeContext) => void;
