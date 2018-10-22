import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	status: null,
	id: null,
	userIndex: null,
	chestsPositions: null,
	monstersPositions: null,
	humansPositions: null,
	playersIds: null,
	roomsPositions: null,
};

export default createModule({
	name: 'game',
	initialState: DEFAULT_FIELDS,
	transformations: {
		setStaticData: {
			reducer: (state, { payload }) => ({
				...state,
				userIndex: payload.userIndex,
				id: payload.id,
				chestsPositions: payload.chestsPositions,
				monstersPositions: payload.monstersPositions,
				playersIds: payload.playersIds,
				roomsPositions: payload.roomsPositions,
			}),
		},
		setState: {
			reducer: (state, { payload: { humansPositions, monstersPositions } }) =>
				({ ...state, humansPositions, monstersPositions }),
		},
		setStatus: (state, { payload }) => ({
			...state,
			status: payload,
		}),
	},
});
