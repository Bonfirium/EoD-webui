import BaseComponent from './_base';
import Background from './background';
import Room from './room';
import generateRoomsCoordainates from '../utils/rooms.generator';
import gen from '../../../gen_test_data.js';
import constants from '../helpers/constants';

export default class GameComponent extends BaseComponent {

	constructor() {
		super();
		const background = new Background();
		this.container.addChild(background.container);

		this.initRooms(gen());
	}

	/**
	 *
	 * @param map
	 */
	initRooms(map) {
		const roomsCoordainates = generateRoomsCoordainates(map);
		for (let i = 0; i < roomsCoordainates.length; i++) {
			const { x, y } = roomsCoordainates[i];
			const room = new Room(x, y);
			this.container.addChild(room.container);
		}

	}

}
