import { GAME_FIELD } from '../constants/logic.constants';

export const doublepointToVector = (x, y) => x + y * GAME_FIELD.WIDTH;
