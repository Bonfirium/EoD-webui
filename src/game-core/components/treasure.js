import * as PIXI from 'pixi.js';
import Room from './room';
import { Images } from '../loaders/images';
import { TREASURE } from '../constants/images.constants';

export default class Treasure extends Room {

	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(x, y);

		this._spritePortal = new PIXI.Sprite(Images.chest);

		this._spritePortal.height = TREASURE.WIDTH;
		this._spritePortal.width = TREASURE.HEIGHT;

		this._spritePortal.x = x + TREASURE.MARGIN;
		this._spritePortal.y = y + TREASURE.MARGIN;

		this.container.addChild(this._spritePortal);
	}

}
