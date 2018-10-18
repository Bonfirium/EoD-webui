import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = {
	id: null,
	name: null,
	privateKey: null,
};

export default createModule({
	name: 'user',
	initialState: DEFAULT_FIELDS,
	transformations: {
		setData: {
			reducer: (state, { payload }) => ({
				...state,
				id: payload.id,
				name: payload.name,
				privateKey: payload.privateKey,
			}),
		},
	},
});
