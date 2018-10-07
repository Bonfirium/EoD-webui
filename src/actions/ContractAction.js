
// import { EchoJSActions } from 'echojs-redux';
// import { PrivateKey, ChainStore, TransactionBuilder } from 'echojs-lib';
import { keccak256 } from 'js-sha3';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import ContractAction from './ContractAction';
// import FormActions from './FormActions';

// import history from '../history';

// import { MAIN_FORM } from '../constants/FormConstants';
// import { START_PATH } from '../constants/GlobalConstants';

class ContractActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}

	getData(subscribeObject) {
		return async (dispatch) => {
			if (subscribeObject.type === 'block') {
				await dispatch(ContractAction.getMap());
			}
		};
	}

	callContract() {
		// return async (dispatch, getState) => {

		//     const user = getState().global.get('user');
		//     const { name: activeUserName, id: activeUserId } = user;

		//     const contractId = '1.16.16189';

		//     // check exist account and contract
		//     if (!activeUserId || !activeUserName || !contractId) {
		//         return;
		//     }

		//     const targetFunction = {
		//         "constant": true,
		//         "inputs": [],
		//         "name": "getMap",
		//         "outputs": [
		//             {
		//                 "name": "",
		//                 "type": "uint8[16][30]"
		//             }
		//         ],
		//         "payable": false,
		//         "stateMutability": "pure",
		//         "type": "function"
		//     };

		//     if (!targetFunction) {
		//         return;
		//     }

		//     const args = targetFunction.inputs.map((i) => {
		//         const { name: field } = i;
		//         const { value } = functionForm.inputs[field];
		//         return value;
		//     });

		//     const pubKey = getState().global.get('publicKey');
		//     if (!pubKey) {
		//         return;
		//     }

		//     let amountValue = 0;


		//     const privateKey = getState().global.get('privateKey');
		//     const bytecode = getMethod(targetFunction, args);

		//     const options = {
		//         registrar: activeUserId,
		//         receiver: contractId,
		//         asset_id: fee.asset.id,
		//         value: amountValue,
		//         gasPrice: 0,
		//         gas: 4700000,
		//         code: bytecode,
		//     };

		//     TransactionBuilder
		// }
	}

	getMethodId(method) {
		const inputs = method.inputs.map((input) => input.type).join(',');

		return keccak256(`${method.name}(${inputs})`).substr(0, 8);
	}


	getConstant(instance, contract, account, code) {
		return instance.dbApi().exec(
			'call_contract_no_changing_state',
			[contract, account, '1.3.0', code],
		);
	}

	getMap() {
		return async (dispatch, getState) => {

			const instance = getState().echojs.getIn(['system', 'instance']);
			const user = getState().global.get('user').toJS();

			const { id } = user;
			const contractId = '1.16.16189';
			const code = 'd1f8d8fc';

			const queryResult = await this.getConstant(instance, contractId, id, code);

			let end = 64;
			const array = [];
			while (end !== queryResult.length + 64) {
				array.push(parseInt(queryResult.slice(end - 64, end), 16));
				end += 64;
			}

			const newArr = [];
			while (array.length) newArr.push(array.splice(0, 16));
		};
	}


	contractQuery() {
		return async (dispatch, getState) => {

			const instance = getState().echojs.getIn(['system', 'instance']);

			const user = getState().global.get('user').toJS();
			const { id } = user;
			const contractId = '1.16.16189';
			const method = 'getMap';
			const args = [];
			const code = this.getMethodId({ name: method, inputs: args });
			const queryResult = await this.getContractProp(
				instance,
				contractId,
				id,
				code,
			);

			console.log(queryResult, typeof queryResult);
		};
	}


}

const ContractActions = new ContractActionsClass();
export default ContractActions;
