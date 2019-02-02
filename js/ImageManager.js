function init(){
    const canvas = initFullScreenCanvas("mainCanvas");

    const imageManager = new imageManager();

    imageManager.load({
        "arch-left" : "img/arch-left.png",
        "arch-right" : "img/arch-right.png",
        "knight": " img/knight.png"
    }, onDone, onProgress);
}

function onProgress(loaded, total, key, path, success) {
    if (success) {
        console.log("loaded " + loaded + " from " + total + " pictures");
    } else {
        console.log("Error: Not loaded picture " + path);
    }
}

function onDone() {
    console.log("All pictures loaded");
}

function ImageManager(placeholderDataUri) {
    this._images = {
        "arch-left" : [],
        "arch-right" : [],
        "knight": []
    }
}

_p = ImageManager.prototype;

_p.get = function(key){
    return this._images[key];
}

_p.load = function(images, onDone, onProgress){
    const queue = [];
    for (let im in images) {
        queue.push({
            key: im,
            path: images[im]
        });
    }
    if (queue.length == 0) {
        onProgress && onProgress(0, 0, null, null, true);
        onDone && onDone();
        return;
    }

    const itemCounter = {
        loaded: 0,
        total: queue.length
    };

    for (let i = 0; i < queue.length; i++) {
        this._loadItem(queue[i], itemCounter, onDone, onProgress);        
    }
}