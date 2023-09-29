import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { NgClass } from '@angular/common';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AngularLogoComponent } from './shared/components/angular-logo/angular-logo.component';
import { ThemeService } from './shared/services/theme.service';
import { ThemeSelectorComponent } from './shared/components/theme-selector/theme-selector.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  imports: [
    RouterModule,
    NgClass,
    SidenavComponent,
    FooterComponent,
    AngularLogoComponent,
    ThemeSelectorComponent,
  ],
})
export class AppComponent {
  themeService = inject(ThemeService);
  selectedTheme = this.themeService.selectedTheme;

  isMenuClosed = true;

  toggleMenu() {
    if (!this.isMenuClosed) {
      this.isMenuClosed = true;
    }
  }
}
