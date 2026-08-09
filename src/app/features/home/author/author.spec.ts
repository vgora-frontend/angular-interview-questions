import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { AuthorComponent } from './author';

const TRANSLATIONS = {
  author: {
    credit: 'Questions curated and rewritten from',
    timeline: 'Version timeline compiled from the Angular release notes:',
    name: 'Vitalii Gora',
    role: 'Frontend Developer | Angular Specialist',
  },
};

describe('AuthorComponent', () => {
  let fixture: ComponentFixture<AuthorComponent>;
  let host: HTMLElement;

  const link = (label: string) =>
    Array.from(host.querySelectorAll<HTMLAnchorElement>('.links a')).find(
      (anchor) => anchor.textContent?.trim() === label,
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthorComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('renders the translated name and role', () => {
    expect(host.querySelector('.name')?.textContent?.trim()).toBe('Vitalii Gora');
    expect(host.querySelector('.role')?.textContent?.trim()).toBe(
      'Frontend Developer | Angular Specialist',
    );
  });

  // The source repository ships no licence file, so the credit is load-bearing
  // rather than decorative: a test keeps it from being dropped by accident.
  it('credits the source of the question set', () => {
    const credit = host.querySelectorAll('.credit')[0];
    const anchor = credit.querySelector<HTMLAnchorElement>('a')!;

    expect(credit.textContent).toContain('Questions curated and rewritten from');
    expect(anchor.href).toBe('https://github.com/sudheerj/angular-interview-questions');
    expect(anchor.rel).toBe('noopener');
  });

  // Same reasoning as the question credit: the timeline is written from someone
  // else's release notes, so where it came from is checkable, not decorative.
  it('credits the sources of the version timeline', () => {
    const credit = host.querySelectorAll('.credit')[1];
    const anchors = Array.from(credit.querySelectorAll<HTMLAnchorElement>('a'));

    expect(credit.textContent).toContain(
      'Version timeline compiled from the Angular release notes',
    );
    expect(anchors.map((anchor) => anchor.href)).toEqual([
      'https://blog.angular.dev/',
      'https://github.com/angular/angular/blob/main/CHANGELOG.md',
    ]);
    for (const anchor of anchors) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener');
    }
    // The separator is punctuation, so it is not announced between the links.
    expect(credit.querySelector('.separator')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('reserves the avatar box and leaves its alt empty', () => {
    const avatar = host.querySelector<HTMLImageElement>('img.avatar')!;

    // Both dimensions are required by NgOptimizedImage, and they stop the row
    // from reflowing once the file arrives.
    expect(avatar.getAttribute('width')).toBe('52');
    expect(avatar.getAttribute('height')).toBe('52');
    expect(avatar.getAttribute('src')).toContain('author.jpg');
    // Decorative: the name is right beside it as text.
    expect(avatar.getAttribute('alt')).toBe('');
  });

  it('opens both profiles in a new tab without handing over the opener', () => {
    for (const label of ['LinkedIn', 'GitHub']) {
      const anchor = link(label);
      expect(anchor?.target).toBe('_blank');
      expect(anchor?.rel).toContain('noopener');
      expect(anchor?.getAttribute('href')).toMatch(/^https:\/\//);
    }
  });

  it('answers the header About link', () => {
    // <a href="#author"> in the header needs this id, and tabindex lets focus
    // land on the block instead of staying behind on the link.
    expect(fixture.nativeElement.getAttribute('id')).toBe('author');
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('-1');
  });
});
