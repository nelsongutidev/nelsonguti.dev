---
title: "Testing user input interactions"
description: "When testing user input, make sure to dispatch an input event after setting the input element's value property."
src: ""
srcLarge: ""
tweetId: ""
tags: ["Angular", "Testing"]
date: "Oct 31, 2023"
published: true
slug: "testing-inputs"
---

# Testing user input interactions

When testing user input, make sure to dispatch an input event after setting the input element's value property.

Angular doesn't know that you set the input element's value property if you don't do this. After this, make sure to call `detectChanges()` on the test harness/fixture.

The following example demonstrates the proper sequence.

```typescript
it("should convert hero name to Title Case", () => {
  // get the name's input and display elements from the DOM
  const hostElement: HTMLElement = harness.routeNativeElement!;
  const nameInput: HTMLInputElement = hostElement.querySelector("input")!;
  const nameDisplay: HTMLElement = hostElement.querySelector("span")!;

  // simulate user entering a new name into the input box
  nameInput.value = "quick BROWN  fOx";

  // Dispatch a DOM event so that Angular learns of input value change.
  nameInput.dispatchEvent(new Event("input"));

  // Tell Angular to update the display binding through the title pipe
  harness.detectChanges();

  expect(nameDisplay.textContent).toBe("Quick Brown  Fox");
});
```
