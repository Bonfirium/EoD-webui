// import { EchoJSActions } from 'echojs-redux';
import { PrivateKey, TransactionBuilder } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import history from '../history';
import gameInitialize from '../game-core/app';

const receiver = '1.16.16209';


class ContractActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}

	getData(subscribeObject) {
		return async (dispatch, getState) => {
			if (subscribeObject.type === 'block') {
				const state = getState();
				const user = state.global.getIn(['user']);
				if (user && user.id) {
					console.log(user);
					// const nextGameId = await dispatch(ContractAction.nextGameId());
					// const userLastGameId = await dispatch(ContractAction.userLastGameId());
				}
			}
		};
	}

	async createGame() {
		history.push('/game');
		await gameInitialize();
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

	registrInPlatform() {
		return async (dispatch, getState) => {

			const code = '1d1f523d'; // registrate()

			try {
				await dispatch(this.callContract(code));
			} catch (e) {
				console.log(e);
			}
		};
	}

	findGame() {
		return async (dispatch, getState) => {

			const code = '1ca1841c'; //  find_game()
			try {
				const res = await dispatch(this.callContract(code));
				const resultId = res[0].trx.operation_results[0][1];
				const instance = getState().echojs.getIn(['system', 'instance']);
				const result = await instance.dbApi().exec('get_contract_result', [resultId]);
				// .exec_res.new_address;

				console.log(result);
			} catch (e) {
				console.log(e);
			}
		};
	}

	callContant(code) {
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


	get_map(lobbyId) {
		return async (dispatch) => {

			const code = `09307b89${Number(lobbyId).toString(16).padStart(64, '0')}`; // get_map(uint64)

			const queryResult = await dispatch(this.callContant(code));
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
			const code = 'b69ef8a8'; // balance()

			const queryResult = await dispatch(this.callContant(code));
			return parseInt(queryResult, 16);
		};
	}

	isRegistred() {
		return async (dispatch) => {
			const code = '777e2a1b'; // is_registred()

			const queryResult = await dispatch(this.callContant(code));
			return Boolean(parseInt(queryResult, 16));
		};
	}

	nextGameId() {
		return async (dispatch) => {
			const code = 'd392d1ce'; // get_next_game_id()

			const queryResult = await dispatch(this.callContant(code));
			return parseInt(queryResult, 16);
		};
	}

	userLastGameId() {
		return async (dispatch) => {
			const code = 'c4bd63bd'; // last_game_id()

			const queryResult = await dispatch(this.callContant(code));
			return parseInt(queryResult, 16);
		};
	}

}

const ContractActions = new ContractActionsClass();
export default ContractActions;
