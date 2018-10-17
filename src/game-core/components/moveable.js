import * as PIXI from 'pixi.js';
import { MOVEABLE, ROOM } from '../constants/images.constants';
import { MOVEABLE_SPEED } from '../constants/logic.constants';
import ObjectComponent from './object';

export default class Moveable extends ObjectComponent {

	/**
	 * @param {PIXI.Texture} texture
	 * @param {Number?} x
	 * @param {Number?} y
	 * @param {Room?} room
	 */
	constructor(texture, { x, y, room }) {

		super(texture, {
			...room ? { visible: false } : {
				x,
				y,
			},
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
		this.room = room;
		const { x, y } = room.getSpiteCoords();
		this.set(x + ROOM.WIDTH / 2, y + ROOM.HEIGHT / 2);
	}

	/**
	 * @param {Room} room
	 */
	moveToRoom(room) {
		const neighbor = this.room.neighbors.find((neighbor) => (neighbor.id === room.id));

		if (!neighbor) {
			return;
		}

		this.room = room;

		// todo rafactor this shit
		const start = this.getSpiteCoords();
		const dest = room.getSpiteCoords();
		dest.x += ROOM.WIDTH / 2;
		dest.y += ROOM.HEIGHT / 2;
		const frames = 30;
		const xDistance = dest.x - start.x;
		const xStep = xDistance / frames;
		const yDistance = dest.y - start.y;
		const yStep = yDistance / frames;

		let tickCount = 0;
		let interval;
		const tick = () => {
			const cur = this.getSpiteCoords();
			const x = cur.x + xStep;
			const y = cur.y + yStep;
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