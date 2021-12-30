import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { FigKey, KeyboardMap } from "../utils/keyboardMap";
const sprite = require("../../public/assets/Ryu_sprite_sheet-removebg.png");


type Size = { w: number; h: number };

export class Fighter extends Actor implements IActor {
  figSize: Size;
  keyboardMap: KeyboardMap;
  speed: Point;
  maxSpeed: number;
  jumping: boolean;
  ryuSprite: HTMLImageElement;
  frameCount:number;
  move: string;
  constructor(
    initialPos: Point,
    keyboardMap: KeyboardMap,
    size: Size = { w: 160, h: 390 }
  ) {
    super(initialPos);
    this.keyboardMap = keyboardMap;
    this.figSize = size;
    this.maxSpeed = 160;
    this.speed = { x: 0, y: 0 };
    this.jumping=false

    this.frameCount = 0;
    this.ryuSprite = new Image();
    this.ryuSprite.src = sprite;
    this.move = "noting";
  }
  update(delta: number) {
    let newPosX = this.position.x + this.speed.x * delta;
    if (newPosX < 1020 && newPosX >= 0) {
      this.position.x = newPosX;
    }
    let newPosY = this.position.y + this.speed.y;
    this.position.y = newPosY;
    if(newPosY < 540){
      this.speed.y += 1.8*0.4;
    }
    if (newPosY >= 540) {
      this.jumping = false;
      newPosY = 540;
      this.speed.y = 0;
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    
    const ryuFrameNeutral = [
      {sx: 5, sy: 10, sW: 65, sH: 95},
      {sx: 70, sy: 10, sW: 65, sH: 95},
      {sx: 135, sy: 10, sW: 65, sH: 95},
      {sx: 201, sy: 10, sW: 65, sH: 95},
      {sx: 270, sy: 10, sW: 65, sH: 95},
    ]
    const ryuFrameWalk = [
      {sx: 7, sy: 128, sW: 65, sH: 95},
      {sx: 75, sy: 128, sW: 65, sH: 95},
      {sx: 153, sy: 128, sW: 65, sH: 95},
      {sx: 227, sy: 128, sW: 66, sH: 95},
      {sx: 306, sy: 128, sW: 65, sH: 95},
      {sx: 367, sy: 124, sW: 63, sH: 95},
    ]
    const ryuFrameJump = [
      {sx: 63, sy: 241, sW: 65, sH: 100},
      {sx: 132, sy: 231, sW: 65, sH: 95},
      {sx: 188, sy: 230, sW: 66, sH: 95},
      {sx: 250, sy: 237, sW: 65, sH: 95},
      {sx: 312, sy: 232, sW: 63, sH: 95},
    ]
    const ryuFrameJumpDown = [
      {sx: 374, sy: 245, sW: 63, sH: 110},
    ]
    const ryuFramelp = [
      {sx: 6, sy: 360, sW: 65, sH: 100},
      {sx: 96, sy: 360, sW: 65, sH: 95},

    ]

  let inNeutral = 1;
    
   if((this.speed.x > 0 || this.speed.x < 0) && this.position.y >= 540){
    let i = Math.floor(this.frameCount / 8);
    
    let frame = ryuFrameWalk[i % ryuFrameWalk.length]

    ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)
   }

   if(this.speed.y < 0){
     inNeutral = 0;
    let i = Math.floor(this.frameCount / 20);

    let frame = ryuFrameJump[i % ryuFrameJump.length]

    ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)
    }

   if(this.speed.y > 0){
     inNeutral = 0;
    let i = Math.floor(this.frameCount / 16);
    console.log(i);

    let frame = ryuFrameJumpDown[i % ryuFrameJumpDown.length]

    ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, 400)
    }
    
    if(this.move == "lp"){
      console.log(this.move);
      let i = Math.floor(this.frameCount/12);
      
      let frame = ryuFramelp[i % ryuFramelp.length]

      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)
      this.speed.x = 0;
      inNeutral = 0;
    }

    if(this.speed.x == 0 && this.speed.y == 0 && inNeutral == 1){
      let i = Math.floor(this.frameCount / 12);
      
      let frame = ryuFrameNeutral[i % ryuFrameNeutral.length]

      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)
      }

    inNeutral = 1;
    this.frameCount++;
  }

  keyboard_event_down(key: string) {
    let tecla = this.keyboardMap[key];

    if (tecla == FigKey.LEFT) {
      this.speed.x = -this.maxSpeed + 45;
    } else if (tecla == FigKey.RIGHT) {
      this.speed.x = this.maxSpeed;
    } else if (tecla == FigKey.UP && this.jumping == false) {
      this.speed.y -= 25;
      this.jumping = true;
    } else if (tecla == FigKey.DOWN) {
    } else if (tecla == FigKey.H){
      this.move = "lp";
    }
  }
  
  keyboard_event_up(key: string) {
    let tecla = this.keyboardMap[key];
    if (tecla == FigKey.LEFT) {
      this.speed.x = 0;
    } else if (tecla == FigKey.RIGHT) {
      this.speed.x = 0;
    }else if (tecla == FigKey.H) {
      setTimeout(()=>this.move = "nothing",100)
    }
  }
}
