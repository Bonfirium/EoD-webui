import * as PIXI from 'pixi.js';
import loadResources from './loaders';
import GameComponent from './components/game';
import { gen_test } from '../../gen_test_data';

require('babel-polyfill');

export default async (
	userOwnId = '0xsadssdsds',
	usersPositions,
	userIds,
	treasures = [],
	moveCb = () => {},
	closeCb = () => {},
	vector = gen_test(),
) => {

	const pixiWidth = 992;
	const pixiHeight = 544;

	const app = new PIXI.Application(pixiWidth, pixiHeight);

	const gameContainer = document.getElementById('game-container');
	gameContainer.appendChild(app.view);

	await loadResources();

	userOwnId = Number(userOwnId.slice(4));
	const userIndex = userIds.findIndex((id) => id === userOwnId);
	const game = new GameComponent(vector, treasures, userIndex);

	game.initGame(usersPositions);
	game.initUser(userIndex, moveCb);

	app.stage.addChild(game.container);

	return game;
};
