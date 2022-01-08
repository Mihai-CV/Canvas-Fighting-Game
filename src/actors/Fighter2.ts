import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { FigKey, KeyboardMap } from "../utils/keyboardMap";
const sprite = require("../../public/assets/Ken_sprite_sheet-removebg.png");


type Size = { w: number; h: number };

export class FighterKen extends Actor implements IActor {
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
      {sx: 1, sy: 684, sW: 63, sH: 95},
      {sx: 70, sy: 684, sW: 63, sH: 95},
      {sx: 139, sy: 684, sW: 63, sH: 95},
      {sx: 207, sy: 684, sW: 63, sH: 95},
      {sx: 275, sy: 684, sW: 63, sH: 95},
    ]
    const ryuFrameWalk = [
      {sx: 4, sy: 863, sW: 65, sH: 95},
      {sx: 68, sy: 863, sW: 65, sH: 95},
      {sx: 138, sy: 863, sW: 65, sH: 95},
      {sx: 213, sy: 863, sW: 66, sH: 95},
      {sx: 283, sy: 861.8, sW: 65, sH: 95},
      {sx: 352, sy: 863, sW: 63, sH: 95},
    ]
    const ryuFrameJump = [
      {sx: 724, sy: 1036, sW: 65, sH: 100},
      {sx: 787, sy: 992, sW: 65, sH: 95},
      {sx: 842, sy: 964, sW: 66, sH: 95},
      {sx: 909, sy: 963, sW: 65, sH: 95},
      {sx: 968, sy: 973, sW: 63, sH: 95},
    ]
    const ryuFrameJumpDown = [
      {sx: 1030, sy: 1006, sW: 63, sH: 110},
    ]
    const ryuFramelp = [
      {sx: 3, sy: 1150, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 69, sy: 1150, sW: 96, sH: 95, fsW:this.figSize.w + 70},
      {sx: 69, sy: 1150, sW: 96, sH: 95, fsW:this.figSize.w + 70},
    ]
    const ryuFramemp = [
      {sx: 166, sy: 1148, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 235, sy: 1148, sW: 77, sH: 95, fsW:this.figSize.w + 20},
      {sx: 316, sy: 1148, sW: 116, sH: 95, fsW:this.figSize.w + 95},
      {sx: 316, sy: 1148, sW: 116, sH: 95, fsW:this.figSize.w + 95},
    ]
    const ryuFramelk = [
      {sx: 3, sy: 1150, sW: 65, sH: 100, fsW:this.figSize.w},
      {sx: 62, sy: 1563, sW: 69, sH: 95, fsW:this.figSize.w + 10},
      {sx: 142, sy: 1563, sW: 116, sH: 95, fsW:this.figSize.w + 115},
      {sx: 142, sy: 1563, sW: 116, sH: 95, fsW:this.figSize.w + 115},
      {sx: 258, sy: 1563, sW: 69, sH: 95, fsW:this.figSize.w + 10},
    ]
    const ryuFramemk = [
      {sx: 682, sy: 1565, sW: 63, sH: 100, fsW:this.figSize.w},
      {sx: 762, sy: 1565, sW: 95, sH: 95, fsW:this.figSize.w + 70},
      {sx: 868, sy: 1565, sW: 123, sH: 95, fsW:this.figSize.w + 125},
      {sx: 1003, sy: 1565, sW: 102, sH: 95, fsW:this.figSize.w + 100},
      {sx: 1144, sy: 1565, sW: 65, sH: 95, fsW:this.figSize.w},
    ]

  let inNeutral = 1;
  ctx.translate(this.position.x + this.figSize.w/2, 0);
  ctx.scale(-1, 1);
  ctx.translate(-(this.position.x + this.figSize.w/2), 0);

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
      let i = Math.floor(this.frameCount / 10);    
      
      let frame = ryuFrameNeutral[i % ryuFrameNeutral.length]
      
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