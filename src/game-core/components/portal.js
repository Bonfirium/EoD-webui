import * as PIXI from 'pixi.js';
import Room from './room';
import { Images } from '../loaders/images';
import { PORTAL } from '../constants/images.constants';

export default class Portal extends Room {

	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(x, y);

		this._spritePortal = new PIXI.Sprite(Images.portal);

		this._spritePortal.height = PORTAL.WIDTH;
		this._spritePortal.width = PORTAL.HEIGHT;

		this._spritePortal.x = x + 8;
		this._spritePortal.y = y + 8;
		this.container.addChild(this._spritePortal);
	}

}
