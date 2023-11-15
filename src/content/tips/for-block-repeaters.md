---
title: "@for block - Repeaters"
description: "The @for repeatedly renders content of a block for each item in a collection."
src: ""
srcLarge: ""
tweetId: ""
tags: ["Angular", "Angular 17"]
date: "November 14, 2023"
published: true
---

# @for block - Repeaters

Available in version 17, the new @for block repeatedly renders content of a block for each item in a collection. It part of the built in support features regarding control flow.

A basic @for loop looks like:

```
@for (item of items; track item.id) {
<div>{{ item.name }}</div>
}
```

Just like with the NgFor structural directive, inside @for contents, **several implicit variables are always available**:

- $count - Number of items in a collection iterated over
- $index - Index of the current row
- $first - Whether the current row is the first row
- $last - Whether the current row is the last row
- $even - Whether the current row index is even
- $odd - Whether the current row index is odd

```
@for (item of items; track item.id){
<p [class.is-last]="$last">idx: {{ $index }} - {{ item.name }}</p>
}
```
