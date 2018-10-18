
export default function comprehension(count, map) {
	return new Array(count).fill(0).map((_, index) => map(index));
}
