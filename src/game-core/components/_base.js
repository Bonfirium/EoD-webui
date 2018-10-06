import * as PIXI from 'pixi.js';

/** @abstract */
export default class BaseComponent {

	constructor() {
		this._container = new PIXI.Container();
	}

	get x() {
		return this._container.x;
	}

	get y() {
		return this._container.y;
	}

	set x(value) {
		return this._container.x = value;
	}

	set y(value) {
		return this._container.y = value;
	}

	get container() {
		return this._container;
	}

}
