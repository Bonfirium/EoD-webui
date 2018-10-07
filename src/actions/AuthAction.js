import { EchoJSActions } from 'echojs-redux';
import { PrivateKey, ChainStore } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import FormActions from './FormActions';
import ContractAction from './ContractAction';

import history from '../history';

import { MAIN_FORM } from '../constants/FormConstants';
import { START_PATH } from '../constants/GlobalConstants';
import GlobalActions from './GlobalActions';

class AuthActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}


	/**
	 *
	 * @return {function(*)}
	 */
	login() {

		return async (dispatch, getState) => {

			// const privateKey = getState().form.getIn([MAIN_FORM, 'privateKey']);
			const privateKey = '5K5Xo4pKP8Wn5tivpJxEqVvD57XRokxkfHDercEkve7Am2QUKdo';
			try {
				const publicKey = PrivateKey.fromWif(privateKey).toPublicKey().toString();
				let userId = await ChainStore.FetchChain('getAccountRefsOfKey', publicKey);
				if (!userId || !userId.toJS || !userId.toJS()[0]) {
					dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'User not found'));
					return;
				}

				userId = userId.toJS()[0];
				const user = await dispatch(EchoJSActions.fetch(userId));

				dispatch(GlobalReducer.actions.setValue({ fields: ['user'], value: user }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['privateKey'], value: privateKey }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['publicKey'], value: publicKey }));


				const isRegistred = await dispatch(ContractAction.isRegistred());

				if (!isRegistred) {
					await dispatch(ContractAction.registrInPlatform());
				}

				history.push(START_PATH);
			} catch (e) {
				dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'wrong key or login error'));
			}
		};
	}

	getAccountInfo() {
		return async (dispatch, getState) => {

			try {
				const user = getState().global.getIn(['user']).toJS();
				if (!user || !user.id) {
					dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'User not found'));
					return;
				}
				const balance = await dispatch(ContractAction.getBalance());
				dispatch(GlobalActions.setValue('balance', balance));
			} catch (e) {
				dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'wrong key or login error'));
			}
		};
	}

	startGame() {
		return async (dispatch) => {
			console.log(await dispatch(ContractAction.userLastGameId()));

			await dispatch(ContractAction.findGame());
			console.log(await dispatch(ContractAction.userLastGameId()));


		};
	}

}

const AuthActions = new AuthActionsClass();
export default AuthActions;
