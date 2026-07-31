import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { LanguageService } from '../../../core/language.service';

// "What changed, when": the release rail, one version's panel at a time.
//
// The rail is local rather than <app-filter-tabs>. Same behaviour - single
// select, two-way state, aria-pressed - but the design is a serif index sharing
// one rule with the panel below it, and bending the feed's tabs into that shape
// would take more style knobs than the sharing would save.
@Component({
  selector: 'app-timeline',
  imports: [TranslocoPipe],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class TimelineComponent {
  private readonly content = inject(ContentService);
  private readonly language = inject(LanguageService);

  protected readonly versions = this.content.versions;

  // The newest release is what people ask about, so the rail opens on the last
  // entry. Empty string if there is no data at all, which renders no panel.
  protected readonly selected = signal(this.versions().at(-1)?.id ?? '');

  // A single-item list, not an @if: switching versions replaces the panel
  // element, so its fadeInUp runs again. That is the template's keyed re-render,
  // with no JavaScript to restart the animation.
  //
  // The language is resolved here rather than in the template, so the whole panel
  // is one computed that recomputes on a language switch.
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
        points: version.points?.map((point) => ({ head: t(point.head), body: t(point.body) })),
      }));
  });

  protected select(id: string): void {
    this.selected.set(id);
  }
}
