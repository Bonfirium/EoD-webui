import BaseComponent from './_base';
import BackgroundImage from '../../assets/images/game/back_2000.png';
import { Images } from '../loaders/images';
import * as PIXI from 'pixi.js';

export default class Background extends BaseComponent {

	constructor() {
		super();
		const back = new PIXI.Sprite(Images[BackgroundImage]);
		this.container.addChild(back);
	}

}
