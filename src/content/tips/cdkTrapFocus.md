---
title: "cdkTrapFocus"
description: "The Angular CDK provides the cdkTrapFocus directive, which traps Tab key focus within an element."
src: ""
srcLarge: ""
tweetId: ""
tags: ["Angular", "Angular CDK"]
date: "Oct 17, 2023"
published: true
slug: "cdktrapfocus"
---

# cdkTrapFocus

The Angular CDK provides the [cdkTrapFocus](https://material.angular.io/cdk/a11y/overview#focustrap) directive, which traps Tab key focus within an element. This is intended to be used to create accessible experience for components like [modal dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), where focus must be constrained. This directive will not prevent focus from moving out of the trapped region due to mouse interaction.

Angular's CDK Dialog uses this directive internally to trap focus within the dialog element, as well as Angular's Material Dialog component, which is built on top of the CDK Dialog.

```html
<div class="my-inner-dialog-content" cdkTrapFocus>
  <!-- Tab and Shift + Tab will not leave this element. -->
  <input type="text" />
  <textarea rows="10" cols="50"></textarea>
  <button>Save</button>
  <button>Close</button>
</div>
```

The directive is part of the A11yModule, so you'll need to import it from @angular/cdk/a11y.

```ts
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: "my-component",
  templateUrl: "my-component.html",
  imports: [A11yModule]
})
```
