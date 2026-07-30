import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco, provideTranslocoMissingHandler } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { StrictMissingHandler } from './core/i18n/strict-missing-handler';
import { DEFAULT_LANG, LANGS } from './core/models/content.model';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: [...LANGS],
        defaultLang: DEFAULT_LANG,
        fallbackLang: DEFAULT_LANG,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    // Must come after provideTransloco - it registers the default handler.
    provideTranslocoMissingHandler(StrictMissingHandler),
  ],
};
