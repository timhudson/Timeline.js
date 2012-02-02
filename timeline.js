//    Timeline.js
//    (c) 2010-2011 Tim Hudson
//    Timeline.js may be freely distributed under the MIT license.

(function(context) {

  var cache = [];

  var timeline = {};

  // Add animation object which requires start, stop and callback { start: 0, stop: 0.4, callback: function() {} }
  timeline.add = function(animation) {

    // Cache of all animations
    cache.push(animation);

    return this;
  };

  timeline.remove = function(animation) {

    var index = cache.indexOf(animation);

    if (index !== -1) {
      cache.splice(index, 1);
    }

    return this;
  };

  timeline.run = function(value) {

    function animate() {

      for(var i = 0, l = cache.length; i < l; i++) {

        var animation = cache[i],
            _time = relativeTime(animation.start, animation.stop),
            _values = relativeValues(animation, _time);
            repeat = animation.previousTime === _time;

        // Run animation if not a repeat of last update
        if (!repeat) animation.callback(_values, _time);

        // Cache previous time
        animation.previousTime = _time;
      }

      return this;
    }

    function relativeTime(start, stop) {
      var length = stop - start,
          position = value - start,
          _time = position / length;

      ret = _time >= 1 ? 1 :
            _time <= 0 ? 0 : _time;

      return ret;
    }

    function relativeValues(animation, relativeTime) {

      var animationFrom = animation['from'],
          animationTo = animation['to'];

      var ret = {};

      for ( var key in animation['to'] ) {

        ret[key] = (( animationTo[key] - animationFrom[key]) * relativeTime ) + animationFrom[key];

      }

      return ret;
    }

    animate();

    return this;

  };

  context.timeline = timeline;

}(this));