import { Point } from "../types/Point";
import { KeyboardMap } from "../utils/keyboardMap";
import { Actor, IActor } from "./Actor";

export class Map extends Actor implements IActor{
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		const background = new Image();
		background.src = "../assets/scenario.jpg";
		ctx.drawImage(background, this.position.x, this.position.y, 1020, 1024);
	}
	update() {}
  keyboard_event() {}
}


/* export class Map extends Actor implements IActor{
	background: any
	constructor(position: Point){
		super(position)
		this.background = new Image();
		this.background.src = "../assets/scenario.jpg";
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.background, this.position.x, this.position.y, 1020, 1024);
	}
	update() {}
  keyboard_event() {}
}
*/