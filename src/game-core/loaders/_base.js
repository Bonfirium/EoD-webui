/**
 * @typedef {Object} PIXI_Resource
 * @property {PIXI.Texture|undefined} texture
 */

/** @abstract */
export default class BaseLoader {

	/**
	 * @abstract
	 * @param {PIXI.Loader} loader
	 * @param {Object.<String, PIXI_Resource>} resources
	 */
	onLoad(loader, resources) {
		// TODO: create custom NotImplemented error
		throw new Error('Not implemented');
	}

}
