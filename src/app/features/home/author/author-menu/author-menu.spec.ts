import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../../core/models/language.model';
import { AuthorLink, AuthorMenuComponent } from './author-menu';

const TRANSLATIONS = { author: { menu: 'Author links', elsewhere: 'Elsewhere' } };

const LINKS: readonly AuthorLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/someone/' },
  { label: 'GitHub', href: 'https://github.com/someone/' },
  { label: 'CV', href: 'https://example.com/cv/' },
];

// A host, so the press that lands outside the menu lands on something real
// rather than on the bare document.
@Component({
  imports: [AuthorMenuComponent],
  template: `
    <app-author-menu [links]="links()" />
    <button type="button" id="outside">Elsewhere</button>
  `,
})
class HostComponent {
  readonly links = signal(LINKS);
}

describe('AuthorMenuComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let root: HTMLElement;

  const trigger = () => root.querySelector<HTMLButtonElement>('.trigger')!;
  const menu = () => root.querySelector<HTMLElement>('.menu')!;
  const anchors = () => Array.from(root.querySelectorAll<HTMLAnchorElement>('.menu a'));

  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HostComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    root = fixture.nativeElement as HTMLElement;
    await settle();
  });

  it('starts shut, named, and out of reach of the Tab key', () => {
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(trigger().getAttribute('aria-label')).toBe('Author links');
    expect(menu().hasAttribute('inert')).toBe(true);
  });

  // The pair of attributes is the whole disclosure contract: without the match,
  // a screen reader is told a control expands something it cannot then find.
  it('points aria-controls at the panel it opens', () => {
    expect(trigger().getAttribute('aria-controls')).toBe(menu().id);
    expect(menu().id).toBeTruthy();
  });

  it('opens on click and closes again on the next one', async () => {
    trigger().click();
    await settle();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(menu().hasAttribute('inert')).toBe(false);

    trigger().click();
    await settle();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(menu().hasAttribute('inert')).toBe(true);
  });

  it('renders every link into a new tab without handing over the opener', async () => {
    trigger().click();
    await settle();

    expect(anchors().map((a) => a.querySelector('.label')?.textContent?.trim())).toEqual([
      'LinkedIn',
      'GitHub',
      'CV',
    ]);
    for (const anchor of anchors()) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener');
    }
    expect(anchors().map((a) => a.getAttribute('href'))).toEqual(LINKS.map((l) => l.href));
  });

  it('closes when a link is taken, so the tab left behind is not still open', async () => {
    trigger().click();
    await settle();

    // preventDefault: the anchor would otherwise navigate the test runner away.
    anchors()[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await settle();

    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on a press outside itself', async () => {
    trigger().click();
    await settle();

    root
      .querySelector<HTMLButtonElement>('#outside')!
      .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await settle();

    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('survives a press on itself, which the trigger handles', async () => {
    trigger().click();
    await settle();

    menu().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await settle();

    expect(trigger().getAttribute('aria-expanded')).toBe('true');
  });

  it('closes on Escape and hands focus back to the trigger', async () => {
    trigger().click();
    await settle();
    anchors()[0].focus();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await settle();

    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    // Focus must not be left on a link that is now inert.
    expect(document.activeElement).toBe(trigger());
  });

  // "LinkedIn" names the site; the line under it names the account, and it is
  // derived from the href so the two cannot disagree.
  it('shows where each link goes, without scheme, www. or trailing slash', async () => {
    trigger().click();
    await settle();

    const where = Array.from(root.querySelectorAll<HTMLElement>('.menu .where')).map((el) =>
      el.textContent?.trim(),
    );
    expect(where).toEqual(['linkedin.com/in/someone', 'github.com/someone', 'example.com/cv']);
  });

  it('heads the panel with the same eyebrow the page uses elsewhere', () => {
    expect(menu().querySelector('.eyebrow')?.textContent?.trim()).toBe('Elsewhere');
  });

  it('reserves the avatar box and leaves its alt empty', () => {
    const avatar = root.querySelector<HTMLImageElement>('img.avatar')!;

    // Both dimensions are required by NgOptimizedImage, and they stop the row
    // from reflowing once the file arrives.
    expect(avatar.getAttribute('width')).toBe('52');
    expect(avatar.getAttribute('height')).toBe('52');
    expect(avatar.getAttribute('src')).toContain('images/author.jpg');
    // Decorative: the name is right beside it as text.
    expect(avatar.getAttribute('alt')).toBe('');
  });
});

// jsdom has no IntersectionObserver, so the hint needs one supplied before the
// component is built - hence a second suite rather than a case in the first.
describe('AuthorMenuComponent hint', () => {
  const observers: { callback: IntersectionObserverCallback; disconnected: boolean }[] = [];

  class FakeIntersectionObserver {
    private readonly entry = { disconnected: false } as {
      callback: IntersectionObserverCallback;
      disconnected: boolean;
    };

    constructor(callback: IntersectionObserverCallback) {
      this.entry.callback = callback;
      observers.push(this.entry);
    }

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {
      this.entry.disconnected = true;
    }
  }

  let fixture: ComponentFixture<HostComponent>;
  let root: HTMLElement;

  const menuHost = () => root.querySelector<HTMLElement>('app-author-menu')!;

  const scrollIntoView = async (isIntersecting: boolean) => {
    observers[0].callback([{ isIntersecting } as IntersectionObserverEntry], {} as never);
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    observers.length = 0;
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);

    await TestBed.configureTestingModule({
      imports: [
        HostComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('stays still until the footer is actually on screen', async () => {
    expect(menuHost().classList.contains('hint')).toBe(false);

    await scrollIntoView(true);
    expect(menuHost().classList.contains('hint')).toBe(true);
  });

  it('stops for good once the menu has been opened', async () => {
    await scrollIntoView(true);
    expect(menuHost().classList.contains('hint')).toBe(true);

    root.querySelector<HTMLButtonElement>('.trigger')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(menuHost().classList.contains('hint')).toBe(false);

    // Closing it again must not start the hint over: the question it asks has
    // been answered.
    root.querySelector<HTMLButtonElement>('.trigger')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(menuHost().classList.contains('hint')).toBe(false);
  });

  it('stops while the footer is scrolled away again', async () => {
    await scrollIntoView(true);
    await scrollIntoView(false);
    expect(menuHost().classList.contains('hint')).toBe(false);
  });

  it('lets go of the observer when the component is torn down', async () => {
    fixture.destroy();
    expect(observers[0].disconnected).toBe(true);
  });
});
