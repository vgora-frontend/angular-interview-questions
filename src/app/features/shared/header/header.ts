import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../../core/theme.service';
import { LanguageService } from '../../../core/language.service';
import { LANGS, Lang } from '../../../core/models/content.model';

@Component({
  selector: 'app-header',
  imports: [TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { class: 'app-header' },
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  private readonly language = inject(LanguageService);
  protected readonly lang = this.language.lang;
  protected readonly langs = LANGS;

  protected setLang(lang: Lang): void {
    this.language.set(lang);
  }
}
