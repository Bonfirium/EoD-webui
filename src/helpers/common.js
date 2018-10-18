import { MAP_HEIGHT, MAP_WIDTH } from './constants';

export function isOnMap(x, y) {
	return x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT;
}
