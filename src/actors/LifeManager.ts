
export class LifeManager {
    totalLifeKen: number;
    totalLifeRyu: number;
    goingLeft: boolean;
    goingRight: boolean;
    distance: number;
    beatKen: boolean
    beatRyu: boolean
    win: boolean;
    winKen: boolean;
    constructor(){
        this.totalLifeKen = 400;
        this.totalLifeRyu = 400;
        this.goingLeft = false
        this.goingRight = false
        this.distance = 0;
        this.beatKen = false;
        this.beatRyu = false;
        this.win = false;
        this.winKen = false;
    }

    touchingKen(damage: number){
        this.totalLifeKen = this.totalLifeKen - damage;
        this.beatKen = true;
        setTimeout(()=>{ this.beatKen = false;},20);
    }
    touchingRyu(damage: number){
        this.totalLifeRyu = this.totalLifeRyu - damage;
        this.beatRyu = true;
        setTimeout(()=>{ this.beatRyu = false;},450);
    }

}

export let LifeM: LifeManager;

export const createLife = () => {
	LifeM = new LifeManager();
};