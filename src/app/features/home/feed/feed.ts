import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { LanguageService } from '../../../core/language.service';
import { ALL_CATEGORIES } from '../../../core/models/content.model';
import { openRows } from '../../../core/open-rows';
import { PracticeService } from '../../../core/practice.service';
import { FilterTabsComponent } from '../../shared/filter-tabs/filter-tabs';
import { PageSizeComponent } from '../../shared/page-size/page-size';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { SearchFieldComponent } from '../../shared/search-field/search-field';
import { QuestionRowComponent } from './question-row/question-row';

// Rows per page. Six keeps the page short enough to take in without scrolling,
// which is the point of the default; the cost is that 346 questions become 58
// pages. Rather than trade one reader's preference against the other's, the size
// is theirs to pick - the pager and the count follow whatever they choose.
// Exported for the spec, which sizes its expectations from these rather than
// hard-coding numbers that these lines can silently invalidate.
export const DEFAULT_PAGE_SIZE = 6;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48] as const;

@Component({
  selector: 'app-feed',
  imports: [
    FilterTabsComponent,
    PageSizeComponent,
    PaginationComponent,
    QuestionRowComponent,
    ReactiveFormsModule,
    SearchFieldComponent,
    TranslocoPipe,
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class FeedComponent {
  private readonly content = inject(ContentService);
  private readonly language = inject(LanguageService);

  protected readonly practice = inject(PracticeService);
  protected readonly t = this.language.t;

  // Categories flattened to the tab contract: label translated here, because the
  // copy is this feature's, and <app-filter-tabs> takes plain strings.
  protected readonly tabs = computed(() =>
    this.content.categories().map((category) => ({
      key: category.key,
      label: this.t(category.label),
      groupStart: category.groupStart,
    })),
  );

  protected readonly search = new FormControl('', { nonNullable: true });
  protected readonly term = toSignal(this.search.valueChanges, { initialValue: '' });

  // A tab key, so a plain string: <app-filter-tabs> is deliberately free of the
  // content model. The reset tab starts active.
  protected readonly activeCategory = signal<string>(ALL_CATEGORIES);

  // Rows per page, the reader's to choose through <app-page-size>.
  protected readonly pageSize = signal<number>(DEFAULT_PAGE_SIZE);
  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  // Writable, but resets to page 1 whenever the result set is rebuilt - a new
  // search term, another category, a language switch (the search matches the
  // active language's text, so switching changes what is found), or a new page
  // size, which renumbers every page under the reader.
  protected readonly page = linkedSignal({
    source: () => ({
      term: this.term(),
      category: this.activeCategory(),
      lang: this.language.lang(),
      size: this.pageSize(),
    }),
    computation: () => 1,
  });

  // Open answers, kept across paging and filtering: a row the reader opened is
  // still open when they come back to it.
  private readonly expanded = signal<ReadonlySet<string>>(new Set());
  protected readonly panels = openRows(this.expanded);

  protected readonly filtered = computed(() => {
    const term = this.term().trim().toLowerCase();
    const category = this.activeCategory();
    const t = this.t;
    return this.content.questions().filter((question) => {
      if (category !== ALL_CATEGORIES && question.category !== category) {
        return false;
      }
      if (term === '') {
        return true;
      }
      // The answer is optional while the bank is being written, so an
      // unanswered question is searchable by its question text alone.
      const answer = question.a;
      const haystack = answer === undefined ? t(question.q) : `${t(question.q)} ${t(answer)}`;
      return haystack.toLowerCase().includes(term);
    });
  });

  protected readonly count = computed(() => this.filtered().length);
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.count() / this.pageSize())),
  );

  protected readonly visible = computed(() => {
    const size = this.pageSize();
    const start = (this.page() - 1) * size;
    return this.filtered().slice(start, start + size);
  });

  // CLDR plural category ('one' | 'few' | 'many' | 'other'), used to pick the
  // feed.count.* key. Lang is a BCP 47 tag, so Intl takes it directly.
  // Ukrainian needs three forms where English needs two,
  // so both locale files define all four (see public/i18n/*.json).
  protected readonly countForm = computed(() =>
    new Intl.PluralRules(this.language.lang()).select(this.count()),
  );
}
