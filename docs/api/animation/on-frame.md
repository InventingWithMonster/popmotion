---
title: On Frame
description: Fires with timestamp, once every frame.
category: animation
---

# On Frame

On Frame fires once per frame, and provides the given `update` the latest frame timestamp.

## Import

```javascript
import { onFrame } from 'popmotion';
// or stand-alone:
import onFrame from 'popmotion/animations/on-frame';
```

## Usage

```javascript
onFrame().start((timestamp) => console.log(timestamp));
```

## Example

TODO