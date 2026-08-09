import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

// Resting label, then the two things the copy can turn into. The resting state is
// called 'copy' so the template can build the key from it directly, the way the
// feed builds 'feed.count.' + form.
type CopyState = 'copy' | 'copied' | 'failed';

// How long the outcome stays on the button before it offers the action again.
const FEEDBACK_MS = 2000;

// A code snippet. Both the feed's answers and the practice modal render these,
// and the quiz will too - so the <pre><code> pairing (whitespace-sensitive)
// and the styling live in one place.
@Component({
  selector: 'app-code-block',
  imports: [TranslocoPipe],
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
})
export class CodeBlockComponent {
  readonly code = input.required<string>();

  protected readonly state = signal<CopyState>('copy');

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // The snippet can be scrolled away, or the whole modal closed, while the
    // confirmation is still up.
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.flash('copied');
    } catch {
      // Writing to the clipboard is refused on an insecure origin, when the
      // permission is denied, and by browsers that never implemented it. Say so
      // on the button: a copy that quietly does nothing is worse than none,
      // because the reader pastes whatever was there before.
      this.flash('failed');
    }
  }

  private flash(state: CopyState): void {
    this.state.set(state);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.state.set('copy'), FEEDBACK_MS);
  }
}
