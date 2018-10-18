import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	chestsPositions: null,
	monstersPositions: null,
	playersIds: null,
	roomsPositions: null,
};

export default createModule({
	name: 'game',
	initialState: DEFAULT_FIELDS,
	transformations: {
		setStaticData: {
			reducer: (state, payload) => ({
				...state,
				chestsPositions: payload.chestsPositions,
				monstersPositions: payload.monstersPositions,
				playersIds: payload.playersIds,
				roomsPositions: payload.roomsPositions,
			}),
		},
	},
});
