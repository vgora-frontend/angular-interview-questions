import { TestBed } from '@angular/core/testing';
import {
  provideTranslocoMissingHandler,
  TranslocoService,
  TranslocoTestingModule,
} from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../models/language.model';
import { StrictMissingHandler } from './strict-missing-handler';

// Tests run with ngDevMode on, so the handler always takes its dev branch here.
describe('StrictMissingHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { en: { header: { controls: 'Site controls' } }, uk: {} },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
      providers: [provideTranslocoMissingHandler(StrictMissingHandler)],
    });
  });

  it('translates a key that exists', () => {
    expect(TestBed.inject(TranslocoService).translate('header.controls')).toBe('Site controls');
  });

  it('renders a visible marker for a missing key', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(TestBed.inject(TranslocoService).translate('header.controls2')).toBe(
      '[i18n:MISSING header.controls2]',
    );
    expect(error).toHaveBeenCalledOnce();
    expect(error.mock.calls[0][0]).toContain("Missing translation for 'header.controls2'");

    error.mockRestore();
  });
});
