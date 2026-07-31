import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { LanguageService } from './language.service';
import { DEFAULT_LANG, LANGS } from './models/language.model';

// The service writes <html lang>,
// Transloco's active lang and storage in an effect, so tests must let it run.
function flushEffects(): void {
  TestBed.inject(ApplicationRef).tick();
}

function service(): LanguageService {
  TestBed.configureTestingModule({
    imports: [
      TranslocoTestingModule.forRoot({
        langs: Object.fromEntries(LANGS.map((lang) => [lang, {}])),
        translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
        preloadLangs: true,
      }),
    ],
  });
  const instance = TestBed.inject(LanguageService);
  flushEffects();
  return instance;
}

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('starts on the default language', () => {
    expect(service().lang()).toBe(DEFAULT_LANG);
  });

  describe('<html lang>', () => {
    // Screen readers choose a voice from this attribute,
    // so it has to be a real language tag, not an internal code.
    it('follows the active language', () => {
      const language = service();

      language.set('uk');
      flushEffects();
      expect(document.documentElement.lang).toBe('uk');

      language.set('en');
      flushEffects();
      expect(document.documentElement.lang).toBe('en');
    });
  });

  describe('LANGS as BCP 47 tags', () => {
    // The reason the codes are 'en' and 'uk': they go to Intl and <html lang> unchanged.
    // A country code like 'ua' resolves to the default locale instead,
    // silently handing Ukrainian text English plural rules.
    it('every supported language is a tag Intl resolves to itself', () => {
      for (const lang of LANGS) {
        expect(new Intl.PluralRules(lang).resolvedOptions().locale).toBe(lang);
      }
    });

    it('gives Ukrainian its three plural forms', () => {
      const rules = new Intl.PluralRules('uk');

      expect([rules.select(1), rules.select(2), rules.select(5)]).toEqual(['one', 'few', 'many']);
    });
  });

  describe('persistence', () => {
    it('stores the active language', () => {
      const language = service();

      language.set('uk');
      flushEffects();

      expect(localStorage.getItem('lang')).toBe('uk');
    });

    it('restores a stored language', () => {
      localStorage.setItem('lang', 'uk');

      expect(service().lang()).toBe('uk');
    });

    it('falls back to the default for a value it does not recognise', () => {
      // 'ua' was the old code for Ukrainian, so a returning visitor may still
      // have it stored; it must not be accepted as a language.
      localStorage.setItem('lang', 'ua');

      expect(service().lang()).toBe(DEFAULT_LANG);
    });
  });

  describe('t()', () => {
    it('reads the active language out of a bilingual string', () => {
      const language = service();
      const label = { en: 'Light', uk: 'Svitla' };

      expect(language.t(label)).toBe('Light');

      language.set('uk');
      expect(language.t(label)).toBe('Svitla');
    });
  });

  it('tells Transloco which language is active', () => {
    const language = service();

    language.set('uk');
    flushEffects();

    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('uk');
  });
});
