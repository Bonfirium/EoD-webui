import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	isConnected: false,
	isLogged: false,
	isInGame: false,
};

export default createModule({
	name: 'global',
	initialState: DEFAULT_FIELDS,
	transformations: {
		onConnected: {
			reducer: (state) => ({ ...state, isConnected: true }),
		},
		onLogged: {
			reducer: (state) => ({ ...state, isLogged: true }),
		},
		onConnectedToGame: {
			reducer: (state) => ({ ...state, isInGame: true }),
		},
	},
});
