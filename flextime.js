/**
 * A simple hight performence Animation Frame for customize animations.
 * use RequestAnimationFrame instead of setTimeout
 * @param  {Number} duration time of animation.
 * @param  {Function} animate , callback(elapse,duration, per) when an animate frame be invoked.	
 * @param  {Function}   finish	, callback when duration is timeout;
 * @return {Object} , an action controler handle, use stop() method when you need to stop the animation
 */

!function(){
var nextFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) { return setTimeout(callback, 1000/60); };
})(),
cancelFrame = (function () {
	return window.cancelRequestAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout;
})();

/**
 * flextime
 * @param  {[type]} duration [description]
 * @param  {[type]} animate  [description]
 * @param  {[type]} finish   [description]
 * @return {[type]}          [description]
 */
function flextime(duration, animate, finish){
	var start = +(new Date)
	,	k = function(){}
	,	p = 0, tm = null
	;
	function t(d){
		d = d||(+(new Date)-start);
		if(d>=duration){  d = duration; }
		p = d/duration; 
		animate( d, duration, p);
		if(d>=duration){  (finish||k)(); return;}
		tm = nextFrame(function(){t()});
	}
	t(0);
	return {
		stop:function(){ cancelFrame(tm) },
		play:t
	}
}
// export to window
window.flextime = flextime;
}();