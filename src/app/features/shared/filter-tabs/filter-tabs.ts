import { Component, input, model } from '@angular/core';

// One tab. `label` is already translated: the copy belongs to the caller, not to this component,
// and keeping it a plain string keeps the component free of the content model.
export interface FilterTab {
  key: string;
  label: string;
  divider?: boolean; // render a separator before this tab
}

// A row of single-choice tabs. The selection is two-way bound,
// so the host stays the single source of truth - same contract as <app-pagination>.
@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.scss',
  // The group and its accessible name belong on the host,
  // so the component adds no wrapper element of its own.
  host: {
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class FilterTabsComponent {
  readonly tabs = input.required<readonly FilterTab[]>();

  // Bind with [(active)] to a writable signal on the host.
  readonly active = model.required<string>();

  // Accessible name for the group; required, so a tab row is never unlabelled.
  readonly label = input.required<string>();

  protected select(key: string): void {
    this.active.set(key);
  }
}
