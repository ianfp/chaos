
class Bitmap {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    get width() {
        return this.imageData.width;
    }

    get height() {
        return this.imageData.height;
    }

    setPixel(pixel, color) {
        const index = this.getIndex(pixel);
        this.imageData.data[index + 0] = color.r;
        this.imageData.data[index + 1] = color.g;
        this.imageData.data[index + 2] = color.b;
        this.imageData.data[index + 3] = color.a;
    }

    getIndex(pixel) {
        const bytesPerPixel = 4;
        return bytesPerPixel * (pixel.x + (this.width * pixel.y));
    }

    redraw() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}


class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Color {
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() {
        return `${this.r},${this.g},${this.b},${this.a},`;
    }
}
