import GlobalReducer from '../reducers/GlobalReducer';

export function onConnected() {
	return (dispatch) => dispatch(GlobalReducer.actions.onConnected());
}
