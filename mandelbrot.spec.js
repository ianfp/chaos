describe("Mandelbrot set", function() {
    const mandelbrot = new MandelbrotSet(10);

    beforeEach(function () {
        jasmine.addMatchers({
            toBeInTheSet: function () {
                return {
                    compare: function (complex) {
                        return {
                            pass: mandelbrot.contains(complex),
                            message: `${complex.toString()} is not a Mandelbrot number`,
                        };
                    },
                };
            },
            notToBeInTheSet: function () {
                return {
                    compare: function (complex) {
                        return {
                            pass: !mandelbrot.contains(complex),
                            message: `${complex.toString()} is a Mandelbrot number`,
                        };
                    },
                };
            },
        });
    });

    /**
     * Some numbers that are obviously in the set.
     */
    it("can identify numbers in the set", function () {
        // 0^2 + 0  == 0
        expect(new Complex(0, 0)).toBeInTheSet();
        // 0^2 + i  ==  i
        // i^2 + i  ==  -1 + i
        // (-1 + i)^2 + i  ==  (1 - 2i + i^2) + i ==  -2i + i  == -i
        // (-i)^2 + i  ==  i^2 + i  ==  -1 + i
        expect(new Complex(0, 1)).toBeInTheSet();
    });

    /**
     * Some numbers that are obviously NOT in the set.
     */
    it("can identify numbers not in the set", function () {
        expect(new Complex(1, 0)).notToBeInTheSet();
        expect(new Complex(2, 0)).notToBeInTheSet();
        expect(new Complex(0, 2)).notToBeInTheSet();
    });
});