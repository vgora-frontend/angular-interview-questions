import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  afterRenderEffect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

// Set on <html> while a dialog is up; the rule that acts on it is in styles.scss,
// because the element it styles is not this component's. On <html> rather than
// <body> because <html> is this document's scrollingElement, and putting it there
// skips the question of whether the body's overflow propagates to the viewport.
const ROOT_OPEN_CLASS = 'modal-open';

@Component({
  selector: 'app-modal',
  imports: [TranslocoPipe],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  readonly open = input.required<boolean>();

  // Id of the heading inside the projected content; becomes the dialog's name.
  readonly labelledBy = input<string>();

  // Raised by the close button, a click outside the card, and Escape. The host
  // owns the state, so it decides what closing means.
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');
  private readonly document = inject(DOCUMENT);

  constructor() {
    // A native <dialog> opened with showModal() brings the focus trap, Escape
    // handling and focus-return-to-trigger with it, which is why the element is
    // driven imperatively from `open` instead of with @if.
    afterRenderEffect(() => {
      const element = this.dialog().nativeElement;
      const open = this.open();
      if (open && !element.open) {
        element.showModal();
        // showModal() hands focus to the first focusable thing inside, which is
        // the close button - so the dialog opened by announcing "Close" and the
        // reader had to go looking for the question. Focus the dialog itself
        // (tabindex="-1" in the template): it carries aria-labelledby, so what
        // gets read is the dialog and its title.
        element.focus();
      } else if (!open && element.open) {
        element.close();
      }

      // Tracks `open` on its own rather than living in a branch above. Escape
      // closes the dialog natively, so by the time the host flips `open` the
      // element is already shut and the branch that would undo this never runs.
      this.document.documentElement.classList.toggle(ROOT_OPEN_CLASS, open);
    });

    // The practice modal is lazy-loaded; it can go away while it is still open.
    inject(DestroyRef).onDestroy(() =>
      this.document.documentElement.classList.remove(ROOT_OPEN_CLASS),
    );
  }

  // A click that lands on the dialog itself landed outside the card.
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.closed.emit();
    }
  }
}
