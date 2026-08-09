import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { CodeBlockComponent } from './code-block';

const SNIPPET = 'const count = signal(0);\nconst double = computed(() => count() * 2);';

const TRANSLATIONS = {
  code: { copy: 'Copy', copied: 'Copied', failed: 'Copy failed' },
};

describe('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let host: HTMLElement;

  const copyButton = () => host.querySelector<HTMLButtonElement>('.copy')!;
  const status = () => host.querySelector('[role="status"]')!;

  // Swaps in a clipboard whose write resolves or rejects on demand. navigator
  // has no real one under jsdom, so it is defined rather than spied on.
  function stubClipboard(writeText: () => Promise<void>): void {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CodeBlockComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeBlockComponent);
    fixture.componentRef.setInput('code', SNIPPET);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the snippet inside pre > code', () => {
    const code = host.querySelector('pre.code > code');
    expect(code).not.toBeNull();
    expect(code!.textContent).toBe(SNIPPET);
  });

  it('adds no whitespace of its own, since <pre> preserves every character', () => {
    // A stray newline in the template would indent the first line in the browser.
    expect(host.querySelector('pre')!.textContent).toBe(SNIPPET);
  });

  it('copies the snippet verbatim and confirms it', async () => {
    const written: string[] = [];
    stubClipboard(async (...args: unknown[]) => {
      written.push(args[0] as string);
    });

    copyButton().click();
    await fixture.whenStable();

    expect(written).toEqual([SNIPPET]);
    expect(copyButton().textContent?.trim()).toBe('Copied');
    // The button's own label is not re-read on change, so the outcome is
    // repeated in the live region.
    expect(status().textContent?.trim()).toBe('Copied');
  });

  it('says so when the clipboard refuses, rather than looking like it worked', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')));

    copyButton().click();
    await fixture.whenStable();

    expect(copyButton().textContent?.trim()).toBe('Copy failed');
    expect(status().textContent?.trim()).toBe('Copy failed');
  });

  it('stays silent at rest, so returning to the resting label announces nothing', () => {
    expect(copyButton().textContent?.trim()).toBe('Copy');
    expect(status().textContent?.trim()).toBe('');
  });
});
