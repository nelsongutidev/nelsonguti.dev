---
title: "Keycodes"
description: "Angular's CDK provides a module with commonly used keycode constants."
src: ""
srcLarge: ""
tweetId: ""
tags: ["Angular", "Angular CDK"]
date: "Oct 10, 2023"
published: true
path: keycodes
---

# Keycodes

Angular's CDK provides a module with commonly used keycode constants.

```typescript
import { Directive } from "@angular/core";
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from "@angular/cdk/keycodes";

@Directive({
  selector: "[count-arrows]",
  standalone: true,
  host: {
    "(keydown)": "handleKeyPress($event)",
  },
})
export class ArrowCounterDirective {
  arrowPressCount = 0;

  handleKeyPress(event: KeyboardEvent) {
    if ([UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(event.keyCode)) {
      this.arrowPressCount++;
      console.log(this.arrowPressCount);
    }
  }
}
```
