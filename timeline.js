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

  timeline.run = function(time) {

    function animate() {      
      var l = cache.length;

      for(var i = 0; i < l; i++) {
        var animation = cache[i];

        if (time > animation.start && time < animation.stop) {
          animation.callback(relativePosition(animation.start, animation.stop));
        }
        else if (time >= animation.stop) {
          animation.callback(1);
        }
        else {
          animation.callback(0);
        }
      }
    }

    function relativePosition(start, stop) {
      var length = stop*100000 - start*100000,
        position = time*100000 - start*100000;
      
      return position / length;
    }

    animate();

    return this;

  };

  context.timeline = timeline;

}(this));