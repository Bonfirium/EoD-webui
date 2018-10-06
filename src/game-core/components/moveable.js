import { MOVEABLE, ROOM } from '../constants/images.constants';
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
			...room ? { visible: false } : { x, y },
			width: MOVEABLE.WIDTH,
			height: MOVEABLE.HEIGHT,
		});
		this._sprite.anchor.set(MOVEABLE.ANCHOR);
		this.moveToRoom(room);
		this._sprite.visible = true;
	}

	set(x, y) {
		this._sprite.x = x;
		this._sprite.y = y;
	}

	/**
	 * @param {Room} room
	 */
	moveToRoom(room) {
		console.log(room);
		this.set(room._sprite.x + ROOM.WIDTH / 2, room._sprite.y + ROOM.HEIGHT / 2);
	}

}
