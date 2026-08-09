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
  {
    id: 'angularjs',
    label: 'AngularJS',
    year: 2010,
    title: { en: 'The digest loop', uk: 'The digest loop' },
    points: [
      {
        id: 'angularjs-digest',
        head: { en: 'Dirty checking', uk: 'Dirty checking' },
        body: { en: 'Every watcher, every pass.', uk: 'Every watcher, every pass.' },
      },
    ],
  },
  {
    id: 'v17',
    label: 'v17',
    year: 2023,
    title: { en: 'Control flow', uk: 'Control flow' },
    points: [
      {
        id: 'v17-blocks',
        head: { en: 'Blocks', uk: 'Blocks' },
        body: { en: 'No imports.', uk: 'No imports.' },
        code: '@if (user()) {}',
      },
      {
        id: 'v17-defer',
        head: { en: 'Defer', uk: 'Defer' },
        body: { en: 'Lazy chunks.', uk: 'Lazy chunks.' },
      },
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

  const heads = () =>
    Array.from(host.querySelectorAll('.head')).map((head) => head.textContent?.trim());
  const openHeads = () =>
    Array.from(host.querySelectorAll('app-change-row'))
      .filter((row) => row.querySelector('.panel.open') !== null)
      .map((row) => row.querySelector('.head')?.textContent?.trim());

  const pick = async (label: string) => {
    version(label)!.click();
    await fixture.whenStable();
  };

  const openChange = async (label: string) => {
    Array.from(host.querySelectorAll<HTMLButtonElement>('.change-head'))
      .find((button) => button.textContent?.trim().startsWith(label))!
      .click();
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

  it('rails every version oldest first, including the unwritten one', () => {
    expect(rail().map((button) => button.textContent?.trim())).toEqual(['AngularJS', 'v17', 'v22']);
  });

  it('opens on the newest release that has something to show', () => {
    // v22 is on the rail but unwritten, so the panel starts on v17 rather than
    // greeting every reader with the placeholder note.
    expect(active()?.textContent?.trim()).toBe('v17');
    expect(host.querySelector('.year')?.textContent?.trim()).toBe('2023');
    expect(host.querySelector('.soon')).toBeNull();
  });

  it('lists the changes of the selected release, closed', () => {
    expect(heads()).toEqual(['Blocks', 'Defer']);
    expect(openHeads()).toEqual([]);
    // The detail is rendered but collapsed - that is what the accordion animates.
    expect(host.querySelector('.body')?.textContent?.trim()).toBe('No imports.');
  });

  it('opens one change without touching the others', async () => {
    await openChange('Blocks');

    expect(openHeads()).toEqual(['Blocks']);

    await openChange('Defer');

    expect(openHeads()).toEqual(['Blocks', 'Defer']);
  });

  it('closes a change that is open', async () => {
    await openChange('Blocks');
    await openChange('Blocks');

    expect(openHeads()).toEqual([]);
  });

  it('shows the code tip of a change that carries one', async () => {
    await openChange('Blocks');

    expect(host.querySelector('app-code-block .code')?.textContent).toContain('@if (user())');
  });

  it('switches the panel to whichever release is picked', async () => {
    await pick('AngularJS');

    expect(active()?.textContent?.trim()).toBe('AngularJS');
    expect(host.querySelector('.title')?.textContent?.trim()).toBe('The digest loop');
    expect(host.querySelector('.year')?.textContent?.trim()).toBe('2010');
    expect(heads()).toEqual(['Dirty checking']);
  });

  it('closes every open change when another release is picked', async () => {
    await openChange('Blocks');
    await pick('AngularJS');
    await pick('v17');

    expect(openHeads()).toEqual([]);
  });

  it('shows the release with nothing written yet as still on the way', async () => {
    await pick('v22');

    // The label heads the panel, so the row is never blank.
    expect(host.querySelector('.title')?.textContent?.trim()).toBe('v22');
    expect(host.querySelector('.soon')?.textContent?.trim()).toBe(
      'Highlights for this release are on the way.',
    );
    expect(heads()).toEqual([]);
  });

  it('names the rail for assistive tech', () => {
    const group = host.querySelector('.rail');
    expect(group?.getAttribute('role')).toBe('group');
    expect(group?.getAttribute('aria-label')).toBe('Choose an Angular version');
  });
});
