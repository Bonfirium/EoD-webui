import constants from '../helpers/constants';

export default (map) => {

	const coordinatesArray = [];
	const { ROOM } = constants;
	const halfWidth = ROOM.WIDHT / 2;
	const halfHeight = ROOM.HEIGHT / 2;

	for (let x = 0; x < 30; x++) {
		for (let y = 0; y < 16; y++) {
			const fl = map[x][y];
			console.log(fl);
			if (fl === constants.MAP_VALUES.ROOM) {
				coordinatesArray.push({
					x: halfWidth * x,
					y: halfHeight * y,
				});
			}
		}
	}

	return coordinatesArray;
};
