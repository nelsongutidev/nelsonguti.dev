import { Injectable, effect, inject, signal } from '@angular/core';

export const DATA_KEY = 'analog-blog-theme';

export enum Theme {
  LIGHT = 'light',
  DARK = 'night',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  selectedTheme = signal<Theme>(Theme.LIGHT);
}
