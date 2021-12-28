import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { Carkey, KeyboardMap } from "../utils/keyboardMap";

type Size = { w: number; h: number };

export class Fighter extends Actor implements IActor {
  figSize: Size;
  figColor: string;
  keyboardMap: KeyboardMap;
  speed: Point;
  maxSpeed: number;
  jumping: boolean
  constructor(
    initialPos: Point,
    keyboardMap: KeyboardMap,
    size: Size = { w: 80, h: 200 }
  ) {
    super(initialPos);
    this.keyboardMap = keyboardMap;
    this.figSize = size;
    this.figColor = "red";
    this.maxSpeed = 140;
    this.speed = { x: 0, y: 0 };
    this.jumping=false
  }
  update(delta: number) {
    let newPosX = this.position.x + this.speed.x * delta;
    if (newPosX < 1024 && newPosX >= 0) {
      this.position.x = newPosX;
    }
    let newPosY = this.position.y + this.speed.y;
    this.position.y = newPosY;
    if(newPosY < 700){
      this.speed.y += 2*0.4;
      //this.speed.y *= 0.9;
    }
    if (newPosY >= 700) {
      this.jumping = false;
      newPosY = 700;
      this.speed.y = 0;
    }
  }
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.figColor;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.figSize.w,
      this.figSize.h
    );
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
