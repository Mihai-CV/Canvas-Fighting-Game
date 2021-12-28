import { IActor } from "../actors/Actor";
import { Barrier } from "../actors/Barrier";
import { angleToRad } from "../utils/angleToRad";

class CircuitManager {
	barriers: Barrier[];
	currentBarrier: number;
	currentLap: number;
	constructor(actor: IActor) {
		this.currentBarrier = 0;
		this.currentLap = 0;
		let barriers: Barrier[] = [];
		let num = 20;
		let increAngle = 360 / 10;
		let center = { x: 500, y: 500 };
		let radius = 400;
		for (let i = 0; i < num; i++) {
			let angle = (360 / num) * i;
			barriers.push(
				new Barrier(
					{
						x: center.x + Math.sin(angleToRad(angle)) * radius,
						y: center.y + Math.cos(angleToRad(angle)) * radius,
					},
					80,
					-angle + 90,
					actor,
					i,
				),
			);
		}
		console.log("CIRCUIT CREATED");
		this.barriers = barriers;
	}
	addLap() {
		console.log("LAP");
		this.currentLap++;
		this.currentBarrier = 0;
		this.barriers.forEach((b) => (b.touched = false));

		if (this.currentLap > 1) {
			alert("YOU WON");
		}
	}
	touchingBarrier(idx: number) {
		if (this.currentBarrier == idx) {
			this.currentBarrier++;
			if (this.currentBarrier == this.barriers.length) {
				this.addLap();
			}
			return true;
		}
		return false;
	}
}

export let Circuit: CircuitManager;

export const createCircuit = (actor: IActor) => {
	Circuit = new CircuitManager(actor);
};
