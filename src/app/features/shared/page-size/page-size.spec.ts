import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageSizeComponent } from './page-size';

const OPTIONS = [6, 12, 24, 48];

describe('PageSizeComponent', () => {
  let fixture: ComponentFixture<PageSizeComponent>;
  let host: HTMLElement;

  const select = () => host.querySelector<HTMLSelectElement>('select')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PageSizeComponent] }).compileComponents();

    fixture = TestBed.createComponent(PageSizeComponent);
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('size', OPTIONS[0]);
    fixture.componentRef.setInput('label', 'Per page');
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('lists every option and shows the one in force', () => {
    expect(Array.from(select().options).map((option) => option.value)).toEqual(OPTIONS.map(String));
    expect(select().value).toBe(String(OPTIONS[0]));
  });

  it('names the control by wrapping it, so there is no id to collide', () => {
    const label = host.querySelector('label')!;
    expect(label.textContent).toContain('Per page');
    expect(label.contains(select())).toBe(true);
    // Nothing to keep unique if the component is used twice on one page.
    expect(host.querySelector('[id]')).toBeNull();
  });

  it('reports the choice back as a number, not the string the select gives', async () => {
    const chosen: unknown[] = [];
    fixture.componentInstance.size.subscribe((value) => chosen.push(value));

    select().value = '24';
    select().dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(chosen).toEqual([24]);
  });

  it('follows the size the host sets', async () => {
    fixture.componentRef.setInput('size', 48);
    await fixture.whenStable();

    expect(select().value).toBe('48');
  });
});
