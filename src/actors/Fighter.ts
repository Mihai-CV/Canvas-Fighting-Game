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
  currentFrame:number;
  framesDrawn:number;
  onGo: boolean;
  constructor(
    initialPos: Point,
    keyboardMap: KeyboardMap,
    size: Size = { w: 160, h: 390 },
  ) {
    super(initialPos);
    this.keyboardMap = keyboardMap;
    this.figSize = size;
    this.maxSpeed = 180;
    this.speed = { x: 0, y: 0 };
    this.jumping=false

    this.frameCount = 0;
    this.ryuSprite = new Image();
    this.ryuSprite.src = sprite;
    this.move = "noting";
    this.currentFrame = 0;
    this.framesDrawn = 0;
    this.onGo = false;
  }
  update(delta: number) {
    let newPosX = this.position.x + this.speed.x * delta;
    if (newPosX <= 880 && newPosX >= 0) {
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
      {sx: 6, sy: 360, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 96, sy: 360, sW: 96, sH: 95, fsW:this.figSize.w + 70},
      {sx: 96, sy: 360, sW: 96, sH: 95, fsW:this.figSize.w + 70},
    ]
    const ryuFramemp = [
      {sx: 6, sy: 463, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 85, sy: 463, sW: 77, sH: 95, fsW:this.figSize.w + 20},
      {sx: 170, sy: 463, sW: 116, sH: 95, fsW:this.figSize.w + 95},
      {sx: 170, sy: 463, sW: 116, sH: 95, fsW:this.figSize.w + 95},
    ]
    const ryuFramelk = [
      {sx: 13, sy: 921, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 84, sy: 921, sW: 69, sH: 95, fsW:this.figSize.w + 10},
      {sx: 161, sy: 921, sW: 116, sH: 95, fsW:this.figSize.w + 115},
      {sx: 161, sy: 921, sW: 116, sH: 95, fsW:this.figSize.w + 115},
      {sx: 84, sy: 921, sW: 69, sH: 95, fsW:this.figSize.w + 10},
    ]
    const ryuFramemk = [
      {sx: 4, sy: 1190, sW: 63, sH: 100, fsW:this.figSize.w},
      {sx: 72, sy: 1190, sW: 95, sH: 95, fsW:this.figSize.w + 70},
      {sx: 174, sy: 1190, sW: 123, sH: 95, fsW:this.figSize.w + 125},
      {sx: 304, sy: 1190, sW: 102, sH: 95, fsW:this.figSize.w + 100},
      {sx: 416, sy: 1190, sW: 65, sH: 95, fsW:this.figSize.w},
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

    let frame = ryuFrameJumpDown[i % ryuFrameJumpDown.length]

    ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, 400)
    }

    if(this.move == "mp" && this.onGo == true && this.position.y >= 540){
      inNeutral = 0;
      let frame = ryuFramemp[this.currentFrame % ryuFramemp.length]
      
      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, frame.fsW, this.figSize.h)
      
      if(this.onGo == true){
        this.framesDrawn++
        if(this.framesDrawn >= 10){
          this.currentFrame++;
          this.framesDrawn = 0;
        }
      }
      if(frame == ryuFramemp[3]){
        setTimeout(()=>{this.onGo = false;
        this.framesDrawn = 0;
        this.currentFrame = 0;},90)
      }
      
      this.speed.x = 0;
    }

    if(this.move == "lp" && this.onGo == true && this.position.y >= 540){
      inNeutral = 0;
      let frame = ryuFramelp[this.currentFrame % ryuFramelp.length]
      
      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, frame.fsW, this.figSize.h)
      
      if(this.onGo == true){
        this.framesDrawn++
        if(this.framesDrawn >= 10){
          this.currentFrame++;
          this.framesDrawn = 0;
        }
      }
      if(frame == ryuFramelp[2]){
        setTimeout(()=>{this.onGo = false;
        this.framesDrawn = 0;
        this.currentFrame = 0;},80)
      }
      
      this.speed.x = 0;
    }

    if(this.move == "lk" && this.onGo == true && this.position.y >= 540){
      inNeutral = 0;
      let frame = ryuFramelk[this.currentFrame % ryuFramelk.length]
      
      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, frame.fsW, this.figSize.h)
      
      if(this.onGo == true){
        if(this.framesDrawn >= 10){
          this.currentFrame++;
          this.framesDrawn = 0;
        }
        this.framesDrawn++
      }
      if(frame == ryuFramelk[4]){
        setTimeout(()=>{this.onGo = false;
        this.framesDrawn = 0;
        this.currentFrame = 0;},100)
      }
      
      this.speed.x = 0;
    }
    
    if(this.move == "mk" && this.onGo == true && this.position.y >= 540){
      inNeutral = 0;
      let frame = ryuFramemk[this.currentFrame % ryuFramemk.length]
      
      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, frame.fsW, this.figSize.h)
      
      if(this.onGo == true){
        this.framesDrawn++
        if(this.framesDrawn >= 10){
          this.currentFrame++;
          this.framesDrawn = 0;
        }
      }
      if(frame == ryuFramemk[4]){
        setTimeout(()=>{this.onGo = false;
        this.framesDrawn = 0;
        this.currentFrame = 0;},120)
      }
      
      this.speed.x = 0;
    }

    if(this.speed.x == 0 && this.speed.y == 0 && inNeutral == 1){
      let i = Math.floor(this.frameCount / 11);    
      
      let frame = ryuFrameNeutral[i % ryuFrameNeutral.length]
      /* ctx.translate(this.position.x + this.figSize.w/2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(this.position.x + this.figSize.w/2), 0); */
      ctx.drawImage(this.ryuSprite, frame.sx, frame.sy, frame.sW, frame.sH, this.position.x, this.position.y, this.figSize.w, this.figSize.h)
      }


    inNeutral = 1;
    this.frameCount++;
  }


  keyboard_event_down(key: string) {
    let tecla = this.keyboardMap[key];
    let tecla2 = this.keyboardMap[key];
    if (tecla == FigKey.LEFT) {
      this.speed.x = -this.maxSpeed + 45;
    } else if (tecla == FigKey.RIGHT) {
      this.speed.x = this.maxSpeed;
    } else if (tecla == FigKey.UP && this.jumping == false) {
      this.speed.y -= 25;
      this.jumping = true;
    }else if (tecla == FigKey.LP){
      this.move = "lp";
      this.onGo = true;
    }else if (tecla == FigKey.MP){
      this.move = "mp";
      this.onGo = true;
    }else if (tecla == FigKey.LK){
      this.move = "lk";
      this.onGo = true;
    }else if (tecla == FigKey.MK){
      this.move = "mk";
      this.onGo = true;
    }else if (tecla == FigKey.DOWN && tecla2 == FigKey.SPECIAL){
      console.log("hadouken");
      
    }
  }
  
  
  keyboard_event_up(key: string) {
    let tecla = this.keyboardMap[key];
    if (tecla == FigKey.LEFT) {
      this.speed.x = 0;
    } else if (tecla == FigKey.RIGHT) {
      this.speed.x = 0;
    } else if (tecla == FigKey.MP) {
      //setTimeout(()=>this.move = "nothing",300)
    } 
  }
}


/* export let Fig1: Fighter;

export const figManager = (initialPos: Point, keyboardMap: KeyboardMap, size: Size) => {
	Fig1 = new Fighter(initialPos, keyboardMap, size);
}; */