import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';

export const routeMeta: RouteMeta = {
  title: 'Angular CLI Explorer',
};

@Component({
  selector: 'app-angular-cli',
  standalone: true,
  imports: [HeaderComponent],
  template: ` <app-header [title]="'Angular CLI Explorer'" /> `,
})
export default class AngularCliExplorerComponent {
  constructor() {}
}
