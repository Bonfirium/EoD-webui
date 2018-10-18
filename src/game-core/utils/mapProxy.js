
import { GAME_FIELD } from '../constants/logic.constants';

const EMPTY = 0;
const ROOM = 2;
const PORTAL = 4;
const TREASURE = 5;

const comprehension = (count, map) =>
	new Array(count).fill(0).map((_, index) => map(index));

const proxygenerateEmptyMap = () => comprehension(GAME_FIELD.WIDTH, () => comprehension(GAME_FIELD.HEIGHT, () => EMPTY));

const vectorItemToDoublepoint = (vectorItem) => {

	const x = vectorItem % GAME_FIELD.WIDTH;

	const y = Math.floor(vectorItem / GAME_FIELD.WIDTH);

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
