import { Component, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// TEMP preview to verify Step 1 (tokens/fonts/theme).
const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly doc = inject(DOCUMENT);
  protected readonly theme = signal<Theme>('light');

  // Single source of truth for the toggle label - template just renders it.
  protected readonly toggleLabel = computed(() =>
    this.theme() === 'light' ? 'Dark theme' : 'Light theme',
  );

  constructor() {
    effect(() => {
      this.doc.documentElement.dataset['theme'] = this.theme();
    });
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
