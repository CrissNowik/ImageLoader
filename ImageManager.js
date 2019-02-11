function ImageManager(placeholderDataUri) {
    this._images = {};
	if (placeholderDataUri) {
		this._placeholder = new Image();
		this._placeholder.src = placeholderDataUri;
	}
}

_p = ImageManager.prototype;

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
};

_p._onLoadItem = function(queueItem, itemCounter, onDone, onProgress){
    let self = this;
    let img = new Image();
    img._onload = function(){
        self._images[queueItem.key] = img;
        self.onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
    };

    img.onerror = function(){
        self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
    };
    img.src = queueItem.path;
};

_p.onItemLoaded = function(queueItem, itemCounter, onDone, onProgress, success){
    itemCounter.loaded++;
    onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
    if (itemCounter.loaded === itemCounter.total) {
        onDone && onDone();
    }
};

_p.get = function(key){
    return this._images[key];
}