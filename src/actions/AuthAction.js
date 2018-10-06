import { EchoJSActions } from 'echojs-redux';
import { PrivateKey, ChainStore } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import FormActions from './FormActions';

import history from '../history'

import { MAIN_FORM } from '../constants/FormConstants';
import { MAIN_PATH } from '../constants/GlobalConstants';

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
            const privateKey = getState().form.getIn([MAIN_FORM, 'privateKey']);
            
			try {
				const publicKey = PrivateKey.fromWif(privateKey).toPublicKey().toString();
				let userId = await ChainStore.FetchChain('getAccountRefsOfKey', publicKey);
				if (!userId || !userId.toJS || !userId.toJS()[0]) {
					console.log('user nnot found')
					dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'User not found' ));
					return;
				}

				userId = userId.toJS()[0];
				const user = await dispatch(EchoJSActions.fetch(userId));

				dispatch(GlobalReducer.actions.setValue({ fields: ['user'], value: user }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['privateKey'], value: privateKey }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['publicKey'], value: publicKey }));

				history.push(MAIN_PATH);
			} catch (e) {
				dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'wrong key or login error' ));
			}
		};
    }
    
    

}

const AuthActions = new AuthActionsClass();
export default AuthActions;
