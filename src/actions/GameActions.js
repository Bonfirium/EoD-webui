import GlobalReducer from '../reducers/GlobalReducer';
import GameReducer from '../reducers/GameReducer';
import { GAME_STATUSES, MONSTERS_COUNT } from '../helpers/constants';

export function startGame(staticData) {
	return (dispatch) => {
		console.log(staticData);
		dispatch(GameReducer.actions.setStaticData(staticData));
		console.log(staticData);
		setStatus(staticData.userIndex < MONSTERS_COUNT
			? GAME_STATUSES.WAITING_FOR_HUMANS_START_POSITIONS : GAME_STATUSES.START_POSITION_SELECTION)(dispatch);
		dispatch(GlobalReducer.actions.onConnectedToGame());
	};
}

export function setState(state) {
	return (dispatch) => dispatch(GameReducer.actions.setState(state));
}

export function setStatus(status) {
	// noinspection JSCheckFunctionSignatures
	return (dispatch) => dispatch(GameReducer.actions.setStatus(status));
}
