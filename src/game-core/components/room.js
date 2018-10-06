import BaseComponent from './_base';
import RoomImage from '../../assets/images/game/room_128.png';
import { Images } from '../loaders/images';
import * as PIXI from 'pixi.js';

export default class Room extends BaseComponent {

	constructor(x, y) {
		super();
		this._width = 64;
		this._height = 64;
		const room = new PIXI.Sprite(Images[RoomImage]);
		room.x = x * this._width;
		room.y = y * this._height;
		room.height = this._width;
		room.width = this._height;
		this.container.addChild(room);
	}

}
