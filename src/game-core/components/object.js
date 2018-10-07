import * as PIXI from 'pixi.js';
import BaseComponent from './_base';

export default class ObjectComponent extends BaseComponent {

	constructor(texture, { x, y, width, height, visible = true }) {
		super();
		this._sprite = new PIXI.Sprite(texture);
		this._sprite.height = height;
		this._sprite.width = width;
		this._sprite.visible = visible;
		if (x !== undefined) this._sprite.x = x;
		if (y !== undefined) this._sprite.y = y;
		this.container.addChild(this._sprite);
	}

	getSpiteCoords() {
		return { x: this._sprite.x, y: this._sprite.y };
	}

}
