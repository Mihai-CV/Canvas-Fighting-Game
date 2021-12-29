import { Actor, IActor } from "./actors/Actor";
import { Barrier } from "./actors/Barrier";
import { Fighter } from "./actors/Fighter";
import { FPSViewer } from "./actors/FPSViewer";
import { Pacman } from "./actors/Pacman";
import { Circuit, createCircuit } from "./state/Circuit";
import { MAP_A, MAP_B } from "./utils/keyboardMap";
import {Map} from "../src/actors/Map"

window.onload = () => {
	var canvas = document.getElementById("canvas") as HTMLCanvasElement;
	var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	let fps = new FPSViewer({ x: 5, y: 15 });

	//let carA = new Car({ x: 100, y: 100 }, MAP_A);
	//let carB = new Car({ x: 300, y: 300 }, MAP_B);
	let fighterA = new Fighter({x: 200, y: 700}, MAP_A)
	let escenario = new Map({x: 0, y: 0})

	//let cars = [carA, fighterA];

	//createCircuit(carA);

	let actors: Array<IActor> = [fps, fighterA];

	let lastFrame = 0;
	const render = (time: number) => {
		let delta = (time - lastFrame) / 1000;

		lastFrame = time;
		actors.forEach((e) => e.update(delta));
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		actors.forEach((e) => {
			ctx.save();
			e.draw(delta, ctx);
			ctx.restore();
		});
		window.requestAnimationFrame(render);
	};

	window.requestAnimationFrame(render);

	document.body.addEventListener("keydown", (e) => {
		// console.log(e.key);
		actors.forEach((actor) => {
			if (actor.keyboard_event_down) {
				actor.keyboard_event_down(e.key);
			}
		});
	});
	document.body.addEventListener("keyup", (e) => {
		// console.log(e.key);
		actors.forEach((actor) => {
			if (actor.keyboard_event_up) {
				actor.keyboard_event_up(e.key);
			}
		});
	});
};
