import BN from 'bignumber.js';
import { PrivateKey, TransactionBuilder } from 'echojs-lib';
import { Apis } from 'echojs-ws';

import comprehension from '../helpers/comprehension';
import { setState, setStatus, startGame } from './GameActions';
import { D12, GAME_STATUSES } from '../helpers/constants';

const contractId = '1.16.16761';
const MAP_WIDTH = 11;
const MONSTERS_COUNT = 1;
const CHESTS_COUNT = 5;
const PLAYERS_COUNT = 2;

export const CODES = {
	FIND_GAME: '1ca1841c', // find_game()
	GET_NEXT_GAME_ID: 'd392d1ce', // get_next_game_id()
	GET_STATIC_GAME_DATA: 'b307b7e9', // get_static_game_date(uint24)
	GET_GAME_STATE: 'a15c98db', // get_game_state(uint24)
	MOVE: '001c7b7d', // move(uint24,uint16)
};

export const CONTRACT_STATUSES = {
	NEW: 0,
	MONSTERS: 1,
	HUMANS: 2,
};

export function view(userId, code, args = '') {
	return Apis.instance().dbApi().exec(
		'call_contract_no_changing_state',
		[contractId, userId, '1.3.0', code + args],
	);
}

export async function call(userId, privateKey, code, args = '', onBroadcast = null) {
	const transaction = new TransactionBuilder();
	transaction.add_type_operation('contract', {
		registrar: userId,
		receiver: contractId,
		asset_id: '1.3.0',
		value: 0,
		gas: 4.7e6,
		gasPrice: 0,
		code: code + args,
	});
	await transaction.set_required_fees('1.3.0');
	transaction.add_signer(privateKey);
	const broadcast_result = await transaction.broadcast();
	if (onBroadcast) onBroadcast();
	const resultId = broadcast_result[0].trx.operation_results[0][1];
	return await Apis.instance().dbApi().exec('get_contract_result', [resultId])
		.then((res) => res.exec_res.output);
}

export function parseCoord(coord) {
	return { x: coord % MAP_WIDTH, y: Math.floor(coord / MAP_WIDTH), id: coord };
}

export function parseCoords(coords) {
	return coords.map((coord) => parseCoord(coord));
}

function canSelectRoom(x, y, getState) {
	const id = x + y * MAP_WIDTH;
	const gameState = getState().game;
	const isMonster = gameState.userIndex < MONSTERS_COUNT;
	switch (gameState.status) {
		case GAME_STATUSES.START_POSITION_SELECTION:
			if (!gameState.roomsPositions.some(({ id: _id }) => _id === id)) return false;
			if (gameState.chestsPositions.find(({ id: _id }) => _id === id)) return false;
			if (gameState.monstersPositions.find(({ id: _id }) => _id === id)) return false;
			return D12.every(({ dx, dy }) => {
				const x1 = x + dx;
				const y1 = y + dy;
				const id1 = x1 + y1 * MAP_WIDTH;
				return gameState.monstersPositions.find(({ id: _id }) => _id !== id1);
			});
		case GAME_STATUSES.MOVE_POSITION_SELECTION: {
			if (!gameState.roomsPositions.some(({ id: _id }) => _id === id)) return false;
			const {
				x: selfX,
				y: selfY,
			} = isMonster ? gameState.monstersPositions[0] : gameState.humansPositions[0];
			return D12.some(({ dx, dy }) => {
				const x1 = selfX + dx;
				const y1 = selfY + dy;
				const id1 = x1 + y1 * MAP_WIDTH;
				return id1 === id;
			});
		}
		default:
			throw new Error(`Unknown game status ${this.props.status}`);
	}
}

function prepareArgument(arg) {
	return comprehension(64 - arg.length, () => '0').join('') + arg;
}

export function move(x, y, { onValidate, onBroadcast }) {
	return async (dispatch, getState) => {
		if (!canSelectRoom(x, y, getState)) return;
		/** @type Number */
		const roomId = x + y * MAP_WIDTH;
		const args = prepareArgument(getState().game.id.toString(16)) + prepareArgument(roomId.toString(16));
		if (onValidate) onValidate();
		await call(getState().user.id, PrivateKey.fromWif(getState().user.privateKey), CODES.MOVE, args, onBroadcast);
	};
}

