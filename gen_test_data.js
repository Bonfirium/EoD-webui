export default ()=>{
	const WIDTH = 30;
	const HEIGHT = 16;
	const EMPTY = 0;
	const POTENTIAL_ROOM = 1;
	const ROOM = 2;
	const WALL = 3;

	const D8_X = [1, 1, 0, -1, -1, -1, 0, 1];
	const D8_Y = [0, -1, -1, -1, 0, 1, 1, 1];
	const D12_X = [2, 2, 1, 0, -1, -2, -2, -2, -1, 0, 1, 2];
	const D12_Y = [0, -1, -2, -2, -2, -1, 0, 1, 2, 2, 2, 1];

	const inRange = (x, y) => x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
	const comprehension = (count, map) =>
		new Array(count).fill(0)
			.map((_, index) => map(index));
	const rand = (x) => Math.floor(Math.random() * x);

	const map = comprehension(WIDTH, () => comprehension(HEIGHT, () => EMPTY));
	const xStart = rand(WIDTH);
	const yStart = rand(HEIGHT);
	map[xStart][yStart] = POTENTIAL_ROOM;
	const pool = [{
		x: xStart,
		y: yStart
	}];

	while (pool.length) {
		const ind = rand(pool.length);
		const { x, y } = pool[ind];
		pool[ind] = pool[pool.length - 1];
		pool.pop();
		if (map[x][y] !== 1) continue;
		map[x][y] = ROOM;
		for (let i = 0; i < 8; i++) {
			const x1 = x + D8_X[i];
			const y1 = y + D8_Y[i];
			if (!inRange(x1, y1)) continue;
			map[x1][y1] = WALL;
		}
		for (let i = 0; i < 12; i++) {
			const x1 = x + D12_X[i];
			const y1 = y + D12_Y[i];
			if (!inRange(x1, y1) || map[x1][y1] !== EMPTY) continue;
			map[x1][y1] = POTENTIAL_ROOM;
			pool.push({
				x: x1,
				y: y1
			});
		}
	}

	return map;
}

