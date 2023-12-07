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
