import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	isConnected: false,
	isLogged: false,
};

export default createModule({
	name: 'global',
	initialState: DEFAULT_FIELDS,
	transformations: {
		onConnected: {
			reducer: (state) => ({ ...state, isConnected: true }),
		},
	},
});
