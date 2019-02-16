window.addEventListener('load', init);

/****
 * init - public function responsible for initializing new ImageManager class (object), when window object will load (line 1)
 */

function init() {
    // const canvas = initFullScreenCanvas("mainCanvas");
    // const ctx = canvas.getContext("2d");
    // const image = new Image();

    // image.onload = function() {
    //     // Ready
    //     ctx.drawImage(image, 10, 10);
    // };
    // image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAm0lEQVRoQ+" +
    //         "3YMRWAMBQEwcRT/Cv4nuAhYYtQDQaAyXIFe2aedfk65+zLt1jbiwRiJxKwpBWwlrSClrQClrQKlrSKltUKWtIKW" +
    //         "FarYEmraFmtoCWtgGW1Cpa0ipbVClrXf5x9z/LHvzMvEk7diRQsaRUtH3vQklbAsloFS1pFy2oFLWkFLKtVsKRVt" +
    //         "KxW0JJWwLJaBUtaRctqBa0X1+W43qGn25cAAAAASUVORK5CYII=";

    const imageManager = new ImageManager();
    // object with key: value for load method
    imageManager.load({
        "arch-left": "img/arch-left.png",
        "arch-right": "img/arch-right.png",
        "knight": " img/knight.png"
    }, onDone, onProgress);
};

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
        const canvas = initFullScreenCanvas("mainCanvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();

        image.onload = function() {
            // Ready
            ctx.drawImage(image, 10, 10);
        };
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAm0lEQVRoQ+" +
                "3YMRWAMBQEwcRT/Cv4nuAhYYtQDQaAyXIFe2aedfk65+zLt1jbiwRiJxKwpBWwlrSClrQClrQKlrSKltUKWtIKW" +
                "FarYEmraFmtoCWtgGW1Cpa0ipbVClrXf5x9z/LHvzMvEk7diRQsaRUtH3vQklbAsloFS1pFy2oFLWkFLKtVsKRVt" +
                "KxW0JJWwLJaBUtaRctqBa0X1+W43qGn25cAAAAASUVORK5CYII=";
        console.log("Error: Not loaded picture " + path);
    }
}

/****
 * onDone - simple functon informing about success of loading all photos
 */

function onDone() {
    console.log("All pictures loaded");
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