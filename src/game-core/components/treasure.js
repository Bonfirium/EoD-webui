import * as PIXI from 'pixi.js';
import Room from './room';
import { Images } from '../loaders/images';
import { TREASURE } from '../constants/images.constants';
import { MAP_VALUES } from '../constants/logic.constants';

export default class Treasure extends Room {

	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y, indexX, indexY) {
		super(x, y, indexX, indexY, MAP_VALUES.TREASURE);

		this._spriteTreasure = new PIXI.Sprite(Images.chest);

		this._spriteTreasure.height = TREASURE.WIDTH;
		this._spriteTreasure.width = TREASURE.HEIGHT;

		this._spriteTreasure.x = x;
		this._spriteTreasure.y = y;

		this._isVisited = false;
		this.container.addChild(this._spriteTreasure);
	}

	/**
	 *
	 * @param {Hero} hero
	 */
	visitedByHero(hero) {

		if (!this._isVisited) {
			hero.increaseTreasure();
			this._isVisited = true;
		}

		setTimeout(() => {
			this._spriteTreasure.visible = false;
		}, 1000);
	}


}
