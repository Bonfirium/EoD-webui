import BaseComponent from './_base';
import Background from './background';
import Room from './room';
import Portal from './portal';
import Treasure from './treasure';
import Door from './door';
import { MAP_VALUES } from '../constants/logic.constants';
import generateRoomsCoordinates from '../utils/rooms.generator';
import generateDoorCoordinates from '../utils/doors.generator';
import { gen_test } from '../../../gen_test_data';
import { Images } from '../loaders/images';
import Hero from './hero';
import genRandomArray from '../utils/random';

export default class GameComponent extends BaseComponent {

	constructor(map) {
		super();
		const background = new Background();
		this.container.addChild(background.container);

		/** @type {[Room]} */
		this.rooms = [];

		/** @type {[Portal]} */
		this.portals = [];

		/** @type {[Room]} */
		this.simpleRooms = [];

		/** @type {[Hero]} */
		this.heroes = [];

		/** @type {[Monster]} */
		this.monsters = [];


		this._drawRooms(map);
		this._drawDoors(map);

	}

	initGame(users) {

		const randomArray = genRandomArray(this.simpleRooms.length);

		for (let i = 0; i < users.length / 2; i++) {

			const user = users[i];

			const hero = new Hero(Images[`hero${i + 1}`], {
				room: this.rooms[randomArray[i]],
				id: user,
			});

			this.heroes.push(hero);
			this.container.addChild(hero.container);
		}

		for (let i = users.length / 2; i < users.length; i++) {
			const user = users[i];

			const hero = new Hero(Images[`monster${i + 1 - users.length / 2}`], {
				room: this.rooms[randomArray[i]],
				id: user,
			});

			this.monsters.push(hero);
			this.container.addChild(hero.container);
		}


	}

	initUser(userId, cb) {
		this.rooms.forEach((room) => {

			room.onClick(() => {
				cb(room.id);
				this.moveToRoom(userId, room.id);
			});

		});
	}

	/**
	 *
	 * @param {[[Number]]} map
	 */
	_drawRooms(map) {
		const roomsCoordinates = generateRoomsCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const {
				x, y, indexX, indexY, type,
			} = roomsCoordinates[i];
			let containerObject;

			switch (type) {
				case MAP_VALUES.ROOM: {
					containerObject = new Room(x, y, indexX, indexY);
					this.simpleRooms.push(containerObject);
					break;
				}
				case MAP_VALUES.PORTAL: {
					containerObject = new Portal(x, y, indexX, indexY);
					this.portals.push(containerObject);
					break;
				}
				case MAP_VALUES.TREASURE: {
					containerObject = new Treasure(x, y, indexX, indexY);
					break;
				}
			}

			this.rooms.push(containerObject);

			this.container.addChild(containerObject.container);
		}

		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { neighbors } = roomsCoordinates[i];
			const currentRoom = this.rooms[i];

			this._setNeighbors(currentRoom, neighbors);
		}

		this._makeAllPortalsAsNeighbors();

	}

	/**
	 *
	 * @param {Room} room
	 * @param {[{x,y}]}neighborsIndexesArray
	 * @private
	 */
	_setNeighbors(room, neighborsIndexesArray) {
		neighborsIndexesArray.forEach((neighbor) => {
			const neighborRoom = this.rooms.find((room) => (room.id === neighbor.id));

			if (neighborRoom) {
				room.neighbors.push(neighborRoom);
			}
		});

	}

	_makeAllPortalsAsNeighbors() {
		this.portals.forEach((portal) => {
			this.portals.forEach((neighbor) => {

				if (neighbor.id === portal.id) {
					return;
				}

				portal.neighbors.push(neighbor);
			});
		});
	}

	/**
	 *
	 * @param {[[Number]]} map
	 */
	_drawDoors(map) {
		const roomsCoordinates = generateDoorCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { x, y } = roomsCoordinates[i];
			const room = new Door(x, y);
			this.container.addChild(room.container);
		}

	}

	/**
	 *
	 * @param userId
	 * @param roomId
	 */
	moveToRoom(userId, roomId) {
		const room = this.rooms.find((room) => (room.id === roomId));
		const hero = this.heroes.find((user) => user.id === userId);
		const monster = this.monsters.find((user) => user.id === userId);

		if (room && hero) {

			hero.moveToRoom(room);

			if (room.mapType === MAP_VALUES.TREASURE) {
				room.visitedByHero(hero);
			}

		}

		if (room && monster) {

			monster.moveToRoom(room);

			this.heroes.forEach((heroItem) => {
				if (heroItem.room.id === room.id) {
					heroItem.kill();
				}
			});
		}

	}


}
