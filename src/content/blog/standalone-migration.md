---
title: "Angular’s Improved Tooling: Standalone Migration Magic"
description: "Navigating New Tools and Migration Schematics"
date: "Oct 27, 2023"
tags: ["Angular"]
published: true
---

# Angular’s Improved Tooling: Standalone Migration Magic

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*xKZPG93QrdJ5Qe8i_sIe-g.png](https://miro.medium.com/v2/resize:fit:720/format:webp/1*xKZPG93QrdJ5Qe8i_sIe-g.png)

In [Angular 15](https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8), the [new standalone APIs](https://angular.io/guide/standalone-components) graduated from developer preview and are now part of the stable API. To support developers transitioning their apps to standalone APIs, the Angular team provided two new tools: a standalone migration schematic and the standalone ng new collection. In this post, we will go over both of them along with an example of the standalone migration schematic put to use in an awesome open-source project.

### Standalone Migration Schematic

Available from version 15.2, this schematic’s main goal is to help developers convert existing projects to the new standalone APIs. Along with it, the team created a great [standalone migration guide](https://angular.io/guide/standalone-migration). As explained in the guide, the schematic aims to convert as much code automatically, but it may require some manual fixes and updates by the project author, as we will see later in this post.

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

```
ng generate @angular/core:standalone-migration
```

After running the command, the CLI will prompt you with the three migration steps as can be seen in the image:

!https://cdn-images-1.medium.com/max/800/1*gQ3YS9LTgapoP2b_QcTdaw.png

Using the arrow keys, select the steps and **make sure you run them in the specified order** (_convert-to-standalone_ first, then _prune-ng-modules,_ and lastly _standalone-bootstrap_). \*\*\*\*Along with this, it is important to make sure the project builds correctly between each step.

### Schematic Options

The schematic provides [options](https://angular.io/guide/standalone-migration#schematic-options) to pass to the command in case you want to be more specific about what you want to be done by the migration.

1. `mode`: This option accepts the transformation that is going to be performed. The available choices here are the following:

`convert-to-standalone` | `prune-ng-modules` | `standalone-bootstrap`

So for example, if you were to run the first step of the schematic using the `mode` option in the command, you would run:

```
ng generate @angular/core:standalone --mode convert-to-standalone
```

2. `path`: This option accepts the path to migrate relative to the project root. **This option is particularly useful if you want to migrate sections of your project incrementally.**

For example, if you were to run the first step of the schematic on a specific feature, let's say called `payments` for instance, you could run:

```
ng generate @angular/core:standalone --mode convert-to-standalone --path src/app/payments
```

> ⚠️ _Important Note:_ While trying the schematic myself, I found that in order for this command to work when pointing to a specific path, the targeted folder must contain an `NgModule` .

### Let's try it

In order to get my hands on it to be able to use it and after some research over at Github, I found the perfect OS project to try it on: [Angular Jira Clone](https://github.com/trungk18/jira-clone-angular) by [Trung Vo](https://medium.com/u/30cecae1665e). This was an excellent fit for this not only because it is an amazing project, but also because it is an great example of modern, real-world Angular codebase and it is on Angular 13, which is what I needed to test the schematic.

In the first step, as explained in the pre-requisites section of this post, I migrated the project to Angular version 15.2 (the minimal version needed to use the schematic), I ran each of the migration steps using the schematic. The following is a walkthrough of each of the steps taken, what each step does, and my findings on each.

### Step 1- Convert declarations to standalone

After running the `ng generate @angular/core:standalone --mode convert-to-standalone` command, the migration schematic did the magic.

In this step, I found the schematic does three things:

1. It converts all components, directives, and pipes into standalone by adding the `standalone: true` .
2. It updates the `imports` array with the component’s dependencies, which it correctly [infers](https://github.com/angular/angular/blob/main/packages/core/schematics/ng-generate/standalone-migration/to-standalone.ts#L37) from the module the component is declared.
3. It updates the module the component, directive, or pipe belonged to, it removes it from its declarations, and adds it to its imports instead.

The following is an example of all of these changes done in one of the components of the project, the `avatar.component.ts.`

As can be seen in the code snippet, the `standalone:true` flag was added to the component, and the `imports` were updated accordingly.

```diff
avatar.component.ts

@@ -1,9 +1,12 @@

import { Component, Input } from '@angular/core';
+ import { NgIf, NgClass, NgStyle } from '@angular/common';

@Component({
     selector: 'j-avatar',
     templateUrl: './avatar.component.html',
-     styleUrls: ['./avatar.component.scss']
+     styleUrls: ['./avatar.component.scss'],
+     standalone: true,
+     imports: [NgIf, NgClass, NgStyle]
})
export class AvatarComponent {
  @Input() avatarUrl: string;
```

Along with this, the migration schematic step also was smart enough to update the module the avatar component belonged to, remove it from its declarations, and add it to its imports instead.

The `AvatarComponent` belonged to the `JiraControlModule` , so this is how the migration changed that particular file.

```diff
jira-control.module.ts

@@ -17,8 +17,7 @@

const JiraControlComponents = [
  ...aLotOfOtherComponents,
  AvatarComponent
];

@NgModule({
-  declarations: JiraControlComponents,
-  exports: JiraControlComponents,
-  imports: [CommonModule, ReactiveFormsModule]
+    exports: JiraControlComponents,
+    imports: [CommonModule, ReactiveFormsModule, ...JiraControlComponents]
})
export class JiraControlModule {}
```

After running this step, I built the application and everything worked fine. At this point, no modules have been removed yet, or any change on the application’s bootstrapping has been made either, so it was safe to assume the application would build properly.

> ⚠️ _Important Note:_ As mentioned in the [standalone migration guide](https://angular.io/guide/standalone-migration#convert-declarations-to-standalone), “the schematic ignores NgModules which bootstrap a component during this step because they are likely root modules used by `bootstrapModule` rather than the standalone-compatible `[bootstrapApplication](https://angular.io/api/platform-browser/bootstrapApplication)` .”

You can find all the changes made by the migration schematic in this step on this [commit](https://github.com/trungk18/jira-clone-angular/commit/709966758148620cf78a37a651b9691e0c58b395).

### Step 2- Remove NgModules

When running the command for this step `ng generate @angular/core:standalone --mode prune-ng-modules` , the migration did not make any changes, even though there were several `NgModules` that could have been removed. The [standalone migration guide](https://angular.io/guide/standalone-migration#remove-unnecessary-ngmodules) does mention clearly that for this step, it is considered safe to remove a module only if:

1. It has no `declarations` or `providers`
2. It has no `bootstrap` components
3. It has no `imports` that reference a `[ModuleWithProviders](https://angular.io/api/core/ModuleWithProviders)` symbol or a module that can’t be removed
4. It has no class members

The `NgModules` on the project had at least one of the items missing, so for this step, unfortunately, nothing was able to be automated. At this point, I decided to then proceed to step 3.

### Step 3- Switch to standalone bootstrapping API

In this last step, I ran the `ng generate @angular/core:standalone --mode standalone-bootstrap` command. For this one, it successfully migrated the bootstrapping of the application. In this step, the migration successfully did the following:

1. Converted any usage of `bootstrapModule` to the new standalone `bootstrapApplication`
2. Added the `standalone: true` to the root component
3. Deleted the root `NgModule`
4. Added the providers and imports the root module had to the new bootstrap call

The following were the changes made:

- `app.module.ts` file was deleted

```diff
app.component.ts

@@ -1,15 +1,19 @@

import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
- import { Router, NavigationEnd } from '@angular/router';
+ import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ProjectQuery } from './project/state/project/project.query';
import { ProjectService } from './project/state/project/project.service';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
+ import { AsyncPipe } from '@angular/common';
+ import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
-   encapsulation: ViewEncapsulation.None
+   encapsulation: ViewEncapsulation.None,
+   standalone: true,
+   imports: [NzSpinModule, RouterOutlet, AsyncPipe]
})

```

```diff
main.ts

@@ -1,9 +1,22 @@

- import { enableProdMode } from '@angular/core';
+ import { enableProdMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
- import { AppModule } from './app/app.module';

import { environment } from './environments/environment';
+ import { AppComponent } from './app/app.component';
+ import { QuillModule } from 'ngx-quill';
+ import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
+ import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
+ import { NzIconModule } from 'ng-zorro-antd/icon';
+ import { NzSpinModule } from 'ng-zorro-antd/spin';
+ import { AppRoutingModule } from './app/app-routing.module';
+ import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
+ import { ReactiveFormsModule } from '@angular/forms';
+ import { provideAnimations } from '@angular/platform-browser/animations';
+ import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
+ import { Router } from '@angular/router';
+ import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

...

@@ -25,6 +38,29 @@

- platformBrowserDynamic()
-   .bootstrapModule(AppModule)
+ bootstrapApplication(AppComponent, {
+    providers: [
+        importProvidersFrom(BrowserModule, ReactiveFormsModule, AppRoutingModule, NzSpinModule, NzIconModule.forRoot([]), environment.production ? [] : AkitaNgDevtools, AkitaNgRouterStoreModule, QuillModule.forRoot()),
+        {
+            provide: NG_ENTITY_SERVICE_CONFIG,
+            useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
+        },
+        {
+            provide: ErrorHandler,
+            useValue: Sentry.createErrorHandler()
+        },
+        {
+            provide: Sentry.TraceService,
+            deps: [Router],
+        },
+        {
+          provide: APP_INITIALIZER,
+            useFactory: () => () => { },
+            deps: [Sentry.TraceService],
+            multi: true,
+        },
+        provideAnimations(),
+        provideHttpClient(withInterceptorsFromDi())
+    ]
+ })
  .catch((err) => console.error(err));
```

You can find all the changes made by the migration schematic for this step on this [commit](https://github.com/trungk18/jira-clone-angular/commit/fe518479b95af9105ec10b78d23a7218a2d96fda).

After doing this step, the application was built successfully.

### Wrapping up the standalone migration

After the completion of all three steps, I went back and did the removal of unnecessary `NgModules` manually, which you can see in these commits ([part 1](https://github.com/trungk18/jira-clone-angular/commit/3081377a3a890ab97a7a731cf4a00b6caa95e767) and [part 2](https://github.com/trungk18/jira-clone-angular/commit/8efea204dba9f42d6aba7851fed1a51165cff49f)). It was then that I realized the migration schematic does not migrate the routing on the project to use the [new standalone router API](https://angular.io/api/router/provideRouter), so I went and did that manually as well in order to have a completely standalone application on this [commit](https://github.com/trungk18/jira-clone-angular/commit/3081377a3a890ab97a7a731cf4a00b6caa95e767).

### Testing

Regarding testing, this particular project has only part of it with test coverage. After running the migration, I found that the `module.spec.ts` files (unit tests for module files) were not removed. This is, though, a [known limitation](https://angular.io/guide/standalone-migration#limitations) the migration guide does specify.

After having done that, the 38 tests the project had run successfully, so that speaks well of the schematic on this front.

Along with the one just mentioned, the guide also outlines the following [common problems](https://angular.io/guide/standalone-migration#common-problems) the schematic has:

- Compilation errors — if the project has compilation errors, Angular cannot analyze and migrate those correctly.
- Files not included in a tsconfig — the schematic determines which files to migrate by analyzing your project’s `tsconfig.json` files. The schematic excludes any files not captured by a tsconfig.
- Code that cannot be statically analyzed — the schematic uses static analysis to understand your code and determine where to make changes. The migration may skip any classes with metadata that cannot be statically analyzed at build time.

Overall, I had a very positive experience with the standalone migration schematic and highly recommend it. It felt like magic, especially with the first migration step, where it does an amazing job at converting components, directives, and pipes into standalone.

### Standalone ng new collection

What if we are creating a project from scratch and we want it to use standalone APIs? The ng new collection added by the team on v16 tooling improvements has you covered. You can do it by running this simple command, substituting `project-name` accordingly:

```
ng new project-name --standalone
```

By doing this, the CLI you’ll get a much simpler project output completely standalone, without any `NgModules`. Along with this, all the generators in the project will produce standalone directives, components, and pipes!

### Sneak peek into the future: Angular 17

In the next angular release, version 17, the CLI will create [standalone applications by default](https://github.com/angular/angular-cli/pull/25884), without the need to pass the `standalone` flag.

I hope you found this post about Angular’s improved tooling useful. Feel free to add your experience with the standalone migration schematic in the comments as it would be exciting to read about how it worked on other and bigger Angular apps.
