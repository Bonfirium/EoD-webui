import BaseComponent from './_base';
import { Images } from '../loaders/images';
import * as PIXI from 'pixi.js';
import constants from '../helpers/constants';

export default class Door extends BaseComponent {

	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super();

		this._sprite = new PIXI.Sprite(Images.door);
		this._sprite.height = constants.DOOR.WIDHT;
		this._sprite.width = constants.DOOR.HEIGHT;

		this._sprite.anchor.set(0.5);
		this._sprite.x = x * 32 + 32;
		this._sprite.y = y * 32 + 32;
		this.container.addChild(this._sprite);
	}

}
