import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	id: null,
};

export default createModule({
	name: 'user',
	initialState: DEFAULT_FIELDS,
	transformations: {
		setId: {
			reducer: (state, { payload }) => ({ ...state, id: payload.value }),
		},
	},
});
