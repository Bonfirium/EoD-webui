import * as PIXI from 'pixi.js';
import ObjectComponent from './object';
import { Images } from '../loaders/images';
import { ROOM } from '../constants/images.constants';
import { MAP_VALUES } from '../constants/logic.constants';

/** @typedef {Class} Room */
export default class Room extends ObjectComponent {

	constructor(x, y, indexX, indexY, mapType = MAP_VALUES.ROOM) {
		super(Images.room, {
			x,
			y,
			height: ROOM.HEIGHT,
			width: ROOM.WIDTH,
			mapType,
		});

		this.indexX = indexX;
		this.indexY = indexY;
		this.neighbors = [];
		this.mapType = mapType;

		this.id = `${indexX}-${indexY}`;

		// Opt-in to interactivity
		this._sprite.interactive = true;

		this._sprite.buttonMode = true;

		// this.onClick = this.onClick.bind(this);

		// const textSample = new PIXI.Text(`x: ${indexX}, y: ${indexY}`, { font: '8px Snippet',});

		// textSample.x = x;
		// textSample.y= y;
		// textSample.height = ROOM.HEIGH;
		// textSample.width= ROOM.WIDTH;
		// this.container.addChild(textSample)

	}


	/**
	 *
	 * @param cb
	 */
	onClick(cb) {
		this._sprite.on('pointerdown', cb);
	}


}
