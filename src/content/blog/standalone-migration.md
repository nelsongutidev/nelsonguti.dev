---
title: "Angular’s Improved Tooling: Standalone Migration Magic"
description: "Navigating New Tools and Migration Schematics"
date: "Oct 27, 2023"
tags: ["Angular"]
published: false
---

In [Angular 15](https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8), the [new standalone APIs](https://angular.io/guide/standalone-components) graduated from developer preview and are now part of the stable API. To support developers transitioning their apps to standalone APIs, the Angular team provided two new tools: a standalone migration schematic and the standalone ng new collection. In this post, we will go over both of them along with an example of the standalone migration schematic put to use in an awesome open-source project.

## Standalone Migration Schematic

Available from version 15.2, this schematic's main goal is to help developers convert existing projects to the new standalone APIs. Along with it, the team created a great [standalone migration guide](https://angular.io/guide/standalone-migration). As explained in the guide, the schematic aims to convert as much code automatically, but it may require some manual fixes and updates by the project author, as we will see later in this post.

### Pre-requisites

Before running the schematic, the project author must ensure that the project:

1. Is using at least Angular 15.2.0
2. Builds without any compilation errors
3. Is on a clean Git branch

### Standalone Migration Schematic

The standalone migration consists of the following three steps (referred to as modes by the schematic):

1. Convert declarations for all components, directives, and pipes to standalone
2. Remove unnecessary NgModules.
3. Switch to standalone bootstrapping API.

In order to run the schematic, use the following command.

```bash
ng generate @angular/core:standalone-migration
```

After running the command, the CLI will prompt you with the three migration steps as can be seen in the image:

add image

Using the arrow keys, select the steps and **make sure you run them in the specified order** (_convert-to-standalone_ first, then _prune-ng-modules_, and lastly _standalone-bootstrap_). Along with this, it is important to make sure the project builds correctly between each step.

### Schematic Options
