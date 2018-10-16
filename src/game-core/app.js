import * as PIXI from 'pixi.js';
import loadResources from './loaders';
import GameComponent from './components/game';
import { gen_test } from '../../gen_test_data';

require('babel-polyfill');

export default async (
	userOwnId = '0xsadssdsds',
	usersIds,
	moveCb = () => {},
	map = gen_test(),
) => {

	const pixiWidth = 992;
	const pixiHeight = 544;

	const app = new PIXI.Application(pixiWidth, pixiHeight);

	const gameContainer = document.getElementById('game-container');
	gameContainer.appendChild(app.view);

	await loadResources();

	const game = new GameComponent(map);

	const users = usersIds || ['0xsadsadasdasds', userOwnId];
	const ownUser = userOwnId;

	game.initGame(users);
	game.initUser(ownUser, moveCb);

	app.stage.addChild(game.container);

	return game;
};
