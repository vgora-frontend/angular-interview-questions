import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ContentService } from '../../../core/content.service';
import { VersionEntry } from '../../../core/models/content.model';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { TimelineComponent } from './timeline';

// Fixed versions, so these tests do not shift when a real release is filled in.
// The last one is deliberately bare: that is the placeholder state.
const VERSIONS: VersionEntry[] = [
  { id: 'angularjs', label: 'AngularJS', year: 2010 },
  {
    id: 'v17',
    label: 'v17',
    year: 2023,
    title: { en: 'Control flow', uk: 'Control flow' },
    points: [
      { head: { en: 'Blocks', uk: 'Blocks' }, body: { en: 'No imports.', uk: 'No imports.' } },
      { head: { en: 'Defer', uk: 'Defer' }, body: { en: 'Lazy chunks.', uk: 'Lazy chunks.' } },
    ],
  },
  { id: 'v22', label: 'v22', year: 2026 },
];

const TRANSLATIONS = {
  timeline: {
    eyebrow: 'What changed, when',
    heading: 'The version timeline',
    railLabel: 'Choose an Angular version',
    soon: 'Highlights for this release are on the way.',
  },
};

describe('TimelineComponent', () => {
  let fixture: ComponentFixture<TimelineComponent>;
  let host: HTMLElement;

  const rail = () => Array.from(host.querySelectorAll<HTMLButtonElement>('.version'));
  const version = (label: string) => rail().find((button) => button.textContent?.trim() === label);
  const active = () => rail().find((button) => button.getAttribute('aria-pressed') === 'true');
  const points = () =>
    Array.from(host.querySelectorAll('.point .text')).map((point) =>
      point.textContent?.replace(/\s+/g, ' ').trim(),
    );

  const pick = async (label: string) => {
    version(label)!.click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TimelineComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
      providers: [
        {
          provide: ContentService,
          useValue: {
            questions: signal([]).asReadonly(),
            categories: signal([]).asReadonly(),
            versions: signal(VERSIONS).asReadonly(),
            tagFor: () => '',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('rails every version oldest first and opens on the newest', () => {
    expect(rail().map((button) => button.textContent?.trim())).toEqual(['AngularJS', 'v17', 'v22']);
    expect(active()?.textContent?.trim()).toBe('v22');
    expect(host.querySelector('.year')?.textContent?.trim()).toBe('2026');
  });

  it('shows the release with nothing written yet as still on the way', () => {
    // The label heads the panel, so the row is never blank.
    expect(host.querySelector('.title')?.textContent?.trim()).toBe('v22');
    expect(host.querySelector('.soon')?.textContent?.trim()).toBe(
      'Highlights for this release are on the way.',
    );
    expect(points()).toEqual([]);
  });

  it('switches the panel to whichever release is picked', async () => {
    await pick('v17');

    expect(active()?.textContent?.trim()).toBe('v17');
    expect(host.querySelector('.title')?.textContent?.trim()).toBe('Control flow');
    expect(host.querySelector('.year')?.textContent?.trim()).toBe('2023');
    expect(points()).toEqual(['Blocks - No imports.', 'Defer - Lazy chunks.']);
    expect(host.querySelector('.soon')).toBeNull();
  });

  it('names the rail for assistive tech', () => {
    const group = host.querySelector('.rail');
    expect(group?.getAttribute('role')).toBe('group');
    expect(group?.getAttribute('aria-label')).toBe('Choose an Angular version');
  });
});
