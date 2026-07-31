import { Component, ElementRef, afterRenderEffect, input, output, viewChild } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

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

  constructor() {
    // A native <dialog> opened with showModal() brings the focus trap, Escape
    // handling and focus-return-to-trigger with it, which is why the element is
    // driven imperatively from `open` instead of with @if.
    afterRenderEffect(() => {
      const element = this.dialog().nativeElement;
      const open = this.open();
      if (open && !element.open) {
        element.showModal();
      } else if (!open && element.open) {
        element.close();
      }
    });
  }

  // A click that lands on the dialog itself landed outside the card.
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.closed.emit();
    }
  }
}
