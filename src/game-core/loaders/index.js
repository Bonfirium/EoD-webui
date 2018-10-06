import ImagesLoader from './images';

const loadersConstructors = [
	ImagesLoader,
];

export default function load() {
	return new Promise((resolve) => {
		const loaders = loadersConstructors.map((_class) => new _class());
		PIXI.loader.load((loader, resources) => {
			loaders.forEach((loader) => loader.onLoad(loader, resources));
			resolve();
		});
	});
}
