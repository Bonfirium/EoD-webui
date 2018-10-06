import { EchoJSActions } from 'echojs-redux';
import { PrivateKey, ChainStore } from 'echojs-lib';

import GlobalReducer from '../reducers/GlobalReducer';

import BaseActionsClass from './BaseActionsClass';
import FormActions from './FormActions';
import ContractAction from './ContractAction';

import history from '../history';

import { MAIN_FORM } from '../constants/FormConstants';
import { START_PATH } from '../constants/GlobalConstants';

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
<<<<<<< HEAD
			// const privateKey = getState().form.getIn([MAIN_FORM, 'privateKey']);
			const privateKey ='5K5Xo4pKP8Wn5tivpJxEqVvD57XRokxkfHDercEkve7Am2QUKdo';
            
=======
			const privateKey = getState().form.getIn([MAIN_FORM, 'privateKey']);

>>>>>>> 888edc1d7d1949eee2a3ba60503e67a5bafc7283
			try {
				const publicKey = PrivateKey.fromWif(privateKey).toPublicKey().toString();
				const userId = await ChainStore.FetchChain('getAccountRefsOfKey', publicKey);
				if (!userId || !userId.toJS || !userId.toJS()[0]) {
					console.log('user not found');
					dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'User not found'));
					return;
				}

<<<<<<< HEAD
				userId = userId.toJS()[0];
				const user = await dispatch(EchoJSActions.fetch(userId));
				
=======
				const id = userId.toJS()[0];
				const user = await dispatch(EchoJSActions.fetch(id));

>>>>>>> 888edc1d7d1949eee2a3ba60503e67a5bafc7283
				dispatch(GlobalReducer.actions.setValue({ fields: ['user'], value: user }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['privateKey'], value: privateKey }));
				dispatch(GlobalReducer.actions.setValue({ fields: ['publicKey'], value: publicKey }));
				await dispatch(ContractAction.get_map())
				history.push(START_PATH);
			} catch (e) {
<<<<<<< HEAD
				console.log(e)
				dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'wrong key or login error' ));
			}
		};
    }
=======
				dispatch(FormActions.setFormValue(MAIN_FORM, ['error'], 'wrong key or login error'));
			}
		};
	}

>>>>>>> 888edc1d7d1949eee2a3ba60503e67a5bafc7283

}

const AuthActions = new AuthActionsClass();
export default AuthActions;
