
export const MAP_WIDTH = 11;
export const MAP_HEIGHT = 11;
export const MONSTERS_COUNT = 1;

export const D8_X = [1, 1, 0, -1, -1, -1, 0, 1];
export const D8_Y = [0, -1, -1, -1, 0, 1, 1, 1];
export const D8 = D8_X.map((dx, index) => ({ dx, dy: D8_Y[index] }));
export const D12_X = [2, 2, 1, 0, -1, -2, -2, -2, -1, 0, 1, 2];
export const D12_Y = [0, -1, -2, -2, -2, -1, 0, 1, 2, 2, 2, 1];
export const D12 = D12_X.map((dx, index) => ({ dx, dy: D12_Y[index] }));

export const GAME_STATUSES = {
	START_POSITION_SELECTION: 'start_positions_selection',
	MOVE_POSITION_SELECTION: 'move_position_selection',
	WAITING_FOR_HUMANS_START_POSITIONS: 'waiting_for_humans_start_positions',
	WAITING_FOR_OPPONENTS_MOVE: 'waiting_for_opponents_move',
	SENDING_MOVE: 'sending_move',
	VALIDATION: 'validation',
	GETTING_GAME_STATUS: 'getting_game_status',
};
