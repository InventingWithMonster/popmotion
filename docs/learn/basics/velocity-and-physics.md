---
title: Velocity, momentum and spring physics
description: Engage users with velocity, momentum and spring physics.
category: basics
---

# Velocity, momentum and spring physics

A core feature of Popmotion is the ability to query the `velocity` of **any** action.

We can pass this `velocity` value to the `physics` action, to create smooth transitions from one action into either a momentum or spring-based physics-driven animation.

## Getting velocity

The first step is to get our velocity. Every action offers the `getVelocity` method, which returns the velocity as measured in **units per second**.

Why units per second, instead of units per frame? Although 60fps is the current common framerate, VR devices support 90+ fps and the iPad Pro delivers a silky 120 frames per second!

To future-proof our code, we decouple velocity from the device framerate, otherwise our animations would run at 1.5x or even 2x the speed.

So for instance, if we make a `tween` that uses `linear` easing over the course of a second, and get its velocity, we will receive its `to` value (because that is its speed per second):

```javascript
const myTween = tween({
  to: 500,
  duration: 1000
}).start();

setTimeout(
  () => console.log(myTween.getVelocity()), // 500
  500
);
```

By default, the velocity is calculated from the last two values. However, if you know your velocity is roughly linear, you may want to calculate the velocity using a window of values. To do this call the `setVelocityWindow` method with the number of milliseconds you want to sample over.

```javascript
myTween.setVelocityWindow(50);
```

## Applying velocity to physics

Now, let's apply that velocity to our ball from the input tracking tutorial. Let's first create a single `value` to [manage our actions](/learn/action-management).

```javascript
const ballRenderer = css(document.querySelector('#a .ball'));
const ballX = value(0, (v) => ballRenderer.set('x', v));
```

Next, we'll use the position and velocity of the ball, at the moment the pointer is released, and provide that to `physics`. It'll look something like this:

```javascript
physics({
  from: ballX.get(),
  velocity: ballX.getVelocity(),
  onUpdate: ballX
}).start();
```

The full, live, editable demo (click start and then throw the ball):

```marksy
<Example template="Ball" id="a">{`
const ballDom = document.querySelector('#a .ball');
const ballRenderer = css(ballDom);
const ballX = value(0, (v) => ballRenderer.set('x', v));

let pointerTracker;

// Start tracking
function startTracking(e) {
  pointerTracker = pointer(e).start();
  trackOffset(pointerTracker.x, {
    from: ballX.get(),
    onUpdate: ballX
  }).start();
}

// Finish tracking
function stopTracking() {
  if (pointerTracker && pointerTracker.isActive()) {
    pointerTracker.stop();

    physics({
      from: ballX.get(),
      velocity: ballX.getVelocity(),
      onUpdate: ballX
    }).start();
  }
}

ballDom.addEventListener('mousedown', startTracking);
ballDom.addEventListener('touchstart', startTracking);
document.addEventListener('mouseup', stopTracking);
document.addEventListener('touchend', stopTracking);
`}</Example>
```

Notice how with this code you can both throw the ball and catch it, then throw it off again. We're pretty close to getting scrolling behaviour.

## Friction

However, outside of space, objects in motion usually come to a rest because of an opposing force. In making UIs, one of the forces we use is friction.

The physics `friction` property can be set as a value from `0` to `1`, where `0` applies no force over time, and `1` provides so much force that the object in motion stops immediately.

A nice, light-feeling range to use for scrolling is `0.15` - `0.3`:

```javascript
physics({
  from: ballXAction.get(),
  velocity: ballXAction.getVelocity(),
  friction: 0.2,
  onUpdate: setBallX
}).start();
```

```marksy
<Example template="Ball" id="b">{`
const ballDom = document.querySelector('#b .ball');
const ballRenderer = css(ballDom);
const ballX = value(0, (v) => ballRenderer.set('x', v));

let pointerTracker;

// Start tracking
function startTracking(e) {
  pointerTracker = pointer(e).start();
  trackOffset(pointerTracker.x, {
    from: ballX.get(),
    onUpdate: ballX
  }).start();
}

// Finish tracking
function stopTracking() {
  if (pointerTracker && pointerTracker.isActive()) {
    pointerTracker.stop();

    physics({
      from: ballX.get(),
      velocity: ballX.getVelocity(),
      friction: 0.2,
      onUpdate: ballX
    }).start();
  }
}

ballDom.addEventListener('mousedown', startTracking);
ballDom.addEventListener('touchstart', startTracking);
document.addEventListener('mouseup', stopTracking);
document.addEventListener('touchend', stopTracking);
`}</Example>
```

## Spring

Sometimes you'll want to snap an object in motion to a specific position (like the boundary of a scrolling set of items), or make a button feel more reactive. Spring physics is ideal for these situations.

Spring physics actions not unlike a `tween` with `easing.easeOut`. But a tween runs for a set duration of time and doesn't take into account the initial starting position or cvelocity. For truly reactive motion, spring physics is heavily influenced by its starting conditions.

Creating springs in Popmotion is as simple as providing `physics` two new properties, `to` and `spring`:

```javascript
physics({
  to: 0, // Provides the spring a destination
  spring: 500, // How tight is the spring
  from: ballX.get(),
  velocity: ballX.getVelocity(),
  friction: 0.9,
  onUpdate: ballX
}).start();
```

Press 'start' and throw this ball:

```marksy
<Example template="Ball" id="c">{`
const ballDom = document.querySelector('#c .ball');
const ballRenderer = css(ballDom);
const ballX = value(0, (v) => ballRenderer.set('x', v));

let pointerTracker;

// Start tracking
function startTracking(e) {
  pointerTracker = pointer(e).start();
  trackOffset(pointerTracker.x, {
    from: ballX.get(),
    onUpdate: ballX
  }).start();
}

// Finish tracking
function stopTracking() {
  if (pointerTracker && pointerTracker.isActive()) {
    pointerTracker.stop();

    physics({
      to: 0, // Provides the spring a destination
      spring: 500, // How tight is the spring
      from: ballX.get(),
      velocity: ballX.getVelocity(),
      friction: 0.9,
      onUpdate: ballX
    }).start();
  }
}

ballDom.addEventListener('mousedown', startTracking);
ballDom.addEventListener('touchstart', startTracking);
document.addEventListener('mouseup', stopTracking);
document.addEventListener('touchend', stopTracking);
`}</Example>
```

Try tweaking the `friction` and `spring` properties, to see how they affect the feel of the ball when it springs back.

Here's a different example of spring physics in action, powering the like button on [Drivetribe](https://drivetribe.com):

![](/static/guides/drivetribe-bump.gif)

Just by tweaking the properties of the physics, we can make the bounce back of an unlike feel marginally duller than a like:

![](/static/guides/drivetribe-unbump.gif)

## Conclusion

As we've seen, `physics` can be a core tool in many user interactions. Its ability to do non-deterministic motion makes it incredibly powerful, but it's the ability to change the starting conditions that erodes the barrier between the user and your interface. Using physics in places you might previously have used tweens can make your interface feel more alive, and more engaging.
