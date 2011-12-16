# Timeline.js

Timeline based animation

## How to use

First create an animation object which requires start, stop and callback

```js
var animation = {
  start: 0, // A number between 0 and 1 representing where on the timeline this animation will start
  stop: 1, // Another number between 0 and 1 representing where this animation will stop
  callback: function(relativeTime) {
  	// Do fun stuff
  }
}
```

Next add the animation to the timeline

```js
timeline.add(animation);
```

Then run that baby. Pass in a value between 0 and 1 and timeline will run all functions, letting each one know where their playback should be.

```js
timeline.run(0.73);
```

The run method can be controlled by an interval or some other means. See examples for other ideas.
