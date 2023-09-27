import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';

export const routeMeta: RouteMeta = {
  title: 'Angular CLI Explorer',
};

@Component({
  selector: 'app-angular-cli',
  standalone: true,
  template: `
    <h1
      class="text-slate-800 text-4xl md:text-6xl tracking-tight lg:px-24 md:py-12 px-6 pt-8"
    >
      Angular CLI Explorer
    </h1>
  `,
  imports: [],
})
export default class AngularCliExplorerComponent {
  constructor() {}
}
