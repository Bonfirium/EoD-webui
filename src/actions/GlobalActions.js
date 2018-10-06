/* eslint-disable no-undef */
import { EchoJSActions } from 'echojs-redux';

import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';

class GlobalActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}


	/**
	 * Init app
	 * @returns {function(*=): Promise<any>}
	 */
	init() {
		return () => new Promise((resolve) => {
			resolve();
		});
	}

	/**
	 *
	 * @param {String} address
	 * @return {function(*)}
	 */
	connect() {
		return async (dispatch) => {
			dispatch(GlobalReducer.actions.setValue({ fields: ['node_address'], value: __NODE_ADDRESS_EXTRA__ }));
			try {
				await dispatch(EchoJSActions.connect(__NODE_ADDRESS_EXTRA__));
			} catch (e) {
				console.log('could not connected');
				// push error to view
			}
		};
	}

}

const GlobalActions = new GlobalActionsClass();
export default GlobalActions;
