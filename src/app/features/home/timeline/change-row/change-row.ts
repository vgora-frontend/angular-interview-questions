import { Component, computed, inject, input, output } from '@angular/core';
import { LanguageService } from '../../../../core/language.service';
import { VersionPoint } from '../../../../core/models/content.model';
import { CodeBlockComponent } from '../../../shared/code-block/code-block';

// One change under a release: the headline button and the collapsing detail.
// Same accordion as <app-question-row>, and deliberately so - a reader who has
// opened an answer in the feed already knows how this behaves.
//
// The timeline owns which rows are open, because that has to reset when another
// version is picked, and this component cannot see the rail.
//
// No unwritten branch here, unlike the feed: a point without a body is not a
// point, so `body` is required and every row opens onto something.
@Component({
  selector: 'app-change-row',
  imports: [CodeBlockComponent],
  templateUrl: './change-row.html',
  styleUrl: './change-row.scss',
  host: {
    class: 'change',
  },
})
export class ChangeRowComponent {
  readonly point = input.required<VersionPoint>();
  readonly open = input.required<boolean>();
  readonly toggled = output<void>();

  private readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  // Point ids are unique across the whole timeline, so these stay unique even
  // though every release builds them the same way.
  protected readonly panelId = computed(() => `change-panel-${this.point().id}`);
  protected readonly labelId = computed(() => `change-label-${this.point().id}`);
}
