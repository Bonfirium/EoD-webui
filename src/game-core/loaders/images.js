import * as PIXI from 'pixi.js';
import BaseLoader from './_base';
import chest from '../../assets/images/game/chest_128.png';
import door from '../../assets/images/game/door_38.png';
import doorInverted from '../../assets/images/game/door_38_R.png';
import hero1 from '../../assets/images/game/hero_01_true.png';
import hero2 from '../../assets/images/game/hero_02_true.png';
import hero3 from '../../assets/images/game/hero_03_true.png';
import hero4 from '../../assets/images/game/hero_04_true.png';
import monster1 from '../../assets/images/game/ogr_01_true.png';
import monster2 from '../../assets/images/game/ogr_02_true.png';
import monster3 from '../../assets/images/game/ogr_03_true.png';
import monster4 from '../../assets/images/game/ogr_04_true.png';
import portal from '../../assets/images/game/portal_true_90.png';
import room from '../../assets/images/game/room_128.png';
import background from '../../assets/images/game/back_2000.png';

/**
 *  ## USAGE
 * `import Images from './loaders/image';`
 * `import SomeImage from './assets/images/someImage.png';`
 * `new Sprite(Images[SomeImage]);`
 * @type {Object.<String, PIXI.Texture>}
 */
export let Images = {};

export default class ImagesLoader {

	constructor() {
		const loader = new PIXI.loaders.Loader();
		Object.keys({
			chest, door, doorInverted,
			hero1, hero2, hero3, hero4,
			monster1, monster2, monster3, monster4,
			portal, room, background,
		}).forEach((name) => { loader.add(name, imagesToLoad[name]); });
		loader.load((_, resources) => { Images = resources; });
	}

}
