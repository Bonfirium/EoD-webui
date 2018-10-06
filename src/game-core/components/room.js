import ObjectComponent from './object';
import { Images } from '../loaders/images';
import { ROOM } from '../constants/images.constants';

/** @typedef {Class} Room */
export default class Room extends ObjectComponent {

	constructor(x, y) {
		super(Images.room, {
			x,
			y,
			height: ROOM.HEIGHT,
			width: ROOM.WIDTH,
		});
	}

}
