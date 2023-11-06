import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-logo',
  standalone: true,
  imports: [CommonModule],
  template: `<img class="w-10" src="/images/angular_gradient.png" alt="" />`,
})
export class AngularLogoComponent {}
