import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { Question } from '../../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../../core/models/language.model';
import { QuestionRowComponent } from './question-row';

const WITH_CODE: Question = {
  id: 'q1',
  category: 'signals',
  q: { en: 'What is a signal?', uk: 'What is a signal?' },
  a: { en: 'A reactive value.', uk: 'A reactive value.' },
  code: 'const c = signal(0);',
};

const WITHOUT_CODE: Question = { ...WITH_CODE, id: 'q2', code: undefined };

describe('QuestionRowComponent', () => {
  let fixture: ComponentFixture<QuestionRowComponent>;
  let host: HTMLElement;

  const head = () => host.querySelector<HTMLButtonElement>('.row-head')!;
  const panel = () => host.querySelector('.panel')!;

  async function render(question: Question, open: boolean): Promise<void> {
    fixture.componentRef.setInput('question', question);
    fixture.componentRef.setInput('open', open);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // The row reads LanguageService.t(), which resolves through Transloco.
      imports: [
        QuestionRowComponent,
        TranslocoTestingModule.forRoot({
          langs: Object.fromEntries(LANGS.map((lang) => [lang, {}])),
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionRowComponent);
    host = fixture.nativeElement as HTMLElement;
    await render(WITH_CODE, false);
  });

  it('renders the tag, the question and its answer', () => {
    expect(host.querySelector('.tag')?.textContent?.trim()).toBe('SIGNALS');
    expect(host.querySelector('.q')?.textContent?.trim()).toBe('What is a signal?');
    expect(host.querySelector('.answer')?.textContent?.trim()).toBe('A reactive value.');
  });

  it('takes the row id from the question, so the host is addressable', () => {
    expect(host.id).toBe('row-q1');
    expect(host.classList.contains('row')).toBe(true);
  });

  it('wires the header to the panel it controls', () => {
    expect(head().getAttribute('aria-controls')).toBe('panel-q1');
    expect(panel().id).toBe('panel-q1');
    expect(panel().getAttribute('aria-labelledby')).toBe('label-q1');
    expect(host.querySelector('.q')?.id).toBe('label-q1');
  });

  describe('when closed', () => {
    it('reports collapsed and stays out of the accessibility tree', () => {
      expect(head().getAttribute('aria-expanded')).toBe('false');
      expect(panel().classList.contains('open')).toBe(false);
      expect(panel().hasAttribute('inert')).toBe(true);
    });
  });

  describe('when open', () => {
    beforeEach(() => render(WITH_CODE, true));

    it('reports expanded and rejoins the accessibility tree', () => {
      expect(head().getAttribute('aria-expanded')).toBe('true');
      expect(panel().classList.contains('open')).toBe(true);
      expect(panel().hasAttribute('inert')).toBe(false);
    });

    it('renders the snippet through the shared code block', () => {
      expect(host.querySelector('app-code-block .code')?.textContent).toContain('signal(0)');
    });

    it('omits the code block for a question without a snippet', async () => {
      await render(WITHOUT_CODE, true);

      expect(host.querySelector('.answer')).not.toBeNull();
      expect(host.querySelector('app-code-block')).toBeNull();
    });
  });

  it('emits toggled on click, leaving the open state to its host', () => {
    let toggles = 0;
    fixture.componentInstance.toggled.subscribe(() => (toggles += 1));

    head().click();

    expect(toggles).toBe(1);
    expect(head().getAttribute('aria-expanded')).toBe('false');
  });
});
