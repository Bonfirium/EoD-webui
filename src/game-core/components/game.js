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

export default class GameComponent extends BaseComponent {

	constructor() {
		super();
		const background = new Background();
		this.container.addChild(background.container);

		/** @type {[Room]} */
		this.rooms = [];

		/** @type {[Portal]} */
		this.portals = [];

		/** @type {[Moveable]} */
		this.heroes = [];

		const map = gen_test();

		this.drawRooms(map);
		this.drawDoors(map);

		const heroId = '0x45fd454gf56h4+6reg654r65f4g65d4d65g46d5f4g654ww646qeq4f654we34t654w65r46wrr4tg65e4r';
		const hero1 = new Hero(Images.hero1, {
			room: this.rooms[0],
			id: heroId,
		});
		this.heroes.push(hero1);
		this.initHero(heroId);

		this.container.addChild(hero1.container);


		// this.container.addChild(hero2.container);
		// this.container.addChild(hero3.container);
		// this.container.addChild(hero4.container);

		// const ko = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		// setInterval(() => {
		// 	hero1.moveToRoom(hero1.room.neighbors[ko(0, hero1.room.neighbors.length - 1)]);
		// hero2.moveToRoom(hero2.room.neighbors[ko(0, hero2.room.neighbors.length-1)]);
		// hero3.moveToRoom(hero3.room.neighbors[ko(0, hero3.room.neighbors.length-1)]);
		// hero4.moveToRoom(hero4.room.neighbors[ko(0, hero4.room.neighbors.length-1)]);
		// }, 1500);
	}

	/**
	 *
	 * @param {[[Number]]} map
	 */
	drawRooms(map) {
		const roomsCoordinates = generateRoomsCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const {
				x, y, indexX, indexY, type,
			} = roomsCoordinates[i];
			let containerObject;

			switch (type) {
				case MAP_VALUES.ROOM: {
					containerObject = new Room(x, y, indexX, indexY);
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

		this.makeAllPortalsAsNeighbors();

	}

	/**
	 *
	 * @param {Room} room
	 * @param {[{x,y}]}neighborsIndexesArray
	 * @private
	 */
	_setNeighbors(room, neighborsIndexesArray) {
		neighborsIndexesArray.forEach((neighbor) => {
			const neighborRoom = this.rooms.find((room) => (room.indexX === neighbor.x && room.indexY === neighbor.y));
			if (neighborRoom) {
				room.neighbors.push(neighborRoom);
			}
		});

	}

	makeAllPortalsAsNeighbors() {
		this.portals.forEach((portal) => {
			this.portals.forEach((neighbor) => {
				console.log(portal, neighbor);
				if (neighbor.indexX === portal.indexX && neighbor.indexY === portal.indexY) {
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
	drawDoors(map) {
		const roomsCoordinates = generateDoorCoordinates(map);
		for (let i = 0; i < roomsCoordinates.length; i++) {
			const { x, y } = roomsCoordinates[i];
			const room = new Door(x, y);
			this.container.addChild(room.container);
		}

	}

	initHero(heroId) {
		this.rooms.forEach((room) => {
			const user = this.heroes.find((user) => user.id === heroId);

			if (!user) {
				return;
			}

			room.onClick(() => {
				this.moveToRoom(heroId, room.indexX, room.indexY);
			});
		});
	}

	/**
	 *
	 * @param heroId
	 * @param indexX
	 * @param indexy
	 */
	moveToRoom(heroId, indexX, indexY) {
		const room = this.rooms.find((room) => (room.indexX === indexX && room.indexY === indexY));
		const hero = this.heroes.find((user) => user.id === heroId);

		if (room && hero) {

			hero.moveToRoom(room);

			if (room.mapType === MAP_VALUES.TREASURE) {
				room.visitedByHero(hero);
			}

			if (room.mapType === MAP_VALUES.PORTAL) {

			}
		}
	}


}
