import BN from 'bignumber.js';
import { PrivateKey, TransactionBuilder } from 'echojs-lib';
import { Apis } from 'echojs-ws';

import comprehension from '../helpers/comprehension';
import { startGame } from './GameActions';

const contractId = '1.16.16747';
const MAP_WIDTH = 11;
const MONSTERS_COUNT = 1;
const CHESTS_COUNT = 5;
const PLAYERS_COUNT = 2;

export const CODES = {
	FIND_GAME: '1ca1841c', // find_game()
	GET_NEXT_GAME_ID: 'd392d1ce', // get_next_game_id()
	GET_STATIC_GAME_DATA: 'b307b7e9', // get_static_game_date(uint24)
};

export function view(userId, code, args = '') {
	return Apis.instance().dbApi().exec(
		'call_contract_no_changing_state',
		[contractId, userId, '1.3.0', code + args]
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

export function findGame({ onBroadcast, onGetGameId, onFullGame } = {}) {
	return async (dispatch, getState) => {
		const userId = getState().user.id;
		const privateKey = PrivateKey.fromWif(getState().user.privateKey);
		const pureGameId = await call(userId, privateKey, CODES.FIND_GAME, '', onBroadcast);
		if (onGetGameId) onGetGameId();
		while (true) {
			const nextGameId = await view(userId, CODES.GET_NEXT_GAME_ID);
			if (nextGameId !== pureGameId) break;
			await new Promise((resolve) => setTimeout(() => resolve(), 2000));
		}
		if (onFullGame) onFullGame();
		const pureStatic = await view(userId, CODES.GET_STATIC_GAME_DATA, pureGameId);
		const roomsPositions = [];
		for (let i = (MONSTERS_COUNT + CHESTS_COUNT + PLAYERS_COUNT + 2) * 64; i < pureStatic.length; i += 64) {
			roomsPositions.push(parseCoord(Number.parseInt(pureStatic.substr(i, 64), 16)));
		}
		await dispatch(startGame({
			monstersPositions: parseCoords(comprehension(MONSTERS_COUNT, (index) =>
				Number.parseInt(pureStatic.substr(index * 64 + 64, 64), 16))),
			chestsPositions: parseCoords(comprehension(CHESTS_COUNT, (index) =>
				Number.parseInt(pureStatic.substr((index + MONSTERS_COUNT + 1) * 64, 64), 16))),
			playersIds: comprehension(PLAYERS_COUNT, (index) =>
				'1.2.' +
				new BN(pureStatic.substr((index + MONSTERS_COUNT + CHESTS_COUNT + 1) * 64, 64), 16).toString()),
			roomsPositions,
		}));
	}
}
