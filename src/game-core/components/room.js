import * as PIXI from 'pixi.js';
import ObjectComponent from './object';
import { Images } from '../loaders/images';
import { ROOM } from '../constants/images.constants';

/** @typedef {Class} Room */
export default class Room extends ObjectComponent {

	constructor(x, y, indexX, indexY) {
		super(Images.room, {
			x,
			y,
			height: ROOM.HEIGHT,
			width: ROOM.WIDTH,
		});

		this.indexX = indexX;
		this.indexY = indexY;
		this.neighbors = [];

		// Opt-in to interactivity
		this._sprite.interactive = true;

// Shows hand cursor
		this._sprite.buttonMode = true;

		this._sprite.on('pointerdown', (hero) => {
				const neighborRoom = hero.room.find((room) => (room.indexX === this.indexX && room.indexY === this.indexY));

				if (!neighborRoom) {
					return;
				}

				hero.moveToRoom(this)
			}
		);


		// const textSample = new PIXI.Text(`x: ${indexX}, y: ${indexY}`, { font: '8px Snippet',});

		// textSample.x = x;
		// textSample.y= y;
		// textSample.height = ROOM.HEIGH;
		// textSample.width= ROOM.WIDTH;
		// this.container.addChild(textSample)

	}

}
