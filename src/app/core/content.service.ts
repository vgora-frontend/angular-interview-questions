import { Injectable, signal } from '@angular/core';
import { CATEGORIES, CATEGORY_TAGS, QUESTIONS } from './data/content.data';
import { CategoryKey } from './models/content.model';

// The single read path to the content. Components inject this instead of
// importing the data files, so the source can later move to an HTTP resource
// without touching a single component.
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly questions = signal(QUESTIONS).asReadonly();
  readonly categories = signal(CATEGORIES).asReadonly();

  // The mono label a question's row shows. Total by construction: CATEGORY_TAGS
  // covers every CategoryKey, so there is no missing-tag case to fall back from.
  tagFor(category: CategoryKey): string {
    return CATEGORY_TAGS[category];
  }
}
