import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { LifeM } from "./LifeManager";
const vs = require("../../public/assets/vs3.png");

export class Life extends Actor {
	vs: HTMLImageElement
	constructor(initialPos: Point){
		super(initialPos)
		this.vs = new Image();
		this.vs.src = vs;
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let lifeKen = LifeM.totalLifeKen;
		let lifeRyu = LifeM.totalLifeRyu;
		console.log(lifeKen);
		if(lifeKen <= 0){
			LifeM.win = true;

			ctx.font = "bold 70px Verdana";
			ctx.fillStyle = "orange";
			ctx.fillText("RYU WINS", 310 , 250);
			ctx.strokeText("RYU WINS", 310 , 250)
		}
		if(lifeRyu <= 0){
			LifeM.winKen = true;

			ctx.font = "bold 70px Verdana";
			ctx.fillStyle = "orange";
			ctx.fillText("KEN WINS", 310 , 250);
			ctx.strokeText("KEN WINS", 310 , 250)
		}

		ctx.font = "bold 30px Verdana";
		ctx.fillStyle = "orange";
		ctx.fillText("RYU", 92 , 120);
		ctx.strokeText("RYU", 92 , 120)

		ctx.font = "bold 30px Verdana";
		ctx.fillStyle = "orange";
		ctx.fillText("KEN", 860 , 120);
		ctx.strokeText("KEN", 860 , 120)

		ctx.drawImage(this.vs, 481, 30, 55, 60)

		ctx.fillStyle = "red";
		ctx.fillRect(530, 40, 400, 40);
		if(lifeKen > 0 ){
			ctx.fillStyle = "yellow";
			ctx.fillRect(530, 40, lifeKen, 40);
		}

		ctx.translate(90 + 400/2, 0);
		ctx.scale(-1, 1);
		ctx.translate(-(90 + 400/2), 0);

		ctx.fillStyle = "red";
		ctx.fillRect(90, 40, 400, 40);
		if(lifeRyu > 0){
			ctx.fillStyle = "yellow";
			ctx.fillRect(90, 40, lifeRyu, 40);
		}
		


	}
	update() {}
	keyboard_event() {}
}
