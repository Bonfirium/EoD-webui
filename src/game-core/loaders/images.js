import * as PIXI from 'pixi.js';
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
 * @typedef {Object} Images
 * @property {PIXI.Texture} chest
 * @property {PIXI.Texture} door
 * @property {PIXI.Texture} doorInverted
 * @property {PIXI.Texture} hero1
 * @property {PIXI.Texture} hero2
 * @property {PIXI.Texture} hero3
 * @property {PIXI.Texture} hero4
 * @property {PIXI.Texture} monster1
 * @property {PIXI.Texture} monster2
 * @property {PIXI.Texture} monster3
 * @property {PIXI.Texture} monster4
 * @property {PIXI.Texture} portal
 * @property {PIXI.Texture} room
 * @property {PIXI.Texture} background
 */
export const Images = {};

export default function loadImages() {
	return new Promise((resolve) => {
		const loader = new PIXI.loaders.Loader();
		const imagesToLoad = {
			chest, door, doorInverted,
			hero1, hero2, hero3, hero4,
			monster1, monster2, monster3, monster4,
			portal, room, background,
		};
		Object.keys(imagesToLoad).forEach((name) => { loader.add(name, imagesToLoad[name]); });
		loader.load((_, resources) => {
			Object.keys(resources).forEach((name) => { Images[name] = resources[name].texture });
			resolve();
		});
	});

}
