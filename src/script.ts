import { IActor } from "./actors/Actor";
import { Fighter } from "./actors/Fighter";
import { FPSViewer } from "./actors/FPSViewer";
import { MAP_A, MAP_B} from "./utils/keyboardMap";
import { Map } from "../src/actors/Map"
import { FighterKen } from "./actors/Fighter2";


window.onload = () => {
	var canvas = document.getElementById("canvas") as HTMLCanvasElement;
	var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	let fps = new FPSViewer({ x: 5, y: 15 });

	let fighterA = new Fighter({x: 200, y: 540}, MAP_B)
	let fighterB = new FighterKen({x: 600, y: 540}, MAP_A)
	//let fighterB = new Fighter({x: 800, y: 700}, MAP_A)
	let escenario = new Map({x: 0, y: 0}, fighterA)
	
	//let cars = [fighterB, fighterA];

	//figManager(fighterA);
	
	let actors: Array<IActor> = [escenario, fighterA, fighterB, fps ];

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
