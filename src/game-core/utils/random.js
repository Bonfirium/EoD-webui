export default (length) => {
	var j,
		x,
		i;
	const a = new Array(length).fill(0)
		.map((_, i) => i);

	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}
