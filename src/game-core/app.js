require("babel-polyfill");
import * as PIXI from 'pixi.js';
import loadResources from './loaders';
import GameComponent from './components/game';

export default async () => {
// noinspection JSValidateTypes
	/** @type {PIXI.Application} */
	const pixiWidth = 960;
	const pixiHeight = 512;
	const app = new PIXI.Application(pixiWidth, pixiHeight);
	app.renderer.backgroundColor = 0x484848;
	const gameContainer = document.getElementById('game-container');
	gameContainer.appendChild(app.view);

	await loadResources();
	app.stage.addChild(new GameComponent(pixiWidth, pixiHeight).container);
};
