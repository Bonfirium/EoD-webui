import * as PIXI from 'pixi.js';
import loadResources from './loaders';
import GameComponent from './components/game';
import { gen_test } from '../../gen_test_data';

require('babel-polyfill');

export default async (userOwnId, usersIds, moveCb, map = gen_test()) => {

	const pixiWidth = 992;
	const pixiHeight = 544;

	const app = new PIXI.Application(pixiWidth, pixiHeight);

	const gameContainer = document.getElementById('game-container');
	gameContainer.appendChild(app.view);

	await loadResources();

	const game = new GameComponent(map);

	const users = userOwnId || ['0xsadsadasdasds', '0xsadssdsds'];
	const ownUser = userOwnId || '0xsadsadasdasds';

	game.initGame(users);
	game.initUser(ownUser, moveCb);

	app.stage.addChild(game.container);

	return game;
};
