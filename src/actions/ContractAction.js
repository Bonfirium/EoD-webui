// import { EchoJSActions } from 'echojs-redux';
import {PrivateKey, TransactionBuilder} from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import history from '../history';
import gameInitialize from '../game-core/app';
import GlobalActions from './GlobalActions';

import {
	FIND_GAME,
	GET_GAME_STATE,
	GET_STATIC_DATA,
	GET_NEXT_GAME_ID,
	MOVE,
} from '../constants/ContractCodeConstants';

import {START_PATH, GAME_PATH} from '../constants/GlobalConstants';

const zero64String = '0000000000000000000000000000000000000000000000000000000000000000';

const receiver = '1.16.16731';

const WIDTH = 11;
const PLAYERS_COUNT = 2;
const TREASURES_COUNT = 5;


class ContractActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);

		// history.push(GAME_PATH);

		// setTimeout(async () => {
		// 	(await gameInitialize('hhh', undefined, []));
		// }, 1000);

	}

	getData() {
		return async (dispatch, getState) => {
			const state = getState();
			const userId = state.global.getIn(['user', 'id']);
			if (!userId) return;

			const inSearch = state.global.get('inSearch');
			const inGame = state.global.get('inGame');
			const gameId = state.global.get('gameId');
			const nexGameId = await dispatch(this.getNextGameId());

			if (nexGameId === gameId) {
				dispatch(GlobalActions.setValue(['inSearch'], true));
				return;
			}

			if (inSearch && (nexGameId > gameId)) {

				const {
					positions: map, players, treasures, addresses,
				} = await dispatch(this.getStaticData(gameId));

				dispatch(GlobalActions.setValue(['inSearch'], false));
				dispatch(GlobalActions.setValue(['inGame'], true));

				await dispatch(this.createGame(players, treasures, map));
				return;
			}

			if (inGame) {
				const { status, players, treasures } = await dispatch(this.getGameState());
			}

		};
	}

	createGame(usersIds, treasures, map) {
		return async (dispatch, getState) => {
			const userId = getState().global.getIn(['user', 'id']);

			const moveCb = (x, y) => dispatch(this.makeMove(x, y));
			const closeCb = () => dispatch(this.finishGame());

			history.push(GAME_PATH);

			const game = await new Promise((res) => {
				setTimeout(async () => {
					res(await gameInitialize(userId, usersIds, treasures, moveCb, closeCb, map));
				}, 1000);
			});

			return game;
		};
	}

	getConstant(instance, account, code) {
		return instance.dbApi().exec(
			'call_contract_no_changing_state',
			[receiver, account, '1.3.0', code],
		);
	}

	async buildAndSendTransaction(operation, options, privateKey) {
		privateKey = PrivateKey.fromWif(privateKey);
		const tr = new TransactionBuilder();

		tr.add_type_operation(operation, options);

		await tr.set_required_fees(options.asset_id);
		tr.add_signer(privateKey);

		return tr.broadcast();
	}

	callContract(code) {
		return async (dispatch, getState) => {
			const registrar = getState().global.getIn(['user', 'id']);

			if (!registrar) {
				return;
			}

			const privateKey = getState().global.get('privateKey');
			const options = {
				registrar,
				receiver,
				asset_id: '1.3.0',
				value: 0,
				gasPrice: 0,
				gas: 4700000,
				code,
			};

			try {
				const res = await this.buildAndSendTransaction('contract', options, privateKey);
				return res;
			} catch (e) {
				console.log(e);
			}
		};
	}

	callConstant(code) {
		return async (dispatch, getState) => {
			const instance = getState().echojs.getIn(['system', 'instance']);
			const id = getState().global.getIn(['user', 'id']);

			if (!id) return null;

			const queryResult = await this.getConstant(instance, id, code);

			return queryResult;
		};
	}

	getResult(resultId) {
		return async (dispatch, getState) => {

			try {
				const instance = getState().echojs.getIn(['system', 'instance']);
				const result = await instance.dbApi().exec('get_contract_result', [resultId]);
				return result;
			} catch (e) {
				console.log(e);
			}
		};
	}

	findGame() {
		return async (dispatch) => {

			try {
				const res = await dispatch(this.callContract(FIND_GAME)); // int next_game_id

				const resultId = res[0].trx.operation_results[0][1];
				const result = await dispatch(this.getResult(resultId));

				if (result.exec_res.output.length <= 64) {
					dispatch(GlobalActions.setValue(['gameId'], parseInt(result.exec_res.output, 16)));
					dispatch(GlobalActions.setValue(['inSearch'], true));
				}

				// console.log(result);
			} catch (e) {
				console.log(e);
			}
		};
	}

	makeMove(x, y) {
		return async (dispatch, getState) => {
			const state = getState();
			let gameId = state.global.get('gameId');

			if (!gameId) return;

			gameId = this.to64HexString(gameId, 'int');
			const point = this.to64HexString((x + (y * WIDTH)), 'int');

			const code = `${MOVE}${gameId}${point}`;
			// dispatch(this.callContant(code));
		};
	}

	getNextGameId() {
		return async (dispatch) => {

			const queryResult = await dispatch(this.callConstant(GET_NEXT_GAME_ID));

			return parseInt(queryResult, 16); // int next_game_id
		};
	}

	getStaticData(gameId) {
		return async (dispatch) => {

			if (gameId === null) return null;

			const code = `${GET_STATIC_DATA}${this.to64HexString(gameId, 'int')}`;

			const queryResult = await dispatch(this.callConstant(code));


			const arr = [];
			for (let i = 0; i < queryResult.length; i += 64) {
				arr.push(parseInt(queryResult.slice(i, i + 64), 16));
			}
			arr.shift();

			const players = new Array(PLAYERS_COUNT / 2).fill(0).concat(arr.splice(0, PLAYERS_COUNT / 2));

			const treasures = arr.splice(0, TREASURES_COUNT);

			const addresses = arr.splice(0, PLAYERS_COUNT);

			arr.shift();
			const positions = arr;

			return {
				positions, players, treasures, addresses,
			};
		};
	}

	getGameState() {
		return async (dispatch, getState) => {
			const gameId = getState().global.get('gameId');

			if (gameId === null) return null;
			const code = `${GET_GAME_STATE}${this.to64HexString(gameId, 'int')}`;

			const queryResult = await dispatch(this.callConstant(code));

			if (!queryResult) return '';


			const arr = [];
			for (let i = 0; i < queryResult.length; i += 64) {
				arr.push(parseInt(queryResult.slice(i, i + 64), 16));
			}
			const status = arr.shift();

			const players = arr.splice(0, PLAYERS_COUNT);

			const treasures = arr;

			return { status, players, treasures };
		};
	}

	finishGame() {
		return async (dispatch) => {
			dispatch(GlobalActions.setValue(['inGame'], false));
			history.push(START_PATH);
		};
	}

	to64HexString(v, type) {

		switch (type) {
			case 'int': {
				return Number(v).toString(16).padStart(64, '0');
			}
			case 'address': {
				return Number(v.substr(v.lastIndexOf('.') + 1)).toString(16).padStart(64, '0');
			}
			default:
				return zero64String;
		}
	}

}

const ContractActions = new ContractActionsClass();
export default ContractActions;
