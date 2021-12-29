import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Carkey, KeyboardMap } from "../utils/keyboardMap";
const sprite = require("../assets/Ryu_sprite_sheet-removebg.png");


type Size = { w: number; h: number };

export class Fighter extends Actor implements IActor {
  figSize: Size;
  figColor: string;
  keyboardMap: KeyboardMap;
  speed: Point;
  maxSpeed: number;
  jumping: boolean;
  ryuSprite: HTMLImageElement;
  frameCount:number;
  constructor(
    initialPos: Point,
    keyboardMap: KeyboardMap,
    size: Size = { w: 140, h: 340 }
  ) {
    super(initialPos);
    this.keyboardMap = keyboardMap;
    this.figSize = size;
    this.figColor = "red";
    this.maxSpeed = 140;
    this.speed = { x: 0, y: 0 };
    this.jumping=false

    this.frameCount = 0;
    this.ryuSprite = new Image();
    this.ryuSprite.src = sprite; 
  }
  update(delta: number) {
    let newPosX = this.position.x + this.speed.x * delta;
    if (newPosX < 1024 && newPosX >= 0) {
      this.position.x = newPosX;
    }
    let newPosY = this.position.y + this.speed.y;
    this.position.y = newPosY;
    if(newPosY < 590){
      this.speed.y += 1.6*0.4;
      //this.speed.y *= 0.9;
    }
    if (newPosY >= 590) {
      this.jumping = false;
      newPosY = 590;
      this.speed.y = 0;
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {

    const ryuFrames = [
      {sx: 5, sy: 10, sW: 65, sH: 95},
      {sx: 70, sy: 10, sW: 65, sH: 95},
      {sx: 135, sy: 10, sW: 65, sH: 95},
      {sx: 200, sy: 10, sW: 65, sH: 95},
      {sx: 270, sy: 10, sW: 65, sH: 95},
    ]
    let i = Math.floor(this.frameCount / 14);
    console.log(i);
    
    let frame = ryuFrames[i % ryuFrames.length]

    ctx.fillStyle = this.figColor;
    ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)

    /*ctx.fillRect(
      this.position.x,
      this.position.y,
      this.figSize.w,
      this.figSize.h
    );*/
    this.frameCount++;
  }
  keyboard_event_down(key: string) {
    let tecla = this.keyboardMap[key];

    if (tecla == Carkey.LEFT) {
      this.speed.x = -this.maxSpeed;
    } else if (tecla == Carkey.RIGHT) {
      this.speed.x = this.maxSpeed;
    } else if (tecla == Carkey.UP && this.jumping == false) {
      this.speed.y -= 25;
      this.jumping = true;
    } else if (tecla == Carkey.DOWN) {
    }
  }
  keyboard_event_up(key: string) {
    let tecla = this.keyboardMap[key];
    if (tecla == Carkey.LEFT) {
      this.speed.x = 0;
    } else if (tecla == Carkey.RIGHT) {
      this.speed.x = 0;
    }
  }
}
