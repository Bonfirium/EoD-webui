import { ROOM } from '../constants/images.constants';
import { MAP_VALUES } from '../constants/logic.constants';

export default (map) => {

	const coordinatesArray = [];
	const halfWidth = ROOM.WIDTH / 2;
	const halfHeight = ROOM.HEIGHT / 2;

	for (let x = 0; x < 30; x++) {
		for (let y = 0; y < 16; y++) {
			const objectType = map[x][y];
			if (objectType === MAP_VALUES.ROOM || objectType === MAP_VALUES.PORTAL || objectType === MAP_VALUES.TREASURE) {
				coordinatesArray.push({
					x: halfWidth * x,
					y: halfHeight * y,
					type: objectType
				});
			}
		}
	}

	return coordinatesArray;
};
