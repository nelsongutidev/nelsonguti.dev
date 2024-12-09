import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-theme-selector',
    imports: [NgIf],
    templateUrl: './theme-selector.component.html'
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);
  selectedTheme = this.themeService.selectedTheme;
  THEME = Theme;

  toggleTheme() {
    const newTheme =
      this.selectedTheme() === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    this.selectedTheme.set(newTheme);
  }
}
