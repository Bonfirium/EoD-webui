import GameReducer from './GameReducer';
import GlobalReducer from './GlobalReducer';
import UserReducer from './UserReducer';

export default {
	game: GameReducer.reducer,
	global: GlobalReducer.reducer,
	user: UserReducer.reducer,
}
