import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { AuthorComponent } from './author';

const TRANSLATIONS = {
  author: {
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
