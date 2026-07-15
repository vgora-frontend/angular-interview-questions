import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

// Run any pending effects (the service writes data-theme / localStorage in one).
function flushEffects(): void {
  TestBed.inject(ApplicationRef).tick();
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  afterEach(() => {
    // jsdom has no matchMedia; drop any stub so other tests see it absent again.
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(TestBed.inject(ThemeService)).toBeTruthy();
  });

  describe('initial()', () => {
    it('defaults to light with no stored value and no system preference', () => {
      const service = TestBed.inject(ThemeService);
      expect(service.theme()).toBe('light');
    });

    it('reads a valid stored theme', () => {
      localStorage.setItem('theme', 'dark');
      const service = TestBed.inject(ThemeService);
      expect(service.theme()).toBe('dark');
    });

    it('ignores an invalid stored value and uses the default', () => {
      localStorage.setItem('theme', 'purple');
      const service = TestBed.inject(ThemeService);
      expect(service.theme()).toBe('light');
    });

    it('falls back to the system preference when nothing is stored', () => {
      vi.stubGlobal('matchMedia', (query: string) => ({ matches: true, media: query }));
      const service = TestBed.inject(ThemeService);
      expect(service.theme()).toBe('dark');
    });
  });

  describe('toggle()', () => {
    it('flips light <-> dark', () => {
      const service = TestBed.inject(ThemeService);
      expect(service.theme()).toBe('light');
      service.toggle();
      expect(service.theme()).toBe('dark');
      service.toggle();
      expect(service.theme()).toBe('light');
    });
  });

  describe('next', () => {
    it('is the opposite of the current theme', () => {
      const service = TestBed.inject(ThemeService);
      expect(service.next()).toBe('dark');
      service.toggle();
      expect(service.next()).toBe('light');
    });
  });

  describe('effect', () => {
    it('writes data-theme on the document element and updates on toggle', () => {
      const service = TestBed.inject(ThemeService);
      flushEffects();
      expect(document.documentElement.dataset['theme']).toBe('light');

      service.toggle();
      flushEffects();
      expect(document.documentElement.dataset['theme']).toBe('dark');
    });

    it('persists the theme to localStorage', () => {
      const service = TestBed.inject(ThemeService);
      service.toggle();
      flushEffects();
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
