import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-herodevs-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herodevs-logo.component.html',
  styles: [],
})
export class HerodevsLogoComponent {
  themeService = inject(ThemeService);
  selectedTheme = this.themeService.selectedTheme;
  THEME = Theme;
}
