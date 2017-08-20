class MandelbrotSet {

	constructor(iterations = 10) {
		this.iterations = iterations;
	}

	contains(complex) {
		let current = Complex.ZERO;
		for (let iter = 0; iter < this.iterations; iter++) {
			current = current.mul(current).add(complex);
			if (this.willGoToInfinity(current)) {
				return false;
			}
		}
		return true; // Hasn't run away yet, so assume it won't.
	}

	willGoToInfinity(complex) {
		const limit = 2;
		return complex.re >= limit
			|| complex.im >= limit;
	}
}