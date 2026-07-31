import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-author',
  imports: [NgOptimizedImage, TranslocoPipe],
  templateUrl: './author.html',
  styleUrl: './author.scss',
  host: {
    id: 'author',
    tabindex: '-1',
  },
})
export class AuthorComponent {
  protected readonly linkedIn = 'https://www.linkedin.com/in/vgora-frontend/';
  protected readonly github = 'https://github.com/vgora-frontend/';
  protected readonly cv = 'https://vgora-frontend.github.io/cv/';
}
