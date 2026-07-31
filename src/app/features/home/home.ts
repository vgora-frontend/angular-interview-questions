import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PracticeService } from '../../core/practice.service';
import { AuthorComponent } from './author/author';
import { FeedComponent } from './feed/feed';
import { HeroComponent } from './hero/hero';
import { TimelineComponent } from './timeline/timeline';
import { PracticeModalComponent } from '../shared/practice-modal/practice-modal';

@Component({
  selector: 'app-home',
  imports: [
    AuthorComponent,
    FeedComponent,
    HeroComponent,
    PracticeModalComponent,
    TimelineComponent,
    TranslocoPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  // Read by the @defer trigger in the template; the modal owns the rest.
  protected readonly practice = inject(PracticeService);
}
