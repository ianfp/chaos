function main() {
    const canvas = document.querySelector('body canvas');
    console.log(canvas);
    const bmp = new Bitmap(canvas);
    const color = new Color(0, 0, 150);
    const pixel = new Pixel(3, 3);
    bmp.setPixel(pixel, color);
    bmp.redraw();
}

window.onload = main;