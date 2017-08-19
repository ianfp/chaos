const ZOOM_INCREMENT = 1.1;

class Viewer {
	constructor(bitmap, zoom, left, top) {
		this.bitmap = bitmap;
		this.zoom = zoom;
		this.left = left;
		this.top = top;
		this.color = {
			white: new Color(255, 255, 255),
			black: new Color(0, 0, 0),
		};
	}

	get width() {
		return this.bitmap.width;
	}

	get height() {
		return this.bitmap.height;
	}

	incrementZoom() {
		this.zoom *= ZOOM_INCREMENT;
	}

	decrementZoom() {
		this.zoom /= ZOOM_INCREMENT;
	}

	render() {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				this.renderPixel(new Pixel(x, y));
			}
		}
		this.bitmap.redraw();
	}

	renderPixel(pixel) {
		const complex = this.toComplex(pixel);
		const color = (isMandelbrot(complex) 
			? this.color.white 
			: this.color.black);
		this.bitmap.setPixel(pixel, color);
	}

	toComplex(pixel) {
		const re = (pixel.x / this.zoom) + this.left;
		const im = (pixel.y / this.zoom) - this.top;
		return new Complex(re, im);
	}
}


function main() {
	const canvas = document.querySelector('body canvas');
	const bitmap = new Bitmap(canvas);
	const viewer = new Viewer(bitmap, 100, -5, 5);
	viewer.render();

	canvas.addEventListener('wheel', event => {
		console.log(event.offsetX, event.offsetY);
		if (event.deltaY > 0) {
			viewer.decrementZoom();
		} else {
			viewer.incrementZoom();
		}
		viewer.render();
	});
}

window.onload = main;