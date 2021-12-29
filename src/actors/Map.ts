import { Actor, IActor } from "./Actor";
const esc = require("../assets/scenario.jpg")

export class Map extends Actor implements IActor {
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    const background = new Image();
    background.src = esc;
    ctx.drawImage(background, 150, 0, 1020, 1024, this.position.x, this.position.y, 3020, 4700);
  }
  update() {}
  keyboard_event() {}
}
