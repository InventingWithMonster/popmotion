# Popmotion Spinnable

### Use Popmotion to make any DOM node or React DOM component spinnable.

## Deprecated

[![npm version](https://img.shields.io/npm/v/popmotion-spinnable.svg?style=flat-square)](https://www.npmjs.com/package/popmotion-spinnable)
[![npm downloads](https://img.shields.io/npm/dm/popmotion-spinnable.svg?style=flat-square)](https://www.npmjs.com/package/popmotion-spinnable)
[![Twitter Follow](https://img.shields.io/twitter/follow/espadrine.svg?style=social&label=Follow)](http://twitter.com/popmotionjs)

## No longer maintained

# Spinnable

Make any DOM node or React DOM component spinnable in one line of code!

Provides an optional `onSpin` callback to use spinnable nodes as dial controls.

```marksy
<CodePen id="MoZXyM" />
```

## Install

```
npm install popmotion-spinnable --save
```

## DOM

To use with DOM nodes, simply provide a node to `spinnable`:

```javascript
import spinnable from "popmotion-spinnable";

const node = document.querySelector("div");
spinnable(node);
```

Or provide additional options:

```javascript
import { transform } from "popmotion";
const { snap } = transform;

spinnable(node, {
  onSpin: angle => console.log(angle),
  transformSpin: snap(45),
  friction: 1
});
```

`spinnable` returns an object with a `stop` method.

## React

```javascript
import Spinnable from "popmotion-spinnable/react";

export default ({ onSpin }) => <Spinnable className="dial" onSpin={onSpin} />;
```

## Options

* `friction`: Friction applied to the spin when the user releases. Set to `1` to stop dead. Default: `0.4`
* `onSpin`: Function to be called every frame, provided the latest angle.
* `transformSpin`: A function that takes the spin, and returns it before the value is applied to the node.
* `className`: **React only** Provides support for adding a class for styling purposes, and adds support for `styled-components`-esque styling systems.

## Methods

* `stop`: Hard stops any currently active actions. Generally only used when unmounting the node.
