function isMandelbrot(complex) {
	const maxIter = 10;
	// visited = new Set();
	let current = Complex.ZERO;
	for (let iter = 0; iter < maxIter; iter++) {
		current = current.mul(current).add(complex);
		if (willGoToInfinity(current)) {
			return false;
		}
		// if (visited.has(current.toString())) {
		// 	return true;
		// }
	}
	return true; // Hasn't run away yet, so assume it won't.
}

function willGoToInfinity(complex) {
	const limit = 2;
	return complex.re >= limit 
		|| complex.im >= limit;
}
