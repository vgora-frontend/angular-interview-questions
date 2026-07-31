import { Component, computed, input, model } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

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

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  // Clamped here so hosts can wire prev/next arithmetic without re-checking it.
  protected go(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.totalPages()));
  }
}
