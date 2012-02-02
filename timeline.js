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
            _time = time(animation['start'], animation['stop']),
            repeat = animation.previousTime === _time,
            _values;

        if (!repeat) {

          // Create relative values with the 'from' and 'to' objects
          if (animation['to']) _values = values(animation, _time);

          // Run animation if not a repeat of last update
          animation.callback(_time, _values);

        }

        // Cache previous time
        animation.previousTime = _time;

      }

    }

    function time(start, stop) {
      var _time = (value - start) / (stop - start);

      _time = _time >= 1 ? 1 :
            _time <= 0 ? 0 : _time;

      return _time;
    }

    function values(animation, time) {

      var animationFrom = animation['from'],
          animationTo = animation['to'],
          _values = {};

      for ( var key in animation['to'] ) {
        _values[key] = ( (animationTo[key] - animationFrom[key]) * time ) + animationFrom[key];
      }

      return _values;
    }

    animate();

    return this;

  };

  context.timeline = timeline;

}(this));