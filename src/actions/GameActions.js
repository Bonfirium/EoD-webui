import GlobalReducer from '../reducers/GlobalReducer';
import GameReducer from '../reducers/GameReducer';
import { GAME_STATUSES, MONSTERS_COUNT } from '../helpers/constants';

export function startGame(staticData) {
	return (dispatch, getState) => {
		console.log(staticData);
		dispatch(GameReducer.actions.setStaticData(staticData));
		const {
			playersIds,
		} = staticData;
		console.log(staticData);
		// noinspection JSCheckFunctionSignatures
		dispatch(GameReducer.actions.setStatus(playersIds.indexOf(getState().user.id) < MONSTERS_COUNT
			? GAME_STATUSES.WAITING_FOR_HUMANS_START_POSITIONS : GAME_STATUSES.START_POSITION_SELECTION));
		dispatch(GlobalReducer.actions.onConnectedToGame());
	};
}
