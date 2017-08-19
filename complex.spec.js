

describe("Complex", function() {

    beforeEach(function () {
        jasmine.addMatchers({
            toRenderAs: function () {
                return {
                    compare: function (complex, expected) {
                        return {
                            pass: expected === complex.toString(),
                            message: `Rendered as ${complex.toString()}`,
                        };
                    }
                }
            }
        });
    });

    it("renders as a string", function() {
        expect(new Complex(0, 0)).toRenderAs("0");
        expect(new Complex(1, 0)).toRenderAs("1");
        expect(new Complex(0, 1)).toRenderAs("i");
        expect(new Complex(0, 1.5)).toRenderAs("1.5i");
        expect(new Complex(2, -1)).toRenderAs("2 - i");
        expect(new Complex(2/3, -5)).toRenderAs("0.6666666666666666 - 5i");
    });

    it("adds with other Complex numbers", function () {
        const zero = new Complex(0, 0);
        const real = new Complex(2, 0);
        const twoI = new Complex(0, 2);

        expect(zero.add(real)).toRenderAs("2");
        expect(zero.add(twoI)).toRenderAs("2i");
        expect(real.add(twoI)).toRenderAs("2 + 2i");
    });

    it("multiplies with other Complex numbers", function () {
        const zero = new Complex(0, 0);
        const i = new Complex(0, 1);
        const negI = new Complex(0, -1);
        const two = new Complex(2, 0);
        const twoI = new Complex(0, 2);
        const argh = new Complex(1, 2);
        const ouch = new Complex(1.5, -4);

        expect(zero.mul(zero)).toRenderAs("0");
        expect(i.mul(zero)).toRenderAs("0");
        expect(i.mul(i)).toRenderAs("-1");

        expect(negI.mul(negI)).toRenderAs("-1");
        expect(i.mul(two)).toRenderAs("2i");

        // 1.5 - 4i + 3i - 8i^2  ==  1.5 - i + 8  ==  9.5 - i
        expect(ouch.mul(argh)).toRenderAs("9.5 - i"); 
    });

});
