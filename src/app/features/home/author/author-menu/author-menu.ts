import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

/** One destination in the menu behind the avatar. */
export interface AuthorLink {
  readonly label: string;
  readonly href: string;
}

// Ids have to be unique in a document, and this component has no natural id to
// build one from - the counter is what lets a second one exist without the
// trigger's aria-controls pointing at the first one's menu.
let nextId = 0;

// How much of the block has to be on screen before the avatar hints at itself.
const HINT_VISIBILITY = 0.6;

// The avatar, and what it opens.
//
// A disclosure rather than role="menu": these are links to other pages, and the
// menu role would promise arrow-key navigation and a focus trap that a list of
// links neither needs nor should have. aria-expanded on the trigger plus
// aria-controls is the whole contract, and Tab walks the links as usual.
@Component({
  selector: 'app-author-menu',
  imports: [NgOptimizedImage, TranslocoPipe],
  templateUrl: './author-menu.html',
  styleUrl: './author-menu.scss',
  host: {
    '[class.hint]': 'hinting()',
    // Both dismissals belong to the document: a menu has to close on a press
    // that never reaches it, and on Escape from wherever focus happens to be.
    '(document:pointerdown)': 'onPointerDown($event)',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class AuthorMenuComponent {
  readonly links = input.required<readonly AuthorLink[]>();

  protected readonly open = signal(false);
  protected readonly menuId = `author-menu-${nextId++}`;

  /**
   * The domain under each label, derived rather than declared: a second field
   * spelling out where github.com/x lives would be a second thing to keep true.
   *
   * The scheme, a leading www. and a trailing slash all go. None of them tells
   * the reader anything, and carrying them cost the longest of these a line
   * break in a panel that then had to be wider than the line it was breaking.
   */
  protected readonly rows = computed(() =>
    this.links().map((link) => ({
      ...link,
      where: link.href
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, ''),
    })),
  );

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  private readonly inView = signal(false);
  private readonly found = signal(false);

  /**
   * A photograph does not look like a button, so it says so - but only until it
   * has been believed. The hint beats while the footer is on screen and stops
   * for good the first time the menu is opened.
   *
   * It beat three times and stopped before this, which read as broken: the
   * avatar was inert again five seconds after the footer arrived, so whatever
   * the reader did next looked like the thing that had killed it.
   *
   * Running rather than bounded is a judgement against the letter of WCAG SC
   * 2.2.2, which would want a control to stop motion lasting past five seconds.
   * What stands in for that control: reduced motion turns it off outright
   * (the global query in styles.scss), a hover or a focus stops it, opening the
   * menu ends it permanently, and it never runs at all unless its own section is
   * the part of the page being read. It is also decoration - nothing is said by
   * the ring that the button does not already say to assistive tech.
   */
  protected readonly hinting = computed(() => this.inView() && !this.found());

  constructor() {
    afterNextRender(() => {
      // Absent in jsdom, and in any renderer without a viewport to intersect
      // with. Nothing is lost: hinting simply stays false.
      if (typeof IntersectionObserver !== 'function') {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => this.inView.set(entry.isIntersecting),
        { threshold: HINT_VISIBILITY },
      );
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected toggle(): void {
    this.open.update((open) => !open);
    this.found.set(true);
  }

  protected close(): void {
    this.open.set(false);
  }

  /**
   * pointerdown, not click: it lands before focus moves, so pressing something
   * else outside shuts the menu before that thing takes focus - rather than
   * after, which reads as the menu closing a beat late.
   *
   * A press on the trigger is inside the host and falls through to the button's
   * own click, which toggles. Handling it here as well would close and reopen.
   */
  protected onPointerDown(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  /**
   * Escape is the one dismissal with nowhere for focus to go: the pointer ones
   * leave it on whatever was pressed, so only this has to hand it back to the
   * trigger. Without that, focus would sit on a link that is now inert.
   */
  protected onEscape(): void {
    if (this.open()) {
      this.close();
      this.trigger().nativeElement.focus();
    }
  }
}
