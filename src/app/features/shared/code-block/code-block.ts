import { Component, input } from '@angular/core';

// A code snippet. Both the feed's answers and the practice modal render these,
// and the quiz will too - so the <pre><code> pairing (whitespace-sensitive)
// and the styling live in one place.
@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
}
