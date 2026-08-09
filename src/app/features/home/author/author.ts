import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthorLink, AuthorMenuComponent } from './author-menu/author-menu';

@Component({
  selector: 'app-author',
  imports: [AuthorMenuComponent, TranslocoPipe],
  templateUrl: './author.html',
  styleUrl: './author.scss',
  host: {
    id: 'author',
    tabindex: '-1',
  },
})
export class AuthorComponent {
  // One list, two ways in: the row of links in the footer and the menu behind
  // the avatar. Declared here rather than in the menu so the two cannot drift
  // into offering different destinations.
  //
  // The labels are proper nouns and an abbreviation the two locales share, so
  // they are not translated.
  protected readonly profiles: readonly AuthorLink[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vgora-frontend/' },
    { label: 'GitHub', href: 'https://github.com/vgora-frontend/' },
    { label: 'CV', href: 'https://vgora-frontend.github.io/cv/' },
  ];

  protected readonly source = 'https://github.com/sudheerj/angular-interview-questions';

  // Where the release highlights come from. Two links because they answer
  // different questions: the blog says what a release was about, the changelog
  // says what actually changed in it.
  protected readonly releaseBlog = 'https://blog.angular.dev';
  protected readonly changelog = 'https://github.com/angular/angular/blob/main/CHANGELOG.md';
}
