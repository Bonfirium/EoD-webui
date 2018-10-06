import { D12_X, D12_Y } from '../../../gen_test_data';
import { MAP_VALUES } from '../constants/logic.constants';

const _getNeighbors = (map, x, y) => {
	const roomDoors = [];
	for (let i = 0; i < 6; i++) {

		const X_delta = D12_X[i];
		const Y_delta = D12_Y[i];
		const newX = X_delta + x;
		const newY = Y_delta + y;

		if (newX < 0 || newY < 0 || newX > 29 || newY > 15) {
			continue;
		}

		const potentialNeighbor = map[newX][newY];

		if (potentialNeighbor === MAP_VALUES.ROOM || potentialNeighbor === MAP_VALUES.PORTAL || potentialNeighbor === MAP_VALUES.TREASURE) {
			roomDoors.push({
				x: (x + newX) / 2,
				y: (y + newY) / 2,
			});
		}
	}

	return roomDoors;
};


export default (map) => {

	let coordinatesArray = [];

	for (let x = 0; x < 30; x++) {
		for (let y = 0; y < 16; y++) {

			const fl = map[x][y];
			if (fl === MAP_VALUES.ROOM || fl === 4 || fl === 5) {

				const neighbors = _getNeighbors(map, x, y);

				if (neighbors.length) {
					coordinatesArray = coordinatesArray.concat(neighbors);
				}

			}
		}
	}

	return coordinatesArray;

};
