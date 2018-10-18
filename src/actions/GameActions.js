import GlobalReducer from '../reducers/GlobalReducer';
import GameReducer from '../reducers/GameReducer';

export function startGame(staticData) {
	return (dispatch) => {
		dispatch(GlobalReducer.actions.onConnectedToGame());
		dispatch(GameReducer.actions.setStaticData(staticData));
		const {
			chestsPositions,
			monstersPositions,
			playersIds,
			roomsPositions,
		} = staticData;
	};
}
