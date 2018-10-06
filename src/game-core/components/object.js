import * as PIXI from 'pixi.js';
import BaseComponent from './_base';

export default class ObjectComponent extends BaseComponent {

	constructor(texture, { x, y, width, height, display = true }) {
		super();
		this._sprite = new PIXI.Sprite(texture);
		this._sprite.height = height;
		this._sprite.width = width;
		if (x !== undefined) this._sprite.x = x;
		if (y !== undefined) this._sprite.y = y;
		if (display) this.container.addChild(this._sprite);
	}

}
