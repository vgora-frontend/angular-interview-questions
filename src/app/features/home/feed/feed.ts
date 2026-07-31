import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { LanguageService } from '../../../core/language.service';
import { ALL_CATEGORIES } from '../../../core/models/content.model';
import { PracticeService } from '../../../core/practice.service';
import { FilterTabsComponent } from '../../shared/filter-tabs/filter-tabs';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { SearchFieldComponent } from '../../shared/search-field/search-field';
import { QuestionRowComponent } from './question-row/question-row';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-feed',
  imports: [
    FilterTabsComponent,
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
      divider: category.divider,
    })),
  );

  protected readonly search = new FormControl('', { nonNullable: true });
  protected readonly term = toSignal(this.search.valueChanges, { initialValue: '' });

  // A tab key, so a plain string: <app-filter-tabs> is deliberately free of the
  // content model. The reset tab starts active.
  protected readonly activeCategory = signal<string>(ALL_CATEGORIES);

  // Writable, but resets to page 1 whenever the result set is rebuilt - a new
  // search term, another category, or a language switch (the search matches the
  // active language's text, so switching changes what is found).
  protected readonly page = linkedSignal({
    source: () => ({
      term: this.term(),
      category: this.activeCategory(),
      lang: this.language.lang(),
    }),
    computation: () => 1,
  });

  private readonly expanded = signal<ReadonlySet<string>>(new Set());

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
      return `${t(question.q)} ${t(question.a)}`.toLowerCase().includes(term);
    });
  });

  protected readonly count = computed(() => this.filtered().length);
  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.count() / PAGE_SIZE)));

  protected readonly visible = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  // CLDR plural category ('one' | 'few' | 'many' | 'other'), used to pick the
  // feed.count.* key. Lang is a BCP 47 tag, so Intl takes it directly.
  // Ukrainian needs three forms where English needs two,
  // so both locale files define all four (see public/i18n/*.json).
  protected readonly countForm = computed(() =>
    new Intl.PluralRules(this.language.lang()).select(this.count()),
  );

  protected isOpen(id: string): boolean {
    return this.expanded().has(id);
  }

  protected toggle(id: string): void {
    this.expanded.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(id)) {
        next.add(id);
      }
      return next;
    });
  }
}
