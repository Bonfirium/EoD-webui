import { MAP_VALUES, ROOM } from '../constants/images.constants';

export default (map) => {

	const coordinatesArray = [];
	const halfWidth = ROOM.WIDTH / 2;
	const halfHeight = ROOM.HEIGHT / 2;

	for (let x = 0; x < 30; x++) {
		for (let y = 0; y < 16; y++) {
			const fl = map[x][y];
			if (fl === MAP_VALUES.ROOM) {
				coordinatesArray.push({
					x: halfWidth * x,
					y: halfHeight * y,
				});
			}
		}
	}

	return coordinatesArray;
};