export function getGameState() {
	return async (dispatch, getState) => {
		/** @type Number */
		const gameId = getState().game.id;
		const state = await view(getState().user.id, CODES.GET_GAME_STATE, prepareArgument(gameId.toString(16)));
		const res = [];
		for (let i = 0; i < 3; i++) {
			res.push(Number.parseInt(state.substr(i * 64, 64), 16));
		}
		const [status, monsterPositions, humanPositions] = res;
		console.log(status);
		switch (status) {
			case CONTRACT_STATUSES.NEW:
				break;
			case CONTRACT_STATUSES.MONSTERS: {
				const isMonster = getState().game.userIndex < MONSTERS_COUNT;
				if (
					(isMonster && [
						GAME_STATUSES.WAITING_FOR_HUMANS_START_POSITIONS,
						GAME_STATUSES.WAITING_FOR_OPPONENTS_MOVE,
					].includes(getState().game.status)) ||
					(!isMonster)
				) {
					setStatus(getState().game.userIndex < MONSTERS_COUNT ?
						GAME_STATUSES.MOVE_POSITION_SELECTION : GAME_STATUSES.WAITING_FOR_OPPONENTS_MOVE)(dispatch);
				}
				break;
			}
			case CONTRACT_STATUSES.HUMANS: {
				const isMonster = getState().game.userIndex < MONSTERS_COUNT;
				if (
					(!isMonster && getState().game.status === GAME_STATUSES.WAITING_FOR_OPPONENTS_MOVE) ||
					(isMonster)
				) {
					setStatus(getState().game.userIndex < MONSTERS_COUNT ?
						GAME_STATUSES.WAITING_FOR_OPPONENTS_MOVE : GAME_STATUSES.MOVE_POSITION_SELECTION)(dispatch);
				}
				break;
			}
			default:
				throw new Error('Not implemented');
		}
		setState({
			humansPositions: [{
				id: humanPositions,
				x: humanPositions % MAP_WIDTH,
				y: Math.floor(humanPositions / MAP_WIDTH),
			}],
			monstersPositions: [{
				id: monsterPositions,
				x: monsterPositions % MAP_WIDTH,
				y: Math.floor(monsterPositions / MAP_WIDTH),
			}],
		})(dispatch);
	};
}

export function startStateUpdater(dispatch) {
	setTimeout(() => dispatch(getGameState()).then(() => startStateUpdater(dispatch)), 1000);
}

export function findGame({ onBroadcast, onGetGameId, onFullGame } = {}) {
	return async (dispatch, getState) => {
		const userId = getState().user.id;
		const privateKey = PrivateKey.fromWif(getState().user.privateKey);
		const pureGameId = await call(userId, privateKey, CODES.FIND_GAME, '', onBroadcast);
		if (onGetGameId) onGetGameId();
		while (true) {
			const nextGameId = await view(userId, CODES.GET_NEXT_GAME_ID);
			if (nextGameId !== pureGameId) break;
			await new Promise((resolve) => setTimeout(() => resolve(), 1000));
		}
		if (onFullGame) onFullGame();
		const pureStatic = await view(userId, CODES.GET_STATIC_GAME_DATA, pureGameId);
		const roomsPositions = [];
		for (let i = (MONSTERS_COUNT + CHESTS_COUNT + PLAYERS_COUNT + 2) * 64; i < pureStatic.length; i += 64) {
			roomsPositions.push(parseCoord(Number.parseInt(pureStatic.substr(i, 64), 16)));
		}
		const playersIds = comprehension(PLAYERS_COUNT, (index) =>
			'1.2.' +
			new BN(pureStatic.substr((index + MONSTERS_COUNT + CHESTS_COUNT + 1) * 64, 64), 16).toString());
		startStateUpdater(dispatch);
		await dispatch(startGame({
			userIndex: playersIds.indexOf(userId),
			monstersPositions: parseCoords(comprehension(MONSTERS_COUNT, (index) =>
				Number.parseInt(pureStatic.substr(index * 64 + 64, 64), 16))),
			chestsPositions: parseCoords(comprehension(CHESTS_COUNT, (index) =>
				Number.parseInt(pureStatic.substr((index + MONSTERS_COUNT + 1) * 64, 64), 16))),
			playersIds,
			roomsPositions,
			id: Number.parseInt(pureGameId, 16),
		}));
	};
}
