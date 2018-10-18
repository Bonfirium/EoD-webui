import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import reducers from './reducers';

console.log(reducers);
const store = createStore(
	combineReducers(reducers),
	{},
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f,
	),
);

export default store;
