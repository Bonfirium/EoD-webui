import * as PIXI from 'pixi.js';
import { MOVEABLE, ROOM } from '../constants/images.constants';
import { MOVEABLE_SPEED } from '../constants/logic.constants';
import ObjectComponent from './object';

function calcDistnace(x1, x2, y1, y2) {

}

export default class Moveable extends ObjectComponent {

	/**
	 * @param {PIXI.Texture} texture
	 * @param {Number?} x
	 * @param {Number?} y
	 * @param {Room?} room
	 */
	constructor(texture, { x, y, room }) {

		super(texture, {
			...room ? { visible: false } : { x, y },
			width: MOVEABLE.WIDTH,
			height: MOVEABLE.HEIGHT,
		});
		this._sprite.anchor.set(MOVEABLE.ANCHOR);
		this.setToRoom(room);
		this._sprite.visible = true;
	}

	set(x, y) {
		this._sprite.x = x;
		this._sprite.y = y;
	}

	/**
	 * @param {Room} room
	 */
	setToRoom(room) {
		const { x, y } = room.getSpiteCoords();
		this.set(x + ROOM.WIDTH / 2, y + ROOM.HEIGHT / 2);
	}

	/**
	 * @param {Room} room
	 */
	moveToRoom(room) {
		// todo rafactor this shit
		const start = this.getSpiteCoords();
		const dest = room.getSpiteCoords();
		dest.x = dest.x + ROOM.WIDTH / 2;
		dest.y = dest.y + ROOM.HEIGHT / 2;
		const frames = 30;
		const xDistance = dest.x - start.x;
		const xStep = xDistance / frames;
		console.log(xDistance, xStep);
		const yDistance = dest.y - start.y;
		const yStep = yDistance / frames;
		console.log(yDistance, yStep);

		let tickCount = 0;
		let interval;
		const tick = () => {
			const cur = this.getSpiteCoords();
			let x = cur.x + xStep;
			let y = cur.y + yStep;
			// if (x > dest.x) x = dest.x;
			// if (y > dest.y) y = dest.y;

			this.set(x, y);

			tickCount += 1;
			if (tickCount === frames) {
				clearInterval(interval);
				this.set(dest.x, dest.y);
			}
		};

		interval = setInterval(tick.bind(this), 1000 / frames);
	}

}
