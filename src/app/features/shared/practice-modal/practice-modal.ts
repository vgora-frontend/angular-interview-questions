import { Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { LanguageService } from '../../../core/language.service';
import { PracticeService } from '../../../core/practice.service';
import { CodeBlockComponent } from '../code-block/code-block';
import { ModalComponent } from '../modal/modal';

// Practice a random question. Content only: the dialog,
// the overlay and the close button all come from <app-modal>.
@Component({
  selector: 'app-practice-modal',
  imports: [CodeBlockComponent, ModalComponent, TranslocoPipe],
  templateUrl: './practice-modal.html',
  styleUrl: './practice-modal.scss',
})
export class PracticeModalComponent {
  protected readonly practice = inject(PracticeService);
  private readonly content = inject(ContentService);
  private readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  // Resolved from the category rather than carried on the question itself.
  // Empty while the modal is closed, when there is no question and nothing rendered.
  protected readonly tag = computed(() => {
    const question = this.practice.question();
    return question ? this.content.tagFor(question.category) : '';
  });
}
