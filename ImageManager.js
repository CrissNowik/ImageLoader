/*****
 * Image Manager obcjet is responsible for loading images, informing about progress and ending the process
 * 
 */
function ImageManager(placeholderDataUri) {
    this._images = {};
	if (placeholderDataUri) {
		this._placeholder = new Image();
		this._placeholder.src = placeholderDataUri;
	}
}

_p = ImageManager.prototype;

/****
 * load - function - public method used for preparing image queue and firing _loadItem method on each of images
 * @param - images - object with key-value pairs 
 * @param - onDone - function informing about load success,
 * @param - onProgress -function informin about load progress or fail
*/

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

/****
 * 
 * 
*/

_p._loadItem = function(queueItem, itemCounter, onDone, onProgress) {
	var self = this;
	var img = new Image();
	img.onload = function() {
		self._images[queueItem.key] = img;
		self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
	};

	img.onerror = function() {
		self._images[queueItem.key] = self._placeholder ? self._placeholder : null;
		self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
	};
	img.src = queueItem.path;
};

/****
 * 
 * 
*/

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

/****
 * 
 * 
*/

_p._onItemLoaded = function(queueItem, itemCounter, onDone, onProgress, success){
    itemCounter.loaded++;
    onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
    if (itemCounter.loaded === itemCounter.total) {
        onDone && onDone();
    }
};

/****
 * simple function returning loaded image suitable to key
 * @param picture alias 
 */

_p.get = function(key){
    return this._images[key];
}