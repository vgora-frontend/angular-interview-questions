import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { PracticeService } from '../../../core/practice.service';
import { Question } from '../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { HeroComponent } from './hero';

const QUESTION: Question = {
  id: 'q1',
  category: 'signals',
  q: { en: 'What is a signal?', uk: 'What is a signal?' },
  a: { en: 'A reactive value.', uk: 'A reactive value.' },
};

const TRANSLATIONS = {
  hero: {
    title: {
      lead: 'Sharp answers to the questions',
      accent: 'Angular interviews',
      tail: 'actually ask.',
    },
    lede: 'A curated, evolving reference.',
    practice: 'Practice a random question',
    quickFire: 'Quick-fire card',
    quickFireSoon: 'Arrives with the quiz cards',
  },
};

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroComponent,
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
            questions: signal([QUESTION]).asReadonly(),
            categories: signal([]).asReadonly(),
            tagFor: () => 'SIGNALS',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('renders the headline as two lines, the accent phrase opening the second', () => {
    const lines = Array.from(host.querySelectorAll('.title .line')).map((line) =>
      line.textContent?.replace(/\s+/g, ' ').trim(),
    );

    // Two blocks rather than one string with a <br>: each line stays its own run
    // of text, so nothing announces "questionsAngular".
    expect(lines).toEqual(['Sharp answers to the questions', 'Angular interviews actually ask.']);
    expect(host.querySelector('.title .ital')?.textContent).toBe('Angular interviews');
    expect(host.querySelector('.lede')?.textContent?.trim()).toBe('A curated, evolving reference.');
  });

  it('opens the practice modal from the primary call to action', () => {
    const practice = TestBed.inject(PracticeService);
    expect(practice.isOpen()).toBe(false);

    host.querySelector<HTMLButtonElement>('.btn-solid')!.click();

    expect(practice.isOpen()).toBe(true);
    expect(practice.question()).toBe(QUESTION);
  });

  it('offers the quick-fire card as disabled, and says why', () => {
    const quickFire = host.querySelector<HTMLButtonElement>('.btn-ghost')!;
    expect(quickFire.disabled).toBe(true);

    // The reason is real text on the page, tied to the button for assistive tech.
    const describedBy = quickFire.getAttribute('aria-describedby');
    expect(host.querySelector(`#${describedBy}`)?.textContent?.trim()).toBe(
      'Arrives with the quiz cards',
    );
  });

  it('hides the decorative watermark from assistive tech', () => {
    expect(host.querySelector('.ghost')?.getAttribute('aria-hidden')).toBe('true');
  });
});
