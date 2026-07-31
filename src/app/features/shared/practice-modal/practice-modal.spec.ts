import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { PracticeService } from '../../../core/practice.service';
import { CategoryKey, Question } from '../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { PracticeModalComponent } from './practice-modal';

const WITH_CODE: Question = {
  id: 'q1',
  category: 'rxjs',
  q: { en: 'When would you use toSignal()?', uk: 'When would you use toSignal()?' },
  a: { en: 'It converts a stream once.', uk: 'It converts a stream once.' },
  code: 'readonly user = toSignal(this.user$);',
};

const WITHOUT_CODE: Question = {
  id: 'q2',
  category: 'forms',
  q: { en: 'What does nonNullable do?', uk: 'What does nonNullable do?' },
  a: { en: 'reset() returns the initial value.', uk: 'reset() returns the initial value.' },
};

const TRANSLATIONS = {
  modal: { close: 'Close' },
  practice: {
    reveal: 'Reveal answer',
    another: 'Another question',
    quickFire: 'Try a quick-fire card',
  },
};

describe('PracticeModalComponent', () => {
  let fixture: ComponentFixture<PracticeModalComponent>;
  let host: HTMLElement;
  let practice: PracticeService;

  const dialog = () => host.querySelector('dialog')!;

  beforeAll(() => {
    // jsdom 28 ships no <dialog> behaviour at all. These stand-ins keep the
    // open state and the close event, which is what the component drives.
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PracticeModalComponent,
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
            questions: signal([WITH_CODE, WITHOUT_CODE]).asReadonly(),
            categories: signal([]).asReadonly(),
            tagFor: (category: CategoryKey) => category.toUpperCase(),
          },
        },
      ],
    }).compileComponents();

    practice = TestBed.inject(PracticeService);
    fixture = TestBed.createComponent(PracticeModalComponent);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('renders a closed dialog with no question until something opens it', () => {
    expect(dialog().hasAttribute('open')).toBe(false);
    expect(host.querySelector('.q')).toBeNull();
  });

  describe('once open', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    beforeEach(async () => {
      // Always picks index 0 of the pool it is handed, so the first open is
      // WITH_CODE and any re-roll (which excludes the current one) is the other.
      vi.spyOn(Math, 'random').mockReturnValue(0);
      practice.openRandomQuestion();
      await fixture.whenStable();
    });

    it('opens the dialog and names it after the question', () => {
      expect(dialog().hasAttribute('open')).toBe(true);
      // The tag is projected into the shell's head row, next to its close button.
      expect(host.querySelector('.card-head > .tag')?.textContent?.trim()).toBe('RXJS');
      expect(host.querySelector('.q')?.textContent?.trim()).toBe('When would you use toSignal()?');
      expect(dialog().getAttribute('aria-labelledby')).toBe('practice-modal-title');
      expect(host.querySelector('.q')?.id).toBe('practice-modal-title');
    });

    it('keeps the answer collapsed and out of the accessibility tree', () => {
      const answer = host.querySelector('.answer')!;
      expect(answer.classList.contains('open')).toBe(false);
      expect(answer.hasAttribute('inert')).toBe(true);
      expect(host.querySelector('.reveal')).not.toBeNull();
    });

    it('reveals the answer and its code, and drops the reveal button', async () => {
      host.querySelector<HTMLButtonElement>('.reveal')!.click();
      await fixture.whenStable();

      const answer = host.querySelector('.answer')!;
      expect(answer.classList.contains('open')).toBe(true);
      expect(answer.hasAttribute('inert')).toBe(false);
      expect(host.querySelector('.text')?.textContent?.trim()).toBe('It converts a stream once.');
      expect(host.querySelector('.code')?.textContent).toContain('toSignal(this.user$)');
      expect(host.querySelector('.reveal')).toBeNull();
    });

    it('omits the code block for a question without a snippet', async () => {
      practice.openRandomQuestion(); // re-roll lands on the only other question
      practice.reveal();
      await fixture.whenStable();

      expect(practice.question()).toBe(WITHOUT_CODE);
      expect(host.querySelector('.text')).not.toBeNull();
      expect(host.querySelector('.code')).toBeNull();
    });

    it('re-rolls from the footer, hiding the answer again', async () => {
      practice.reveal();
      await fixture.whenStable();

      host.querySelector<HTMLButtonElement>('.another')!.click();
      await fixture.whenStable();

      expect(practice.question()).toBe(WITHOUT_CODE);
      expect(practice.revealed()).toBe(false);
    });

    it('disables the quick-fire switch until the quiz exists', () => {
      const quickFire = host.querySelector<HTMLButtonElement>('.switch')!;
      expect(quickFire.disabled).toBe(true);
      expect(quickFire.textContent?.trim()).toBe('Try a quick-fire card');
    });

    it('closes from the close button', async () => {
      host.querySelector<HTMLButtonElement>('.close')!.click();
      await fixture.whenStable();

      expect(practice.isOpen()).toBe(false);
      expect(dialog().hasAttribute('open')).toBe(false);
      expect(host.querySelector('.q')).toBeNull();
    });

    it('closes on a click that lands outside the card', async () => {
      dialog().click();
      await fixture.whenStable();

      expect(practice.isOpen()).toBe(false);
    });

    it('stays open when the click lands inside the card', async () => {
      host.querySelector<HTMLElement>('.card')!.click();
      await fixture.whenStable();

      expect(practice.isOpen()).toBe(true);
    });

    it('syncs state back when the dialog closes itself (Escape)', async () => {
      dialog().close();
      await fixture.whenStable();

      expect(practice.isOpen()).toBe(false);
    });
  });
});
