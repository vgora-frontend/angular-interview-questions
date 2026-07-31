import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from '../../../core/theme.service';
import { LanguageService } from '../../../core/language.service';
import { LANGS, LANG_LABELS, Lang } from '../../../core/models/language.model';

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
  protected readonly labels = LANG_LABELS;

  protected setLang(lang: Lang): void {
    this.language.set(lang);
  }
}
