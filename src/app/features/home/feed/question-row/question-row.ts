import { Component, computed, inject, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../../core/content.service';
import { LanguageService } from '../../../../core/language.service';
import { Question } from '../../../../core/models/content.model';
import { CodeBlockComponent } from '../../../shared/code-block/code-block';

// One question in the feed: the header button and the collapsing answer panel.
// The feed owns which rows are open, so that survives paging and filtering.
//
// A question with no answer yet renders as a static line instead: an accordion
// whose panel is empty is a control that lies about having something behind it.
@Component({
  selector: 'app-question-row',
  imports: [CodeBlockComponent, TranslocoPipe],
  templateUrl: './question-row.html',
  styleUrl: './question-row.scss',
  host: {
    class: 'row',
    '[id]': 'rowId()',
  },
})
export class QuestionRowComponent {
  readonly question = input.required<Question>();
  readonly open = input.required<boolean>();
  readonly toggled = output<void>();

  private readonly content = inject(ContentService);
  private readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  // Resolved from the category rather than carried on the question itself.
  protected readonly tag = computed(() => this.content.tagFor(this.question().category));

  protected readonly rowId = computed(() => `row-${this.question().id}`);
  protected readonly panelId = computed(() => `panel-${this.question().id}`);
  protected readonly labelId = computed(() => `label-${this.question().id}`);
}
