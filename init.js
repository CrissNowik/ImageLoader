window.addEventListener('load', init);

function init() {
    const canvas = initFullScreenCanvas("mainCanvas");

    const imageManager = new ImageManager();

    imageManager.load({
        "arch-left": "img/arch-left.png",
        "arch-right": "img/arch-right.png",
        "knight": " img/knight.png"
    }, onDone, onProgress);
};

function onProgress(loaded, total, key, path, success) {
    if (success) {
        console.log("loaded " + loaded + " from " + total + " pictures");
    } else {
        console.log("Error: Not loaded picture " + path);
    }
}

function onDone() {
    console.log("All pictures loaded");
};

function initFullScreenCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);
    window.addEventListener("resize", function () {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}