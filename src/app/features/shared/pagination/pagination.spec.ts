import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { PaginationComponent } from './pagination';

const TRANSLATIONS = {
  pagination: { label: 'Pagination', prev: 'Prev', next: 'Next' },
};

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let host: HTMLElement;

  const numbers = () => Array.from(host.querySelectorAll<HTMLButtonElement>('.page-number'));
  const labels = () => numbers().map((button) => button.textContent?.trim());
  const prev = () => host.querySelector<HTMLButtonElement>('.prev');
  const next = () => host.querySelector<HTMLButtonElement>('.next');

  async function render(page: number, totalPages: number): Promise<void> {
    fixture.componentRef.setInput('page', page);
    fixture.componentRef.setInput('totalPages', totalPages);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginationComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders nothing for a single page', async () => {
    await render(1, 1);

    expect(host.querySelector('.pager')).toBeNull();
  });

  it('renders one button per page plus prev and next', async () => {
    await render(1, 3);

    expect(labels()).toEqual(['1', '2', '3']);
    expect(prev()?.textContent?.trim()).toBe('Prev');
    expect(next()?.textContent?.trim()).toBe('Next');
    expect(host.querySelector('.pager')?.getAttribute('aria-label')).toBe('Pagination');
  });

  it('marks the current page for sighted and assistive users alike', async () => {
    await render(2, 3);

    const [first, second] = numbers();
    expect(second.classList.contains('active')).toBe(true);
    expect(second.getAttribute('aria-current')).toBe('page');
    expect(first.classList.contains('active')).toBe(false);
    expect(first.getAttribute('aria-current')).toBeNull();
  });

  it('disables prev on the first page and next on the last', async () => {
    await render(1, 3);
    expect(prev()!.disabled).toBe(true);
    expect(next()!.disabled).toBe(false);

    await render(3, 3);
    expect(prev()!.disabled).toBe(false);
    expect(next()!.disabled).toBe(true);
  });

  it('writes the picked page back through the two-way model', async () => {
    await render(1, 3);

    numbers()[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.page()).toBe(3);
  });

  it('steps with prev and next', async () => {
    await render(2, 3);

    next()!.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.page()).toBe(3);

    prev()!.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.page()).toBe(2);
  });

  it('clamps a page beyond the bounds', async () => {
    // totalPages shrinks under a page that is already past the new end.
    await render(3, 3);
    await render(3, 2);

    next()!.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.page()).toBe(2);
  });
});
