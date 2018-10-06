import BaseComponent from './_base';
import Background from './background';
import Room from './room';
import Door from './door';
import Moveable from './moveable';
import { Images } from '../loaders/images';
import generateRoomsCoordainates from '../utils/rooms.generator';
import generateDoorCoordainates from '../utils/doors.generator';
import { gen_test } from '../../../gen_test_data';

export default class GameComponent extends BaseComponent {

	constructor() {
		super();
		const background = new Background();
		this.container.addChild(background.container);
		const map = gen_test();
		const rooms = [];
		this.drawRooms(map, rooms);
		this.drawDoors(map);
		const hero = new Moveable(Images.hero1, { room: rooms[0] });
		this.container.addChild(hero.container);
	}

	drawRooms(map, rooms) {
		const roomsCoordainates = generateRoomsCoordainates(map);
		for (let i = 0; i < roomsCoordainates.length; i++) {
			const { x, y } = roomsCoordainates[i];
			rooms.push(new Room(x, y, i));
			this.container.addChild(rooms[rooms.length - 1].container);
		}

	}

	drawDoors(map) {
		const roomsCoordinates = generateDoorCoordainates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { x, y } = roomsCoordinates[i];
			const room = new Door(x, y);
			this.container.addChild(room.container);
		}

	}

}
