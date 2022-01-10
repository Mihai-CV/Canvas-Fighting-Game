import { Point } from "../types/Point";
import { Actor, IActor } from "./Actor";
const esc = require("../../public/assets/scenario.jpg");


export class Map extends Actor {
  Fighter: IActor;
  Fighter2: IActor;
  frameCount: number;
  escMove: number
  ex: number
  constructor(initialPos: Point, Fighter: IActor, Fighter2: IActor){
    super(initialPos);
    this.Fighter = Fighter;
    this.Fighter2 = Fighter2;
    this.frameCount = 0;
    this.escMove = 0;
    this.ex = 150;
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    let figPos = this.Fighter.position.x;
    let figPos2 = this.Fighter2.position.x;
    this.ex = 150 - this.escMove;
    const background = new Image();
    background.src = esc;
    
    if(this.ex >= 1 && this.ex <= 275){
      if (figPos <= 1 || figPos2 <= 1){
        this.escMove = this.frameCount;
        console.log(this.escMove);
        this.frameCount = (this.frameCount + 0.3)
      } 
      if (figPos >= 878 || figPos2 >= 878){
        this.escMove = this.frameCount;
        console.log(this.escMove);
        this.frameCount = (this.frameCount - 0.3)
      }
    }

    ctx.drawImage(background, this.ex, 0, 1020, 1024, this.position.x, this.position.y, 3020, 4700);
  }
  update() {}
  keyboard_event() {}
}
