import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

// Loads translation JSON from public/i18n/<lang>.json.
// The relative path (no leading slash) resolves against <base href>,
// so it also works when the app is deployed under a sub-path (e.g. GitHub Pages).
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  // fallow-ignore-next-line unused-class-member -- Called by Transloco at runtime via the TranslocoLoader interface.
  getTranslation(lang: string) {
    return this.http.get<Translation>(`i18n/${lang}.json`);
  }
}
