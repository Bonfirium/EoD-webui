import { ChainStore } from 'echojs-lib';
import UserReducer from '../reducers/UserReducer';
import GlobalReducer from '../reducers/GlobalReducer';

export function login(privateKey) {
	return async (dispatch) => {
		const publicKey = privateKey.toPublicKey();
		const userId = await ChainStore.FetchChain('getAccountRefsOfKey', publicKey.toString())
			.then((res) => res.toJS()[0]);
		const userName = await ChainStore.FetchChain('getAccount', userId)
			.then((res) => res.toJS().name);
		dispatch(UserReducer.actions.setData({ id: userId, name: userName, privateKey: privateKey.toWif() }));
		dispatch(GlobalReducer.actions.onLogged());
	};
}
