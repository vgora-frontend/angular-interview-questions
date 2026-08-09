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
  protected readonly source = 'https://github.com/sudheerj/angular-interview-questions';

  // Where the release highlights come from. Two links because they answer
  // different questions: the blog says what a release was about, the changelog
  // says what actually changed in it.
  protected readonly releaseBlog = 'https://blog.angular.dev';
  protected readonly changelog = 'https://github.com/angular/angular/blob/main/CHANGELOG.md';
}
