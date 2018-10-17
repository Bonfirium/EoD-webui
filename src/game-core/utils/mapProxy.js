
import { MAP_VALUES } from '../constants/logic.constants';

const EMPTY = 0;
const ROOM = 2;
const PORTAL = 4;
const TREASURE = 5;

const comprehension = (count, map) =>
	new Array(count).fill(0).map((_, index) => map(index));

const proxygenerateEmptyMap = () => comprehension(MAP_VALUES.WIDTH, () => comprehension(MAP_VALUES.HEIGHT, () => EMPTY));

const vectorItemToDoublepoint = (vectorItem) => {

	const y = vectorItem % MAP_VALUES.WIDTH;

	const x = Math.floor(vectorItem / MAP_VALUES.WIDTH);

	return { x, y };
};

const fillLayerOverAss = (map, vector, id) => {

	vector.forEach((vectorItem) => {
		const { x, y } = vectorItemToDoublepoint(vectorItem);

		map[x][y] = id;
	});
};

/**
 *
 * @param roomsVector
 * @param treasuresVector
 * @return {*}
 */
export default (roomsVector, treasuresVector) => {
	const map = proxygenerateEmptyMap();

	fillLayerOverAss(map, roomsVector, ROOM);
	fillLayerOverAss(map, treasuresVector, TREASURE);

	return map;
};
