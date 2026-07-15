import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme.service';
import { LanguageService } from '../../../core/language.service';
import { Lang } from '../../../core/models/content.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { class: 'app-header' },
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  private readonly language = inject(LanguageService);
  protected readonly lang = this.language.lang;

  // Readable, capitalized label for the theme the toggle switches to.
  protected readonly themeLabel = computed(() =>
    this.theme.next() === 'dark' ? 'Dark' : 'Light',
  );
  protected readonly themeAria = computed(
    () => `Switch to ${this.themeLabel().toLowerCase()} theme`,
  );
  protected readonly aboutLabel = computed(() =>
    this.lang() === 'en' ? 'About' : 'Про автора',
  );

  protected setLang(lang: Lang): void {
    this.language.set(lang);
  }
}
