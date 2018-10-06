import BaseComponent from './_base';
import Background from './background';
import Room from './room';
import Moveable from './moveable';
import { Images } from '../loaders/images';
import generateRoomsCoordainates from '../utils/rooms.generator';
import gen from '../../../gen_test_data';

export default class GameComponent extends BaseComponent {

	constructor() {
		console.log(2);

		super();
		const background = new Background();
		this.container.addChild(background.container);
		const rooms = [];
		this.initRooms(gen(), rooms);
		const hero1 = new Moveable(Images.hero1, 100, 100);
		this.container.addChild(hero1.container);
		setTimeout(() => {
			hero1.moveToRoom(rooms[10]);
		}, 2000);
	}

	/**
	 *
	 * @param map
	 */
	initRooms(map, rooms) {
		const roomsCoordainates = generateRoomsCoordainates(map);
		for (let i = 0; i < roomsCoordainates.length; i++) {
			const { x, y } = roomsCoordainates[i];
			const room = new Room(x, y);
			rooms.push(room);
			this.container.addChild(rooms[rooms.length - 1].container);
		}

	}

}
