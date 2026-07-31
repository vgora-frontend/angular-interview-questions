import { Injectable, computed, inject, signal } from '@angular/core';
import { ContentService } from './content.service';
import { Question } from './models/content.model';

// Which question is being practised, and whether its answer is showing.
// Owned by core rather than by the modal component so any trigger
// (the feed's pill, the hero CTA next) can open it without knowing the component exists
// - it is lazily loaded once something does.
//
// Deliberately NOT a general "modal service": the dialog shell is features/shared/modal,
// and a second modal gets its own state, not fields here.
@Injectable({ providedIn: 'root' })
export class PracticeService {
  private readonly content = inject(ContentService);

  // Writable inside, readonly out: the state only moves through the methods below,
  // so no caller can open the modal on a question of its own choosing.
  private readonly current = signal<Question | null>(null);
  readonly question = this.current.asReadonly();
  readonly isOpen = computed(() => this.current() !== null);

  // The answer starts hidden: the point is to practise recalling it first.
  private readonly answerRevealed = signal(false);
  readonly revealed = this.answerRevealed.asReadonly();

  // Opens the modal, and re-rolls it when it is already open ("Another question").
  // Never hands back the question already on screen.
  openRandomQuestion(): void {
    const pool = this.content.questions();
    if (pool.length === 0) {
      return;
    }

    const current = this.current();
    const candidates =
      current && pool.length > 1 ? pool.filter((question) => question.id !== current.id) : pool;

    this.current.set(candidates[Math.floor(Math.random() * candidates.length)]);
    this.answerRevealed.set(false);
  }

  reveal(): void {
    this.answerRevealed.set(true);
  }

  close(): void {
    this.current.set(null);
    this.answerRevealed.set(false);
  }
}
