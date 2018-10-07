import { ROOM } from '../constants/images.constants';
import { MAP_VALUES, GAME_FIELD } from '../constants/logic.constants';
import { D12_X, D12_Y } from '../../../gen_test_data';

/**
 *
 * @param {[[Number]]} map
 * @param {Number} x
 * @param {Number} y
 * @returns {Array}
 * @private
 */
const _getNeighbors = (map, x, y) => {

	const roomDoors = [];

	for (let i = 0; i < 12; i++) {

		const X_delta = D12_X[i];
		const Y_delta = D12_Y[i];
		const newX = X_delta + x;
		const newY = Y_delta + y;

		if (newX < 0 || newY < 0 || newX > GAME_FIELD.WIDHT - 1 || newY > GAME_FIELD.HEIGHT - 1) {
			continue;
		}

		const potentialNeighbor = map[newX][newY];

		if (potentialNeighbor === MAP_VALUES.ROOM || potentialNeighbor === MAP_VALUES.PORTAL || potentialNeighbor === MAP_VALUES.TREASURE) {
			roomDoors.push({
				x: newX,
				y: newY,
			});
		}
	}

	return roomDoors;
};


/**
 *
 * @param {[[Number]]} map
 * @returns {Array}
 */
export default (map) => {

	const coordinatesArray = [];
	const halfWidth = ROOM.WIDTH / 2;
	const halfHeight = ROOM.HEIGHT / 2;

	for (let x = 0; x < GAME_FIELD.WIDHT; x++) {
		for (let y = 0; y < GAME_FIELD.HEIGHT; y++) {
			const objectType = map[x][y];
			if (objectType === MAP_VALUES.ROOM || objectType === MAP_VALUES.PORTAL || objectType === MAP_VALUES.TREASURE) {
				coordinatesArray.push({
					x: halfWidth * x,
					y: halfHeight * y,
					indexX: x,
					indexY: y,
					type: objectType,
					neighbors: _getNeighbors(map, x, y),
				});
			}
		}
	}

	return coordinatesArray;
};

