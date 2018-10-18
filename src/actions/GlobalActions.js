import { Apis } from 'echojs-ws';
import { ChainStore } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

export function connect() {
	return async (dispatch) => {
		await Apis.instance('ws://195.201.164.54:37380', true).init_promise;
		await ChainStore.init();
		dispatch(GlobalReducer.actions.onConnected());
	}
}
