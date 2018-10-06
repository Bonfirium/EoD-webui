import BaseComponent from './_base';
import Background from './background';
import Room from './room';
import Portal from './portal';
import Treasure from './treasure';
import Door from './door';
import Moveable from './moveable';
import { MAP_VALUES } from '../constants/logic.constants';
import generateRoomsCoordinates from '../utils/rooms.generator';
import generateDoorCoordinates from '../utils/doors.generator';
import { gen_test } from '../../../gen_test_data';
import { Images } from '../loaders/images';

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
		const roomsCoordinates = generateRoomsCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { x, y, type } = roomsCoordinates[i];
			let containerObject;

			switch (type) {
				case MAP_VALUES.ROOM: {
					containerObject = new Room(x, y);
					break;
				}
				case MAP_VALUES.PORTAL: {
					containerObject = new Portal(x, y);
					break;
				}
				case MAP_VALUES.TREASURE: {
					containerObject = new Treasure(x, y);
					break;
				}
			}

			rooms.push(containerObject);

			this.container.addChild(containerObject.container);
		}

	}

	drawDoors(map) {
		const roomsCoordinates = generateDoorCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { x, y } = roomsCoordinates[i];
			const room = new Door(x, y);
			this.container.addChild(room.container);
		}

	}

}
