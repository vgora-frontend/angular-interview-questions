import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { PracticeService } from '../../../core/practice.service';
import { Category, CategoryKey, Question } from '../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { FeedComponent } from './feed';

// Fixed content, so these tests do not shift every time a real question is
// added. Eight questions over a PAGE_SIZE of 6 means page 2 holds exactly two.
const question = (id: string, category: CategoryKey, text: string): Question => ({
  id,
  category,
  q: { en: text, uk: text },
  a: { en: `answer about ${text}`, uk: `answer about ${text}` },
});

const QUESTIONS: Question[] = [
  question('q1', 'signals', 'signal basics'),
  question('q2', 'signals', 'computed laziness'),
  question('q3', 'signals', 'linkedSignal'),
  question('q4', 'signals', 'effects'),
  // Unanswered on purpose: the bank is written before it is answered, so the
  // feed has to search and render a question that has no answer text at all.
  { ...question('q5', 'signals', 'untracked'), a: undefined },
  question('q6', 'rxjs', 'switchMap'),
  question('q7', 'rxjs', 'takeUntilDestroyed'),
  question('q8', 'rxjs', 'toSignal'),
];

const CATEGORIES: Category[] = [
  { key: 'all', label: { en: 'All', uk: 'All' } },
  { key: 'signals', label: { en: 'Signals', uk: 'Signals' } },
  { key: 'rxjs', label: { en: 'RxJS', uk: 'RxJS' } },
];

const TRANSLATIONS = {
  feed: {
    sectionLabel: 'Questions',
    tabsLabel: 'Filter',
    random: 'Random',
    soon: 'SOON',
    empty: 'Nothing matches "{{term}}"',
    search: { placeholder: 'Search', label: 'Search questions' },
    count: {
      one: '{{count}} question',
      few: '{{count}} questions',
      many: '{{count}} questions',
      other: '{{count}} questions',
    },
  },
  pagination: { label: 'Pagination', prev: 'Prev', next: 'Next' },
};

describe('FeedComponent', () => {
  let fixture: ComponentFixture<FeedComponent>;
  let host: HTMLElement;

  const rows = () => Array.from(host.querySelectorAll('.row'));
  const rowIds = () => rows().map((row) => row.id);
  const tab = (label: string) =>
    Array.from(host.querySelectorAll<HTMLButtonElement>('.tab')).find(
      (button) => button.textContent?.trim() === label,
    );
  const pageButton = (label: string) =>
    Array.from(host.querySelectorAll<HTMLButtonElement>('.page-number')).find(
      (button) => button.textContent?.trim() === label,
    );

  // Types into the real input inside <app-search-field>, so the value travels
  // through its ControlValueAccessor into the feed's FormControl.
  async function type(term: string): Promise<void> {
    const input = host.querySelector<HTMLInputElement>('.search input');
    input!.value = term;
    input!.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeedComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
      providers: [
        {
          provide: ContentService,
          useValue: {
            questions: signal(QUESTIONS).asReadonly(),
            categories: signal(CATEGORIES).asReadonly(),
            tagFor: (category: CategoryKey) => category.toUpperCase(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('shows one page of questions and the total count', () => {
    expect(rows()).toHaveLength(6);
    expect(host.querySelector('.count')?.textContent?.trim()).toBe('8 questions');
  });

  describe('pagination', () => {
    it('renders the remainder on the last page', async () => {
      pageButton('2')!.click();
      await fixture.whenStable();

      expect(rowIds()).toEqual(['row-q7', 'row-q8']);
      expect(pageButton('2')?.getAttribute('aria-current')).toBe('page');
    });

    it('disables prev on the first page and next on the last', async () => {
      const prev = host.querySelector<HTMLButtonElement>('.prev');
      const next = host.querySelector<HTMLButtonElement>('.next');
      expect(prev!.disabled).toBe(true);
      expect(next!.disabled).toBe(false);

      next!.click();
      await fixture.whenStable();

      expect(host.querySelector<HTMLButtonElement>('.prev')!.disabled).toBe(false);
      expect(host.querySelector<HTMLButtonElement>('.next')!.disabled).toBe(true);
    });
  });

  describe('filtering', () => {
    it('filters by category and drops the pager', async () => {
      tab('RxJS')!.click();
      await fixture.whenStable();

      expect(rowIds()).toEqual(['row-q6', 'row-q7', 'row-q8']);
      expect(host.querySelector('.pager')).toBeNull();
    });

    it('filters by search term across question and answer text', async () => {
      await type('switchMap');
      expect(rowIds()).toEqual(['row-q6']);

      await type('answer about toSignal');
      expect(rowIds()).toEqual(['row-q8']);
    });

    it('finds an unanswered question by its question text alone', async () => {
      await type('untracked');

      expect(rowIds()).toEqual(['row-q5']);
      expect(host.querySelector('#row-q5 .row-head')).toBeNull();
      expect(host.querySelector('#row-q5 .soon')).not.toBeNull();
    });

    it('shows the empty state with the term when nothing matches', async () => {
      await type('nothing-matches-this');

      expect(rows()).toHaveLength(0);
      expect(host.querySelector('.empty')?.textContent?.trim()).toBe(
        'Nothing matches "nothing-matches-this"',
      );
    });

    it('returns to page 1 when the result set changes', async () => {
      pageButton('2')!.click();
      await fixture.whenStable();
      expect(rowIds()).toEqual(['row-q7', 'row-q8']);

      tab('Signals')!.click();
      await fixture.whenStable();

      expect(rowIds()).toEqual(['row-q1', 'row-q2', 'row-q3', 'row-q4', 'row-q5']);
    });
  });

  describe('accordion', () => {
    it('opens and closes a row', async () => {
      const head = host.querySelector<HTMLButtonElement>('.row-head');
      expect(head!.getAttribute('aria-expanded')).toBe('false');
      expect(host.querySelector('.panel')?.hasAttribute('inert')).toBe(true);

      head!.click();
      await fixture.whenStable();

      expect(host.querySelector('.row-head')!.getAttribute('aria-expanded')).toBe('true');
      expect(host.querySelector('.panel')?.classList.contains('open')).toBe(true);
      expect(host.querySelector('.panel')?.hasAttribute('inert')).toBe(false);

      host.querySelector<HTMLButtonElement>('.row-head')!.click();
      await fixture.whenStable();

      expect(host.querySelector('.row-head')!.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('the random pill', () => {
    it('opens the practice modal', () => {
      const practice = TestBed.inject(PracticeService);
      expect(practice.isOpen()).toBe(false);

      host.querySelector<HTMLButtonElement>('.pill')!.click();

      expect(practice.isOpen()).toBe(true);
      expect(QUESTIONS).toContain(practice.question());
    });
  });
});
