import * as PIXI from 'pixi.js';
import BaseLoader from './_base';
import Chest from '../../assets/images/game/chest_128.png';
import Door from '../../assets/images/game/door_38.png';
import DoorR from '../../assets/images/game/door_38_R.png';
import Hero_1 from '../../assets/images/game/hero_01_true.png';
import Hero_2 from '../../assets/images/game/hero_02_true.png';
import Hero_3 from '../../assets/images/game/hero_03_true.png';
import Hero_4 from '../../assets/images/game/hero_04_true.png';
import Org_1 from '../../assets/images/game/ogr_01_true.png';
import Org_2 from '../../assets/images/game/ogr_02_true.png';
import Org_3 from '../../assets/images/game/ogr_03_true.png';
import Org_4 from '../../assets/images/game/ogr_04_true.png';
import Org_5 from '../../assets/images/game/ogr_05_true.png';
import Portal from '../../assets/images/game/portal_true_90.png';
import Room from '../../assets/images/game/room_128.png';


/**
 *  ## USAGE
 * `import Images from './loaders/image';`
 * `import SomeImage from './assets/images/someImage.png';`
 * `new Sprite(Images[SomeImage]);`
 * @type {Object.<String, PIXI.Texture>}
 */
export const Images = {};

export default class ImagesLoader extends BaseLoader {

	constructor() {
		super();
		this.imagesToLoad = [
			Chest, Door, DoorR,
			Hero_1, Hero_2, Hero_3, Hero_4,
			Org_1, Org_2, Org_3, Org_4, Org_5,
			Portal, Room,
		];
		this.imagesToLoad.forEach((image) => {
			// resource id is a same as path to this image
			PIXI.loader.add(image, image);
		});
	}

	/** @inheritDoc BaseLoader#onLoad */
	onLoad(_, resources) {
		this.imagesToLoad.forEach((image) => {
			Images[image] = resources[image].texture;
		});
	}

}
