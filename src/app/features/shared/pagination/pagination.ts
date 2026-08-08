import { Component, computed, input, model } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

// One rendered slot in the page list: a page to jump to, or a gap standing in
// for the run of pages skipped between two slots.
interface PageSlot {
  key: string;
  page: number | null; // null renders the gap marker
}

// How many slots the list renders once it has to skip pages. Seven is the
// smallest number that fits both ends, the current page and a neighbour on each
// side; it is also fixed, so the row keeps its width as the page moves.
const SLOTS = 7;

const gap = (key: string): PageSlot => ({ key, page: null });
const slot = (page: number): PageSlot => ({ key: `p${page}`, page });
const range = (from: number, to: number): PageSlot[] =>
  Array.from({ length: to - from + 1 }, (_, index) => slot(from + index));

// Page numbers with prev/next.
// Owns nothing but the bounds: the current page is two-way bound,
// so the host keeps being the single source of truth.
@Component({
  selector: 'app-pagination',
  imports: [TranslocoPipe],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class PaginationComponent {
  // Bind with [(page)] to a writable signal on the host.
  readonly page = model.required<number>();
  readonly totalPages = input.required<number>();

  // The list never grows past SLOTS: at 346 questions this component would
  // otherwise render 58 buttons and wrap across the whole viewport.
  // The first and last page stay reachable in one click from anywhere.
  protected readonly slots = computed<PageSlot[]>(() => {
    const total = this.totalPages();
    const page = this.page();

    if (total <= SLOTS) {
      return range(1, total);
    }
    // Near either end the window is anchored there, which spends the slot that
    // a gap would have taken on another page instead.
    if (page <= 4) {
      return [...range(1, 5), gap('gap-end'), slot(total)];
    }
    if (page >= total - 3) {
      return [slot(1), gap('gap-start'), ...range(total - 4, total)];
    }
    return [slot(1), gap('gap-start'), ...range(page - 1, page + 1), gap('gap-end'), slot(total)];
  });

  // Clamped here so hosts can wire prev/next arithmetic without re-checking it.
  protected go(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.totalPages()));
  }
}
