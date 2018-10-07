import * as PIXI from 'pixi.js';
import BaseComponent from './_base';
import { Images } from '../loaders/images';

export default class Background extends BaseComponent {

	constructor() {
		super();
		const background = new PIXI.Sprite(Images.background);
		this.container.addChild(background);
	}

}
