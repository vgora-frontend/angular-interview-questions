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

  // 58 pages is what 346 questions come to, so the list has to stay a fixed
  // width instead of rendering a button per page.
  describe('windowing', () => {
    // What the row reads as, gaps included, so a slipped gap is visible here.
    const row = () =>
      Array.from(host.querySelectorAll<HTMLElement>('.page-number, .gap')).map((element) =>
        element.textContent?.trim(),
      );

    it('lists every page while they still fit', async () => {
      await render(1, 7);

      expect(row()).toEqual(['1', '2', '3', '4', '5', '6', '7']);
    });

    it('anchors the window to the start near the first page', async () => {
      await render(3, 58);

      expect(row()).toEqual(['1', '2', '3', '4', '5', '...', '58']);
    });

    it('centres the window on the current page in the middle', async () => {
      await render(30, 58);

      expect(row()).toEqual(['1', '...', '29', '30', '31', '...', '58']);
    });

    it('anchors the window to the end near the last page', async () => {
      await render(56, 58);

      expect(row()).toEqual(['1', '...', '54', '55', '56', '57', '58']);
    });

    it('keeps the row the same width wherever the page sits', async () => {
      for (const page of [1, 4, 5, 29, 54, 55, 58]) {
        await render(page, 58);

        expect(row(), `page ${page}`).toHaveLength(7);
        expect(labels(), `page ${page}`).toContain(String(page));
      }
    });

    it('always keeps the first and last page one click away', async () => {
      await render(30, 58);

      expect(labels()).toContain('1');
      expect(labels()).toContain('58');
    });
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
