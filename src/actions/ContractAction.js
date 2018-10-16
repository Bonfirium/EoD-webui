// import { EchoJSActions } from 'echojs-redux';
import { PrivateKey, TransactionBuilder } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import history from '../history';
import gameInitialize from '../game-core/app';
import GlobalActions from './GlobalActions';

import {
	FIND_GAME,
	GET_MAP,
	GET_BALANCE,
	REGISTRATE,
	IN_POOL,
	GET_GAME_STATUS,
	MOVE,
} from '../constants/ContractCodeConstants';

const zero64String = '0000000000000000000000000000000000000000000000000000000000000000';
const receiver = '1.16.16355';


class ContractActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}

	getData() {
		return async (dispatch, getState) => {
			const state = getState();
			const user = state.global.getIn(['user']);
			if (Object.keys(user).length > 0 && user.toJS().id) {
				const inPoolRes = await dispatch(this.inPool());
				// const userLastGameId = await dispatch(this.userLastGameId());
				// const nextGameId = await dispatch(this.nextGameId());
				if (inPoolRes) {
					dispatch(GlobalActions.setValue(['isWait'], true));
					console.log('Wait');
					const game = await dispatch(this.getGame());
					console.log(game);
					const map = await dispatch(this.getMap(1));
					console.log(map);
				}

				if (!inPoolRes && state.global.get('gameId')) {
					dispatch(GlobalActions.setValue(['isWait'], false));
					console.log('Run motherfuka');
					GlobalActions.setValue(['gameId'], null);
					await dispatch(this.createGame());
				}

			}
		};
	}

	createGame(usersIds, map) {
		return async (dispatch, getState) => {
			const userId = getState().global.getIn(['user', 'id']);

			const moveCb = (x, y) => dispatch(this.makeMove(x, y));

			history.push('/game');

			const game = await new Promise((res) => {
				setTimeout(async () => { res(await gameInitialize(userId, usersIds, moveCb, map)); }, 1000);
			});


		};
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
			const user = getState().global.get('user').toJS();

			const { id: registrar } = user;

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

	registrateInPlatform() {
		return async (dispatch) => {

			try {
				await dispatch(this.callContract(REGISTRATE));
			} catch (e) {
				console.log(e);
			}
		};
	}

	findGame() {
		return async (dispatch, getState) => {

			try {
				const res = await dispatch(this.callContract(FIND_GAME));

				const resultId = res[0].trx.operation_results[0][1];
				const instance = getState().echojs.getIn(['system', 'instance']);
				const result = await instance.dbApi().exec('get_contract_result', [resultId]);
				if (result.exec_res.output.length <= 64) {
					GlobalActions.setValue(['gameId'], parseInt(result.exec_res.output, 16));
				}

				console.log(result);
			} catch (e) {
				console.log(e);
			}
		};
	}

	callConstant(code) {
		return async (dispatch, getState) => {
			const instance = getState().echojs.getIn(['system', 'instance']);
			const user = getState().global.get('user').toJS();

			const { id } = user;

			const queryResult = await this.getConstant(instance, id, code);

			return queryResult;
		};
	}

	getConstant(instance, account, code) {
		return instance.dbApi().exec(
			'call_contract_no_changing_state',
			[receiver, account, '1.3.0', code],
		);
	}


	getMap(lobbyId) {
		return async (dispatch) => {

			const code = `${GET_MAP}${this.to64HexString(lobbyId, 'int')}`;

			const queryResult = await dispatch(this.callConstant(code));
			return queryResult;
			// console.log(queryResult)
			// let end = 64;
			// const array = [];
			// while(end != queryResult.length + 64) {
			//     array.push(parseInt(queryResult.slice(end - 64, end), 16));
			//     end += 64;
			// };

			// const newArr = [];
			// while(array.length) newArr.push(array.splice(0, 16));
		};
	}

	getBalance() {
		return async (dispatch) => {

			const queryResult = await dispatch(this.callConstant(GET_BALANCE));
			return parseInt(queryResult, 16);
		};
	}

	isRegistred() {
		return async (dispatch) => {

			// TODO remove when new contract
			const code = '777e2a1b'; // is_registred()

			const queryResult = await dispatch(this.callConstant(code));
			return Boolean(parseInt(queryResult, 16));
		};
	}

	inPool() {
		return async (dispatch, getState) => {
			const state = getState();
			const userId = state.global.getIn(['user', 'id']);
			const address = this.to64HexString(userId, 'address');

			const queryResult = await dispatch(this.callConstant(`${IN_POOL}${address}`));
			return parseInt(queryResult, 16);
		};
	}

	getGame() {
		return async (dispatch, getState) => {
			const state = getState();
			const gameId = state.global.get('gameId');

			const code = `${GET_GAME_STATUS}${this.to64HexString(gameId, 'int')}`;

			const queryResult = await dispatch(this.callConstant(code));
			return queryResult;
		};
	}

	makeMove(x, y) {
		return async (dispatch, getState) => {
			const state = getState();
			let gameId = state.global.get('gameId') || 1;

			gameId = this.to64HexString(gameId, 'int');
			x = this.to64HexString(x, 'int');
			y = this.to64HexString(y, 'int');

			// todo refactor when method ll be ready
			const code = `${MOVE}${gameId}${x}${y}`; // make move ???

			// return dispatch(this.callContant(code));
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
