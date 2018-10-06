import BaseComponent from './_base';
import RoomImage from '../../assets/images/game/room_128.png';
import { Images } from '../loaders/images';
import * as PIXI from 'pixi.js';
import constants from '../helpers/constants';

export default class Room extends BaseComponent {

	/**
	 *
	 * @param width
	 * @param height
	 */
	constructor(x, y) {
		super();

		this._sprite = new PIXI.Sprite(Images[RoomImage]);
		this._sprite.height = constants.ROOM.WIDHT;
		this._sprite.width = constants.ROOM.HEIGHT;

		this._sprite.x = x;
		this._sprite.y = y;
		this.container.addChild(this._sprite);
	}

}
