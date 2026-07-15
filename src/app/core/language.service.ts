import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Lang, Localized, isLang } from './models/content.model';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly lang = signal<Lang>(this.initial());

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = lang;
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  // Resolve a bilingual value to the active language. An arrow field so it can
  // be passed straight to templates without losing `this`.
  readonly t = (value: Localized): string => value[this.lang()];

  private initial(): Lang {
    if (!this.isBrowser) {
      return 'en';
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLang(saved) ? saved : 'en';
  }
}
