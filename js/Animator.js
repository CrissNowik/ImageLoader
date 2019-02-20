/**
 * Basic animation class
 * @param duration - miliseconds - time of animation single iteration eg. 6 frames, each 50 ms === 300 ms duration
 *
 * All setup of class are setting by setters:
 * setRepeatBehavior and setRepeatCount
 *
 * Animator class need exterior timer, can't measure time itself
 * External timer call for update() method, give it number of miliseconds as a parameter 
 */
function Animator(duration) {
	this._duration = duration;
	this._repeatCount = 1; // loops to execute
	this._acceleration = 0; // fraction of acceleration
	this._deceleration = 0; // fraction of deceleration
	this._loopsDone = 0; // loops done
	this._repeatBehavior = Animator.RepeatBehavior.LOOP; // default animation behaviour
	this._timeSinceLoopStart = 0; // time from the loop start
	this._started = false; // flags for indicating state of animation
	this._running = false;
	this._reverseLoop = false; // flag for reverting move
}

_p = Animator.prototype;

/**
 * value for parameter of function setLoopCount
 */
Animator.INFINITE = -1;

/**
 * RepeatBehavior tells what to do when loop is over
 * In case of Animator.RepeatBehavior.LOOP, next iteration will go from 0 to 1.
 * In case of Animator.RepeatBehavior.REVERSE odd loops will be executed as reverted from 1 to 0
 */
Animator.RepeatBehavior = {
	LOOP: 1,
	REVERSE: 2
};

/**
 * Starting Animator class.
 */
_p.start = function() {
	this._started = true;
	this._running = true;
};

/**
 * Check if Animator is running
 */
_p.isRunning = function() {
	return this._running;
};

/**
 * Stop Animator and make beginning state. 
 */
_p.stop = function() {
	this._loopsDone = 0;
	this._timeSinceLoopStart = 0;
	this._running = false;
	this._started = false;
};

/**
 * Pause Animator. Animator ignores state changes, freezing animation state. 
 */
_p.pause = function() {
	this._running = false;
};

/**
 * Return time of animation 
 */
_p.getDuration = function() {
	return this._duration;
};

/**
 * Set time of single iteration of animation loop. Value <= 1
 */
_p.setDuration = function(duration) {
	this._throwIfStarted();
	if (duration < 1) {
		throw "Time can't be < 1";
	}
	this._duration = duration;
};

/**
 * Return number of animation repetitions  - default 1.
 */
_p.getRepeatCount = function() {
	return this._repeatCount;
};

/**
 * Set a number of animation loops - default 1. Never ending loop === Animator.INFINITE
 */
_p.setRepeatCount = function(repeatCount) {
	this._throwIfStarted();

	if (repeatCount < 1 && repeatCount != Animator.INFINITE)
		throw "Number of repetitions should be > 0 or INFINITE.";
	this._repeatCount = repeatCount;
};

/**
 * Return way of animation repetiton.
 * Possible values: Animator.RepeatBehavior.LOOP i Animator.RepeatBehavior.REPATE. 
 */
_p.getRepeatBehavior = function() {
	return this._repeatBehavior;
};

/**
 * Set way of repeating - default Animator.RepeatBehavior.LOOP
 * @param behavior - new way of repeating
 */
_p.setRepeatBehavior = function(behavior) {
	this._throwIfStarted();
	if (behavior != Animator.RepeatBehavior.LOOP && behavior != Animator.RepeatBehavior.REVERSE) {
		throw "Way of repeating should be RepeatBehavior.LOOP or RepeatBehavior.REVERSE";
	}
	this._repeatBehavior = behavior;
};