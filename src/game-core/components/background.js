import * as PIXI from 'pixi.js';
import BaseComponent from './_base';
import BackgroundImage from '../../assets/images/game/back_2000.png';
import { Images } from '../loaders/images';

export default class Background extends BaseComponent {

	constructor() {
		super();
		const background = new PIXI.Sprite(Images[BackgroundImage]);
		this.container.addChild(background);
	}

}
