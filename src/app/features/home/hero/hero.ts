import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PracticeService } from '../../../core/practice.service';

@Component({
  selector: 'app-hero',
  imports: [TranslocoPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  protected readonly practice = inject(PracticeService);
}
