import * as PIXI from 'pixi.js';
import { MOVEABLE } from '../constants/images.constants';
import BaseComponent from './_base';

export default class Moveable extends BaseComponent {

	constructor(texture, x, y) {
		super();
		this._sprite = new PIXI.Sprite(texture);
		this._sprite.height = MOVEABLE.HEIGHT;
		this._sprite.width = MOVEABLE.WIDTH;
		this._sprite.anchor.set(MOVEABLE.ANCHOR);
		this._sprite.x = x;
		this._sprite.y = y;
		this.container.addChild(this._sprite);
	}

	set(x, y) {
		this._sprite.x = x;
		this._sprite.y = y;
	}

	/**
	 * @param {Room} room
	 */
	moveToRoom(room) {
		this.set(room._sprite.x + 32, room._sprite.y + 32);
	}

}
