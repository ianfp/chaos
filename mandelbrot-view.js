const ZOOM_INCREMENT = 1.2;

class Viewer {
	constructor(bitmap, zoom, left, top) {
		this.bitmap = bitmap;
		this.zoom = zoom;
		this.corner = new Complex(left, top);
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

	zoomInOn(x, y) {
		let clicked = this.toComplex({x: x, y: y});
		const diff = clicked.sub(this.corner).div(ZOOM_INCREMENT);
		this.corner = clicked.sub(diff);
		this.zoom *= ZOOM_INCREMENT;
	}

	zoomOutOn(x, y) {
		let clicked = this.toComplex({x: x, y: y});
		const diff = clicked.sub(this.corner).mul(ZOOM_INCREMENT);
		this.corner = clicked.sub(diff);
		this.zoom /= ZOOM_INCREMENT;
	}

	render() {
		const start = (new Date()).getTime();
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				this.renderPixel(new Pixel(x, y));
			}
		}
		this.bitmap.redraw();
		const end = (new Date()).getTime();
		const renderTime = end - start;
		return renderTime;
	}

	renderPixel(pixel) {
		const complex = this.toComplex(pixel);
		const color = (isMandelbrot(complex) 
			? this.color.white 
			: this.color.black);
		this.bitmap.setPixel(pixel, color);
	}

	toComplex(pixel) {
		const re = (pixel.x / this.zoom) + this.corner.re;
		const im = (pixel.y / this.zoom) - this.corner.im;
		return new Complex(re, -im);
	}
}


function main() {
	const canvas = document.querySelector('body canvas');
	const bitmap = new Bitmap(canvas);
	const viewer = new Viewer(bitmap, 100, -3, 3);
	render(viewer);

	canvas.addEventListener('wheel', event => {
		setStatus('rendering...');
		if (event.deltaY > 0) {
			viewer.zoomOutOn(event.offsetX, event.offsetY);
		} else {
			viewer.zoomInOn(event.offsetX, event.offsetY);
		}
		render(viewer);
	});
}

function render(viewer) {
	const renderTime = viewer.render();
	const zoom = viewer.zoom.toFixed();
	setStatus(`Rendered at ${zoom}x in ${renderTime} ms.`);
}

function setStatus(status) {
	document.getElementById('status').innerHTML = status;
}

window.onload = main;