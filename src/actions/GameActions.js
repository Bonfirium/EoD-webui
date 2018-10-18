import GlobalReducer from '../reducers/GlobalReducer';
import GameReducer from '../reducers/GameReducer';

export function startGame(staticData) {
	return (dispatch) => {
		console.log(staticData);
		dispatch(GameReducer.actions.setStaticData(staticData));
		const {
			chestsPositions,
			monstersPositions,
			playersIds,
			roomsPositions,
		} = staticData;
		dispatch(GlobalReducer.actions.onConnectedToGame());
	};
}
