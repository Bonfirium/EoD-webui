import ObjectComponent from './object';
import { Images } from '../loaders/images';
import { DOOR, ROOM } from '../constants/images.constants';

export default class Door extends ObjectComponent {

	constructor(x, y) {
		super(Images.door, {
			x: (x * ROOM.WIDTH + ROOM.WIDTH) / 2,
			y: (y * ROOM.HEIGHT + ROOM.HEIGHT) / 2,
			width: DOOR.WIDTH,
			height: DOOR.HEIGHT,
		});
		this._sprite.anchor.set(DOOR.ANCHOR);
	}

}
