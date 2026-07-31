import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PracticeService } from '../../core/practice.service';
import { FeedComponent } from './feed/feed';
import { HeroComponent } from './hero/hero';
import { PracticeModalComponent } from '../shared/practice-modal/practice-modal';

@Component({
  selector: 'app-home',
  imports: [FeedComponent, HeroComponent, PracticeModalComponent, TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  // Read by the @defer trigger in the template; the modal owns the rest.
  protected readonly practice = inject(PracticeService);
}
