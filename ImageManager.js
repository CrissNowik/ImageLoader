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
 * load - public method used for preparing image queue and firing _loadItem method on each of images
 * @param images - object with key-value pairs 
 * @param onDone - function informing about load success,
 * @param onProgress -function informing about load progress or fail
*/

_p.load = function(images, onDone, onProgress){
    const queue = [];
    for (let im in images) {
        queue.push({
            key: im,
            path: images[im]
        });
    }
    if (queue.length === 0) {
        onProgress && onProgress(0, 0, null, null, true); // if onProgress exists do it
        onDone && onDone(); // if onDone exist do it
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
 * loadItem - private method responsible for loading photo and sending success or loading fail to onItemLoaded
 * @param queueItem - object representing photo queue,
 * @param itemCounter - object counting loaded photos,
 * @param onDone - function informing about load success,
 * @param onProgress -function informing about load progress or fail
*/

_p._loadItem = function(queueItem, itemCounter, onDone, onProgress) {
    var self = this; 
    // console.log(self); // reference to ImageManager object
    
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
 * _onItemLoaded - private method responsible for handling results of loading items
 * @param queueItem - object representing photo queue,
 * @param itemCounter - number representing photo number from queue
 * @param onDone - function informing about load success,
 * @param onProgress -function informing about load progress or fail
 * @param success - boolean flag indicating success or fail of photoloading
*/

_p._onItemLoaded = function(queueItem, itemCounter, onDone, onProgress, success){
    itemCounter.loaded++;
    onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
    if (itemCounter.loaded === itemCounter.total) {
        onDone && onDone();
    }
};

/****
 * simple public method returning loaded image suitable to key
 * @param key - picture alias 
 */

_p.get = function(key){
    return this._images[key];
}