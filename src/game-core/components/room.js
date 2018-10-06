import * as PIXI from 'pixi.js';
import BaseComponent from './_base';
import { Images } from '../loaders/images';
import constants from '../helpers/constants';

export default class Room extends BaseComponent {

	/**
	 *
	 * @param width
	 * @param height
	 */
	constructor(x, y) {
		super();
		console.log('room', Images.room)
		this._sprite = new PIXI.Sprite(Images.room);
		this._sprite.height = constants.ROOM.WIDHT;
		this._sprite.width = constants.ROOM.HEIGHT;

		this._sprite.x = x;
		this._sprite.y = y;
		this.container.addChild(this._sprite);
	}

}
