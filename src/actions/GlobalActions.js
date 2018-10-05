import GlobalReducer from '../reducers/GlobalReducer';
import BaseActionsClass from './BaseActionsClass';

class GlobalActionsClass extends BaseActionsClass {

	/** Initialize reducer
	 * @constructor
	 */
	constructor() {
		super(GlobalReducer);
	}


	/**
	 * Init app
	 * @returns {function(*=): Promise<any>}
	 */
	init() {
		return () => new Promise((resolve) => {
			resolve();
		});
	}

}

const GlobalActions = new GlobalActionsClass();
export default GlobalActions;
