import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Theme, isTheme } from './models/theme.model';

const STORAGE_KEY = 'theme';

// Fallback when there is no stored choice and no system preference to read.
const DEFAULT_THEME: Theme = 'light';

// The theme each theme toggles to. `Record<Theme, Theme>` forces an entry per
// theme, so a new theme won't compile until its opposite is defined.
const OPPOSITE: Record<Theme, Theme> = { light: 'dark', dark: 'light' };

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.initial());

  // The theme a toggle would switch to. Derived once here so components render
  // it and never re-derive the "opposite" logic themselves.
  readonly next = computed<Theme>(() => OPPOSITE[this.theme()]);

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.doc.documentElement.dataset['theme'] = theme;
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    });
  }

  toggle(): void {
    this.theme.set(this.next());
  }

  private initial(): Theme {
    if (!this.isBrowser) {
      return DEFAULT_THEME;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isTheme(saved)) {
      return saved;
    }
    // matchMedia is missing in some environments (e.g. jsdom under test).
    if (typeof matchMedia === 'function') {
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return DEFAULT_THEME;
  }
}
