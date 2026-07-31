import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { DEFAULT_LANG, Lang, Localized, isLang } from './models/language.model';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly transloco = inject(TranslocoService);

  // Single source of truth for the app; components read/render this signal.
  readonly lang = signal<Lang>(this.initial());

  // Reads the active language out of a bilingual content string.
  // An arrow property, not a method, so templates and computeds can pass it around.
  readonly t = (value: Localized): string => value[this.lang()];

  constructor() {
    // Keep Transloco's active language, <html lang>, and storage in sync.
    effect(() => {
      const lang = this.lang();
      this.transloco.setActiveLang(lang);
      // Lang is a BCP 47 tag (see LANGS), so it goes straight on <html lang>:
      // screen readers pick a voice from this attribute.
      this.doc.documentElement.lang = lang;
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  private initial(): Lang {
    if (!this.isBrowser) {
      return DEFAULT_LANG;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLang(saved) ? saved : DEFAULT_LANG;
  }
}
