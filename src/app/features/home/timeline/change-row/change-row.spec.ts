import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { VersionPoint } from '../../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../../core/models/language.model';
import { ChangeRowComponent } from './change-row';

const WITH_CODE: VersionPoint = {
  id: 'v17-control-flow',
  head: { en: 'New control flow', uk: 'New control flow' },
  body: { en: 'Nothing to import.', uk: 'Nothing to import.' },
  code: '@if (user()) {}',
};

const WITHOUT_CODE: VersionPoint = { ...WITH_CODE, id: 'v17-esbuild', code: undefined };

describe('ChangeRowComponent', () => {
  let fixture: ComponentFixture<ChangeRowComponent>;
  let host: HTMLElement;

  const head = () => host.querySelector<HTMLButtonElement>('.change-head')!;
  const panel = () => host.querySelector('.panel')!;

  async function render(point: VersionPoint, open: boolean): Promise<void> {
    fixture.componentRef.setInput('point', point);
    fixture.componentRef.setInput('open', open);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // The row reads LanguageService.t(), which resolves through Transloco.
      imports: [
        ChangeRowComponent,
        TranslocoTestingModule.forRoot({
          langs: Object.fromEntries(LANGS.map((lang) => [lang, {}])),
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRowComponent);
    host = fixture.nativeElement as HTMLElement;
    await render(WITH_CODE, false);
  });

  it('shows the head on the line and keeps the detail behind it', () => {
    expect(host.querySelector('.head')?.textContent?.trim()).toBe('New control flow');
    expect(host.querySelector('.body')?.textContent?.trim()).toBe('Nothing to import.');
  });

  it('wires the header to the panel it controls', () => {
    expect(head().getAttribute('aria-controls')).toBe('change-panel-v17-control-flow');
    expect(panel().id).toBe('change-panel-v17-control-flow');
    expect(panel().getAttribute('aria-labelledby')).toBe('change-label-v17-control-flow');
    expect(host.querySelector('.head')?.id).toBe('change-label-v17-control-flow');
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
      expect(host.querySelector('app-code-block .code')?.textContent).toContain('@if (user())');
    });

    it('omits the code block for a change with no snippet', async () => {
      await render(WITHOUT_CODE, true);

      expect(host.querySelector('.body')).not.toBeNull();
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
