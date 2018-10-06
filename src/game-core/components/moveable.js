import { MOVEABLE, ROOM } from '../constants/images.constants';
import ObjectComponent from './object';

export default class Moveable extends ObjectComponent {

	constructor(texture, x, y) {
		super(texture, {
			x,
			y,
			width: MOVEABLE.WIDTH,
			height: MOVEABLE.HEIGHT,
		});
		this._sprite.anchor.set(MOVEABLE.ANCHOR);
	}

	set(x, y) {
		this._sprite.x = x;
		this._sprite.y = y;
	}

	/**
	 * @param {Room} room
	 */
	moveToRoom(room) {
		this.set(room._sprite.x + ROOM.WIDTH / 2, room._sprite.y + ROOM.HEIGHT / 2);
	}

}
