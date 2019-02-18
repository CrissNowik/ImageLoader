window.addEventListener('load', init);

/****
 * init - public function responsible for initializing new ImageManager class (object), when window object will load (line 1)
 */
let imageManager;
let spriteSheet;
let frameStart = 0;
let animationStartTime = new Date().getTime();
let numFrames = 15;
let duration = numFrames*50;
const tiles = [
    [0, 0, 94, 76, 44, 67],
    [94, 0, 94, 76, 44, 68],
    [188, 0, 91, 76, 42, 68],
    [279, 0, 88, 76, 39, 68],
    [367, 0, 83, 77, 34, 69],
    [0, 77, 81, 75, 34, 67],
    [81, 77, 80, 73, 34, 66],
    [161, 77, 78, 72, 33, 65],
    [239, 77, 77, 72, 33, 65],
    [316, 77, 77, 72, 32, 65],
    [393, 77, 79, 73, 33, 66],
    [0, 152, 80, 75, 34, 67],
    [80, 152, 81, 77, 34, 69],
    [161, 152, 84, 77, 36, 69],
    [245, 152, 89, 76, 41, 68],
    [334, 152, 93, 75, 44, 67]
];

function init() {
    imageManager = new ImageManager();
    // object with key: value for load method
    imageManager.load({
        "arch-left": "img/arch-left.png",
        "arch-right": "img/arch-right.png",
        "knight": "img/knight.png",
        "axe": "img/axe.png",
        "sheet": "img/sheet.png"
    }, onDone, onProgress, onLoaded);
};

/**
 *onLoaded - function responsible for getting images from imageManager object and drawing received images by drawFrame public method
 */
function onLoaded() {
    let canvas = initFullScreenCanvas("mainCanvas");
    let ctx = canvas.getContext("2d");
    spriteSheet = new SpriteSheet(imageManager.get("sheet"), tiles);
    console.log("Animation now!")
    animate(0);
}
setTimeout(onLoaded,5000);
/**
 * animate - basic animation function
 */
function animate(timestamp) {
    let canvas = initFullScreenCanvas("mainCanvas");
    let ctx = canvas.getContext("2d");

    let now = timestamp || new Date().getTime();
    let passed = now - frameStart;
    let timePassed = (now - animationStartTime)%duration;
    let fraction = timePassed/duration;
    let currentFrame = Math.abs(Math.floor(fraction*numFrames));
    
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0, 500, 500);
        spriteSheet.drawFrame(ctx, currentFrame, 200, 200);
        requestAnimationFrame(arguments.callee);
}

/****
 * onProgress - function responsible for informing about fail/success of loading each photo
 * @param loaded - number of loaded picture,
 * @param total - amount of all picture to load,
 * @param path - string with path to photo,
 * @param success - bool flag 
 */

function onProgress(loaded, total, key, path, success) {
    if (success) {
        console.log("loaded " + loaded + " from " + total + " pictures");
    } else {
        altImgBackup();
        console.log("Error: Not loaded picture " + path);
    }
}

/****
 * onDone - simple functon informing about success of loading all photos
 */

function onDone() {
    console.log("All pictures loaded");
    drawKnight();
};

/****
 * initFullScreenCanvas - function calling resizeCanvas on proper DOM element (called in init())
 * @param canvasId - string indicating DOM element
 */

function initFullScreenCanvas(canvasId) {
    let canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);
    window.addEventListener("resize", function () {
        resizeCanvas(canvas);
    });
    return canvas;
}

/****
 * resizeCanvas - function for autoscaling canvas to screen size
 * @param canvas - DOM node representing canvas to scale
 */

function resizeCanvas(canvas) {
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}

/****
 * drawAxe() -  function responsible for drawing axe when loading occurs success
 */
function drawKnight() {
    let canvas = initFullScreenCanvas("mainCanvas");
    let ctx = canvas.getContext("2d");
    const knight = imageManager.get("knight");
    ctx.drawImage(knight, 0, 0, 206, 208, 200, 200, 206, 208);
}

/****
 * altImgBackup - function responsible for drawing alternative image when loading of some picture will error
 */
function altImgBackup() {
    const image = new Image();

    image.onload = function() {
        // Ready
        ctx.drawImage(image, 10, 10);
    };
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAm0lEQVRoQ+" +
            "3YMRWAMBQEwcRT/Cv4nuAhYYtQDQaAyXIFe2aedfk65+zLt1jbiwRiJxKwpBWwlrSClrQClrQKlrSKltUKWtIKW" +
            "FarYEmraFmtoCWtgGW1Cpa0ipbVClrXf5x9z/LHvzMvEk7diRQsaRUtH3vQklbAsloFS1pFy2oFLWkFLKtVsKRVt" +
            "KxW0JJWwLJaBUtaRctqBa0X1+W43qGn25cAAAAASUVORK5CYII=";
}

function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}

window.requestAnimationFrame = (function(){
    // check all possible browsers
    //@paul_irish function
    return  window.requestAnimationFrame       ||  //Chromium
        window.webkitRequestAnimationFrame ||  //Webkit
        window.mozRequestAnimationFrame    || //Mozilla Geko
        window.oRequestAnimationFrame      || //Opera Presto
        window.msRequestAnimationFrame     || //IE Trident?
        function(callback, element){ // Funkcja awaryjna
            console.log("Funkcja awaryjna");
            return window.setTimeout(callback, 1000/30);
        }

})();

// and cancel animation in all possible browsersm

window.cancelRequestAnimFrame = ( function() { 
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();
