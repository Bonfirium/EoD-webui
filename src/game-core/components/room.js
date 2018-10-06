import * as PIXI from 'pixi.js';
import BaseComponent from './_base';
import { Images } from '../loaders/images';
import { ROOM } from '../constants/images.constants';

/** @typedef {Class} Room */
export default class Room extends BaseComponent {

	/**
	 *
	 * @param width
	 * @param height
	 */
	constructor(x, y) {
		super();
		this._sprite = new PIXI.Sprite(Images.room);
		this._sprite.height = ROOM.WIDTH;
		this._sprite.width = ROOM.HEIGHT;

		this._sprite.x = x;
		this._sprite.y = y;
		this.container.addChild(this._sprite);
	}

}
