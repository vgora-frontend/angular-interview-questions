import { Injectable, isDevMode } from '@angular/core';
import { TranslocoMissingHandler, TranslocoMissingHandlerData } from '@jsverse/transloco';

// Transloco's default handler only console.warn()s and renders the raw key, so
// a typo like 'header.controls2' looks almost identical to a real translation.
// In dev we shout about it: an error in the console plus a marker in the DOM.
// In prod we degrade quietly (render the key) - a broken label must never take
// a page down for a visitor.
@Injectable({ providedIn: 'root' })
export class StrictMissingHandler implements TranslocoMissingHandler {
  // fallow-ignore-next-line unused-class-member -- Called by Transloco at runtime via the TranslocoMissingHandler interface.
  handle(key: string, data: TranslocoMissingHandlerData): string {
    if (!isDevMode()) {
      return key;
    }

    console.error(
      `[i18n] Missing translation for '${key}' (lang: ${data.activeLang}). ` +
        'Add it to public/i18n/*.json or fix the key in the template.',
    );

    return `[i18n:MISSING ${key}]`;
  }
}
