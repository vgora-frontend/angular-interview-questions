import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from '../../../core/models/language.model';
import { ModalComponent } from './modal';

const TRANSLATIONS = { modal: { close: 'Close' } };

// Content projection is covered where a real caller projects into the shell -
// see practice-modal.spec.ts.
describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let host: HTMLElement;
  let closed: number;

  const dialog = () => host.querySelector('dialog')!;

  beforeAll(() => {
    // jsdom 28 ships no <dialog> behaviour at all. These stand-ins keep the
    // open state and the close event, which is what the component drives.
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
  });

  async function setOpen(open: boolean): Promise<void> {
    fixture.componentRef.setInput('open', open);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: TRANSLATIONS, uk: TRANSLATIONS },
          translocoConfig: { availableLangs: [...LANGS], defaultLang: DEFAULT_LANG },
          preloadLangs: true,
        }),
      ],
    }).compileComponents();

    closed = 0;
    fixture = TestBed.createComponent(ModalComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.closed.subscribe(() => (closed += 1));
    await setOpen(false);
  });

  it('stays shut while open is false', () => {
    expect(dialog().hasAttribute('open')).toBe(false);
  });

  it('opens and closes as open flips', async () => {
    await setOpen(true);
    expect(dialog().hasAttribute('open')).toBe(true);

    await setOpen(false);
    expect(dialog().hasAttribute('open')).toBe(false);
  });

  it('names the dialog after the caller heading, and omits the attribute without one', async () => {
    await setOpen(true);
    expect(dialog().hasAttribute('aria-labelledby')).toBe(false);

    fixture.componentRef.setInput('labelledBy', 'some-title');
    await fixture.whenStable();
    expect(dialog().getAttribute('aria-labelledby')).toBe('some-title');
  });

  it('gives the close button an accessible name', async () => {
    await setOpen(true);

    expect(host.querySelector('.close')?.getAttribute('aria-label')).toBe('Close');
  });

  it('raises closed from the close button', async () => {
    await setOpen(true);

    host.querySelector<HTMLButtonElement>('.close')!.click();

    expect(closed).toBe(1);
  });

  it('raises closed on a click outside the card, but not inside it', async () => {
    await setOpen(true);

    host.querySelector<HTMLElement>('.card')!.click();
    expect(closed).toBe(0);

    dialog().click();
    expect(closed).toBe(1);
  });

  it('raises closed when the dialog closes itself (Escape)', async () => {
    await setOpen(true);

    dialog().close();

    expect(closed).toBe(1);
  });
});
