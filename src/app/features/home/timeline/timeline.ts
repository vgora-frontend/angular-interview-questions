import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { LanguageService } from '../../../core/language.service';
import { ChangeRowComponent } from './change-row/change-row';

// "What changed, when": the release rail, one version's panel at a time.
//
// The rail is local rather than <app-filter-tabs>. Same behaviour - single
// select, two-way state, aria-pressed - but the design is a serif index sharing
// one rule with the panel below it, and bending the feed's tabs into that shape
// would take more style knobs than the sharing would save.
@Component({
  selector: 'app-timeline',
  imports: [ChangeRowComponent, TranslocoPipe],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class TimelineComponent {
  private readonly content = inject(ContentService);
  private readonly language = inject(LanguageService);

  protected readonly versions = this.content.versions;

  // The newest release is what people ask about, so the rail opens at the end of
  // the line - but on the last release that has something to show, so a version
  // listed before its highlights are written does not greet everyone with the
  // "on the way" note. Empty string if there is no data at all: no panel.
  protected readonly selected = signal(
    (
      this.versions()
        .filter((version) => version.points)
        .at(-1) ?? this.versions().at(-1)
    )?.id ?? '',
  );

  // A single-item list, not an @if: switching versions replaces the panel
  // element, so its fadeInUp runs again. That is the template's keyed re-render,
  // with no JavaScript to restart the animation.
  //
  // The title is resolved here because it is the only string this template owns
  // - each change translates itself inside <app-change-row>.
  protected readonly shown = computed(() => {
    const id = this.selected();
    const t = this.language.t;

    return this.versions()
      .filter((version) => version.id === id)
      .map((version) => ({
        id: version.id,
        year: version.year,
        // Nothing written yet: the label heads the panel rather than leaving it blank.
        title: version.title ? t(version.title) : version.label,
        points: version.points,
      }));
  });

  // Open rows, emptied whenever another release is picked. The panel is replaced
  // wholesale on that switch, so rows carried over from the last version would
  // only show up as a stale open row somewhere down the new list.
  private readonly expanded = linkedSignal<string, ReadonlySet<string>>({
    source: this.selected,
    computation: () => new Set(),
  });

  protected select(id: string): void {
    this.selected.set(id);
  }

  protected isOpen(id: string): boolean {
    return this.expanded().has(id);
  }

  protected toggle(id: string): void {
    this.expanded.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(id)) {
        next.add(id);
      }
      return next;
    });
  }
}
