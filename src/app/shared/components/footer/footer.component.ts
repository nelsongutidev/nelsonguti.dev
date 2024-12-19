import { Component, inject, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgSitenameAnimationComponent } from '../svg-sitename-animation/svg-sitename-animation.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, SvgSitenameAnimationComponent],
    templateUrl: './footer.component.html',
    styles: []
})
export class FooterComponent {
  protected readonly VERSION = VERSION;
  private readonly router = inject(Router);
  readonly disableSitenameAnimation$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url === '/')
  );
}
