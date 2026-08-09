import { Component, input, model } from '@angular/core';

// How many rows a paged list shows at once. Same contract as <app-filter-tabs>
// and <app-pagination>: the options come in, the choice is two-way bound, and the
// host stays the single source of truth.
@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.html',
  styleUrl: './page-size.scss',
})
export class PageSizeComponent {
  readonly options = input.required<readonly number[]>();

  // Bind with [(size)] to a writable signal on the host.
  readonly size = model.required<number>();

  // Accessible name, already translated: the copy belongs to the caller.
  readonly label = input.required<string>();

  // The <select> reports its value as a string; the option list is the only
  // source of it, so there is nothing to validate beyond the conversion.
  protected choose(value: string): void {
    this.size.set(Number(value));
  }
}
