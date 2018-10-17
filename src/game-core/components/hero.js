import * as PIXI from 'pixi.js';
import Moveable from './moveable';

export default class Hero extends Moveable {

	/**
	 * @param {PIXI.Texture} texture
	 * @param {Number?} x
	 * @param {Number?} y
	 * @param {Room?} room
	 */
	constructor(texture, {
		x, y, room, id,
	}) {

		super(texture, {
			x,
			y,
			room,
		});

		this.isHero = true;
		this.id = id;
		this._treasureCount = 0;
		this.isAlive = true;

	}

	increaseTreasure() {
		this._treasureCount++;
	}

	getScores() {
		return this._treasureCount;
	}

	kill() {
		this.isAlive = false;
		setTimeout(() => {
			this._sprite.visible = false;
		}, 1000);
	}

}
